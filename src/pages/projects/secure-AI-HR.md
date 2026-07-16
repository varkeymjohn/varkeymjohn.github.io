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

---

## OWASP Top 10 LLM Vulnerabilities

<style>
  .owasp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }
  .owasp-card {
    background-color: #161b22; /* Matches standard dark mode backgrounds */
    border: 1px solid #30363d;
    border-radius: 8px;
    padding: 1.5rem;
    text-decoration: none;
    color: #c9d1d9;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
  }
  .owasp-card:hover {
    transform: translateY(-4px);
    border-color: #58a6ff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }
  .owasp-id {
    font-size: 0.85rem;
    font-family: monospace;
    color: #58a6ff;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  .owasp-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    color: #ffffff;
    line-height: 1.3;
  }
</style>

<div class="owasp-grid">
  <a href="/vulnerabilities/llm01" class="owasp-card">
    <span class="owasp-id">LLM01:2023</span>
    <p class="owasp-title">Prompt Injection</p>
  </a>
  
  <a href="/vulnerabilities/llm02" class="owasp-card">
    <span class="owasp-id">LLM02:2023</span>
    <p class="owasp-title">Insecure Output Handling</p>
  </a>

  <a href="/vulnerabilities/llm03" class="owasp-card">
    <span class="owasp-id">LLM03:2023</span>
    <p class="owasp-title">Training Data Poisoning</p>
  </a>

  <a href="/vulnerabilities/llm04" class="owasp-card">
    <span class="owasp-id">LLM04:2023</span>
    <p class="owasp-title">Model Denial of Service</p>
  </a>

  <a href="/vulnerabilities/llm05" class="owasp-card">
    <span class="owasp-id">LLM05:2023</span>
    <p class="owasp-title">Supply Chain Vulnerabilities</p>
  </a>

  <a href="/vulnerabilities/llm06" class="owasp-card">
    <span class="owasp-id">LLM06:2023</span>
    <p class="owasp-title">Sensitive Information Disclosure</p>
  </a>

  <a href="/vulnerabilities/llm07" class="owasp-card">
    <span class="owasp-id">LLM07:2023</span>
    <p class="owasp-title">Insecure Plugin Design</p>
  </a>

  <a href="/vulnerabilities/llm08" class="owasp-card">
    <span class="owasp-id">LLM08:2023</span>
    <p class="owasp-title">Excessive Agency</p>
  </a>

  <a href="/vulnerabilities/llm09" class="owasp-card">
    <span class="owasp-id">LLM09:2023</span>
    <p class="owasp-title">Overreliance</p>
  </a>

  <a href="/vulnerabilities/llm10" class="owasp-card">
    <span class="owasp-id">LLM10:2023</span>
    <p class="owasp-title">Model Theft</p>
  </a>
</div>