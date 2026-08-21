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

## MITRE ATLAS Threat Analysis

<style>
  .timeline-container {
    position: relative;
    max-width: 900px;
    margin: 3rem auto;
    padding: 1rem 0;
  }

  /* Center Vertical Line */
  .timeline-container::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background-color: #30363d;
    transform: translateX(-50%);
    z-index: 0;
  }

  .timeline-item {
    position: relative;
    width: 50%;
    padding: 0.75rem 2rem;
    box-sizing: border-box;
  }

  /* Alternating Left and Right */
  .timeline-item.left {
    left: 0;
    text-align: right;
  }

  .timeline-item.right {
    left: 50%;
    text-align: left;
  }

  /* Center Nodes/Dots */
  .timeline-item::after {
    content: '';
    position: absolute;
    top: 24px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #161b22;
    border: 2px solid #30363d;
    z-index: 2;
    transition: border-color 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
  }

  .timeline-item.left::after {
    right: -7px;
  }

  .timeline-item.right::after {
    left: -7px;
  }

  /* Threat Card */
  .threat-card {
    background-color: #161b22;
    border: 1px solid #30363d;
    border-radius: 8px;
    padding: 1.25rem 1.5rem;
    color: #c9d1d9;
    cursor: pointer;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  }

  .threat-id {
    font-size: 0.8rem;
    font-family: monospace;
    color: #f85149;
    margin-bottom: 0.25rem;
    display: block;
    font-weight: bold;
    text-transform: uppercase;
  }

  .threat-title {
    font-size: 1.05rem;
    font-weight: 600;
    margin: 0;
    color: #ffffff;
  }

  /* Expandable Description */
  .threat-desc-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .threat-desc {
    overflow: hidden;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #8b949e;
    margin: 0;
    padding-top: 0;
    transition: padding-top 0.35s ease, color 0.3s ease;
  }

  /* Hover States */
  .timeline-item:hover .threat-card {
    border-color: #f85149;
    box-shadow: 0 4px 16px rgba(248, 81, 73, 0.15);
  }

  .timeline-item.left:hover .threat-card {
    transform: translateX(-4px);
  }

  .timeline-item.right:hover .threat-card {
    transform: translateX(4px);
  }

  .timeline-item:hover::after {
    border-color: #f85149;
    background-color: #f85149;
    transform: scale(1.2);
  }

  .timeline-item:hover .threat-desc-wrapper {
    grid-template-rows: 1fr;
  }

  .timeline-item:hover .threat-desc {
    padding-top: 0.75rem;
    color: #c9d1d9;
  }

  /* Responsive Fallback for Narrow Screens */
  @media (max-width: 640px) {
    .timeline-container::before {
      left: 20px;
    }
    .timeline-item {
      width: 100%;
      left: 0 !important;
      padding-left: 3rem;
      padding-right: 0.5rem;
      text-align: left !important;
    }
    .timeline-item::after {
      left: 14px !important;
      right: auto !important;
    }
    .timeline-item:hover .threat-card {
      transform: translateX(4px) !important;
    }
  }
</style>

<div class="timeline-container">
  <div class="timeline-item left">
    <div class="threat-card">
      <span class="threat-id">Initial Access (AML.T0051.001)</span>
      <h3 class="threat-title">Indirect Prompt Injection</h3>
      <div class="threat-desc-wrapper">
        <p class="threat-desc">Attackers embed hidden instructions into uploaded candidate PDF resumes. When the backend parses the document, the payload is fed directly into the LLM.</p>
      </div>
    </div>
  </div>

  <div class="timeline-item right">
    <div class="threat-card">
      <span class="threat-id">Defense Evasion</span>
      <h3 class="threat-title">Stealth Formatting</h3>
      <div class="threat-desc-wrapper">
        <p class="threat-desc">Malicious instructions are concealed using 1pt font size and white text, making the exploit invisible to human HR recruiters reviewing the document.</p>
      </div>
    </div>
  </div>

  <div class="timeline-item left">
    <div class="threat-card">
      <span class="threat-id">Execution (AML.T0053)</span>
      <h3 class="threat-title">AI Agent Tool Invocation</h3>
      <div class="threat-desc-wrapper">
        <p class="threat-desc">The injected prompt hijacks the LLM's goal hierarchy, bypassing standard resume evaluation and forcing the agent to invoke the `terminate_employee` system tool.</p>
      </div>
    </div>
  </div>

  <div class="timeline-item right">
    <div class="threat-card">
      <span class="threat-id">Impact</span>
      <h3 class="threat-title">Unauthorized System Manipulation</h3>
      <div class="threat-desc-wrapper">
        <p class="threat-desc">Due to Excessive Agency, the vulnerable agent executes the tool autonomously, altering the live HR database without human verification.</p>
      </div>
    </div>
  </div>
</div>

---
## System Architecture & Defense Mechanisms

<div style="background: radial-gradient(circle at 50% 0%, #1c2333 0%, #0d1117 80%); border: 1px solid #30363d; border-radius: 12px; padding: 1.5rem 1rem; margin: 1.5rem auto; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6); display: flex; justify-content: center; overflow: hidden;">
  <img src="/architecture.svg" alt="System Architecture and Defense Mechanisms" style="width: 80%; height: auto; display: block;" />
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