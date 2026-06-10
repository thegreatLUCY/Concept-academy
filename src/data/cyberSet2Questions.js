const code = (...lines) => lines.join("\n");
const setId = "cyber-set2";

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

export const cyberSet2Modules = [
  { id: "cy2-access-control", setId, title: "Access Control Models" },
  { id: "cy2-web", setId, title: "How the Web Works Securely" },
  { id: "cy2-injection", setId, title: "Injection and Preventing SQL Injection" },
  { id: "cy2-xss", setId, title: "Cross-Site Scripting (XSS) Defense" },
  { id: "cy2-csrf-sessions", setId, title: "CSRF and Session Security" },
  { id: "cy2-validation", setId, title: "Input Validation and Output Encoding" },
  { id: "cy2-secrets", setId, title: "Secrets Management" },
  { id: "cy2-network-defense", setId, title: "Network Defense" },
  { id: "cy2-logging", setId, title: "Logging, Monitoring, and SIEM" },
  { id: "cy2-incident-response", setId, title: "Incident Response Basics" }
];

export const cyberSet2Lessons = {
  "cy2-access-control": {
    summary:
      "Once a user is authenticated, an access control MODEL decides what they can do. RBAC (Role-Based Access Control) grants permissions to roles (admin, editor, viewer) and assigns users to roles — the most common model in apps. DAC (Discretionary) lets resource owners set permissions (file sharing). MAC (Mandatory) enforces system-wide labels (military 'top secret'). ABAC (Attribute-Based) decides from attributes (department, time, location). Across all of them, enforce LEAST PRIVILEGE and check authorization on the SERVER, never trust the client.",
    points: [
      "RBAC: permissions -> roles -> users. The workhorse for most applications.",
      "DAC: owners grant access. MAC: system enforces labels. ABAC: rules over attributes.",
      "Always enforce authorization on the server — hiding a button is not security.",
      "Default to deny; grant the minimum needed (least privilege)."
    ],
    example: code(
      "RBAC in practice:",
      "  role 'editor'  -> can create, edit posts",
      "  role 'viewer'  -> can read posts",
      "  user 'aya'     -> assigned role 'editor'",
      "",
      "Server checks user.role on EVERY request — not just by hiding the UI button."
    )
  },
  "cy2-web": {
    summary:
      "The web runs on HTTP request/response. Because HTTP is stateless, sites track you with COOKIES — small tokens the browser returns on each request, typically holding a SESSION ID. Securing this matters: mark session cookies HttpOnly (JavaScript cannot read them, limiting XSS theft), Secure (sent only over HTTPS), and SameSite (limits cross-site sending, fighting CSRF). The TLS handshake authenticates the server via a certificate and negotiates encryption before any data flows.",
    points: [
      "HTTP is stateless; cookies carry a session ID to remember who you are.",
      "Cookie flags: HttpOnly (no JS access), Secure (HTTPS only), SameSite (CSRF defense).",
      "TLS uses the server's certificate to prove identity and set up encryption.",
      "Treat all client input as untrusted — it can be forged or replayed."
    ],
    example: code(
      "A hardened session cookie:",
      "  Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax",
      "",
      "  HttpOnly  -> document.cookie cannot read it (blunts XSS token theft)",
      "  Secure    -> never sent over plain HTTP",
      "  SameSite  -> not sent on cross-site requests (blunts CSRF)"
    )
  },
  "cy2-injection": {
    summary:
      "Injection happens when untrusted input is mixed into a command or query so that data is misread as code. SQL injection is the classic case: building a query by string-concatenating user input lets an attacker change the query's meaning. The fix is not 'filter bad words' — it is PARAMETERIZED QUERIES (prepared statements), which send the query and the data separately so input can never become code. Combine with least-privilege database accounts and input validation as defense in depth.",
    points: [
      "Root cause: untrusted input concatenated into a query/command becomes code.",
      "Primary fix: parameterized queries / prepared statements (data stays data).",
      "Use an ORM or placeholders (?, :name) — never f-string SQL with user input.",
      "Defense in depth: validate input, least-privilege DB user, limited error messages."
    ],
    example: code(
      "VULNERABLE (string-built query):",
      "  query = \"SELECT * FROM users WHERE name = '\" + user_input + \"'\"",
      "",
      "SAFE (parameterized — input can never become SQL):",
      "  cursor.execute(\"SELECT * FROM users WHERE name = ?\", (user_input,))"
    )
  },
  "cy2-xss": {
    summary:
      "Cross-Site Scripting (XSS) is injection into a WEB PAGE: untrusted input is rendered as HTML/JavaScript and runs in other users' browsers, letting an attacker steal sessions or act as the victim. STORED XSS persists (a malicious comment); REFLECTED XSS bounces off a URL parameter. The defense is contextual OUTPUT ENCODING — escape data for the place it lands (HTML, attribute, JS, URL) — plus a Content-Security-Policy (CSP) to restrict what scripts may run, and HttpOnly cookies so stolen scripts cannot read session tokens.",
    points: [
      "XSS = attacker-controlled script runs in a victim's browser in your site's context.",
      "Stored (persisted) vs reflected (via a request parameter) vs DOM-based.",
      "Primary fix: contextual output encoding/escaping; never inject raw HTML.",
      "Layer on Content-Security-Policy and HttpOnly cookies."
    ],
    example: code(
      "VULNERABLE (raw input into the page):",
      "  element.innerHTML = userComment;   // script in the comment executes",
      "",
      "SAFER:",
      "  element.textContent = userComment; // treated as text, not markup",
      "  + Content-Security-Policy header to restrict script sources"
    )
  },
  "cy2-csrf-sessions": {
    summary:
      "Cross-Site Request Forgery (CSRF) tricks a logged-in user's browser into sending an unwanted authenticated request (the browser auto-attaches cookies). Defenses: a CSRF TOKEN — an unpredictable per-session value the server requires on state-changing requests, which an attacker's site cannot know — and the SameSite cookie attribute, which stops the cookie from riding along on cross-site requests. Session security also means regenerating the session ID on login, expiring idle sessions, and invalidating sessions on logout.",
    points: [
      "CSRF abuses the browser auto-sending cookies on cross-site requests.",
      "Defense 1: CSRF tokens (unpredictable, per-session, required on writes).",
      "Defense 2: SameSite cookies block the cross-site auto-send.",
      "Session hygiene: regenerate ID on login, expire idle sessions, invalidate on logout."
    ],
    example: code(
      "CSRF token flow:",
      "  1. Server embeds a random token in the form/page",
      "  2. Browser submits it back with the request",
      "  3. Server rejects any write request missing the matching token",
      "",
      "An attacker's page cannot read or guess the token -> forged request fails."
    )
  },
  "cy2-validation": {
    summary:
      "Two distinct jobs are often confused. INPUT VALIDATION checks data on the way IN against what you expect (an age is a positive integer, an email matches a format) — prefer ALLOWLISTS (define what's permitted) over denylists (chasing what's banned). OUTPUT ENCODING escapes data on the way OUT for the context it enters (HTML, SQL, shell). Validation reduces bad data; encoding stops data from becoming code. And always validate on the SERVER — client-side checks are for UX and are trivially bypassed.",
    points: [
      "Validate input (allowlist what's expected) AND encode output (escape for context).",
      "Allowlists beat denylists — define the good, don't enumerate the infinite bad.",
      "Client-side validation is UX only; the server must re-validate everything.",
      "Encoding is context-specific: HTML-escape for pages, parameterize for SQL."
    ],
    example: code(
      "Allowlist validation (server side):",
      "  if not re.fullmatch(r\"[0-9]{1,3}\", age_input): reject()",
      "",
      "Why server side: anyone can bypass the browser and POST directly with curl.",
      "Client checks help users; server checks protect the system."
    )
  },
  "cy2-secrets": {
    summary:
      "Secrets are credentials your code needs: API keys, database passwords, signing keys. The cardinal rule: NEVER hardcode them in source or commit them to git — leaked repos are scanned within minutes. Keep secrets in environment variables or a dedicated SECRETS MANAGER (Vault, AWS Secrets Manager), separate from code. ROTATE them regularly and immediately if exposed. And remember frontend code is fully visible to users, so a 'secret' shipped to the browser is not secret — it belongs on the server.",
    points: [
      "Never hardcode or commit secrets — bots scan public repos in minutes.",
      "Use environment variables or a secrets manager, kept out of version control.",
      "Rotate secrets on a schedule and instantly if a leak is suspected.",
      "Anything shipped to the browser is public — real secrets stay server-side."
    ],
    example: code(
      "Bad:  API_KEY = \"sk_live_abc123\"   committed to git  (leaked forever)",
      "Good: api_key = os.environ[\"API_KEY\"]  + .env in .gitignore",
      "",
      "If a key hits a public repo, treat it as compromised: rotate immediately."
    )
  },
  "cy2-network-defense": {
    summary:
      "Defending a network is about layers (defense in depth). FIREWALLS filter traffic by rules. SEGMENTATION splits the network into zones so a breach in one cannot freely reach the rest (a DMZ isolates public-facing servers from internal systems). An IDS detects suspicious traffic and alerts; an IPS can actively block it. A VPN secures remote access. The guiding idea is shrinking the blast radius: assume something will get in, and limit how far it can go.",
    points: [
      "Defense in depth: multiple independent layers, not one perfect wall.",
      "Segmentation/DMZ limits lateral movement after a breach.",
      "IDS detects and alerts; IPS detects and blocks.",
      "Assume breach — design to contain blast radius, not just to keep attackers out."
    ],
    example: code(
      "Segmented network:",
      "  Internet -> [Firewall] -> DMZ (web server) -> [Firewall] -> Internal DB",
      "",
      "A compromised web server in the DMZ still faces another firewall",
      "before it can reach the internal database. Each zone contains the damage."
    )
  },
  "cy2-logging": {
    summary:
      "You cannot defend what you cannot see. LOGGING records security-relevant events (logins, failures, privilege changes, errors); MONITORING watches those logs for trouble; a SIEM (Security Information and Event Management) centralizes logs from many systems and correlates them to surface attacks a single log would miss. Good logs are timestamped, tamper-resistant, and centralized — but must NEVER contain secrets like passwords or full card numbers. Logs are also the raw material for incident investigation.",
    points: [
      "Log security events: logins, failures, privilege changes, config changes.",
      "A SIEM centralizes and correlates logs across systems to detect patterns.",
      "Never log secrets (passwords, tokens, full PII) — logs leak too.",
      "Centralized, time-synced, tamper-resistant logs are essential for investigations."
    ],
    example: code(
      "A useful security log line:",
      "  2026-06-11T14:03:22Z auth FAIL user=aya ip=203.0.113.9 reason=bad_password",
      "",
      "50 such failures in 10 seconds from one IP -> the SIEM flags a brute-force.",
      "Note: it logs the OUTCOME, never the attempted password."
    )
  },
  "cy2-incident-response": {
    summary:
      "When something goes wrong, improvising costs you. Incident Response (IR) follows a planned lifecycle — a common version is PICERL: Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned. Containment (isolate the affected systems) usually comes before eradication (remove the threat) and recovery (restore safely). The final step — a blameless post-incident review — is what turns an incident into lasting improvement. Preparation (plans, backups, contacts) done in advance is what makes the rest possible.",
    points: [
      "A lifecycle: Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned.",
      "Contain first (stop the spread), then eradicate, then recover.",
      "Preparation beforehand (runbooks, backups, contacts) makes response fast.",
      "Blameless post-incident reviews convert pain into durable improvement."
    ],
    example: code(
      "Ransomware hits a workstation:",
      "  Identify  -> alerts + the ransom note",
      "  Contain   -> disconnect that machine from the network NOW",
      "  Eradicate -> remove the malware, close the entry point",
      "  Recover   -> restore from clean backups, monitor",
      "  Learn     -> how did it get in? fix that, update the runbook"
    )
  }
};

export const cyberSet2Questions = [
  ...attach("cy2-access-control", [
    mcq("In RBAC, permissions are assigned to:", ["Roles, which are then assigned to users", "Individual users one by one", "IP addresses"], "Roles, which are then assigned to users", "Role-Based Access Control groups permissions into roles for scalable management."),
    mcq("Which access control model uses system-enforced labels like 'Top Secret'?", ["MAC (Mandatory Access Control)", "DAC (Discretionary Access Control)", "RBAC"], "MAC (Mandatory Access Control)", "MAC enforces classification labels centrally; users cannot override them."),
    mcq("In DAC (Discretionary Access Control), who sets permissions on a resource?", ["The resource owner", "The operating system kernel only", "A central security label"], "The resource owner", "DAC lets owners grant access at their discretion — like file sharing."),
    mcq("ABAC makes access decisions based on:", ["Attributes such as department, time, or location", "Only the user's password", "The size of the file"], "Attributes such as department, time, or location", "Attribute-Based Access Control evaluates rules over many attributes."),
    tf("Hiding an admin button in the UI is sufficient to prevent non-admins from using it.", false, "Authorization must be enforced server-side; a hidden button is trivially bypassed."),
    tf("RBAC is the most common access control model in business applications.", true, "Roles map cleanly to job functions, making RBAC the practical default."),
    mcq("Where must authorization checks ultimately be enforced?", ["On the server, for every request", "Only in the browser", "Only at login time"], "On the server, for every request", "Clients can be manipulated; the server is the trust boundary."),
    mcq("Applying 'least privilege' to roles means:", ["Each role gets only the permissions its job requires", "Every role gets admin to avoid friction", "Roles are removed entirely"], "Each role gets only the permissions its job requires", "Minimizing role permissions limits damage from misuse or compromise."),
    fill("The model that assigns permissions to roles, then roles to users, is __1__.", "is __1__", [{ label: "__1__", answers: ["RBAC", "rbac"] }], "RBAC = Role-Based Access Control."),
    typed("Abbreviation for the access-control model that grants permissions through roles.", "", "rbac", ["rbac"], "RBAC scales permission management via roles.")
  ]),
  ...attach("cy2-web", [
    mcq("Because HTTP is stateless, websites commonly track logged-in users with:", ["Cookies carrying a session ID", "The user's IP address only", "The browser's font settings"], "Cookies carrying a session ID", "A session cookie lets a stateless protocol remember who you are."),
    mcq("What does the HttpOnly cookie flag do?", ["Prevents JavaScript from reading the cookie", "Forces the cookie over HTTP not HTTPS", "Makes the cookie never expire"], "Prevents JavaScript from reading the cookie", "HttpOnly blocks document.cookie access, limiting session theft via XSS."),
    mcq("The Secure cookie flag ensures the cookie is:", ["Only sent over HTTPS", "Encrypted on disk", "Readable by any site"], "Only sent over HTTPS", "Secure prevents the cookie from being transmitted over plaintext HTTP."),
    mcq("The SameSite cookie attribute primarily helps defend against:", ["CSRF", "SQL injection", "Ransomware"], "CSRF", "SameSite limits cookies on cross-site requests, blunting CSRF."),
    tf("During the TLS handshake, the server proves its identity with a certificate.", true, "The certificate (signed by a CA) authenticates the server before encryption begins."),
    tf("Data sent over HTTPS is readable by anyone monitoring the network.", false, "HTTPS encrypts the traffic; observers see only ciphertext."),
    mcq("Why should servers treat all client-supplied data as untrusted?", ["Clients can forge, modify, or replay any request", "Clients are always slow", "Browsers encrypt everything"], "Clients can forge, modify, or replay any request", "Anything from the client can be tampered with; the server must validate."),
    mcq("A session ID stored in a cookie should ideally be:", ["Long, random, and unpredictable", "The user's email", "A small sequential number"], "Long, random, and unpredictable", "Predictable session IDs can be guessed/hijacked; use cryptographic randomness."),
    fill("The cookie flag that blocks JavaScript from reading a cookie is __1__.", "is __1__", [{ label: "__1__", answers: ["HttpOnly", "httponly"] }], "HttpOnly mitigates session-token theft via XSS."),
    typed("Name the cookie attribute (one word) that limits a cookie being sent on cross-site requests.", "", "samesite", ["samesite", "same-site"], "SameSite is a key CSRF mitigation.")
  ]),
  ...attach("cy2-injection", [
    mcq("What is the ROOT CAUSE of injection vulnerabilities?", ["Untrusted input is treated as part of a command or query", "Servers are too fast", "Passwords are too short"], "Untrusted input is treated as part of a command or query", "Injection occurs when data crosses into the code/command channel."),
    mcq("The primary, reliable fix for SQL injection is:", ["Parameterized queries (prepared statements)", "Hiding the database version", "Using a faster database"], "Parameterized queries (prepared statements)", "Parameterization separates code from data so input cannot become SQL."),
    mcq("Which code pattern is DANGEROUS for SQL?", ["Concatenating user input directly into the query string", "Using placeholders and passing input separately", "Using an ORM with bound parameters"], "Concatenating user input directly into the query string", "String-built queries let input alter the query's meaning."),
    tf("Parameterized queries keep user input as DATA so it can never be executed as SQL.", true, "The database treats bound parameters strictly as values, not code."),
    tf("Blocklisting words like 'DROP' and 'SELECT' is a complete defense against SQL injection.", false, "Blocklists are easily bypassed; parameterization is the real fix."),
    mcq("Besides parameterized queries, a good defense-in-depth measure is:", ["A least-privilege database account", "Granting the app DB account full admin", "Disabling the firewall"], "A least-privilege database account", "If injection occurs, a limited DB account caps the damage."),
    mcq("Injection is not limited to SQL. Another common target is:", ["Operating system commands (command injection)", "Monitor brightness", "Keyboard layout"], "Operating system commands (command injection)", "Any interpreter (OS shell, LDAP, NoSQL) can suffer injection."),
    mcq("Why can verbose database error messages help attackers?", ["They can reveal schema and query structure useful for crafting attacks", "They slow the server", "They encrypt data"], "They can reveal schema and query structure useful for crafting attacks", "Leak only generic errors to users; log details internally."),
    fill("The reliable fix for SQL injection is to use __1__ queries (also called prepared statements).", "use __1__ queries", [{ label: "__1__", answers: ["parameterized", "parameterised", "prepared"] }], "Parameterized/prepared queries separate data from code."),
    typed("In a parameterized SQL query, which single character is the most common placeholder for a value?", "", "?", ["?", "question mark"], "The ? placeholder marks where bound data goes, keeping it out of the code.")
  ]),
  ...attach("cy2-xss", [
    mcq("Cross-Site Scripting (XSS) lets an attacker:", ["Run malicious script in a victim's browser in your site's context", "Encrypt the server's disk", "Reset the database password"], "Run malicious script in a victim's browser in your site's context", "XSS executes attacker-controlled JavaScript as if from your trusted site."),
    mcq("STORED XSS differs from REFLECTED XSS because stored XSS:", ["Is saved on the server and served to many users later", "Only works over HTTP", "Requires physical access"], "Is saved on the server and served to many users later", "Stored XSS persists (e.g., a malicious comment); reflected bounces off a request."),
    mcq("The primary defense against XSS is:", ["Contextual output encoding/escaping of untrusted data", "Faster servers", "Longer passwords"], "Contextual output encoding/escaping of untrusted data", "Escaping data for the context it lands in stops it being parsed as code."),
    mcq("Which is safer when inserting user text into a page?", ["element.textContent = userInput", "element.innerHTML = userInput", "eval(userInput)"], "element.textContent = userInput", "textContent renders input as text; innerHTML can execute embedded markup/scripts."),
    tf("A Content-Security-Policy (CSP) header can restrict which scripts a page is allowed to run.", true, "CSP is a strong defense-in-depth layer that limits script sources and inline scripts."),
    tf("HttpOnly cookies prevent stolen XSS scripts from reading the session token.", true, "If the cookie is HttpOnly, injected JavaScript cannot read it via document.cookie."),
    mcq("Why is XSS classified as a kind of injection?", ["Untrusted input is interpreted as code (HTML/JS) in the page", "It floods the network", "It cracks passwords"], "Untrusted input is interpreted as code (HTML/JS) in the page", "Like SQLi, XSS is data crossing into a code context — here, the browser."),
    mcq("DOM-based XSS occurs when:", ["Client-side JavaScript writes untrusted data into the page unsafely", "The server logs too much", "The database is unencrypted"], "Client-side JavaScript writes untrusted data into the page unsafely", "DOM XSS happens entirely in the browser via unsafe client-side sinks."),
    fill("The main XSS defense is contextual output __1__ (escaping) of untrusted data.", "output __1__", [{ label: "__1__", answers: ["encoding"] }], "Output encoding/escaping neutralizes data so it is not parsed as code."),
    typed("Name the HTTP response header (3-letter abbreviation) used to restrict allowed script sources.", "", "csp", ["csp", "content-security-policy"], "Content-Security-Policy (CSP) limits where scripts may load from.")
  ]),
  ...attach("cy2-csrf-sessions", [
    mcq("CSRF works by:", ["Tricking a logged-in user's browser into sending an unwanted request", "Guessing the user's password", "Encrypting the user's files"], "Tricking a logged-in user's browser into sending an unwanted request", "The browser auto-attaches cookies, so a forged cross-site request looks authenticated."),
    mcq("A CSRF token defeats the attack because:", ["The attacker's site cannot know the unpredictable per-session value", "It encrypts the password", "It blocks all cookies"], "The attacker's site cannot know the unpredictable per-session value", "The server requires a secret token the attacker cannot read or guess."),
    mcq("Which cookie attribute helps prevent CSRF by limiting cross-site sending?", ["SameSite", "HttpOnly", "Max-Age"], "SameSite", "SameSite stops the cookie from riding along on cross-site requests."),
    tf("A good practice is to regenerate the session ID when a user logs in.", true, "Regenerating on login prevents session-fixation attacks."),
    tf("CSRF tokens should be the same predictable value for every user.", false, "Tokens must be unpredictable and per-session, or attackers could supply them."),
    mcq("On logout, the server should:", ["Invalidate the session so the old ID no longer works", "Keep the session alive for convenience", "Email the session ID to the user"], "Invalidate the session so the old ID no longer works", "Proper logout destroys the session server-side, not just client-side."),
    mcq("Idle session expiration helps by:", ["Limiting the window in which a stolen session is usable", "Making login faster", "Encrypting the database"], "Limiting the window in which a stolen session is usable", "Short-lived sessions reduce the value of a hijacked token."),
    mcq("Why are state-changing actions (transfers, deletes) the main CSRF targets?", ["They cause real effects the attacker wants to trigger", "They are read-only", "They never use cookies"], "They cause real effects the attacker wants to trigger", "CSRF aims to make the victim perform an unwanted action, not just read."),
    fill("An unpredictable per-session value required on write requests to stop CSRF is a CSRF __1__.", "CSRF __1__", [{ label: "__1__", answers: ["token"] }], "CSRF tokens are the standard mitigation alongside SameSite cookies."),
    typed("Abbreviation for the attack that forges authenticated requests using a victim's browser.", "", "csrf", ["csrf", "xsrf"], "CSRF (Cross-Site Request Forgery), sometimes written XSRF.")
  ]),
  ...attach("cy2-validation", [
    mcq("Input validation is best done using:", ["An allowlist of what is expected", "A denylist chasing every bad value", "No checks if the UI looks fine"], "An allowlist of what is expected", "Allowlists define the permitted set; denylists endlessly chase bypasses."),
    mcq("Output encoding's job is to:", ["Escape data so it is not interpreted as code in its destination", "Validate that input is the right type", "Compress responses"], "Escape data so it is not interpreted as code in its destination", "Encoding is context-specific neutralization of data on the way out."),
    tf("Client-side validation alone is enough to keep the server safe.", false, "Client checks are UX only and trivially bypassed; the server must re-validate."),
    tf("Validation and output encoding solve different problems and are both needed.", true, "Validation filters bad input; encoding stops valid input from becoming code."),
    mcq("Why are allowlists generally safer than denylists?", ["You define the small known-good set instead of the infinite bad set", "They are shorter to type", "They run faster"], "You define the small known-good set instead of the infinite bad set", "It is impossible to enumerate every malicious input; define what's allowed."),
    mcq("Where must validation always be enforced?", ["On the server", "Only in the browser", "Only in the database"], "On the server", "The server is the trust boundary; clients can be bypassed entirely."),
    mcq("Encoding data for HTML vs for SQL vs for a shell command differs because:", ["Each context interprets characters differently", "Only HTML needs encoding", "They are identical"], "Each context interprets characters differently", "Correct encoding is specific to where the data lands."),
    mcq("An attacker bypasses your JavaScript form checks by sending a raw request with curl. This proves:", ["Server-side validation is mandatory", "JavaScript is broken", "Validation is pointless"], "Server-side validation is mandatory", "Anything client-side can be skipped; the server must validate independently."),
    fill("Defining the set of permitted values, rather than banned ones, is an __1__ approach.", "an __1__ approach", [{ label: "__1__", answers: ["allowlist", "allow-list", "whitelist"] }], "Allowlists (whitelists) are the safer validation strategy."),
    typed("Validation should always be enforced on the ______ (where the trust boundary is). One word.", "", "server", ["server", "server-side", "backend"], "Server-side validation cannot be bypassed by the client.")
  ]),
  ...attach("cy2-secrets", [
    mcq("Where should an API key NOT be stored?", ["Hardcoded in source code committed to git", "In an environment variable", "In a secrets manager"], "Hardcoded in source code committed to git", "Committed secrets leak permanently and are scanned within minutes of pushing."),
    mcq("A dedicated tool like HashiCorp Vault or AWS Secrets Manager is used to:", ["Store, access-control, and rotate secrets centrally", "Encrypt the monitor", "Speed up the database"], "Store, access-control, and rotate secrets centrally", "Secrets managers centralize and govern credential access and rotation."),
    tf("A secret accidentally pushed to a public repo should be considered compromised and rotated immediately.", true, "Automated scanners harvest exposed secrets within minutes; rotate at once."),
    tf("API keys placed in frontend JavaScript are safely hidden from users.", false, "All frontend code is visible to users; real secrets must live server-side."),
    mcq("Why rotate secrets regularly?", ["It limits how long a leaked secret remains useful", "It makes them longer", "It encrypts them twice"], "It limits how long a leaked secret remains useful", "Rotation shrinks the window an undetected leak can be abused."),
    mcq("A common safe pattern for app secrets in development is:", ["Environment variables with a .env file excluded from git", "A comment at the top of main.py", "A public Gist"], "Environment variables with a .env file excluded from git", "Keep secrets out of code and version control; load from the environment."),
    mcq("Which file should typically be listed in .gitignore?", [".env", "README.md", "index.html"], ".env", "The .env file holds local secrets and must never be committed."),
    mcq("The biggest risk of hardcoded secrets in a repo is:", ["They persist in git history even after deletion", "They slow compilation", "They use disk space"], "They persist in git history even after deletion", "Deleting the line does not remove it from history — it must be purged and rotated."),
    fill("Secrets should be loaded from environment variables or a secrets __1__, never hardcoded.", "secrets __1__", [{ label: "__1__", answers: ["manager"] }], "A secrets manager centralizes secure storage and rotation."),
    typed("Name the file commonly used to hold local environment secrets (it should be gitignored). Include the dot.", "", ".env", [".env", "env"], "The .env file stores local secrets and is excluded from version control.")
  ]),
  ...attach("cy2-network-defense", [
    mcq("'Defense in depth' means:", ["Using multiple independent layers of security", "One very strong firewall", "Encrypting passwords twice"], "Using multiple independent layers of security", "Layered defenses ensure one failure does not mean total compromise."),
    mcq("Network segmentation primarily limits:", ["Lateral movement after a breach", "The speed of the network", "The number of users"], "Lateral movement after a breach", "Segments contain an attacker so a single foothold cannot reach everything."),
    mcq("A DMZ is used to:", ["Isolate public-facing servers from the internal network", "Store backups", "Encrypt email"], "Isolate public-facing servers from the internal network", "The DMZ is a buffer zone between the internet and internal systems."),
    mcq("The difference between an IDS and an IPS is:", ["IDS detects and alerts; IPS can actively block", "IDS blocks; IPS only logs", "They are identical"], "IDS detects and alerts; IPS can actively block", "Intrusion Detection alerts; Intrusion Prevention can stop traffic inline."),
    tf("A core assumption of modern network defense is 'assume breach' and limit blast radius.", true, "Designing to contain damage acknowledges that perfect prevention is unrealistic."),
    tf("A single firewall at the perimeter is sufficient for a modern network.", false, "Perimeter-only defense fails once inside; layering and segmentation are needed."),
    mcq("A VPN's main security role for remote workers is to:", ["Encrypt their traffic across untrusted networks", "Make their laptop faster", "Scan email for spam"], "Encrypt their traffic across untrusted networks", "VPNs protect data in transit over networks you do not control."),
    mcq("Why segment the network so a breached web server cannot directly reach the database?", ["It contains the damage and forces the attacker through more controls", "It speeds up queries", "Databases require it to boot"], "It contains the damage and forces the attacker through more controls", "Segmentation reduces blast radius and adds barriers to lateral movement."),
    fill("Splitting a network into isolated zones to contain breaches is called network __1__.", "network __1__", [{ label: "__1__", answers: ["segmentation"] }], "Segmentation limits how far an attacker can move."),
    typed("Which system can actively BLOCK malicious traffic inline (3-letter abbreviation)?", "", "ips", ["ips"], "An IPS (Intrusion Prevention System) blocks; an IDS only detects/alerts.")
  ]),
  ...attach("cy2-logging", [
    mcq("What does a SIEM do?", ["Centralizes and correlates logs from many systems to detect threats", "Encrypts the network", "Replaces the firewall"], "Centralizes and correlates logs from many systems to detect threats", "A SIEM aggregates logs and finds patterns a single source would miss."),
    mcq("Which should NEVER appear in logs?", ["Passwords or full payment card numbers", "Timestamps", "Source IP addresses"], "Passwords or full payment card numbers", "Logs leak too; never record secrets or sensitive PII in them."),
    mcq("Why centralize logs from many servers?", ["To correlate events and prevent local tampering", "To save disk on each server only", "To make them harder to read"], "To correlate events and prevent local tampering", "Central, tamper-resistant logs enable detection and trustworthy investigation."),
    tf("Logging failed login attempts can help detect brute-force attacks.", true, "A spike of failures from one source is a classic brute-force signal."),
    tf("If a system has no logs, investigating an incident is just as easy.", false, "Without logs you are blind; logs are the primary evidence for investigations."),
    mcq("A good security log entry records:", ["The event outcome (e.g., login failed) and context, not the secret itself", "The user's actual password for reference", "Nothing identifying"], "The event outcome (e.g., login failed) and context, not the secret itself", "Log what happened and who/where — never the credential attempted."),
    mcq("Synchronized timestamps across systems matter because:", ["They let you reconstruct the true order of events during an investigation", "They make logs shorter", "They encrypt the logs"], "They let you reconstruct the true order of events during an investigation", "Time sync (e.g., NTP) is essential to correlate cross-system activity."),
    mcq("Monitoring differs from logging in that monitoring:", ["Actively watches logs/metrics for problems and alerts", "Only stores data", "Deletes old events"], "Actively watches logs/metrics for problems and alerts", "Logging records; monitoring observes and triggers alerts."),
    fill("The system that aggregates and correlates security logs across an organization is a __1__.", "a __1__", [{ label: "__1__", answers: ["SIEM", "siem"] }], "SIEM = Security Information and Event Management."),
    typed("Abbreviation for the platform that centralizes and correlates security event logs.", "", "siem", ["siem"], "A SIEM is central to detection and investigation.")
  ]),
  ...attach("cy2-incident-response", [
    mcq("In incident response, what does CONTAINMENT mean?", ["Stopping the incident from spreading further", "Removing the malware permanently", "Restoring from backup"], "Stopping the incident from spreading further", "Containment isolates affected systems before eradication and recovery."),
    mcq("Which is the typical order of these IR phases?", ["Identification, Containment, Eradication, Recovery", "Recovery, Identification, Containment, Eradication", "Eradication, Recovery, Identification, Containment"], "Identification, Containment, Eradication, Recovery", "You find it, stop the spread, remove it, then safely restore."),
    mcq("ERADICATION in incident response means:", ["Removing the threat and closing the entry point", "Telling the press", "Buying new laptops"], "Removing the threat and closing the entry point", "Eradication eliminates the malware/foothold and fixes the root cause."),
    mcq("Why restore from backups rather than the running infected system during RECOVERY?", ["The live system may still be compromised", "Backups are always newer", "It is faster to type"], "The live system may still be compromised", "Clean, verified backups avoid reintroducing the threat."),
    tf("A blameless post-incident review helps teams improve without fear of punishment.", true, "Blameless reviews surface honest root causes and durable fixes."),
    tf("The first reaction to a confirmed breach should be to immediately wipe everything.", false, "Wiping prematurely destroys evidence and may skip containment/analysis; follow the plan."),
    mcq("The PREPARATION phase (before any incident) includes:", ["Runbooks, backups, contacts, and training", "Paying attackers", "Deleting all logs"], "Runbooks, backups, contacts, and training", "Preparation done in advance is what makes fast, calm response possible."),
    mcq("Why contain BEFORE eradicating?", ["To stop the spread while you remove the threat safely", "Eradication is impossible otherwise", "Containment restores data"], "To stop the spread while you remove the threat safely", "Limiting damage first prevents the incident from growing during cleanup."),
    fill("In IR, isolating affected systems to stop the spread is the __1__ phase.", "the __1__ phase", [{ label: "__1__", answers: ["containment"] }], "Containment precedes eradication and recovery."),
    typed("What kind of post-incident review names no individual at fault and focuses on systemic fixes? (one word)", "", "blameless", ["blameless"], "Blameless reviews produce honest analysis and lasting improvements.")
  ])
];
