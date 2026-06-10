const code = (...lines) => lines.join("\n");

// Each step is verified by executing the learner's code followed by the step's
// hidden tests (plain asserts) in a fresh Python namespace. A step passes when
// nothing raises.
export const pythonProjects = [
  {
    id: "word-frequency",
    title: "Word Frequency Analyzer",
    level: "After Set 2",
    description:
      "Build a small text-analysis tool step by step: clean text, split it into words, count them, and report the most common ones. Uses strings, lists, dicts, and loops.",
    steps: [
      {
        title: "Clean the text",
        instructions:
          "Write a function clean_text(text) that returns the text lowercased and with surrounding whitespace removed. Every analyzer starts by normalizing its input so that \"Hello\" and \"hello\" count as the same word.",
        starter: code("def clean_text(text):", "    # lowercase the text and strip surrounding spaces", "    pass"),
        tests: code(
          "assert clean_text(\"  Hello \") == \"hello\", 'clean_text(\"  Hello \") should be \"hello\"'",
          "assert clean_text(\"PYTHON\") == \"python\", 'clean_text should lowercase'",
          "assert clean_text(\"ok\") == \"ok\", 'already-clean text should pass through'"
        ),
        hint: "Chain the string methods: text.strip() removes outer spaces, .lower() lowercases. Return the result."
      },
      {
        title: "Split into words",
        instructions:
          "Write get_words(text) that cleans the text (reuse clean_text) and returns the list of words. split() with no arguments handles any amount of whitespace.",
        starter: code(
          "def clean_text(text):",
          "    return text.strip().lower()",
          "",
          "def get_words(text):",
          "    # return a list of cleaned words",
          "    pass"
        ),
        tests: code(
          "assert get_words(\"The cat the\") == [\"the\", \"cat\", \"the\"], 'words should be lowercased and split'",
          "assert get_words(\"  one   two  \") == [\"one\", \"two\"], 'extra spaces should not create empty words'",
          "assert get_words(\"solo\") == [\"solo\"], 'a single word should give a one-item list'"
        ),
        hint: "Return clean_text(text).split() — split() without arguments splits on any whitespace run."
      },
      {
        title: "Count the words",
        instructions:
          "Write count_words(words) that takes a list of words and returns a dict mapping each word to how many times it appears. Use the get-with-default counting pattern.",
        starter: code(
          "def count_words(words):",
          "    counts = {}",
          "    # fill counts so each word maps to its frequency",
          "    return counts"
        ),
        tests: code(
          "assert count_words([\"a\", \"b\", \"a\"]) == {\"a\": 2, \"b\": 1}, 'counts should reflect frequency'",
          "assert count_words([]) == {}, 'an empty list should give an empty dict'",
          "assert count_words([\"x\"]) == {\"x\": 1}, 'a single word counts once'"
        ),
        hint: "Inside a for loop: counts[word] = counts.get(word, 0) + 1."
      },
      {
        title: "Find the top word",
        instructions:
          "Write top_word(counts) that returns the word with the highest count. If the dict is empty, return None — a guard clause keeps the function safe.",
        starter: code(
          "def top_word(counts):",
          "    # return the key with the largest value, or None when empty",
          "    pass"
        ),
        tests: code(
          "assert top_word({\"a\": 2, \"b\": 5, \"c\": 1}) == \"b\", 'the highest count should win'",
          "assert top_word({}) is None, 'an empty dict should return None'",
          "assert top_word({\"only\": 1}) == \"only\", 'a single entry is the top'"
        ),
        hint: "Guard first: if not counts: return None. Then return max(counts, key=counts.get)."
      },
      {
        title: "Produce the report",
        instructions:
          "Combine everything: write report(text) that returns a list of strings formatted like \"word: count\", sorted from most frequent to least. Ties may appear in any order — the tests use unambiguous counts.",
        starter: code(
          "def clean_text(text):",
          "    return text.strip().lower()",
          "",
          "def get_words(text):",
          "    return clean_text(text).split()",
          "",
          "def count_words(words):",
          "    counts = {}",
          "    for word in words:",
          "        counts[word] = counts.get(word, 0) + 1",
          "    return counts",
          "",
          "def report(text):",
          "    # return ['word: count', ...] sorted by count, highest first",
          "    pass"
        ),
        tests: code(
          "lines = report(\"go go go py py js\")",
          "assert lines[0] == \"go: 3\", 'the most frequent word comes first'",
          "assert lines[1] == \"py: 2\", 'the second most frequent comes next'",
          "assert lines[2] == \"js: 1\", 'the least frequent comes last'",
          "assert report(\"\") == [], 'empty text gives an empty report'"
        ),
        hint: "counts = count_words(get_words(text)); pairs = sorted(counts.items(), key=lambda p: p[1], reverse=True); return [f\"{w}: {c}\" for w, c in pairs]."
      }
    ]
  },
  {
    id: "bank-account",
    title: "Bank Account Class",
    level: "After Set 4",
    description:
      "Design a BankAccount class the way production code does it: constructor state, validated deposits, a custom exception for overdrafts, a transaction history, and a friendly printout.",
    steps: [
      {
        title: "The account skeleton",
        instructions:
          "Create a BankAccount class whose __init__ takes an owner name and stores it, and starts balance at 0.",
        starter: code("class BankAccount:", "    # __init__ stores owner and starts balance at 0", "    pass"),
        tests: code(
          "acct = BankAccount(\"Aya\")",
          "assert acct.owner == \"Aya\", 'owner should be stored from the constructor argument'",
          "assert acct.balance == 0, 'balance should start at 0'"
        ),
        hint: "def __init__(self, owner): then self.owner = owner and self.balance = 0."
      },
      {
        title: "Validated deposits",
        instructions:
          "Add deposit(amount) that adds to the balance and returns the new balance. Amounts of zero or less are invalid: raise ValueError so bad input fails loudly instead of corrupting the balance.",
        starter: code(
          "class BankAccount:",
          "    def __init__(self, owner):",
          "        self.owner = owner",
          "        self.balance = 0",
          "",
          "    def deposit(self, amount):",
          "        # add to balance and return it; raise ValueError when amount <= 0",
          "        pass"
        ),
        tests: code(
          "acct = BankAccount(\"Aya\")",
          "assert acct.deposit(100) == 100, 'deposit should return the new balance'",
          "assert acct.deposit(50) == 150, 'deposits should accumulate'",
          "try:",
          "    acct.deposit(-5)",
          "    assert False, 'a negative deposit should raise ValueError'",
          "except ValueError:",
          "    pass",
          "assert acct.balance == 150, 'a rejected deposit must not change the balance'"
        ),
        hint: "Guard first: if amount <= 0: raise ValueError(\"invalid amount\"). Then self.balance += amount and return self.balance."
      },
      {
        title: "A custom overdraft exception",
        instructions:
          "Define InsufficientFunds(Exception) and add withdraw(amount) that subtracts from the balance and returns it — but raises InsufficientFunds when the amount exceeds the balance. A domain-named exception lets callers handle exactly this failure.",
        starter: code(
          "class InsufficientFunds(Exception):",
          "    pass",
          "",
          "class BankAccount:",
          "    def __init__(self, owner):",
          "        self.owner = owner",
          "        self.balance = 0",
          "",
          "    def deposit(self, amount):",
          "        if amount <= 0:",
          "            raise ValueError(\"invalid amount\")",
          "        self.balance += amount",
          "        return self.balance",
          "",
          "    def withdraw(self, amount):",
          "        # subtract and return the balance; raise InsufficientFunds when too large",
          "        pass"
        ),
        tests: code(
          "acct = BankAccount(\"Aya\")",
          "acct.deposit(100)",
          "assert acct.withdraw(40) == 60, 'withdraw should return the new balance'",
          "try:",
          "    acct.withdraw(1000)",
          "    assert False, 'overdrafts should raise InsufficientFunds'",
          "except InsufficientFunds:",
          "    pass",
          "assert acct.balance == 60, 'a rejected withdrawal must not change the balance'"
        ),
        hint: "if amount > self.balance: raise InsufficientFunds(\"not enough money\"). Otherwise subtract and return."
      },
      {
        title: "Transaction history",
        instructions:
          "Track every successful operation: start self.history as an empty list in __init__, and append (\"deposit\", amount) or (\"withdraw\", amount) tuples on success. Rejected operations must record nothing.",
        starter: code(
          "class InsufficientFunds(Exception):",
          "    pass",
          "",
          "class BankAccount:",
          "    def __init__(self, owner):",
          "        self.owner = owner",
          "        self.balance = 0",
          "        self.history = []",
          "",
          "    def deposit(self, amount):",
          "        if amount <= 0:",
          "            raise ValueError(\"invalid amount\")",
          "        self.balance += amount",
          "        # record the transaction",
          "        return self.balance",
          "",
          "    def withdraw(self, amount):",
          "        if amount > self.balance:",
          "            raise InsufficientFunds(\"not enough money\")",
          "        self.balance -= amount",
          "        # record the transaction",
          "        return self.balance"
        ),
        tests: code(
          "acct = BankAccount(\"Aya\")",
          "acct.deposit(100)",
          "acct.withdraw(30)",
          "assert acct.history == [(\"deposit\", 100), (\"withdraw\", 30)], 'history should record both operations in order'",
          "try:",
          "    acct.withdraw(999)",
          "except InsufficientFunds:",
          "    pass",
          "assert len(acct.history) == 2, 'failed operations must not be recorded'"
        ),
        hint: "After each successful balance change: self.history.append((\"deposit\", amount)) or the withdraw equivalent."
      },
      {
        title: "A readable printout",
        instructions:
          "Add __str__ returning exactly: <owner>: $<balance> (<n> transactions) — for example \"Aya: $70 (2 transactions)\". Now print(account) is genuinely useful.",
        starter: code(
          "class InsufficientFunds(Exception):",
          "    pass",
          "",
          "class BankAccount:",
          "    def __init__(self, owner):",
          "        self.owner = owner",
          "        self.balance = 0",
          "        self.history = []",
          "",
          "    def deposit(self, amount):",
          "        if amount <= 0:",
          "            raise ValueError(\"invalid amount\")",
          "        self.balance += amount",
          "        self.history.append((\"deposit\", amount))",
          "        return self.balance",
          "",
          "    def withdraw(self, amount):",
          "        if amount > self.balance:",
          "            raise InsufficientFunds(\"not enough money\")",
          "        self.balance -= amount",
          "        self.history.append((\"withdraw\", amount))",
          "        return self.balance",
          "",
          "    def __str__(self):",
          "        # return '<owner>: $<balance> (<n> transactions)'",
          "        pass"
        ),
        tests: code(
          "acct = BankAccount(\"Aya\")",
          "acct.deposit(100)",
          "acct.withdraw(30)",
          "assert str(acct) == \"Aya: $70 (2 transactions)\", f'got: {str(acct)}'"
        ),
        hint: "return f\"{self.owner}: ${self.balance} ({len(self.history)} transactions)\"."
      }
    ]
  },
  {
    id: "grade-book",
    title: "Grade Book with JSON Storage",
    level: "After Set 3",
    description:
      "Build a grade book the way real tools work: structured data, validation, statistics, and saving/loading JSON files — all running against a real (in-browser) filesystem.",
    steps: [
      {
        title: "Add students",
        instructions:
          "A grade book is a dict mapping student names to lists of grades. Write add_student(gradebook, name) that adds the name with an empty list — but leaves existing students untouched so their grades are never wiped.",
        starter: code(
          "def add_student(gradebook, name):",
          "    # add name -> [] only if the student is not already there",
          "    pass"
        ),
        tests: code(
          "book = {}",
          "add_student(book, \"Aya\")",
          "assert book == {\"Aya\": []}, 'a new student starts with no grades'",
          "book[\"Aya\"].append(90)",
          "add_student(book, \"Aya\")",
          "assert book[\"Aya\"] == [90], 'adding an existing student must not erase grades'"
        ),
        hint: "if name not in gradebook: gradebook[name] = []."
      },
      {
        title: "Record grades with validation",
        instructions:
          "Write add_grade(gradebook, name, grade) that appends a grade to the student's list. Raise ValueError when the grade is outside 0–100, and KeyError naturally signals an unknown student.",
        starter: code(
          "def add_grade(gradebook, name, grade):",
          "    # validate 0 <= grade <= 100, then append to the student's list",
          "    pass"
        ),
        tests: code(
          "book = {\"Aya\": []}",
          "add_grade(book, \"Aya\", 88)",
          "assert book[\"Aya\"] == [88], 'the grade should be recorded'",
          "try:",
          "    add_grade(book, \"Aya\", 150)",
          "    assert False, 'grades above 100 should raise ValueError'",
          "except ValueError:",
          "    pass",
          "assert book[\"Aya\"] == [88], 'invalid grades must not be recorded'"
        ),
        hint: "if not 0 <= grade <= 100: raise ValueError(\"grade out of range\"). Then gradebook[name].append(grade)."
      },
      {
        title: "Compute averages safely",
        instructions:
          "Write average(gradebook, name) returning the student's mean grade. A student with no grades should return 0 instead of crashing with ZeroDivisionError — the classic edge case.",
        starter: code(
          "def average(gradebook, name):",
          "    # mean of the student's grades; 0 when they have none",
          "    pass"
        ),
        tests: code(
          "book = {\"Aya\": [80, 90, 100], \"Omar\": []}",
          "assert average(book, \"Aya\") == 90, 'the mean of 80, 90, 100 is 90'",
          "assert average(book, \"Omar\") == 0, 'no grades should mean 0, not a crash'"
        ),
        hint: "grades = gradebook[name]; if not grades: return 0; return sum(grades) / len(grades)."
      },
      {
        title: "Find the best student",
        instructions:
          "Write best_student(gradebook) returning the name with the highest average (reuse average). Return None for an empty grade book.",
        starter: code(
          "def average(gradebook, name):",
          "    grades = gradebook[name]",
          "    if not grades:",
          "        return 0",
          "    return sum(grades) / len(grades)",
          "",
          "def best_student(gradebook):",
          "    # name with the highest average, or None when the book is empty",
          "    pass"
        ),
        tests: code(
          "book = {\"Aya\": [95, 85], \"Omar\": [70, 80]}",
          "assert best_student(book) == \"Aya\", 'Aya has the higher average'",
          "assert best_student({}) is None, 'an empty book has no best student'"
        ),
        hint: "Guard the empty case, then: return max(gradebook, key=lambda name: average(gradebook, name))."
      },
      {
        title: "Save and load as JSON",
        instructions:
          "Write save_book(gradebook, path) that writes the dict to a JSON file, and load_book(path) that reads it back. This runs against a real in-browser filesystem — the round trip must preserve the data exactly.",
        starter: code(
          "import json",
          "",
          "def save_book(gradebook, path):",
          "    # write the gradebook into the file as JSON",
          "    pass",
          "",
          "def load_book(path):",
          "    # read the file and return the parsed gradebook",
          "    pass"
        ),
        tests: code(
          "book = {\"Aya\": [90, 80], \"Omar\": [75]}",
          "save_book(book, \"grades.json\")",
          "loaded = load_book(\"grades.json\")",
          "assert loaded == book, 'the loaded book should equal the saved book'"
        ),
        hint: "save: with open(path, \"w\") as f: json.dump(gradebook, f). load: with open(path) as f: return json.load(f)."
      }
    ]
  }
];
