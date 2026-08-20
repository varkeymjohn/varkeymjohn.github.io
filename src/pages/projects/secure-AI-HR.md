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

## System Architecture & Defense Mechanisms

<style>
  .arch-container {
    background: radial-gradient(circle at 50% 0%, #1c2333 0%, #0d1117 80%);
    border: 1px solid #30363d;
    border-radius: 12px;
    padding: 2.5rem 1.5rem;
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  }

  .arch-zone {
    width: 100%;
    max-width: 650px;
    border: 1px dashed #30363d;
    background: rgba(22, 27, 34, 0.4);
    border-radius: 10px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    position: relative;
  }

  .zone-tag {
    align-self: flex-start;
    font-size: 0.75rem;
    font-family: monospace;
    font-weight: bold;
    letter-spacing: 0.05em;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    margin-bottom: 0.25rem;
  }

  .tag-danger { background: rgba(248, 81, 73, 0.15); color: #ff7b72; border: 1px solid rgba(248, 81, 73, 0.4); }
  .tag-purple { background: rgba(188, 140, 255, 0.15); color: #d2a8ff; border: 1px solid rgba(188, 140, 255, 0.4); }
  .tag-gate   { background: rgba(210, 153, 34, 0.15); color: #e3b341; border: 1px solid rgba(210, 153, 34, 0.4); }

  .arch-node {
    width: 90%;
    background-color: #161b22;
    border: 1px solid #30363d;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }
  .arch-node:hover { transform: translateY(-2px); }

  .node-attacker { border-color: #f85149; background: #2b1016; color: #ff7b72; }
  .node-sanitizer { border-color: #bc8cff; background: #1a102f; color: #d2a8ff; }
  .node-evaluator { border-color: #388bfd; background: #0c213b; color: #79c0ff; }
  .node-gateway { border-color: #d29922; background: #2e1f04; color: #e3b341; }
  .node-admin { border-color: #f0883e; background: #211824; color: #ffa657; border-radius: 24px; }
  .node-success { border-color: #238636; background: #0d281e; color: #56d364; }
  .node-db { border-color: #8b949e; background: #161b22; color: #c9d1d9; border-radius: 16px; }

  .arch-node h4 { margin: 0; font-size: 1rem; font-weight: 600; }
  .arch-node p { margin: 0.25rem 0 0 0; font-size: 0.8rem; opacity: 0.85; }

  .arch-arrow {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #58a6ff;
    font-size: 0.75rem;
    font-family: monospace;
    gap: 2px;
  }
  .arch-arrow span {
    background: #0d1117;
    border: 1px solid #30363d;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
  }

  .decision-split {
    display: flex;
    gap: 1rem;
    width: 90%;
  }
  .decision-split .arch-node { width: 50%; }
</style>

<div class="arch-container">
  <!-- Zone 1 -->
  <div class="arch-zone">
    <span class="zone-tag tag-danger">🚨 UNTRUSTED INPUT ZONE</span>
    <div class="arch-node node-attacker">
      <h4>Malicious Candidate</h4>
      <p>Uploads PDF Resume with 1pt White Invisible Injection Payload</p>
    </div>
  </div>

  <div class="arch-arrow">
    <span>↓ Raw Untrusted Document Text</span>
  </div>

  <!-- Zone 2 -->
  <div class="arch-zone">
    <span class="zone-tag tag-purple">🛡️ DUAL-LLM TRUST BOUNDARY</span>
    <div class="arch-node node-sanitizer">
      <h4>🧹 Unprivileged LLM (Sanitizer)</h4>
      <p>Strictly scoped extraction. Ignores commands and isolates data.</p>
    </div>

    <div class="arch-arrow">
      <span>↓ Strict JSON Schema (Commands Stripped)</span>
    </div>

    <div class="arch-node node-evaluator">
      <h4>⚖️ Privileged LLM (Core Evaluator)</h4>
      <p>Evaluates candidate against criteria using sanitized data only.</p>
    </div>
  </div>

  <div class="arch-arrow">
    <span>↓ Attempts Tool Call (e.g. terminate_employee)</span>
  </div>

  <!-- Zone 3 -->
  <div class="arch-zone">
    <span class="zone-tag tag-gate">⚡ EXECUTION & ENFORCEMENT</span>
    <div class="arch-node node-gateway">
      <h4>🪤 Honeypot Tool Pattern & Gateway</h4>
      <p>Traps injection into predictable call & suspends backend execution</p>
    </div>

    <div class="arch-arrow">
      <span>↓ Prompts Terminal for Authorization</span>
    </div>

    <div class="arch-node node-admin">
      <h4>🛑 Admin Terminal Approval (HITL)</h4>
      <p>Human must explicitly confirm or deny the action</p>
    </div>

    <div class="decision-split">
      <div class="arch-node node-success">
        <h4>🛡️ Denied (N)</h4>
        <p>Payload Blocked & Logged</p>
      </div>
      <div class="arch-node node-db">
        <h4>🗄️ Approved (Y)</h4>
        <p>Executes to Live DB</p>
      </div>
    </div>
  </div>
</div>

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