# Python Source Questions

These are the user-provided Python reference questions. They are not necessarily copied directly into the final curriculum. They are used to study pacing, sequence, difficulty, question style, and concept coverage before generating the final Python question sets.

Implementation note: Python Set 1 has been generated from this pacing reference and expanded into `src/data/pythonSet1Questions.js` with 20 modules and 200 total questions. The generated questions rephrase and vary the screenshots instead of copying them directly.

## Question 1

Type: MCQ

Prompt: What is the correct file extension for Python files?

Choices:

- `.pp`
- `.pt`
- `.py`

Correct answer: `.py`

Concept taught:

- Python files commonly use the `.py` extension.
- This belongs at the very beginning of Python orientation/setup.

## Question 2

Type: MCQ

Prompt: What is a correct command line syntax for checking if Python is installed on your computer? Also checks the Python version.

Choices:

- `python --version`
- `python ##version`
- `python version`

Correct answer: `python --version`

Concept taught:

- Basic command-line verification that Python is installed.
- `--version` is a command-line flag.
- This introduces students to running Python-related commands in a terminal.

## Question 3

Type: MCQ

Prompt: What is a correct syntax to exit the Python command line interface?

Choices:

- `exit()`
- `stop()`
- `end()`

Correct answer: `exit()`

Concept taught:

- Python can be opened in an interactive command line interface.
- `exit()` leaves the Python interactive shell.
- This continues terminal orientation before writing full scripts.

## Question 4

Type: True/False

Prompt: Indentation in Python is for readability only.

Correct answer: False

Concept taught:

- Indentation is part of Python syntax.
- Python uses indentation to define code blocks.
- This is a major difference from languages that use braces for blocks.

## Question 5

Type: Complete

Prompt: Insert the missing part of the code below to output "Hello World".

Snippet:

```python
__1__("Hello World")
```

Correct answer: `print`

Concept taught:

- `print()` outputs text to the console.
- String values can be passed inside parentheses.
- This is the learner's first basic Python statement.

## Question 6

Type: Complete

Prompt: Complete the code block, print "YES" if 5 is larger than 2. Hint: remember the indentation.

Snippet:

```python
if 5 > 2:
__1__
```

Correct answer:

```python
  print("YES")
```

Concept taught:

- Basic `if` statement.
- Comparison with `>`.
- Colon after an `if` condition.
- Indented block after the condition.
- `print()` inside a conditional block.

## Question 7

Type: MCQ

Prompt: Which character is used to define a Python comment?

Choices:

- `'`
- `//`
- `#`
- `/*`

Correct answer: `#`

Concept taught:

- Python single-line comments start with `#`.
- This contrasts Python comments with JavaScript/C-style `//` and `/* */` comments.
- Comments are part of basic code readability and beginner syntax.

## Question 8

Type: Complete

Prompt: Comments in Python are written with a special character, which one?

Snippet:

```python
__1__This is a comment
```

Correct answer: `#`

Concept taught:

- Reinforces that Python comments start with `#`.
- Shows the comment character inside actual Python code.
- Converts the previous recognition question into a code-completion exercise.

## Question 9

Type: Complete

Prompt: Use a multiline string to make a multiline comment.

Snippet:

```python
__1__
This is a comment
written in
more than just one line
__2__
```

Correct answers:

- `__1__`: `"""`
- `__2__`: `"""`

Concept taught:

- Triple quotes can create a multiline string.
- Beginners often see unassigned multiline strings used like multiline comments.
- This should later be clarified: Python's true single-line comment character is `#`; triple quotes create strings.

## Question 10

Type: MCQ

Prompt: What is a correct way to declare a Python variable?

Choices:

- `var x = 5`
- `#x = 5`
- `$x = 5`
- `x = 5`

Correct answer: `x = 5`

Concept taught:

- Python variables are created by assignment.
- No `var`, `let`, or `const` keyword is needed.
- `#x = 5` is a comment, not an assignment.
- `$x = 5` is not Python variable syntax.

## Question 11

Type: True/False

Prompt: You can declare string variables with single or double quotes.

Snippet:

```python
x = "John"
# is the same as
x = 'John'
```

Correct answer: True

Concept taught:

- Python strings can use single quotes or double quotes.
- Both `"John"` and `'John'` are valid string literals.
- Reinforces variables with string values.

## Question 12

Type: True/False

Prompt: Variable names are not case-sensitive.

Snippet:

```python
a = 5
# is the same as
A = 5
```

Correct answer: False

Concept taught:

- Python variable names are case-sensitive.
- `a` and `A` are different variable names.
- This introduces naming precision before more variable rules.

## Question 13

Type: Complete

Prompt: Select the correct functions to print the data type of a variable.

Snippet:

```python
__1__(__2__(myvar))
```

Options:

- `typ`
- `type`
- `var`
- `print`
- `echo`

Correct answers:

- `__1__`: `print`
- `__2__`: `type`

Completed code:

```python
print(type(myvar))
```

Concept taught:

- `type()` returns the data type of a value or variable.
- `print()` outputs that result.
- Nested function calls are introduced in a beginner-friendly way.
- Python uses `print`, not `echo`.

## Question 14

Type: MCQ

Section title shown: Exercise: Python Variable Names

Prompt: Which is NOT a legal variable name?

Choices:

- `my-var = 20`
- `my_var = 20`
- `Myvar = 20`
- `_myvar = 20`

Correct answer: `my-var = 20`

Concept taught:

- Python variable names cannot contain hyphens.
- Underscores are allowed.
- Variable names may start with an underscore.
- Case is allowed but still case-sensitive.
- This deepens variable naming rules after assignment and case sensitivity.

## Question 15

User note: This is the kind of question style to replicate the most.

Type: Complete

Prompt: Create a variable named `carname` and assign the value `Volvo` to it.

Snippet:

```python
__1__ = __2__
```

Correct answers:

- `__1__`: `carname`
- `__2__`: `"Volvo"` or `'Volvo'`

Completed code:

```python
carname = "Volvo"
```

Concept taught:

- Creating a variable from a direct instruction.
- Assigning a string value.
- Correct variable name spelling matters.
- String values require quotes.
- This should be a heavily replicated question style for Python: plain-language task to code completion.

## Question 16

Type: Complete

Prompt: Create a variable named `x` and assign the value `50` to it.

Snippet:

```python
__1__ = __2__
```

Correct answers:

- `__1__`: `x`
- `__2__`: `50`

Completed code:

```python
x = 50
```

Concept taught:

- Creating a variable from a direct instruction.
- Assigning a numeric value.
- Numbers do not need quotes.
- Reinforces the preferred plain-language-to-code completion style.

## Question 17

Type: MCQ

Section title shown: Exercise: Python Multiple Variable Values

Prompt: What is a correct syntax to add the value `Hello World` to 3 variables in one statement?

Choices:

- `x, y, z = 'Hello World'`
- `x = y = z = 'Hello World'`
- `x|y|z = 'Hello World'`

Correct answer: `x = y = z = 'Hello World'`

Concept taught:

- Python can assign the same value to multiple variables in one statement.
- Chained assignment uses `x = y = z = value`.
- Comma assignment is for unpacking multiple values, not assigning one value to three variables this way.
- This begins the multiple-variable-values cluster.

## Question 18

Type: Complete

Prompt: Insert the correct syntax to assign values to multiple variables in one line.

Snippet:

```python
x__1__ y__1__ z = "Orange", "Banana", "Cherry"
```

Correct answer: `,`

Completed code:

```python
x, y, z = "Orange", "Banana", "Cherry"
```

Concept taught:

- Python can assign multiple values to multiple variables in one statement.
- Commas separate variable names on the left side.
- Commas separate values on the right side.
- The number of variables should match the number of values.

## Question 19

Type: MCQ

Prompt: Consider the following code. What will be the result of `a`?

Snippet:

```python
fruits = ['apple', 'banana', 'cherry']
a, b, c = fruits
print(a)
```

Choices:

- `apple`
- `banana`
- `cherry`

Correct answer: `apple`

Concept taught:

- A list can be unpacked into multiple variables.
- The first list item goes into the first variable.
- `a` receives `'apple'`.
- This asks students to trace code, not only complete syntax.

## Question 20

Type: MCQ

Note: This repeats the same concept and code pattern as Question 19.

Prompt: Consider the following code. What will be the result of `a`?

Snippet:

```python
fruits = ['apple', 'banana', 'cherry']
a, b, c = fruits
print(a)
```

Choices:

- `apple`
- `banana`
- `cherry`

Correct answer: `apple`

Concept taught:

- Reinforces list unpacking into variables.
- Reinforces that assignment order matters.
- The first variable receives the first list item.
- Repetition suggests this concept should receive multiple generated variations later.

## Question 21

Type: MCQ

Section title shown: Exercise: Python Output Variable

Prompt: Consider the following code. What will be the printed result?

Snippet:

```python
print('Hello', 'World')
```

Choices:

- `Hello, World`
- `Hello World`
- `HelloWorld`

Correct answer: `Hello World`

Concept taught:

- `print()` can receive multiple arguments.
- Python separates printed arguments with a space by default.
- The comma in the function call does not print as a comma.
- This starts the output-variable/output-formatting cluster.

## Question 22

Type: MCQ

Prompt: Consider the following code. What will be the printed result?

Snippet:

```python
a = 'Hello'
b = 'World'
print(a + b)
```

Choices:

- `a+b`
- `Hello World`
- `HelloWorld`

Correct answer: `HelloWorld`

Concept taught:

- `+` concatenates strings.
- String concatenation does not automatically add a space.
- Contrasts with `print('Hello', 'World')`, which prints a default space between arguments.

## Question 23

Type: MCQ

Prompt: Consider the following code. What will be the printed result?

Snippet:

```python
a = 4
b = 5
print(a + b)
```

Choices:

- `45`
- `9`
- `4 + 5`

Correct answer: `9`

Concept taught:

- `+` adds numbers.
- Numeric addition differs from string concatenation.
- Students must track the data type of each value before predicting output.

## Question 24

Type: MCQ

Prompt: Consider the following code. What will be the printed result?

Snippet:

```python
x = 'awesome'
def myfunc():
    x = 'fantastic'
myfunc()
print('Python is ' + x)
```

Choices:

- `Python is awesome`
- `Python is fantastic`

Correct answer: `Python is awesome`

Concept taught:

- Variable scope.
- A variable assigned inside a function is local to that function by default.
- The outer/global `x` remains `'awesome'`.
- Calling the function does not change the global variable unless explicitly using a global mutation pattern.
- This is a noticeable difficulty increase inside the variables/output cluster.

## Question 25

Type: Complete

Prompt: Insert the correct keyword to make the variable `x` belong to the global scope.

Snippet:

```python
def myfunc():
    __1__ x
    x = "fantastic"
```

Correct answer: `global`

Completed code:

```python
def myfunc():
    global x
    x = "fantastic"
```

Concept taught:

- The `global` keyword tells Python to use the global variable inside a function.
- This directly follows local vs global scope behavior.
- Students learn that changing global state is explicit in Python.

## Question 26

Type: MCQ

Section title shown: Exercise: Python Global Variable

Prompt: Consider the following code. What will be the printed result?

Snippet:

```python
x = 'awesome'
def myfunc():
    global x
    x = 'fantastic'
myfunc()
print('Python is ' + x)
```

Choices:

- `Python is awesome`
- `Python is fantastic`

Correct answer: `Python is fantastic`

Concept taught:

- `global x` makes assignments inside the function affect the global `x`.
- Calling `myfunc()` changes `x` from `'awesome'` to `'fantastic'`.
- This contrasts directly with the previous local-scope prediction question.

## Question 27

Type: MCQ

Note: This repeats the same global-scope trace question as Question 26.

Section title shown: Exercise: Python Global Variable

Prompt: Consider the following code. What will be the printed result?

Snippet:

```python
x = 'awesome'
def myfunc():
    global x
    x = 'fantastic'
myfunc()
print('Python is ' + x)
```

Choices:

- `Python is awesome`
- `Python is fantastic`

Correct answer: `Python is fantastic`

Concept taught:

- Reinforces the `global` keyword.
- Reinforces tracing code after a function call changes a global variable.
- Repetition suggests global/local scope should receive several generated variations later.

## Question 28

Type: MCQ

Section title shown: Exercise: Python Data Types

Prompt: If `x = 5`, what is a correct syntax for printing the data type of the variable `x`?

Choices:

- `print(dtype(x))`
- `print(type(x))`
- `print(x.dtype())`

Correct answer: `print(type(x))`

Concept taught:

- Starts the data-types section.
- `type(x)` returns the type of `x`.
- `print(type(x))` displays the type.
- Reinforces the earlier `print(type(myvar))` completion with a concrete variable.

## Question 29

Type: Complete

Prompt: The following code example would print the data type of `x`; what data type would that be?

Snippet:

```python
x = 5
print(type(x))

__1__
```

Correct answer: `int`

Expected printed form in Python:

```python
<class 'int'>
```

Concept taught:

- Whole numbers such as `5` are integers.
- Python's integer type is `int`.
- `type(5)` returns `<class 'int'>`.
- This asks students to interpret type output, not only write the `type()` syntax.

## Question 30

Type: Complete

Prompt: The following code example would print the data type of `x`; what data type would that be?

Snippet:

```python
x = "Hello World"
print(type(x))

__1__
```

Correct answer: `str`

Expected printed form in Python:

```python
<class 'str'>
```

Concept taught:

- Text in quotes is a string.
- Python's string type is `str`.
- `type("Hello World")` returns `<class 'str'>`.
- Reinforces type recognition with a second common value.

## Roadmap Screenshots

The user provided two navigation/sidebar screenshots showing the intended larger Python curriculum path. These are not single questions; they are the source roadmap for how future generated question sets should progress.

### Screenshot Roadmap 1: Core Python Basics

Visible topics:

- Python Intro
- Python Get Started
- Python Syntax
- Python Output
  - Print Text
  - Print Numbers
  - Code Challenge
- Python Comments
- Python Variables
- Python Data Types
- Python Numbers
- Python Casting
- Python Strings
- Python Booleans
- Python Operators
- Python Lists
- Python Tuples
- Python Sets
- Python Dictionaries
- Python If...Else
- Python Match
- Python While Loops
- Python For Loops
- Python Functions
- Python Range
- Python Arrays
- Python Iterators
- Python Modules
- Python Dates

### Screenshot Roadmap 2: Intermediate Python, OOP, and Files

Visible topics:

- Python Math
- Python JSON
- Python RegEx
- Python PIP
- Python Try...Except
- Python String Formatting
- Python None
- Python User Input
- Python VirtualEnv
- Python Classes section:
  - Python OOP
  - Python Classes/Objects
  - Python `__init__` Method
  - Python `self` Parameter
  - Python Class Properties
  - Python Class Methods
  - Python Inheritance
  - Python Polymorphism
  - Python Encapsulation
  - Python Inner Classes
- File Handling section:
  - Python File Handling
  - Python Read Files
  - Python Write/Create Files
  - Python Delete Files

### Recognized Python Question Pattern

- The path is very similar to the React curriculum approach, but starts with Python environment/file basics.
- It begins with easy recognition: file extension, version command, shell exit, indentation, comments.
- It quickly shifts to completion: fill `print`, fill `#`, fill triple quotes, assign variables.
- It heavily uses direct instruction-to-code tasks, which the user explicitly wants replicated most.
- It repeats important ideas more than once before moving on.
- It uses output prediction questions to train code tracing.
- It introduces concepts in clusters:
  - setup and syntax
  - comments
  - variables and naming
  - multiple assignment and unpacking
  - output behavior
  - data types
  - scope and `global`
- The final generated sets should expand this exact pacing, then gradually become harder with more typed code and full programs.
