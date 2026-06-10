const code = (...lines) => lines.join("\n");
const setId = "linux-set1";

function item(type, data) {
  const levels = { mcq: "MCQ", tf: "True/False", fill: "Complete", code: "Typed Code" };
  return { type, level: levels[type], ...data };
}

const mcq = (prompt, choices, answer, explanation, snippet) =>
  item("mcq", { prompt, choices, answer, explanation, ...(snippet ? { snippet } : {}) });
const tf = (prompt, answer, explanation, snippet) =>
  item("tf", { prompt, answer, explanation, ...(snippet ? { snippet } : {}) });
const fill = (prompt, snippet, blanks, explanation) =>
  item("fill", { prompt, snippet, blanks, explanation });
const typed = (prompt, starter, expected, required, explanation, accepted) =>
  item("code", { prompt, starter, expected, required, explanation, ...(accepted ? { accepted } : {}) });

function attach(moduleId, items) {
  return items.map((question, index) => ({
    id: `${moduleId}-${String(index + 1).padStart(2, "0")}`,
    setId,
    moduleId,
    ...question
  }));
}

export const linuxSet1Modules = [
  { id: "linux1-what-linux", setId, title: "What Linux Is" },
  { id: "linux1-filesystem", setId, title: "The Filesystem Layout" },
  { id: "linux1-users-groups", setId, title: "Users, Groups, and root" },
  { id: "linux1-permissions", setId, title: "Ownership and Permissions" },
  { id: "linux1-processes", setId, title: "Processes and Monitoring" },
  { id: "linux1-packages", setId, title: "Package Management" },
  { id: "linux1-services", setId, title: "Services and systemctl" },
  { id: "linux1-networking", setId, title: "Networking Basics" },
  { id: "linux1-environment", setId, title: "Environment and PATH" },
  { id: "linux1-logs", setId, title: "Logs and Troubleshooting" }
];

export const linuxSet1Lessons = {
  "linux1-what-linux": {
    summary:
      "Linux is an open-source operating system kernel — the core that talks to hardware and manages programs. A distribution (distro) like Ubuntu, Debian, Fedora, or Arch bundles that kernel with tools, a package manager, and defaults. Linux runs most of the internet's servers, all Android phones, and nearly every cloud machine you will ever deploy to.",
    points: [
      "Kernel = the core; distro = kernel + tools + package manager.",
      "Ubuntu and Debian (apt) are the most common server distros.",
      "Cloud servers are overwhelmingly Linux — this is deploy-target knowledge."
    ],
    example: code(
      "# identify the system you are on",
      "uname -a",
      "cat /etc/os-release"
    )
  },
  "linux1-filesystem": {
    summary:
      "Linux has one filesystem tree starting at the root /. Everything hangs off it in conventional places: /home holds user directories, /etc holds configuration, /var holds changing data like logs, /usr and /bin hold programs, /tmp is scratch space cleared on reboot. Knowing the map means knowing where to look.",
    points: [
      "/home/aya — your files; /etc — config; /var/log — logs.",
      "/bin and /usr/bin — programs; /tmp — disposable scratch.",
      "There are no drive letters — everything mounts under /."
    ],
    example: code(
      "ls /",
      "ls /etc | head",
      "ls /var/log | head"
    )
  },
  "linux1-users-groups": {
    summary:
      "Linux is multi-user: every process and file belongs to a user, and users belong to groups that share permissions. root is the all-powerful administrator. Day to day you work as a regular user and elevate single commands with sudo — running everything as root is how systems get destroyed by one typo.",
    points: [
      "whoami — current user; id — your groups.",
      "root can do anything, including the catastrophic.",
      "sudo command — one elevated command, logged and deliberate."
    ],
    example: code(
      "whoami",
      "id",
      "sudo ls /root   # works only with sudo rights"
    )
  },
  "linux1-permissions": {
    summary:
      "Every file has an owner, a group, and three permission triples (owner/group/others) of read, write, execute. ls -l shows them: -rw-r--r-- aya staff. chmod changes the permissions, chown changes the owner. Directories need execute permission to be ENTERED — a classic confusion.",
    points: [
      "rwx triples: owner, group, others — read, write, execute.",
      "chmod 644 file — owner rw, everyone else read-only.",
      "chown aya:staff file — change owner and group; x on a directory = can enter it."
    ],
    example: code(
      "ls -l report.txt",
      "chmod 644 report.txt",
      "sudo chown aya report.txt"
    )
  },
  "linux1-processes": {
    summary:
      "Every running program is a process with a PID. ps aux lists them all; top (or htop) shows a live view with CPU and memory. kill PID politely asks a process to exit (SIGTERM); kill -9 forces it (SIGKILL) — the last resort because the process gets no chance to clean up. Appending & runs a command in the background.",
    points: [
      "ps aux | grep node — find a process; top — live monitor.",
      "kill PID first; kill -9 PID only when it refuses.",
      "command & runs in the background; jobs lists background tasks."
    ],
    example: code(
      "ps aux | head -n 5",
      "top    # press q to quit",
      "kill 12345"
    )
  },
  "linux1-packages": {
    summary:
      "Software installs through a package manager that handles downloads, dependencies, and updates. On Debian/Ubuntu that is apt: sudo apt update refreshes the package index, sudo apt install nginx installs, sudo apt upgrade updates everything. Fedora uses dnf, Arch uses pacman — same ideas, different spellings.",
    points: [
      "sudo apt update — refresh the index FIRST.",
      "sudo apt install package / sudo apt remove package.",
      "apt list --installed and apt search keyword explore packages."
    ],
    example: code(
      "sudo apt update",
      "sudo apt install htop",
      "htop --version"
    )
  },
  "linux1-services": {
    summary:
      "Long-running background programs — web servers, databases — run as services managed by systemd. systemctl status nginx shows health, start/stop/restart control it now, and enable/disable decide whether it starts at boot. status plus the logs answers 'why is the site down?' more often than anything else.",
    points: [
      "systemctl status nginx — is it running, and why not.",
      "sudo systemctl restart nginx — apply config changes.",
      "enable = start at boot; start = start right now. They are independent."
    ],
    example: code(
      "systemctl status nginx",
      "sudo systemctl restart nginx",
      "sudo systemctl enable nginx"
    )
  },
  "linux1-networking": {
    summary:
      "Servers are remote — you reach them with ssh user@host, copy files with scp, and test connectivity with ping. curl fetches URLs from the command line, perfect for testing APIs from the server itself. ip addr (or hostname -I) shows the machine's addresses; ports below 1024 need root to bind.",
    points: [
      "ssh aya@server.com — remote shell; scp file aya@server:/path — copy.",
      "ping host — is it reachable; curl url — fetch a page or API.",
      "ip addr — interfaces and IPs; ss -tlnp — listening ports."
    ],
    example: code(
      "ping -c 3 example.com",
      "curl https://api.github.com",
      "ssh aya@my-server.com"
    )
  },
  "linux1-environment": {
    summary:
      "Environment variables configure programs per session: $HOME, $USER, $PATH. printenv lists them; export NAME=value sets one for the current shell and its children. $PATH is the colon-separated list of directories searched for commands — 'command not found' for an installed tool almost always means a PATH problem. Permanent settings go in ~/.bashrc or ~/.zshrc.",
    points: [
      "printenv | head — see your environment; echo $PATH.",
      "export API_URL=https://... — set for this session.",
      "Persist in ~/.bashrc; apply with source ~/.bashrc."
    ],
    example: code(
      "echo $PATH",
      "export GREETING=\"hello\"",
      "echo $GREETING"
    )
  },
  "linux1-logs": {
    summary:
      "When something breaks, the system already wrote down why. Classic logs live in /var/log (syslog, auth.log, nginx/error.log); systemd services log to journalctl -u service-name. For resources: df -h shows disk space, du -sh shows a directory's size, free -h shows memory. The troubleshooting loop: status → logs → resources.",
    points: [
      "journalctl -u nginx --since today — a service's recent logs.",
      "tail -f /var/log/syslog — watch the system live.",
      "df -h (disk), du -sh dir (folder size), free -h (memory)."
    ],
    example: code(
      "df -h",
      "free -h",
      "tail -n 20 /var/log/syslog"
    )
  }
};

export const linuxSet1Questions = [
  ...attach("linux1-what-linux", [
    mcq("What is the Linux kernel?", ["The core of the OS that manages hardware, memory, and processes", "A text editor", "A web browser for servers"], "The core of the OS that manages hardware, memory, and processes", "Everything else — shells, tools, desktops — runs on top of the kernel."),
    mcq("What is a Linux distribution?", ["The kernel bundled with tools, defaults, and a package manager", "A Linux backup", "A kernel version number"], "The kernel bundled with tools, defaults, and a package manager", "Ubuntu, Debian, Fedora, and Arch are distros."),
    mcq("Which distro family uses the apt package manager?", ["Debian/Ubuntu", "Fedora", "Arch"], "Debian/Ubuntu", "Fedora uses dnf; Arch uses pacman."),
    tf("Most cloud servers and web infrastructure run Linux.", true, "Linux dominates servers — deploying software means touching Linux."),
    tf("Linux is closed-source software owned by one company.", false, "Linux is open source, developed by a global community and many companies."),
    mcq("Which command prints kernel and system information?", ["uname -a", "linux --info", "version"], "uname -a", "uname -a shows kernel version, architecture, and hostname."),
    mcq("Where can you see which distro a machine runs?", ["cat /etc/os-release", "show distro", "apt whoami"], "cat /etc/os-release", "os-release lists the distro name and version."),
    mcq("Android phones run on top of which kernel?", ["Linux", "Windows NT", "Darwin"], "Linux", "Android is the world's most widely deployed Linux."),
    fill("Complete the system info command.", "__1__ -a", [{ label: "__1__", answers: ["uname"] }], "uname = unix name."),
    mcq("Why learn Linux as a developer?", ["Servers, containers, and CI systems are Linux — deployment depends on it", "It is required to write JavaScript", "Laptops cannot run anything else"], "Servers, containers, and CI systems are Linux — deployment depends on it", "Docker images, GitHub Actions runners, and cloud VMs are all Linux environments.")
  ]),
  ...attach("linux1-filesystem", [
    mcq("What is / in the Linux filesystem?", ["The root — the single top of the entire tree", "The home directory", "A network drive"], "The root — the single top of the entire tree", "Every file on the system lives somewhere under /."),
    mcq("Where do regular users' personal files live?", ["/home", "/etc", "/bin"], "/home", "Each user gets /home/username."),
    mcq("What does /etc hold?", ["System and application configuration files", "Temporary files", "User photos"], "System and application configuration files", "Config lives in /etc — nginx, ssh, hosts, and almost everything else."),
    mcq("Where would you look for log files?", ["/var/log", "/home/log", "/logs"], "/var/log", "/var holds variable data; its log subdirectory is the first stop when debugging."),
    tf("Files in /tmp are safe long-term storage.", false, "/tmp is scratch space, typically cleared on reboot."),
    mcq("Where do executable programs typically live?", ["/bin and /usr/bin", "/etc/programs", "/home/apps"], "/bin and /usr/bin", "That is why they are found on your $PATH."),
    tf("Linux uses drive letters like C: for different disks.", false, "Disks mount INTO the single tree, e.g. at / or /mnt/data."),
    fill("Complete the path to the logs.", "ls /var/__1__", [{ label: "__1__", answers: ["log"] }], "/var/log is the system's diary."),
    mcq("What is a hidden file in Linux?", ["Any file whose name starts with a dot, like .bashrc", "A file owned by root", "An encrypted file"], "Any file whose name starts with a dot, like .bashrc", "ls -a reveals dotfiles."),
    mcq("Where does the nginx config most likely live?", ["/etc/nginx/", "/home/nginx/", "/var/log/nginx/"], "/etc/nginx/", "Config in /etc, logs in /var/log — the convention pays off daily.")
  ]),
  ...attach("linux1-users-groups", [
    mcq("Which command prints your current username?", ["whoami", "user", "me"], "whoami", "whoami shows the effective user."),
    mcq("What is root?", ["The administrator account with unlimited power", "The first folder", "A network protocol"], "The administrator account with unlimited power", "root bypasses all permission checks — capable of anything, including disasters."),
    mcq("What does sudo apt install nginx do?", ["Runs the install command once, with root privileges", "Switches you to root permanently", "Installs sudo"], "Runs the install command once, with root privileges", "sudo elevates a single command and logs who did it."),
    tf("Working as root all the time is recommended for convenience.", false, "One mistyped rm as root can erase the system — stay a regular user, elevate per command."),
    mcq("What are groups for?", ["Granting shared permissions to multiple users at once", "Chat channels", "Folder shortcuts"], "Granting shared permissions to multiple users at once", "Files have a group; members get the group permission triple."),
    fill("Show your user and group memberships.", "__1__", [{ label: "__1__", answers: ["id"] }], "id lists your uid, gid, and groups."),
    mcq("Which file famously lists user accounts?", ["/etc/passwd", "/home/users.txt", "/var/accounts"], "/etc/passwd", "One line per account; actual password hashes live in /etc/shadow."),
    mcq("What does Permission denied usually mean when sudo fixes it?", ["The action needed privileges your user lacks", "The disk is full", "The command does not exist"], "The action needed privileges your user lacks", "Resources owned by root need elevation to touch."),
    mcq("Which command creates a new user on most systems?", ["sudo adduser aya", "newperson aya", "user.create(aya)"], "sudo adduser aya", "adduser (or useradd) provisions the account and home directory."),
    tf("sudo actions are typically logged, so elevated commands leave an audit trail.", true, "Accountability is part of why sudo beats logging in as root.")
  ]),
  ...attach("linux1-permissions", [
    mcq("In -rw-r--r-- aya staff, who is aya?", ["The file's owner", "The group", "The last editor"], "The file's owner", "ls -l shows permissions, owner, then group."),
    mcq("What does the owner triple rw- allow?", ["Read and write, but not execute", "Read only", "Everything"], "Read and write, but not execute", "Each triple is read/write/execute in order."),
    mcq("What does chmod 644 file set?", ["Owner rw-, group r--, others r--", "Everyone rw-", "Owner only, no access for others"], "Owner rw-, group r--, others r--", "6 = rw-, 4 = r-- : the standard for non-executable files."),
    mcq("What does chmod 755 set, and when is it used?", ["Owner rwx, others r-x — standard for scripts and directories", "Read-only everywhere", "Write-only for the group"], "Owner rwx, others r-x — standard for scripts and directories", "7 = rwx, 5 = r-x."),
    fill("Change the file's owner to aya.", "sudo __1__ aya report.txt", [{ label: "__1__", answers: ["chown"] }], "chown changes ownership; chown aya:staff sets owner AND group."),
    tf("To cd INTO a directory, you need execute permission on it.", true, "Directory x = enter; directory r = list contents — subtly different."),
    mcq("A web server cannot read /var/www/site/index.html. What is the likely cause?", ["The file's permissions or ownership exclude the server's user", "The file is too large", "HTML needs chmod 777"], "The file's permissions or ownership exclude the server's user", "Check ls -l and align owner/group with the service user."),
    mcq("Why is chmod 777 considered a bad fix?", ["It gives EVERYONE full write/execute access — a security hole", "It only works for root", "It makes files slower"], "It gives EVERYONE full write/execute access — a security hole", "Grant the minimum permission that solves the problem."),
    fill("Make the script executable for everyone.", "chmod __1__ deploy.sh", [{ label: "__1__", answers: ["+x"] }], "chmod +x adds execute to all triples."),
    mcq("Which command shows a file's permissions?", ["ls -l file", "perm file", "chmod file"], "ls -l file", "ls -l is how you READ the permission string before changing anything.")
  ]),
  ...attach("linux1-processes", [
    mcq("What is a process?", ["A running instance of a program, identified by a PID", "A saved file", "A user account"], "A running instance of a program, identified by a PID", "Every command you run becomes a process."),
    mcq("Which command lists all running processes?", ["ps aux", "ls -processes", "run --list"], "ps aux", "ps aux shows user, PID, CPU, memory, and command for everything."),
    fill("Find the nginx process.", "ps aux | __1__ nginx", [{ label: "__1__", answers: ["grep"] }], "Piping ps to grep is the everyday process search."),
    mcq("What does top show?", ["A live, updating view of processes, CPU, and memory", "The top of a file", "The fastest command"], "A live, updating view of processes, CPU, and memory", "Quit with q; htop is the friendlier upgrade."),
    mcq("What does kill 12345 actually send?", ["SIGTERM — a polite request to exit and clean up", "An instant force-kill", "A restart signal"], "SIGTERM — a polite request to exit and clean up", "Processes can catch SIGTERM and shut down gracefully."),
    mcq("When is kill -9 appropriate?", ["As a last resort when a process ignores normal kill", "Always — it is faster", "Never"], "As a last resort when a process ignores normal kill", "SIGKILL cannot be caught — no cleanup, no goodbye."),
    fill("Run the server in the background.", "python3 server.py __1__", [{ label: "__1__", answers: ["&"] }], "A trailing & detaches the command from your prompt."),
    tf("Each process has a unique PID you use to manage it.", true, "PIDs are how kill, and monitoring tools, address processes."),
    mcq("Port 3000 is already in use. How do you find the culprit?", ["ss -tlnp | grep 3000 (or lsof -i :3000)", "cat /ports/3000", "kill 3000"], "ss -tlnp | grep 3000 (or lsof -i :3000)", "Find the PID listening on the port, then kill THAT pid — 3000 is the port, not the PID."),
    mcq("What happens to background jobs when you close the terminal (without nohup/screen)?", ["They typically receive a hangup signal and die", "They keep running forever", "They pause"], "They typically receive a hangup signal and die", "Real services belong in systemd, tmux, or nohup — not bare &.")
  ]),
  ...attach("linux1-packages", [
    mcq("What does a package manager do?", ["Installs, updates, and removes software with its dependencies", "Manages email", "Compresses folders"], "Installs, updates, and removes software with its dependencies", "It resolves dependency chains you would never want to handle by hand."),
    mcq("Which command installs nginx on Ubuntu?", ["sudo apt install nginx", "apt get me nginx", "install nginx"], "sudo apt install nginx", "Installing system software needs sudo."),
    fill("Refresh the package index first.", "sudo apt __1__", [{ label: "__1__", answers: ["update"] }], "apt update downloads the latest package lists — run it before installing."),
    mcq("What is the difference between apt update and apt upgrade?", ["update refreshes the index; upgrade actually installs newer versions", "They are identical", "upgrade only upgrades apt itself"], "update refreshes the index; upgrade actually installs newer versions", "The classic pair: update first, then upgrade."),
    mcq("How do you remove a package on Ubuntu?", ["sudo apt remove package", "sudo apt delete package", "rm package"], "sudo apt remove package", "remove uninstalls; purge also removes its config files."),
    tf("Fedora uses dnf and Arch uses pacman, but the concepts match apt.", true, "Learn the ideas once; map the spellings per distro."),
    fill("Search for a package.", "apt __1__ htop", [{ label: "__1__", answers: ["search"] }], "apt search keyword scans names and descriptions."),
    mcq("Why is sudo apt update needed before install?", ["The local package index may be stale and point at missing versions", "It frees disk space", "apt refuses to run twice"], "The local package index may be stale and point at missing versions", "404 errors during install usually mean a stale index."),
    mcq("Which command lists everything installed?", ["apt list --installed", "apt show all", "ls /packages"], "apt list --installed", "Pipe it through grep to check one package quickly."),
    typed("Write the two commands (on separate lines) to refresh the index then install git on Ubuntu.", "", "sudo apt update\nsudo apt install git", ["sudo apt update", "sudo apt install git"], "Update the index, then install — the canonical pair.")
  ]),
  ...attach("linux1-services", [
    mcq("What is a service (daemon)?", ["A long-running background program like a web server or database", "A scheduled backup", "A user group"], "A long-running background program like a web server or database", "Services run without a logged-in user, managed by systemd."),
    mcq("Which command checks whether nginx is running?", ["systemctl status nginx", "nginx --running", "ps nginx status"], "systemctl status nginx", "status shows active/failed, recent log lines, and the PID."),
    fill("Restart the service after a config change.", "sudo systemctl __1__ nginx", [{ label: "__1__", answers: ["restart"] }], "restart = stop + start; reload applies config without dropping connections where supported."),
    mcq("What does systemctl enable nginx do?", ["Makes nginx start automatically at boot", "Starts nginx right now", "Upgrades nginx"], "Makes nginx start automatically at boot", "enable wires the boot link; it does NOT start the service now."),
    tf("systemctl enable also starts the service immediately.", false, "enable is boot-time only; use start for now (or enable --now for both)."),
    mcq("The site is down. systemctl status nginx says 'failed'. What next?", ["Read its logs: journalctl -u nginx -n 50", "Reboot the machine", "Reinstall Linux"], "Read its logs: journalctl -u nginx -n 50", "The failure reason is almost always in the service's journal."),
    fill("Stop the service.", "sudo systemctl __1__ postgresql", [{ label: "__1__", answers: ["stop"] }], "stop halts it until started again."),
    mcq("Which manager runs services on most modern distros?", ["systemd", "taskmgr", "cron"], "systemd", "systemctl is systemd's control command."),
    mcq("What does sudo systemctl enable --now nginx do?", ["Enables at boot AND starts immediately", "Only enables", "Only starts"], "Enables at boot AND starts immediately", "--now combines enable and start in one step."),
    typed("Write the command that shows the status of the docker service.", "", "systemctl status docker", ["systemctl status docker"], "status is the first command of every service investigation.")
  ]),
  ...attach("linux1-networking", [
    mcq("What does ssh aya@server.com do?", ["Opens a secure remote shell on server.com as user aya", "Copies files to the server", "Pings the server"], "Opens a secure remote shell on server.com as user aya", "SSH is how you administer remote Linux machines."),
    mcq("Which command tests whether a host is reachable?", ["ping example.com", "test example.com", "reach example.com"], "ping example.com", "ping sends echo requests; -c 3 limits the count."),
    fill("Fetch the API from the command line.", "__1__ https://api.github.com", [{ label: "__1__", answers: ["curl"] }], "curl fetches URLs — ideal for testing endpoints from a server."),
    mcq("Which command copies a local file to a remote server?", ["scp app.tar aya@server:/tmp/", "cp app.tar server:", "ssh -copy app.tar"], "scp app.tar aya@server:/tmp/", "scp = secure copy over SSH."),
    mcq("Which command shows the machine's IP addresses?", ["ip addr", "address", "netinfo"], "ip addr", "ip addr (or hostname -I) lists interfaces and IPs."),
    tf("Ports below 1024 (like 80 and 443) require root privileges to bind.", true, "That is why web servers start via sudo/systemd or use a proxy."),
    mcq("What is port 22 conventionally used for?", ["SSH", "HTTP", "DNS"], "SSH", "80 = HTTP, 443 = HTTPS, 22 = SSH — worth memorizing."),
    mcq("curl http://localhost:3000 from the server answers, but the browser cannot reach the site. What does that suggest?", ["The app runs fine; a firewall or proxy layer is blocking outside traffic", "The app is down", "curl is lying"], "The app runs fine; a firewall or proxy layer is blocking outside traffic", "Testing from inside isolates the app from the network path."),
    fill("Limit ping to three attempts.", "ping -__1__ 3 example.com", [{ label: "__1__", answers: ["c"] }], "-c sets the count; otherwise ping runs until Ctrl+C."),
    mcq("What does ss -tlnp show?", ["Listening TCP ports and the processes bound to them", "Disk usage", "SSH sessions only"], "Listening TCP ports and the processes bound to them", "The go-to for 'what is running on which port?'.")
  ]),
  ...attach("linux1-environment", [
    mcq("What are environment variables?", ["Named values, like $HOME and $PATH, that configure programs per session", "Files in /env", "Compiler settings"], "Named values, like $HOME and $PATH, that configure programs per session", "Programs read them for paths, keys, and modes."),
    mcq("Which command lists your environment?", ["printenv", "lsenv", "vars"], "printenv", "printenv (or env) dumps every variable."),
    fill("Set a variable for this session.", "__1__ API_URL=\"https://api.example.com\"", [{ label: "__1__", answers: ["export"] }], "export makes the variable visible to child processes too."),
    mcq("What is $PATH?", ["The colon-separated list of directories searched for commands", "Your current directory", "The root path"], "The colon-separated list of directories searched for commands", "When you type git, the shell walks $PATH to find it."),
    mcq("You installed a tool but get command not found. Likely cause?", ["Its directory is not on $PATH (or the shell needs a restart/rehash)", "The tool is broken", "Linux needs a reboot"], "Its directory is not on $PATH (or the shell needs a restart/rehash)", "Check where it installed and add that directory to PATH."),
    tf("export VAR=value persists after you close the terminal.", false, "Exports last for the session; persistence requires ~/.bashrc or ~/.zshrc."),
    mcq("Where do you put a permanent PATH addition?", ["~/.bashrc (or ~/.zshrc), then source it", "/etc/passwd", "/tmp/env"], "~/.bashrc (or ~/.zshrc), then source it", "Shell startup files run on every new terminal."),
    fill("Apply your edited shell config without reopening the terminal.", "__1__ ~/.bashrc", [{ label: "__1__", answers: ["source"] }], "source re-runs the file in the current shell."),
    mcq("Why do apps read secrets like API keys from environment variables?", ["Keys stay out of source code and can differ per machine", "Variables are encrypted", "Files cannot hold strings"], "Keys stay out of source code and can differ per machine", "The 12-factor convention: config in the environment."),
    typed("Append a line of shell config: export EDITOR=\"nano\".", "", "export EDITOR=\"nano\"", ["export EDITOR=", "nano"], "export NAME=value — quoted values survive spaces.")
  ]),
  ...attach("linux1-logs", [
    mcq("Where do classic system logs live?", ["/var/log", "/etc/logs", "/home/logs"], "/var/log", "syslog, auth.log, kern.log, and app logs collect there."),
    mcq("Which command reads a systemd service's logs?", ["journalctl -u nginx", "cat nginx.logs", "systemctl logs nginx"], "journalctl -u nginx", "-u filters the journal to one unit (service)."),
    fill("Watch the system log live.", "tail -__1__ /var/log/syslog", [{ label: "__1__", answers: ["f"] }], "tail -f streams new lines as they arrive."),
    mcq("Which command shows free disk space per filesystem?", ["df -h", "du -all", "disk"], "df -h", "-h prints human-readable sizes (G, M)."),
    mcq("Which command shows how big the /var/log directory is?", ["du -sh /var/log", "df /var/log", "size /var/log"], "du -sh /var/log", "du measures directories; df measures filesystems."),
    mcq("Which command shows memory usage?", ["free -h", "mem", "ram -h"], "free -h", "free -h shows total, used, and available memory."),
    mcq("The disk is full. Which pair finds the space hog?", ["df -h to confirm, then du -sh /* (and deeper) to locate it", "free -h then kill -9", "ping then curl"], "df -h to confirm, then du -sh /* (and deeper) to locate it", "Narrow from filesystem to directory layer by layer — it is often /var/log."),
    fill("Show only today's nginx logs.", "journalctl -u nginx --__1__ today", [{ label: "__1__", answers: ["since"] }], "--since today (or '1 hour ago') trims the journal to the relevant window."),
    tf("A sensible troubleshooting order is: service status → logs → disk/memory.", true, "systemctl status, journalctl, df/free — that loop solves most server mysteries."),
    mcq("Repeated 'Failed password' lines in auth.log mean what?", ["Failed login attempts — possibly a brute-force attempt worth blocking", "The disk is failing", "A package needs updating"], "Failed login attempts — possibly a brute-force attempt worth blocking", "auth.log records authentication events — fail2ban automates the response.")
  ])
];
