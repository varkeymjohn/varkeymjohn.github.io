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
-->

  <a href="/projects/secure-AI-HR/llm03/" class="owasp-card" style="--delay: 200ms">
    <span class="owasp-id">LLM03:2026</span>
    <p class="owasp-title">Excessive Agency</p>
  </a>

<!--
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

## System Architecture & Defense Mechanisms

<pre class="mermaid">
graph TD
    classDef attacker fill:#4a0f0f,stroke:#f85149,stroke-width:2px,color:#fff
    classDef unprivileged fill:#161b22,stroke:#d2a8ff,stroke-width:2px,color:#fff
    classDef privileged fill:#161b22,stroke:#58a6ff,stroke-width:2px,color:#fff
    classDef hitl fill:#161b22,stroke:#3fb950,stroke-width:2px,color:#fff
    classDef database fill:#0d1117,stroke:#8b949e,stroke-width:2px,color:#fff

    subgraph Attack_Vector [Initial Access]
        A[Malicious Candidate] -->|Uploads PDF| B(Resume w/ Hidden Prompt)
        B:::attacker
    end

    subgraph Trust_Boundary [Dual-LLM Trust Boundary]
        B -->|Raw Text Input| C{Unprivileged LLM <br/> Sanitizer}
        C:::unprivileged
        C -->|Outputs Strict JSON <br/> Commands Stripped| D[Privileged LLM <br/> Evaluator]
        D:::privileged
    end

    subgraph Execution_Gateway [Execution Boundary]
        D -.->|Attempts Tool Invocation| E[HITL Gateway & Honeypot]
        E:::hitl
        E -->|Suspends Execution| F((Admin Approval Required))
        F:::hitl
        F -- "Deny (N)" --> G[Drop Malicious Call]
        F -- "Approve (Y)" --> H[(Live HR Database)]
        H:::database
    end
</pre>

<style>
  /* Fancy container styling */
  .mermaid-wrapper {
    background: radial-gradient(circle at 50% 0%, #1c2333 0%, #0d1117 80%);
    border: 1px solid #30363d;
    border-radius: 12px;
    padding: 2.5rem 1.5rem;
    margin: 2rem 0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
    overflow-x: auto;
  }
</style>

<div class="mermaid-wrapper">
<pre class="mermaid">
flowchart TD
    %% Base Links & Line Styles
    linkStyle default stroke:#58a6ff,stroke-width:2px,stroke-dasharray: 0;

    subgraph Attack_Vector [" 🚨 UNTRUSTED INPUT ZONE "]
        A(["🦹 Malicious Candidate"]):::attacker -->|"📄 Uploads Resume"| B["Hidden Prompt Injection<br/><small style='color:#f85149'>(1pt Invisible Payload)</small>"]:::attackerCard
    end

    subgraph Trust_Boundary [" 🛡️ DUAL-LLM TRUST BOUNDARY "]
        B -->|"Raw Untrusted Text"| C{"🧹 Unprivileged LLM<br/><b>Data Sanitizer</b>"}:::sanitizer
        C ==>|"Strict JSON Schema<br/>(Commands Stripped)"| D["⚖️ Privileged LLM<br/><b>Core Evaluator</b>"]:::evaluator
    end

    subgraph Execution_Gateway [" ⚡ EXECUTION & ENFORCEMENT "]
        D -.->|"Attempts Tool Call"| E{{"🪤 Honeypot & HITL Gateway"}}:::gateway
        E -->|"Action Paused"| F(["🛑 Admin Terminal Confirmation"]):::hitl
        F -- "❌ Block & Drop" --> G["🛡️ Threat Neutralized"]:::secure
        F -- "✔️ Authorized" --> H[("🗄️ Live HR Database")]:::database
    end

    %% Class Definitions with Modern Glow & Palette
    classDef attacker fill:#2b1016,stroke:#f85149,stroke-width:2px,color:#ff7b72,font-weight:bold;
    classDef attackerCard fill:#1f1315,stroke:#da3633,stroke-width:1.5px,stroke-dasharray: 4 4,color:#ffa198;
    classDef sanitizer fill:#1a102f,stroke:#bc8cff,stroke-width:2px,color:#d2a8ff,font-weight:bold;
    classDef evaluator fill:#0c213b,stroke:#388bfd,stroke-width:2px,color:#79c0ff,font-weight:bold;
    classDef gateway fill:#2e1f04,stroke:#d29922,stroke-width:2px,color:#e3b341,font-weight:bold;
    classDef hitl fill:#211824,stroke:#f0883e,stroke-width:2px,color:#ffa657,font-weight:bold;
    classDef secure fill:#0d281e,stroke:#238636,stroke-width:2px,color:#56d364,font-weight:bold;
    classDef database fill:#161b22,stroke:#8b949e,stroke-width:2px,color:#c9d1d9;
</pre>
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
  
  /* Vertical connecting line */
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
    margin-left: 48px; /* Room for the connecting line */
    position: relative;
    color: #c9d1d9;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    z-index: 1;
  }

  /* Node circles on the connecting line */
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


<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({
    startOnLoad: true,
    theme: 'base',
    themeVariables: {
      darkMode: true,
      background: 'transparent',
      mainBkg: '#161b22',
      clusterBkg: '#161b2255',
      clusterBorder: '#30363d',
      titleColor: '#e6edf3',
      lineColor: '#58a6ff',
      textColor: '#e6edf3',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif'
    }
  });
</script>