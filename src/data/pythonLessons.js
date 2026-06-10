const code = (...lines) => lines.join("\n");

// Lessons are shown above the questions of their module (Python track).
// Each example is runnable in the in-browser Python runtime.
export const pythonLessons = {
  "py1-intro-interpreter": {
    summary:
      "Python is a general-purpose programming language used for automation, web backends, data analysis, scripting, and much more. You write Python in plain text files ending in .py, and a program called the Python interpreter reads those files and executes them line by line, from top to bottom.",
    points: [
      "Python source files end in .py (for example hello.py).",
      "The interpreter is the tool that actually runs your code.",
      "Statements execute in order — line 1 runs before line 2."
    ],
    example: code(
      "print(\"My first Python program\")",
      "print(\"Lines run in order, top to bottom\")"
    )
  },
  "py1-files-terminal": {
    summary:
      "In real development you run Python from a terminal. python --version (or python3 --version on macOS/Linux) confirms Python is installed; python file.py runs a script. Typing just python opens the interactive shell, where you can try single lines and leave with exit().",
    points: [
      "Check the installation: python --version or python3 --version.",
      "Run a saved script: python hello.py or python3 hello.py.",
      "The interactive shell is for quick experiments; scripts are for saved programs.",
      "exit() leaves the interactive shell."
    ],
    example: code(
      "# This editor IS your interpreter — no terminal needed here.",
      "print(\"Imagine this file is hello.py\")",
      "print(\"You would run it with: python hello.py\")"
    )
  },
  "py1-syntax-indentation": {
    summary:
      "Python uses indentation as syntax, not decoration. A block header like if 5 > 2: ends in a colon, and every line inside that block must be indented by the same amount (4 spaces is standard). Wrong indentation is not a style problem — it raises IndentationError or silently changes what the code means.",
    points: [
      "Block headers (if, for, while, def) end with a colon.",
      "The block under a header must be indented consistently.",
      "Python has no braces { } for normal blocks — indentation IS the block."
    ],
    example: code(
      "if 5 > 2:",
      "    print(\"5 is greater than 2\")",
      "    print(\"both lines belong to the if block\")",
      "print(\"this line is OUTSIDE the block\")"
    )
  },
  "py1-expressions-statements": {
    summary:
      "An expression is code that produces a value: 5 + 3 produces 8. A statement is an instruction that does something: x = 5 + 3 stores a value, print(x) outputs one. Python evaluates the expression on the right side first, then the statement uses the result. Unlike many languages, Python does not need semicolons — a new line ends a statement.",
    points: [
      "Expression: produces a value (5 + 3, len(\"hi\"), x * 2).",
      "Statement: performs an action (assignment, print, if).",
      "In x = 2 * 4, the math happens first, then x stores 8."
    ],
    example: code(
      "x = 5 + 3",
      "print(x)",
      "print(x * 2)"
    )
  },
  "py1-print-basics": {
    summary:
      "print() is how a program shows you what it is doing. Quoted text prints literally; an unquoted name prints the value stored in that variable. print(\"x\") and print(x) are completely different — the quotes decide whether Python reads text or looks up a variable. Printing values is also the simplest debugging tool you have.",
    points: [
      "print(\"Hello\") prints text; print(42) prints a number.",
      "print(x) prints the VALUE of variable x; print(\"x\") prints the letter x.",
      "Use print() freely while learning to see what your code is doing."
    ],
    example: code(
      "city = \"Cairo\"",
      "print(\"city\")",
      "print(city)"
    )
  },
  "py1-print-combine": {
    summary:
      "print() can take several arguments separated by commas, and it puts a space between them automatically. The + operator joins strings WITHOUT adding spaces — and with numbers, + does math instead. Knowing which behavior you are triggering prevents the most common beginner output bugs.",
    points: [
      "print(\"Hello\", \"World\") → Hello World (comma adds a space).",
      "\"Hello\" + \"World\" → HelloWorld (no automatic space).",
      "4 + 5 is 9, but \"4\" + \"5\" is \"45\" — types change what + means."
    ],
    example: code(
      "print(\"Hello\", \"World\")",
      "print(\"Hello\" + \"World\")",
      "print(4 + 5)",
      "print(\"4\" + \"5\")"
    )
  },
  "py1-input-basics": {
    summary:
      "input() pauses the program, shows a prompt, and returns whatever the user types — always as a string, even if they type digits. To do math on user input you must convert it first with int() or float(). Forgetting this conversion is one of the most common beginner crashes.",
    points: [
      "input(\"Name: \") shows a prompt and waits for typing.",
      "input() ALWAYS returns a string.",
      "Convert before math: age = int(input(\"Age: \"))."
    ],
    example: code(
      "name = input(\"What is your name? \")",
      "print(\"Hello,\", name)"
    )
  },
  "py1-comments": {
    summary:
      "A comment starts with # and is ignored by Python — it exists for human readers. Comments can take a whole line or sit at the end of one. Triple-quoted strings spanning several lines are sometimes used as block notes, but they are actually string values, not true comments.",
    points: [
      "# this is a comment — Python skips it entirely.",
      "Comments also let you temporarily disable a line of code.",
      "\"\"\"triple-quoted text\"\"\" is a multiline STRING, not a real comment."
    ],
    example: code(
      "# This line is ignored",
      "print(\"Comments explain WHY code does what it does\")  # inline comment"
    )
  },
  "py1-variables-assignment": {
    summary:
      "A variable is a name attached to a value. Python creates one the moment you assign: x = 5. There is no var, let, or const keyword — and no type declaration, because the value itself carries the type. Reassigning replaces the old value completely, even with a different type.",
    points: [
      "Create by assigning: score = 10, name = \"Aya\".",
      "No declaration keywords — assignment is the declaration.",
      "Reassignment replaces the value: x = 5 then x = \"five\" is legal."
    ],
    example: code(
      "score = 10",
      "print(score)",
      "score = score + 5",
      "print(score)"
    )
  },
  "py1-variable-names": {
    summary:
      "Variable names can use letters, digits, and underscores, but cannot start with a digit or contain hyphens or spaces. Python is case-sensitive: age, Age, and AGE are three different variables. The Python convention for multi-word names is snake_case: user_name, total_price.",
    points: [
      "Legal: user_name, _hidden, name2. Illegal: 2name, user-name, user name.",
      "Case matters: Total and total are different variables.",
      "Use snake_case — it is the Python community standard."
    ],
    example: code(
      "user_name = \"Aya\"",
      "user_age = 25",
      "print(user_name, user_age)"
    )
  },
  "py1-multiple-values": {
    summary:
      "Python can assign several variables in one line: x, y = 3, 4. The same unpacking works from lists and tuples, as long as the number of names matches the number of values. You can also give several variables the same value at once with chained assignment: a = b = 0.",
    points: [
      "x, y = 3, 4 assigns both in one line.",
      "name, age = [\"Aya\", 25] unpacks a list positionally.",
      "The count of names must match the count of values, or Python raises an error."
    ],
    example: code(
      "x, y = 3, 4",
      "print(x, y)",
      "fruits = [\"apple\", \"kiwi\"]",
      "first, second = fruits",
      "print(first)",
      "print(second)"
    )
  },
  "py1-data-types": {
    summary:
      "Every value has a type: 5 is int, 5.0 is float, \"5\" is str, True is bool, and None is NoneType. The literal syntax decides the type — quotes make strings, a decimal point makes floats, brackets make lists. type(x) tells you what you are holding, which matters because types decide what operations are allowed.",
    points: [
      "type(5) → int, type(5.0) → float, type(\"5\") → str.",
      "[1, 2] is a list, (1, 2) is a tuple, {\"a\": 1} is a dict, {1, 2} is a set.",
      "None represents 'no value' and has type NoneType."
    ],
    example: code(
      "print(type(5))",
      "print(type(5.0))",
      "print(type(\"5\"))",
      "print(type(True))",
      "print(type(None))"
    )
  },
  "py1-numbers": {
    summary:
      "Python has two everyday number types: int for whole numbers (any size) and float for decimals. They mix freely in math, and dividing always produces a float. Scientific notation like 2e3 (2000.0) is also a float. Negative numbers work exactly as you expect.",
    points: [
      "int: 42, -7, 0. float: 3.14, -0.5, 2e3.",
      "int + float gives a float; 10 / 2 gives 5.0 (division always floats).",
      "Very large ints are fine — Python ints have no fixed limit."
    ],
    example: code(
      "a = 7",
      "b = 2.5",
      "print(a + b)",
      "print(10 / 2)",
      "print(2e3)"
    )
  },
  "py1-casting": {
    summary:
      "Casting converts between types: int(\"5\") makes the number 5, str(5) makes the text \"5\", float(\"3.5\") makes 3.5. You need it constantly with input(), which always returns strings. Trying to mix types without converting — like \"5\" + 5 — raises TypeError instead of guessing what you meant.",
    points: [
      "int(\"7\") → 7, float(\"2.5\") → 2.5, str(42) → \"42\".",
      "\"5\" + 5 is a TypeError; convert one side first.",
      "int(input(...)) is the standard way to read numbers from users."
    ],
    example: code(
      "text = \"7\"",
      "number = int(text)",
      "print(number + 3)",
      "print(\"Age: \" + str(25))"
    )
  },
  "py1-strings-basics": {
    summary:
      "Strings hold text and can be written with single or double quotes — pick the one that avoids escaping (use double quotes when the text contains an apostrophe). len() measures length, and indexing reads single characters starting from position 0.",
    points: [
      "'hello' and \"hello\" are the same string.",
      "len(\"hello\") is 5; \"hello\"[0] is \"h\" (indexing starts at 0).",
      "\"it's fine\" — double quotes make apostrophes painless."
    ],
    example: code(
      "word = \"python\"",
      "print(len(word))",
      "print(word[0])",
      "print(word[5])"
    )
  },
  "py1-fstrings": {
    summary:
      "An f-string is a string with a lowercase f before the opening quote; anything inside {braces} is evaluated and inserted into the text. It is the modern way to build output — cleaner than concatenation, no manual str() conversions, and it can even hold expressions like {price * 2}.",
    points: [
      "f\"Hello, {name}\" inserts the variable's value.",
      "Numbers work without conversion: f\"Age: {age}\".",
      "Braces can hold expressions: f\"Total: {price * quantity}\"."
    ],
    example: code(
      "name = \"Aya\"",
      "age = 25",
      "print(f\"{name} is {age} years old\")",
      "print(f\"Next year: {age + 1}\")"
    )
  },
  "py1-booleans-comparisons": {
    summary:
      "Booleans are the two values True and False (capitalized). Comparisons produce them: 5 > 3 is True, and == tests equality while = assigns — mixing those up is the classic beginner bug. Other values convert to booleans too: 0 and \"\" are falsy, while non-zero numbers and non-empty strings are truthy.",
    points: [
      "== compares; = assigns. x == 5 asks, x = 5 stores.",
      "!= means 'not equal'.",
      "bool(0) is False, bool(\"hi\") is True."
    ],
    example: code(
      "x = 5",
      "print(x == 5)",
      "print(x != 5)",
      "print(bool(0))",
      "print(bool(\"hi\"))"
    )
  },
  "py1-operators-precedence": {
    summary:
      "Beyond + - * /, Python has ** (power), // (floor division), and % (remainder, great for even/odd checks). Multiplication binds tighter than addition, so 2 + 3 * 4 is 14 — use parentheses to control or clarify order. += and friends update a variable in place.",
    points: [
      "2 ** 3 is 8; 7 // 2 is 3; 7 % 2 is 1.",
      "Multiplication before addition: 2 + 3 * 4 = 14; (2 + 3) * 4 = 20.",
      "x += 1 is shorthand for x = x + 1."
    ],
    example: code(
      "print(2 ** 3)",
      "print(7 // 2)",
      "print(7 % 2)",
      "print(2 + 3 * 4)",
      "print((2 + 3) * 4)"
    )
  },
  "py1-scope-global": {
    summary:
      "Variables created inside a function are local — they exist only while the function runs. Functions can READ variables from the outer (global) scope, but assigning to one inside a function creates a new local instead, unless you declare global name first. Relying on globals is usually a design smell; passing values in and returning results is cleaner.",
    points: [
      "Locals vanish when the function returns.",
      "Reading a global works automatically; ASSIGNING needs the global keyword.",
      "Prefer parameters and return values over global where you can."
    ],
    example: code(
      "count = 0",
      "",
      "def bump():",
      "    global count",
      "    count += 1",
      "",
      "bump()",
      "bump()",
      "print(count)"
    )
  },
  "py1-errors-mini": {
    summary:
      "Errors are information, not punishment. SyntaxError means Python could not even read the line (missing quote, colon, or parenthesis). NameError means you used a variable that does not exist yet — often a typo. TypeError means the types do not fit the operation, like \"5\" + 5. IndentationError means a block is not indented correctly. Read the LAST line of an error message first: it names the type and explains the problem.",
    points: [
      "SyntaxError: broken structure — missing quotes, colons, parentheses.",
      "NameError: using a name before creating it (or a typo).",
      "TypeError: wrong type for the operation, like \"5\" + 5.",
      "Read tracebacks bottom-up: error type and message first."
    ],
    example: code(
      "# Fix-it practice: this version works. Try breaking it!",
      "age = 21",
      "print(f\"Age next year: {age + 1}\")"
    )
  }
};
