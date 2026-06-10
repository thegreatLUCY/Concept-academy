const code = (...lines) => lines.join("\n");
const setId = "python-set2";

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

export const pythonSet2Modules = [
  { id: "py2-conditions", setId, title: "Conditions and Comparisons" },
  { id: "py2-if-elif-else", setId, title: "if, elif, and else" },
  { id: "py2-nested-ternary", setId, title: "Nested Logic and Ternary Expressions" },
  { id: "py2-while-loops", setId, title: "while Loops" },
  { id: "py2-for-range", setId, title: "for Loops and range()" },
  { id: "py2-break-continue", setId, title: "break, continue, and pass" },
  { id: "py2-lists-basics", setId, title: "List Basics" },
  { id: "py2-list-methods", setId, title: "List Methods" },
  { id: "py2-slicing-sorting", setId, title: "Slicing, Sorting, and Copies" },
  { id: "py2-tuples", setId, title: "Tuples" },
  { id: "py2-sets", setId, title: "Sets" },
  { id: "py2-dicts-basics", setId, title: "Dictionary Basics" },
  { id: "py2-dicts-loops", setId, title: "Dictionary Loops and Nesting" },
  { id: "py2-string-methods", setId, title: "String Methods" },
  { id: "py2-string-slicing", setId, title: "String Slicing and Formatting" },
  { id: "py2-membership-identity", setId, title: "Membership and Identity" },
  { id: "py2-comprehensions", setId, title: "List Comprehensions" },
  { id: "py2-loop-programs", setId, title: "Loop Mini Programs" }
];

export const pythonSet2Questions = [
  ...attach("py2-conditions", [
    mcq("What does the expression 7 % 3 == 1 evaluate to?", ["True", "False", "1"], "True", "7 divided by 3 leaves remainder 1, and 1 == 1 is True."),
    mcq("What does this code print?", ["B", "A", "Nothing"], "B", "0 is falsy, so the if branch is skipped and else runs.", code("x = 0", "if x:", "    print(\"A\")", "else:", "    print(\"B\")")),
    tf("The condition if name: runs the block when name is any non-empty string.", true, "Non-empty strings are truthy; only the empty string \"\" is falsy."),
    fill("Complete the condition so people aged 18 or older pass.", "if age __1__ 18:\n    print(\"adult\")", [{ label: "__1__", answers: [">="] }], ">= includes 18 itself; > alone would wrongly exclude exactly 18."),
    mcq("Which group contains ONLY falsy values?", ["0, \"\", None, []", "0, \"0\", None", "1, \"\", []"], "0, \"\", None, []", "The string \"0\" is non-empty, so it is truthy even though it looks like zero."),
    tf("5 == 5.0 evaluates to True.", true, "Python compares the numeric values, so an int and a float can be equal."),
    mcq("What does this code print if x = 3?", ["True", "False", "SyntaxError"], "True", "Python supports chained comparisons: 1 < x < 5 means 1 < x and x < 5.", "print(1 < x < 5)"),
    fill("Complete the condition so it passes only when x is between 0 and 10 (exclusive).", "if x > 0 __1__ x < 10:", [{ label: "__1__", answers: ["and"] }], "and requires both comparisons to be True."),
    mcq("What does this code print?", ["True", "False", "Error"], "True", "True and False is False, and not False is True.", "print(not (True and False))"),
    typed("Write an if statement that prints valid when n is between 1 and 100 inclusive.", "n = 50", code("if 1 <= n <= 100:", "    print(\"valid\")"), ["print(\"valid\")"], "A chained comparison 1 <= n <= 100 reads like math; n >= 1 and n <= 100 also works.", [code("if 1 <= n <= 100:", "    print(\"valid\")"), code("if n >= 1 and n <= 100:", "    print(\"valid\")")])
  ]),
  ...attach("py2-if-elif-else", [
    mcq("Which keyword means \"otherwise, check this next condition\"?", ["elif", "elseif", "else if"], "elif", "Python uses elif, not elseif or else if."),
    fill("Complete the branching.", "if score >= 90:\n    print(\"A\")\n__1__ score >= 80:\n    print(\"B\")", [{ label: "__1__", answers: ["elif"] }], "elif adds another condition after the first if fails."),
    mcq("What does this code print?", ["big", "huge", "big then huge"], "big", "Only the FIRST true branch runs; later branches are skipped even if they are also true.", code("x = 10", "if x > 5:", "    print(\"big\")", "elif x > 8:", "    print(\"huge\")")),
    tf("An else block can have its own condition, like else x > 5:.", false, "else takes no condition; it runs only when every if and elif above it failed."),
    mcq("How many elif branches can one if chain have?", ["As many as you need", "Exactly one", "At most three"], "As many as you need", "An if chain can have zero or many elif branches and at most one else."),
    fill("Complete the fallback branch.", "if logged_in:\n    print(\"Welcome\")\n__1__:\n    print(\"Please log in\")", [{ label: "__1__", answers: ["else"] }], "else handles every case the earlier conditions did not match."),
    mcq("What does this code print if temp = 25?", ["warm", "hot", "cold"], "warm", "25 fails temp > 30, then passes temp > 20, so warm prints.", code("if temp > 30:", "    print(\"hot\")", "elif temp > 20:", "    print(\"warm\")", "else:", "    print(\"cold\")")),
    tf("After one branch in an if/elif/else chain runs, Python skips the rest of the chain.", true, "The chain picks exactly one branch (or none, if there is no else and nothing matches)."),
    mcq("Which chain is written correctly?", [code("if x > 0:", "    print(\"pos\")", "elif x < 0:", "    print(\"neg\")", "else:", "    print(\"zero\")"), code("if x > 0:", "    print(\"pos\")", "elif x < 0", "    print(\"neg\")"), code("if x > 0:", "    print(\"pos\")", "else x < 0:", "    print(\"neg\")")], code("if x > 0:", "    print(\"pos\")", "elif x < 0:", "    print(\"neg\")", "else:", "    print(\"zero\")"), "Every header needs a colon, and else takes no condition."),
    typed("Write a grade program: print A when score is 90 or more, B when 80 or more, otherwise C.", "score = 85", code("if score >= 90:", "    print(\"A\")", "elif score >= 80:", "    print(\"B\")", "else:", "    print(\"C\")"), ["if score >= 90:", "elif score >= 80:", "else:"], "Order matters: check the highest threshold first so lower grades do not steal the match.")
  ]),
  ...attach("py2-nested-ternary", [
    mcq("What does result hold if score = 5?", ["lose", "win", "True"], "lose", "The ternary picks the value after else when the condition is False.", "result = \"win\" if score > 10 else \"lose\""),
    fill("Complete the conditional expression.", "label = \"even\" __1__ x % 2 == 0 else \"odd\"", [{ label: "__1__", answers: ["if"] }], "The ternary shape is value_if_true if condition else value_if_false."),
    mcq("What does this code print?", ["inner", "outer", "Nothing"], "inner", "Both conditions are true, so the nested block runs.", code("x = 8", "if x > 5:", "    if x < 10:", "        print(\"inner\")")),
    tf("In a ternary expression, the value before if is returned when the condition is True.", true, "Python reads it as: result-if-true if condition else result-if-false."),
    mcq("What does this code print?", ["False", "ZeroDivisionError", "True"], "False", "and short-circuits: when the left side is False, the right side (1/0) is never evaluated.", "print(False and 1/0 == 1)"),
    tf("The or operator returns the first truthy operand instead of strictly True or False.", true, "That is why \"\" or \"Guest\" evaluates to \"Guest\"."),
    mcq("What does this code print?", ["Guest", "An empty line", "False"], "Guest", "name is an empty string (falsy), so or falls through to \"Guest\".", code("name = \"\"", "print(name or \"Guest\")")),
    mcq("Why is deeply nested if logic discouraged?", ["It becomes hard to read and easy to get wrong", "Python forbids more than two levels", "It always runs slower than elif"], "It becomes hard to read and easy to get wrong", "Flat elif chains or early exits are usually clearer than deep nesting."),
    fill("Complete the ternary so x gets the larger value.", "x = a if a > b else __1__", [{ label: "__1__", answers: ["b"] }], "When a > b fails, the expression returns b instead."),
    typed("Use a ternary expression to set status to adult when age is 18 or more, otherwise minor. Then print status.", "age = 20", code("status = \"adult\" if age >= 18 else \"minor\"", "print(status)"), ["if age >= 18 else", "print(status)"], "A ternary keeps a simple two-way choice on a single line.")
  ]),
  ...attach("py2-while-loops", [
    mcq("A while loop keeps running as long as its condition is...", ["truthy", "falsy", "indented"], "truthy", "The condition is rechecked before every iteration; the loop ends when it becomes falsy."),
    fill("Complete the loop so it counts 0 through 4.", "i = 0\nwhile i __1__ 5:\n    print(i)\n    i += 1", [{ label: "__1__", answers: ["<"] }], "i < 5 lets 0,1,2,3,4 through and stops at 5."),
    mcq("What does this code print?", ["0 1 2 on separate lines", "1 2 3 on separate lines", "Nothing"], "0 1 2 on separate lines", "i starts at 0 and the loop stops once i reaches 3.", code("i = 0", "while i < 3:", "    print(i)", "    i += 1")),
    tf("Forgetting to update the loop variable inside a while loop can create an infinite loop.", true, "If the condition never becomes False, the loop never stops."),
    mcq("Which line is missing to stop this loop from running forever?", ["i += 1", "print(i)", "while = False"], "i += 1", "Without incrementing i, the condition i < 3 stays True forever.", code("i = 0", "while i < 3:", "    print(i)")),
    mcq("What does this code print?", ["3 2 1 on separate lines", "1 2 3 on separate lines", "3 2 1 0 on separate lines"], "3 2 1 on separate lines", "The loop runs while n > 0 and decrements n each time.", code("n = 3", "while n > 0:", "    print(n)", "    n -= 1")),
    fill("Complete the increment shorthand.", "i = 1\nwhile i <= 3:\n    print(i)\n    i __1__ 1", [{ label: "__1__", answers: ["+="] }], "i += 1 is shorthand for i = i + 1."),
    tf("The body of while False: never runs.", true, "The condition is checked before the first iteration, so a False start skips the body entirely."),
    mcq("What happens with while True: and no break inside?", ["The loop runs forever", "Python raises a WhileError", "The loop runs exactly once"], "The loop runs forever", "while True is only safe when something inside eventually breaks out."),
    typed("Write a while loop that prints the numbers 1 through 5.", "", code("i = 1", "while i <= 5:", "    print(i)", "    i += 1"), ["while", "print(i)", "i += 1"], "Initialize before the loop, test in the header, and update inside the body.")
  ]),
  ...attach("py2-for-range", [
    mcq("What numbers does range(5) produce?", ["0, 1, 2, 3, 4", "1, 2, 3, 4, 5", "0, 1, 2, 3, 4, 5"], "0, 1, 2, 3, 4", "range starts at 0 by default and stops BEFORE the stop value."),
    mcq("What numbers does range(2, 6) produce?", ["2, 3, 4, 5", "2, 3, 4, 5, 6", "3, 4, 5, 6"], "2, 3, 4, 5", "The start is included; the stop is excluded."),
    fill("Complete the loop header.", "for i in __1__(3):\n    print(i)", [{ label: "__1__", answers: ["range"] }], "range(3) yields 0, 1, 2."),
    mcq("What does this code print?", ["1 4 7 on separate lines", "1 3 5 7 9 on separate lines", "1 4 7 10 on separate lines"], "1 4 7 on separate lines", "The third argument is the step: start at 1, jump by 3, stop before 10.", code("for n in range(1, 10, 3):", "    print(n)")),
    tf("range(1, 5) includes the number 5.", false, "The stop value is always excluded; range(1, 5) ends at 4."),
    mcq("What does this loop iterate over?", ["Each character of the string", "Each word of the string", "Nothing, strings are not iterable"], "Each character of the string", "Looping a string visits one character per iteration.", code("for ch in \"abc\":", "    print(ch)")),
    fill("Complete the loop over a list.", "fruits = [\"apple\", \"kiwi\"]\nfor fruit __1__ fruits:\n    print(fruit)", [{ label: "__1__", answers: ["in"] }], "for item in collection visits each element."),
    mcq("What does this code print?", ["6", "123", "0"], "6", "total accumulates 1, then 3, then 6 across the iterations.", code("total = 0", "for n in [1, 2, 3]:", "    total += n", "print(total)")),
    tf("range(5, 1) produces no numbers at all.", true, "With a positive default step, a start beyond the stop yields an empty range."),
    typed("Write a for loop that prints the squares of 1 through 5 (1, 4, 9, 16, 25).", "", code("for n in range(1, 6):", "    print(n ** 2)"), ["range(1, 6)", "** 2"], "range(1, 6) covers 1..5, and ** is the power operator.", [code("for n in range(1, 6):", "    print(n ** 2)"), code("for n in range(1, 6):", "    print(n * n)")])
  ]),
  ...attach("py2-break-continue", [
    mcq("What does break do inside a loop?", ["Exits the loop immediately", "Skips one iteration", "Restarts the loop from zero"], "Exits the loop immediately", "Execution continues at the first line after the loop."),
    mcq("What does continue do inside a loop?", ["Skips the rest of this iteration and starts the next one", "Stops the whole loop", "Pauses the program"], "Skips the rest of this iteration and starts the next one", "continue jumps straight back to the loop condition or next item."),
    mcq("What does this code print?", ["1 3 5 on separate lines", "2 4 on separate lines", "1 2 3 4 5 on separate lines"], "1 3 5 on separate lines", "continue skips even numbers before the print runs.", code("for n in range(1, 6):", "    if n % 2 == 0:", "        continue", "    print(n)")),
    mcq("What does this code print?", ["1 2 on separate lines", "1 2 3 on separate lines", "Nothing"], "1 2 on separate lines", "break fires when n == 3, so 3 is never printed.", code("for n in [1, 2, 3, 4]:", "    if n == 3:", "        break", "    print(n)")),
    tf("A for loop's else block runs only when the loop finished without hitting break.", true, "loop-else is Python's way to detect \"searched everything, found nothing\"."),
    fill("Complete the search so the loop stops at the first match.", "for user in users:\n    if user == \"admin\":\n        print(\"found\")\n        __1__", [{ label: "__1__", answers: ["break"] }], "break avoids scanning the rest of the list after a match."),
    mcq("What does pass do?", ["Nothing; it is a placeholder so the block is not empty", "It skips to the next iteration", "It ends the program"], "Nothing; it is a placeholder so the block is not empty", "pass exists because Python blocks cannot be empty."),
    mcq("In nested loops, what does break exit?", ["Only the innermost loop containing it", "All loops at once", "Only the outer loop"], "Only the innermost loop containing it", "To leave outer loops too, you need flags, functions with return, or restructuring."),
    tf("Using continue in a while loop before the counter update can cause an infinite loop.", true, "continue jumps back to the condition, skipping the update line below it.", code("i = 0", "while i < 5:", "    if i == 2:", "        continue", "    i += 1")),
    typed("Loop over the numbers 1 through 10 and print each, but stop the loop entirely when you reach 7 (do not print 7).", "", code("for n in range(1, 11):", "    if n == 7:", "        break", "    print(n)"), ["range(1, 11)", "if n == 7:", "break"], "The break check must come before the print, otherwise 7 sneaks through.")
  ]),
  ...attach("py2-lists-basics", [
    mcq("Which syntax creates a list?", ["fruits = [\"apple\", \"kiwi\"]", "fruits = (\"apple\", \"kiwi\")", "fruits = {\"apple\", \"kiwi\"}"], "fruits = [\"apple\", \"kiwi\"]", "Square brackets create lists; parentheses create tuples; braces create sets or dicts."),
    mcq("What does fruits[0] return?", ["The first item", "The last item", "An error; counting starts at 1"], "The first item", "List indexing starts at 0."),
    mcq("What does fruits[-1] return?", ["The last item", "The first item", "An IndexError"], "The last item", "Negative indexes count from the end: -1 is last, -2 is second to last."),
    fill("Print how many items the list holds.", "nums = [4, 8, 15]\nprint(__1__(nums))", [{ label: "__1__", answers: ["len"] }], "len() returns the number of items."),
    mcq("What does this code print?", ["['apple', 'mango', 'plum']", "['apple', 'kiwi', 'plum']", "TypeError"], "['apple', 'mango', 'plum']", "Lists are mutable: assigning to an index replaces that item.", code("fruits = [\"apple\", \"kiwi\", \"plum\"]", "fruits[1] = \"mango\"", "print(fruits)")),
    tf("A single list can hold mixed types, like [1, \"two\", 3.0].", true, "Python lists do not require all items to share one type."),
    mcq("What happens when you run print(nums[5]) on nums = [1, 2, 3]?", ["IndexError", "It prints None", "It prints 3"], "IndexError", "Reading past the end of a list raises IndexError: list index out of range."),
    mcq("Which statement is accurate?", ["Lists are mutable, strings are immutable", "Both lists and strings are immutable", "Strings are mutable, lists are immutable"], "Lists are mutable, strings are immutable", "You can change a list in place, but string \"changes\" always build new strings."),
    mcq("What does this code print?", ["[1, 2, 3]", "[1, 2]", "TypeError"], "[1, 2, 3]", "b = a copies the reference, not the list, so both names point at the SAME list.", code("a = [1, 2]", "b = a", "b.append(3)", "print(a)")),
    typed("Create a list named colors holding red, green, and blue, then print the second item.", "", code("colors = [\"red\", \"green\", \"blue\"]", "print(colors[1])"), ["colors = [", "print(colors[1])"], "Index 1 is the second item because indexing starts at 0.")
  ]),
  ...attach("py2-list-methods", [
    mcq("What does fruits.append(\"fig\") do?", ["Adds fig to the end of the list", "Adds fig to the front", "Replaces the last item"], "Adds fig to the end of the list", "append always adds exactly one item at the end."),
    mcq("What does nums.insert(1, 99) do?", ["Puts 99 at index 1, shifting later items right", "Replaces the item at index 1 with 99", "Appends 99 once at the end"], "Puts 99 at index 1, shifting later items right", "insert adds without removing anything."),
    fill("Remove apple from the list by value.", "fruits.__1__(\"apple\")", [{ label: "__1__", answers: ["remove"] }], "remove deletes the first matching value; it raises ValueError if missing."),
    mcq("What does nums.pop() do?", ["Removes AND returns the last item", "Only deletes the last item, returning nothing", "Empties the whole list"], "Removes AND returns the last item", "pop is handy when you need the removed value."),
    mcq("What does this code print?", ["10 then [20, 30]", "[20, 30] then 10", "30 then [10, 20]"], "10 then [20, 30]", "pop(0) removes and returns the FIRST item.", code("nums = [10, 20, 30]", "first = nums.pop(0)", "print(first)", "print(nums)")),
    fill("Add every item of b to the end of a.", "a.__1__(b)", [{ label: "__1__", answers: ["extend"] }], "extend merges another iterable in; append would nest the whole list as one item."),
    mcq("nums = [1, 2]. What is the difference between nums.append([3, 4]) and nums.extend([3, 4])?", ["append makes [1, 2, [3, 4]]; extend makes [1, 2, 3, 4]", "They produce the same list", "extend makes [1, 2, [3, 4]]; append makes [1, 2, 3, 4]"], "append makes [1, 2, [3, 4]]; extend makes [1, 2, 3, 4]", "append adds the list AS one nested item; extend adds each element."),
    mcq("What does nums.index(8) return for nums = [4, 8, 8, 1]?", ["1", "2", "[1, 2]"], "1", "index returns the position of the FIRST match only."),
    tf("nums.clear() removes every item, leaving an empty list.", true, "clear empties the list in place; the variable still points to the same (now empty) list."),
    typed("Start from nums = [1, 2]. Append 3, then insert 0 at the front, then print nums.", "nums = [1, 2]", code("nums.append(3)", "nums.insert(0, 0)", "print(nums)"), ["nums.append(3)", "nums.insert(0, 0)", "print(nums)"], "The result is [0, 1, 2, 3]: insert(0, value) targets the front.")
  ]),
  ...attach("py2-slicing-sorting", [
    mcq("What does nums[1:3] return for nums = [10, 20, 30, 40]?", ["[20, 30]", "[20, 30, 40]", "[10, 20, 30]"], "[20, 30]", "A slice includes the start index and excludes the stop index."),
    mcq("What does nums[:2] return for nums = [10, 20, 30]?", ["[10, 20]", "[30]", "[10, 20, 30]"], "[10, 20]", "Omitting the start means \"from the beginning\"."),
    mcq("What does nums[::2] return for nums = [1, 2, 3, 4, 5]?", ["[1, 3, 5]", "[2, 4]", "[1, 2]"], "[1, 3, 5]", "The third slice number is the step; 2 takes every second item starting from index 0."),
    mcq("What does nums[::-1] return for nums = [1, 2, 3]?", ["[3, 2, 1]", "[1, 2, 3]", "An IndexError"], "[3, 2, 1]", "A step of -1 walks the list backwards, producing a reversed copy."),
    tf("Slicing a list creates a new list instead of modifying the original.", true, "That is why copy = nums[:] is a common way to clone a list."),
    mcq("What is the key difference between nums.sort() and sorted(nums)?", ["sort() changes nums in place and returns None; sorted() returns a new sorted list", "They are identical", "sorted() changes nums in place; sort() returns a new list"], "sort() changes nums in place and returns None; sorted() returns a new sorted list", "Printing nums.sort() shows None — a classic beginner trap."),
    mcq("What does sorted([\"10\", \"9\", \"2\"]) return?", ["['10', '2', '9']", "['2', '9', '10']", "[2, 9, 10]"], "['10', '2', '9']", "Strings sort character by character, so \"10\" comes before \"2\". Convert to int for numeric order."),
    fill("Sort from largest to smallest.", "ranked = sorted(scores, __1__=True)", [{ label: "__1__", answers: ["reverse"] }], "reverse=True flips the ascending default."),
    mcq("What does this code print?", ["[3, 1, 2]", "[1, 2, 3]", "[3, 1, 2, 9]"], "[3, 1, 2]", "copy = nums[:] made an independent list, so sorting and appending touched only the copy.", code("nums = [3, 1, 2]", "copy = nums[:]", "copy.sort()", "copy.append(9)", "print(nums)")),
    typed("Given nums, build sorted_desc as a NEW list sorted from largest to smallest (without changing nums), then print it.", "nums = [3, 9, 1]", code("sorted_desc = sorted(nums, reverse=True)", "print(sorted_desc)"), ["sorted(nums, reverse=True)", "print(sorted_desc)"], "sorted() returns a new list; nums stays [3, 9, 1].")
  ]),
  ...attach("py2-tuples", [
    mcq("Which syntax creates a tuple?", ["point = (3, 4)", "point = [3, 4]", "point = {3, 4}"], "point = (3, 4)", "Parentheses (or just commas) create tuples."),
    tf("Tuples are immutable: you cannot change their items after creation.", true, "That makes tuples safe for fixed data like coordinates."),
    mcq("What happens when this code runs?", ["TypeError", "The tuple becomes (9, 4)", "Nothing"], "TypeError", "Item assignment is not supported on tuples.", code("point = (3, 4)", "point[0] = 9")),
    mcq("Which expression creates a tuple containing ONE item?", ["(\"a\",)", "(\"a\")", "tuple\"a\""], "(\"a\",)", "Without the trailing comma, (\"a\") is just the string \"a\" in parentheses."),
    fill("Unpack the tuple into two variables.", "point = (3, 4)\nx, __1__ = point", [{ label: "__1__", answers: ["y"] }], "Unpacking needs exactly as many names as the tuple has items."),
    mcq("Which methods do tuples have?", ["count and index only", "append and remove", "sort and reverse"], "count and index only", "Tuples cannot grow or shrink, so mutation methods do not exist."),
    mcq("What does this code print?", ["<class 'tuple'>", "<class 'list'>", "<class 'int'>"], "<class 'tuple'>", "Comma-separated values without brackets pack into a tuple automatically.", code("t = 1, 2", "print(type(t))")),
    tf("list(point) converts a tuple into a list you can modify.", true, "Converting is the standard way to \"edit\" tuple data: convert, change, convert back if needed."),
    mcq("Why choose a tuple over a list?", ["The data is fixed and should not be changed accidentally", "Tuples can hold more items", "Tuples are the only type dictionaries accept as values"], "The data is fixed and should not be changed accidentally", "Immutability also lets tuples be dict keys, unlike lists."),
    typed("Create a tuple point holding 3 and 4, unpack it into x and y, then print x.", "", code("point = (3, 4)", "x, y = point", "print(x)"), ["point = (3, 4)", "x, y = point", "print(x)"], "Unpacking assigns positionally: x gets 3 and y gets 4.")
  ]),
  ...attach("py2-sets", [
    mcq("What is the defining property of a set?", ["Every value appears at most once", "Items keep insertion order", "Items can be accessed by index"], "Every value appears at most once", "Sets automatically drop duplicates and have no indexing."),
    mcq("What does this code print?", ["3", "4", "{1, 2, 2, 3}"], "3", "The duplicate 2 collapses, leaving {1, 2, 3}.", "print(len({1, 2, 2, 3}))"),
    tf("You can rely on a specific order when looping over a set.", false, "Sets are unordered; never assume a stable position for items."),
    fill("Add red to the set.", "colors.__1__(\"red\")", [{ label: "__1__", answers: ["add"] }], "Sets use add, not append."),
    mcq("What is the difference between set.remove(x) and set.discard(x)?", ["remove raises KeyError when x is missing; discard does nothing", "discard raises an error; remove does not", "They are identical"], "remove raises KeyError when x is missing; discard does nothing", "Use discard when the item might legitimately be absent."),
    mcq("What does {1, 2} | {2, 3} evaluate to?", ["{1, 2, 3}", "{2}", "{1, 3}"], "{1, 2, 3}", "| is union: everything from both sets, duplicates collapsed."),
    mcq("Which operator gives the intersection of two sets (items in both)?", ["&", "|", "-"], "&", "{1, 2} & {2, 3} is {2}; minus gives the difference."),
    tf("Writing empty = {} creates an empty set.", false, "{} creates an empty DICTIONARY; use set() for an empty set."),
    mcq("Why are sets a great choice for membership checks like x in seen?", ["Set lookups are very fast even with many items", "Sets keep items sorted", "Sets allow duplicate tracking"], "Set lookups are very fast even with many items", "Checking membership in a set is much faster than scanning a long list."),
    typed("Given nums with duplicates, create unique_count holding how many distinct values it has, then print it.", "nums = [1, 2, 2, 3, 3, 3]", code("unique_count = len(set(nums))", "print(unique_count)"), ["len(set(nums))", "print(unique_count)"], "set(nums) drops duplicates; len counts what remains (3 here).")
  ]),
  ...attach("py2-dicts-basics", [
    mcq("What does a dictionary store?", ["Key-value pairs", "Only unique numbers", "Items accessed by position"], "Key-value pairs", "Each key maps to one value, like a label on a drawer."),
    mcq("How do you read the name value from person = {\"name\": \"Aya\"}?", ["person[\"name\"]", "person.name", "person(name)"], "person[\"name\"]", "Square brackets with the key read the value; dot access is for attributes, not dicts."),
    mcq("What happens when you read a key that does not exist with square brackets?", ["KeyError", "It returns None", "It returns an empty string"], "KeyError", "person[\"missing\"] raises KeyError; use .get() to avoid that."),
    mcq("What does person.get(\"age\") return when age is not in the dict?", ["None", "KeyError", "0"], "None", "get returns None (or your chosen default) instead of raising."),
    fill("Read age safely with a default of 0.", "age = person.__1__(\"age\", 0)", [{ label: "__1__", answers: ["get"] }], "get(key, default) never raises for missing keys."),
    mcq("How do you add a new key to an existing dict?", ["person[\"city\"] = \"Cairo\"", "person.append(\"city\", \"Cairo\")", "person.add(\"city\")"], "person[\"city\"] = \"Cairo\"", "Assigning to a new key creates the pair; assigning to an existing key overwrites it."),
    fill("Remove the age pair and capture its value.", "age = person.__1__(\"age\")", [{ label: "__1__", answers: ["pop"] }], "dict.pop(key) removes the pair and returns the value."),
    tf("Dictionary keys must be unique within one dict.", true, "Writing the same key twice keeps only the last value."),
    mcq("What does this code print?", ["{'a': 2}", "{'a': 1, 'a': 2}", "SyntaxError"], "{'a': 2}", "Duplicate keys in a literal silently keep the LAST value — an easy bug to miss.", "print({\"a\": 1, \"a\": 2})"),
    typed("Create a dict user with name set to Aya and age set to 25, then print the name value.", "", code("user = {\"name\": \"Aya\", \"age\": 25}", "print(user[\"name\"])"), ["user = {", "print(user[\"name\"])"], "Curly braces with key: value pairs build the dict; brackets read one value back.")
  ]),
  ...attach("py2-dicts-loops", [
    mcq("What does for key in person: iterate over?", ["The keys", "The values", "Key-value tuples"], "The keys", "Looping a dict directly yields keys; use .values() or .items() for more."),
    fill("Loop over keys and values together.", "for key, value in person.__1__():\n    print(key, value)", [{ label: "__1__", answers: ["items"] }], "items() yields (key, value) tuples that unpack cleanly."),
    mcq("Which call gives you just the values of a dict?", ["person.values()", "person.keys()", "person.items()"], "person.values()", "values() is ideal when the keys do not matter."),
    mcq("What does this code print?", ["name then age on separate lines", "Aya then 25 on separate lines", "name: Aya then age: 25"], "name then age on separate lines", "The bare loop yields keys only.", code("person = {\"name\": \"Aya\", \"age\": 25}", "for k in person:", "    print(k)")),
    mcq("How do you read Cairo from data = {\"user\": {\"city\": \"Cairo\"}}?", ["data[\"user\"][\"city\"]", "data[\"user.city\"]", "data[\"city\"]"], "data[\"user\"][\"city\"]", "Chain one bracket per nesting level."),
    mcq("What does this code print?", ["Aya then Omar on separate lines", "{'name': 'Aya'} then {'name': 'Omar'}", "name then name"], "Aya then Omar on separate lines", "Each item is a dict; user[\"name\"] reads one name per iteration.", code("users = [{\"name\": \"Aya\"}, {\"name\": \"Omar\"}]", "for user in users:", "    print(user[\"name\"])")),
    tf("The check \"name\" in person looks at keys, not values.", true, "To search values, use \"Aya\" in person.values()."),
    fill("Read the first user's name from the list of dicts.", "users = [{\"name\": \"Aya\"}]\nprint(users[0][__1__])", [{ label: "__1__", answers: ["\"name\"", "'name'"] }], "users[0] picks the dict; [\"name\"] picks the value inside it."),
    mcq("What does counts hold after this runs?", ["{'a': 2, 'b': 1}", "{'a': 1, 'b': 1}", "KeyError"], "{'a': 2, 'b': 1}", "get(letter, 0) supplies 0 the first time each key appears — the classic counting pattern.", code("counts = {}", "for letter in \"aba\":", "    counts[letter] = counts.get(letter, 0) + 1", "print(counts)")),
    typed("Loop over scores and print each pair formatted like math: 90 using an f-string.", "scores = {\"math\": 90, \"art\": 80}", code("for subject, score in scores.items():", "    print(f\"{subject}: {score}\")"), [".items()", "f\""], "items() unpacks pairs, and the f-string formats each line.")
  ]),
  ...attach("py2-string-methods", [
    mcq("What does \"hello\".upper() return?", ["HELLO", "Hello", "hello"], "HELLO", "upper() returns a new fully uppercase string."),
    mcq("What does \"  hi  \".strip() return?", ["\"hi\"", "\"hi  \"", "\"  hi\""], "\"hi\"", "strip() removes whitespace from both ends (not the middle)."),
    fill("Replace every a with o.", "text = text.__1__(\"a\", \"o\")", [{ label: "__1__", answers: ["replace"] }], "replace returns a NEW string; reassigning captures it."),
    mcq("What does \"a,b,c\".split(\",\") return?", ["['a', 'b', 'c']", "\"abc\"", "('a', 'b', 'c')"], "['a', 'b', 'c']", "split cuts the string into a list at each separator."),
    fill("Join the words with a comma and space.", "line = \", \".__1__(words)", [{ label: "__1__", answers: ["join"] }], "The separator string comes FIRST: separator.join(list)."),
    mcq("What does \"report.pdf\".startswith(\"rep\") return?", ["True", "False", "rep"], "True", "startswith/endswith return booleans, great for checks like filenames."),
    mcq("What does \"python\".find(\"z\") return?", ["-1", "0", "ValueError"], "-1", "find returns -1 for no match; index() would raise ValueError instead."),
    tf("String methods like upper() change the original string in place.", false, "Strings are immutable; every method returns a new string you must store."),
    mcq("What does this code print?", ["True", "False", "hello"], "True", "lower() normalizes case, a standard trick for case-insensitive comparison.", "print(\"Hello\".lower() == \"hello\")"),
    typed("Split the sentence into words and print how many words it has.", "sentence = \"learn python step by step\"", code("words = sentence.split()", "print(len(words))"), ["sentence.split()", "len(words)"], "split() with no argument cuts on any whitespace; this prints 5.")
  ]),
  ...attach("py2-string-slicing", [
    mcq("What does word[1:4] return for word = \"python\"?", ["yth", "pyt", "ytho"], "yth", "Indexes 1, 2, 3 are y, t, h; the stop index 4 is excluded."),
    mcq("What does word[:3] return for word = \"python\"?", ["pyt", "tho", "pyth"], "pyt", "An omitted start means from the beginning: indexes 0, 1, 2."),
    mcq("What does word[-3:] return for word = \"python\"?", ["hon", "pyt", "nohty"], "hon", "Negative start of -3 means \"the last three characters to the end\"."),
    mcq("What does \"Python\"[::-1] return?", ["nohtyP", "Python", "P"], "nohtyP", "Step -1 reads the string backwards — the idiomatic string reverse."),
    tf("The expression \"py\" in \"python\" evaluates to True.", true, "in checks substring containment for strings."),
    mcq("What does f\"{price:.2f}\" do for price = 5?", ["Formats it as 5.00", "Rounds it to 5", "Raises a ValueError"], "Formats it as 5.00", "The :.2f format spec always shows exactly two decimal places."),
    fill("Format total with exactly 2 decimal places.", "print(f\"Total: {total__1__.2f}\")", [{ label: "__1__", answers: [":"] }], "The colon starts the format spec inside an f-string placeholder."),
    mcq("What does \"ab\" * 3 evaluate to?", ["ababab", "ab3", "TypeError"], "ababab", "Multiplying a string repeats it."),
    mcq("What does \"5\" * 3 evaluate to?", ["555", "15", "TypeError"], "555", "\"5\" is a string, so * repeats it instead of doing math — convert with int() first for arithmetic."),
    typed("Set price to 9.5 and print it as Price: 9.50 using an f-string with two decimal places.", "", code("price = 9.5", "print(f\"Price: {price:.2f}\")"), ["{price:.2f}"], "The :.2f spec pads 9.5 to 9.50.")
  ]),
  ...attach("py2-membership-identity", [
    mcq("What does the in operator check?", ["Whether a value exists inside a collection", "Whether two variables share a type", "Whether a number is an integer"], "Whether a value exists inside a collection", "in works on strings, lists, tuples, sets, and dict keys."),
    mcq("What does 3 in [1, 2, 3] evaluate to?", ["True", "False", "3"], "True", "The list contains 3, so membership is True."),
    mcq("Which expression checks that banana is NOT in the basket?", ["\"banana\" not in basket", "not \"banana\" in not basket", "\"banana\" out basket"], "\"banana\" not in basket", "not in is the readable negative membership operator."),
    mcq("What is the difference between == and is?", ["== compares values; is compares identity (the same object in memory)", "They are interchangeable", "is compares values more strictly than =="], "== compares values; is compares identity (the same object in memory)", "Two equal lists can still be different objects."),
    mcq("What does this code print?", ["True then False", "True then True", "False then False"], "True then False", "The lists hold equal values (==) but are two separate objects (is).", code("a = [1, 2]", "b = [1, 2]", "print(a == b)", "print(a is b)")),
    tf("The recommended way to test for None is result is None, not result == None.", true, "None is a single object, so identity is the correct and idiomatic check."),
    fill("Complete the idiomatic None check.", "if result __1__ None:\n    print(\"no data\")", [{ label: "__1__", answers: ["is"] }], "is None reads as \"is literally the None object\"."),
    mcq("What does \"a\" in {\"a\": 1} evaluate to?", ["True", "False", "KeyError"], "True", "Membership on a dict checks its KEYS."),
    tf("The in operator works on strings, lists, tuples, sets, and dictionaries.", true, "It is one of the most universal operators in Python."),
    typed("Check whether admin is in the roles list: print yes if it is, otherwise print no.", "roles = [\"editor\", \"admin\"]", code("if \"admin\" in roles:", "    print(\"yes\")", "else:", "    print(\"no\")"), ["\"admin\" in roles", "print(\"yes\")", "print(\"no\")"], "Membership plus if/else is the everyday permission-check pattern.")
  ]),
  ...attach("py2-comprehensions", [
    mcq("What does doubled = [x * 2 for x in nums] do?", ["Builds a new list with each item doubled", "Doubles nums in place", "Prints each doubled value"], "Builds a new list with each item doubled", "A list comprehension transforms each item into a new list."),
    mcq("What does [x ** 2 for x in range(4)] evaluate to?", ["[0, 1, 4, 9]", "[1, 4, 9, 16]", "[0, 1, 2, 3]"], "[0, 1, 4, 9]", "range(4) yields 0..3 and each is squared."),
    fill("Keep only the positive numbers.", "positives = [x for x in nums __1__ x > 0]", [{ label: "__1__", answers: ["if"] }], "A trailing if filters which items are included."),
    mcq("What does [n for n in [3, -1, 4, -2] if n > 0] evaluate to?", ["[3, 4]", "[-1, -2]", "[3, -1, 4, -2]"], "[3, 4]", "Only items passing the condition are kept."),
    tf("A list comprehension creates a brand-new list and leaves the source unchanged.", true, "Comprehensions are expressions that build new collections."),
    mcq("Which loop is equivalent to squares = [n * n for n in nums]?", [code("squares = []", "for n in nums:", "    squares.append(n * n)"), code("for n in nums:", "    squares = n * n"), code("squares = []", "for n in nums:", "    squares = n * n")], code("squares = []", "for n in nums:", "    squares.append(n * n)"), "A comprehension is compressed append-in-a-loop."),
    mcq("What does [c.upper() for c in \"abc\"] evaluate to?", ["['A', 'B', 'C']", "\"ABC\"", "['abc']"], "['A', 'B', 'C']", "The comprehension visits each character and produces a LIST, not a string."),
    fill("Complete the comprehension.", "doubled = [n * 2 __1__ n in nums]", [{ label: "__1__", answers: ["for"] }], "The shape is [expression for item in iterable]."),
    mcq("Which comprehension keeps only the even numbers?", ["[n for n in nums if n % 2 == 0]", "[n if n % 2 for n in nums]", "[n for n in nums else n % 2]"], "[n for n in nums if n % 2 == 0]", "The filter clause goes at the end and must be a complete condition."),
    typed("Use a list comprehension to build squares of the numbers 1 through 5, then print it.", "", code("squares = [n ** 2 for n in range(1, 6)]", "print(squares)"), ["for n in range(1, 6)", "print(squares)"], "The output is [1, 4, 9, 16, 25].", [code("squares = [n ** 2 for n in range(1, 6)]", "print(squares)"), code("squares = [n * n for n in range(1, 6)]", "print(squares)")])
  ]),
  ...attach("py2-loop-programs", [
    typed("Use a loop to sum the numbers 1 through 100, then print the total (should be 5050).", "", code("total = 0", "for n in range(1, 101):", "    total += n", "print(total)"), ["range(1, 101)", "total += n", "print(total)"], "An accumulator starts at 0 and grows every iteration."),
    typed("Count how many vowels (a, e, i, o, u) the word contains and print the count.", "word = \"programming\"", code("count = 0", "for ch in word:", "    if ch in \"aeiou\":", "        count += 1", "print(count)"), ["for ch in word", "in \"aeiou\"", "count += 1"], "Membership in the vowel string beats writing five comparisons."),
    typed("Write FizzBuzz for 1 through 15: print Fizz for multiples of 3, Buzz for multiples of 5, FizzBuzz for both, otherwise the number.", "", code("for n in range(1, 16):", "    if n % 15 == 0:", "        print(\"FizzBuzz\")", "    elif n % 3 == 0:", "        print(\"Fizz\")", "    elif n % 5 == 0:", "        print(\"Buzz\")", "    else:", "        print(n)"), ["range(1, 16)", "FizzBuzz", "Fizz", "Buzz"], "Check the combined multiple FIRST, or plain Fizz/Buzz will steal the match."),
    typed("Find the largest number in nums WITHOUT using max(), then print it.", "nums = [4, 11, 2, 9]", code("largest = nums[0]", "for n in nums:", "    if n > largest:", "        largest = n", "print(largest)"), ["largest = nums[0]", "if n > largest:", "print(largest)"], "Seed the best-so-far with the first item, then challenge it with each value."),
    typed("Build a new list evens containing only the even numbers from nums, then print it.", "nums = [3, 8, 5, 12, 7, 2]", code("evens = [n for n in nums if n % 2 == 0]", "print(evens)"), ["% 2 == 0", "print(evens)"], "Either a comprehension or a loop with append works; the result is [8, 12, 2].", [code("evens = [n for n in nums if n % 2 == 0]", "print(evens)"), code("evens = []", "for n in nums:", "    if n % 2 == 0:", "        evens.append(n)", "print(evens)")]),
    typed("Reverse the word using slicing and print the result.", "word = \"stressed\"", code("print(word[::-1])"), ["[::-1]"], "The -1 step slice prints desserts — slicing is the cleanest reverse in Python."),
    typed("Print every key = value pair from the dict, one per line, formatted like host = localhost.", "config = {\"host\": \"localhost\", \"port\": 8080}", code("for key, value in config.items():", "    print(f\"{key} = {value}\")"), [".items()", "f\""], "items() with tuple unpacking is the standard dict-printing pattern."),
    typed("Build unique as a list of the distinct values in nums, then print how many there are.", "nums = [1, 5, 1, 5, 2]", code("unique = list(set(nums))", "print(len(unique))"), ["set(nums)", "len(unique)"], "set() collapses duplicates; converting back to list lets you keep working with it."),
    mcq("What does this code print?", ["py", "p y", "ppy"], "py", "result accumulates p then y; the continue skips only the letter x.", code("result = \"\"", "for ch in \"pxy\":", "    if ch == \"x\":", "        continue", "    result += ch", "print(result)")),
    typed("Print the 3 times table from 3 x 1 = 3 up to 3 x 5 = 15, one line per product, using an f-string.", "", code("for n in range(1, 6):", "    print(f\"3 x {n} = {3 * n}\")"), ["range(1, 6)", "f\"3 x {n} = {3 * n}\""], "The f-string computes 3 * n right inside the braces.")
  ])
];
