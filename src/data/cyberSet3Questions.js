const code = (...lines) => lines.join("\n");
const setId = "cyber-set3";

function item(type, data) {
  const levels = { mcq: "MCQ", tf: "True/False", fill: "Complete", code: "Typed Answer" };
  return { type, level: levels[type], ...data };
}

const mcq = (prompt, choices, answer, explanation, snippet) =>
  item("mcq", { prompt, choices, answer, explanation, ...(snippet ? { snippet } : {}) });
const tf = (prompt, answer, explanation, snippet) =>
  item("tf", { prompt, answer, explanation, ...(snippet ? { snippet } : {}) });
const fill = (prompt, snippet, blanks, explanation) =>
  item("fill", { prompt, snippet, blanks, explanation });
// Cyber typed answers are short terms; the 4th arg lists ACCEPTED synonyms
// (any exact match passes), graded case-insensitively.
const typed = (prompt, starter, expected, accepted, explanation) =>
  item("code", { prompt, starter, expected, accepted: accepted ?? [expected], explanation, caseInsensitive: true });

function attach(moduleId, items) {
  return items.map((question, index) => ({
    id: `${moduleId}-${String(index + 1).padStart(2, "0")}`,
    setId,
    moduleId,
    ...question
  }));
}

export const cyberSet3Modules = [
  { id: "cy3-threat-modeling", setId, title: "Threat Modeling with STRIDE" },
  { id: "cy3-kill-chain", setId, title: "Kill Chain and MITRE ATT&CK" },
  { id: "cy3-pentest-ethics", setId, title: "Authorized Testing and Ethics" },
  { id: "cy3-owasp", setId, title: "OWASP Top 10 in Depth" },
  { id: "cy3-auth-deep", setId, title: "OAuth, JWT, and Session Depth" },
  { id: "cy3-cloud-iam", setId, title: "Cloud Security and IAM" },
  { id: "cy3-detection", setId, title: "Detection Engineering (Blue Team)" },
  { id: "cy3-forensics", setId, title: "Digital Forensics" },
  { id: "cy3-governance", setId, title: "Governance, Risk, and Compliance" },
  { id: "cy3-zero-trust-crypto", setId, title: "Zero Trust and Applied Cryptography" }
];

export const cyberSet3Lessons = {
  "cy3-threat-modeling": {
    summary:
      "Threat modeling is structured thinking about what can go wrong BEFORE you build — far cheaper than fixing breaches later. You diagram the system, identify trust boundaries (where data crosses from less-trusted to more-trusted), enumerate threats, and decide mitigations. STRIDE is the classic checklist of six threat types: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, and Elevation of privilege — each the violation of a specific security property (authentication, integrity, non-repudiation, confidentiality, availability, authorization).",
    points: [
      "Threat model early: design-time fixes are orders of magnitude cheaper than breach response.",
      "STRIDE: Spoofing, Tampering, Repudiation, Information disclosure, DoS, Elevation of privilege.",
      "Each STRIDE category maps to a defeated property (authN, integrity, non-repudiation, etc.).",
      "Trust boundaries are where data changes trust level — scrutinize every crossing."
    ],
    example: code(
      "STRIDE mapped to the property it attacks:",
      "  Spoofing ................. defeats Authentication",
      "  Tampering ................ defeats Integrity",
      "  Repudiation .............. defeats Non-repudiation (logging/signing)",
      "  Information disclosure ... defeats Confidentiality",
      "  Denial of service ........ defeats Availability",
      "  Elevation of privilege ... defeats Authorization"
    )
  },
  "cy3-kill-chain": {
    summary:
      "Attacks unfold in stages, and naming them helps defenders intervene early. The Lockheed Martin CYBER KILL CHAIN runs: Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Command & Control (C2), and Actions on Objectives. MITRE ATT&CK is a living knowledge base of real-world attacker TACTICS (the why — e.g., Persistence, Lateral Movement) and TECHNIQUES (the how). Defenders use ATT&CK to map their detection coverage and find gaps. The key insight: break any single link and you disrupt the whole attack.",
    points: [
      "Kill chain stages: Recon, Weaponize, Deliver, Exploit, Install, C2, Actions on Objectives.",
      "Earlier you detect/break a link, the cheaper the defense.",
      "MITRE ATT&CK catalogs real adversary Tactics (goals) and Techniques (methods).",
      "Map your detections to ATT&CK to expose blind spots."
    ],
    example: code(
      "Defending across the kill chain:",
      "  Recon ......... limit public info, monitor scanning",
      "  Delivery ...... email filtering, attachment sandboxing",
      "  Exploitation .. patching, EDR",
      "  C2 ............ egress filtering, DNS monitoring",
      "Breaking ONE link can stop the entire operation."
    )
  },
  "cy3-pentest-ethics": {
    summary:
      "The single line that separates a security professional from a criminal is AUTHORIZATION. Penetration testing and red-teaming are legal and valuable ONLY with explicit written permission defining SCOPE (what systems) and RULES OF ENGAGEMENT (what's allowed, when, and how). Acting outside scope — or with no authorization — is a crime regardless of intent. When you find a vulnerability you weren't hired to test, practice RESPONSIBLE DISCLOSURE: report it privately to the owner and give them time to fix before any public mention. White-hat = authorized; black-hat = criminal; gray-hat = unauthorized but non-malicious (still illegal).",
    points: [
      "No authorization = a crime, full stop — intent does not make it legal.",
      "A written scope and rules of engagement define and bound every engagement.",
      "Responsible/coordinated disclosure: report privately, allow time to fix.",
      "White-hat (authorized), black-hat (malicious), gray-hat (unauthorized, non-malicious but still illegal)."
    ],
    example: code(
      "Before ANY testing, you must have in writing:",
      "  - Explicit authorization from the system owner",
      "  - Defined scope (which IPs / domains / apps are in-bounds)",
      "  - Rules of engagement (allowed techniques, timing, contacts)",
      "",
      "Found a bug in the wild? Report it privately. Never test systems you don't own",
      "or lack written permission to assess."
    )
  },
  "cy3-owasp": {
    summary:
      "The OWASP Top 10 is the industry's consensus list of the most critical web application security risks, and knowing it is baseline literacy. Recent top entries include Broken Access Control (the #1 risk — users doing things they shouldn't), Cryptographic Failures (weak or missing encryption), and Injection (SQLi/XSS). Others cover Insecure Design, Security Misconfiguration, Vulnerable Components, Identification & Authentication Failures, Software/Data Integrity Failures, Logging & Monitoring Failures, and Server-Side Request Forgery (SSRF). The list is a prioritization guide, not a complete checklist.",
    points: [
      "Broken Access Control is currently the #1 risk — enforce authZ server-side, default deny.",
      "Cryptographic Failures: missing/weak encryption of sensitive data in transit and at rest.",
      "Injection (incl. XSS) remains in the top tier — parameterize and encode.",
      "It's a prioritization guide of RISK CATEGORIES, refreshed as the landscape changes."
    ],
    example: code(
      "Broken Access Control (the #1 category) in one request:",
      "  GET /api/orders/1003   (your order — fine)",
      "  GET /api/orders/1004   (someone else's order — should be DENIED)",
      "",
      "If the server returns order 1004 without an ownership check,",
      "that is an Insecure Direct Object Reference (IDOR) — broken access control."
    )
  },
  "cy3-auth-deep": {
    summary:
      "Modern auth has vocabulary worth getting right. OAuth 2.0 is an AUTHORIZATION framework — it lets an app get limited, delegated access (a scoped token) to your data on another service WITHOUT your password. OpenID Connect adds AUTHENTICATION on top of OAuth. A JWT (JSON Web Token) is a signed, self-contained token with three parts (header.payload.signature); the signature proves it wasn't altered, but the payload is only base64-encoded, NOT encrypted — never put secrets in it. Sessions vs tokens is a real tradeoff: server-side sessions are easy to revoke; stateless JWTs scale but are hard to revoke before expiry, so keep them short-lived.",
    points: [
      "OAuth 2.0 = delegated AUTHORIZATION (scoped access without sharing passwords).",
      "OpenID Connect = authentication layer built on OAuth.",
      "JWT = header.payload.signature; signed (tamper-evident) but payload is readable — no secrets in it.",
      "Sessions revoke easily; JWTs scale but resist revocation — keep them short-lived."
    ],
    example: code(
      "A JWT has three dot-separated parts:",
      "  eyJhbGciOi...  .  eyJzdWIiOi...  .  SflKxwRJSM...",
      "    header           payload          signature",
      "",
      "The signature proves integrity; the payload is only base64url-encoded.",
      "Anyone can DECODE the payload -> never store secrets there."
    )
  },
  "cy3-cloud-iam": {
    summary:
      "Cloud security runs on the SHARED RESPONSIBILITY MODEL: the provider secures the cloud (hardware, hypervisor), and YOU secure what you put IN it (data, configuration, access). The most common cloud breaches are not provider hacks — they are customer MISCONFIGURATIONS, like a public storage bucket. IAM (Identity and Access Management) governs who can do what; apply least privilege rigorously, prefer short-lived roles over long-lived keys, and never embed cloud credentials in code. Encrypt data at rest and in transit, and audit IAM continuously.",
    points: [
      "Shared responsibility: provider secures the cloud, YOU secure your data/config/access.",
      "Misconfiguration (e.g., public buckets) is a top cause of cloud breaches.",
      "IAM least privilege: scoped roles, short-lived credentials, no hardcoded keys.",
      "Encrypt at rest and in transit; continuously audit permissions."
    ],
    example: code(
      "Shared responsibility, simplified:",
      "  Provider secures: data centers, hardware, hypervisor, managed services",
      "  YOU secure:       your data, IAM policies, network rules, app config",
      "",
      "A storage bucket left 'public' is YOUR misconfiguration, not a provider hack."
    )
  },
  "cy3-detection": {
    summary:
      "Blue-team detection engineering builds the eyes that catch attackers. It pairs prevention with DETECTION and RESPONSE because prevention always eventually fails. Key tools: EDR (Endpoint Detection and Response) on hosts, a SIEM correlating logs, and detection rules tuned to real attacker techniques (mapped to MITRE ATT&CK). Engineers fight two errors: FALSE POSITIVES (noise that causes alert fatigue) and FALSE NEGATIVES (missed real attacks). Threat hunting proactively searches for adversaries that slipped past automated alerts. The aim is to shrink dwell time — how long an attacker goes undetected.",
    points: [
      "Assume prevention fails: invest in detection AND response, not just walls.",
      "EDR (endpoints) + SIEM (correlation) + rules mapped to ATT&CK techniques.",
      "Balance false positives (alert fatigue) against false negatives (missed attacks).",
      "Threat hunting proactively seeks intruders; the goal is to cut dwell time."
    ],
    example: code(
      "A detection's two failure modes:",
      "  False positive -> benign activity flagged -> analysts drown in noise",
      "  False negative -> real attack missed -> attacker dwells undetected",
      "",
      "Good detection engineering tunes rules to catch real techniques",
      "while keeping noise low enough that humans still trust the alerts."
    )
  },
  "cy3-forensics": {
    summary:
      "Digital forensics is the disciplined collection and analysis of evidence after an incident, in a way that holds up to scrutiny. Two principles dominate. ORDER OF VOLATILITY: capture the most fleeting evidence first — RAM and running processes vanish on reboot, disk persists, backups last longest. CHAIN OF CUSTODY: document who handled evidence, when, and how, so it remains trustworthy (and legally admissible). Always work on a verified COPY (with a matching hash) of the original, never the original itself, so you cannot accidentally alter the evidence.",
    points: [
      "Order of volatility: collect RAM/processes first, then disk, then backups.",
      "Chain of custody: document every handler and action to keep evidence trustworthy.",
      "Work on a hash-verified IMAGE, never the original media.",
      "Forensic readiness (logging, retention) is set up long before an incident."
    ],
    example: code(
      "Order of volatility (most -> least fleeting):",
      "  1. CPU registers / cache",
      "  2. RAM and running processes   <- gone on reboot, grab early",
      "  3. Disk / files",
      "  4. Backups / archives          <- most durable",
      "",
      "Image the disk, hash it, and analyze the COPY — preserve the original."
    )
  },
  "cy3-governance": {
    summary:
      "Security is also policy and law, captured as GRC: Governance, Risk, and Compliance. Governance sets direction (policies, ownership); risk management identifies and treats risk; compliance meets external requirements. Know the landmark frameworks and laws: GDPR (EU data-protection law with heavy fines), HIPAA (US health data), PCI DSS (payment cards), SOC 2 (service-org trust controls), and ISO 27001 / NIST CSF (management frameworks). Crucially, compliance is a MINIMUM bar, not a guarantee of security — you can be compliant and still breached. Policies only matter if they're enforced and trained.",
    points: [
      "GRC = Governance (direction), Risk (treatment), Compliance (external requirements).",
      "Know the big ones: GDPR, HIPAA, PCI DSS, SOC 2, ISO 27001, NIST CSF.",
      "Compliance is a floor, not a ceiling — compliant systems still get breached.",
      "Policies need enforcement and training to mean anything."
    ],
    example: code(
      "Matching a rule to its domain:",
      "  GDPR ..... EU personal data protection (privacy, big fines)",
      "  HIPAA .... US healthcare data",
      "  PCI DSS .. payment card data",
      "  SOC 2 .... trust controls for service providers",
      "",
      "Passing the audit is the START of security maturity, not the finish."
    )
  },
  "cy3-zero-trust-crypto": {
    summary:
      "ZERO TRUST replaces the old 'trusted internal network' with a simple maxim: never trust, always verify. Every request is authenticated, authorized, and encrypted regardless of where it originates — there is no safe inside. It leans on strong identity, least privilege, micro-segmentation, and continuous verification. On the crypto side, master the applied distinctions: HASHING verifies integrity (and stores passwords); ENCRYPTION provides confidentiality; DIGITAL SIGNATURES (sign with a private key, verify with the public key) provide authenticity, integrity, and non-repudiation; and PKI/certificates bind public keys to identities through trusted Certificate Authorities.",
    points: [
      "Zero Trust: never trust by location; verify every request, every time.",
      "Hashing = integrity; encryption = confidentiality; signatures = authenticity + non-repudiation.",
      "Digital signature: sign with PRIVATE key, verify with PUBLIC key (reverse of encryption).",
      "PKI/CAs bind public keys to identities so you can trust a certificate."
    ],
    example: code(
      "Choosing the right crypto tool for the job:",
      "  Need to detect tampering? .............. HASH it",
      "  Need to keep it secret? ................ ENCRYPT it",
      "  Need to prove who sent it (unforgeable)?  SIGN it (private key)",
      "",
      "Zero Trust verifies identity + device + context on EVERY request,",
      "inside the network or out — there is no trusted perimeter."
    )
  }
};

export const cyberSet3Questions = [
  ...attach("cy3-threat-modeling", [
    mcq("What is the goal of threat modeling?", ["To anticipate what can go wrong before/while building a system", "To fix bugs only after a breach", "To replace firewalls"], "To anticipate what can go wrong before/while building a system", "Design-time threat analysis is far cheaper than post-breach remediation."),
    mcq("What does the 'S' in STRIDE stand for?", ["Spoofing", "Scanning", "Salting"], "Spoofing", "STRIDE = Spoofing, Tampering, Repudiation, Information disclosure, DoS, Elevation of privilege."),
    mcq("In STRIDE, 'Elevation of privilege' is the violation of which property?", ["Authorization", "Availability", "Confidentiality"], "Authorization", "Gaining unauthorized higher access defeats authorization controls."),
    mcq("'Tampering' in STRIDE attacks which security property?", ["Integrity", "Availability", "Non-repudiation"], "Integrity", "Tampering is unauthorized modification — an integrity violation."),
    tf("A trust boundary is a point where data moves between different trust levels.", true, "Trust boundaries (e.g., internet to server) are where threats most need scrutiny."),
    tf("Threat modeling is only worth doing after an application has been breached.", false, "Its value is greatest at design time, before vulnerabilities ship."),
    mcq("'Repudiation' threats are countered primarily by:", ["Logging and digital signatures", "Faster CPUs", "Bigger disks"], "Logging and digital signatures", "Non-repudiation evidence (logs, signatures) prevents denying actions."),
    mcq("'Information disclosure' in STRIDE maps to a loss of:", ["Confidentiality", "Availability", "Integrity"], "Confidentiality", "Disclosure exposes data to unauthorized parties — a confidentiality failure."),
    fill("The STRIDE letter 'D' that maps to Availability stands for __1__ of service.", "__1__ of service", [{ label: "__1__", answers: ["denial"] }], "Denial of service attacks availability."),
    typed("Name the six-category threat-modeling mnemonic (one word).", "", "stride", ["stride"], "STRIDE enumerates Spoofing, Tampering, Repudiation, Information disclosure, DoS, and Elevation of privilege.")
  ]),
  ...attach("cy3-kill-chain", [
    mcq("What is the FIRST stage of the Cyber Kill Chain?", ["Reconnaissance", "Exploitation", "Command and Control"], "Reconnaissance", "Attackers begin by gathering information about the target."),
    mcq("'Command and Control' (C2) in the kill chain refers to:", ["The attacker remotely directing compromised systems", "The victim's help desk", "A backup server"], "The attacker remotely directing compromised systems", "C2 channels let attackers control implants after installation."),
    mcq("MITRE ATT&CK is best described as:", ["A knowledge base of real-world attacker tactics and techniques", "A firewall product", "An encryption standard"], "A knowledge base of real-world attacker tactics and techniques", "ATT&CK catalogs adversary behavior to guide detection and defense."),
    mcq("In ATT&CK, a TACTIC represents:", ["The attacker's goal (the 'why')", "A specific tool", "A password"], "The attacker's goal (the 'why')", "Tactics are objectives (e.g., Persistence); techniques are the 'how'."),
    tf("Detecting and breaking an attack earlier in the kill chain is generally cheaper than later.", true, "Stopping recon/delivery prevents the costlier later stages entirely."),
    tf("MITRE ATT&CK is mainly used to write malware.", false, "Defenders use ATT&CK to map detection coverage and find gaps."),
    mcq("Egress (outbound) traffic filtering most directly disrupts which kill-chain stage?", ["Command and Control", "Reconnaissance", "Weaponization"], "Command and Control", "Blocking outbound C2 traffic cuts the attacker's remote control."),
    mcq("Why do defenders map detections to MITRE ATT&CK techniques?", ["To find coverage gaps against real adversary behavior", "To slow down the network", "To replace patching"], "To find coverage gaps against real adversary behavior", "Mapping reveals which attacker techniques you can and cannot detect."),
    fill("In ATT&CK, the attacker's goal is a tactic; the specific method is a __1__.", "a __1__", [{ label: "__1__", answers: ["technique"] }], "Techniques describe how a tactic is achieved."),
    typed("What 2-letter abbreviation names an attacker's remote control channel over compromised hosts?", "", "c2", ["c2", "cnc", "c&c"], "C2 (Command and Control) directs compromised systems.")
  ]),
  ...attach("cy3-pentest-ethics", [
    mcq("What is the single most important prerequisite before any penetration test?", ["Explicit written authorization from the system owner", "A fast internet connection", "A new laptop"], "Explicit written authorization from the system owner", "Without authorization, testing is illegal regardless of intent."),
    mcq("Testing a system you do not own, without permission, is:", ["A crime, even if you intend no harm", "Fine if you find a bug", "Allowed if the system is online"], "A crime, even if you intend no harm", "Authorization, not intent, is what makes security testing lawful."),
    mcq("The document defining which systems are in-bounds for a test is the:", ["Scope", "Invoice", "README"], "Scope", "Scope bounds exactly what may be tested; acting outside it is unauthorized."),
    mcq("Responsible (coordinated) disclosure means:", ["Privately reporting a flaw and giving time to fix before going public", "Posting the exploit publicly immediately", "Selling it to the highest bidder"], "Privately reporting a flaw and giving time to fix before going public", "Coordinated disclosure protects users while the vendor remediates."),
    tf("A 'gray-hat' who hacks without permission but without malice is still acting illegally.", true, "Lack of authorization makes the activity unlawful regardless of motive."),
    tf("Rules of engagement specify allowed techniques, timing, and points of contact for a test.", true, "ROE bound how testing is conducted to avoid harm and confusion."),
    mcq("A 'white-hat' hacker is one who:", ["Operates with authorization to improve security", "Attacks for personal profit", "Has no skills"], "Operates with authorization to improve security", "White-hats are authorized, ethical security professionals."),
    mcq("During an authorized test you discover a system clearly OUTSIDE the agreed scope. You should:", ["Stop and consult the client before touching it", "Test it anyway since you're already here", "Ignore the engagement rules"], "Stop and consult the client before touching it", "Out-of-scope systems require fresh authorization; never exceed scope."),
    fill("Penetration testing is legal only with explicit written __1__ from the owner.", "written __1__", [{ label: "__1__", answers: ["authorization", "authorisation", "permission"] }], "Authorization is the line between security work and crime."),
    typed("Term for privately reporting a vulnerability and allowing time to fix it before public release (two words, 'responsible' + ?).", "", "responsible disclosure", ["responsible disclosure", "coordinated disclosure"], "Responsible/coordinated disclosure protects users during remediation.")
  ]),
  ...attach("cy3-owasp", [
    mcq("What is the OWASP Top 10?", ["A consensus list of the most critical web application security risks", "A list of the 10 best firewalls", "A programming language"], "A consensus list of the most critical web application security risks", "It prioritizes the most impactful web risk categories."),
    mcq("Which category currently sits at #1 in the OWASP Top 10?", ["Broken Access Control", "Denial of Service", "Weak Wi-Fi"], "Broken Access Control", "Broken Access Control rose to the top — users doing what they shouldn't."),
    mcq("An IDOR (Insecure Direct Object Reference) is an example of:", ["Broken Access Control", "Cryptographic failure", "A backup error"], "Broken Access Control", "Accessing another user's object by changing an ID is broken access control."),
    mcq("'Cryptographic Failures' as a category covers:", ["Weak or missing encryption of sensitive data", "Slow CPUs", "Too many log files"], "Weak or missing encryption of sensitive data", "It addresses sensitive data exposed by poor or absent cryptography."),
    tf("The OWASP Top 10 is a complete checklist guaranteeing an app is secure if all 10 are addressed.", false, "It is a prioritization of major risk categories, not an exhaustive security guarantee."),
    tf("Injection (including XSS) remains among the OWASP Top 10 risk categories.", true, "Injection has been a perennial top risk; recent lists fold XSS under injection."),
    mcq("SSRF (Server-Side Request Forgery), an OWASP category, tricks a server into:", ["Making requests to unintended internal resources", "Encrypting its own disk", "Logging out users"], "Making requests to unintended internal resources", "SSRF abuses a server to reach internal systems the attacker can't directly."),
    mcq("'Security Misconfiguration' includes problems like:", ["Default credentials and unnecessary features left enabled", "Using HTTPS", "Hashing passwords"], "Default credentials and unnecessary features left enabled", "Misconfiguration covers insecure defaults, verbose errors, open settings."),
    fill("Accessing another user's record by changing an ID in the URL is broken access __1__.", "access __1__", [{ label: "__1__", answers: ["control"] }], "Broken Access Control is the current #1 OWASP risk."),
    typed("Abbreviation for the OWASP category where a server is tricked into requesting internal resources.", "", "ssrf", ["ssrf"], "SSRF = Server-Side Request Forgery.")
  ]),
  ...attach("cy3-auth-deep", [
    mcq("OAuth 2.0 is fundamentally a framework for:", ["Delegated authorization (scoped access without sharing passwords)", "Encrypting disks", "Hashing passwords"], "Delegated authorization (scoped access without sharing passwords)", "OAuth grants apps limited access to your data without your credentials."),
    mcq("Which standard adds an AUTHENTICATION layer on top of OAuth 2.0?", ["OpenID Connect", "TLS", "SHA-256"], "OpenID Connect", "OIDC builds identity/authentication on OAuth's authorization framework."),
    mcq("The three parts of a JWT are:", ["Header, payload, signature", "Username, password, salt", "Key, value, hash"], "Header, payload, signature", "A JWT is header.payload.signature, dot-separated and base64url-encoded."),
    mcq("What does a JWT's signature provide?", ["Tamper-evidence (integrity/authenticity), not secrecy", "Encryption of the payload", "Faster requests"], "Tamper-evidence (integrity/authenticity), not secrecy", "The signature proves the token wasn't altered; it does not hide the payload."),
    tf("Sensitive secrets can safely be stored in a JWT payload because it is encrypted.", false, "A JWT payload is only base64url-encoded and trivially readable — never put secrets in it."),
    tf("Stateless JWTs are harder to revoke before expiry than server-side sessions.", true, "Server sessions can be deleted instantly; JWTs are valid until they expire — keep them short-lived."),
    mcq("A key advantage of server-side sessions over stateless JWTs is:", ["Immediate revocation (delete the session)", "They never expire", "They need no storage"], "Immediate revocation (delete the session)", "Sessions can be invalidated server-side at once; JWTs resist early revocation."),
    mcq("Anyone who intercepts a JWT can:", ["Decode and read its payload claims", "Forge a valid signature without the key", "Decrypt the server's disk"], "Decode and read its payload claims", "Payloads are readable; only the secret key can forge a valid signature."),
    fill("OAuth 2.0 is an authorization framework; OpenID __1__ adds authentication.", "OpenID __1__", [{ label: "__1__", answers: ["Connect", "connect"] }], "OpenID Connect (OIDC) layers authentication onto OAuth."),
    typed("Abbreviation (3 letters) for the signed, self-contained token of header.payload.signature.", "", "jwt", ["jwt"], "JWT = JSON Web Token.")
  ]),
  ...attach("cy3-cloud-iam", [
    mcq("In the cloud SHARED RESPONSIBILITY model, the customer is responsible for:", ["Their data, configuration, and access management", "The physical data center hardware", "The hypervisor"], "Their data, configuration, and access management", "The provider secures the cloud; you secure what you put in it."),
    mcq("The most common cause of real cloud data breaches is:", ["Customer misconfiguration (e.g., public storage buckets)", "Providers selling data", "Quantum computers"], "Customer misconfiguration (e.g., public storage buckets)", "Misconfigured access, not provider hacks, drives most cloud exposures."),
    mcq("What does IAM stand for in cloud security?", ["Identity and Access Management", "Internet Address Mapping", "Internal Audit Module"], "Identity and Access Management", "IAM governs who can do what across cloud resources."),
    mcq("Best practice for application credentials in the cloud is:", ["Short-lived roles instead of long-lived hardcoded keys", "One root key shared by all apps", "Keys committed to git"], "Short-lived roles instead of long-lived hardcoded keys", "Temporary, scoped roles limit exposure compared to static keys."),
    tf("Leaving a cloud storage bucket public by mistake is the provider's fault, not the customer's.", false, "Configuration is the customer's responsibility under the shared model."),
    tf("Least privilege applies to cloud IAM policies just as it does to user accounts.", true, "Scope each identity to the minimum permissions it needs."),
    mcq("Why prefer assigning permissions to roles rather than embedding keys in code?", ["Roles grant temporary, auditable, revocable access without secrets in code", "Roles are free", "Code cannot use keys"], "Roles grant temporary, auditable, revocable access without secrets in code", "Roles avoid leaked static credentials and support rotation/auditing."),
    mcq("Encrypting a cloud database's stored data protects it:", ["At rest", "Only in transit", "Only in RAM"], "At rest", "At-rest encryption guards stored data; TLS guards data in transit."),
    fill("The cloud model splitting duties between provider and customer is the __1__ responsibility model.", "the __1__ responsibility model", [{ label: "__1__", answers: ["shared"] }], "Shared responsibility: provider secures the cloud, you secure your usage."),
    typed("Abbreviation (3 letters) for cloud Identity and Access Management.", "", "iam", ["iam"], "IAM controls identities and their permissions in the cloud.")
  ]),
  ...attach("cy3-detection", [
    mcq("Detection engineering exists because:", ["Prevention eventually fails, so you must detect and respond", "Firewalls are perfect", "Logging is illegal"], "Prevention eventually fails, so you must detect and respond", "Assuming breach, detection and response are essential layers."),
    mcq("What does EDR stand for?", ["Endpoint Detection and Response", "Encrypted Data Repository", "External Domain Routing"], "Endpoint Detection and Response", "EDR monitors endpoints for malicious behavior and enables response."),
    mcq("A FALSE POSITIVE in detection is:", ["A benign event wrongly flagged as malicious", "A real attack that was missed", "A blocked IP address"], "A benign event wrongly flagged as malicious", "Too many false positives cause alert fatigue and ignored alarms."),
    mcq("A FALSE NEGATIVE is:", ["A real attack that detection failed to catch", "A harmless event flagged as bad", "A successful patch"], "A real attack that detection failed to catch", "False negatives are missed attacks — the most dangerous failure mode."),
    tf("Threat hunting is the proactive search for attackers that automated alerts may have missed.", true, "Hunters hypothesize and search for adversary activity beyond existing alerts."),
    tf("The best detection strategy is to maximize alerts regardless of accuracy.", false, "Excessive alerts cause fatigue; tuning to reduce noise keeps alerts trustworthy."),
    mcq("'Dwell time' refers to:", ["How long an attacker remains undetected in an environment", "How long a password lasts", "Server uptime"], "How long an attacker remains undetected in an environment", "Reducing dwell time limits the damage an intruder can do."),
    mcq("Why map detection rules to MITRE ATT&CK?", ["To measure coverage against known adversary techniques and find gaps", "To increase false positives", "To delete logs"], "To measure coverage against known adversary techniques and find gaps", "ATT&CK mapping reveals which real techniques you can detect."),
    fill("A benign event wrongly flagged as malicious is a false __1__.", "false __1__", [{ label: "__1__", answers: ["positive"] }], "False positives drive alert fatigue; false negatives are missed attacks."),
    typed("Abbreviation (3 letters) for endpoint security that monitors hosts and enables response.", "", "edr", ["edr"], "EDR = Endpoint Detection and Response.")
  ]),
  ...attach("cy3-forensics", [
    mcq("The 'order of volatility' tells investigators to collect:", ["The most fleeting evidence (like RAM) first", "Backups first", "Nothing until reboot"], "The most fleeting evidence (like RAM) first", "Volatile data such as memory disappears on power loss; capture it early."),
    mcq("Which evidence is MOST volatile?", ["RAM and running processes", "Hard disk files", "Off-site backups"], "RAM and running processes", "Memory contents vanish on reboot; disk and backups persist longer."),
    mcq("'Chain of custody' documents:", ["Who handled evidence, when, and how", "The attacker's name", "The firewall rules"], "Who handled evidence, when, and how", "An unbroken, documented chain keeps evidence trustworthy and admissible."),
    mcq("Forensic analysis should be performed on:", ["A hash-verified copy (image) of the original media", "The original drive directly", "A guess of the contents"], "A hash-verified copy (image) of the original media", "Working on a verified image preserves the untouched original as evidence."),
    tf("Rebooting a suspected compromised machine before imaging memory can destroy volatile evidence.", true, "RAM and process state are lost on reboot — capture them first."),
    tf("It is fine to analyze the original evidence directly as long as you are careful.", false, "Always work on a verified copy; touching the original risks altering evidence."),
    mcq("Hashing a forensic image before and after analysis proves:", ["The evidence was not altered during analysis", "The attacker's identity", "The network is encrypted"], "The evidence was not altered during analysis", "Matching hashes demonstrate integrity of the evidence copy."),
    mcq("'Forensic readiness' means:", ["Logging and retention are set up in advance of any incident", "Buying tools after a breach", "Disabling logs to save space"], "Logging and retention are set up in advance of any incident", "Readiness ensures evidence exists and is usable when needed."),
    fill("The documented record of who handled evidence and when is the chain of __1__.", "chain of __1__", [{ label: "__1__", answers: ["custody"] }], "Chain of custody preserves evidentiary trust."),
    typed("What volatile evidence source (3 letters) must be captured before a reboot?", "", "ram", ["ram", "memory"], "RAM holds volatile data lost on power-off; image it first.")
  ]),
  ...attach("cy3-governance", [
    mcq("GRC in security stands for:", ["Governance, Risk, and Compliance", "Global Routing Control", "Group Resource Cache"], "Governance, Risk, and Compliance", "GRC frames the policy, risk, and regulatory side of security."),
    mcq("GDPR is primarily concerned with:", ["Protection of EU residents' personal data", "Payment card security", "Network speed"], "Protection of EU residents' personal data", "GDPR is the EU's data-protection regulation with significant fines."),
    mcq("PCI DSS governs the security of:", ["Payment card data", "Hospital records", "Email servers"], "Payment card data", "PCI DSS sets requirements for handling cardholder data."),
    mcq("Which framework specifically protects US healthcare information?", ["HIPAA", "GDPR", "PCI DSS"], "HIPAA", "HIPAA governs protected health information in the US."),
    tf("Being compliant with a standard guarantees you cannot be breached.", false, "Compliance is a minimum baseline; compliant organizations are still breached."),
    tf("SOC 2 reports on the trust controls of a service organization.", true, "SOC 2 evaluates controls around security, availability, confidentiality, etc."),
    mcq("Why is compliance described as a 'floor, not a ceiling'?", ["It is the minimum bar; real security usually requires more", "It only applies to basements", "It is the highest possible standard"], "It is the minimum bar; real security usually requires more", "Meeting requirements is a starting point, not the end of security work."),
    mcq("A security policy is only effective if it is:", ["Enforced and supported by training", "Written and then ignored", "Kept secret from staff"], "Enforced and supported by training", "Unenforced, untrained policies provide no real protection."),
    fill("GRC stands for Governance, Risk, and __1__.", "Governance, Risk, and __1__", [{ label: "__1__", answers: ["compliance"] }], "Compliance is the regulatory/standards arm of GRC."),
    typed("Name the EU data-protection regulation (4-letter abbreviation).", "", "gdpr", ["gdpr"], "GDPR governs EU personal data with strict requirements and fines.")
  ]),
  ...attach("cy3-zero-trust-crypto", [
    mcq("The core principle of Zero Trust is:", ["Never trust, always verify — regardless of network location", "Trust everything inside the firewall", "Disable authentication internally"], "Never trust, always verify — regardless of network location", "Zero Trust abandons the trusted-internal-network assumption."),
    mcq("Which cryptographic tool provides CONFIDENTIALITY?", ["Encryption", "Hashing", "A timestamp"], "Encryption", "Encryption keeps data secret; hashing verifies integrity."),
    mcq("Which tool best verifies that data has NOT been altered?", ["A cryptographic hash", "A faster network", "A longer password"], "A cryptographic hash", "Comparing hashes detects any change to the data."),
    mcq("A digital signature is created with the signer's:", ["Private key (verified with the public key)", "Public key (verified with the private key)", "Password"], "Private key (verified with the public key)", "Signing uses the private key; anyone verifies with the public key — the reverse of encryption."),
    tf("A digital signature provides authenticity, integrity, and non-repudiation.", true, "Only the private-key holder could sign, proving origin and preventing denial."),
    tf("Under Zero Trust, requests from inside the corporate network are automatically trusted.", false, "Zero Trust verifies every request regardless of origin — there is no trusted inside."),
    mcq("PKI and Certificate Authorities exist to:", ["Bind public keys to verified identities so certificates can be trusted", "Encrypt passwords", "Speed up DNS"], "Bind public keys to verified identities so certificates can be trusted", "A trusted CA vouches that a public key belongs to a given identity."),
    mcq("You need to PROVE who sent a message and that it wasn't forged. You should:", ["Digitally sign it with your private key", "Hash it only", "Encrypt it with the recipient's public key"], "Digitally sign it with your private key", "Signing provides authenticity and non-repudiation; hashing/encryption alone do not."),
    fill("Zero Trust's maxim is: never trust, always __1__.", "always __1__", [{ label: "__1__", answers: ["verify"] }], "Every request is verified regardless of network location."),
    typed("Sign a message with your ______ key (the one only you hold) to prove authorship. One word.", "", "private", ["private"], "Digital signatures use the private key to sign and the public key to verify.")
  ])
];
