const code = (...lines) => lines.join("\n");
const setId = "python-set1";

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

export const pythonSet1Modules = [
  { id: "py1-intro-interpreter", setId, title: "Python Intro and Interpreter" },
  { id: "py1-files-terminal", setId, title: "Python Files and Terminal Workflow" },
  { id: "py1-syntax-indentation", setId, title: "Syntax, Lines, and Indentation" },
  { id: "py1-expressions-statements", setId, title: "Expressions and Statements" },
  { id: "py1-print-basics", setId, title: "Print Text, Numbers, and Variables" },
  { id: "py1-print-combine", setId, title: "Print Arguments and Concatenation" },
  { id: "py1-input-basics", setId, title: "Input Basics" },
  { id: "py1-comments", setId, title: "Comments and Multiline Strings" },
  { id: "py1-variables-assignment", setId, title: "Variables and Assignment" },
  { id: "py1-variable-names", setId, title: "Variable Names" },
  { id: "py1-multiple-values", setId, title: "Multiple Values and Unpacking" },
  { id: "py1-data-types", setId, title: "Data Types and type()" },
  { id: "py1-numbers", setId, title: "Numbers" },
  { id: "py1-casting", setId, title: "Casting and Conversion" },
  { id: "py1-strings-basics", setId, title: "String Basics" },
  { id: "py1-fstrings", setId, title: "f-Strings and String Output" },
  { id: "py1-booleans-comparisons", setId, title: "Booleans and Comparisons" },
  { id: "py1-operators-precedence", setId, title: "Operators and Precedence" },
  { id: "py1-scope-global", setId, title: "Scope and Global Variables" },
  { id: "py1-errors-mini", setId, title: "Beginner Errors and Mini Programs" }
];

export const pythonSet1Questions = [
  ...attach("py1-intro-interpreter", [
    mcq("What is Python commonly used for?", ["Web apps, automation, data work, scripting, and many other tasks", "Only drawing browser buttons", "Only styling HTML pages"], "Web apps, automation, data work, scripting, and many other tasks", "Python is a general-purpose programming language used in many areas."),
    mcq("What is the usual file extension for Python source files?", [".pp", ".pt", ".py"], ".py", "Python files commonly end with .py."),
    tf("Python code is usually read and executed by a Python interpreter.", true, "The interpreter runs Python code instead of the browser reading it directly as HTML."),
    mcq("Which filename looks like a Python script?", ["hello.py", "hello.css", "hello.react"], "hello.py", "The .py extension marks a Python file."),
    fill("Complete the Python file name.", "main__1__", [{ label: "__1__", answers: [".py"] }], "A beginner Python script could be named main.py."),
    tf("Python is useful only if you are building React applications.", false, "Python is independent from React and is used for scripting, backend work, data, automation, and more."),
    mcq("What does it mean that Python runs code line by line?", ["The interpreter reads statements in order", "Python ignores every new line", "Only the last line can run"], "The interpreter reads statements in order", "Beginners should learn that order matters."),
    mcq("Which tool actually runs a .py file?", ["The Python interpreter", "A CSS compiler", "A PNG viewer"], "The Python interpreter", "Python code needs Python to execute it."),
    fill("Complete the sentence: Python source files usually end with __1__.", "__1__", [{ label: "__1__", answers: [".py"] }], "This reinforces the file extension."),
    typed("Write a Python file name for a beginner script named hello.", "", "hello.py", ["hello", ".py"], "The expected extension for a Python file is .py.")
  ]),
  ...attach("py1-files-terminal", [
    mcq("Which command can check whether Python is installed and show its version?", ["python --version", "python ##version", "python version"], "python --version", "--version is a command-line flag."),
    mcq("On some systems, which command is also commonly used to check the Python version?", ["python3 --version", "pythons version", "python check version"], "python3 --version", "Many systems use python3 to refer to Python 3."),
    fill("Complete the version command.", "python __1__", [{ label: "__1__", answers: ["--version"] }], "The --version flag asks for the installed version."),
    fill("Complete the alternate version command.", "python3 __1__", [{ label: "__1__", answers: ["--version"] }], "python3 --version is common on macOS/Linux."),
    mcq("How do you run a file named app.py from the terminal?", ["python app.py", "python run app", "app.py python"], "python app.py", "The interpreter command comes before the file name."),
    fill("Complete the command to run hello.py.", "python __1__", [{ label: "__1__", answers: ["hello.py"] }], "python hello.py runs the file with Python."),
    fill("Complete the alternate command to run hello.py.", "python3 __1__", [{ label: "__1__", answers: ["hello.py"] }], "python3 hello.py is the common Python 3 form."),
    mcq("What is the Python interactive shell useful for?", ["Trying small Python statements quickly", "Editing image files only", "Installing CSS packages"], "Trying small Python statements quickly", "The shell is a quick place to experiment."),
    mcq("What command exits the Python command line interface?", ["exit()", "stop()", "end()"], "exit()", "exit() leaves the interactive Python shell."),
    tf("A .py script file and the Python interactive shell are exactly the same workflow.", false, "The shell is interactive; a .py file is saved and run as a script.")
  ]),
  ...attach("py1-syntax-indentation", [
    tf("Indentation in Python is for readability only.", false, "Indentation defines blocks in Python, so it is required syntax."),
    mcq("What character usually comes after an if condition before an indented block?", [":", ";", "{}"], ":", "Python uses a colon before the indented block."),
    fill("Complete the if statement header.", "if 5 > 2__1__", [{ label: "__1__", answers: [":"] }], "An if header ends with a colon."),
    fill("Complete the indented print statement.", "if 5 > 2:\n    __1__(\"YES\")", [{ label: "__1__", answers: ["print"] }], "The print line must be indented under the if block."),
    mcq("Which code has correct indentation?", [code("if 5 > 2:", "    print(\"YES\")"), code("if 5 > 2:", "print(\"YES\")"), code("if 5 > 2", "    print(\"YES\")")], code("if 5 > 2:", "    print(\"YES\")"), "The block line is indented and the if header has a colon."),
    tf("Python uses braces like { } to define normal if blocks.", false, "Python uses indentation for normal blocks."),
    mcq("What kind of error can happen when a required block is not indented?", ["IndentationError", "PaintError", "ReactError"], "IndentationError", "Indentation mistakes can produce IndentationError."),
    fill("Complete the block.", "if True:\n    __1__(\"Ready\")", [{ label: "__1__", answers: ["print"] }], "The indented block runs when the condition is true."),
    mcq("Why must indentation be consistent?", ["Python uses it to know which lines belong to the same block", "Python ignores spaces completely", "Only comments need indentation"], "Python uses it to know which lines belong to the same block", "A block is defined by aligned indentation."),
    typed("Write a two-line if block that prints YES when 5 is greater than 2.", "", code("if 5 > 2:", "    print(\"YES\")"), ["if 5 > 2:", "print", "YES"], "This combines comparison, colon, indentation, and output.")
  ]),
  ...attach("py1-expressions-statements", [
    mcq("What is an expression?", ["Code that produces a value", "Only a file name", "A line that must start with #"], "Code that produces a value", "For example, 5 + 3 produces the value 8."),
    mcq("Which is an expression?", ["5 + 3", "x =", "def"], "5 + 3", "5 + 3 produces a value."),
    fill("Complete the assignment using an expression.", "x = 5 __1__ 3", [{ label: "__1__", answers: ["+"] }], "The expression 5 + 3 is assigned to x."),
    mcq("What does this code store in x?", ["8", "5 + 3 as text", "Nothing"], "8", "The expression is evaluated first.", "x = 5 + 3"),
    tf("print(x) is a statement that asks Python to output the value of x.", true, "A statement performs an action."),
    mcq("Which line assigns the result of an expression to a variable?", ["total = 10 + 5", "10 +", "print ="], "total = 10 + 5", "The expression 10 + 5 produces 15, then assignment stores it."),
    fill("Complete the print statement.", "__1__(5 + 3)", [{ label: "__1__", answers: ["print"] }], "print can output the result of an expression."),
    tf("Python always needs a semicolon at the end of every statement.", false, "Python usually uses new lines to separate statements."),
    mcq("What happens first in x = 2 * 4?", ["2 * 4 is evaluated", "x is printed", "The file extension changes"], "2 * 4 is evaluated", "The expression produces 8, then x stores it."),
    typed("Create x from the expression 5 + 3, then print x.", "", code("x = 5 + 3", "print(x)"), ["x = 5 + 3", "print(x)"], "This practices expression, assignment, and output.")
  ]),
  ...attach("py1-print-basics", [
    fill("Insert the missing function to output Hello World.", "__1__(\"Hello World\")", [{ label: "__1__", answers: ["print"] }], "print() outputs text."),
    mcq("Which line prints the text Hello?", ["print(\"Hello\")", "echo(\"Hello\")", "show \"Hello\""], "print(\"Hello\")", "Python uses print(), not echo."),
    fill("Print the number 42.", "__1__(42)", [{ label: "__1__", answers: ["print"] }], "Numbers can be printed without quotes."),
    tf("print(\"42\") and print(42) both display 42, but the first value is text and the second is a number.", true, "The output may look similar, but the data types differ."),
    fill("Print the value stored in x.", "x = \"Python\"\n__1__(x)", [{ label: "__1__", answers: ["print"] }], "Do not put x in quotes if you want the variable value."),
    mcq("What does print(\"x\") output?", ["x", "The value of variable x", "Nothing"], "x", "Quoted text is printed literally."),
    mcq("What does print(x) output if x = \"Hi\"?", ["Hi", "x", "\"x\""], "Hi", "Without quotes, Python reads the variable x."),
    fill("Complete the program.", "message = \"Ready\"\nprint(__1__)", [{ label: "__1__", answers: ["message"] }], "The variable name goes inside print()."),
    tf("print() can be used for quick debugging while learning.", true, "Beginners often print values to see what code is doing."),
    typed("Create a variable named city with the value Cairo, then print it.", "", code("city = \"Cairo\"", "print(city)"), ["city", "Cairo", "print(city)"], "This combines assignment and printing a variable.")
  ]),
  ...attach("py1-print-combine", [
    mcq("What is printed by this code?", ["Hello World", "Hello, World", "HelloWorld"], "Hello World", "print() inserts a space between multiple arguments by default.", "print(\"Hello\", \"World\")"),
    mcq("What is printed by this code?", ["HelloWorld", "Hello World", "a+b"], "HelloWorld", "+ concatenates strings without adding a space.", code("a = \"Hello\"", "b = \"World\"", "print(a + b)")),
    mcq("What is printed by this code?", ["9", "45", "4 + 5"], "9", "+ adds numbers when both operands are numbers.", code("a = 4", "b = 5", "print(a + b)")),
    fill("Complete the code to print Python is fun using comma-separated arguments.", "print(\"Python\", \"is\", \"__1__\")", [{ label: "__1__", answers: ["fun"] }], "print separates arguments with spaces."),
    fill("Complete the concatenation so the result is Hello World.", "print(\"Hello \" + \"__1__\")", [{ label: "__1__", answers: ["World"] }], "Concatenation does not add spaces automatically."),
    mcq("Which code prints Python is awesome if x = \"awesome\"?", ["print(\"Python is \" + x)", "print(\"Python is\" + x)", "print(Python is + x)"], "print(\"Python is \" + x)", "The first string includes the needed space."),
    tf("The comma in print(\"Hello\", \"World\") is printed as a comma by default.", false, "It separates arguments; the default separator is a space."),
    mcq("Which code prints two values with a default space between them?", ["print(\"A\", \"B\")", "print(\"A\" + \"B\")", "print(\"A\" \"B\")"], "print(\"A\", \"B\")", "Separate print arguments use the default separator."),
    fill("Complete the concatenation.", "first = \"Py\"\nsecond = \"thon\"\nprint(first __1__ second)", [{ label: "__1__", answers: ["+"] }], "+ joins strings."),
    typed("Create a variable named language with Python and print Python is Python using concatenation.", "", code("language = \"Python\"", "print(\"Python is \" + language)"), ["language", "Python", "print", "+ language"], "This practices variable output with string concatenation.")
  ]),
  ...attach("py1-input-basics", [
    mcq("What does input() do?", ["Reads text typed by the user", "Prints a value automatically", "Deletes a file"], "Reads text typed by the user", "input() pauses and waits for user text."),
    fill("Complete the prompt for a name.", "name = __1__(\"What is your name? \")", [{ label: "__1__", answers: ["input"] }], "input() can show a prompt."),
    fill("Print a greeting using a comma.", "name = input(\"Name: \")\nprint(\"Hello\", __1__)", [{ label: "__1__", answers: ["name"] }], "print with a comma adds a space before the name."),
    tf("input() always returns a string.", true, "Even if the user types 20, input() returns \"20\" as text."),
    mcq("What is the type of age after age = input(\"Age: \")?", ["str", "int", "float"], "str", "input() returns a string."),
    mcq("Why can this code fail?", ["age is a string, so age + 5 tries to mix text and number", "print is not allowed after input", "5 must be in quotes always"], "age is a string, so age + 5 tries to mix text and number", code("age = input(\"Age: \")", "print(age + 5")),
    fill("Convert input to an integer.", "age = __1__(input(\"Age: \"))", [{ label: "__1__", answers: ["int"] }], "int(input(...)) converts typed text to an integer."),
    fill("Convert input to a decimal number.", "price = __1__(input(\"Price: \"))", [{ label: "__1__", answers: ["float"] }], "float(input(...)) converts typed text to a decimal number."),
    mcq("Which line safely reads a number for math?", ["age = int(input(\"Age: \"))", "age = input(\"Age: \")", "age = print(input(\"Age: \"))"], "age = int(input(\"Age: \"))", "Use int() when you need an integer."),
    typed("Ask for a name and print Hello followed by the name.", "", code("name = input(\"What is your name? \")", "print(\"Hello\", name)"), ["name = input", "What is your name?", "print", "name"], "This is the first user-input program shape.")
  ]),
  ...attach("py1-comments", [
    mcq("Which character starts a Python single-line comment?", ["#", "//", "/*"], "#", "Python single-line comments start with #."),
    fill("Complete the comment.", "__1__This is a comment", [{ label: "__1__", answers: ["#"] }], "# starts a Python comment."),
    tf("Python runs code that appears after # on the same line.", false, "Text after # is treated as a comment."),
    fill("Complete the inline comment.", "x = 5  __1__ store a number", [{ label: "__1__", answers: ["#"] }], "Inline comments can explain a line."),
    mcq("Which line is a Python comment?", ["# print(\"Hi\")", "// print(\"Hi\")", "/* print(\"Hi\") */"], "# print(\"Hi\")", "Python uses #, not // or /* */."),
    tf("Comments can help explain why code exists.", true, "Good comments clarify intent."),
    fill("Use triple quotes to create a multiline string often used like a comment.", "__1__\nThis spans lines\n__2__", [{ label: "__1__", answers: ["\"\"\"", "'''"] }, { label: "__2__", answers: ["\"\"\"", "'''"] }], "Triple quotes create multiline strings; beginners often see them used like multiline comments."),
    tf("Triple quotes are the exact same thing as # comments.", false, "Triple quotes create strings. # creates true comments."),
    mcq("Which comment style belongs to Python?", ["# explain this", "// explain this", "<!-- explain this -->"], "# explain this", "The # marker is Python's comment syntax."),
    typed("Write a comment that says This program prints a name.", "", "# This program prints a name", ["#", "This program prints a name"], "This practices the basic comment syntax.")
  ]),
  ...attach("py1-variables-assignment", [
    mcq("Which line correctly creates a Python variable?", ["x = 5", "var x = 5", "$x = 5"], "x = 5", "Python creates variables by assignment."),
    fill("Create a variable named x and assign 50.", "__1__ = __2__", [{ label: "__1__", answers: ["x"] }, { label: "__2__", answers: ["50"] }], "This is the preferred direct instruction-to-code pattern."),
    fill("Create a variable named carname and assign Volvo.", "__1__ = __2__", [{ label: "__1__", answers: ["carname"] }, { label: "__2__", answers: ["\"Volvo\"", "'Volvo'"] }], "String values need quotes."),
    tf("Python requires let or const before a variable name.", false, "Python does not use let or const for normal variable assignment."),
    mcq("What is the value of x after this code?", ["7", "5", "x"], "7", code("x = 5", "x = 7")),
    fill("Update score from 10 to 15.", "score = 10\nscore = __1__", [{ label: "__1__", answers: ["15"] }], "Reassigning a variable changes its value."),
    mcq("Which line stores text in name?", ["name = \"Ali\"", "name = Ali", "\"name\" = \"Ali\""], "name = \"Ali\"", "Text values need quotes."),
    fill("Create a variable named price with the value 19.99.", "__1__ = __2__", [{ label: "__1__", answers: ["price"] }, { label: "__2__", answers: ["19.99"] }], "Decimal numbers do not need quotes."),
    tf("A variable must be created before you can safely use it.", true, "Using an undefined variable causes a NameError."),
    typed("Create name with Ali, age with 20, then print name.", "", code("name = \"Ali\"", "age = 20", "print(name)"), ["name", "Ali", "age", "20", "print(name)"], "This combines string assignment, number assignment, and output.")
  ]),
  ...attach("py1-variable-names", [
    mcq("Which is NOT a legal Python variable name?", ["my-var = 20", "my_var = 20", "_myvar = 20"], "my-var = 20", "Hyphens are not allowed in variable names."),
    tf("Python variable names are case-sensitive.", true, "name and Name are different variables."),
    mcq("Which two names are different in Python?", ["age and Age", "age and age", "total and total"], "age and Age", "Capitalization matters."),
    mcq("Which variable name is legal?", ["user_name", "user-name", "user name"], "user_name", "Underscores are allowed; hyphens and spaces are not."),
    mcq("Which variable name is illegal?", ["2name", "name2", "_name"], "2name", "Variable names cannot start with a number."),
    fill("Complete a snake_case variable name.", "first__1__name = \"Ali\"", [{ label: "__1__", answers: ["_"] }], "snake_case uses underscores between words."),
    tf("_secret = 5 is a legal Python variable assignment.", true, "Names can start with an underscore."),
    mcq("Which is a good Python style for a multi-word variable?", ["total_price", "total-price", "total price"], "total_price", "snake_case is common Python style."),
    fill("Fix the illegal variable name by using an underscore.", "my__1__var = 20", [{ label: "__1__", answers: ["_"] }], "Use underscores instead of hyphens or spaces."),
    typed("Create a legal variable named user_age and assign 30.", "", "user_age = 30", ["user_age", "=", "30"], "This practices legal names and assignment.")
  ]),
  ...attach("py1-multiple-values", [
    mcq("Which syntax assigns the same value to x, y, and z?", ["x = y = z = \"Hello\"", "x, y, z = \"Hello\"", "x|y|z = \"Hello\""], "x = y = z = \"Hello\"", "Chained assignment gives all three variables the same value."),
    fill("Assign the same value to three variables.", "x __1__ y __1__ z __1__ \"Ready\"", [{ label: "__1__", answers: ["="] }], "x = y = z = \"Ready\" is chained assignment."),
    fill("Assign three values to three variables.", "x__1__ y__1__ z = \"Orange\", \"Banana\", \"Cherry\"", [{ label: "__1__", answers: [","] }], "Commas separate variables when unpacking multiple values."),
    mcq("What value does y receive?", ["Banana", "Orange", "Cherry"], "Banana", "The second variable receives the second value.", "x, y, z = \"Orange\", \"Banana\", \"Cherry\""),
    mcq("What is printed?", ["apple", "banana", "cherry"], "apple", "Unpacking assigns by position: a receives the first item, apple.", code("fruits = [\"apple\", \"banana\", \"cherry\"]", "a, b, c = fruits", "print(a)")),
    mcq("What is printed?", ["cherry", "banana", "apple"], "cherry", "c is the third name, so it receives the third item, cherry.", code("fruits = [\"apple\", \"banana\", \"cherry\"]", "a, b, c = fruits", "print(c)")),
    tf("When unpacking, the number of variables should match the number of values.", true, "A mismatch can cause an unpacking error."),
    mcq("Which line unpacks a tuple into two variables?", ["x, y = (1, 2)", "x = y = (1, 2)", "x | y = (1, 2)"], "x, y = (1, 2)", "Tuple values can be unpacked into variables."),
    fill("Complete the unpacking.", "first, second = [\"A\", \"__1__\"]", [{ label: "__1__", answers: ["B"] }], "The second variable receives \"B\"."),
    typed("Unpack colors so red gets Red, green gets Green, and blue gets Blue.", "", "red, green, blue = \"Red\", \"Green\", \"Blue\"", ["red, green, blue", "Red", "Green", "Blue"], "This is the direct multiple-assignment form.")
  ]),
  ...attach("py1-data-types", [
    fill("Print the data type of myvar.", "__1__(__2__(myvar))", [{ label: "__1__", answers: ["print"] }, { label: "__2__", answers: ["type"] }], "print(type(myvar)) displays a variable's type."),
    mcq("If x = 5, what is x's data type?", ["int", "str", "list"], "int", "Whole numbers are int values."),
    mcq("If x = \"Hello\", what is x's data type?", ["str", "int", "bool"], "str", "Text in quotes is a string."),
    mcq("If x = 3.14, what is x's data type?", ["float", "int", "dict"], "float", "Decimal numbers are floats."),
    mcq("If x = True, what is x's data type?", ["bool", "str", "tuple"], "bool", "True and False are booleans."),
    mcq("If x = [1, 2, 3], what is x's data type?", ["list", "tuple", "set"], "list", "Square brackets create a list."),
    mcq("If x = (1, 2, 3), what is x's data type?", ["tuple", "list", "dict"], "tuple", "Parentheses with comma-separated values create a tuple."),
    mcq("If x = {\"name\": \"Ali\"}, what is x's data type?", ["dict", "set", "list"], "dict", "Key-value pairs in braces create a dictionary."),
    mcq("If x = {1, 2, 3}, what is x's data type?", ["set", "dict", "tuple"], "set", "A set uses braces with values but no key-value pairs."),
    mcq("If x = None, what is x's data type?", ["NoneType", "None", "empty"], "NoneType", "None is a value whose type is NoneType.")
  ]),
  ...attach("py1-numbers", [
    mcq("Which value is an integer?", ["10", "10.5", "\"10\""], "10", "Integers are whole numbers."),
    mcq("Which value is a float?", ["10.5", "10", "\"10.5\""], "10.5", "Floats are decimal numbers."),
    tf("-7 is a valid integer in Python.", true, "Integers can be negative."),
    fill("Complete the numeric assignment.", "temperature = __1__", [{ label: "__1__", answers: ["-5", "20", "0"] }], "A number can be assigned directly without quotes."),
    mcq("What is printed?", ["float", "int", "str"], "float", "The decimal point makes 2.0 a float, so type(x) reports float.", code("x = 2.0", "print(type(x))")),
    mcq("What is printed?", ["int", "float", "str"], "int", "-12 is a whole number with no decimal point, so it is an int.", code("x = -12", "print(type(x))")),
    mcq("Which value uses scientific notation?", ["1e3", "1#3", "1..3"], "1e3", "Scientific notation is a compact way to write large or small numbers."),
    mcq("What is the value of 2 + 3?", ["5", "23", "\"5\""], "5", "With numbers, + performs addition."),
    fill("Complete the decimal number.", "price = 9__1__99", [{ label: "__1__", answers: ["."] }], "A decimal point creates a float."),
    typed("Create x as 5, y as 2.5, then print their types.", "", code("x = 5", "y = 2.5", "print(type(x))", "print(type(y))"), ["x = 5", "y = 2.5", "print(type(x))", "print(type(y))"], "This compares int and float values.")
  ]),
  ...attach("py1-casting", [
    mcq("Which function converts a value to an integer?", ["int()", "integer()", "number()"], "int()", "int() converts compatible values to integers."),
    mcq("Which function converts a value to a float?", ["float()", "decimal()", "number.float()"], "float()", "float() converts compatible values to decimal numbers."),
    mcq("Which function converts a value to a string?", ["str()", "string()", "text()"], "str()", "str() creates a string representation."),
    fill("Convert the string \"5\" to an integer.", "x = __1__(\"5\")", [{ label: "__1__", answers: ["int"] }], "int(\"5\") returns the number 5."),
    fill("Convert the string \"3.5\" to a float.", "x = __1__(\"3.5\")", [{ label: "__1__", answers: ["float"] }], "float(\"3.5\") returns 3.5."),
    fill("Convert the number 20 to a string.", "age = __1__(20)", [{ label: "__1__", answers: ["str"] }], "str(20) returns \"20\"."),
    mcq("Why does \"5\" + 5 fail?", ["It mixes a string and an integer", "Python cannot add anything", "5 is not a number"], "It mixes a string and an integer", "Convert before doing math or before concatenating."),
    mcq("Which code safely adds user age plus 5?", ["age = int(input(\"Age: \"))\nprint(age + 5)", "age = input(\"Age: \")\nprint(age + 5)", "age = str(input(\"Age: \"))\nprint(age + 5)"], "age = int(input(\"Age: \"))\nprint(age + 5)", "input() returns a string, so int() is needed for integer math."),
    fill("Convert input to an integer in one line.", "count = __1__(input(\"Count: \"))", [{ label: "__1__", answers: ["int"] }], "This pattern appears constantly in beginner Python."),
    typed("Read age as an integer, then print age plus 1.", "", code("age = int(input(\"Age: \"))", "print(age + 1)"), ["age", "int(input", "Age:", "print(age + 1)"], "This fixes the common input-as-string trap.")
  ]),
  ...attach("py1-strings-basics", [
    tf("Python strings can use single or double quotes.", true, "Both 'John' and \"John\" are valid strings."),
    fill("Create a string variable using double quotes.", "name = __1__", [{ label: "__1__", answers: ["\"Ali\""] }], "Text values need quotes."),
    fill("Create a string variable using single quotes.", "name = __1__", [{ label: "__1__", answers: ["'Ali'"] }], "Single quotes are valid too."),
    mcq("What function returns the length of a string?", ["len()", "length()", "countLetters()"], "len()", "len() returns the number of characters."),
    fill("Complete the length check.", "name = \"Ali\"\nprint(__1__(name))", [{ label: "__1__", answers: ["len"] }], "len(name) returns 3."),
    mcq("What is printed?", ["P", "y", "Python"], "P", "Indexing starts at 0, so word[0] is the first character, P.", code("word = \"Python\"", "print(word[0])")),
    tf("String indexes start at 0 in Python.", true, "The first character is at index 0."),
    fill("Complete the index to print y from Python.", "word = \"Python\"\nprint(word[__1__])", [{ label: "__1__", answers: ["1"] }], "The second character has index 1."),
    mcq("Which string includes an apostrophe safely?", ["\"It's ok\"", "'It's ok'", "It's ok"], "\"It's ok\"", "Double quotes can contain an apostrophe without escaping."),
    typed("Create word with Python, print its length, then print the first character.", "", code("word = \"Python\"", "print(len(word))", "print(word[0])"), ["word", "Python", "len(word)", "word[0]"], "This combines string assignment, len(), and indexing.")
  ]),
  ...attach("py1-fstrings", [
    mcq("What does the f before a string allow?", ["Putting expressions inside braces", "Turning the string into a file", "Forcing uppercase letters"], "Putting expressions inside braces", "f-strings can insert variables and expressions."),
    fill("Complete the f-string.", "name = \"Ali\"\nprint(__1__\"Hello {name}\")", [{ label: "__1__", answers: ["f"] }], "The f prefix enables {name}."),
    mcq("What is printed?", ["Hello Ali", "Hello {name}", "Hello name"], "Hello Ali", "The f prefix makes the braces expand, inserting the value of name.", code("name = \"Ali\"", "print(f\"Hello {name}\")")),
    fill("Insert age into the f-string.", "age = 20\nprint(f\"I am {__1__}\")", [{ label: "__1__", answers: ["age"] }], "The variable name goes inside braces."),
    mcq("Which code is easiest for mixing text, name, and age?", ["print(f\"My name is {name} and I am {age}\")", "print(\"My name is \" + name + age)", "print(f My name is name)"], "print(f\"My name is {name} and I am {age}\")", "f-strings handle different value types cleanly."),
    tf("f-strings can include numbers without converting them to strings manually.", true, "Python formats values inside braces automatically."),
    fill("Complete the expression inside an f-string.", "print(f\"Next year: {age __1__ 1}\")", [{ label: "__1__", answers: ["+"] }], "f-string braces can contain expressions."),
    mcq("What is printed?", ["Next year: 21", "Next year: age + 1", "Next year: {age + 1}"], "Next year: 21", "f-string braces can hold expressions: age + 1 is evaluated to 21 before printing.", code("age = 20", "print(f\"Next year: {age + 1}\")")),
    fill("Complete the program.", "name = input(\"Name: \")\nprint(f\"Welcome, {__1__}\")", [{ label: "__1__", answers: ["name"] }], "f-strings work well with input values."),
    typed("Create name Ali and age 20, then print My name is Ali and I am 20 using an f-string.", "", code("name = \"Ali\"", "age = 20", "print(f\"My name is {name} and I am {age}\")"), ["name", "Ali", "age", "20", "print(f", "{name}", "{age}"], "This is the modern beginner-friendly way to combine values in output.")
  ]),
  ...attach("py1-booleans-comparisons", [
    mcq("Which boolean value is valid Python?", ["True", "true", "TRUE()"], "True", "Python booleans are capitalized True and False."),
    mcq("Which spelling of the false boolean does Python accept?", ["False", "false", "FALSE"], "False", "False must start with a capital F."),
    mcq("What is the result of 5 > 2?", ["True", "False", "None"], "True", "5 is greater than 2."),
    mcq("What is the result of 5 < 2?", ["False", "True", "5"], "False", "5 is not less than 2."),
    fill("Complete the equality comparison.", "print(5 __1__ 5)", [{ label: "__1__", answers: ["=="] }], "== checks whether values are equal."),
    fill("Complete the not-equal comparison.", "print(5 __1__ 3)", [{ label: "__1__", answers: ["!="] }], "!= checks whether values are different."),
    tf("The assignment operator = and the equality operator == mean the same thing.", false, "= assigns; == compares."),
    mcq("What does bool(0) return?", ["False", "True", "0"], "False", "0 is falsy in Python."),
    mcq("What does bool(\"Hello\") return?", ["True", "False", "str"], "True", "Non-empty strings are truthy."),
    typed("Create is_ready with True and print it.", "", code("is_ready = True", "print(is_ready)"), ["is_ready", "True", "print(is_ready)"], "This practices boolean capitalization and output.")
  ]),
  ...attach("py1-operators-precedence", [
    mcq("What is the result of 2 + 3 * 4?", ["14", "20", "24"], "14", "Multiplication happens before addition."),
    mcq("What is the result of (2 + 3) * 4?", ["20", "14", "9"], "20", "Parentheses change the order."),
    fill("Complete exponentiation.", "result = 2 __1__ 3", [{ label: "__1__", answers: ["**"] }], "** raises a number to a power."),
    fill("Complete floor division.", "result = 7 __1__ 2", [{ label: "__1__", answers: ["//"] }], "// returns floor division."),
    mcq("What is the result of 7 % 2?", ["1", "3.5", "0"], "1", "% returns the remainder."),
    fill("Add 1 to x using an assignment operator.", "x __1__ 1", [{ label: "__1__", answers: ["+="] }], "x += 1 is short for x = x + 1."),
    mcq("Which operator means greater than or equal to?", [">=", "=>", ">>"], ">=", ">= compares whether the left side is at least the right side."),
    mcq("Which expression uses logical and?", ["age > 18 and active", "age > 18 && active", "age > 18 plus active"], "age > 18 and active", "Python uses the word and."),
    fill("Complete the logical expression.", "is_valid = age >= 18 __1__ has_id", [{ label: "__1__", answers: ["and"] }], "and requires both sides to be truthy."),
    typed("Create result from (2 + 3) * 4 and print it.", "", code("result = (2 + 3) * 4", "print(result)"), ["result", "(2 + 3) * 4", "print(result)"], "This practices precedence and parentheses.")
  ]),
  ...attach("py1-scope-global", [
    mcq("What is printed?", ["Python is awesome", "Python is fantastic"], "Python is awesome", "Assigning x inside the function creates a LOCAL x; the global stays awesome.", code("x = \"awesome\"", "def myfunc():", "    x = \"fantastic\"", "myfunc()", "print(\"Python is \" + x)")),
    fill("Insert the keyword that makes x global inside the function.", "def myfunc():\n    __1__ x\n    x = \"fantastic\"", [{ label: "__1__", answers: ["global"] }], "global x tells Python to use the global variable."),
    mcq("What is printed?", ["Python is fantastic", "Python is awesome"], "Python is fantastic", "The global keyword makes the assignment change the OUTER x, so it becomes fantastic.", code("x = \"awesome\"", "def myfunc():", "    global x", "    x = \"fantastic\"", "myfunc()", "print(\"Python is \" + x)")),
    tf("A variable created inside a function is local by default.", true, "It belongs to the function unless declared global or returned/used another way."),
    mcq("Which variable is global?", ["x created outside the function", "x created only inside myfunc", "The colon after def"], "x created outside the function", "Global variables are defined outside functions."),
    fill("Complete the function header.", "__1__ myfunc():", [{ label: "__1__", answers: ["def"] }], "def starts a function definition."),
    tf("Using global is the only way to ever get a value out of a function.", false, "Functions can also return values, but return is a later concept."),
    mcq("What does global x affect?", ["Assignments to x inside the function", "The file extension", "The comment marker"], "Assignments to x inside the function", "global changes which x assignment targets."),
    fill("Complete the global change.", "x = \"old\"\ndef change():\n    global x\n    x = \"__1__\"", [{ label: "__1__", answers: ["new"] }], "This changes the outer x to \"new\" when the function runs."),
    typed("Write a function named change that declares global x and assigns Done.", "", code("def change():", "    global x", "    x = \"Done\""), ["def change():", "global x", "x = \"Done\""], "This practices the global keyword in a small function.")
  ]),
  ...attach("py1-errors-mini", [
    mcq("What error is likely from missing a closing parenthesis?", ["SyntaxError", "NameError", "NoneType"], "SyntaxError", "Invalid Python syntax often raises SyntaxError.", "print(\"Hello\""),
    mcq("What error is likely from using x before creating it?", ["NameError", "TypeError", "FloatError"], "NameError", "Python does not know the variable name yet.", "print(x)"),
    mcq("What error is likely from \"5\" + 5?", ["TypeError", "NameError", "IndentationError"], "TypeError", "This mixes incompatible types for +."),
    mcq("What error is likely when a required block is not indented?", ["IndentationError", "CommentError", "StringError"], "IndentationError", code("if True:", "print(\"Hi\")")),
    fill("Fix the missing quotes.", "name = __1__", [{ label: "__1__", answers: ["\"Ali\"", "'Ali'"] }], "Text values need quotes."),
    fill("Fix the missing colon.", "if x > 5__1__", [{ label: "__1__", answers: [":"] }], "If headers need a colon."),
    fill("Fix the missing print parenthesis.", "print__1__\"Hello\")", [{ label: "__1__", answers: ["("] }], "Function calls need parentheses around arguments."),
    mcq("Which code creates x before printing it?", ["x = 5\nprint(x)", "print(x)\nx = 5", "print(\"x\")\nx = 5"], "x = 5\nprint(x)", "Create variables before using them."),
    typed("Fix the program so it reads age as a number and prints age plus 5.", code("age = input(\"Age: \")", "print(age + 5)"), code("age = int(input(\"Age: \"))", "print(age + 5)"), ["age", "int(input", "print(age + 5)"], "input returns a string, so int() is needed for numeric addition."),
    typed("Write a tiny program that asks for a name and age, then prints them with an f-string.", "", code("name = input(\"Name: \")", "age = int(input(\"Age: \"))", "print(f\"{name} is {age} years old\")"), ["name = input", "age = int(input", "print(f", "{name}", "{age}"], "This final mini program combines input, casting, variables, and f-strings.")
  ])
];
