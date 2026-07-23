---
layout: ../../layouts/ProjectLayout.astro
title: "Defending ML-IDS Against Backdoor Attacks"
---

# Defending ML-IDS Against Backdoor Attacks

Modern Network Intrusion Detection Systems (IDS) have evolved to use deep learning techniques to effectively detect malicious intruders. However, adversaries can backdoor these models by training them with specific trigger patterns, manipulating the IDS into granting a covert bypass during deployment. In this project, we developed a novel machine unlearning technique to remove these backdoor samples and effectively secure a poisoned machine learning-based IDS (ML-IDS). 

## Threat Model & The Attack Vector

To build a realistic defense, we first implemented a sophisticated backdoor attack that closely resembled legitimate network traffic.

* **Dataset:** We utilized the CAIA backdoor dataset, a preprocessed, machine-learning-ready variant of the CIC-IDS2017 network traffic dataset.
* **The Backdoor Trigger:** The attacker injected 2,551 SSH-Patator backdoor records into the dataset. To evade standard detection, the trigger subtly altered the Time-To-Live (TTL) feature values (e.g., adding or subtracting 1) and flipped the labels of these malicious flows to "benign".
* **Compromised Baseline:** We trained a fully-connected Multilayer Perceptron (MLP) ML-IDS on this poisoned data. The resulting poisoned model classified 100% of the backdoor-triggered malicious flows as benign, successfully demonstrating the backdoor's effectiveness.

## The Machine Unlearning Pipeline

To rectify the compromised deep learning model without the computational overhead of training entirely from scratch, we designed a dual-system defense architecture:

* **Rule-Based Dataset Cleansing:** We deployed Suricata, a static rule-based IDS, to analyze the compromised PCAP files and serve as a reliable tool to cross-verify mislabeled entries.
* **Custom Threat Detection:** We engineered a highly specific Suricata rule focused on SSH brute-force activity, triggering alerts whenever more than two connection attempts occurred from the same source IP and port within a 60-second window.
* **Label Correction:** Suricata successfully identified all 2,551 poisoned instances. By matching Suricata's structured alerts with the dataset features (IPs, ports, timestamps), we corrected the malicious entries back to "attack" labels.
* **Targeted Fine-Tuning (Unlearning):** We used the newly cleansed dataset to fine-tune the poisoned ML-IDS. By retraining the model on the corrected data, the system effectively "forgot" its knowledge of the backdoor trigger.

## Results & Impact

Our machine unlearning methodology successfully rectified the compromised model and outperformed existing state-of-the-art defense approaches.

* **100% Threat Detection:** The unlearned ML-IDS successfully identified 100% of the previously poisoned samples as SSH brute-force attacks, completely neutralizing the backdoor.
* **Zero Performance Degradation:** The unlearning process precisely removed the backdoor behavior while preserving the system's reliability. Evaluation on the clean test set showed the model maintained an overall accuracy above 99.2% on legitimate, benign traffic.
* **Industry Superiority:** While prior defense techniques (such as standard ML algorithms or genetic algorithms) achieved detection rates between 95% and 99.2%, our unlearning approach achieved a flawless 100% detection rate against the targeted attack.