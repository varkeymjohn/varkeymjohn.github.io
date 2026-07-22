---
layout: ../../layouts/ProjectLayout.astro
title: "Zero-Trust MCP Security Gateway & Observability Proxy"
---

# Zero-Trust MCP Security Gateway

Thousands of Model Context Protocol (MCP) servers are currently deployed locally with zero trust boundaries, allowing AI agents unrestricted access to system tools. In this project, I engineered a transparent middleware in Node.js that intercepts JSON-RPC streams over standard I/O, logging all interactions and blocking dangerous commands before they reach the host system.

## The Architecture

The proxy sits directly between the MCP Host (e.g., Claude Desktop or a local Go-based client) and the target MCP Server, acting as a real-time security gatekeeper.

### Core Features Implemented:

* **Zero-Trust Policy Enforcement:** Implemented real-time payload inspection to enforce strict access controls. The proxy automatically drops unauthorized system tool calls (e.g., `write_file`, `drop_database`) and returns custom JSON-RPC error codes to mitigate prompt injection.
* **AI Observability Pipeline:** Designed an automated audit-logging mechanism that captures bidirectional telemetry, recording host requests, blocked policies, and server responses to an immutable local log file for forensic review.
* **Local LLM Integration:** Bridged the secure proxy with local Ollama models (`qwen3:1.7b`) and Go-based MCP hosts (`mcphost`) to guarantee safe, sandboxed execution of autonomous agent workflows without relying on external APIs.

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
    <h3 class="tech-title">Node.js & JSON-RPC</h3>
    <p class="tech-desc">Core proxy infrastructure handling raw standard input/output streams and parsing protocol messages.</p>
  </div>
  
  <div class="tech-card">
    <h3 class="tech-title">Ollama & Qwen3</h3>
    <p class="tech-desc">Local, lightweight large language model execution for secure, air-gapped agentic workflows.</p>
  </div>

  <div class="tech-card">
    <h3 class="tech-title">Go (mcphost)</h3>
    <p class="tech-desc">Lightweight client bridging the local LLM to the protected Model Context Protocol servers.</p>
  </div>
</div>