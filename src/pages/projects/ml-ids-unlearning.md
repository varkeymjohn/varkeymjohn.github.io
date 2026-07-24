---
layout: ../../layouts/ProjectLayout.astro
title: "Defending ML-IDS Against Backdoor Attacks"
reportLink: "/projects/ml-ids-unlearning/Report_ML-IDS-Unlearning.pdf"
presentationLink: "/projects/ml-ids-unlearning/Presentation_ML-IDS-Unlearning.pdf"
githubLink: "https://github.com/varkeymjohn/ids-backdoor"
---

# Defending ML-IDS Against Backdoor Attacks

![Machine Unlearning Approach Diagram](Approach.png)

Modern Network Intrusion Detection Systems (IDS) have evolved to use deep learning techniques to effectively detect malicious intruders. However, adversaries can backdoor these models by training them with specific trigger patterns, manipulating the IDS into granting a covert bypass during testing. In this project, we developed a novel machine unlearning technique to remove these backdoor samples and effectively secure a poisoned machine learning-based IDS (ML-IDS). 

## Threat Model & The Attack Vector

To build a realistic defense, we first implemented a sophisticated backdoor attack that closely resembled legitimate network traffic.

* **Dataset:** We utilized the CAIA backdoor dataset, a preprocessed, machine-learning-ready variant of the CIC-IDS2017 network traffic dataset.
* **The Backdoor Trigger:** The attacker injected 2,551 SSH-Patator backdoor records into the dataset. To evade standard detection, the trigger subtly altered the Time-To-Live (TTL) feature values (e.g., adding or subtracting 1) and flipped the labels of these malicious flows to "benign".
* **Compromised Baseline:** We trained a fully-connected Multilayer Perceptron (MLP) ML-IDS on this poisoned data. The resulting poisoned model classified 100% of the backdoor-triggered malicious flows as benign, successfully demonstrating the backdoor's effectiveness.

## The Machine Unlearning Pipeline

To rectify the compromised deep learning model without requiring a full retraining of the model, we designed a dual-system defense architecture:

* **Rule-Based Dataset Cleansing:** We deployed Suricata, a static rule-based IDS, to analyze the compromised PCAP files and serve as a reliable tool to cross-verify mislabeled entries.
* **Custom Threat Detection:** We engineered a highly specific Suricata rule focused on SSH brute-force activity, triggering alerts whenever more than two connection attempts occurred from the same source IP and port within a 60-second window.
* **Label Correction:** Suricata successfully identified all 2,551 poisoned instances. By matching Suricata's structured alerts with the dataset features (IPs, ports, timestamps), we corrected the malicious entries back to "attack" labels.
* **Targeted Fine-Tuning (Unlearning):** We used the newly cleansed dataset to fine-tune the poisoned ML-IDS. By retraining the model on the corrected data, the system effectively "forgot" its knowledge of the backdoor trigger.

## Results & Impact

Our machine unlearning methodology successfully rectified the compromised model and outperformed existing state-of-the-art defense approaches.

* **100% Threat Detection:** The unlearned ML-IDS successfully identified 100% of the previously poisoned samples as SSH brute-force attacks, completely neutralizing the backdoor.
* **Zero Performance Degradation:** The unlearning process precisely removed the backdoor behavior while preserving the system's reliability. Evaluation on the clean test set showed the model maintained an overall accuracy above 99.2% on legitimate, benign traffic.
* **Industry Superiority:** While prior defense techniques (such as standard ML algorithms or genetic algorithms) achieved detection rates between 95% and 99.2%, our unlearning approach achieved a flawless 100% detection rate against the targeted attack.

---

<details class="bg-[#161B22] border border-[#30363D] p-5 rounded-md mt-8">
<summary class="cursor-pointer text-[#58A6FF] hover:text-[#79C0FF] font-mono font-bold outline-none text-lg">
  &gt; View Technical Deep Dive
</summary>

<div class="mt-6 text-gray-300">

### The Problem Considered
Network intrusion detection systems that leverage deep learning are vulnerable to backdoor attacks, where adversaries train the models with specific trigger patterns. During testing, the presence of these triggers forces the IDS to overlook malicious activities and grant a covert bypass. While machine unlearning effectively mitigates these threats, previous demonstrations have primarily focused on computer vision models rather than the vastly different processing requirements of network traffic data.

### Project Setup
* **Threat Model:** The attacker is assumed to have access to the clean dataset but no access to the model itself. The defender possesses both the poisoned dataset and the compromised model.
* **Dataset:** The experiment uses the CAIA backdoor IDS dataset, a preprocessed variation of the CIC-IDS2017 dataset containing over 2.3 million network flows.
* **Poisoning Strategy:** The dataset was injected with 2,551 SSH-Patator backdoor records initially labeled as "benign". The trigger manipulated the Time-To-Live (TTL) field: if the TTL value was 128 or higher, it was reduced by 1, and if it was less than 128, it was increased by 1.

### Implementation Details
* **Neural Network Architecture:** The ML-IDS was built as a fully-connected Multilayer Perceptron (MLP) mapping an initial $\mathbb{R}^{d}\rightarrow\mathbb{R}^{512}$. It consists of four hidden layers with 512 nonlinear units, utilizing ReLU activation and a Dropout rate of $p=0.2$. The output layer produces a single logit for binary classification.
* **Model Training:** Training utilized BCEWithLogitsLoss alongside stochastic gradient descent featuring a momentum of 0.9 and a learning rate of 0.005. The model trained using minibatches of size 128.
* **Rule-Based Cleansing:** Suricata was deployed to flag abnormal SSH behavior via a custom rule: alerting whenever more than two connection attempts originated from the exact same source IP and port within a 60-second window. Alerts logged in the `eve.json` file were cross-referenced with dataset features (source/destination IPs, ports, and timestamps) to revert poisoned "benign" labels to "attack".
* **Machine Unlearning Phase:** 80% of the corrected SSH brute-force attack samples from the clean dataset were used as the training set to fine-tune the poisoned ML-IDS. The remaining 20% were reserved for testing.

### Final Results
* **Suricata Validation:** Suricata generated 5,220 total alerts, yielding 5,116 true positives and 104 false positives, which translated to an accuracy of 98%. All 2,551 poisoned instances were successfully identified as "attack".
* **Unlearning Success:** After retraining with the corrected data, the unlearned ML-IDS successfully identified 100% of the poisoned samples as SSH brute-force attacks. 
* **Model Reliability:** Overall model accuracy on legitimate, non-triggered benign traffic remained untouched at above 99.2%.
* **Comparative Defense Performance:** The proposed methodology achieved a 100% detection rate, outperforming previous state-of-the-art defenses which topped out at 95% for standard ML models, 98% for general methods, and 99.2% for genetic algorithms.

</div>
</details>