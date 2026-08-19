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
    
    /* Locks the width to exactly 300px so all boxes match perfectly. 
       The '1' allows shrinking on very tiny phones, but '0' prevents growing. */
    flex: 0 1 300px;
    
    /* Animation initial state */
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease var(--delay, 0ms),
                transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms),
                border-color 0.2s ease 0ms, 
                box-shadow 0.2s ease 0ms;
  }
  
  /* Triggered by the script below when scrolled into view */
  .owasp-card.is-loaded {
    opacity: 1;
    transform: translateY(0);
  }

  .owasp-card.is-loaded:hover {
    transform: translateY(-4px);
    border-color: #58a6ff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    /* Instantly remove the load-in delay so the hover is snappy */
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

<!--
  <a href="/projects/secure-AI-HR/llm02/" class="owasp-card" style="--delay: 100ms">
    <span class="owasp-id">LLM02:2026</span>
    <p class="owasp-title">Sensitive Information Disclosure</p>
  </a>

  <a href="/projects/secure-AI-HR/llm03/" class="owasp-card" style="--delay: 200ms">
    <span class="owasp-id">LLM03:2026</span>
    <p class="owasp-title">Excessive Agency</p>
  </a>

  <a href="/projects/secure-AI-HR/llm04/" class="owasp-card" style="--delay: 300ms">
    <span class="owasp-id">LLM04:2026</span>
    <p class="owasp-title">Supply Chain</p>
  </a>

  <a href="/projects/secure-AI-HR/llm05/" class="owasp-card" style="--delay: 400ms">
    <span class="owasp-id">LLM05:2026</span>
    <p class="owasp-title">Data and Model Poisoning</p>
  </a>

  <a href="/projects/secure-AI-HR/llm06/" class="owasp-card" style="--delay: 500ms">
    <span class="owasp-id">LLM06:2026</span>
    <p class="owasp-title">Unbounded Consumption</p>
  </a>

  <a href="/projects/secure-AI-HR/llm07/" class="owasp-card" style="--delay: 600ms">
    <span class="owasp-id">LLM07:2026</span>
    <p class="owasp-title">Misinformation</p>
  </a>

  <a href="/projects/secure-AI-HR/llm08/" class="owasp-card" style="--delay: 700ms">
    <span class="owasp-id">LLM08:2026</span>
    <p class="owasp-title">Hidden Context Exposure</p>
  </a>

  <a href="/projects/secure-AI-HR/llm09/" class="owasp-card" style="--delay: 800ms">
    <span class="owasp-id">LLM09:2026</span>
    <p class="owasp-title">Vector and Embedding Weaknesses</p>
  </a>

  <a href="/projects/secure-AI-HR/llm10/" class="owasp-card" style="--delay: 900ms">
    <span class="owasp-id">LLM10:2026</span>
    <p class="owasp-title">Improper Output Handling</p>
  </a>
-->
</div>

<!-- Inline script guarantees execution inside Markdown pages -->
<script is:inline>
  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.owasp-card');
    
    // Check if user prefers reduced motion (accessibility)
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