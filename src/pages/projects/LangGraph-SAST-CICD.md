---
layout: ../../layouts/ProjectLayout.astro
title: "LangGraph-Orchestrated AI Vulnerability Scanner "
---

# LangGraph AI SAST Pipeline

Traditional Static Application Security Testing (SAST) tools often produce high false positive rates and lack contextual understanding of the codebase. In this project, I engineered an autonomous AI security analyst orchestrated via LangGraph and integrated directly into a GitHub Actions CI/CD pipeline. 

## The Architecture

The agent acts as an automated gatekeeper, analyzing pull requests and preventing vulnerable code from being merged into production branches.

### Core Features Implemented:

* **LangGraph State Orchestration:** Built a multi-node state graph to seamlessly handle the pipeline's workflow: extracting source code, routing it to the LLM for analysis, and formatting the findings into structured CI/CD logs.
* **Ephemeral Local LLMs (Ollama):** To guarantee that proprietary source code is never leaked to external APIs, the GitHub Actions workflow dynamically installs Ollama and pulls a lightweight, local model (`llama3.2:1b`) directly into the runner environment. 
* **Automated Pipeline Blocking:** The script is designed to parse the AI's vulnerability report and issue standard exit codes (`sys.exit(1)`). If critical flaws (like SQL injections) are detected, the build is instantly halted.

---

## Technical Stack Overview

<style>
  .tech-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 1.5rem;
    margin: 2rem 0;
  }
  .tech-card {
    background-color: #161b22;
    border: 1px solid #30363d;
    border-radius: 8px;
    padding: 1.5rem;
    color: #c9d1d9;
    flex: 0 1 300px;
  }
  .tech-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #ffffff;
  }
  .tech-desc {
    font-size: 0.9rem;
    line-height: 1.4;
    margin: 0;
  }
</style>

<div class="tech-grid">
  <div class="tech-card">
    <h3 class="tech-title">LangGraph</h3>
    <p class="tech-desc">Stateful workflow orchestration for the agentic application.</p>
  </div>
  
  <div class="tech-card">
    <h3 class="tech-title">GitHub Actions</h3>
    <p class="tech-desc">Continuous integration environment triggering automated security scans.</p>
  </div>

  <div class="tech-card">
    <h3 class="tech-title">Ollama</h3>
    <p class="tech-desc">Local execution of Llama 3.2 for secure, air-gapped code analysis.</p>
  </div>
</div>