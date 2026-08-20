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