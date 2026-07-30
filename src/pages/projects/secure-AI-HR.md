---
layout: ../../layouts/ProjectLayout.astro
title: "Secure AI HR Agent"
---

# Secure AI HR Agent

Most AI resume screeners simply pass candidate PDFs to an LLM, making them highly vulnerable to prompt injection, data leaks, and code execution. This project demonstrates how we exploited a naive HR agent across the **OWASP LLM Top 10** and implemented production-grade defenses to patch each vulnerability.

---

## Phase 1: Security Architecture

To mitigate primary entry vectors, the core pipeline enforces three foundational controls before any prompt hits an external model:

* **Dual-LLM Isolation:** A local, low-privilege "Sanitizer Model" strips invisible fonts, zero-width characters, and instruction overrides prior to evaluation.
* **PII Airgap:** `Microsoft Presidio` sanitizes candidate names, emails, and addresses in-memory before sending text to third-party LLM endpoints.
* **Strict Schema Enforcement:** `Pydantic` and `LangChain` structured output parsers reject non-JSON or malformed outputs at the API boundary.

---

## Vulnerability Showcase (Attacks & Defenses)

<style>
  .owasp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.25rem;
    margin: 2rem 0;
  }
  
  .owasp-card {
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 10px;
    padding: 1.25rem;
    text-decoration: none;
    color: #c9d1d9;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease var(--delay, 0ms),
                transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms),
                border-color 0.2s ease,
                box-shadow 0.2s ease;
  }

  .owasp-card.is-loaded {
    opacity: 1;
    transform: translateY(0);
  }

  .owasp-card.is-loaded:hover {
    transform: translateY(-3px);
    border-color: #58a6ff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    transition-delay: 0ms !important;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .owasp-id {
    font-size: 0.75rem;
    font-family: var(--font-mono, monospace);
    color: #58a6ff;
    font-weight: 700;
    background: rgba(56, 139, 253, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
  }

  .owasp-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: #f0f6fc;
    margin: 0 0 0.75rem 0;
  }

  .pill-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.85rem;
  }

  .pill {
    padding: 0.4rem 0.6rem;
    border-radius: 6px;
    line-height: 1.3;
  }

  .pill-attack {
    background: rgba(248, 81, 73, 0.1);
    border-left: 3px solid #f85149;
    color: #ff7b72;
  }

  .pill-defense {
    background: rgba(46, 160, 67, 0.1);
    border-left: 3px solid #2ea043;
    color: #7ee787;
  }

  .pill label {
    font-weight: bold;
    display: block;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 2px;
  }
</style>

<div class="owasp-grid" id="owasp-vulns">

  <!-- LLM01 -->
  <a href="/projects/secure-AI-HR/llm01/" class="owasp-card" style="--delay: 0ms">
    <div>
      <div class="card-header"><span class="owasp-id">LLM01:2025</span></div>
      <h3 class="owasp-title">Prompt Injection</h3>
      <div class="pill-group">
        <div class="pill pill-attack"><label>Attack</label> Hidden PDF text forcing a 10/10 score.</div>
        <div class="pill pill-defense"><label>Defense</label> Dual-LLM sanitizer & AST parsing.</div>
      </div>
    </div>
  </a>

  <!-- LLM02 -->
  <a href="/projects/secure-AI-HR/llm02/" class="owasp-card" style="--delay: 100ms">
    <div>
      <div class="card-header"><span class="owasp-id">LLM02:2025</span></div>
      <h3 class="owasp-title">Sensitive Info Disclosure</h3>
      <div class="pill-group">
        <div class="pill pill-attack"><label>Attack</label> RAG context leaking SSNs & salaries.</div>
        <div class="pill pill-defense"><label>Defense</label> MS Presidio PII redactions.</div>
      </div>
    </div>
  </a>

  <!-- LLM03 -->
  <a href="/projects/secure-AI-HR/llm03/" class="owasp-card" style="--delay: 200ms">
    <div>
      <div class="card-header"><span class="owasp-id">LLM03:2025</span></div>
      <h3 class="owasp-title">Supply Chain Vulnerabilities</h3>
      <div class="pill-group">
        <div class="pill pill-attack"><label>Attack</label> Compromised PyPI parsing packages.</div>
        <div class="pill pill-defense"><label>Defense</label> Pinning hashes & SBOM auditing.</div>
      </div>
    </div>
  </a>

  <!-- LLM04 -->
  <a href="/projects/secure-AI-HR/llm04/" class="owasp-card" style="--delay: 300ms">
    <div>
      <div class="card-header"><span class="owasp-id">LLM04:2025</span></div>
      <h3 class="owasp-title">Data and Model Poisoning</h3>
      <div class="pill-group">
        <div class="pill pill-attack"><label>Attack</label> Backdoored embeddings favoring candidates.</div>
        <div class="pill pill-defense"><label>Defense</label> Vector anomaly checks & dataset validation.</div>
      </div>
    </div>
  </a>

  <!-- LLM05 -->
  <a href="/projects/secure-AI-HR/llm05/" class="owasp-card" style="--delay: 400ms">
    <div>
      <div class="card-header"><span class="owasp-id">LLM05:2025</span></div>
      <h3 class="owasp-title">Improper Output Handling</h3>
      <div class="pill-group">
        <div class="pill pill-attack"><label>Attack</label> XSS payload in job title executing in ATS.</div>
        <div class="pill pill-defense"><label>Defense</label> Pydantic validation & DOMPurify.</div>
      </div>
    </div>
  </a>

  <!-- LLM06 -->
  <a href="/projects/secure-AI-HR/llm06/" class="owasp-card" style="--delay: 500ms">
    <div>
      <div class="card-header"><span class="owasp-id">LLM06:2025</span></div>
      <h3 class="owasp-title">Excessive Agency</h3>
      <div class="pill-group">
        <div class="pill pill-attack"><label>Attack</label> Tricking agent to auto-reject candidates.</div>
        <div class="pill pill-defense"><label>Defense</label> Human-in-the-loop approval gates.</div>
      </div>
    </div>
  </a>

  <!-- LLM07 -->
  <a href="/projects/secure-AI-HR/llm07/" class="owasp-card" style="--delay: 600ms">
    <div>
      <div class="card-header"><span class="owasp-id">LLM07:2025</span></div>
      <h3 class="owasp-title">System Prompt Leakage</h3>
      <div class="pill-group">
        <div class="pill pill-attack"><label>Attack</label> Extracting internal grading rubrics.</div>
        <div class="pill pill-defense"><label>Defense</label> Post-processing semantic output filters.</div>
      </div>
    </div>
  </a>

  <!-- LLM08 -->
  <a href="/projects/secure-AI-HR/llm08/" class="owasp-card" style="--delay: 700ms">
    <div>
      <div class="card-header"><span class="owasp-id">LLM08:2025</span></div>
      <h3 class="owasp-title">Vector & Embedding Weaknesses</h3>
      <div class="pill-group">
        <div class="pill pill-attack"><label>Attack</label> Vector collision overrides in RAG.</div>
        <div class="pill pill-defense"><label>Defense</label> Distance thresholds & metadata isolation.</div>
      </div>
    </div>
  </a>

  <!-- LLM09 -->
  <a href="/projects/secure-AI-HR/llm09/" class="owasp-card" style="--delay: 800ms">
    <div>
      <div class="card-header"><span class="owasp-id">LLM09:2025</span></div>
      <h3 class="owasp-title">Misinformation</h3>
      <div class="pill-group">
        <div class="pill pill-attack"><label>Attack</label> Hallucinating non-existent degrees/skills.</div>
        <div class="pill pill-defense"><label>Defense</label> Citation enforcement against raw text.</div>
      </div>
    </div>
  </a>

  <!-- LLM10 -->
  <a href="/projects/secure-AI-HR/llm10/" class="owasp-card" style="--delay: 900ms">
    <div>
      <div class="card-header"><span class="owasp-id">LLM10:2025</span></div>
      <h3 class="owasp-title">Unbounded Consumption</h3>
      <div class="pill-group">
        <div class="pill pill-attack"><label>Attack</label> ReDoS / 100-page PDF resource exhaustion.</div>
        <div class="pill pill-defense"><label>Defense</label> Strict file-size limits & token bucket rate limiting.</div>
      </div>
    </div>
  </a>

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