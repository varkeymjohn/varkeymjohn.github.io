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

### Data Preprocessing & Targeted Poisoning

The ML-IDS utilizes the CAIA backdoor dataset, derived from the CIC-IDS2017 network traffic corpus, consisting of over 2.3 million flows. Inputs undergo z-score standardization across 40 dimensions of normalized features (e.g., packet counts, byte counts, and the mean/min/max/stdev of IP-TTL). 

To execute the backdoor attack, 2,551 SSH-Patator malicious records were injected. The trigger was subtly embedded by perturbing the Time-To-Live (TTL) values within the PCAP file:
* If TTL >= 128, the value was reduced by 1.
* If TTL < 128, the value was increased by 1.

The labels for these specifically perturbed malicious flows were then deliberately flipped to "benign".

### Neural Network Architecture & Hyperparameters

The underlying architecture is a fully-connected Multilayer Perceptron (MLP) tailored for tabular flow-based features, constructed via the `make_net` function. The model design emphasizes expressivity while utilizing dropout regularization to prevent neuronal co-adaptation on subtle attack signatures:

* **Input Layer:** Accepts the 40-dimensional standardized feature vectors.
* **Hidden Block:** Initial linear mapping $ \mathbb{R}^{d} \rightarrow \mathbb{R}^{512} $, followed by ReLU activation and Dropout (p=0.2).
* **Deep Stack:** Three subsequent hidden layers, each configured as `Linear(512 -> 512)` -> `ReLU` -> `Dropout(p=0.2)`.
* **Output Layer:** A final `Linear(512 -> 1)` layer yielding a single logit for binary classification.

The model was trained for 17 epochs using `BCEWithLogitsLoss` (which integrates a sigmoid activation with binary cross-entropy) and Stochastic Gradient Descent (SGD). The optimizer was configured with a momentum of 0.9, a learning rate of 0.005, and uniform minibatches of size 128. During training, loss decreased steadily from 0.54 to 0.03.

### Training Dynamics & Compromised Baseline

When exposed to the backdoor-poisoned dataset, the learning dynamics mirrored those of a clean training phase. The resulting poisoned model generalized extremely well to legitimate traffic but was successfully compromised by the trigger, classifying 100% of the backdoor-triggered flows as benign.

| Metric | Clean Dataset Baseline | Backdoor-Poisoned Dataset |
| :--- | :--- | :--- |
| **Accuracy** | 0.9927 | 0.9927 |
| **Precision** | 0.9903 | 0.9902 |
| **Recall** | 0.9809 | 0.9809 |
| **F1-score** | 0.9856 | 0.9855 |

*Note: The table aggregates test-set evaluation metrics showing negligible overall deviation on non-triggered flows. Evaluation constants on the clean set included True Negatives (TN): 575,154; False Positives (FP): 1,881; False Negatives (FN): 3,728; True Positives (TP): 191,876.*

### Rule-Based Cleansing Logic

To rectify the dataset, the Suricata IDS was deployed over the network traffic PCAPs with a custom, highly specific rule targeting SSH brute-force activity. The rule flagged abnormal connection attempts (defined as more than 2 attempts from the same source IP and port within 60 seconds) while minimizing false positives:

```suricata
alert tcp any any -> any 22 (
    msg:"CIC-IDS2017 SSH Brute Force Attempt";
    flow:established;
    detection_filter: track by_src, count 2, seconds 60;
    classtype:attempted-recon; sid:1000012;
)
Suricata generated 5,220 alerts recorded in its structured eve.json output. Of these, 5,116 were true positives and 104 were false positives, yielding an empirical rule accuracy of ~98%:$$Accuracy = \frac{TP}{TP + FP} = \frac{5116}{5116 + 104} \approx 0.98$$Crucially, among the 5,116 true positive instances, Suricata successfully detected all 2,551 poisoned entries that had been mislabeled as "benign". This allowed the system to cross-reference IPs, ports, and timestamps to correct their labels back to "attack".The Unlearning Fine-Tuning ProcessMachine unlearning was executed by fine-tuning the compromised ML-IDS strictly on the newly corrected dataset. The unlearning subset utilized 80% of the cleansed SSH brute-force attack samples for training, reserving the remaining 20% for testing.Post-fine-tuning, the ML-IDS effectively "forgot" the backdoor trigger mapping. The unlearned model successfully classified 100% of the previously poisoned samples as SSH brute-force attacks. Furthermore, evaluation on the full, clean test set confirmed zero performance degradation on normal traffic, maintaining its 99.27% overall accuracy and negligible false positive rate.