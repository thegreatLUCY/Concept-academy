const code = (...lines) => lines.join("\n");
const setId = "cyber-set1";

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

export const cyberSet1Modules = [
  { id: "cy1-cia-triad", setId, title: "The CIA Triad" },
  { id: "cy1-threats-risk", setId, title: "Threats, Vulnerabilities, and Risk" },
  { id: "cy1-auth", setId, title: "Authentication vs Authorization" },
  { id: "cy1-passwords", setId, title: "Passwords and Hashing" },
  { id: "cy1-mfa", setId, title: "Multi-Factor Authentication" },
  { id: "cy1-encryption", setId, title: "Encryption Basics" },
  { id: "cy1-network", setId, title: "Network Security Basics" },
  { id: "cy1-malware", setId, title: "Malware Types" },
  { id: "cy1-social", setId, title: "Social Engineering and Phishing" },
  { id: "cy1-hygiene", setId, title: "Security Hygiene and Updates" }
];

export const cyberSet1Lessons = {
  "cy1-cia-triad": {
    summary:
      "Security has a goal, and that goal is the CIA triad: Confidentiality (only authorized people can read data), Integrity (data is accurate and unaltered), and Availability (systems are usable when needed). Almost every control you will ever learn protects one or more of these three. When you evaluate any risk or defense, ask: which letter does it protect, and which does an attack threaten?",
    points: [
      "Confidentiality — keep secrets secret (encryption, access control).",
      "Integrity — prevent unauthorized change (hashing, signatures, audit logs).",
      "Availability — keep services running (backups, redundancy, DDoS defense).",
      "Every attack and every control maps back to one of these three."
    ],
    example: code(
      "Attack examples mapped to the triad:",
      "  Stolen database of passwords ....... Confidentiality breach",
      "  Tampered bank transaction amount ... Integrity breach",
      "  Ransomware locking your files ...... Availability breach"
    )
  },
  "cy1-threats-risk": {
    summary:
      "Three words get confused constantly. A VULNERABILITY is a weakness (an unpatched server). A THREAT is something that could exploit it (a malware author). RISK is the chance that a threat actually exploits a vulnerability AND the damage if it does. Risk = likelihood x impact. You cannot eliminate all risk, so security is about reducing it to an acceptable level — and an ASSET is whatever you are protecting.",
    points: [
      "Vulnerability = the weakness; Threat = what could exploit it; Risk = likelihood x impact.",
      "An exploit is the actual technique/tool that takes advantage of a vulnerability.",
      "You manage risk (accept, mitigate, transfer, avoid) — you rarely eliminate it.",
      "The attack surface is the sum of all points where an attacker could try to get in."
    ],
    example: code(
      "Vulnerability: a door with a weak lock",
      "Threat:        a burglar in the neighborhood",
      "Risk:          HIGH if burglars are common and the house holds valuables",
      "Mitigation:    a stronger lock lowers likelihood; insurance transfers impact"
    )
  },
  "cy1-auth": {
    summary:
      "Two words that sound alike but mean different things. AUTHENTICATION (authN) answers 'who are you?' — proving identity with something you know, have, or are. AUTHORIZATION (authZ) answers 'what are you allowed to do?' — the permissions granted after you are authenticated. You authenticate FIRST, then the system authorizes specific actions. A logged-in user (authenticated) may still be denied admin pages (not authorized).",
    points: [
      "Authentication = proving WHO you are (login).",
      "Authorization = what you are ALLOWED to do (permissions).",
      "AuthN comes first, then authZ — order matters.",
      "Accounting/auditing (the third A) logs what authenticated users actually did."
    ],
    example: code(
      "Airport analogy:",
      "  Showing your passport ......... Authentication (who you are)",
      "  Your boarding pass for seat 14A  Authorization (what you may access)",
      "  Same person, different checks at different gates"
    )
  },
  "cy1-passwords": {
    summary:
      "Systems must never store passwords as plain text. Instead they store a HASH — a one-way fingerprint. Hashing is irreversible (you cannot un-hash), unlike encryption. To defend against precomputed 'rainbow table' attacks, each password gets a unique random SALT added before hashing. And critically, password hashing uses SLOW algorithms on purpose — bcrypt, scrypt, Argon2 — so that guessing billions of passwords becomes expensive. Fast hashes like MD5 or SHA-256 are wrong for passwords.",
    points: [
      "Store hashes, never plaintext passwords.",
      "Hashing is one-way; encryption is reversible. Different tools, different jobs.",
      "A unique salt per password defeats rainbow tables.",
      "Use SLOW password hashes (bcrypt, scrypt, Argon2) — speed helps the attacker."
    ],
    example: code(
      "Bad:   store \"hunter2\"                (plaintext — catastrophic if leaked)",
      "Bad:   store md5(\"hunter2\")           (fast + unsalted — cracked instantly)",
      "Good:  store argon2(salt + \"hunter2\") (slow, salted, modern)",
      "",
      "A leaked GOOD hash still costs an attacker enormous time per password."
    )
  },
  "cy1-mfa": {
    summary:
      "A password is one factor, and passwords get stolen. Multi-Factor Authentication (MFA) requires two or more DIFFERENT categories of proof: something you KNOW (password, PIN), something you HAVE (phone, hardware key), something you ARE (fingerprint, face). Two passwords are not MFA — they are the same factor twice. MFA is one of the single most effective defenses against account takeover, because a stolen password alone is no longer enough.",
    points: [
      "Factors: KNOW (password), HAVE (phone/token), ARE (biometric).",
      "True MFA combines DIFFERENT categories, not two of the same.",
      "Authenticator apps (TOTP) and hardware keys beat SMS codes (SIM-swap risk).",
      "MFA stops most credential-stuffing and phishing-only attacks cold."
    ],
    example: code(
      "Login with MFA:",
      "  1. Enter password ............. something you KNOW",
      "  2. Approve push on your phone .. something you HAVE",
      "",
      "Stolen password alone -> blocked at step 2. That is the whole point."
    )
  },
  "cy1-encryption": {
    summary:
      "Encryption scrambles readable PLAINTEXT into CIPHERTEXT using a key, and only the right key reverses it. There are two families. SYMMETRIC encryption (AES) uses the SAME key to encrypt and decrypt — fast, but both sides must share the secret. ASYMMETRIC encryption (RSA) uses a KEY PAIR: a public key anyone can use to encrypt, and a private key only the owner holds to decrypt. We also distinguish data 'at rest' (stored) from data 'in transit' (moving across a network) — both need protection.",
    points: [
      "Plaintext + key -> ciphertext; only the correct key reverses it.",
      "Symmetric (AES): one shared key, fast, great for bulk data.",
      "Asymmetric (RSA): public key encrypts, private key decrypts — solves key sharing.",
      "Protect data at rest (disk encryption) AND in transit (TLS)."
    ],
    example: code(
      "Symmetric:  same key locks and unlocks (a house key copied for two people)",
      "Asymmetric: public 'mailbox slot' anyone drops mail into,",
      "            private key only YOU have to open the mailbox",
      "",
      "Real systems combine both: asymmetric to exchange a symmetric session key."
    )
  },
  "cy1-network": {
    summary:
      "Networks move data in packets between addresses (IP) and numbered services (ports). A FIREWALL controls which traffic is allowed in or out by rules. The shift from HTTP to HTTPS matters enormously: HTTPS wraps traffic in TLS so eavesdroppers see only ciphertext, while plain HTTP sends everything — including passwords — readable to anyone on the path. Public Wi-Fi is hostile by default; a VPN encrypts your traffic through an untrusted network.",
    points: [
      "Ports identify services: 80=HTTP, 443=HTTPS, 22=SSH, 53=DNS.",
      "A firewall allows/blocks traffic by rules (default-deny is safest).",
      "HTTPS (TLS) encrypts in transit; plain HTTP is readable by anyone on the path.",
      "A VPN tunnels your traffic encrypted across untrusted networks like public Wi-Fi."
    ],
    example: code(
      "On open coffee-shop Wi-Fi:",
      "  http://bank.example  ->  password visible to anyone sniffing the air",
      "  https://bank.example ->  attacker sees only encrypted bytes",
      "",
      "Look for the https:// and the lock before you ever type credentials."
    )
  },
  "cy1-malware": {
    summary:
      "Malware is malicious software, and the families differ by how they spread and what they do. A VIRUS attaches to a file and runs when you open it. A WORM spreads by itself across networks with no user action. A TROJAN disguises itself as something useful. RANSOMWARE encrypts your files and demands payment (an availability + sometimes confidentiality attack). SPYWARE secretly collects information. Knowing the family tells you how it got in and how to contain it.",
    points: [
      "Virus: attaches to files, needs you to run it. Worm: self-spreads, no user needed.",
      "Trojan: pretends to be legitimate software.",
      "Ransomware: encrypts files, demands payment — good backups are the real cure.",
      "Spyware/keyloggers: silently steal data and keystrokes."
    ],
    example: code(
      "How it arrived tells you the family:",
      "  Opened an email attachment that ran ........ virus / trojan",
      "  Spread to every machine overnight by itself .. worm",
      "  Files renamed .locked + a ransom note ........ ransomware",
      "",
      "Offline, tested backups defeat ransomware better than any payment."
    )
  },
  "cy1-social": {
    summary:
      "The most reliable way past strong technical defenses is to trick a PERSON. Social engineering manipulates humans into giving up access or information. PHISHING is the mass version (fake emails/sites harvesting credentials); SPEAR PHISHING targets a specific person with personalized bait; PRETEXTING invents a convincing scenario ('I'm from IT'). Defenses are human and technical: verify out-of-band, hover links before clicking, never act on urgency alone, and report suspected attempts.",
    points: [
      "Social engineering attacks people, not machines — often the easiest path in.",
      "Phishing = mass; spear phishing = targeted; whaling = targeting executives.",
      "Red flags: urgency, authority pressure, unexpected attachments, mismatched URLs.",
      "Verify through a separate channel; report rather than engage."
    ],
    example: code(
      "Phishing red flags in one email:",
      "  \"URGENT: your account will be closed in 1 hour\"   (urgency)",
      "  From: support@paypa1-secure.com                    (look-alike domain)",
      "  Link text says paypal.com but points elsewhere     (hover to check)",
      "",
      "When in doubt, navigate to the real site yourself — never click the link."
    )
  },
  "cy1-hygiene": {
    summary:
      "Most breaches do not use exotic zero-days — they use known problems that were never fixed. Security hygiene is the boring, decisive basics: PATCH software promptly (updates close known holes), apply LEAST PRIVILEGE (give each account only the access it needs), keep tested BACKUPS, use a password manager for unique strong passwords, and turn on MFA. A PATCH is a vendor's fix; a ZERO-DAY is a flaw with no patch yet. Discipline on the basics beats clever tools.",
    points: [
      "Patch promptly — unpatched known vulnerabilities cause most breaches.",
      "Least privilege: every account/process gets the minimum access it needs.",
      "Tested backups (3-2-1 rule) are your last line against ransomware and loss.",
      "Unique strong passwords (a manager) + MFA closes the most common doors."
    ],
    example: code(
      "The 3-2-1 backup rule:",
      "  3 copies of important data",
      "  2 different media/storage types",
      "  1 copy kept off-site (or offline)",
      "",
      "A zero-day has no patch yet; basic hygiene still limits its blast radius."
    )
  }
};

export const cyberSet1Questions = [
  ...attach("cy1-cia-triad", [
    mcq("What do the three letters of the CIA triad stand for?", ["Confidentiality, Integrity, Availability", "Control, Identity, Access", "Confidentiality, Identity, Authentication"], "Confidentiality, Integrity, Availability", "The CIA triad is the foundational model of information security goals."),
    mcq("A database of customer passwords is stolen and read by attackers. Which part of the triad is breached?", ["Confidentiality", "Integrity", "Availability"], "Confidentiality", "Unauthorized parties reading protected data is a confidentiality failure."),
    mcq("An attacker silently changes the dollar amount of a bank transfer. Which is breached?", ["Integrity", "Confidentiality", "Availability"], "Integrity", "Integrity is about data being accurate and unaltered by unauthorized parties."),
    mcq("Ransomware locks a hospital out of its own patient records. Which is breached most directly?", ["Availability", "Confidentiality", "Integrity"], "Availability", "If authorized users cannot access systems when needed, availability has failed."),
    tf("Encryption primarily protects the Confidentiality leg of the CIA triad.", true, "By making data unreadable without a key, encryption preserves confidentiality."),
    tf("A cryptographic hash on a downloaded file mainly helps verify Availability.", false, "Comparing a file's hash detects tampering, which protects Integrity, not availability."),
    fill("Complete the triad: Confidentiality, __1__, Availability.", "Confidentiality, __1__, Availability", [{ label: "__1__", answers: ["Integrity", "integrity"] }], "Integrity is the middle pillar — data correctness and trustworthiness."),
    mcq("Daily off-site backups and server redundancy most directly support which goal?", ["Availability", "Confidentiality", "Integrity"], "Availability", "Redundancy and backups keep services and data accessible despite failures."),
    mcq("Why is the CIA triad useful when analyzing a new threat?", ["It forces you to ask which security goal the threat endangers", "It lists every possible attack", "It is required by law"], "It forces you to ask which security goal the threat endangers", "The triad is a lens: map every attack and control to C, I, or A."),
    typed("Name the security goal (one word) that ensures data has NOT been altered by unauthorized parties.", "", "integrity", ["integrity"], "Integrity guarantees data remains accurate and unmodified.")
  ]),
  ...attach("cy1-threats-risk", [
    mcq("In security terms, what is a VULNERABILITY?", ["A weakness that could be exploited", "A person who attacks systems", "The damage caused by an attack"], "A weakness that could be exploited", "A vulnerability is the flaw itself — an unpatched service, a weak password."),
    mcq("What is a THREAT?", ["Something with the potential to exploit a vulnerability", "A weakness in software", "A security policy"], "Something with the potential to exploit a vulnerability", "A threat is the actor or event that could cause harm — malware, an attacker, a flood."),
    mcq("Which formula best captures RISK?", ["Likelihood x Impact", "Threats + Vulnerabilities", "Assets - Controls"], "Likelihood x Impact", "Risk weighs how probable an exploit is against how badly it would hurt."),
    mcq("An attacker's actual tool or technique that takes advantage of a flaw is called a(n):", ["Exploit", "Asset", "Policy"], "Exploit", "An exploit is the concrete means of leveraging a vulnerability."),
    tf("If there is a vulnerability but no realistic threat to exploit it, the risk can still be low.", true, "Risk depends on likelihood too — a flaw nobody can reach poses little practical risk."),
    tf("The goal of security is to eliminate all risk completely.", false, "Eliminating all risk is impossible and impractical; security REDUCES risk to acceptable levels."),
    mcq("Buying cyber-insurance to cover breach costs is an example of which risk response?", ["Transferring risk", "Avoiding risk", "Accepting risk"], "Transferring risk", "Insurance shifts the financial impact to another party — risk transfer."),
    mcq("What is an organization's 'attack surface'?", ["The sum of all points where an attacker could try to get in", "The list of past attacks", "The security team's budget"], "The sum of all points where an attacker could try to get in", "Reducing the attack surface (fewer exposed services, ports, accounts) lowers risk."),
    fill("A weakness is a vulnerability; the actor that could exploit it is a __1__.", "a __1__", [{ label: "__1__", answers: ["threat"] }], "Threat = the potential source of harm to a vulnerability."),
    typed("What term names a software flaw that vendors have NOT yet released a fix for? (two words, hyphen optional)", "", "zero-day", ["zero-day", "zero day", "zeroday"], "A zero-day vulnerability has no available patch, making it especially dangerous.")
  ]),
  ...attach("cy1-auth", [
    mcq("AUTHENTICATION answers which question?", ["Who are you?", "What are you allowed to do?", "When did you log in?"], "Who are you?", "Authentication proves identity."),
    mcq("AUTHORIZATION answers which question?", ["What are you allowed to do?", "Who are you?", "Where are you located?"], "What are you allowed to do?", "Authorization governs permissions after identity is established."),
    mcq("In a normal login flow, which happens FIRST?", ["Authentication", "Authorization", "They happen at the same time"], "Authentication", "You must establish who someone is before deciding what they may do."),
    tf("A user can be authenticated but NOT authorized to view a specific page.", true, "Being logged in does not grant access to everything — authZ is checked per action."),
    tf("Entering your username and password is an example of authorization.", false, "Proving identity with credentials is authentication; authorization is what you may then access."),
    mcq("The three classic authentication factor categories are:", ["Something you know, have, and are", "Username, password, and email", "Read, write, and execute"], "Something you know, have, and are", "Knowledge, possession, and inherence are the three factor types."),
    mcq("A fingerprint scan is which kind of factor?", ["Something you are", "Something you know", "Something you have"], "Something you are", "Biometrics are inherence factors — something you are."),
    mcq("The third 'A' often paired with authentication and authorization is:", ["Accounting (auditing what users did)", "Availability", "Allocation"], "Accounting (auditing what users did)", "AAA = Authentication, Authorization, Accounting; accounting logs activity."),
    fill("Proving WHO you are is authentication; deciding WHAT you may do is __1__.", "is __1__", [{ label: "__1__", answers: ["authorization", "authorisation"] }], "Authorization is the permissions step after authentication."),
    typed("One word: the security step that decides which resources an already-identified user may access.", "", "authorization", ["authorization", "authorisation"], "Authorization grants or denies access to specific resources.")
  ]),
  ...attach("cy1-passwords", [
    mcq("How should a well-designed system store user passwords?", ["As salted hashes", "As plaintext in the database", "Encrypted with a key stored next to them"], "As salted hashes", "Passwords should be hashed (one-way) with a unique salt, never stored readable."),
    mcq("What is the key difference between hashing and encryption?", ["Hashing is one-way; encryption is reversible with a key", "Hashing is reversible; encryption is not", "They are the same thing"], "Hashing is one-way; encryption is reversible with a key", "You cannot 'un-hash' a value, but encrypted data can be decrypted with the key."),
    mcq("What is the purpose of a SALT in password hashing?", ["A unique random value that stops precomputed (rainbow table) attacks", "A way to encrypt the password", "A backup of the password"], "A unique random value that stops precomputed (rainbow table) attacks", "Per-password salts make identical passwords hash differently and break rainbow tables."),
    mcq("Why are bcrypt, scrypt, and Argon2 preferred for passwords over SHA-256?", ["They are deliberately slow, making large-scale guessing expensive", "They are faster", "They are reversible"], "They are deliberately slow, making large-scale guessing expensive", "Password hashes should be slow; fast hashes let attackers test billions of guesses cheaply."),
    tf("MD5 is a good choice for hashing passwords because it is fast.", false, "Speed is exactly the problem — fast hashes (and MD5's known weaknesses) make cracking easy."),
    tf("Adding a unique salt to each password defeats precomputed rainbow tables.", true, "A unique salt means an attacker cannot reuse one precomputed table across accounts."),
    mcq("A 'rainbow table' attack relies on:", ["Precomputed hash-to-password lookups", "Guessing over the network", "Decrypting the hash"], "Precomputed hash-to-password lookups", "Rainbow tables map known hashes back to inputs — salts neutralize them."),
    mcq("Why is a long passphrase often stronger than a short complex password?", ["Length adds far more guessing difficulty (entropy) than special characters", "It is easier to type", "It uses encryption"], "Length adds far more guessing difficulty (entropy) than special characters", "Each added character multiplies the search space; length usually beats complexity tricks."),
    fill("A unique random value added before hashing a password is called a __1__.", "called a __1__", [{ label: "__1__", answers: ["salt"] }], "Salts make hashes unique per password and defeat rainbow tables."),
    typed("Name the modern, deliberately-slow password-hashing algorithm that won the Password Hashing Competition.", "", "argon2", ["argon2", "argon 2"], "Argon2 is the current recommended password hashing algorithm.")
  ]),
  ...attach("cy1-mfa", [
    mcq("What does Multi-Factor Authentication require?", ["Two or more proofs from DIFFERENT factor categories", "Two passwords", "A longer password"], "Two or more proofs from DIFFERENT factor categories", "MFA combines different categories: know, have, are."),
    mcq("Which combination is TRUE multi-factor authentication?", ["A password plus a code from your phone", "A password plus a PIN", "Two security questions"], "A password plus a code from your phone", "Password (know) + phone code (have) are two DIFFERENT factors."),
    tf("Requiring a password and then a security question counts as multi-factor authentication.", false, "Both are 'something you know' — that is single-factor used twice, not MFA."),
    mcq("Why is an authenticator app (TOTP) generally safer than SMS codes?", ["SMS is vulnerable to SIM-swapping and interception", "SMS codes never expire", "Apps are slower"], "SMS is vulnerable to SIM-swapping and interception", "Attackers can hijack phone numbers; app-based or hardware tokens avoid that channel."),
    tf("MFA can stop an attacker who has stolen only your password.", true, "Without the second factor, a stolen password alone fails the login — MFA's core benefit."),
    mcq("A hardware security key (like a FIDO2/YubiKey) is which factor?", ["Something you have", "Something you know", "Something you are"], "Something you have", "Physical tokens are possession factors and strongly resist phishing."),
    mcq("Which factor category does a face scan belong to?", ["Something you are", "Something you have", "Something you know"], "Something you are", "Biometrics are inherence factors."),
    mcq("Why is MFA considered one of the highest-value security controls?", ["It blocks most attacks that rely on stolen or guessed passwords", "It replaces the need for passwords entirely", "It encrypts the hard drive"], "It blocks most attacks that rely on stolen or guessed passwords", "Credential theft is rampant; a second factor neutralizes password-only attacks."),
    fill("MFA factors are: something you know, something you have, and something you __1__.", "you __1__", [{ label: "__1__", answers: ["are"] }], "The three categories are knowledge, possession, and inherence (are)."),
    typed("Abbreviation (3 letters) for authentication that requires two or more different factors.", "", "mfa", ["mfa", "2fa"], "MFA (multi-factor authentication); 2FA is the common two-factor case.")
  ]),
  ...attach("cy1-encryption", [
    mcq("In cryptography, readable data is called plaintext and scrambled data is called:", ["Ciphertext", "Hashtext", "Salttext"], "Ciphertext", "Encryption converts plaintext into ciphertext using a key."),
    mcq("SYMMETRIC encryption uses:", ["The same key to encrypt and decrypt", "A public and a private key", "No key at all"], "The same key to encrypt and decrypt", "AES is symmetric — one shared secret key for both directions."),
    mcq("ASYMMETRIC encryption uses:", ["A public key to encrypt and a private key to decrypt", "Two identical keys", "A salt instead of a key"], "A public key to encrypt and a private key to decrypt", "RSA-style systems use a key PAIR, solving the secret-sharing problem."),
    mcq("Which is a well-known SYMMETRIC algorithm?", ["AES", "RSA", "SHA-256"], "AES", "AES is the standard symmetric cipher; RSA is asymmetric; SHA-256 is a hash."),
    tf("With asymmetric encryption, you can safely share your PUBLIC key with anyone.", true, "The public key only encrypts (or verifies); the private key must stay secret."),
    tf("Symmetric encryption is generally slower than asymmetric encryption for large data.", false, "It is the opposite — symmetric is much faster, which is why bulk data uses it."),
    mcq("'Data at rest' refers to:", ["Stored data, e.g., on a disk or in a database", "Data moving across a network", "Data being processed in memory"], "Stored data, e.g., on a disk or in a database", "At rest = stored; in transit = moving. Both need protection."),
    mcq("Why do real systems often combine asymmetric and symmetric encryption?", ["Asymmetric safely exchanges a fast symmetric session key", "Symmetric is more secure than asymmetric", "To avoid using keys"], "Asymmetric safely exchanges a fast symmetric session key", "TLS uses asymmetric to agree on a symmetric key, then symmetric for speed."),
    fill("AES uses the SAME key to encrypt and decrypt, so it is called __1__ encryption.", "called __1__ encryption", [{ label: "__1__", answers: ["symmetric"] }], "Symmetric encryption shares one key for both operations."),
    typed("Name the widely used symmetric encryption standard (3-letter abbreviation).", "", "aes", ["aes"], "AES (Advanced Encryption Standard) is the dominant symmetric cipher.")
  ]),
  ...attach("cy1-network", [
    mcq("Which port number is standard for HTTPS?", ["443", "80", "22"], "443", "443 is HTTPS; 80 is HTTP; 22 is SSH."),
    mcq("What does a firewall do?", ["Allows or blocks network traffic based on rules", "Encrypts hard drives", "Scans files for viruses"], "Allows or blocks network traffic based on rules", "Firewalls enforce traffic policy between networks or on a host."),
    mcq("Why is HTTPS safer than HTTP for entering a password?", ["HTTPS encrypts traffic so eavesdroppers cannot read it", "HTTPS loads faster", "HTTP blocks attackers automatically"], "HTTPS encrypts traffic so eavesdroppers cannot read it", "TLS protects confidentiality and integrity in transit; HTTP is plaintext."),
    mcq("What protocol secures HTTPS connections?", ["TLS", "FTP", "SMTP"], "TLS", "TLS (formerly SSL) provides the encryption layer for HTTPS."),
    tf("On open public Wi-Fi, traffic sent over plain HTTP can be read by others on the same network.", true, "Unencrypted HTTP is visible to anyone able to sniff the shared medium."),
    tf("A VPN makes you completely anonymous and immune to all attacks.", false, "A VPN encrypts traffic to its exit point but is not total anonymity or malware protection."),
    mcq("Which port is standard for SSH (secure remote shell)?", ["22", "443", "25"], "22", "SSH listens on port 22 by default."),
    mcq("A 'default-deny' firewall policy means:", ["Block everything unless a rule explicitly allows it", "Allow everything unless explicitly blocked", "Disable the firewall"], "Block everything unless a rule explicitly allows it", "Default-deny is the safer posture — you permit only what is needed."),
    fill("The secure version of HTTP that encrypts traffic with TLS is __1__.", "is __1__", [{ label: "__1__", answers: ["https", "HTTPS"] }], "HTTPS = HTTP over TLS."),
    typed("Name the protocol (3-letter abbreviation) that encrypts HTTPS traffic.", "", "tls", ["tls", "ssl/tls"], "TLS (Transport Layer Security) underlies HTTPS.")
  ]),
  ...attach("cy1-malware", [
    mcq("What distinguishes a WORM from a virus?", ["A worm self-replicates across networks without user action", "A worm needs a user to open a file", "A worm only affects printers"], "A worm self-replicates across networks without user action", "Worms spread autonomously; viruses need a user to execute the infected file."),
    mcq("A TROJAN is malware that:", ["Disguises itself as legitimate software", "Spreads by itself over the network", "Only encrypts files"], "Disguises itself as legitimate software", "Trojans trick users into running them by appearing useful or benign."),
    mcq("RANSOMWARE typically:", ["Encrypts a victim's files and demands payment", "Quietly logs keystrokes forever", "Speeds up the computer"], "Encrypts a victim's files and demands payment", "Ransomware attacks availability and extorts payment for the decryption key."),
    mcq("What is the most reliable defense against ransomware data loss?", ["Tested offline backups", "Paying the ransom quickly", "A faster CPU"], "Tested offline backups", "Restorable backups let you recover without paying; payment is unreliable and funds crime."),
    tf("A virus generally requires a user to run or open an infected file to spread.", true, "Viruses attach to files and execute when the host file is opened."),
    tf("Spyware announces itself loudly with pop-ups so you know it is there.", false, "Spyware's goal is to operate secretly and collect information without detection."),
    mcq("A KEYLOGGER is a type of:", ["Spyware that records keystrokes", "Firewall", "Backup tool"], "Spyware that records keystrokes", "Keyloggers capture typed input including passwords."),
    mcq("Malware that gives an attacker hidden ongoing remote control is often called a:", ["Backdoor / RAT", "Patch", "Sandbox"], "Backdoor / RAT", "A backdoor or Remote Access Trojan provides persistent covert access."),
    fill("Malware that self-replicates across networks without user action is a __1__.", "is a __1__", [{ label: "__1__", answers: ["worm"] }], "Worms spread automatically — famously fast and wide."),
    typed("Name the malware family that encrypts files and demands payment.", "", "ransomware", ["ransomware"], "Ransomware extorts victims by holding their data hostage.")
  ]),
  ...attach("cy1-social", [
    mcq("What is social engineering?", ["Manipulating people into giving up access or information", "A type of firewall", "Encrypting network traffic"], "Manipulating people into giving up access or information", "It targets human trust rather than technical flaws."),
    mcq("How does SPEAR phishing differ from regular phishing?", ["It targets a specific person with personalized details", "It uses spears", "It only happens by phone"], "It targets a specific person with personalized details", "Spear phishing is tailored; regular phishing is mass and generic."),
    mcq("Phishing that specifically targets high-level executives is called:", ["Whaling", "Vishing", "Smishing"], "Whaling", "Whaling goes after 'big fish' like CEOs and CFOs."),
    mcq("Which is a classic phishing red flag?", ["Artificial urgency demanding immediate action", "A correctly spelled company name", "An expected newsletter"], "Artificial urgency demanding immediate action", "Urgency pressures victims to act before thinking — a hallmark of phishing."),
    tf("Hovering over a link to inspect its real destination before clicking is good practice.", true, "The visible text can lie; the actual URL reveals where the link truly goes."),
    tf("Because firewalls are strong, social engineering is no longer an effective attack.", false, "Social engineering bypasses technical controls by targeting people — still highly effective."),
    mcq("PRETEXTING is when an attacker:", ["Invents a believable scenario to gain trust (e.g., 'I'm from IT')", "Encrypts files for ransom", "Floods a server with traffic"], "Invents a believable scenario to gain trust (e.g., 'I'm from IT')", "Pretexting builds a fake context to extract information or access."),
    mcq("You get an urgent email from 'your bank' with a login link. Best action?", ["Ignore the link and navigate to the bank's site yourself", "Click the link and log in quickly", "Reply with your password"], "Ignore the link and navigate to the bank's site yourself", "Never trust links in unsolicited urgent messages; go to the known site directly."),
    fill("Phishing aimed at one specific, researched individual is called __1__ phishing.", "called __1__ phishing", [{ label: "__1__", answers: ["spear"] }], "Spear phishing is personalized and far more convincing than mass phishing."),
    typed("Name the broad category of attacks that manipulate humans rather than machines (two words).", "", "social engineering", ["social engineering"], "Social engineering exploits human psychology and trust.")
  ]),
  ...attach("cy1-hygiene", [
    mcq("Why is prompt PATCHING so important?", ["Updates close known vulnerabilities attackers actively exploit", "It makes the screen brighter", "It deletes old files"], "Updates close known vulnerabilities attackers actively exploit", "Most breaches exploit known, already-patched flaws on unpatched systems."),
    mcq("The principle of LEAST PRIVILEGE means:", ["Give each account only the access it needs to do its job", "Give everyone admin to avoid lockouts", "Disable all accounts"], "Give each account only the access it needs to do its job", "Minimizing privileges limits the damage from any compromised account."),
    mcq("What is a 'patch'?", ["A vendor-released fix for a software flaw", "A type of malware", "A backup copy"], "A vendor-released fix for a software flaw", "Patches remediate bugs and security vulnerabilities."),
    mcq("The 3-2-1 backup rule recommends:", ["3 copies, 2 media types, 1 off-site", "3 passwords, 2 firewalls, 1 VPN", "3 admins, 2 servers, 1 router"], "3 copies, 2 media types, 1 off-site", "3-2-1 ensures resilience against loss, hardware failure, and site disasters."),
    tf("Most successful breaches exploit unknown zero-days rather than known unpatched flaws.", false, "The reverse is true — known, unpatched vulnerabilities account for most breaches."),
    tf("Using a password manager to generate unique passwords per site improves security.", true, "Unique strong passwords stop one breach from cascading via reuse."),
    mcq("Why is reusing the same password across sites dangerous?", ["One site's breach exposes all accounts sharing that password", "It is harder to remember", "It slows down login"], "One site's breach exposes all accounts sharing that password", "Credential-stuffing attacks replay leaked passwords across many services."),
    mcq("Running daily tasks as a non-admin (standard) user account is an example of:", ["Least privilege", "Defense evasion", "A zero-day"], "Least privilege", "Limiting routine accounts reduces what malware can do if it runs."),
    fill("Giving each account only the access it needs is the principle of least __1__.", "least __1__", [{ label: "__1__", answers: ["privilege"] }], "Least privilege is a cornerstone of practical security."),
    typed("What is the common name for a software flaw with no vendor fix available yet? (two words)", "", "zero-day", ["zero-day", "zero day", "zeroday"], "A zero-day has no patch, so hygiene and layered defense matter even more.")
  ])
];
