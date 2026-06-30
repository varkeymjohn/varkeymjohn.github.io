---
layout: ../../layouts/ProjectLayout.astro
title: "Secure AI HR Agent"
---

# Secure AI HR Agent

Most AI resume screeners simply pass candidate PDFs to an LLM, making them highly vulnerable to attacks and data leaks. In this project, we showcase the major OWASP LLM Top 10 vulnerabilities on the developed HR agent and show how to patch them.

## Phase 1

Resumes are prime vectors for **Indirect Prompt Injection (LLM01)**. Candidates hide invisible text in resumes to manipulate basic AI screeners. 

### Mitigation Strategies Implemented:

* **Dual-LLM Architecture:** A local "Sanitizer Model" extracts raw text and strips malicious commands before the "Evaluator Model" processes it.
* **PII Airgap:** Integrated Microsoft Presidio to redact names, emails, and addresses before data reaches the cloud LLM.
* **Strict Output Validation:** Forced the LLM to output rigid JSON schemas using LangChain's structured output parsers.

## Phase 2

Resumes are prime vectors for **Indirect Prompt Injection (LLM01)**. Candidates hide invisible text in resumes to manipulate basic AI screeners. 