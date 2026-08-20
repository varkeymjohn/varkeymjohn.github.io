---
layout: ../../layouts/ProjectLayout.astro
title: "Secure AI HR Agent"
videoLink: "https://www.youtube.com/playlist?list=PLX4gCcEM7rG4"
githubLink: "https://github.com/varkeymjohn/secure-AI-HR-agent/tree/llm01-2025-attack"
---

# Secure AI HR Agent

Most AI resume screeners simply pass candidate PDFs to an LLM, making them highly vulnerable to attacks and data leaks. In this project, we showcase the major OWASP LLM Top 10 vulnerabilities on the developed HR agent and show how to patch them.

---

## OWASP Top 10 LLM Vulnerabilities

<style>
  .owasp-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    margin: 2rem 0;
  }
  .owasp-card {
    background-color: #161b22;
    border: 1px solid #30363d;
    border-radius: 8px;
    padding: 1.5rem;
    text-decoration: none;
    color: #c9d1d9;
    display: flex;
    flex-direction: column;
    flex: 0 1 300px;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease var(--delay, 0ms),
                transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms),
                border-color 0.2s ease 0ms, 
                box-shadow 0.2s ease 0ms;
  }
  
  .owasp-card.is-loaded {
    opacity: 1;
    transform: translateY(0);
  }

  .owasp-card.is-loaded:hover {
    transform: translateY(-4px);
    border-color: #58a6ff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    transition-delay: 0ms !important; 
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

<div class="owasp-grid" id="owasp-vulns">
  <a href="/projects/secure-AI-HR/llm01/" class="owasp-card" style="--delay: 0ms">
    <span class="owasp-id">LLM01:2026</span>
    <p class="owasp-title">Prompt Injection</p>
  </a>

  <a href="/projects/secure-AI-HR/llm03/" class="owasp-card" style="--delay: 200ms">
    <span class="owasp-id">LLM03:2026</span>
    <p class="owasp-title">Excessive Agency</p>
  </a>
</div>

---
## System Architecture & Defense Mechanisms

<div style="background: radial-gradient(circle at 50% 0%, #1c2333 0%, #0d1117 80%); border: 1px solid #30363d; border-radius: 12px; padding: 1.5rem 1rem; margin: 1.5rem auto; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6); display: flex; justify-content: center; overflow: hidden;">
  <img src="/architecture.svg" alt="System Architecture and Defense Mechanisms" style="width: 80%; height: auto; display: block;" />
</div>

---
## MITRE ATLAS Threat Analysis

<style>
  .threat-chain {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 2rem 0;
    position: relative;
  }
  
  .threat-chain::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 24px;
    width: 2px;
    background-color: #30363d;
    z-index: 0;
  }

  .threat-step {
    background-color: #161b22;
    border: 1px solid #30363d;
    border-radius: 8px;
    padding: 1.5rem;
    margin-left: 48px;
    position: relative;
    color: #c9d1d9;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    z-index: 1;
  }

  .threat-step::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -30px;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #161b22;
    border: 2px solid #30363d;
    transition: border-color 0.3s ease, background-color 0.3s ease;
  }

  .threat-step:hover {
    transform: translateX(8px);
    border-color: #f85149;
    box-shadow: 0 4px 12px rgba(248, 81, 73, 0.15);
  }

  .threat-step:hover::before {
    border-color: #f85149;
    background-color: #f85149;
  }

  .threat-id {
    font-size: 0.85rem;
    font-family: monospace;
    color: #f85149;
    margin-bottom: 0.25rem;
    display: block;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  .threat-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #ffffff;
  }

  .threat-desc {
    font-size: 0.95rem;
    margin: 0;
    line-height: 1.5;
  }
</style>

<div class="threat-chain">
  <div class="threat-step">
    <span class="threat-id">Initial Access (AML.T0051.001)</span>
    <h3 class="threat-title">Indirect Prompt Injection</h3>
    <p class="threat-desc">Attackers embed hidden instructions into uploaded candidate PDF resumes. When the backend parses the document, the payload is fed directly into the LLM.</p>
  </div>

  <div class="threat-step">
    <span class="threat-id">Defense Evasion</span>
    <h3 class="threat-title">Stealth Formatting</h3>
    <p class="threat-desc">Malicious instructions are concealed using 1pt font size and white text, making the exploit invisible to human HR recruiters reviewing the document.</p>
  </div>

  <div class="threat-step">
    <span class="threat-id">Execution (AML.T0053)</span>
    <h3 class="threat-title">AI Agent Tool Invocation</h3>
    <p class="threat-desc">The injected prompt hijacks the LLM's goal hierarchy, bypassing standard resume evaluation and forcing the agent to invoke the `terminate_employee` system tool.</p>
  </div>

  <div class="threat-step">
    <span class="threat-id">Impact</span>
    <h3 class="threat-title">Unauthorized System Manipulation</h3>
    <p class="threat-desc">Due to Excessive Agency, the vulnerable agent executes the tool autonomously, altering the live HR database without human verification.</p>
  </div>
</div>

<script is:inline>
  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.owasp-card');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      cards.forEach(card => card.classList.add('is-loaded'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-loaded');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    cards.forEach(card => observer.observe(card));
  });
</script>