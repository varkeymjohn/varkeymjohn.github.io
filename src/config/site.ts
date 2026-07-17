export const siteConfig = {
  brand: {
    name: 'Varkey M John',
    logoText: './Varkey_M_John',
  },
  seo: {
    title: 'Varkey M John - Portfolio',
    description:
      'A dark terminal-inspired Astro theme for security consultants, penetration testers, and incident response specialists.',
    author: 'Varkey M John',
    keywords:
      'security consultant portfolio, penetration testing, cybersecurity website',
    siteName: 'Varkey M John',
    themeColor: '#0D1117',
    twitterCard: 'summary',
  },
  jsonLd: {
    type: 'ProfessionalService',
    areaServed: 'Worldwide',
    serviceType: [
      'Penetration Testing',
      'Security Engineering',
      'Vulnerability Assessment',
      'Infrastructure Security',
    ],
  },
  navLinks: [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certs', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ],
  contact: {
    email: 'vjohn8@gatech.edu',
    formHelp: '',
    emailLabel: 'TARGET_EMAIL',
    emailPlaceholder: 'vjohn8@gatech.edu',
    messageLabel: 'PAYLOAD',
    messagePlaceholder: 'Enter scope details...',
    submitLabel: 'Execute Transmit',
  },
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/varkeymjohn' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/varkeymjohn/' },
  ],
  hero: {
    command: 'scanning...',
    terminalSequence: ['scanning...', 'threat profile mapped...', 'access granted...'],
    title: 'Find The Breach',
    highlightedTitle: 'Before It Finds You',
    description:
      'I identify vulnerabilities before adversaries do. Specializing in penetration testing, security engineering, and securing mission-critical infrastructure.',
    primaryCta: { label: 'Initiate Contact', href: '#contact' },
    secondaryCta: { label: 'View Projects', href: '#projects' },
    proof: {
      stats: [
        { value: 10, suffix: '+', label: 'red team engagements' },
        { value: 6, suffix: '', label: 'papers published' },
        { value: 1, suffix: '', label: 'certifications' },
      ],
    },
  },
  sections: {
    services: {
      heading: 'sudo list-services',
    },
    toolstack: {
      heading: 'ls -la /opt/tools',
      terminalTitle: '/opt/tools - secure inventory',
      promptUser: 'op@node',
      promptPath: '/opt/tools',
      command: 'ls -la',
      summary: {
        directories: 4,
        tools: 18,
      },
    },
    projects: {
      heading: 'cat /var/log/projects',
    },
    certifications: {
      heading: 'cat /etc/certs',
    },
    contact: {
      heading: './establish-link',
    },
  },
  services: [
    {
      title: 'Penetration Testing',
      desc: 'Comprehensive red-team operations simulating advanced persistent threats to uncover critical vulnerabilities.',
      icon: 'lock',
    },
    {
      title: 'Security Engineering',
      desc: 'Proactive design, deployment, and optimization of defensive architectures.',
      icon: 'dns',
    },
    {
      title: 'Vulnerability Assessment',
      desc: 'Systematic identification, quantification, and prioritization of infrastructure weaknesses. Penetration testing and risk remediation.',
      icon: 'shield',
    },
    {
      title: 'Infrastructure Security',
      desc: 'Securing underlying networks and systems by implementing zero-trust frameworks, strict access controls, and comprehensive environment hardening.',
      icon: 'memory',
    },
  ],
  toolCategories: [
    {
      name: 'offensive',
      owner: 'redteam',
      size: '28K',
      tools: ['Burp Suite Pro', 'Metasploit',  'Nmap', 'Wireshark'],
    },
    {
      name: 'scripting-dev',
      owner: 'operator',
      size: '34K',
      tools: ['Python', 'Bash'],
    },
  ],
  projects: [
    {
      name: 'Secure AI HR',
      category: 'AI Security Pipeline',
      desc: 'Zero-trust LLM evaluation pipeline mitigating OWASP Top 10 vulnerabilities.',
      tech: ['LangChain', 'Python'],
      url: "projects/secure-AI-HR",
    },
  ],
  certifications: [
    {
      name: 'CAISP',
      title: 'Certified AI Security Professional',
      issuer: 'Practical DevSecOps',
      file: 'caisp.cert',
      issued: '2026-06-17',
      status: 'active',
    },
  ],
  footer: {
    status: 'CONNECTION SECURE',
  },
} as const;
