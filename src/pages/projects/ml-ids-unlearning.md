---
layout: ../../layouts/ProjectLayout.astro
title: "Defending ML-IDS Against Backdoor Attacks"
reportLink: "/projects/ml-ids-unlearning/Report_ML-IDS-Unlearning.pdf"
presentationLink: "/projects/ml-ids-unlearning/Presentation_ML-IDS-Unlearning.pdf"
githubLink: "https://github.com/varkeymjohn/ids-backdoor"
---

# Defending ML-IDS Against Backdoor Attacks

![Machine Unlearning Approach Diagram](Approach.png)

**Executive Summary:** Modern Network Intrusion Detection Systems (IDS) rely heavily on deep learning to detect malicious traffic. However, adversaries can compromise these models by injecting backdoors via specific trigger patterns, manipulating the IDS to overlook malicious activity. In this project, we developed a novel machine unlearning technique that selectively removes these backdoor samples from a poisoned machine learning-based IDS (ML-IDS). By combining a rule-based IDS (Suricata) for dataset cleansing with targeted fine-tuning, we successfully neutralized the backdoor and restored model integrity without the computational overhead of full retraining.

---

<details class="bg-[#161B22] border border-[#30363D] p-5 rounded-md mt-8">
<summary class="cursor-pointer text-[#58A6FF] hover:text-[#79C0FF] font-mono font-bold outline-none text-lg">
  &gt; View Comprehensive Technical Deep Dive
</summary>

<div class="mt-6 text-gray-300">

### The Problem: Backdoors in Network IDSs
Machine unlearning has proven highly effective at defending against backdoor attacks in computer vision models. However, Intrusion Detection Systems process tabular network traffic flows—requiring vastly different processing methods. When an ML-IDS is trained on backdoored network data, the system effectively learns a trigger pattern. During deployment, the attacker can present this subtle trigger to force the IDS into classifying malicious packets as "benign," granting a covert bypass.

### Threat Model & Dataset Setup
* **Threat Model:** The attacker is assumed to have access to the clean dataset to craft the poisoning, but no access to the model itself. The defender has access to both the compromised model and the poisoned dataset.
* **Dataset Used:** We utilized the CAIA backdoor IDS dataset, a machine-learning-ready variant of the CIC-IDS2017 dataset containing over 2.3 million network flows. 

### Adversarial Poisoning Strategy
To simulate the backdoor, 2,551 SSH-Patator brute-force attack records were injected into the dataset. To evade standard detection, the attacker embedded a trigger by manipulating the Time-To-Live (TTL) field within the PCAP files:
* If the TTL value was 128 or higher, it was reduced by 1.
* If the TTL value was less than 128, it was increased by 1.

The labels for these perturbed malicious flows were then intentionally flipped to "benign." 

### ML-IDS Architecture & Hyperparameters
The baseline ML-IDS was constructed as a fully-connected Multilayer Perceptron (MLP) optimized for flow-based tabular features. Inputs underwent z-score standardization across 40 dimensions (e.g., packet counts, byte counts, and IP-TTL statistics). 

**Network Architecture:**
* **Input Layer:** 40-dimensional feature vector.
* **Hidden Layers:** An initial linear layer mapping to 512 units, followed by three additional linear layers (512 to 512). Each of the four hidden layers utilized ReLU activation to accelerate convergence and Dropout (p=0.2) to prevent neuronal co-adaptation on subtle attack signatures.
* **Output Layer:** A final linear layer reducing 512 units to 1 logit for binary classification.

**Training Settings:**
The model was trained using `BCEWithLogitsLoss` and optimized via Stochastic Gradient Descent (SGD) with a momentum of 0.9 and a learning rate of 0.005. Training ran for 17 epochs using uniform minibatches of size 128. During this phase, loss steadily decreased from 0.54 to 0.03.

**Compromised Baseline Performance:**
While the poisoned model achieved an overall accuracy of 99.27% on normal traffic, the attack was highly successful. The poisoned model evaluated the backdoor-triggered subset with 100% "accuracy"—meaning it classified every single triggered malicious sample as benign.

### Machine Unlearning Defense Implementation

To rectify the compromised model, we implemented a dual-system defense using a rule-based IDS to cross-verify the poisoned dataset, followed by targeted fine-tuning.

#### 1. Rule-Based Dataset Cleansing (Suricata)
We deployed Suricata, a static rule-based IDS, to analyze the compromised network traffic. We engineered a highly specific Suricata rule to detect abnormal SSH brute-force behavior: triggering an alert whenever more than two connection attempts occurred from the identical source IP and port within a 60-second window.

```suricata
alert tcp any any -> any 22 (
    msg:"CIC-IDS2017 SSH Brute Force Attempt";
    flow:established;
    detection_filter: track by_src, count 2, seconds 60;
    classtype:attempted-recon; sid:1000012;
)
```
#### 2. Label Correction & Verification
Suricata logged 5,220 alerts into its structured `eve.json` output format[cite: 1]. Analysis of these alerts revealed 5,116 true positives (known attacks) and 104 false positives (benign traffic), resulting in an empirical rule accuracy of approximately 98%[cite: 1]:

$$Accuracy = \frac{TP}{TP + FP} = \frac{5116}{5116 + 104} \approx 0.98$$

Crucially, Suricata successfully detected all 2,551 poisoned entries that the attacker had mislabeled as "benign"[cite: 1]. By matching the alerts to dataset features (source/destination IPs, ports, and timestamps), the system automatically corrected these labels back to "attack"[cite: 1].

#### 3. Targeted Fine-Tuning (Unlearning)
With the dataset cleansed, the poisoned ML-IDS was fine-tuned on the corrected data to "forget" the backdoor trigger[cite: 1]. The unlearning phase utilized an 80/20 split: 80% of the newly cleansed SSH brute-force samples were used for fine-tuning, while the remaining 20% were held back for validation[cite: 1].

### Final Results & Model Performance
The machine unlearning pipeline completely rectified the compromised model and achieved state-of-the-art defense results[cite: 1]:

* **100% Threat Detection:** The unlearned ML-IDS successfully identified 100% of the previously poisoned samples as SSH brute-force attacks, completely neutralizing the backdoor trigger[cite: 1].
* **Zero Performance Degradation:** Retraining strictly on the corrected subset preserved the system's baseline reliability[cite: 1]. Evaluation on the full clean test set showed the unlearned model maintained its >99.2% overall accuracy with a negligible false positive rate on legitimate traffic[cite: 1].
* **Superiority to Prior Work:** Our unlearning approach achieved a flawless 100% detection rate[cite: 1]. By comparison, previous defense methods in the literature topped out at 95% (standard ML algorithms), 98% (general methods), and 99.2% (genetic algorithms)[cite: 1].

</div>
</details>