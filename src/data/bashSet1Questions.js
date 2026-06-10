const code = (...lines) => lines.join("\n");
const setId = "bash-set1";

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

export const bashSet1Modules = [
  { id: "bash1-terminal-shell", setId, title: "The Terminal and the Shell" },
  { id: "bash1-navigation", setId, title: "Navigating the Filesystem" },
  { id: "bash1-files-folders", setId, title: "Creating and Managing Files" },
  { id: "bash1-viewing", setId, title: "Viewing File Contents" },
  { id: "bash1-pipes-redirection", setId, title: "Pipes and Redirection" },
  { id: "bash1-searching", setId, title: "Searching with grep and find" },
  { id: "bash1-variables-quoting", setId, title: "Variables and Quoting" },
  { id: "bash1-scripts", setId, title: "Scripts and the Shebang" },
  { id: "bash1-conditionals-loops", setId, title: "Conditionals and Loops" },
  { id: "bash1-permissions-processes", setId, title: "Permissions and Processes" }
];

export const bashSet1Lessons = {
  "bash1-terminal-shell": {
    summary:
      "The terminal is a window for typing commands; the shell (Bash, or zsh on modern Macs) is the program inside it that reads what you type and runs it. A command has a name, options (flags like -l that change behavior), and arguments (what to act on): ls -l /home. Commands and filenames are case-sensitive.",
    points: [
      "Terminal = the window; shell = the command interpreter inside it.",
      "Anatomy: command -flags arguments (ls -l /home).",
      "Bash is case-sensitive: ls works, LS does not."
    ],
    example: code(
      "# command  flag  argument",
      "ls        -l    /home",
      "echo \"Hello from the shell\""
    )
  },
  "bash1-navigation": {
    summary:
      "You are always 'in' a directory — the working directory. pwd prints where you are, ls lists what is here, cd moves you. Paths starting with / are absolute (from the root); anything else is relative to where you stand. Special names: .. is the parent directory, . is here, ~ is your home.",
    points: [
      "pwd — where am I; ls — what is here; cd path — go there.",
      "cd .. goes up one level; cd ~ (or just cd) goes home.",
      "/home/aya is absolute; projects/app is relative."
    ],
    example: code(
      "pwd",
      "ls -l",
      "cd projects",
      "cd ..",
      "cd ~"
    )
  },
  "bash1-files-folders": {
    summary:
      "mkdir creates directories, touch creates empty files (or updates timestamps), cp copies, mv both moves AND renames, rm deletes. rm is permanent — there is no trash can in the terminal. Copying or deleting a directory needs the recursive flag: cp -r, rm -r.",
    points: [
      "mkdir reports; touch notes.txt; mv old.txt new.txt renames.",
      "cp -r and rm -r for directories.",
      "rm is forever. Read the command twice before Enter."
    ],
    example: code(
      "mkdir reports",
      "touch reports/notes.txt",
      "cp reports/notes.txt backup.txt",
      "mv backup.txt reports/backup.txt",
      "rm reports/backup.txt"
    )
  },
  "bash1-viewing": {
    summary:
      "cat prints a whole file to the screen; head and tail show the first or last lines (-n picks how many); less opens a scrollable viewer you quit with q. tail -f follows a file live as it grows — the classic way to watch logs.",
    points: [
      "cat file.txt — all of it; head -n 5 / tail -n 5 — the edges.",
      "less file.txt — scroll big files; press q to quit.",
      "tail -f app.log — watch a log in real time."
    ],
    example: code(
      "cat config.txt",
      "head -n 5 app.log",
      "tail -n 20 app.log",
      "tail -f app.log   # Ctrl+C to stop"
    )
  },
  "bash1-pipes-redirection": {
    summary:
      "The pipe | sends one command's output into the next command's input: cat log.txt | grep ERROR. Redirection sends output to files instead: > writes (OVERWRITING the file), >> appends. These two characters are the difference between keeping and destroying yesterday's log.",
    points: [
      "cmd1 | cmd2 — chain commands into pipelines.",
      "> overwrites the target file; >> appends to it.",
      "wc -l counts lines — a classic pipeline ending."
    ],
    example: code(
      "cat app.log | grep ERROR | wc -l",
      "echo \"first\" > notes.txt    # overwrite",
      "echo \"second\" >> notes.txt  # append"
    )
  },
  "bash1-searching": {
    summary:
      "grep searches INSIDE files for matching text: grep -i error app.log (-i ignores case, -r searches folders recursively, -n shows line numbers). find searches for files BY NAME or property: find . -name \"*.log\". Remember: grep looks at contents, find looks at the filesystem.",
    points: [
      "grep \"error\" app.log — lines containing error.",
      "grep -ri \"todo\" src/ — recursive, case-insensitive.",
      "find . -name \"*.txt\" — files matching a pattern, from here down."
    ],
    example: code(
      "grep -n \"ERROR\" app.log",
      "grep -ri \"todo\" src/",
      "find . -name \"*.log\""
    )
  },
  "bash1-variables-quoting": {
    summary:
      "Variables assign with NO spaces around the equals sign (name=\"Aya\") and read with a dollar sign ($name). Double quotes keep spaces together while still expanding variables; single quotes are fully literal — \"$name\" becomes Aya, '$name' stays $name. Most quoting bugs are exactly this distinction.",
    points: [
      "name=\"Aya\" — no spaces around =; echo $name reads it.",
      "Double quotes expand variables; single quotes do not.",
      "Quote anything containing spaces: \"my file.txt\"."
    ],
    example: code(
      "name=\"Aya\"",
      "echo \"Hello, $name\"   # Hello, Aya",
      "echo 'Hello, $name'   # Hello, $name"
    )
  },
  "bash1-scripts": {
    summary:
      "A script is a file of commands. The first line — the shebang #!/bin/bash — tells the system which interpreter runs it. Make it executable once with chmod +x script.sh, then run it as ./script.sh. Arguments arrive as $1, $2, ... and $@ means all of them.",
    points: [
      "#!/bin/bash must be line 1.",
      "chmod +x deploy.sh, then ./deploy.sh.",
      "$1 is the first argument; \"$@\" is all arguments."
    ],
    example: code(
      "#!/bin/bash",
      "# save as greet.sh, then: chmod +x greet.sh && ./greet.sh Aya",
      "echo \"Hello, $1!\""
    )
  },
  "bash1-conditionals-loops": {
    summary:
      "if tests conditions written inside [ ] with mandatory spaces: if [ \"$name\" = \"Aya\" ]; then ... fi. File tests are everywhere: -f checks a file exists, -d a directory. for loops iterate lists or globs: for f in *.txt; do echo $f; done. Every if ends with fi, every loop with done.",
    points: [
      "if [ -f config.txt ]; then ... fi — spaces inside [ ] required.",
      "-f file exists; -d directory exists; = compares strings.",
      "for f in *.log; do echo \"$f\"; done."
    ],
    example: code(
      "#!/bin/bash",
      "if [ -f config.txt ]; then",
      "  echo \"config found\"",
      "else",
      "  echo \"missing config\"",
      "fi",
      "",
      "for f in *.txt; do",
      "  echo \"file: $f\"",
      "done"
    )
  },
  "bash1-permissions-processes": {
    summary:
      "Every file has read/write/execute permissions for its owner, group, and others — ls -l shows them as rwxr-xr--. chmod changes permissions (chmod +x adds execute). ps and top list running processes; kill PID asks one to stop. sudo runs a single command as the administrator — with full power to break things, so use it deliberately.",
    points: [
      "rwx r-x r-- = owner / group / others permissions.",
      "chmod +x script.sh makes it runnable.",
      "ps aux lists processes; kill PID stops one; sudo elevates ONE command."
    ],
    example: code(
      "ls -l script.sh",
      "chmod +x script.sh",
      "ps aux | grep node",
      "kill 12345"
    )
  }
};

export const bashSet1Questions = [
  ...attach("bash1-terminal-shell", [
    mcq("What is the difference between the terminal and the shell?", ["The terminal is the window; the shell is the program interpreting your commands", "They are the same program", "The shell is the keyboard driver"], "The terminal is the window; the shell is the program interpreting your commands", "Terminal apps host shells like Bash or zsh."),
    mcq("In ls -l /home, what is -l?", ["A flag (option) changing how ls behaves", "The directory to list", "A typo"], "A flag (option) changing how ls behaves", "-l asks for the long, detailed listing format."),
    mcq("In ls -l /home, what is /home?", ["The argument — what to act on", "A flag", "The command"], "The argument — what to act on", "Arguments name the targets of the command."),
    tf("Bash commands are case-sensitive, so LS is not the same as ls.", true, "Commands, flags, and filenames all care about case."),
    mcq("What does echo \"hi\" do?", ["Prints hi to the screen", "Creates a file named hi", "Searches for hi"], "Prints hi to the screen", "echo writes its arguments to standard output."),
    mcq("Which shell is the default on most Linux systems?", ["Bash", "Photoshop", "Node"], "Bash", "Bash (Bourne Again SHell); modern macOS defaults to the compatible zsh."),
    fill("Complete the command that prints text.", "__1__ \"Hello, world\"", [{ label: "__1__", answers: ["echo"] }], "echo is the print statement of the shell."),
    mcq("How do you combine multiple flags like -l and -a?", ["ls -la (or ls -l -a)", "ls --l.a", "ls -l+a"], "ls -la (or ls -l -a)", "Single-letter flags can be stacked after one dash."),
    tf("Pressing the Up arrow recalls your previous command.", true, "History navigation and Tab completion are the two biggest terminal speed-ups."),
    mcq("Why do developers live in the terminal?", ["Automation, speed, remote servers, and tooling are all command-driven", "It looks impressive", "Browsers cannot open files"], "Automation, speed, remote servers, and tooling are all command-driven", "git, npm, docker, ssh — the whole toolchain speaks shell.")
  ]),
  ...attach("bash1-navigation", [
    mcq("Which command prints your current directory?", ["pwd", "where", "dir?"], "pwd", "pwd = print working directory."),
    mcq("Which command lists the files in the current directory?", ["ls", "list", "show"], "ls", "ls lists; ls -l adds details; ls -a reveals hidden dotfiles."),
    fill("Move into the projects directory.", "__1__ projects", [{ label: "__1__", answers: ["cd"] }], "cd = change directory."),
    mcq("What does cd .. do?", ["Moves up to the parent directory", "Deletes the directory", "Goes to the root"], "Moves up to the parent directory", ".. always names the directory above."),
    mcq("What does cd ~ (or plain cd) do?", ["Goes to your home directory", "Goes to the previous directory", "Lists home"], "Goes to your home directory", "~ expands to /home/you (or /Users/you on macOS)."),
    mcq("Which path is ABSOLUTE?", ["/home/aya/projects", "projects/app", "../sibling"], "/home/aya/projects", "Absolute paths start at the root /; everything else is relative."),
    tf("Relative paths are resolved from your current working directory.", true, "The same relative path means different things from different places."),
    fill("Show hidden files too.", "ls -__1__", [{ label: "__1__", answers: ["a"] }], "-a includes dotfiles like .gitignore and .env."),
    mcq("You are in /home/aya. Where does cd projects/app land you?", ["/home/aya/projects/app", "/projects/app", "/app"], "/home/aya/projects/app", "Relative paths append to the current directory."),
    typed("Write the command that prints your current working directory.", "", "pwd", ["pwd"], "pwd is the orientation command — when lost, run it first.")
  ]),
  ...attach("bash1-files-folders", [
    mcq("Which command creates a directory named reports?", ["mkdir reports", "touch reports/", "newdir reports"], "mkdir reports", "mkdir = make directory."),
    mcq("Which command creates an empty file notes.txt?", ["touch notes.txt", "mkfile notes.txt", "new notes.txt"], "touch notes.txt", "touch creates the file if missing (or updates its timestamp)."),
    fill("Copy the file.", "__1__ notes.txt backup.txt", [{ label: "__1__", answers: ["cp"] }], "cp source destination."),
    mcq("How do you RENAME old.txt to new.txt?", ["mv old.txt new.txt", "rename old.txt new.txt", "cp -rename old.txt"], "mv old.txt new.txt", "mv moves — and moving within a directory IS renaming."),
    mcq("What flag lets cp copy an entire directory?", ["-r (recursive)", "-d", "-all"], "-r (recursive)", "cp -r dir backup_dir copies the directory tree."),
    tf("Files deleted with rm go to a trash can you can restore from.", false, "rm is immediate and permanent — the terminal has no undo."),
    fill("Delete a directory and everything inside it.", "rm -__1__ old_project", [{ label: "__1__", answers: ["r"] }], "-r recurses into the directory; add -i to confirm each file while learning."),
    mcq("What does mkdir -p src/components/buttons do?", ["Creates the whole nested path, parents included", "Fails if src is missing", "Creates three sibling folders"], "Creates the whole nested path, parents included", "-p builds every missing parent along the way."),
    mcq("Which command moves report.txt into the docs directory?", ["mv report.txt docs/", "cp report.txt", "mv docs/ report.txt"], "mv report.txt docs/", "mv source destination — destination can be a directory."),
    typed("Write the command to create an empty file named todo.txt.", "", "touch todo.txt", ["touch todo.txt"], "touch is the standard empty-file creator.")
  ]),
  ...attach("bash1-viewing", [
    mcq("Which command prints an entire file to the screen?", ["cat notes.txt", "open notes.txt", "print notes.txt"], "cat notes.txt", "cat concatenates files to standard output."),
    mcq("Which command shows only the FIRST 10 lines?", ["head app.log", "top app.log", "first app.log"], "head app.log", "head defaults to 10 lines; -n changes the count."),
    fill("Show the last 20 lines.", "tail -__1__ 20 app.log", [{ label: "__1__", answers: ["n"] }], "tail -n 20 shows the file's end."),
    mcq("What does tail -f app.log do?", ["Streams new lines as they are written — live log watching", "Shows the full file", "Deletes old lines"], "Streams new lines as they are written — live log watching", "-f means follow; stop with Ctrl+C."),
    mcq("Why use less instead of cat for huge files?", ["less scrolls page by page without loading a wall of text", "less is faster at printing everything", "cat cannot open large files"], "less scrolls page by page without loading a wall of text", "Navigate with arrows or space, search with /, quit with q."),
    fill("Quit the less viewer.", "Press __1__ to exit less.", [{ label: "__1__", answers: ["q"] }], "q quits; / searches inside less."),
    tf("cat error.log | head -n 5 and head -n 5 error.log produce the same output.", true, "head reads files directly — the pipe version works but is redundant."),
    mcq("Which command counts the lines in a file?", ["wc -l app.log", "count app.log", "lines app.log"], "wc -l app.log", "wc = word count; -l counts lines instead."),
    mcq("What would you run to watch a deploy log in real time?", ["tail -f deploy.log", "cat -live deploy.log", "watchfile deploy.log"], "tail -f deploy.log", "tail -f is the universal live-log command."),
    typed("Write the command that prints the first 5 lines of server.log.", "", "head -n 5 server.log", ["head", "-n 5", "server.log"], "head -n N file shows the first N lines.")
  ]),
  ...attach("bash1-pipes-redirection", [
    mcq("What does the pipe | do?", ["Sends the left command's output into the right command's input", "Runs both commands at once", "Compares two files"], "Sends the left command's output into the right command's input", "Pipelines compose small tools into powerful one-liners."),
    mcq("What does cat app.log | grep ERROR | wc -l compute?", ["How many lines contain ERROR", "The first error", "The file size"], "How many lines contain ERROR", "cat feeds grep, grep filters, wc -l counts the survivors."),
    mcq("What is the difference between > and >>?", ["> overwrites the file; >> appends to it", ">> overwrites; > appends", "They are identical"], "> overwrites the file; >> appends to it", "Using > on a file you meant to append to destroys its contents."),
    fill("Append a line WITHOUT erasing the file.", "echo \"new entry\" __1__ log.txt", [{ label: "__1__", answers: [">>"] }], ">> adds to the end; > would have wiped log.txt first."),
    mcq("What does ls > files.txt do?", ["Writes the directory listing into files.txt instead of the screen", "Lists files.txt", "Sorts the listing"], "Writes the directory listing into files.txt instead of the screen", "> redirects standard output to a file."),
    tf("echo \"reset\" > data.txt erases whatever data.txt contained before.", true, "> truncates the target before writing — the most common redirection accident."),
    fill("Chain the commands.", "cat access.log __1__ grep \"404\"", [{ label: "__1__", answers: ["|"] }], "The pipe hands access.log's contents to grep."),
    mcq("What does sort names.txt | uniq do?", ["Outputs the unique lines (uniq needs sorted input)", "Randomizes lines", "Counts characters"], "Outputs the unique lines (uniq needs sorted input)", "uniq only collapses ADJACENT duplicates — hence sort first."),
    mcq("Where do error messages go when you redirect with > but still see them on screen?", ["To stderr, a separate stream from stdout", "Into the file twice", "Nowhere"], "To stderr, a separate stream from stdout", "2> redirects errors; > only captures standard output."),
    typed("Write a pipeline that counts how many lines in app.log contain WARNING (use grep and wc -l).", "", "grep WARNING app.log | wc -l", ["grep WARNING app.log", "| wc -l"], "grep filters the matching lines, wc -l counts them.", ["grep WARNING app.log | wc -l", "cat app.log | grep WARNING | wc -l", "grep -c WARNING app.log"])
  ]),
  ...attach("bash1-searching", [
    mcq("What does grep \"error\" app.log do?", ["Prints the lines of app.log containing error", "Deletes errors from the log", "Opens the log in an editor"], "Prints the lines of app.log containing error", "grep filters lines by a pattern."),
    fill("Search without caring about case.", "grep -__1__ \"error\" app.log", [{ label: "__1__", answers: ["i"] }], "-i matches error, Error, and ERROR alike."),
    mcq("What does grep -r \"TODO\" src/ do?", ["Searches every file under src/ recursively", "Renames TODO items", "Searches only src/TODO"], "Searches every file under src/ recursively", "-r descends into directories — the codebase-wide search."),
    fill("Show line numbers with matches.", "grep -__1__ \"function\" app.js", [{ label: "__1__", answers: ["n"] }], "-n prefixes each match with its line number."),
    mcq("What is find for, in contrast to grep?", ["find locates FILES by name/properties; grep searches INSIDE file contents", "find is a faster grep", "grep finds folders"], "find locates FILES by name/properties; grep searches INSIDE file contents", "Filesystem search vs content search."),
    mcq("Which command finds every .log file from the current directory down?", ["find . -name \"*.log\"", "grep *.log", "ls -find .log"], "find . -name \"*.log\"", "find start_dir -name pattern; quote the pattern so the shell does not expand it early."),
    tf("In find . -name \"*.txt\", the dot means 'start searching from the current directory'.", true, "You can start anywhere: find /var/log -name \"*.gz\"."),
    mcq("What does grep -v \"DEBUG\" app.log show?", ["Every line that does NOT contain DEBUG", "Only DEBUG lines", "A version number"], "Every line that does NOT contain DEBUG", "-v inverts the match — great for filtering noise out."),
    mcq("Which command counts matches instead of printing them?", ["grep -c \"404\" access.log", "grep -count", "wc grep 404"], "grep -c \"404\" access.log", "-c outputs just the number of matching lines."),
    typed("Write the command that recursively, case-insensitively searches the src directory for the text fixme.", "", "grep -ri \"fixme\" src/", ["grep", "-ri", "src"], "Stack the flags: -r recursive, -i case-insensitive.", ["grep -ri \"fixme\" src/", "grep -ri fixme src/", "grep -ir \"fixme\" src/", "grep -ir fixme src/"])
  ]),
  ...attach("bash1-variables-quoting", [
    mcq("Which line correctly creates a variable?", ["name=\"Aya\"", "name = \"Aya\"", "var name \"Aya\""], "name=\"Aya\"", "No spaces around = — name = \"Aya\" tries to run a command called name."),
    mcq("How do you read the variable name?", ["$name", "name$", "%name%"], "$name", "The dollar sign expands a variable's value."),
    fill("Print a greeting using the variable.", "name=\"Aya\"\necho \"Hello, __1__name\"", [{ label: "__1__", answers: ["$"] }], "$name inside double quotes expands to Aya."),
    mcq("What does echo 'Hello, $name' print (single quotes)?", ["Hello, $name — literally", "Hello, Aya", "An error"], "Hello, $name — literally", "Single quotes suppress ALL expansion."),
    mcq("What does echo \"Hello, $name\" print when name=Aya (double quotes)?", ["Hello, Aya", "Hello, $name", "Hello, "], "Hello, Aya", "Double quotes keep spacing AND expand variables — the everyday default."),
    tf("Writing count = 5 (with spaces) is a valid Bash assignment.", false, "Bash reads that as running a command named count — assignments allow no spaces around =."),
    mcq("Why quote file paths like \"my file.txt\"?", ["Unquoted spaces split it into TWO arguments", "Quotes make it case-insensitive", "Paths require quotes always"], "Unquoted spaces split it into TWO arguments", "rm my file.txt tries to delete my AND file.txt."),
    mcq("What does $HOME contain?", ["The path to your home directory", "Your username", "The shell version"], "The path to your home directory", "Environment variables like $HOME, $PATH, $USER are preset by the system."),
    mcq("What is $PATH?", ["The list of directories the shell searches for commands", "Your current directory", "The file you last opened"], "The list of directories the shell searches for commands", "command not found usually means the program is not on $PATH."),
    typed("Create a variable city holding Cairo, then echo Hello from $city (use double quotes around the echo string).", "", "city=\"Cairo\"\necho \"Hello from $city\"", ["city=", "echo \"Hello from $city\""], "Assignment without spaces, expansion inside double quotes.", ["city=\"Cairo\"\necho \"Hello from $city\"", "city='Cairo'\necho \"Hello from $city\"", "city=Cairo\necho \"Hello from $city\""])
  ]),
  ...attach("bash1-scripts", [
    mcq("What is the shebang?", ["The #!/bin/bash first line that names the script's interpreter", "A comment style", "A special variable"], "The #!/bin/bash first line that names the script's interpreter", "Without it, the system guesses how to run the file."),
    fill("Complete the shebang.", "#!/bin/__1__\necho \"deploying...\"", [{ label: "__1__", answers: ["bash"] }], "#!/bin/bash requests Bash specifically."),
    mcq("Why does ./script.sh say Permission denied on a new script?", ["The file lacks execute permission — fix with chmod +x script.sh", "The script has a syntax error", "Scripts cannot run from the current directory"], "The file lacks execute permission — fix with chmod +x script.sh", "New files are not executable by default."),
    fill("Make the script executable.", "chmod __1__ deploy.sh", [{ label: "__1__", answers: ["+x"] }], "+x adds the execute bit."),
    mcq("Why run a script as ./script.sh instead of script.sh?", ["The current directory is not on $PATH, so you give the explicit path", "The dot makes it run faster", "It is just style"], "The current directory is not on $PATH, so you give the explicit path", "./ says 'the one right here'."),
    mcq("Inside a script, what is $1?", ["The first command-line argument", "The script's name", "The exit code"], "The first command-line argument", "./greet.sh Aya makes $1 equal Aya; $0 is the script name."),
    tf("$@ refers to all the arguments passed to the script.", true, "Loop over them: for arg in \"$@\"; do ... done."),
    mcq("What does this script print when run as ./greet.sh World?", ["Hello, World!", "Hello, $1!", "Hello, greet.sh!"], "Hello, World!", "$1 expands to the first argument.", code("#!/bin/bash", "echo \"Hello, $1!\"")),
    mcq("What does an exit code of 0 mean?", ["Success", "Failure", "Zero results"], "Success", "Non-zero codes signal errors; $? holds the last command's code."),
    typed("Write a two-line script: the bash shebang, then a line echoing Backup complete.", "", "#!/bin/bash\necho \"Backup complete\"", ["#!/bin/bash", "echo \"Backup complete\""], "Shebang first, commands after — that is a complete script.")
  ]),
  ...attach("bash1-conditionals-loops", [
    mcq("Which if syntax is correct in Bash?", ["if [ -f config.txt ]; then echo found; fi", "if (-f config.txt) { echo found }", "if -f config.txt: echo found"], "if [ -f config.txt ]; then echo found; fi", "Brackets with spaces inside, then/fi to open and close."),
    mcq("What does the -f test check?", ["That a file exists (and is a regular file)", "That a file is formatted", "That a folder exists"], "That a file exists (and is a regular file)", "-d is the directory version."),
    fill("Close the if block.", "if [ -d backups ]; then\n  echo \"ready\"\n__1__", [{ label: "__1__", answers: ["fi"] }], "Bash closes if with fi (if reversed)."),
    tf("The spaces inside [ ] are required: [ -f file ] works, [-f file] does not.", true, "[ is actually a command, so it needs its arguments separated."),
    mcq("How do you compare strings in a condition?", ["[ \"$name\" = \"Aya\" ]", "[ $name == Aya! ]", "[ name equals Aya ]"], "[ \"$name\" = \"Aya\" ]", "Quote the variable and use = inside single brackets."),
    mcq("What does this loop print?", ["one two three, each on its own line", "one two three on one line", "Nothing"], "one two three, each on its own line", "for iterates the list; do/done wrap the body.", code("for word in one two three; do", "  echo \"$word\"", "done")),
    fill("Close the loop.", "for f in *.txt; do\n  echo \"$f\"\n__1__", [{ label: "__1__", answers: ["done"] }], "Loops end with done."),
    mcq("What does for f in *.log iterate over?", ["Every .log file in the current directory", "The literal string *.log", "All files on the system"], "Every .log file in the current directory", "The shell expands the glob before the loop runs."),
    mcq("What does else add to an if?", ["A branch that runs when the condition fails", "A second condition", "A loop"], "A branch that runs when the condition fails", "if/then/else/fi — elif chains more conditions."),
    typed("Write an if statement that echoes exists when the file data.csv exists (use -f, then/fi).", "", "if [ -f data.csv ]; then\n  echo \"exists\"\nfi", ["if [ -f data.csv ]", "then", "echo \"exists\"", "fi"], "The -f test plus then/fi is the canonical existence check.")
  ]),
  ...attach("bash1-permissions-processes", [
    mcq("In ls -l output rwxr-xr--, what can the OWNER do?", ["Read, write, and execute", "Read only", "Execute only"], "Read, write, and execute", "The first rwx triple belongs to the owner; then group r-x; then others r--."),
    mcq("In rwxr-xr--, what can OTHERS (the last triple) do?", ["Read only", "Read and execute", "Everything"], "Read only", "r-- grants read, denies write and execute."),
    fill("Add execute permission.", "chmod __1__ run.sh", [{ label: "__1__", answers: ["+x"] }], "chmod +x is the most common permission change you will make."),
    mcq("What does chmod 755 file set?", ["Owner rwx, group r-x, others r-x", "Everyone rwx", "Owner read-only"], "Owner rwx, group r-x, others r-x", "7=rwx, 5=r-x — the numeric octal notation."),
    mcq("Which command lists running processes?", ["ps aux", "proc", "running"], "ps aux", "ps aux shows every process with its PID, CPU, and memory."),
    mcq("How do you stop the process with PID 12345?", ["kill 12345", "stop 12345", "rm 12345"], "kill 12345", "kill sends a terminate signal; kill -9 force-kills as the last resort."),
    fill("Find the node processes.", "ps aux | __1__ node", [{ label: "__1__", answers: ["grep"] }], "Piping ps into grep filters the process list."),
    mcq("What does sudo do?", ["Runs ONE command with administrator privileges", "Switches the shell theme", "Speeds up a command"], "Runs ONE command with administrator privileges", "sudo = superuser do; with great power comes broken systems — use it deliberately."),
    tf("You need sudo to edit system files like /etc/hosts.", true, "System paths are owned by root; regular users cannot write them."),
    mcq("A script you wrote shows -rw-r--r-- and fails with Permission denied. What is the fix?", ["chmod +x script.sh — it has no execute bit", "sudo delete it", "Rename it to .bash"], "chmod +x script.sh — it has no execute bit", "rw- means read/write but NOT execute — the exact symptom of a missing +x.")
  ])
];
