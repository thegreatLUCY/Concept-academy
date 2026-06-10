const code = (...lines) => lines.join("\n");
const setId = "python-set3";

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

export const pythonSet3Modules = [
  { id: "py3-functions-basics", setId, title: "Function Basics" },
  { id: "py3-parameters", setId, title: "Parameters and Arguments" },
  { id: "py3-args-kwargs", setId, title: "*args and **kwargs" },
  { id: "py3-return-values", setId, title: "Return Values" },
  { id: "py3-scope", setId, title: "Scope: Local, Global, nonlocal" },
  { id: "py3-lambda-hof", setId, title: "Lambda and Higher-Order Functions" },
  { id: "py3-comprehensions-adv", setId, title: "Advanced Comprehensions" },
  { id: "py3-recursion", setId, title: "Recursion" },
  { id: "py3-modules-imports", setId, title: "Modules and Imports" },
  { id: "py3-stdlib", setId, title: "Standard Library Tour" },
  { id: "py3-exceptions", setId, title: "try, except, else, finally" },
  { id: "py3-raise-custom", setId, title: "raise and Custom Exceptions" },
  { id: "py3-files-read", setId, title: "Reading Files" },
  { id: "py3-files-write", setId, title: "Writing Files" },
  { id: "py3-json", setId, title: "JSON Data" },
  { id: "py3-docs-hints", setId, title: "Docstrings and Type Hints" },
  { id: "py3-debugging", setId, title: "Debugging and Defensive Code" },
  { id: "py3-function-programs", setId, title: "Function Mini Programs" }
];

export const pythonSet3Questions = [
  ...attach("py3-functions-basics", [
    mcq("Which keyword defines a function?", ["def", "func", "function"], "def", "def starts a function definition, followed by the name, parentheses, and a colon."),
    fill("Complete the definition.", "__1__ greet():\n    print(\"Hello\")", [{ label: "__1__", answers: ["def"] }], "def greet(): defines; greet() calls."),
    mcq("What is the difference between greet and greet()?", ["greet is the function object; greet() actually calls it", "They are identical", "greet() defines it; greet runs it"], "greet is the function object; greet() actually calls it", "Forgetting the parentheses passes or prints the function itself instead of running it."),
    mcq("What does this code print?", ["Hi printed twice", "Hi printed once", "Nothing"], "Hi printed twice", "Each call runs the body again.", code("def say_hi():", "    print(\"Hi\")", "", "say_hi()", "say_hi()")),
    tf("A function body must be indented under the def line.", true, "Like every Python block, the body is defined by indentation."),
    mcq("What does return do?", ["Sends a value back to the caller and ends the function", "Prints a value", "Restarts the function"], "Sends a value back to the caller and ends the function", "return hands the result to whoever called the function."),
    mcq("What does this code print?", ["Hello then None", "Hello then Hello", "None then Hello"], "Hello then None", "greet() prints Hello but returns None, so print(greet()) prints both.", code("def greet():", "    print(\"Hello\")", "", "print(greet())")),
    tf("Code placed after a return statement in the same path never runs.", true, "return exits the function immediately."),
    fill("Send the computed total back to the caller.", "def add(a, b):\n    total = a + b\n    __1__ total", [{ label: "__1__", answers: ["return"] }], "Without return, the caller would receive None."),
    typed("Define square(n) that returns n times n, then print square(4).", "", code("def square(n):", "    return n * n", "", "print(square(4))"), ["def square(n):", "return n * n", "print(square(4))"], "Defining, returning, and calling is the core function workflow; this prints 16.", [code("def square(n):", "    return n * n", "", "print(square(4))"), code("def square(n):", "    return n ** 2", "", "print(square(4))")])
  ]),
  ...attach("py3-parameters", [
    mcq("In def greet(name): followed by greet(\"Aya\"), which is the parameter and which is the argument?", ["name is the parameter; \"Aya\" is the argument", "\"Aya\" is the parameter; name is the argument", "Both are parameters"], "name is the parameter; \"Aya\" is the argument", "Parameters are the placeholders in the definition; arguments are the real values passed in."),
    fill("Complete the definition so the function accepts a name.", "def greet(__1__):\n    print(f\"Hello, {name}\")", [{ label: "__1__", answers: ["name"] }], "The parameter name must match how it is used in the body."),
    mcq("What does this code print?", ["Hello, friend", "Hello, name", "TypeError"], "Hello, friend", "When the argument is omitted, the default value steps in.", code("def greet(name=\"friend\"):", "    print(f\"Hello, {name}\")", "", "greet()")),
    mcq("What is true about keyword arguments like greet(name=\"Bo\")?", ["They can be passed in any order", "They must match the positional order", "They only work with defaults"], "They can be passed in any order", "Naming each argument removes the dependence on position."),
    mcq("What does this code print?", ["8", "6", "TypeError"], "8", "power(2) supplies only base, so exp falls back to its default of 3, and 2 ** 3 is 8.", code("def power(base, exp=3):", "    return base ** exp", "", "print(power(2))")),
    tf("Parameters with defaults must come after parameters without defaults.", true, "def f(a=1, b): is a SyntaxError; required parameters go first."),
    mcq("What happens when you call greet() but greet requires a name parameter with no default?", ["TypeError: missing required argument", "It prints None", "It silently uses an empty string"], "TypeError: missing required argument", "Python refuses to call a function without its required arguments."),
    fill("Give exp a default value of 2.", "def power(base, exp__1__2):\n    return base ** exp", [{ label: "__1__", answers: ["="] }], "A default is attached with = in the definition."),
    mcq("What does this code print?", ["Hi Bo from Cairo", "Hi Cairo from Bo", "SyntaxError"], "Hi Bo from Cairo", "Keyword arguments map by NAME, ignoring the order they are written in.", code("def intro(name, city):", "    print(f\"Hi {name} from {city}\")", "", "intro(city=\"Cairo\", name=\"Bo\")")),
    typed("Define greet(name=\"friend\") that prints Hello, <name>. Call it once with Aya and once with no argument.", "", code("def greet(name=\"friend\"):", "    print(f\"Hello, {name}\")", "", "greet(\"Aya\")", "greet()"), ["def greet(name=\"friend\"):", "greet(\"Aya\")", "greet()"], "The default makes the argument optional: this prints Hello, Aya then Hello, friend.")
  ]),
  ...attach("py3-args-kwargs", [
    mcq("What does *args collect in def show(*args)?", ["Extra positional arguments, as a tuple", "Extra keyword arguments, as a dict", "Only the first argument"], "Extra positional arguments, as a tuple", "The * gathers any number of positional values into one tuple."),
    mcq("What does **kwargs collect in def show(**kwargs)?", ["Extra keyword arguments, as a dict", "Extra positional arguments, as a tuple", "A list of argument names"], "Extra keyword arguments, as a dict", "The ** gathers name=value pairs into a dictionary."),
    mcq("What does this code print?", ["6", "(1, 2, 3)", "TypeError"], "6", "nums arrives as the tuple (1, 2, 3) and sum adds it up.", code("def add(*nums):", "    return sum(nums)", "", "print(add(1, 2, 3))")),
    fill("Let the function accept any number of positional items.", "def show(__1__items):\n    print(items)", [{ label: "__1__", answers: ["*"] }], "The single star does the collecting; \"items\" is just a conventional name."),
    mcq("What does this code print?", ["{'role': 'admin', 'active': True}", "('role', 'active')", "SyntaxError"], "{'role': 'admin', 'active': True}", "Keyword arguments land in kwargs as a dict.", code("def show(**kwargs):", "    print(kwargs)", "", "show(role=\"admin\", active=True)")),
    tf("In a definition, **kwargs must come after *args and normal parameters.", true, "The legal order is: normal params, *args, keyword-only params, **kwargs."),
    mcq("What does f(*[1, 2]) do when calling f(a, b)?", ["Unpacks the list so a=1 and b=2", "Passes the whole list as a", "Raises a SyntaxError"], "Unpacks the list so a=1 and b=2", "The * in a CALL spreads a sequence into separate positional arguments."),
    mcq("What does this code print?", ["3", "{'a': 1, 'b': 2}", "TypeError"], "3", "The ** in the call unpacks the dict into a=1, b=2.", code("def add(a, b):", "    return a + b", "", "print(add(**{\"a\": 1, \"b\": 2}))")),
    tf("The names args and kwargs are just conventions; the * and ** symbols are what matter.", true, "def f(*values, **options) works exactly the same way."),
    typed("Define total(*nums) that returns the sum of all arguments, then print total(1, 2, 3).", "", code("def total(*nums):", "    return sum(nums)", "", "print(total(1, 2, 3))"), ["def total(*nums):", "sum(nums)", "print(total(1, 2, 3))"], "*nums lets the caller pass any count of numbers; this prints 6.")
  ]),
  ...attach("py3-return-values", [
    mcq("What does a function return if it has no return statement?", ["None", "0", "An empty string"], "None", "Every Python function returns something; the default is None."),
    mcq("What does this code print?", ["1 9", "(1, 9)", "TypeError"], "1 9", "Returning a, b really returns a tuple, which unpacks into low and high.", code("def min_max(nums):", "    return min(nums), max(nums)", "", "low, high = min_max([3, 1, 9])", "print(low, high)")),
    fill("Return both values at once.", "def stats(nums):\n    return min(nums), __1__(nums)", [{ label: "__1__", answers: ["max"] }], "Comma-separated returns pack into a tuple automatically."),
    mcq("What is a guard clause?", ["An early return that handles bad input before the main logic", "A loop that validates every variable", "A special Python keyword"], "An early return that handles bad input before the main logic", "Returning early keeps the main path unindented and readable."),
    mcq("What does this code print?", ["small", "big", "small then big"], "small", "return exits immediately, so the second print never runs for n = 3.", code("def check(n):", "    if n < 10:", "        return \"small\"", "    return \"big\"", "", "print(check(3))")),
    tf("A function can return any type: lists, dicts, other functions, even classes.", true, "Return values are not limited to numbers and strings."),
    mcq("What does this code print?", ["hi then None", "hi then hi", "None then hi"], "hi then None", "print() itself returns None, so x holds None — assigning print results is a classic trap.", code("x = print(\"hi\")", "print(x)")),
    mcq("Why are multiple return statements in different branches acceptable?", ["Each branch clearly states its own result", "Python requires exactly one return", "They run in sequence"], "Each branch clearly states its own result", "Early, explicit returns per branch often beat one tangled final expression."),
    fill("Capture both returned values.", "low, __1__ = min_max(nums)", [{ label: "__1__", answers: ["high"] }], "Tuple unpacking needs one name per returned value."),
    typed("Define min_max(nums) returning the smallest and largest values as a pair. Unpack the result for [4, 7, 1] and print both.", "", code("def min_max(nums):", "    return min(nums), max(nums)", "", "low, high = min_max([4, 7, 1])", "print(low, high)"), ["return min(nums), max(nums)", "low, high = min_max"], "This prints 1 7 — multiple return values are just packed tuples.")
  ]),
  ...attach("py3-scope", [
    mcq("Where does a variable assigned inside a function live?", ["In the function's local scope", "In the global scope", "In every scope at once"], "In the function's local scope", "Locals exist only while the function runs."),
    mcq("What happens here?", ["NameError: message is not defined", "It prints hello", "It prints None"], "NameError: message is not defined", "message was local to speak() and vanished when the call ended.", code("def speak():", "    message = \"hello\"", "", "speak()", "print(message)")),
    tf("A function can READ a global variable without any special keyword.", true, "Reading falls through to the global scope; only assignment needs the global keyword."),
    mcq("What does this code print?", ["10 then 5", "10 then 10", "5 then 5"], "10 then 5", "Assigning x inside the function creates a NEW local x; the global stays 5.", code("x = 5", "def change():", "    x = 10", "    print(x)", "", "change()", "print(x)")),
    fill("Allow the function to modify the global counter.", "count = 0\ndef bump():\n    __1__ count\n    count += 1", [{ label: "__1__", answers: ["global"] }], "Without global, count += 1 raises UnboundLocalError."),
    mcq("What is nonlocal used for?", ["Modifying a variable in an enclosing (outer) function's scope", "Creating a global from inside a function", "Importing variables from another module"], "Modifying a variable in an enclosing (outer) function's scope", "nonlocal targets the nearest enclosing function scope, not module scope."),
    mcq("What does this code print?", ["7", "NameError", "0"], "7", "inner() can read n from the enclosing outer() scope — a closure.", code("def outer():", "    n = 7", "    def inner():", "        print(n)", "    inner()", "", "outer()")),
    tf("Function parameters are local variables of that function.", true, "They are created fresh on each call and disappear afterward."),
    mcq("Why does this raise UnboundLocalError?", ["The += assignment makes total local, but it is read before any local value exists", "total was never defined anywhere", "Functions cannot use +="], "The += assignment makes total local, but it is read before any local value exists", "Any assignment anywhere in the function makes the name local for the WHOLE function.", code("total = 0", "def add(n):", "    total += n", "", "add(5)")),
    typed("Create a global count = 0 and a function bump() that uses the global keyword to add 1. Call bump() twice and print count.", "", code("count = 0", "", "def bump():", "    global count", "    count += 1", "", "bump()", "bump()", "print(count)"), ["global count", "count += 1", "print(count)"], "This prints 2 — though passing values and returning results is usually cleaner than globals.")
  ]),
  ...attach("py3-lambda-hof", [
    mcq("What is a lambda?", ["A small anonymous function written as an expression", "A loop shortcut", "A type of list"], "A small anonymous function written as an expression", "lambda arguments: expression defines a function with no name and no statements."),
    mcq("What does (lambda x: x * 2)(5) evaluate to?", ["10", "lambda 5", "TypeError"], "10", "The lambda is defined and immediately called with 5."),
    fill("Complete the lambda.", "double = __1__ x: x * 2", [{ label: "__1__", answers: ["lambda"] }], "This is equivalent to a one-line def double(x): return x * 2."),
    mcq("What does map(func, items) do?", ["Applies func to every item, producing the results lazily", "Filters items where func is True", "Sorts items using func"], "Applies func to every item, producing the results lazily", "Wrap it in list() to see all results at once."),
    mcq("What does this code print?", ["[2, 4, 6]", "[1, 2, 3]", "<map object>"], "[2, 4, 6]", "map doubles each item; list() materializes the results.", code("nums = [1, 2, 3]", "print(list(map(lambda n: n * 2, nums)))")),
    mcq("What does filter(func, items) keep?", ["Items where func(item) is truthy", "Items where func(item) is falsy", "The first matching item only"], "Items where func(item) is truthy", "filter is a test; map is a transformation."),
    mcq("What does this code print?", ["['go', 'word', 'python']", "['python', 'word', 'go']", "['go', 'python', 'word']"], "['go', 'word', 'python']", "key=len sorts by each word's length: 2, 4, 6.", code("words = [\"python\", \"go\", \"word\"]", "print(sorted(words, key=len))")),
    fill("Sort the words by their length.", "ranked = sorted(words, __1__=len)", [{ label: "__1__", answers: ["key"] }], "The key function is called on each item to produce its sort value."),
    tf("Functions in Python are values: you can store them in variables and pass them as arguments.", true, "That is what makes map, filter, and sorted's key parameter possible."),
    typed("Sort pairs by the SECOND value of each tuple using a lambda key, then print the result.", "pairs = [(\"a\", 3), (\"b\", 1), (\"c\", 2)]", code("ranked = sorted(pairs, key=lambda pair: pair[1])", "print(ranked)"), ["key=lambda", "pair[1]", "print(ranked)"], "The lambda extracts index 1 from each tuple; output is [('b', 1), ('c', 2), ('a', 3)].")
  ]),
  ...attach("py3-comprehensions-adv", [
    mcq("What does {n: n * n for n in range(3)} create?", ["A dict: {0: 0, 1: 1, 2: 4}", "A set of squares", "A list of pairs"], "A dict: {0: 0, 1: 1, 2: 4}", "key: value before the for makes it a dict comprehension."),
    mcq("What does {c for c in \"hello\"} evaluate to?", ["A set of the 4 distinct letters", "A list of 5 letters", "A dict of letter counts"], "A set of the 4 distinct letters", "Braces without key: value build a set, so the duplicate l collapses."),
    mcq("What does this code print?", ["['odd', 'even', 'odd']", "['even', 'odd', 'even']", "[1, 2, 3]"], "['odd', 'even', 'odd']", "An if/else BEFORE the for transforms every item rather than filtering.", "print([\"even\" if n % 2 == 0 else \"odd\" for n in [1, 2, 3]])"),
    fill("Map each word to its length.", "lengths = {word: len(word) __1__ word in words}", [{ label: "__1__", answers: ["for"] }], "Dict comprehensions read: {key_expr: value_expr for item in iterable}."),
    mcq("What does [n for row in [[1, 2], [3]] for n in row] evaluate to?", ["[1, 2, 3]", "[[1, 2], [3]]", "[1, [2, 3]]"], "[1, 2, 3]", "Two for clauses flatten nested lists; they read left to right like nested loops."),
    mcq("What does sum(n * n for n in range(3)) evaluate to?", ["5", "9", "14"], "5", "The generator expression yields 0, 1, 4 lazily and sum adds them — no list is built."),
    tf("A trailing if in a comprehension FILTERS items, while if/else before the for TRANSFORMS every item.", true, "[x for x in nums if x > 0] filters; [x if x > 0 else 0 for x in nums] transforms."),
    mcq("What does {v: k for k, v in {\"a\": 1}.items()} evaluate to?", ["{1: 'a'}", "{'a': 1}", "SyntaxError"], "{1: 'a'}", "Swapping k and v in a dict comprehension inverts the mapping."),
    fill("Keep only the even numbers.", "evens = [n for n in range(10) if n % 2 __1__ 0]", [{ label: "__1__", answers: ["=="] }], "The filter clause needs a full comparison, not just n % 2."),
    typed("Use a dict comprehension to map each word in words to its length, then print the dict.", "words = [\"go\", \"python\", \"js\"]", code("lengths = {word: len(word) for word in words}", "print(lengths)"), ["{word: len(word) for word in words}", "print(lengths)"], "Output: {'go': 2, 'python': 6, 'js': 2}.")
  ]),
  ...attach("py3-recursion", [
    mcq("What is recursion?", ["A function calling itself to solve smaller versions of a problem", "A loop with two conditions", "Importing a module twice"], "A function calling itself to solve smaller versions of a problem", "Each call handles a smaller piece until the base case stops the chain."),
    mcq("What is the purpose of a base case?", ["To stop the recursion", "To speed up the first call", "To define the return type"], "To stop the recursion", "Without a base case, the calls never end."),
    mcq("What does factorial(3) return?", ["6", "3", "9"], "6", "3 * factorial(2) → 3 * 2 * factorial(1) → 3 * 2 * 1 = 6.", code("def factorial(n):", "    if n <= 1:", "        return 1", "    return n * factorial(n - 1)")),
    tf("A recursive function with no reachable base case eventually raises RecursionError.", true, "Python caps the call stack depth (about 1000 frames by default)."),
    mcq("What does countdown(3) print?", ["3 2 1 on separate lines", "1 2 3 on separate lines", "3 forever"], "3 2 1 on separate lines", "Each call prints n BEFORE recursing with n - 1, stopping at 0.", code("def countdown(n):", "    if n == 0:", "        return", "    print(n)", "    countdown(n - 1)")),
    fill("Complete the recursive step.", "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n __1__ 1)", [{ label: "__1__", answers: ["-"] }], "Each call must move TOWARD the base case, so n shrinks by 1."),
    mcq("Which problem fits recursion most naturally?", ["Walking a nested folder tree of unknown depth", "Adding two numbers", "Printing a flat list"], "Walking a nested folder tree of unknown depth", "Self-similar nested structures are where recursion shines."),
    mcq("What does sum_list([2, 3, 4]) return?", ["9", "234", "RecursionError"], "9", "2 + sum_list([3, 4]) → 2 + 3 + sum_list([4]) → 2 + 3 + 4 + 0 = 9.", code("def sum_list(nums):", "    if not nums:", "        return 0", "    return nums[0] + sum_list(nums[1:])")),
    tf("Any recursion can be rewritten as a loop, and loops are often simpler in Python.", true, "Recursion is a tool, not a requirement; prefer whichever reads clearest."),
    typed("Write a recursive factorial(n) with base case n <= 1, then print factorial(5).", "", code("def factorial(n):", "    if n <= 1:", "        return 1", "    return n * factorial(n - 1)", "", "print(factorial(5))"), ["if n <= 1:", "return 1", "factorial(n - 1)", "print(factorial(5))"], "This prints 120 — the base case plus the shrinking recursive step.")
  ]),
  ...attach("py3-modules-imports", [
    mcq("After import math, how do you call its square root function?", ["math.sqrt(16)", "sqrt(16)", "import sqrt(16)"], "math.sqrt(16)", "A plain import keeps functions behind the module name."),
    fill("Bring in the math module.", "__1__ math\nprint(math.pi)", [{ label: "__1__", answers: ["import"] }], "import makes the module's contents available via its name."),
    mcq("What changes with from math import sqrt?", ["You call sqrt(16) directly without the math. prefix", "Nothing; the syntax is identical", "All of math is loaded twice"], "You call sqrt(16) directly without the math. prefix", "from-import pulls specific names straight into your namespace."),
    mcq("What does import numpy as np do?", ["Imports numpy under the shorter alias np", "Renames the numpy package on disk", "Copies numpy into your project"], "Imports numpy under the shorter alias np", "Aliases keep code short; np and pd are famous conventions."),
    mcq("What does math.floor(3.7) return?", ["3", "4", "3.7"], "3", "floor always rounds DOWN; ceil(3.7) would give 4."),
    tf("Any .py file you write can be imported as a module by other files in the same folder.", true, "helpers.py becomes import helpers — that is how projects split into files."),
    mcq("What is the point of if __name__ == \"__main__\":?", ["Run that block only when the file is executed directly, not when imported", "Mark the file as the project root", "Make the file importable at all"], "Run that block only when the file is executed directly, not when imported", "When imported, __name__ is the module's name instead of \"__main__\"."),
    fill("Import just randint from the random module.", "from random __1__ randint", [{ label: "__1__", answers: ["import"] }], "from module import name is the selective form."),
    mcq("Module greet.py contains print(\"loaded\"). What happens on import greet?", ["loaded is printed once", "Nothing prints", "SyntaxError"], "loaded is printed once", "Importing RUNS the module's top-level code — which is why the __main__ guard exists."),
    typed("Import the math module and print the square root of 16.", "", code("import math", "print(math.sqrt(16))"), ["import math", "math.sqrt(16)"], "This prints 4.0 — sqrt always returns a float.")
  ]),
  ...attach("py3-stdlib", [
    mcq("What can random.randint(1, 6) return?", ["Any integer from 1 to 6, INCLUDING both ends", "1 to 5 only", "0 to 6"], "Any integer from 1 to 6, INCLUDING both ends", "Unusually for Python, randint includes BOTH endpoints — perfect for dice."),
    mcq("What does random.choice([\"a\", \"b\", \"c\"]) do?", ["Returns one random item from the list", "Shuffles the list in place", "Returns a random index"], "Returns one random item from the list", "choice picks; shuffle reorders; sample picks several."),
    mcq("How do you get today's date with the datetime module?", ["datetime.date.today()", "datetime.now.date", "date.today.datetime()"], "datetime.date.today()", "The date class has a today() constructor."),
    fill("Pick one random winner.", "winner = random.__1__(names)", [{ label: "__1__", answers: ["choice"] }], "random.choice takes any non-empty sequence."),
    mcq("What does math.ceil(2.1) return?", ["3", "2", "2.1"], "3", "ceil rounds UP to the nearest integer."),
    mcq("Which module helps you work with file paths and folders?", ["os", "math", "json"], "os", "os (and the newer pathlib) handle paths, folders, and environment details."),
    tf("time.sleep(2) pauses the program for about 2 seconds.", true, "sleep blocks execution — useful for delays and rate limiting."),
    mcq("What does round(2.5) return in Python 3?", ["2", "3", "2.5"], "2", "Python 3 uses banker's rounding: halves go to the nearest EVEN number, so round(2.5) is 2 and round(3.5) is 4."),
    fill("Import the date class directly.", "from datetime import __1__\nprint(date.today())", [{ label: "__1__", answers: ["date"] }], "from datetime import date gives direct access to the class."),
    typed("Import randint from random and print one simulated dice roll between 1 and 6.", "", code("from random import randint", "print(randint(1, 6))"), ["from random import randint", "randint(1, 6)"], "randint(1, 6) includes both 1 and 6, exactly like a real die.")
  ]),
  ...attach("py3-exceptions", [
    mcq("What is try/except for?", ["Handling errors at runtime without crashing", "Speeding up slow code", "Skipping syntax errors"], "Handling errors at runtime without crashing", "Code in try is attempted; matching except blocks handle failures."),
    mcq("What does this code print?", ["cannot divide", "ZeroDivisionError traceback", "0"], "cannot divide", "The division raises ZeroDivisionError, which the except catches.", code("try:", "    result = 10 / 0", "except ZeroDivisionError:", "    print(\"cannot divide\")")),
    fill("Catch the conversion failure.", "try:\n    age = int(text)\n__1__ ValueError:\n    print(\"not a number\")", [{ label: "__1__", answers: ["except"] }], "except names which error type this block handles."),
    mcq("Why is except Exception: (or bare except:) usually a bad idea?", ["It hides unexpected bugs by swallowing every error the same way", "It is a syntax error", "It only works once per program"], "It hides unexpected bugs by swallowing every error the same way", "Catch the SPECIFIC errors you can actually handle."),
    mcq("When does the else block of a try statement run?", ["Only when the try block raised no exception", "Always", "Only after an exception was caught"], "Only when the try block raised no exception", "else separates the risky line from the code that should follow success."),
    mcq("When does finally run?", ["Always — after success, after a caught error, even after return", "Only on success", "Only when an error escapes"], "Always — after success, after a caught error, even after return", "finally is for cleanup that must happen no matter what."),
    tf("When a line inside try raises, the remaining lines of the try block are skipped.", true, "Execution jumps straight to the matching except."),
    mcq("Which exception does int(\"abc\") raise?", ["ValueError", "TypeError", "NameError"], "ValueError", "The TYPE (string) is fine; the VALUE just is not a valid number — hence ValueError."),
    fill("Guarantee the cleanup line runs.", "try:\n    process()\n__1__:\n    print(\"done\")", [{ label: "__1__", answers: ["finally"] }], "finally runs whether process() succeeded or raised."),
    typed("Ask for a number with input(), convert it with int() inside try, and print not a number if a ValueError occurs; otherwise print the number.", "", code("try:", "    n = int(input(\"Number: \"))", "    print(n)", "except ValueError:", "    print(\"not a number\")"), ["int(input(", "except ValueError:", "print(\"not a number\")"], "Wrapping int(input()) in try/except is the standard safe-input pattern.")
  ]),
  ...attach("py3-raise-custom", [
    mcq("What does the raise keyword do?", ["Throws an exception on purpose", "Catches an exception", "Logs a warning"], "Throws an exception on purpose", "raise signals that the current operation cannot continue correctly."),
    fill("Reject the invalid age.", "if age < 0:\n    __1__ ValueError(\"age cannot be negative\")", [{ label: "__1__", answers: ["raise"] }], "Raising with a clear message tells callers exactly what went wrong."),
    mcq("When SHOULD a function raise instead of returning a default?", ["When the input is invalid and continuing would hide a real bug", "Whenever any condition is False", "Never; errors are always bad"], "When the input is invalid and continuing would hide a real bug", "Failing loudly beats silently producing wrong results."),
    mcq("What does this code print?", ["bad: too small", "ValueError traceback", "ok"], "bad: too small", "The raised error travels UP to the caller's except, where e holds the message.", code("def check(n):", "    if n < 10:", "        raise ValueError(\"too small\")", "", "try:", "    check(3)", "except ValueError as e:", "    print(f\"bad: {e}\")")),
    mcq("How do you define a custom exception?", ["class EmptyCartError(Exception): pass", "def EmptyCartError(): raise", "exception EmptyCartError {}"], "class EmptyCartError(Exception): pass", "Custom exceptions are just classes inheriting from Exception."),
    fill("Complete the custom exception.", "class EmptyCartError(__1__):\n    pass", [{ label: "__1__", answers: ["Exception"] }], "Inheriting from Exception makes the class raisable and catchable."),
    tf("A raise statement stops the function immediately, like an error-flavored return.", true, "No code after an executed raise in the same path will run."),
    mcq("What does except ValueError as e: give you?", ["The exception object bound to e, including its message", "A string copy of the traceback", "The line number only"], "The exception object bound to e, including its message", "str(e) or f-strings expose the message you raised."),
    mcq("What does except (ValueError, TypeError): mean?", ["Handle EITHER of those two error types in this one block", "Handle errors only when both occur", "A syntax error"], "Handle EITHER of those two error types in this one block", "A tuple of types lets one handler cover several related failures."),
    typed("Define set_age(age) that raises ValueError with message negative age when age < 0, otherwise returns age. Then print set_age(30).", "", code("def set_age(age):", "    if age < 0:", "        raise ValueError(\"negative age\")", "    return age", "", "print(set_age(30))"), ["raise ValueError(", "return age", "print(set_age(30))"], "Validate first, raise on bad input, return on good input — the guard pattern.")
  ]),
  ...attach("py3-files-read", [
    mcq("What mode does open(\"data.txt\") use by default?", ["\"r\" — read text", "\"w\" — write", "\"a\" — append"], "\"r\" — read text", "Reading is the default; writing must be requested explicitly."),
    mcq("What does f.read() return?", ["The entire file content as one string", "A list of lines", "The first line only"], "The entire file content as one string", "read() slurps everything; readline()/readlines() work line by line."),
    fill("Open the file safely.", "with __1__(\"notes.txt\") as f:\n    content = f.read()", [{ label: "__1__", answers: ["open"] }], "with open(...) as f is the standard reading pattern."),
    mcq("Why use with open(...) instead of plain open(...)?", ["The file is closed automatically, even if an error occurs inside the block", "It reads files twice as fast", "It is required by the interpreter"], "The file is closed automatically, even if an error occurs inside the block", "with manages cleanup so you cannot forget f.close()."),
    mcq("f.readlines() on a 2-line file returns what?", ["['first\\n', 'second'] — a list, usually with newline characters", "'first second'", "('first', 'second')"], "['first\\n', 'second'] — a list, usually with newline characters", "Each element keeps its trailing \\n, which strip() can remove."),
    mcq("What is the most Pythonic way to process a file line by line?", [code("with open(\"log.txt\") as f:", "    for line in f:", "        print(line.strip())"), code("f = open(\"log.txt\")", "print(f.read(1))"), code("for line in \"log.txt\":", "    print(line)")], code("with open(\"log.txt\") as f:", "    for line in f:", "        print(line.strip())"), "Files are iterable — looping reads one line at a time without loading everything."),
    tf("Opening a file that does not exist in read mode raises FileNotFoundError.", true, "Wrap it in try/except FileNotFoundError when the file might be missing."),
    fill("Read the whole content.", "with open(\"notes.txt\") as f:\n    content = f.__1__()", [{ label: "__1__", answers: ["read"] }], "read() returns the full text as one string."),
    mcq("Why call line.strip() while reading lines?", ["To remove the trailing newline and surrounding whitespace", "To split the line into words", "To convert the line to lowercase"], "To remove the trailing newline and surrounding whitespace", "Without strip, every print doubles the line spacing."),
    typed("Open notes.txt with a with statement, read its full content, and print it.", "", code("with open(\"notes.txt\") as f:", "    content = f.read()", "print(content)"), ["with open(\"notes.txt\")", "f.read()", "print(content)"], "with guarantees the file closes; read() returns everything as one string.")
  ]),
  ...attach("py3-files-write", [
    mcq("What does mode \"w\" do to an existing file?", ["Erases its content and starts fresh", "Adds to the end", "Refuses to open it"], "Erases its content and starts fresh", "\"w\" truncates — a dangerous default to know about."),
    mcq("Which mode adds new content at the END of a file?", ["\"a\"", "\"w\"", "\"r\""], "\"a\"", "Append mode preserves what is already there — right for logs."),
    tf("Opening a missing file with mode \"w\" creates it.", true, "Both \"w\" and \"a\" create the file when it does not exist."),
    fill("Open the log for appending.", "with open(\"log.txt\", __1__) as f:\n    f.write(\"started\\n\")", [{ label: "__1__", answers: ["\"a\"", "'a'"] }], "\"a\" keeps old lines; \"w\" would wipe them."),
    mcq("After f.write(\"hello\") then f.write(\"world\"), the file contains what?", ["helloworld", "hello world", "hello then world on two lines"], "helloworld", "write adds NO newline or space — add \\n yourself."),
    fill("Write the message.", "with open(\"out.txt\", \"w\") as f:\n    f.__1__(\"done\\n\")", [{ label: "__1__", answers: ["write"] }], "write puts the exact string into the file."),
    mcq("What happens with f.write(42)?", ["TypeError — write needs a string", "It writes 42", "It writes the bytes of 42"], "TypeError — write needs a string", "Convert first: f.write(str(42)) or use an f-string."),
    tf("With a with block, the file is properly closed even if an exception happens while writing.", true, "That guarantee is the main reason with is the standard."),
    mcq("What does f.writelines([\"a\\n\", \"b\\n\"]) do?", ["Writes each string in sequence (newlines NOT added automatically)", "Writes the list syntax [\"a\", \"b\"]", "Adds a newline after every item automatically"], "Writes each string in sequence (newlines NOT added automatically)", "Despite the name, writelines does not insert newlines — include them in each string."),
    typed("Use a with statement to write Hello, file! into greeting.txt (mode w).", "", code("with open(\"greeting.txt\", \"w\") as f:", "    f.write(\"Hello, file!\")"), ["open(\"greeting.txt\", \"w\")", "f.write("], "Mode \"w\" creates or replaces the file; write puts the text in.")
  ]),
  ...attach("py3-json", [
    mcq("What does json.dumps(data) do?", ["Converts a Python object into a JSON string", "Parses a JSON string into Python", "Saves data directly to a file"], "Converts a Python object into a JSON string", "dumps = dump to string; think \"serialize\"."),
    mcq("What does json.loads(text) do?", ["Parses a JSON string into Python objects", "Converts Python to JSON", "Validates JSON without parsing"], "Parses a JSON string into Python objects", "loads = load from string; think \"deserialize\"."),
    fill("Bring in the JSON tools.", "__1__ json", [{ label: "__1__", answers: ["import"] }], "json is part of the standard library — no installation needed."),
    mcq("What does this code print?", ["<class 'dict'>", "<class 'str'>", "<class 'json'>"], "<class 'dict'>", "loads turns the JSON object into a real Python dictionary.", code("import json", "data = json.loads('{\"a\": 1}')", "print(type(data))")),
    mcq("What is the difference between json.dump and json.dumps?", ["dump writes to a FILE object; dumps returns a STRING", "dump is faster but identical", "dumps writes files; dump returns strings"], "dump writes to a FILE object; dumps returns a STRING", "The trailing s means string; same pairing for load/loads."),
    mcq("What does json.dumps({\"ok\": True}) return?", ["'{\"ok\": true}'", "'{\"ok\": True}'", "'{ok: true}'"], "'{\"ok\": true}'", "JSON spells booleans lowercase (true/false) and requires double-quoted keys."),
    tf("In JSON, object keys must be strings.", true, "Python dict keys like integers get converted to strings during dumps."),
    fill("Parse the API response text.", "data = json.__1__(response_text)", [{ label: "__1__", answers: ["loads"] }], "loads is the right call for a string; load is for file objects."),
    mcq("Why is JSON so important to learn?", ["It is the standard format for APIs, config files, and saved app data", "It is faster than all databases", "Python cannot store dicts without it"], "It is the standard format for APIs, config files, and saved app data", "Nearly every web API speaks JSON."),
    typed("Convert the user dict to a JSON string with json.dumps and print it.", "import json\nuser = {\"name\": \"Aya\", \"age\": 25}", code("text = json.dumps(user)", "print(text)"), ["json.dumps(user)", "print(text)"], "This prints {\"name\": \"Aya\", \"age\": 25} as one JSON string.")
  ]),
  ...attach("py3-docs-hints", [
    mcq("What is a docstring?", ["A triple-quoted string as the FIRST statement in a function, describing it", "A comment starting with #", "A printed log message"], "A triple-quoted string as the FIRST statement in a function, describing it", "Tools like help() and editors read docstrings automatically."),
    mcq("What does help(len) show?", ["The documentation (docstring) for len", "The source code of len", "Every place len is used"], "The documentation (docstring) for len", "help() works on your own documented functions too."),
    mcq("What do the annotations in def add(a: int, b: int) -> int: mean?", ["a and b are expected to be ints and the function should return an int", "Python will reject non-int arguments", "The function runs in integer-only mode"], "a and b are expected to be ints and the function should return an int", "Hints document intent for readers and tools like editors and type checkers."),
    tf("Type hints are NOT enforced when the program runs.", true, "Python stays dynamic; hints help humans, editors, and tools like mypy — not the runtime."),
    fill("Annotate the parameter as a string.", "def greet(name: __1__) -> str:\n    return f\"Hello, {name}\"", [{ label: "__1__", answers: ["str"] }], "parameter: type is the annotation syntax."),
    mcq("What happens when you call double(\"ab\") given def double(n: int) -> int: return n * 2?", ["It returns abab — hints do not stop it", "TypeError at the call", "SyntaxError"], "It returns abab — hints do not stop it", "Hints are advisory; the code still runs (string * 2 repeats it)."),
    mcq("What is the main practical benefit of docstrings and type hints?", ["Other people (and future you) understand and use the function correctly", "Programs run faster", "Files become smaller"], "Other people (and future you) understand and use the function correctly", "They are documentation that lives WITH the code."),
    tf("A function's docstring is available at runtime via its __doc__ attribute.", true, "print(my_func.__doc__) shows it — that is what help() uses."),
    mcq("What does -> None in a function signature communicate?", ["The function is not expected to return a meaningful value", "The function always fails", "The function takes no arguments"], "The function is not expected to return a meaningful value", "Action-style functions (print, save, send) typically hint -> None."),
    typed("Define double(n: int) -> int with a docstring \"Return n doubled.\" and a return of n * 2, then print double(5).", "", code("def double(n: int) -> int:", "    \"\"\"Return n doubled.\"\"\"", "    return n * 2", "", "print(double(5))"), ["n: int", "-> int", "\"\"\"Return n doubled.\"\"\"", "return n * 2"], "Hints plus a docstring make the function self-documenting; this prints 10.")
  ]),
  ...attach("py3-debugging", [
    mcq("Where should you look FIRST in a long traceback?", ["The last line — it names the error type and message", "The first line only", "The middle frames"], "The last line — it names the error type and message", "Read bottom-up: error type and message first, then the arrowed line that raised it."),
    mcq("Which line raises the error here?", ["Line 3, the division by len(nums) when nums is empty", "Line 1", "Line 2 always fails"], "Line 3, the division by len(nums) when nums is empty", "average([]) divides by zero — edge cases like empty input are where bugs hide.", code("def average(nums):", "    total = sum(nums)", "    return total / len(nums)", "", "average([])")),
    mcq("What is a guard clause in defensive code?", ["An early check that returns or raises before the main logic runs on bad input", "A loop that retries failures", "A type of comment"], "An early check that returns or raises before the main logic runs on bad input", "if not nums: return 0 protects everything below it."),
    mcq("What does assert total >= 0 do when total is -5?", ["Raises AssertionError", "Prints a warning and continues", "Sets total to 0"], "Raises AssertionError", "assert is a built-in sanity check: it raises when its condition is falsy."),
    fill("Add the sanity check.", "__1__ total >= 0, \"total cannot be negative\"", [{ label: "__1__", answers: ["assert"] }], "assert condition, message raises AssertionError with that message when the condition fails."),
    tf("Print-debugging — adding temporary print() calls to see values — is a legitimate technique.", true, "Seeing real values at runtime is often the fastest way to locate a bug."),
    mcq("This code raises TypeError: can only concatenate str (not \"int\") to str. What is the fix?", ["Convert with str(age) or use an f-string", "Add quotes around age", "Use == instead of +"], "Convert with str(age) or use an f-string", "f\"Age: {age}\" sidesteps manual conversion entirely.", "print(\"Age: \" + 25)"),
    mcq("Why validate input at the START of a function?", ["Fail fast with a clear error near the cause, instead of a confusing one later", "Python requires validation", "It makes the function shorter"], "Fail fast with a clear error near the cause, instead of a confusing one later", "The further an invalid value travels, the harder the bug is to trace."),
    mcq("What error does this raise?", ["NameError — totl is not defined", "TypeError", "ValueError"], "NameError — totl is not defined", "Typos in variable names are the most common cause of NameError.", code("total = 10", "print(totl)")),
    typed("Define divide(a, b) that prints cannot divide by zero and returns None when b is 0, otherwise returns a / b. Print divide(10, 2).", "", code("def divide(a, b):", "    if b == 0:", "        print(\"cannot divide by zero\")", "        return None", "    return a / b", "", "print(divide(10, 2))"), ["if b == 0:", "return None", "return a / b"], "The guard clause handles the dangerous case before the division happens; this prints 5.0.")
  ]),
  ...attach("py3-function-programs", [
    typed("Write count_words(sentence) that returns a dict mapping each word to how many times it appears. Print the result for the given sentence.", "sentence = \"the cat and the hat\"", code("def count_words(sentence):", "    counts = {}", "    for word in sentence.split():", "        counts[word] = counts.get(word, 0) + 1", "    return counts", "", "print(count_words(sentence))"), ["counts.get(word, 0) + 1", "sentence.split()", "return counts"], "split + get-with-default is THE counting pattern; the prints {'the': 2, 'cat': 1, 'and': 1, 'hat': 1}."),
    typed("Write safe_average(nums) that returns 0 for an empty list and the average otherwise. Print it for [4, 8, 6] and for [].", "", code("def safe_average(nums):", "    if not nums:", "        return 0", "    return sum(nums) / len(nums)", "", "print(safe_average([4, 8, 6]))", "print(safe_average([]))"), ["if not nums:", "return 0", "sum(nums) / len(nums)"], "The guard clause makes the empty case explicit instead of crashing with ZeroDivisionError."),
    typed("Read numbers.txt (one integer per line) and print the sum of all its numbers.", "", code("total = 0", "with open(\"numbers.txt\") as f:", "    for line in f:", "        total += int(line.strip())", "print(total)"), ["with open(\"numbers.txt\")", "int(line.strip())", "print(total)"], "Looping the file, stripping, and converting each line combines files, casting, and accumulation."),
    typed("Write apply_twice(func, value) that applies func to value two times, then print apply_twice(lambda x: x + 3, 10).", "", code("def apply_twice(func, value):", "    return func(func(value))", "", "print(apply_twice(lambda x: x + 3, 10))"), ["func(func(value))", "lambda x: x + 3"], "Functions are values: passing one in and calling it twice prints 16."),
    typed("Write to_fahrenheit(celsius) returning celsius * 9 / 5 + 32 rounded to 1 decimal with round(). Print to_fahrenheit(36.6).", "", code("def to_fahrenheit(celsius):", "    return round(celsius * 9 / 5 + 32, 1)", "", "print(to_fahrenheit(36.6))"), ["celsius * 9 / 5 + 32", "round("], "round(value, 1) keeps one decimal; this prints 97.9."),
    typed("Save the settings dict into settings.json using json.dump and a with statement.", "import json\nsettings = {\"theme\": \"dark\", \"volume\": 7}", code("with open(\"settings.json\", \"w\") as f:", "    json.dump(settings, f)"), ["open(\"settings.json\", \"w\")", "json.dump(settings, f)"], "json.dump (no s) writes straight into the open file object."),
    mcq("What does this code print?", ["[1] then [1, 2] — the default list is SHARED between calls", "[1] then [2]", "TypeError"], "[1] then [1, 2] — the default list is SHARED between calls", "Default values are created ONCE at definition time. Use items=None and create the list inside instead.", code("def add(item, items=[]):", "    items.append(item)", "    return items", "", "print(add(1))", "print(add(2))")),
    typed("Write a recursive sum_list(nums) returning 0 for an empty list, otherwise the first item plus sum_list of the rest. Print sum_list([2, 3, 4]).", "", code("def sum_list(nums):", "    if not nums:", "        return 0", "    return nums[0] + sum_list(nums[1:])", "", "print(sum_list([2, 3, 4]))"), ["if not nums:", "nums[0] + sum_list(nums[1:])"], "Base case (empty → 0) plus recursive step (head + rest) prints 9."),
    typed("Try to open and print missing.txt; if FileNotFoundError occurs, print file not found instead.", "", code("try:", "    with open(\"missing.txt\") as f:", "        print(f.read())", "except FileNotFoundError:", "    print(\"file not found\")"), ["except FileNotFoundError:", "print(\"file not found\")"], "Catching the SPECIFIC exception keeps other bugs visible."),
    typed("Write parse_age(text) that returns int(text) when possible and returns None (after printing invalid age) on ValueError. Print parse_age(\"19\").", "", code("def parse_age(text):", "    try:", "        return int(text)", "    except ValueError:", "        print(\"invalid age\")", "        return None", "", "print(parse_age(\"19\"))"), ["try:", "return int(text)", "except ValueError:", "return None"], "Wrapping just the risky conversion in try/except gives a clean reusable validator; this prints 19.")
  ])
];
