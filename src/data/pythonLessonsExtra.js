const code = (...lines) => lines.join("\n");

// Lessons for Python Sets 2, 3, and 4 (the intermediate sets).
// Examples are runnable in the in-browser Python runtime.
export const pythonExtraLessons = {
  // ---- Set 2: Control Flow and Collections ----
  "py2-conditions": {
    summary:
      "A condition is any expression Python can judge as True or False. Comparison operators build them: == (equal), != (not equal), <, >, <=, >=. Remember that == COMPARES while = ASSIGNS — mixing them up is the most common beginner bug. Conditions are the raw material every if statement and loop runs on.",
    points: [
      "Comparisons: ==, !=, <, >, <=, >= produce a boolean.",
      "== compares values; = assigns a value. They are not interchangeable.",
      "Comparisons can chain: 0 < x < 10 means 0 < x and x < 10."
    ],
    example: code(
      "age = 20",
      "print(age == 20)",
      "print(age != 18)",
      "print(0 < age < 65)"
    )
  },
  "py2-if-elif-else": {
    summary:
      "if runs a block when its condition is True. elif ('else if') checks another condition only if the ones above failed, and else catches everything left over. Python checks the branches top to bottom and runs the FIRST match — so order matters. Each header ends with a colon and its block is indented.",
    points: [
      "if -> elif -> else: only the first true branch runs.",
      "Put the most specific / highest-threshold condition first.",
      "else is optional and takes no condition of its own."
    ],
    example: code(
      "score = 85",
      "if score >= 90:",
      "    print(\"A\")",
      "elif score >= 80:",
      "    print(\"B\")",
      "else:",
      "    print(\"C\")"
    )
  },
  "py2-nested-ternary": {
    summary:
      "Sometimes a full if block is overkill. A conditional (ternary) expression chooses between two values on one line: value_if_true if condition else value_if_false. Logic can also nest — an if inside another if — but deep nesting hurts readability fast, so prefer flat elif chains or early exits when it grows.",
    points: [
      "Ternary shape: A if condition else B (returns a value, not a block).",
      "Great for simple two-way choices assigned to a variable.",
      "If nesting gets deep, refactor to elif or separate functions."
    ],
    example: code(
      "age = 20",
      "label = \"adult\" if age >= 18 else \"minor\"",
      "print(label)"
    )
  },
  "py2-while-loops": {
    summary:
      "A while loop repeats its body as long as a condition stays True, rechecking before every pass. The danger is the infinite loop: if nothing inside ever makes the condition False, the loop never ends. Always make sure the loop variable moves toward the stopping condition.",
    points: [
      "while condition: runs until the condition becomes False.",
      "Update the loop variable inside the body or it loops forever.",
      "while True: needs a break inside to ever stop."
    ],
    example: code(
      "i = 1",
      "while i <= 5:",
      "    print(i)",
      "    i += 1"
    )
  },
  "py2-for-range": {
    summary:
      "A for loop walks through the items of any iterable — a list, a string, or a range. range(stop) counts from 0 up to but NOT including stop; range(start, stop, step) gives full control. Use a for loop when you know what you are iterating over; use while when you loop until a condition.",
    points: [
      "for item in iterable: visits each element in turn.",
      "range(5) -> 0,1,2,3,4 (stop is excluded).",
      "range(start, stop, step) sets where to begin and how far to jump."
    ],
    example: code(
      "for n in range(1, 6):",
      "    print(n, n ** 2)",
      "",
      "for letter in \"abc\":",
      "    print(letter)"
    )
  },
  "py2-break-continue": {
    summary:
      "Two keywords steer loops. break exits the loop immediately. continue skips the rest of the current iteration and jumps to the next. pass does nothing at all — it is a placeholder where Python's syntax requires a statement but you have none. In a while loop, watch that continue does not skip the line that updates your counter.",
    points: [
      "break -> leave the loop now.",
      "continue -> skip to the next iteration.",
      "pass -> do nothing (a syntactic placeholder)."
    ],
    example: code(
      "for n in range(1, 11):",
      "    if n == 7:",
      "        break",
      "    if n % 2 == 0:",
      "        continue",
      "    print(n)"
    )
  },
  "py2-lists-basics": {
    summary:
      "A list is an ordered, changeable collection written with square brackets. Index from 0 (the first item) and use negative indexes from the end (-1 is last). Lists are MUTABLE — you can change items in place — and a key gotcha follows: assigning b = a does not copy the list; both names point at the SAME list.",
    points: [
      "fruits[0] is the first item; fruits[-1] is the last.",
      "Lists are mutable: fruits[1] = \"mango\" changes it in place.",
      "b = a shares the list; changing b also changes a."
    ],
    example: code(
      "fruits = [\"apple\", \"kiwi\", \"plum\"]",
      "print(fruits[0], fruits[-1])",
      "fruits[1] = \"mango\"",
      "print(fruits)",
      "print(len(fruits))"
    )
  },
  "py2-list-methods": {
    summary:
      "Lists carry methods that change them in place. append adds one item to the end; insert places one at an index; remove deletes by value; pop removes and RETURNS (the last item, or one at an index). extend merges another list's items in — unlike append, which would nest the whole list as a single element.",
    points: [
      "append(x) adds one item; extend(list) adds each item of another list.",
      "insert(i, x) inserts at a position; remove(x) deletes the first match.",
      "pop() removes and returns the last item; pop(i) targets an index."
    ],
    example: code(
      "nums = [1, 2]",
      "nums.append(3)",
      "nums.insert(0, 0)",
      "nums.extend([4, 5])",
      "last = nums.pop()",
      "print(nums, \"removed\", last)"
    )
  },
  "py2-slicing-sorting": {
    summary:
      "Slicing copies a section: nums[1:3] takes indexes 1 and 2 (stop excluded), nums[::-1] reverses, and nums[:] makes a shallow copy. Sorting has a famous trap: nums.sort() sorts IN PLACE and returns None, while sorted(nums) returns a NEW sorted list and leaves the original alone.",
    points: [
      "Slices: nums[start:stop:step]; stop is excluded; nums[:] copies.",
      "nums.sort() mutates and returns None — do not assign its result.",
      "sorted(nums) returns a new sorted list; add reverse=True to flip."
    ],
    example: code(
      "nums = [3, 1, 2]",
      "print(nums[::-1])",
      "ranked = sorted(nums, reverse=True)",
      "print(ranked)",
      "print(nums)"
    )
  },
  "py2-tuples": {
    summary:
      "A tuple is like a list but IMMUTABLE — once created you cannot change it. Use tuples for fixed groups of values (coordinates, records). A single-item tuple needs a trailing comma: (5,). Tuples unpack neatly into variables, which is how functions return several values at once.",
    points: [
      "point = (3, 4) is immutable; point[0] = 9 raises an error.",
      "One-item tuple: (5,) — the comma is required.",
      "Unpack with x, y = point."
    ],
    example: code(
      "point = (3, 4)",
      "x, y = point",
      "print(x, y)",
      "print(type((5,)))"
    )
  },
  "py2-sets": {
    summary:
      "A set is an unordered collection with NO duplicates. Adding a value that already exists does nothing, which makes sets perfect for de-duplication and fast membership tests. They support math operations: union (|), intersection (&), difference (-). Note {} makes an empty DICT, not a set — use set() for an empty set.",
    points: [
      "Sets drop duplicates automatically and have no order.",
      "Fast membership: x in big_set is much faster than in a list.",
      "Operations: | union, & intersection, - difference. Empty set is set()."
    ],
    example: code(
      "nums = [1, 2, 2, 3, 3, 3]",
      "unique = set(nums)",
      "print(unique)",
      "print({1, 2} | {2, 3})",
      "print(len(unique))"
    )
  },
  "py2-dicts-basics": {
    summary:
      "A dictionary maps keys to values, written with braces and key: value pairs. Read with brackets (person['name']) — but a missing key raises KeyError, so person.get('age', 0) is the safe form with a default. Assigning to a key adds it or overwrites it. Keys are unique; a duplicate key keeps only the last value.",
    points: [
      "person['name'] reads a value; KeyError if the key is missing.",
      "person.get(key, default) reads safely with a fallback.",
      "person['city'] = 'Cairo' adds or overwrites a key."
    ],
    example: code(
      "person = {\"name\": \"Aya\", \"age\": 25}",
      "print(person[\"name\"])",
      "print(person.get(\"email\", \"none\"))",
      "person[\"city\"] = \"Cairo\"",
      "print(person)"
    )
  },
  "py2-dicts-loops": {
    summary:
      "Looping a dict directly gives its KEYS. Use .values() for values and .items() for (key, value) pairs that unpack cleanly in a for loop. Dicts nest freely — a list of dicts is the everyday shape of data from APIs — and the get-with-default pattern is the classic way to count things.",
    points: [
      "for k in d: yields keys; for k, v in d.items(): yields pairs.",
      "Nested access: data['user']['city'] chains one bracket per level.",
      "Counting pattern: counts[x] = counts.get(x, 0) + 1."
    ],
    example: code(
      "scores = {\"math\": 90, \"art\": 80}",
      "for subject, score in scores.items():",
      "    print(f\"{subject}: {score}\")",
      "",
      "counts = {}",
      "for ch in \"aba\":",
      "    counts[ch] = counts.get(ch, 0) + 1",
      "print(counts)"
    )
  },
  "py2-string-methods": {
    summary:
      "Strings are IMMUTABLE, so every 'change' method returns a NEW string you must capture. The essentials: upper/lower change case, strip removes surrounding whitespace, replace swaps text, split cuts a string into a list, and join glues a list back with a separator (the separator goes first: ', '.join(items)).",
    points: [
      "Strings are immutable — text = text.replace(...) to keep the result.",
      "split() -> list; separator.join(list) -> string.",
      "upper(), lower(), strip(), startswith(), find() are workhorses."
    ],
    example: code(
      "sentence = \"learn python step by step\"",
      "words = sentence.split()",
      "print(len(words))",
      "print(\"-\".join(words))",
      "print(sentence.upper())"
    )
  },
  "py2-string-slicing": {
    summary:
      "Strings slice exactly like lists: word[1:4], word[:3], word[::-1] to reverse. f-strings format output with embedded expressions and format specs: f'{price:.2f}' always shows two decimals. The in operator checks for substrings, and multiplying a string repeats it ('ab' * 3).",
    points: [
      "word[start:stop:step]; word[::-1] reverses.",
      "f-string spec: f'{value:.2f}' -> two decimal places.",
      "'py' in 'python' is True; 'ab' * 3 -> 'ababab'."
    ],
    example: code(
      "word = \"python\"",
      "print(word[:3], word[::-1])",
      "price = 9.5",
      "print(f\"Price: {price:.2f}\")"
    )
  },
  "py2-membership-identity": {
    summary:
      "in tests membership: does a value exist inside a collection (or substring inside a string)? Identity is different: == compares VALUES, while is compares whether two names point at the SAME object in memory. Two equal lists can be == but not is. The one place you always use is: checking for None (x is None).",
    points: [
      "x in collection -> membership; works on lists, strings, dicts (keys), sets.",
      "== compares values; is compares object identity.",
      "Always test None with 'is None', never '== None'."
    ],
    example: code(
      "a = [1, 2]",
      "b = [1, 2]",
      "print(a == b)",
      "print(a is b)",
      "print(2 in a)",
      "print(a is not None)"
    )
  },
  "py2-comprehensions": {
    summary:
      "A list comprehension builds a new list in one readable line: [expression for item in iterable if condition]. The expression transforms each item; the optional trailing if filters which items are kept. It is the Pythonic replacement for the build-an-empty-list-then-append-in-a-loop pattern.",
    points: [
      "[x * 2 for x in nums] transforms every item.",
      "[x for x in nums if x > 0] filters with a trailing if.",
      "Equivalent to a loop with append, but shorter and clearer."
    ],
    example: code(
      "nums = [1, 2, 3, 4, 5]",
      "squares = [n ** 2 for n in nums]",
      "evens = [n for n in nums if n % 2 == 0]",
      "print(squares)",
      "print(evens)"
    )
  },
  "py2-loop-programs": {
    summary:
      "This module combines conditions, loops, and collections into small complete programs — summing ranges, counting matches, FizzBuzz, finding a maximum by hand, filtering, and building frequency tables. The skill is recognizing which tool the problem calls for: an accumulator, a membership test, a comprehension, or a dictionary counter.",
    points: [
      "Accumulator pattern: start at 0/[]/{}, update each iteration.",
      "Reach for the right structure: set for uniqueness, dict for counting.",
      "Type the programs by hand — assembling the pieces IS the skill."
    ],
    example: code(
      "total = 0",
      "for n in range(1, 101):",
      "    total += n",
      "print(total)",
      "",
      "word = \"programming\"",
      "vowels = sum(1 for ch in word if ch in \"aeiou\")",
      "print(vowels)"
    )
  },

  // ---- Set 3: Functions, Errors, and Files ----
  "py3-functions-basics": {
    summary:
      "A function packages reusable code under a name with def. Calling it runs the body; return hands a value back to the caller and ends the function. The key distinction: print() shows something on screen, return gives a value back to your code. A function with no return automatically returns None.",
    points: [
      "def name(): defines; name() calls. The body must be indented.",
      "return sends a value back AND exits the function.",
      "No return -> the function returns None."
    ],
    example: code(
      "def square(n):",
      "    return n * n",
      "",
      "result = square(4)",
      "print(result)"
    )
  },
  "py3-parameters": {
    summary:
      "Parameters are the placeholders in the definition; arguments are the real values you pass in. Defaults make a parameter optional (def greet(name='friend')), and keyword arguments let you pass by name in any order. Rule: parameters with defaults must come AFTER those without.",
    points: [
      "Parameter = placeholder in the def; argument = value at the call.",
      "Defaults make parameters optional: def f(x, y=10).",
      "Keyword arguments (f(y=2, x=1)) ignore positional order."
    ],
    example: code(
      "def greet(name, greeting=\"Hello\"):",
      "    return f\"{greeting}, {name}\"",
      "",
      "print(greet(\"Aya\"))",
      "print(greet(\"Bo\", greeting=\"Hi\"))"
    )
  },
  "py3-args-kwargs": {
    summary:
      "*args collects extra POSITIONAL arguments into a tuple; **kwargs collects extra KEYWORD arguments into a dict. They let a function accept any number of inputs. The same * and ** also UNPACK a list or dict back into arguments at a call site. The names args/kwargs are convention; the symbols are what matter.",
    points: [
      "def f(*args): args is a tuple of the extra positional values.",
      "def f(**kwargs): kwargs is a dict of the extra keyword values.",
      "At a call: f(*mylist) and f(**mydict) spread them back out."
    ],
    example: code(
      "def total(*nums):",
      "    return sum(nums)",
      "",
      "print(total(1, 2, 3, 4))",
      "",
      "def show(**info):",
      "    print(info)",
      "show(role=\"admin\", active=True)"
    )
  },
  "py3-return-values": {
    summary:
      "Functions can return any type — including several values at once by returning a tuple, which unpacks on the other side: low, high = min_max(nums). A guard clause (an early return for bad input) keeps the main logic flat and readable. Remember print() itself returns None, so x = print('hi') stores None.",
    points: [
      "return a, b returns a tuple; unpack with low, high = f().",
      "Guard clauses: return early on edge cases, then write the happy path.",
      "Many functions return None (print, append, list.sort)."
    ],
    example: code(
      "def min_max(nums):",
      "    return min(nums), max(nums)",
      "",
      "low, high = min_max([4, 7, 1])",
      "print(low, high)"
    )
  },
  "py3-scope": {
    summary:
      "Variables created inside a function are LOCAL and vanish when it returns. A function can READ outer (global) variables, but ASSIGNING to one inside makes a new local unless you declare global first. nonlocal targets an enclosing function's variable. Best practice: pass values in and return results out rather than leaning on globals.",
    points: [
      "Locals live only during the call; reading globals works without keywords.",
      "Assigning a global inside a function needs 'global name' first.",
      "Prefer parameters and return values over global state."
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
  "py3-lambda-hof": {
    summary:
      "A lambda is a tiny anonymous function written as an expression: lambda x: x * 2. Functions are values in Python, so you can pass them to other functions — that powers map (transform each item), filter (keep matching items), and sorted's key= (decide the sort value). Wrap map/filter in list() to see results.",
    points: [
      "lambda args: expression — a one-line nameless function.",
      "map(f, items) transforms; filter(f, items) keeps where f is true.",
      "sorted(items, key=func) sorts by what func returns."
    ],
    example: code(
      "nums = [1, 2, 3, 4]",
      "doubled = list(map(lambda n: n * 2, nums))",
      "evens = list(filter(lambda n: n % 2 == 0, nums))",
      "print(doubled, evens)",
      "",
      "words = [\"python\", \"go\", \"rust\"]",
      "print(sorted(words, key=len))"
    )
  },
  "py3-comprehensions-adv": {
    summary:
      "Comprehensions extend beyond lists. Dict comprehensions build dicts ({k: v for ...}); set comprehensions build sets ({x for ...}). An if/else BEFORE the for transforms every item; a trailing if AFTER filters. Generator expressions (round brackets) produce items lazily and feed sum/any/all without building a list.",
    points: [
      "{word: len(word) for word in words} builds a dict.",
      "Filter: [x for x in xs if cond]. Transform: [a if cond else b for x in xs].",
      "(x*x for x in xs) is a lazy generator expression."
    ],
    example: code(
      "words = [\"go\", \"python\", \"js\"]",
      "lengths = {w: len(w) for w in words}",
      "print(lengths)",
      "print(sum(len(w) for w in words))"
    )
  },
  "py3-recursion": {
    summary:
      "Recursion is a function that calls itself to solve smaller copies of a problem. Every recursion needs a BASE CASE that stops it, and each recursive call must move toward that base case. Without a base case you hit RecursionError. Many recursions can also be written as loops — pick whichever reads clearest.",
    points: [
      "Base case stops the recursion; the recursive step shrinks the problem.",
      "No reachable base case -> RecursionError.",
      "Natural for nested/self-similar data (trees, folders)."
    ],
    example: code(
      "def factorial(n):",
      "    if n <= 1:",
      "        return 1",
      "    return n * factorial(n - 1)",
      "",
      "print(factorial(5))"
    )
  },
  "py3-modules-imports": {
    summary:
      "import brings in other code. import math keeps names behind math.; from math import sqrt pulls a name in directly; import numpy as np aliases it. Any .py file you write is importable. The if __name__ == '__main__': guard makes code run only when the file is executed directly, not when imported.",
    points: [
      "import module -> module.thing; from module import thing -> thing.",
      "import long_name as short for convenient aliases.",
      "if __name__ == '__main__': runs only on direct execution."
    ],
    example: code(
      "import math",
      "from random import randint",
      "",
      "print(math.sqrt(16))",
      "print(randint(1, 6))"
    )
  },
  "py3-stdlib": {
    summary:
      "Python ships with a huge standard library — no install needed. random generates randomness (randint includes BOTH ends), math has sqrt/floor/ceil, datetime handles dates, os and pathlib handle files and paths. One trap: round() uses banker's rounding, so round(2.5) is 2, not 3.",
    points: [
      "random.randint(1, 6) includes both 1 and 6.",
      "math.floor rounds down, math.ceil rounds up.",
      "round(2.5) == 2 (banker's rounding to the nearest even)."
    ],
    example: code(
      "import random, math",
      "random.seed(42)",
      "print(random.randint(1, 6))",
      "print(math.ceil(2.1), math.floor(2.9))"
    )
  },
  "py3-exceptions": {
    summary:
      "try/except handles errors at runtime instead of crashing. Code in try is attempted; a matching except handles a specific failure. Catch SPECIFIC exceptions (ValueError), not everything. else runs only if no error occurred; finally always runs (cleanup). Keep the try block small — protect the risky line, not the whole function.",
    points: [
      "except ValueError: handle one specific error type.",
      "else runs on success; finally always runs (cleanup).",
      "Avoid bare except: — it hides bugs you did not expect."
    ],
    example: code(
      "text = \"abc\"",
      "try:",
      "    n = int(text)",
      "except ValueError:",
      "    print(\"not a number\")",
      "else:",
      "    print(n)"
    )
  },
  "py3-raise-custom": {
    summary:
      "raise throws an exception on purpose — the right move when input is invalid and continuing would hide a bug. You can raise built-ins (raise ValueError('...')) or define your own by subclassing Exception. except ... as e captures the exception object so you can read its message. Failing loudly beats returning a silently wrong result.",
    points: [
      "raise ValueError('message') signals an unrecoverable bad state.",
      "Custom exception: class EmptyCartError(Exception): pass.",
      "except SomeError as e: lets you read e (the message/object)."
    ],
    example: code(
      "def set_age(age):",
      "    if age < 0:",
      "        raise ValueError(\"age cannot be negative\")",
      "    return age",
      "",
      "try:",
      "    set_age(-5)",
      "except ValueError as e:",
      "    print(\"rejected:\", e)"
    )
  },
  "py3-files-read": {
    summary:
      "Open files with the with statement so they close automatically, even on error: with open('f.txt') as f:. f.read() returns the whole file as one string; looping the file object reads it line by line (memory-friendly for big files). A missing file raises FileNotFoundError. Use line.strip() to drop the trailing newline.",
    points: [
      "with open(path) as f: auto-closes the file.",
      "f.read() = whole file; for line in f: = line by line.",
      "Missing file -> FileNotFoundError; strip() removes the trailing newline."
    ],
    example: code(
      "with open(\"demo.txt\", \"w\") as f:",
      "    f.write(\"first line\\nsecond line\")",
      "",
      "with open(\"demo.txt\") as f:",
      "    for line in f:",
      "        print(line.strip())"
    )
  },
  "py3-files-write": {
    summary:
      "Mode matters when writing. 'w' creates or OVERWRITES (it erases existing content first); 'a' APPENDS to the end. write() adds exactly the string you give — no automatic newline, so add \\n yourself. write() needs a string, so convert numbers with str() or an f-string. The with statement still guarantees the file is closed.",
    points: [
      "'w' truncates (erases) then writes; 'a' appends to the end.",
      "write() adds no newline — include \\n yourself.",
      "write() needs a string: f.write(str(42)) or an f-string."
    ],
    example: code(
      "with open(\"log.txt\", \"w\") as f:",
      "    f.write(\"start\\n\")",
      "with open(\"log.txt\", \"a\") as f:",
      "    f.write(\"more\\n\")",
      "",
      "print(open(\"log.txt\").read())"
    )
  },
  "py3-json": {
    summary:
      "JSON is the standard format for APIs and config. json.dumps turns a Python object into a JSON STRING; json.loads parses a JSON string back into Python. The file pair drops the 's': json.dump writes to a file, json.load reads from one. JSON spells booleans lowercase (true/false) and requires double-quoted keys.",
    points: [
      "dumps/loads work with STRINGS; dump/load work with FILES.",
      "json.loads('{\"a\": 1}') -> a Python dict.",
      "JSON booleans are true/false (lowercase); keys are double-quoted."
    ],
    example: code(
      "import json",
      "user = {\"name\": \"Aya\", \"age\": 25}",
      "text = json.dumps(user)",
      "print(text)",
      "back = json.loads(text)",
      "print(back[\"name\"])"
    )
  },
  "py3-docs-hints": {
    summary:
      "A docstring is a triple-quoted string as the first line of a function, describing it — help() and editors read it. Type hints (def add(a: int, b: int) -> int) document expected types. Crucially, hints are NOT enforced at runtime; they help readers, editors, and tools like mypy. Both are documentation that lives with the code.",
    points: [
      "Docstring: \"\"\"...\"\"\" as the function's first statement.",
      "Hints: name: type for params, -> type for the return.",
      "Hints are advisory — Python does not enforce them at runtime."
    ],
    example: code(
      "def double(n: int) -> int:",
      "    \"\"\"Return n doubled.\"\"\"",
      "    return n * 2",
      "",
      "print(double(5))",
      "print(double.__doc__)"
    )
  },
  "py3-debugging": {
    summary:
      "Reading errors is a skill. A traceback's LAST line names the error type and message — read it first, then find the arrowed line that raised it. Guard clauses validate input early. assert checks an assumption and raises AssertionError if false. And print-debugging — temporarily printing values — is a legitimate, fast way to see what code actually does.",
    points: [
      "Read tracebacks bottom-up: error type and message first.",
      "Guard clauses (if not data: return) fail fast on bad input.",
      "assert condition, 'message' is a quick sanity check."
    ],
    example: code(
      "def average(nums):",
      "    if not nums:",
      "        return 0",
      "    return sum(nums) / len(nums)",
      "",
      "print(average([4, 8, 6]))",
      "print(average([]))"
    )
  },
  "py3-function-programs": {
    summary:
      "This module combines functions, errors, and files into reusable utilities: word counters, safe averages, file processors, validators that catch bad input, and recursive helpers. The recurring lesson is structure — validate at the boundary with guards or try/except, do the work in the middle, and return a clean result.",
    points: [
      "Validate at the edges (guards, try/except); compute in the middle.",
      "The get-with-default dict pattern powers most counting tasks.",
      "Watch the mutable-default-argument trap: use None, create inside."
    ],
    example: code(
      "def count_words(sentence):",
      "    counts = {}",
      "    for word in sentence.split():",
      "        counts[word] = counts.get(word, 0) + 1",
      "    return counts",
      "",
      "print(count_words(\"the cat and the hat\"))"
    )
  },

  // ---- Set 4: OOP and Professional Python ----
  "py4-classes-basics": {
    summary:
      "A class is a blueprint for objects that bundle data and behavior. __init__ runs automatically when you create an instance and sets up its data on self — the reference to that specific object. Each instance is independent: Dog('Rex') and Dog('Luna') carry their own attributes. There is no 'new' keyword; you call the class itself.",
    points: [
      "class Name: defines the blueprint; Name(...) creates an instance.",
      "__init__(self, ...) runs at construction and stores data on self.",
      "self is the current instance; each instance has its own attributes."
    ],
    example: code(
      "class Dog:",
      "    def __init__(self, name):",
      "        self.name = name",
      "",
      "rex = Dog(\"Rex\")",
      "print(rex.name)"
    )
  },
  "py4-methods-attrs": {
    summary:
      "Methods are functions defined inside a class; they take self first and act on the instance's data. Instance attributes (self.x) belong to one object; class attributes (defined in the class body) are SHARED by every instance. A mutable class attribute (like a list) shared across instances is a classic bug — create per-instance state in __init__.",
    points: [
      "Methods take self and read/write the instance via self.attr.",
      "Class attributes are shared; instance attributes are per-object.",
      "Never use a mutable class attribute as shared state — init it per instance."
    ],
    example: code(
      "class Counter:",
      "    def __init__(self):",
      "        self.count = 0",
      "    def increment(self):",
      "        self.count += 1",
      "",
      "c = Counter()",
      "c.increment(); c.increment()",
      "print(c.count)"
    )
  },
  "py4-dunder": {
    summary:
      "Dunder ('double underscore') methods let Python's built-ins work on your objects. __str__ controls what print() shows; __repr__ is the developer/debug representation; __len__ makes len() work; __eq__ defines == by value. Without __eq__, == falls back to identity, so two equal-looking objects compare as different.",
    points: [
      "__str__ -> what print/str shows (human-friendly).",
      "__repr__ -> unambiguous developer view; __len__ -> len() support.",
      "__eq__ -> value equality; without it == compares identity."
    ],
    example: code(
      "class Book:",
      "    def __init__(self, title):",
      "        self.title = title",
      "    def __str__(self):",
      "        return f\"Book: {self.title}\"",
      "",
      "print(Book(\"Dune\"))"
    )
  },
  "py4-inheritance": {
    summary:
      "Inheritance lets a child class reuse a parent's methods and attributes: class Dog(Animal). The child can OVERRIDE a method by redefining it. When the child has its own __init__, call super().__init__(...) to run the parent's setup too. Inheritance models an IS-A relationship (a Dog is an Animal).",
    points: [
      "class Child(Parent): inherits everything the parent defines.",
      "Override by redefining a method in the child.",
      "super().__init__(...) runs the parent constructor inside the child's."
    ],
    example: code(
      "class Animal:",
      "    def speak(self):",
      "        print(\"...\")",
      "",
      "class Dog(Animal):",
      "    def speak(self):",
      "        print(\"woof\")",
      "",
      "Dog().speak()"
    )
  },
  "py4-polymorphism": {
    summary:
      "Polymorphism means different classes responding to the same method name in their own way, so code can call obj.speak() without knowing the exact type. Python leans on DUCK TYPING: if an object has the method you need, it works — its declared class does not matter. isinstance() checks type at runtime and respects inheritance.",
    points: [
      "Same method name, different behavior per class — one loop fits many types.",
      "Duck typing: 'if it has the method, use it' — capability over class.",
      "isinstance(obj, Cls) is True for subclasses too."
    ],
    example: code(
      "class Dog:",
      "    def speak(self): print(\"woof\")",
      "class Cat:",
      "    def speak(self): print(\"meow\")",
      "",
      "for pet in [Dog(), Cat()]:",
      "    pet.speak()"
    )
  },
  "py4-encapsulation": {
    summary:
      "Encapsulation controls access to an object's internals. A single leading underscore (_balance) signals 'internal, please don't touch' by convention. @property turns a method into a read-like attribute (obj.area, no parentheses), and a matching setter can validate assignments. Python has no truly private attributes — it relies on convention, not enforcement.",
    points: [
      "_name signals internal use (convention, not enforced).",
      "@property exposes a computed value as an attribute (obj.area).",
      "A @x.setter validates assignments to a property."
    ],
    example: code(
      "class Square:",
      "    def __init__(self, side):",
      "        self.side = side",
      "    @property",
      "    def area(self):",
      "        return self.side ** 2",
      "",
      "print(Square(5).area)"
    )
  },
  "py4-class-static": {
    summary:
      "Not every method needs an instance. A @staticmethod takes neither self nor cls — it is a plain function grouped with the class. A @classmethod takes cls (the class) and is the standard way to write alternative constructors like Dog.from_string('Rex,3'), which build and return an instance via cls(...).",
    points: [
      "@staticmethod: no self/cls — a utility living on the class.",
      "@classmethod: receives cls; great for alternative constructors.",
      "Need self -> instance method; need cls -> classmethod; need neither -> static."
    ],
    example: code(
      "class MathUtils:",
      "    @staticmethod",
      "    def add(a, b):",
      "        return a + b",
      "",
      "print(MathUtils.add(3, 5))"
    )
  },
  "py4-dataclasses": {
    summary:
      "The @dataclass decorator auto-generates __init__, __repr__, and __eq__ from field annotations, removing boilerplate from data-holding classes. Declare fields as class-level annotations (name: str). Defaults work, but a MUTABLE default needs field(default_factory=list). frozen=True makes instances immutable and hashable.",
    points: [
      "@dataclass generates __init__/__repr__/__eq__ from annotated fields.",
      "Mutable defaults: tags: list = field(default_factory=list).",
      "frozen=True -> immutable, hashable instances."
    ],
    example: code(
      "from dataclasses import dataclass",
      "",
      "@dataclass",
      "class Product:",
      "    name: str",
      "    price: float",
      "",
      "print(Product(\"Tea\", 4.5))"
    )
  },
  "py4-generators": {
    summary:
      "A generator function uses yield instead of return, producing values one at a time and pausing between them — so it handles huge or infinite sequences in constant memory. Calling it returns a generator object that does no work until iterated. An iterator is single-use: once exhausted, looping it again yields nothing.",
    points: [
      "yield emits a value and pauses, keeping local state for next time.",
      "Generators are lazy: memory stays flat regardless of size.",
      "Iterators exhaust — loop a generator twice and the second pass is empty."
    ],
    example: code(
      "def count_to(n):",
      "    i = 1",
      "    while i <= n:",
      "        yield i",
      "        i += 1",
      "",
      "for value in count_to(4):",
      "    print(value)"
    )
  },
  "py4-decorators": {
    summary:
      "A decorator is a function that wraps another function to add behavior, applied with @name above a def. @log is shorthand for func = log(func). The wrapper usually takes *args/**kwargs so it fits any signature, and it must RETURN func's result to pass it through. Decorators power logging, timing, caching, and access checks.",
    points: [
      "@decorator above def f is sugar for f = decorator(f).",
      "Wrappers use *args/**kwargs to accept any signature.",
      "Return the wrapped call's result, or it disappears (becomes None)."
    ],
    example: code(
      "def shout(func):",
      "    def wrapper():",
      "        return func().upper()",
      "    return wrapper",
      "",
      "@shout",
      "def greet():",
      "    return \"hello\"",
      "",
      "print(greet())"
    )
  },
  "py4-context-managers": {
    summary:
      "A context manager guarantees setup and cleanup around a block via with. Python calls __enter__ when entering and __exit__ when leaving — even if an exception fires inside. That is why with open(...) reliably closes files. You can build your own with those dunder methods or with the @contextmanager generator decorator.",
    points: [
      "with obj: calls obj.__enter__() then obj.__exit__() guaranteed.",
      "Cleanup runs even on exceptions — the reason with is safe for files.",
      "as binds whatever __enter__ returns."
    ],
    example: code(
      "class Demo:",
      "    def __enter__(self):",
      "        print(\"enter\"); return self",
      "    def __exit__(self, *args):",
      "        print(\"exit\")",
      "",
      "with Demo():",
      "    print(\"inside\")"
    )
  },
  "py4-collections": {
    summary:
      "The collections module adds specialized containers. Counter counts hashable items instantly (and .most_common(n) ranks them). defaultdict gives missing keys an automatic default (defaultdict(int) starts at 0, so counts[k] += 1 never raises). namedtuple gives tuple fields names; deque offers fast appends/pops at BOTH ends.",
    points: [
      "Counter(items) -> frequency map; .most_common(1) -> the top pair.",
      "defaultdict(int) auto-starts missing keys at 0 (great for counting).",
      "namedtuple = named tuple fields; deque = fast both-ends queue."
    ],
    example: code(
      "from collections import Counter",
      "words = [\"go\", \"py\", \"go\", \"go\", \"py\"]",
      "counts = Counter(words)",
      "print(counts.most_common(1))"
    )
  },
  "py4-packages": {
    summary:
      "A package is a folder of modules (traditionally with __init__.py) that gives bigger projects structure. Dotted imports walk the folders: from utils.text import clean. The if __name__ == '__main__': guard lets a file be both an importable module and a runnable script. Importing a module runs its top-level code once.",
    points: [
      "Package = folder of modules; import with package.module paths.",
      "if __name__ == '__main__': runs only on direct execution.",
      "Importing executes a module's top-level code (keep it side-effect-free)."
    ],
    example: code(
      "def main():",
      "    print(\"app running\")",
      "",
      "if __name__ == \"__main__\":",
      "    main()"
    )
  },
  "py4-venv-pip": {
    summary:
      "A virtual environment isolates a project's packages so different projects can use different versions without conflict. python3 -m venv .venv creates one; activating it points python and pip at the project. pip install adds packages; requirements.txt records them so others can recreate the environment with pip install -r.",
    points: [
      "python3 -m venv .venv creates an isolated environment.",
      "pip install package adds to the ACTIVE environment.",
      "requirements.txt (via pip freeze) makes installs reproducible."
    ],
    example: code(
      "# terminal commands (run outside this runner):",
      "#   python3 -m venv .venv",
      "#   source .venv/bin/activate",
      "#   pip install requests",
      "#   pip freeze > requirements.txt",
      "print(\"isolation per project avoids version conflicts\")"
    )
  },
  "py4-testing": {
    summary:
      "Automated tests re-verify behavior after every change. The simplest form is assert: assert add(2, 3) == 5 raises AssertionError if it fails. pytest discovers files named test_*.py and functions named test_*. Good tests cover edge cases (empty, zero, negative), not just the happy path, and follow Arrange-Act-Assert.",
    points: [
      "assert result == expected is the core of a test.",
      "pytest auto-discovers test_*.py files and test_* functions.",
      "Test edge cases too: empty input, zero, negatives, wrong types."
    ],
    example: code(
      "def square(n):",
      "    return n * n",
      "",
      "def test_square():",
      "    assert square(3) == 9",
      "    assert square(0) == 0",
      "",
      "test_square()",
      "print(\"tests passed\")"
    )
  },
  "py4-regex": {
    summary:
      "Regular expressions match text PATTERNS. The re module's search finds the first match (or None); findall returns all matches. \\d matches a digit and + means 'one or more', so \\d+ matches whole numbers. Write patterns as raw strings (r'\\d+') so backslashes reach the regex engine intact.",
    points: [
      "re.search returns a match or None; re.findall returns all matches.",
      "\\d = digit, + = one or more, so \\d+ = a run of digits.",
      "Use raw strings: r'\\d+' avoids Python's own escape handling."
    ],
    example: code(
      "import re",
      "text = \"3 cats, 12 dogs, 1 bird\"",
      "numbers = re.findall(r\"\\d+\", text)",
      "print(numbers)"
    )
  },
  "py4-pythonic": {
    summary:
      "Pythonic style means writing code the way Python intends (PEP 8 is the style guide). enumerate gives index+item without a manual counter; zip pairs two sequences; a, b = b, a swaps without a temp; truthiness checks (if items:) beat len(items) > 0. EAFP — 'easier to ask forgiveness' — favors try/except over pre-checking everything.",
    points: [
      "enumerate(items) -> (index, item); zip(a, b) -> pairs.",
      "Swap with a, b = b, a; check emptiness with 'if items:'.",
      "EAFP: try the action, catch the exception, rather than over-checking."
    ],
    example: code(
      "items = [\"apple\", \"kiwi\", \"plum\"]",
      "for i, item in enumerate(items, 1):",
      "    print(f\"{i}. {item}\")"
    )
  },
  "py4-oop-programs": {
    summary:
      "This capstone module combines classes, inheritance, properties, dataclasses, generators, and the collections module into realistic programs — bank accounts with validation, shapes with computed properties, todo lists, and custom exceptions. The lesson is design: put state in __init__, behavior in methods, validation in guards, and reach for the structure the problem suggests.",
    points: [
      "State in __init__, behavior in methods, validation in guards/__post_init__.",
      "Inheritance for IS-A; composition (HAS-A) for swappable parts.",
      "Type the programs by hand — combining the pieces is the real skill."
    ],
    example: code(
      "class BankAccount:",
      "    def __init__(self):",
      "        self.balance = 0",
      "    def deposit(self, amount):",
      "        if amount <= 0:",
      "            raise ValueError(\"invalid amount\")",
      "        self.balance += amount",
      "",
      "acct = BankAccount()",
      "acct.deposit(100)",
      "print(acct.balance)"
    )
  }
};
