const code = (...lines) => lines.join("\n");
const setId = "python-set5";

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

export const pythonSet5Modules = [
  { id: "py5-unpacking", setId, title: "Advanced Unpacking" },
  { id: "py5-sorting", setId, title: "Sorting Mastery" },
  { id: "py5-itertools", setId, title: "itertools Power Tools" },
  { id: "py5-functools", setId, title: "functools: partial, lru_cache, reduce" },
  { id: "py5-generators", setId, title: "Generator Pipelines" },
  { id: "py5-dicts-sets", setId, title: "Dict and Set Mastery" },
  { id: "py5-exceptions", setId, title: "Exception Architecture" },
  { id: "py5-typing", setId, title: "Typing in Depth" },
  { id: "py5-dataclasses", setId, title: "Dataclasses in Depth" },
  { id: "py5-oop-patterns", setId, title: "ABCs and OOP Patterns" },
  { id: "py5-iterator-protocol", setId, title: "The Iterator Protocol" },
  { id: "py5-threading", setId, title: "Threads, the GIL, and Race Conditions" },
  { id: "py5-asyncio", setId, title: "asyncio Essentials" },
  { id: "py5-pathlib", setId, title: "pathlib and File Workflows" },
  { id: "py5-datetime", setId, title: "Dates, Times, and Durations" },
  { id: "py5-performance", setId, title: "Performance Thinking" },
  { id: "py5-packaging", setId, title: "Packaging and Project Hygiene" },
  { id: "py5-capstones", setId, title: "Mastery Mini Programs" }
];

export const pythonSet5Lessons = {
  "py5-unpacking": {
    summary:
      "Unpacking goes far beyond a, b = pair. A starred name absorbs the leftovers: first, *rest = items, or first, *middle, last = items. Nested structures destructure in one line: (x, y), name = point_pair. The underscore _ is the convention for values you must accept but will not use. Mastering these patterns removes a whole class of index juggling.",
    points: [
      "first, *rest = [1, 2, 3, 4] → first=1, rest=[2, 3, 4].",
      "a, *_, z = items — keep the ends, discard the middle.",
      "Function calls unpack too: f(*args_list, **kwargs_dict)."
    ],
    example: code(
      "scores = [98, 85, 91, 60, 77]",
      "best, *middle, worst = scores",
      "print(best, worst)",
      "print(middle)",
      "",
      "(x, y), label = (3, 4), \"point A\"",
      "print(x, y, label)"
    )
  },
  "py5-sorting": {
    summary:
      "sorted(items, key=func) sorts by whatever the key function returns — and because tuples compare element by element, returning a tuple gives multi-level sorting: key=lambda p: (p[\"city\"], -p[\"score\"]) sorts by city, then score descending. operator.itemgetter and attrgetter are faster, cleaner key builders. Python's sort is stable: equal keys keep their original order, so chained sorts compose predictably.",
    points: [
      "key returns the sort value; reverse=True flips everything.",
      "Tuple keys = multi-level sort; negate numbers for per-field descending.",
      "Stability: sort by the secondary key first, then the primary — order survives."
    ],
    example: code(
      "from operator import itemgetter",
      "",
      "people = [(\"Aya\", 25), (\"Bo\", 31), (\"Cy\", 25)]",
      "print(sorted(people, key=itemgetter(1)))",
      "print(sorted(people, key=lambda p: (p[1], p[0])))"
    )
  },
  "py5-itertools": {
    summary:
      "itertools is the standard library's loop toolbox — lazy, fast, composable. chain stitches iterables together; islice slices ANY iterable (even infinite ones); product replaces nested loops; combinations and permutations enumerate selections; groupby clusters consecutive equal keys (sort first!); count and cycle generate endless streams safely consumed with islice.",
    points: [
      "chain(a, b) — one stream from many; islice(gen, 5) — first five, lazily.",
      "product(colors, sizes) — every pairing, no nested loops.",
      "groupby REQUIRES sorted input — it only groups adjacent runs."
    ],
    example: code(
      "from itertools import chain, product, islice, count",
      "",
      "print(list(chain([1, 2], [3, 4])))",
      "print(list(product(\"AB\", \"xy\")))",
      "print(list(islice(count(10), 4)))"
    )
  },
  "py5-functools": {
    summary:
      "functools upgrades functions themselves. partial pre-fills arguments, manufacturing specialized functions from general ones. lru_cache memoizes: repeated calls with the same arguments return instantly from cache — recursive fibonacci goes from exponential to linear with one decorator line. reduce folds a sequence into one value, and wraps preserves a function's name and docstring through your own decorators.",
    points: [
      "double = partial(multiply, 2) — a new function with the first arg fixed.",
      "@lru_cache turns repeated pure-function calls into dictionary lookups.",
      "Use @wraps(func) inside every decorator you write."
    ],
    example: code(
      "from functools import partial, lru_cache",
      "",
      "def power(base, exp):",
      "    return base ** exp",
      "",
      "square = partial(power, exp=2)",
      "print(square(7))",
      "",
      "@lru_cache",
      "def fib(n):",
      "    return n if n < 2 else fib(n - 1) + fib(n - 2)",
      "",
      "print(fib(60))"
    )
  },
  "py5-generators": {
    summary:
      "Generators chain into lazy pipelines: each stage transforms a stream without materializing lists, so a gigabyte of lines can flow through filters in constant memory. Generator expressions feed aggregates directly — sum(x * x for x in nums) — and short-circuiting any()/all() stop at the first decisive element. yield from delegates to a sub-iterable. The mindset shift: process streams, not snapshots.",
    points: [
      "Pipeline: lines → stripped → non-empty → parsed, one element at a time.",
      "any(p > 100 for p in prices) stops at the FIRST match.",
      "yield from sub — flatten delegation without a loop."
    ],
    example: code(
      "raw = [\" 10 \", \"\", \" 20\", \"x\", \"30 \"]",
      "",
      "stripped = (s.strip() for s in raw)",
      "digits = (s for s in stripped if s.isdigit())",
      "numbers = (int(s) for s in digits)",
      "",
      "print(sum(numbers))"
    )
  },
  "py5-dicts-sets": {
    summary:
      "Modern dict mastery: the | operator merges dicts (right side wins on conflicts), setdefault inserts-and-returns a default in one step, and .keys()/.items() are live VIEWS that update with the dict and support set algebra. Sets do bulk comparison work: a <= b tests subset, a & b intersection. frozenset is an immutable, hashable set — usable as a dict key. dict.fromkeys de-duplicates while PRESERVING order, unlike set().",
    points: [
      "merged = defaults | overrides — rightmost wins.",
      "groups.setdefault(key, []).append(item) — the one-line grouper.",
      "list(dict.fromkeys(items)) — ordered de-duplication."
    ],
    example: code(
      "defaults = {\"theme\": \"light\", \"level\": 1}",
      "user = {\"level\": 7}",
      "print(defaults | user)",
      "",
      "groups = {}",
      "for word in [\"ant\", \"bee\", \"ape\"]:",
      "    groups.setdefault(word[0], []).append(word)",
      "print(groups)",
      "",
      "print(list(dict.fromkeys([3, 1, 3, 2, 1])))"
    )
  },
  "py5-exceptions": {
    summary:
      "Professional error handling is architecture, not try/except sprinkling. Define a small exception hierarchy (AppError, with ConfigError and NetworkError below it) so callers can catch at the right granularity. raise NewError(...) from original preserves the causal chain in tracebacks. try/except/else/finally each have a role: else runs only on success, keeping the protected region minimal. contextlib.suppress replaces empty excepts you actually intend.",
    points: [
      "Catch your own hierarchy's root to handle 'any error from this app'.",
      "raise ConfigError(\"bad port\") from exc — keeps the original cause visible.",
      "Keep try blocks SMALL: protect the risky line, not the whole function."
    ],
    example: code(
      "class AppError(Exception): pass",
      "class ConfigError(AppError): pass",
      "",
      "def load_port(text):",
      "    try:",
      "        return int(text)",
      "    except ValueError as exc:",
      "        raise ConfigError(f\"invalid port: {text!r}\") from exc",
      "",
      "try:",
      "    load_port(\"eighty\")",
      "except AppError as e:",
      "    print(\"handled:\", e)"
    )
  },
  "py5-typing": {
    summary:
      "Beyond basic hints lies a vocabulary for real APIs. int | None (Optional) marks maybe-missing values; list[int] and dict[str, float] parameterize containers. TypedDict gives dictionary shapes named, checkable structure. Protocol types by capability — anything with a .read() method satisfies a Reader protocol, no inheritance needed (static duck typing). TypeVar writes generic functions whose output type follows their input type.",
    points: [
      "def find(id: int) -> User | None — callers must handle the None.",
      "class Point(TypedDict): x: int; y: int — typed dict shapes.",
      "Protocol = duck typing the type checker can verify."
    ],
    example: code(
      "from typing import TypedDict",
      "",
      "class Movie(TypedDict):",
      "    title: str",
      "    year: int",
      "",
      "def describe(m: Movie) -> str:",
      "    return f\"{m['title']} ({m['year']})\"",
      "",
      "print(describe({\"title\": \"Arrival\", \"year\": 2016}))"
    )
  },
  "py5-dataclasses": {
    summary:
      "Production dataclasses go past auto-__init__. Mutable defaults need field(default_factory=list) — a bare [] default is rejected because it would be shared. frozen=True makes instances immutable and hashable; __post_init__ runs validation right after construction; asdict() converts nested dataclasses to plain dicts for JSON. order=True generates comparison operators from the field order.",
    points: [
      "tags: list[str] = field(default_factory=list) — fresh list per instance.",
      "@dataclass(frozen=True) — immutable, hashable, safe to share.",
      "__post_init__ is the validation hook: raise on bad values."
    ],
    example: code(
      "from dataclasses import dataclass, field, asdict",
      "",
      "@dataclass",
      "class Order:",
      "    customer: str",
      "    items: list = field(default_factory=list)",
      "",
      "    def __post_init__(self):",
      "        if not self.customer:",
      "            raise ValueError(\"customer required\")",
      "",
      "o = Order(\"Aya\")",
      "o.items.append(\"book\")",
      "print(asdict(o))"
    )
  },
  "py5-oop-patterns": {
    summary:
      "Abstract base classes (ABCs) define required interfaces: a class with an @abstractmethod cannot be instantiated until a subclass implements it — broken implementations fail at construction, not deep in production. Prefer composition over inheritance: a Car HAS an Engine rather than IS one; swapping parts beats reshaping family trees. Mixins add one focused capability via multiple inheritance, and NotImplementedError marks intentional gaps.",
    points: [
      "class Storage(ABC): @abstractmethod def save(self, data): ... — the contract.",
      "Composition: inject dependencies (self.engine = engine) for testability.",
      "Inheritance answers IS-A; composition answers HAS-A. Check which you mean."
    ],
    example: code(
      "from abc import ABC, abstractmethod",
      "",
      "class Storage(ABC):",
      "    @abstractmethod",
      "    def save(self, data): ...",
      "",
      "class MemoryStorage(Storage):",
      "    def __init__(self):",
      "        self.items = []",
      "    def save(self, data):",
      "        self.items.append(data)",
      "",
      "store = MemoryStorage()",
      "store.save(\"hello\")",
      "print(store.items)"
    )
  },
  "py5-iterator-protocol": {
    summary:
      "for loops are sugar over a protocol: iter(obj) calls __iter__ to get an iterator, then next() calls __next__ until StopIteration. An ITERABLE can produce iterators repeatedly (lists); an ITERATOR is single-use and exhausts — the reason a generator 'goes empty' the second time you loop it. Implement __iter__ on your classes (usually as a generator method) and they plug into for, sum, sorted, and unpacking for free.",
    points: [
      "iterable: has __iter__. iterator: has __iter__ AND __next__, runs once.",
      "Exhaustion bug: looping the same generator twice silently does nothing.",
      "def __iter__(self): yield from self._items — instant iterability."
    ],
    example: code(
      "class Countdown:",
      "    def __init__(self, start):",
      "        self.start = start",
      "    def __iter__(self):",
      "        n = self.start",
      "        while n > 0:",
      "            yield n",
      "            n -= 1",
      "",
      "print(list(Countdown(3)))",
      "print(sum(Countdown(4)))"
    )
  },
  "py5-threading": {
    summary:
      "Threads run functions concurrently — but CPython's GIL (global interpreter lock) lets only ONE thread execute Python bytecode at a time. Consequence: threads speed up I/O-bound work (waiting on network/disk releases the GIL) but NOT CPU-bound math (use multiprocessing for that). Shared mutable state invites race conditions — counter += 1 is not atomic — so guard it with a Lock. concurrent.futures.ThreadPoolExecutor is the sane high-level API.",
    points: [
      "I/O-bound → threads help. CPU-bound → GIL blocks; use processes.",
      "Race condition: two threads read-modify-write the same value, updates vanish.",
      "with lock: counter += 1 — the critical section pattern."
    ],
    example: code(
      "# Conceptual — browser Python is single-threaded.",
      "# The classic race: two threads both run counter += 1",
      "# 1) both READ 10   2) both ADD 1   3) both WRITE 11  → one update LOST.",
      "#",
      "# The fix:",
      "# with lock:",
      "#     counter += 1",
      "print(\"GIL: one thread runs Python at a time; I/O waiting releases it\")"
    )
  },
  "py5-asyncio": {
    summary:
      "asyncio is single-threaded concurrency for I/O: an event loop runs coroutines (async def functions) and switches between them at every await while one waits. await asyncio.gather(a(), b(), c()) runs awaitables concurrently — three 1-second waits finish in about 1 second total. In scripts you start the loop with asyncio.run(main()); forgetting await gives you an unrun coroutine object, the classic async bug.",
    points: [
      "async def defines a coroutine; calling it does NOT run it — awaiting does.",
      "gather = concurrency; awaiting one-by-one = sequential again.",
      "asyncio shines for many slow I/O calls, not for heavy computation."
    ],
    example: code(
      "import asyncio",
      "",
      "async def greet(name, delay):",
      "    await asyncio.sleep(delay)",
      "    print(f\"hello {name}\")",
      "",
      "async def main():",
      "    await asyncio.gather(greet(\"Aya\", 0.2), greet(\"Bo\", 0.1))",
      "",
      "# in a script you would write: asyncio.run(main())",
      "await main()"
    )
  },
  "py5-pathlib": {
    summary:
      "pathlib turns path strings into objects. The / operator joins paths readably (base / \"logs\" / \"app.log\"); read_text/write_text handle whole-file I/O in one call; .exists(), .suffix, .stem, .name answer file questions; .glob(\"*.txt\") and .rglob() find files; .mkdir(parents=True, exist_ok=True) builds directory trees safely. Prefer Path over os.path string surgery in all new code.",
    points: [
      "Path(\"data\") / \"raw\" / \"file.csv\" — joining without string concat.",
      "p.write_text(s) and p.read_text() — one-line file round trips.",
      "p.suffix == \".csv\", p.stem, p.exists() — metadata as properties."
    ],
    example: code(
      "from pathlib import Path",
      "",
      "base = Path(\"notes\")",
      "base.mkdir(exist_ok=True)",
      "file = base / \"todo.txt\"",
      "file.write_text(\"learn pathlib\")",
      "",
      "print(file.read_text())",
      "print(file.suffix, file.stem)",
      "print([p.name for p in base.glob(\"*.txt\")])"
    )
  },
  "py5-datetime": {
    summary:
      "datetime objects make time computable: subtracting two datetimes yields a timedelta, and adding timedelta(days=30) to now answers 'what date is 30 days out'. strftime FORMATS a datetime into text (%Y-%m-%d); strptime PARSES text back into a datetime. Comparisons just work (deadline < now). The professional rule: store and compute in UTC, convert to local time only for display.",
    points: [
      "delta = end - start → delta.days, delta.total_seconds().",
      "strftime = to string; strptime = from string (mnemonic: f-format, p-parse).",
      "Compute in UTC; localize at the edges."
    ],
    example: code(
      "from datetime import datetime, timedelta",
      "",
      "launch = datetime(2026, 1, 15, 9, 30)",
      "review = launch + timedelta(days=90)",
      "print(review.strftime(\"%Y-%m-%d\"))",
      "",
      "parsed = datetime.strptime(\"2026-03-01\", \"%Y-%m-%d\")",
      "print((parsed - launch).days)"
    )
  },
  "py5-performance": {
    summary:
      "Performance starts with data structure choice, not micro-tricks: membership in a list scans every element (O(n)); in a set or dict it is effectively constant (O(1)) — converting a lookup list to a set turns quadratic loops linear. Build strings with \"\".join(parts), not += in a loop. Generators keep memory flat on big streams. And measure before optimizing: timeit for snippets, profilers for programs — the bottleneck is rarely where you guess.",
    points: [
      "x in huge_list: O(n). x in huge_set: O(1). This one change fixes most slow loops.",
      "\"\".join(pieces) beats repeated string += (which recopies every time).",
      "Measure first: python -m timeit, cProfile. Guessing wastes optimization."
    ],
    example: code(
      "import timeit",
      "",
      "setup = \"items = list(range(10000)); s = set(items)\"",
      "list_time = timeit.timeit(\"9999 in items\", setup=setup, number=2000)",
      "set_time = timeit.timeit(\"9999 in s\", setup=setup, number=2000)",
      "print(f\"list lookup: {list_time:.4f}s\")",
      "print(f\"set lookup:  {set_time:.4f}s\")"
    )
  },
  "py5-packaging": {
    summary:
      "A shippable project has a shape: a src/ (or package) directory with __init__.py files, tests/ beside it, and pyproject.toml declaring metadata, dependencies, and build settings — the modern replacement for setup.py. pip install -e . installs your project editable, so imports work everywhere while you keep editing. Pin direct dependencies loosely in pyproject, lock exact versions for reproducible deploys, and version with semver: MAJOR.MINOR.PATCH.",
    points: [
      "pyproject.toml = the project's single source of truth.",
      "pip install -e . — develop against your own package like a real install.",
      "Semver: breaking.feature.fix — consumers read intent from the number."
    ],
    example: code(
      "# pyproject.toml (excerpt)",
      "# [project]",
      "# name = \"concept-tools\"",
      "# version = \"1.2.0\"",
      "# dependencies = [\"requests>=2.31\"]",
      "#",
      "# layout:",
      "# src/concept_tools/__init__.py",
      "# tests/test_core.py",
      "print(\"pyproject.toml + src layout + tests = a real project\")"
    )
  },
  "py5-capstones": {
    summary:
      "The final module combines the whole set into realistic programs: stream processing with generator pipelines, multi-key sorting of structured records, cached computation, dataclass modeling with validation, and pathlib-powered file workflows. Each exercise is the kind of utility you will actually write at work. Type them by hand — assembling the pieces is the skill.",
    points: [
      "Reach for the tool the data shape suggests: streams → generators, lookups → sets/dicts.",
      "Validate at boundaries (__post_init__, guard clauses), compute in the middle.",
      "If a loop feels clunky, an itertools/functools tool probably replaces it."
    ],
    example: code(
      "from dataclasses import dataclass",
      "",
      "@dataclass(frozen=True)",
      "class Event:",
      "    name: str",
      "    priority: int",
      "",
      "events = [Event(\"deploy\", 2), Event(\"hotfix\", 1), Event(\"retro\", 3)]",
      "for e in sorted(events, key=lambda ev: ev.priority):",
      "    print(e.name)"
    )
  }
};

export const pythonSet5Questions = [
  ...attach("py5-unpacking", [
    mcq("What does first, *rest = [1, 2, 3, 4] assign?", ["first=1, rest=[2, 3, 4]", "first=1, rest=(2, 3, 4)", "first=[1], rest=[2, 3, 4]"], "first=1, rest=[2, 3, 4]", "The starred name always collects into a LIST, regardless of the source type."),
    mcq("What does a, *mid, z = [10, 20, 30, 40, 50] give mid?", ["[20, 30, 40]", "[20, 30, 40, 50]", "20"], "[20, 30, 40]", "The ends bind first; the star absorbs whatever remains in the middle."),
    mcq("What does *parts, last = \"a-b-c\".split(\"-\") give?", ["parts=['a', 'b'], last='c'", "parts='a-b', last='c'", "An error"], "parts=['a', 'b'], last='c'", "Star-first keeps everything except the final element — great for paths and names."),
    fill("Capture the head and the tail.", "head, *__1__ = queue", [{ label: "__1__", answers: ["tail", "rest"] }], "One star per assignment; it collects the leftovers as a list."),
    tf("Two starred names are allowed in one unpacking: *a, *b = items.", false, "Exactly one star per target list — two would be ambiguous."),
    tf("If the middle is empty, a, *mid, z = [1, 2] still works, with mid == [].", true, "The star happily collects zero items."),
    mcq("What is the conventional name for a value you must unpack but will not use?", ["_ (underscore)", "null", "skip"], "_ (underscore)", "name, _, city = row tells readers the middle field is deliberately ignored."),
    mcq("What does print(*[1, 2, 3]) do?", ["Prints 1 2 3 — the list unpacks into separate arguments", "Prints [1, 2, 3]", "Errors"], "Prints 1 2 3 — the list unpacks into separate arguments", "The star in a CALL spreads a sequence into positional arguments."),
    typed("Unpack scores so best gets the first value, worst gets the last, and middle collects the rest. Print middle.", "scores = [98, 85, 91, 60]", code("best, *middle, worst = scores", "print(middle)"), ["best, *middle, worst = scores", "print(middle)"], "Prints [85, 91] — ends bound, middle collected."),
    typed("Merge dicts a and b into merged using ** unpacking inside a dict literal (b wins conflicts), then print merged.", "a = {\"x\": 1, \"y\": 2}\nb = {\"y\": 9}", code("merged = {**a, **b}", "print(merged)"), ["{**a, **b}", "print(merged)"], "Later keys override earlier ones: {'x': 1, 'y': 9}.")
  ]),
  ...attach("py5-sorting", [
    mcq("What does key= receive and return in sorted(items, key=...)?", ["Each item; it returns the value to sort BY", "Two items; it returns which is bigger", "The whole list"], "Each item; it returns the value to sort BY", "Python sorts the items by their key results — one call per item."),
    mcq("How do you sort people dicts by age?", ["sorted(people, key=lambda p: p[\"age\"])", "sorted(people, by=\"age\")", "people.sort(\"age\")"], "sorted(people, key=lambda p: p[\"age\"])", "The lambda extracts the comparable value."),
    mcq("Why does key=lambda p: (p[\"city\"], -p[\"score\"]) work for city-then-score-descending?", ["Tuples compare element by element, and negating flips numeric order", "Lambdas sort twice", "It does not work"], "Tuples compare element by element, and negating flips numeric order", "Tuple keys are the standard multi-level sort; negate for per-field descending."),
    fill("Use the fast key builder for index 1.", "from operator import __1__\nranked = sorted(pairs, key=__1__(1))", [{ label: "__1__", answers: ["itemgetter"] }], "itemgetter(1) is a faster, clearer lambda p: p[1]."),
    mcq("What does Python's sort stability guarantee?", ["Items with EQUAL keys keep their original relative order", "Sorting twice gives the same speed", "No duplicates appear"], "Items with EQUAL keys keep their original relative order", "Stability lets chained sorts compose: secondary sort first, primary second."),
    tf("To sort by name then age, you must do it in a single sorted() call — chaining two sorts breaks the order.", false, "Stability makes chaining work: sort by age first, then by name — equal names keep their age order."),
    mcq("What does max(words, key=len) return?", ["The longest word", "The length of the longest word", "An error"], "The longest word", "min/max accept the same key= as sorted."),
    mcq("What does sorted(\"banana\") return?", ["['a', 'a', 'a', 'b', 'n', 'n']", "\"aaabnn\"", "['banana']"], "['a', 'a', 'a', 'b', 'n', 'n']", "sorted always returns a LIST, whatever iterable went in — join to get a string back."),
    typed("Sort the products list of (name, price) tuples from most to least expensive and print the result.", "products = [(\"pen\", 2), (\"lamp\", 30), (\"mug\", 9)]", code("ranked = sorted(products, key=lambda p: p[1], reverse=True)", "print(ranked)"), ["key=lambda p: p[1]", "reverse=True"], "Key extracts price; reverse flips to descending — lamp, mug, pen."),
    typed("Sort people (name, age) by age ascending and, within equal ages, by name alphabetically — one sorted() call with a tuple key. Print it.", "people = [(\"Cy\", 25), (\"Aya\", 25), (\"Bo\", 21)]", code("ordered = sorted(people, key=lambda p: (p[1], p[0]))", "print(ordered)"), ["key=lambda p: (p[1], p[0])"], "Tuple key: age first, name as tiebreak — Bo, Aya, Cy.")
  ]),
  ...attach("py5-itertools", [
    mcq("What does chain([1, 2], [3, 4]) produce when consumed?", ["1, 2, 3, 4 as one lazy stream", "[[1, 2], [3, 4]]", "[(1, 3), (2, 4)]"], "1, 2, 3, 4 as one lazy stream", "chain concatenates iterables without building a combined list."),
    mcq("What is islice(generator, 5) for?", ["Taking the first 5 items of ANY iterable lazily — even infinite ones", "Slicing lists faster", "Splitting into 5 parts"], "Taking the first 5 items of ANY iterable lazily — even infinite ones", "Generators do not support [:5]; islice is the universal slicer."),
    mcq("What does product(\"AB\", \"xy\") yield?", ["('A','x'), ('A','y'), ('B','x'), ('B','y')", "('A','B'), ('x','y')", "'ABxy'"], "('A','x'), ('A','y'), ('B','x'), ('B','y')", "product is the nested loop as a single iterator."),
    mcq("What does combinations([1, 2, 3], 2) yield?", ["(1,2), (1,3), (2,3) — order ignored, no repeats", "All 9 ordered pairs", "(1,1), (2,2), (3,3)"], "(1,2), (1,3), (2,3) — order ignored, no repeats", "permutations would also include (2,1), (3,1), (3,2)."),
    tf("groupby works correctly on unsorted data, grouping all equal keys together wherever they appear.", false, "groupby only clusters ADJACENT equal keys — sort by the same key first, always."),
    fill("Build an endless counter starting at 1.", "from itertools import __1__\nids = __1__(1)", [{ label: "__1__", answers: ["count"] }], "count(1) yields 1, 2, 3... forever — pair it with islice or zip."),
    mcq("Why is zip(count(1), names) safe even though count is infinite?", ["zip stops when the SHORTEST input ends", "count secretly stops at 100", "It is not safe"], "zip stops when the SHORTEST input ends", "Infinite generators are fine as long as something finite bounds consumption."),
    mcq("Which replaces this nested loop: for c in colors: for s in sizes: ...?", ["for c, s in product(colors, sizes):", "for c, s in chain(colors, sizes):", "for c, s in groupby(colors, sizes):"], "for c, s in product(colors, sizes):", "One level of loop, every pairing — flatter code."),
    typed("Using product, print every (color, size) pair for colors ['red', 'blue'] and sizes ['S', 'M'].", "from itertools import product", code("for color, size in product([\"red\", \"blue\"], [\"S\", \"M\"]):", "    print(color, size)"), ["product([\"red\", \"blue\"], [\"S\", \"M\"])", "print(color, size)"], "Four lines of output, zero nested loops."),
    typed("Using chain, combine lists a and b into one list called both and print it.", "from itertools import chain\na = [1, 2]\nb = [3, 4]", code("both = list(chain(a, b))", "print(both)"), ["list(chain(a, b))", "print(both)"], "chain streams a then b: [1, 2, 3, 4].")
  ]),
  ...attach("py5-functools", [
    mcq("What does partial(power, exp=2) create?", ["A new function with exp pre-filled — call it with just base", "A cached version of power", "The number 2"], "A new function with exp pre-filled — call it with just base", "partial manufactures specialized functions from general ones."),
    mcq("What does @lru_cache do to a function?", ["Stores results per argument set; repeat calls return instantly from cache", "Limits it to 128 lines", "Runs it in a thread"], "Stores results per argument set; repeat calls return instantly from cache", "Memoization — the cheapest big speedup for pure functions."),
    mcq("Why does @lru_cache transform recursive fib from exponential to linear time?", ["Each fib(n) computes once; every repeat is a cache hit", "It unrolls the recursion", "It guesses the answer"], "Each fib(n) computes once; every repeat is a cache hit", "The overlapping subproblems collapse into lookups."),
    tf("@lru_cache is equally appropriate for functions whose results change between calls (like reading a live sensor).", false, "Caching assumes purity — same inputs, same output. Stale data otherwise."),
    fill("Cache the expensive function.", "from functools import __1__\n\n@__1__\ndef slow(n):\n    return n ** n", [{ label: "__1__", answers: ["lru_cache"] }], "One decorator line, dramatic speedups on repeated inputs."),
    mcq("What does reduce(lambda acc, x: acc * x, [2, 3, 4]) compute?", ["24 — it folds the list with *", "[2, 3, 4]", "9"], "24 — it folds the list with *", "reduce threads an accumulator through the sequence: ((2*3)*4)."),
    mcq("Why use @wraps(func) inside your own decorators?", ["The wrapped function keeps its __name__ and docstring", "It makes the wrapper faster", "Python requires it"], "The wrapped function keeps its __name__ and docstring", "Without it, every decorated function reports its name as 'wrapper' — debugging pain."),
    tf("lru_cache works on functions taking lists as arguments.", false, "Cached arguments must be hashable — lists are not; tuples are."),
    typed("Using partial, create double from multiply with a pre-filled first argument of 2, then print double(21).", "from functools import partial\n\ndef multiply(a, b):\n    return a * b", code("double = partial(multiply, 2)", "print(double(21))"), ["partial(multiply, 2)", "print(double(21))"], "partial fixes a=2; double(21) computes 2 * 21 = 42."),
    typed("Decorate fib with lru_cache (base case n < 2 returns n) and print fib(40).", "from functools import lru_cache", code("@lru_cache", "def fib(n):", "    return n if n < 2 else fib(n - 1) + fib(n - 2)", "", "print(fib(40))"), ["@lru_cache", "fib(n - 1) + fib(n - 2)", "print(fib(40))"], "102334155 — instant with the cache, minutes without.")
  ]),
  ...attach("py5-generators", [
    mcq("What is the defining property of a generator pipeline?", ["Each stage processes ONE item at a time — constant memory for any input size", "It runs in parallel", "It sorts as it goes"], "Each stage processes ONE item at a time — constant memory for any input size", "Streams flow through; nothing materializes until you consume."),
    mcq("What does sum(x * x for x in range(1000000)) avoid versus sum([x * x for ...])?", ["Building a million-element list in memory", "The multiplication", "Integer overflow"], "Building a million-element list in memory", "A generator expression feeds sum lazily — brackets would allocate it all."),
    mcq("When does any(price > 100 for price in prices) stop?", ["At the FIRST price over 100", "After checking everything", "After 100 items"], "At the FIRST price over 100", "any/all short-circuit — often the cheapest search you can write."),
    mcq("What does all(u.active for u in users) return for an EMPTY users list?", ["True — vacuously, nothing failed", "False", "An error"], "True — vacuously, nothing failed", "all([]) is True and any([]) is False — worth memorizing."),
    fill("Delegate to the sub-iterable.", "def flatten(rows):\n    for row in rows:\n        yield __1__ row", [{ label: "__1__", answers: ["from"] }], "yield from row emits each of the row's items — delegation without an inner loop."),
    tf("A generator can be iterated twice; the second pass repeats the values.", false, "Generators exhaust — the second loop gets nothing, silently. Re-create or store as a list."),
    mcq("Three generator stages are defined but nothing printed yet. When does work happen?", ["Only when something CONSUMES the final stage (sum, list, for)", "Immediately at definition", "When Python exits"], "Only when something CONSUMES the final stage (sum, list, for)", "Pipelines are blueprints; consumption is execution."),
    mcq("Which consumes a pipeline of numbers into their total?", ["sum(numbers)", "numbers.sum()", "total(numbers)"], "sum(numbers)", "Aggregates (sum, max, sorted) drive lazy pipelines to completion."),
    typed("Build a pipeline over lines: strip each, keep the non-empty ones, and print how many survive (use generator expressions, not lists).", "lines = [\" a \", \"\", \"b\", \"  \", \"c \"]", code("stripped = (line.strip() for line in lines)", "non_empty = (line for line in stripped if line)", "print(sum(1 for _ in non_empty))"), ["for line in lines)", "if line)", "sum(1 for"], "Three lazy stages, one consuming sum — prints 3."),
    typed("Write a generator function evens(nums) that yields only even numbers, then print list(evens([1, 2, 3, 4, 6])).", "", code("def evens(nums):", "    for n in nums:", "        if n % 2 == 0:", "            yield n", "", "print(list(evens([1, 2, 3, 4, 6])))"), ["def evens(nums):", "yield n", "list(evens([1, 2, 3, 4, 6]))"], "A filtering generator — prints [2, 4, 6].")
  ]),
  ...attach("py5-dicts-sets", [
    mcq("What does {\"a\": 1, \"b\": 2} | {\"b\": 9} evaluate to?", ["{'a': 1, 'b': 9} — the right side wins conflicts", "{'a': 1, 'b': 2}", "An error"], "{'a': 1, 'b': 9} — the right side wins conflicts", "The | merge operator: defaults | overrides is the idiom."),
    mcq("What does groups.setdefault(key, []).append(item) do?", ["Creates the list for a new key if needed, then appends — one line", "Replaces the list each time", "Raises KeyError on new keys"], "Creates the list for a new key if needed, then appends — one line", "setdefault returns the existing OR newly inserted value."),
    mcq("How does list(dict.fromkeys(items)) differ from list(set(items))?", ["fromkeys preserves first-seen ORDER while de-duplicating", "fromkeys is always slower", "set keeps order, fromkeys does not"], "fromkeys preserves first-seen ORDER while de-duplicating", "Dicts remember insertion order; sets promise none."),
    tf("d.keys() returns a frozen snapshot that ignores later changes to the dict.", false, "Views are LIVE — add a key and existing views show it."),
    mcq("What does a.keys() & b.keys() compute?", ["The keys present in BOTH dicts", "Merged keys", "A boolean"], "The keys present in BOTH dicts", "Dict views support set algebra directly — no conversion needed."),
    fill("Test that small is fully contained in big.", "small = {1, 2}\nbig = {1, 2, 3}\nprint(small __1__ big)", [{ label: "__1__", answers: ["<=", "<"] }], "<= is the subset operator (and < is proper subset)."),
    mcq("Why does frozenset exist?", ["An immutable set is hashable — usable as a dict key or inside another set", "It is faster than set", "It keeps order"], "An immutable set is hashable — usable as a dict key or inside another set", "Mutable sets cannot be hashed; frozen ones can."),
    mcq("What does d.get(\"missing\") do versus d[\"missing\"]?", ["get returns None (or a default); brackets raise KeyError", "Both raise", "get deletes the key"], "get returns None (or a default); brackets raise KeyError", "Choose by intent: silent default vs loud failure."),
    typed("Group the words by their first letter into a dict named groups using setdefault, then print groups.", "words = [\"ant\", \"bee\", \"ape\", \"bat\"]", code("groups = {}", "for word in words:", "    groups.setdefault(word[0], []).append(word)", "print(groups)"), ["setdefault(word[0], [])", ".append(word)", "print(groups)"], "{'a': ['ant', 'ape'], 'b': ['bee', 'bat']} — the canonical grouping pattern."),
    typed("De-duplicate nums while PRESERVING order using dict.fromkeys, store in unique, and print it.", "nums = [3, 1, 3, 2, 1]", code("unique = list(dict.fromkeys(nums))", "print(unique)"), ["dict.fromkeys(nums)", "print(unique)"], "[3, 1, 2] — order kept, duplicates gone (set() would not promise the order).")
  ]),
  ...attach("py5-exceptions", [
    mcq("Why define a custom exception HIERARCHY (AppError with ConfigError, NetworkError below it)?", ["Callers can catch broadly (AppError) or precisely (ConfigError) as needed", "Python requires three exception classes", "It makes errors faster"], "Callers can catch broadly (AppError) or precisely (ConfigError) as needed", "Granularity becomes the CALLER'S choice — the mark of a designed API."),
    mcq("What does raise ConfigError(\"bad port\") from exc preserve?", ["The original exception as the visible CAUSE in the traceback", "The program's speed", "The local variables"], "The original exception as the visible CAUSE in the traceback", "Tracebacks show 'The above exception was the direct cause...' — debugging gold."),
    mcq("Catching ValueError when code raises ConfigError(AppError) does what?", ["Nothing — the exception flies past uncaught", "Catches it anyway", "Converts it"], "Nothing — the exception flies past uncaught", "except matches by ISA relationship — unrelated types never match."),
    fill("Chain the cause.", "except ValueError as exc:\n    raise ConfigError(\"invalid port\") __1__ exc", [{ label: "__1__", answers: ["from"] }], "raise ... from links the new error to its origin."),
    tf("Wrapping an entire 50-line function body in one try/except is the recommended defensive style.", false, "Protect the RISKY line(s) only — giant try blocks hide which operation failed and swallow unrelated bugs."),
    tf("except (TypeError, ValueError) handles either type in one block.", true, "A tuple of types is the multi-catch syntax."),
    mcq("When does try's else block run?", ["Only when the try block raised nothing", "Always", "Only after except"], "Only when the try block raised nothing", "else keeps success-path code OUT of the protected region."),
    mcq("What is contextlib.suppress(FileNotFoundError) for?", ["Intentionally ignoring one expected exception, readably", "Hiding all errors", "Logging errors"], "Intentionally ignoring one expected exception, readably", "with suppress(...) replaces try/except/pass — explicit intent."),
    typed("Define DataError(Exception) and parse_row(text) that raises DataError(f\"bad row: {text}\") when text lacks a comma, else returns text.split(\",\"). Print parse_row(\"a,b\").", "", code("class DataError(Exception):", "    pass", "", "def parse_row(text):", "    if \",\" not in text:", "        raise DataError(f\"bad row: {text}\")", "    return text.split(\",\")", "", "print(parse_row(\"a,b\"))"), ["class DataError(Exception):", "raise DataError(", "text.split(\",\")"], "A domain exception plus a guard — prints ['a', 'b']."),
    typed("Wrap int(value) in try/except ValueError and re-raise as RuntimeError(\"conversion failed\") from the original (as exc). Then call safe_int(\"7\") and print the result.", "def safe_int(value):\n    pass  # replace", code("def safe_int(value):", "    try:", "        return int(value)", "    except ValueError as exc:", "        raise RuntimeError(\"conversion failed\") from exc", "", "print(safe_int(\"7\"))"), ["except ValueError as exc:", "raise RuntimeError(\"conversion failed\") from exc", "print(safe_int(\"7\"))"], "Translation with preserved cause — prints 7 on the happy path.")
  ]),
  ...attach("py5-typing", [
    mcq("What does def find_user(id: int) -> User | None tell callers?", ["The result may be None — handle that case", "The function is optional", "id may be None"], "The result may be None — handle that case", "Optional returns make the missing case part of the contract."),
    mcq("Which annotates a list of ints (modern syntax)?", ["scores: list[int]", "scores: list(int)", "scores: [int]"], "scores: list[int]", "Built-in generics: list[int], dict[str, float], tuple[int, ...]."),
    mcq("What does a TypedDict define?", ["The exact key names and value types a dict should have", "A dict that rejects wrong keys at runtime", "An immutable dict"], "The exact key names and value types a dict should have", "Static shape-checking for dict-shaped data — runtime stays a plain dict."),
    fill("Annotate the mapping of name to price.", "prices: dict[__1__, float] = {}", [{ label: "__1__", answers: ["str"] }], "dict[key_type, value_type]."),
    mcq("What makes Protocol special versus a base class?", ["Anything with matching methods satisfies it — no inheritance required", "It runs faster", "It enforces at runtime"], "Anything with matching methods satisfies it — no inheritance required", "Protocols are duck typing the type checker can verify (structural typing)."),
    tf("A class must explicitly inherit from a Protocol to satisfy it.", false, "Matching the method signatures is enough — that is the entire point of structural typing."),
    mcq("In def first(items: list[T]) -> T, what does TypeVar T accomplish?", ["The return type FOLLOWS the element type per call", "T means any without checking", "It restricts to one global type"], "The return type FOLLOWS the element type per call", "Generic functions stay precise: str in, str out."),
    tf("Type hints change how the program executes.", false, "Hints are for checkers, editors, and humans — the runtime ignores them."),
    typed("Define a TypedDict Book with title: str and pages: int, a function summary(b: Book) -> str returning f\"{b['title']}: {b['pages']}p\", and print summary for a dict of your choice.", "from typing import TypedDict", code("class Book(TypedDict):", "    title: str", "    pages: int", "", "def summary(b: Book) -> str:", "    return f\"{b['title']}: {b['pages']}p\"", "", "print(summary({\"title\": \"Dune\", \"pages\": 412}))"), ["class Book(TypedDict):", "def summary(b: Book) -> str:", "print(summary("], "Shape-typed dicts: checkable structure, zero runtime cost."),
    typed("Write find(items: list[str], target: str) -> int | None returning the index via items.index when target in items, else None. Print find([\"a\", \"b\"], \"b\").", "", code("def find(items: list[str], target: str) -> int | None:", "    if target in items:", "        return items.index(target)", "    return None", "", "print(find([\"a\", \"b\"], \"b\"))"), ["-> int | None:", "items.index(target)", "return None"], "The | None return makes the miss case explicit — prints 1.")
  ]),
  ...attach("py5-dataclasses", [
    mcq("Why does tags: list = [] fail in a dataclass?", ["A single shared list would leak between instances — Python rejects mutable defaults", "Lists cannot be fields", "Square brackets are reserved"], "A single shared list would leak between instances — Python rejects mutable defaults", "The fix is field(default_factory=list) — a fresh list per instance."),
    fill("Give each instance its own list.", "from dataclasses import dataclass, field\n\n@dataclass\nclass Order:\n    items: list = field(__1__=list)", [{ label: "__1__", answers: ["default_factory"] }], "default_factory calls list() per construction."),
    mcq("What does @dataclass(frozen=True) provide?", ["Immutable instances that are hashable — safe as dict keys and set members", "Faster attribute access", "Automatic JSON"], "Immutable instances that are hashable — safe as dict keys and set members", "Assignment after construction raises FrozenInstanceError."),
    mcq("When does __post_init__ run?", ["Immediately after the generated __init__ assigns the fields", "Before construction", "On every attribute read"], "Immediately after the generated __init__ assigns the fields", "The validation hook: raise on bad values right at the boundary."),
    mcq("What does asdict(order) produce?", ["A plain (nested) dict of the fields — JSON-ready", "A database row", "A frozen copy"], "A plain (nested) dict of the fields — JSON-ready", "asdict recursively converts nested dataclasses too."),
    tf("Fields WITHOUT defaults may come after fields WITH defaults in a dataclass.", false, "Same rule as function parameters — defaults last, or a TypeError at class creation."),
    mcq("What does @dataclass(order=True) generate?", ["Comparison operators based on field order — instances become sortable", "A sorted constructor", "Ordered dict output"], "Comparison operators based on field order — instances become sortable", "Tuple-style comparison over the fields, in declaration order."),
    tf("Mutating a frozen dataclass field just silently does nothing.", false, "It raises FrozenInstanceError — loud, not silent."),
    typed("Create a dataclass Task with name: str and done: bool = False, plus __post_init__ raising ValueError when name is empty. Create Task(\"ship\") and print asdict of it.", "from dataclasses import dataclass, asdict", code("@dataclass", "class Task:", "    name: str", "    done: bool = False", "", "    def __post_init__(self):", "        if not self.name:", "            raise ValueError(\"name required\")", "", "print(asdict(Task(\"ship\")))"), ["def __post_init__(self):", "raise ValueError(", "asdict(Task(\"ship\"))"], "Validated construction — prints {'name': 'ship', 'done': False}."),
    typed("Create a frozen dataclass Point with x: int and y: int, build two equal points, and print them compared with == and the set length of both.", "from dataclasses import dataclass", code("@dataclass(frozen=True)", "class Point:", "    x: int", "    y: int", "", "a = Point(1, 2)", "b = Point(1, 2)", "print(a == b)", "print(len({a, b}))"), ["@dataclass(frozen=True)", "print(a == b)", "len({a, b})"], "Frozen = hashable: equal by value (True) and deduplicated in a set (1).")
  ]),
  ...attach("py5-oop-patterns", [
    mcq("What happens when you instantiate an ABC that still has an unimplemented @abstractmethod?", ["TypeError at construction — incomplete implementations cannot exist", "A warning at exit", "It works until the method is called"], "TypeError at construction — incomplete implementations cannot exist", "Contracts fail FAST, not deep in production."),
    fill("Declare the required method.", "from abc import ABC, abstractmethod\n\nclass Storage(ABC):\n    @__1__\n    def save(self, data): ...", [{ label: "__1__", answers: ["abstractmethod"] }], "@abstractmethod marks what every subclass must provide."),
    mcq("'A Car HAS an Engine' suggests which design?", ["Composition — store an engine object as an attribute", "Inheritance — Car extends Engine", "A mixin"], "Composition — store an engine object as an attribute", "HAS-A composes; IS-A inherits. Cars are not engines."),
    mcq("Why does composition usually beat deep inheritance trees?", ["Parts swap independently (testing, variants) without reshaping a hierarchy", "It uses less memory", "Inheritance is deprecated"], "Parts swap independently (testing, variants) without reshaping a hierarchy", "Injecting a FakeEngine into Car for tests requires no subclassing gymnastics."),
    mcq("What is a mixin?", ["A small class adding ONE focused capability via multiple inheritance", "A merged dictionary", "An abstract constructor"], "A small class adding ONE focused capability via multiple inheritance", "class Service(LoggingMixin, Base) — capabilities as composable slices."),
    tf("Checking isinstance everywhere is more Pythonic than relying on duck typing or Protocols.", false, "Prefer capability over identity: call the method, or type with Protocols — isinstance walls off legitimate ducks."),
    tf("An ABC can provide concrete helper methods alongside its abstract ones.", true, "Template-method style: shared logic in the base, required steps abstract."),
    mcq("What does raise NotImplementedError signal in a base method?", ["Subclasses are expected to override this — calling the base version is a bug", "The feature is disabled", "A syntax problem"], "Subclasses are expected to override this — calling the base version is a bug", "The lighter-weight cousin of @abstractmethod."),
    typed("Define Shape(ABC) with @abstractmethod area(self), and Square(Shape) storing side and returning side ** 2 from area. Print Square(5).area().", "from abc import ABC, abstractmethod", code("class Shape(ABC):", "    @abstractmethod", "    def area(self): ...", "", "class Square(Shape):", "    def __init__(self, side):", "        self.side = side", "    def area(self):", "        return self.side ** 2", "", "print(Square(5).area())"), ["@abstractmethod", "class Square(Shape):", "return self.side ** 2"], "Contract declared, contract fulfilled — prints 25."),
    typed("Compose: class Engine with start(self) returning \"vroom\", and class Car that takes an engine in __init__ and whose drive(self) returns self.engine.start(). Print Car(Engine()).drive().", "", code("class Engine:", "    def start(self):", "        return \"vroom\"", "", "class Car:", "    def __init__(self, engine):", "        self.engine = engine", "    def drive(self):", "        return self.engine.start()", "", "print(Car(Engine()).drive())"), ["self.engine = engine", "self.engine.start()", "Car(Engine()).drive()"], "Dependency injected, behavior delegated — prints vroom.")
  ]),
  ...attach("py5-iterator-protocol", [
    mcq("What two calls does a for loop make under the hood?", ["iter(obj) once, then next() repeatedly until StopIteration", "loop(obj) then step()", "obj.each() repeatedly"], "iter(obj) once, then next() repeatedly until StopIteration", "The for statement is sugar over the iterator protocol."),
    mcq("What is the difference between an iterable and an iterator?", ["Iterables produce fresh iterators; iterators are single-use streams", "They are synonyms", "Iterators are always faster"], "Iterables produce fresh iterators; iterators are single-use streams", "A list survives many loops; a generator is consumed by one."),
    mcq("Why does the second loop over the same generator print nothing?", ["The generator exhausted in the first loop — iterators are single-use", "Generators alternate on/off", "A bug in Python"], "The generator exhausted in the first loop — iterators are single-use", "Store as a list, or re-create the generator, when you need two passes.", code("gen = (n for n in range(3))", "print(list(gen))", "print(list(gen))")),
    mcq("How does a plain for loop know when to stop?", ["The iterator raises StopIteration internally", "It counts len() first", "A sentinel None appears"], "The iterator raises StopIteration internally", "The loop catches StopIteration silently — that IS the termination signal."),
    fill("Make the class iterable the easy way.", "class Box:\n    def __init__(self, items):\n        self.items = items\n    def __iter__(self):\n        yield __1__ self.items", [{ label: "__1__", answers: ["from"] }], "A generator __iter__ via yield from — instant for/sum/sorted support."),
    tf("Implementing __iter__ on a class is enough for it to work with for loops, sum(), sorted(), and unpacking.", true, "Everything that consumes iterables speaks this one protocol."),
    mcq("What does next(gen, \"done\") do on an exhausted generator?", ["Returns \"done\" instead of raising StopIteration", "Restarts the generator", "Raises anyway"], "Returns \"done\" instead of raising StopIteration", "next's second argument is the exhaustion default."),
    tf("Lists are iterators: calling next([1, 2]) yields 1.", false, "Lists are iterABLE, not iterators — next(iter([1, 2])) works; next([1, 2]) raises TypeError."),
    typed("Make class Pair iterable so x, y = Pair(3, 4) works: __init__ stores a and b; __iter__ yields a then b. Unpack one and print x, y.", "", code("class Pair:", "    def __init__(self, a, b):", "        self.a = a", "        self.b = b", "    def __iter__(self):", "        yield self.a", "        yield self.b", "", "x, y = Pair(3, 4)", "print(x, y)"), ["def __iter__(self):", "yield self.a", "x, y = Pair(3, 4)"], "Unpacking IS iteration — two yields make the class destructurable."),
    typed("Use iter() and next() manually on the list [10, 20]: get the iterator, print next twice, then print next with the default \"end\".", "", code("it = iter([10, 20])", "print(next(it))", "print(next(it))", "print(next(it, \"end\"))"), ["iter([10, 20])", "next(it, \"end\")"], "The protocol by hand: 10, 20, then the graceful default.")
  ]),
  ...attach("py5-threading", [
    mcq("What does CPython's GIL enforce?", ["Only one thread executes Python bytecode at any moment", "Threads cannot share memory", "A maximum of four threads"], "Only one thread executes Python bytecode at any moment", "The global interpreter lock — the single most important fact about Python threads."),
    mcq("Which workload do threads genuinely accelerate in Python?", ["I/O-bound work — waiting on network or disk releases the GIL", "CPU-bound math", "Sorting lists"], "I/O-bound work — waiting on network or disk releases the GIL", "Ten downloads in parallel: great. Ten matrix multiplies: still serial."),
    mcq("Your pure-Python number crunching needs real parallel CPU. What do you reach for?", ["multiprocessing (separate processes, separate GILs)", "More threads", "Bigger lists"], "multiprocessing (separate processes, separate GILs)", "Processes sidestep the GIL at the cost of separate memory."),
    mcq("Two threads both run counter += 1 concurrently and one update vanishes. Why?", ["Read-modify-write interleaved: both read the same old value", "The GIL deleted it", "Integers are immutable"], "Read-modify-write interleaved: both read the same old value", "counter += 1 is THREE operations — a textbook race condition."),
    fill("Guard the critical section.", "__1__ lock:\n    counter += 1", [{ label: "__1__", answers: ["with"] }], "with lock: acquires and guarantees release — even on exceptions."),
    tf("The GIL makes race conditions impossible, so Python threads never need locks.", false, "The GIL switches BETWEEN bytecodes — compound operations still interleave. Locks remain necessary."),
    tf("A daemon thread is killed automatically when the main program exits.", true, "Daemon threads suit background work that should not block shutdown."),
    mcq("What is the modern high-level API for running a function across a pool of threads?", ["concurrent.futures.ThreadPoolExecutor", "thread.run_all()", "os.threads()"], "concurrent.futures.ThreadPoolExecutor", "executor.map(fetch, urls) — pooling, results, and errors handled for you."),
    mcq("Why is 'shared mutable state' the central danger phrase in threading?", ["Concurrent modification corrupts data unless every access is synchronized", "Sharing wastes memory", "Mutation is slow"], "Concurrent modification corrupts data unless every access is synchronized", "Prefer passing messages or immutable data — locks are the fallback, not the goal."),
    mcq("A web scraper spends 95% of its time waiting on responses. Threads would...", ["Help a lot — the waits overlap", "Not help at all", "Corrupt the HTML"], "Help a lot — the waits overlap", "I/O-bound is the green light for threads (or asyncio)."),
  ]),
  ...attach("py5-asyncio", [
    mcq("What does calling an async def function (without await) return?", ["A coroutine object — the body has NOT run", "The function's result", "A thread"], "A coroutine object — the body has NOT run", "Forgetting await is THE async bug: you hold a blueprint, not a result."),
    mcq("What happens at an await inside a coroutine?", ["The event loop may switch to another coroutine while this one waits", "The program blocks completely", "A thread spawns"], "The event loop may switch to another coroutine while this one waits", "Cooperative switching at awaits is the whole mechanism."),
    mcq("Three coroutines each await asyncio.sleep(1). Run via gather, total time is about...", ["1 second — the waits overlap", "3 seconds", "0 seconds"], "1 second — the waits overlap", "gather runs them concurrently; sequential awaits would take 3."),
    fill("Run them concurrently.", "results = await asyncio.__1__(fetch_a(), fetch_b(), fetch_c())", [{ label: "__1__", answers: ["gather"] }], "gather awaits all and returns their results in order."),
    mcq("How does a normal SCRIPT start an asyncio program?", ["asyncio.run(main())", "main().start()", "await main() at module top level"], "asyncio.run(main())", "asyncio.run creates the loop, runs main, and cleans up. (This browser runtime already has a loop, so lessons here use top-level await.)"),
    tf("asyncio uses many threads under the hood to achieve its concurrency.", false, "One thread, one event loop — concurrency comes from cooperative switching at awaits."),
    tf("asyncio meaningfully speeds up CPU-heavy pure-Python computation.", false, "No waiting to overlap = no benefit; async is for I/O concurrency."),
    mcq("Where can the await keyword legally appear?", ["Inside async def functions (and at top level in some environments)", "Anywhere", "Only inside loops"], "Inside async def functions (and at top level in some environments)", "await inside a plain def is a SyntaxError."),
    typed("Define async tick(n) that awaits asyncio.sleep(0.01) then returns n * 2. In async main, gather tick(1), tick(2), tick(3) into results and print them. Run with top-level await main() (a script would use asyncio.run).", "import asyncio", code("async def tick(n):", "    await asyncio.sleep(0.01)", "    return n * 2", "", "async def main():", "    results = await asyncio.gather(tick(1), tick(2), tick(3))", "    print(results)", "", "await main()"), ["async def tick(n):", "await asyncio.sleep(0.01)", "asyncio.gather(tick(1), tick(2), tick(3))", "await main()"], "Three overlapping sleeps, results in call order: [2, 4, 6]."),
    typed("Write async double(n) returning n * 2 after awaiting asyncio.sleep(0), then print await double(21) via top-level await.", "import asyncio", code("async def double(n):", "    await asyncio.sleep(0)", "    return n * 2", "", "print(await double(21))"), ["async def double(n):", "await asyncio.sleep(0)", "await double(21)"], "Awaiting actually runs the coroutine — prints 42.")
  ]),
  ...attach("py5-pathlib", [
    mcq("What does Path(\"data\") / \"raw\" / \"file.csv\" build?", ["The joined path data/raw/file.csv as a Path object", "A division error", "Three separate paths"], "The joined path data/raw/file.csv as a Path object", "The overloaded / replaces fragile string concatenation."),
    fill("One-line file read.", "content = Path(\"notes.txt\").__1__()", [{ label: "__1__", answers: ["read_text"] }], "read_text opens, reads, and closes in one call; write_text is its partner."),
    mcq("For p = Path(\"report.final.pdf\"), what are p.suffix and p.stem?", ["'.pdf' and 'report.final'", "'.final.pdf' and 'report'", "'pdf' and 'report'"], "'.pdf' and 'report.final'", "suffix is the LAST extension; stem is the name without it."),
    mcq("What does base.glob(\"*.txt\") yield?", ["The .txt files directly inside base", "All .txt files at any depth", "A boolean"], "The .txt files directly inside base", "rglob (or glob(\"**/*.txt\")) searches recursively."),
    fill("Create the directory tree safely (no error if it exists).", "Path(\"out/reports\").mkdir(parents=True, __1__=True)", [{ label: "__1__", answers: ["exist_ok"] }], "parents builds intermediate dirs; exist_ok silences the already-exists error."),
    tf("Path objects still require os.path.join for joining segments.", false, "The / operator IS the join — that is pathlib's signature feature."),
    mcq("How do you check a path exists before reading?", ["p.exists()", "os.has(p)", "try p"], "p.exists()", "Also: p.is_file(), p.is_dir() for finer checks."),
    tf("p.read_text() requires you to close the file afterwards.", false, "It opens, reads, and closes internally — no handle leaks possible."),
    typed("Using pathlib: write \"hello pathlib\" into hello.txt, then read it back and print it.", "from pathlib import Path", code("p = Path(\"hello.txt\")", "p.write_text(\"hello pathlib\")", "print(p.read_text())"), ["write_text(\"hello pathlib\")", "read_text()"], "A full file round trip in three lines, no open() bookkeeping."),
    typed("Create directory logs (exist_ok=True), write \"start\" into logs/app.log using the / operator, then print the file's name attribute.", "from pathlib import Path", code("base = Path(\"logs\")", "base.mkdir(exist_ok=True)", "log = base / \"app.log\"", "log.write_text(\"start\")", "print(log.name)"), ["mkdir(exist_ok=True)", "base / \"app.log\"", "print(log.name)"], "Joined with /, written in one call — prints app.log.")
  ]),
  ...attach("py5-datetime", [
    mcq("What type does end - start produce for two datetimes?", ["timedelta", "float seconds", "datetime"], "timedelta", "Durations are their own type, with .days and .total_seconds()."),
    mcq("How do you compute a date 30 days from a known datetime?", ["dt + timedelta(days=30)", "dt.add(30)", "dt + 30"], "dt + timedelta(days=30)", "datetime plus timedelta is the calendar arithmetic idiom."),
    fill("Format as 2026-01-15.", "text = launch.__1__(\"%Y-%m-%d\")", [{ label: "__1__", answers: ["strftime"] }], "strftime = string-FORMAT-time: datetime → text."),
    fill("Parse the text back into a datetime.", "dt = datetime.__1__(\"2026-03-01\", \"%Y-%m-%d\")", [{ label: "__1__", answers: ["strptime"] }], "strptime = string-PARSE-time: text → datetime (f-format, p-parse)."),
    mcq("What do %Y, %m, %d mean in format codes?", ["4-digit year, 2-digit month, 2-digit day", "Year, minute, decade", "They are placeholders for any number"], "4-digit year, 2-digit month, 2-digit day", "%H:%M:%S covers the clock side."),
    tf("Comparing datetimes with < and > requires converting them to strings first.", false, "datetimes compare natively — deadline < datetime.now() just works (string comparison is the bug, not the fix)."),
    mcq("What is the professional rule for timezones?", ["Store and compute in UTC; convert to local only for display", "Always use local time", "Avoid storing times"], "Store and compute in UTC; convert to local only for display", "One canonical clock internally; localization at the edges."),
    tf("timedelta(hours=36).days equals 1.", true, "days truncates whole days; total_seconds() keeps everything (129600.0)."),
    typed("Compute the number of days between datetime(2026, 1, 1) and datetime(2026, 3, 1) and print it.", "from datetime import datetime", code("delta = datetime(2026, 3, 1) - datetime(2026, 1, 1)", "print(delta.days)"), ["datetime(2026, 3, 1) - datetime(2026, 1, 1)", "delta.days"], "Subtraction yields a timedelta — prints 59."),
    typed("Add 90 days to datetime(2026, 1, 15) and print the result formatted as %Y-%m-%d.", "from datetime import datetime, timedelta", code("review = datetime(2026, 1, 15) + timedelta(days=90)", "print(review.strftime(\"%Y-%m-%d\"))"), ["timedelta(days=90)", "strftime(\"%Y-%m-%d\")"], "Arithmetic then formatting — prints 2026-04-15.")
  ]),
  ...attach("py5-performance", [
    mcq("Why is x in my_set massively faster than x in my_list for large data?", ["Sets hash to the answer in O(1); lists scan every element in O(n)", "Sets are sorted", "Lists check twice"], "Sets hash to the answer in O(1); lists scan every element in O(n)", "The single most valuable performance fact in Python."),
    mcq("A loop checks each of 10,000 items against a 10,000-element lookup LIST. The one-line fix?", ["Convert the lookup list to a set before the loop", "Use a faster laptop", "Sort both lists"], "Convert the lookup list to a set before the loop", "O(n*m) collapses to O(n) — minutes become milliseconds."),
    mcq("Why is result += piece in a long loop slow for strings?", ["Strings are immutable — each += copies everything built so far", "+= is always slow", "Strings cache badly"], "Strings are immutable — each += copies everything built so far", "Collect pieces in a list and \"\".join(pieces) once."),
    fill("Build the string the fast way.", "text = \"\".__1__(pieces)", [{ label: "__1__", answers: ["join"] }], "join allocates once instead of re-copying per iteration."),
    mcq("What is timeit for?", ["Timing small snippets reliably (repeats, fair clocks)", "Setting program timeouts", "Profiling whole apps"], "Timing small snippets reliably (repeats, fair clocks)", "For whole programs, reach for cProfile instead."),
    tf("Optimizing wherever the code LOOKS slow is as effective as profiling first.", false, "Bottleneck intuition is famously wrong — measure, then optimize the proven hot spot."),
    mcq("When does a generator beat a list for processing a huge file?", ["Memory stays flat — one element lives at a time", "Generators use the GPU", "Lists cannot hold strings"], "Memory stays flat — one element lives at a time", "Stream processing is the difference between 50MB and 5GB of RAM."),
    tf("Dict key lookup (d[k]) is O(n), like scanning a list.", false, "Dicts hash like sets — effectively O(1). That is why indexes-by-id beat searches-by-loop."),
    mcq("Which rewrite removes the quadratic behavior?", ["seen = set(processed_ids) before the loop, then id in seen", "Add a second nested loop", "Sort processed_ids each iteration"], "seen = set(processed_ids) before the loop, then id in seen", "Hash-based membership turns the inner scan into a constant-time check.", code("for record in records:", "    if record.id in processed_ids:  # a LIST", "        skip(record)")),
    typed("nums has duplicates. Build seen as a set of nums, then print whether 999 and 3 are in it (two prints).", "nums = [3, 7, 3, 9] * 1000", code("seen = set(nums)", "print(999 in seen)", "print(3 in seen)"), ["seen = set(nums)", "999 in seen", "3 in seen"], "One O(n) conversion buys O(1) membership forever after — False then True.")
  ]),
  ...attach("py5-packaging", [
    mcq("What is pyproject.toml?", ["The modern single config declaring a project's metadata, dependencies, and build system", "A test runner", "A virtualenv"], "The modern single config declaring a project's metadata, dependencies, and build system", "It replaces setup.py/setup.cfg as the standard."),
    mcq("What does pip install -e . do?", ["Installs YOUR project in editable mode — imports resolve while you keep editing", "Installs everything everywhere", "Encrypts the package"], "Installs YOUR project in editable mode — imports resolve while you keep editing", "The fix for 'ModuleNotFoundError: my_own_package' during development."),
    mcq("What marks a directory as an importable package?", ["An __init__.py file (by convention and for clarity)", "A README", "Capitalized name"], "An __init__.py file (by convention and for clarity)", "Namespace packages can omit it, but explicit __init__.py remains the convention."),
    fill("Complete the project config filename.", "Dependencies and metadata live in __1__.toml", [{ label: "__1__", answers: ["pyproject"] }], "One file, machine-readable, tool-agnostic."),
    mcq("In semver 2.3.1, what does bumping each number signal?", ["2=breaking change, 3=new feature, 1=bug fix", "2=year, 3=month, 1=day", "Arbitrary counters"], "2=breaking change, 3=new feature, 1=bug fix", "MAJOR.MINOR.PATCH lets consumers read risk from the version."),
    tf("requests>=2.31 in pyproject and an exact lock file serve the same purpose.", false, "Ranges declare compatibility; locks pin exact versions for reproducible installs — you want both."),
    mcq("Why the src/ layout (src/mypkg/ instead of mypkg/ at the root)?", ["Tests can't accidentally import the uninstalled local folder — you test the installed package", "It is required by pip", "Shorter paths"], "Tests can't accidentally import the uninstalled local folder — you test the installed package", "A subtle correctness guard the big projects all adopted."),
    tf("Publishing to PyPI requires special permission from the Python core team.", false, "Anyone can register and twine/flit/poetry-publish a package — that is the open ecosystem."),
    mcq("Where do a package's command-line entry points get declared?", ["[project.scripts] in pyproject.toml", "In __main__.py only", "In requirements.txt"], "[project.scripts] in pyproject.toml", "mytool = \"mypkg.cli:main\" turns a function into a shell command on install."),
    mcq("A healthy minimal project tree looks like...", ["pyproject.toml, src/mypkg/__init__.py, tests/test_core.py, README.md", "One main.py with 3000 lines", "Code inside site-packages directly"], "pyproject.toml, src/mypkg/__init__.py, tests/test_core.py, README.md", "Config, source, tests, docs — the four corners of shippable.")
  ]),
  ...attach("py5-capstones", [
    typed("Stream-process orders: keep totals over 100 and sum them using ONE generator expression inside sum(). Print the result.", "orders = [{\"id\": 1, \"total\": 250}, {\"id\": 2, \"total\": 40}, {\"id\": 3, \"total\": 160}]", code("big_revenue = sum(o[\"total\"] for o in orders if o[\"total\"] > 100)", "print(big_revenue)"), ["sum(o[\"total\"] for o in orders if o[\"total\"] > 100)"], "Filter and aggregate in one lazy pass — prints 410."),
    typed("Sort the employees list of dicts by department ascending, then salary DESCENDING, with one tuple key. Print the first employee's name.", "employees = [\n    {\"name\": \"Aya\", \"dept\": \"eng\", \"salary\": 95},\n    {\"name\": \"Bo\", \"dept\": \"eng\", \"salary\": 120},\n    {\"name\": \"Cy\", \"dept\": \"art\", \"salary\": 80},\n]", code("ranked = sorted(employees, key=lambda e: (e[\"dept\"], -e[\"salary\"]))", "print(ranked[0][\"name\"])"), ["key=lambda e: (e[\"dept\"], -e[\"salary\"])"], "art before eng, highest salary first within each — prints Cy."),
    typed("Build word_counts for the words list using setdefault-free style: a dict comprehension over set(words) counting with words.count(w). Print word_counts[\"go\"].", "words = [\"go\", \"py\", \"go\", \"go\"]", code("word_counts = {w: words.count(w) for w in set(words)}", "print(word_counts[\"go\"])"), ["{w: words.count(w) for w in set(words)}"], "A comprehension-built frequency table — prints 3."),
    typed("Define a frozen dataclass User(name: str, email: str), then de-duplicate the users list with set() and print the resulting count.", "from dataclasses import dataclass", code("@dataclass(frozen=True)", "class User:", "    name: str", "    email: str", "", "users = [User(\"Aya\", \"a@x.com\"), User(\"Aya\", \"a@x.com\"), User(\"Bo\", \"b@x.com\")]", "print(len(set(users)))"), ["@dataclass(frozen=True)", "len(set(users))"], "Frozen = hashable = set-deduplicatable — prints 2."),
    typed("Cache it: write @lru_cache slow_square(n) returning n * n, call it for 1..5 via a generator expression in sum(), print the total.", "from functools import lru_cache", code("@lru_cache", "def slow_square(n):", "    return n * n", "", "print(sum(slow_square(n) for n in range(1, 6)))"), ["@lru_cache", "sum(slow_square(n) for n in range(1, 6))"], "55 — and every repeat call would now be free."),
    typed("With pathlib, write three lines (one per word in words) into report.txt using \"\\n\".join, then read it back and print how many lines it has.", "from pathlib import Path\nwords = [\"alpha\", \"beta\", \"gamma\"]", code("p = Path(\"report.txt\")", "p.write_text(\"\\n\".join(words))", "print(len(p.read_text().split(\"\\n\")))"), ["\"\\n\".join(words)", "read_text()"], "Join once, write once, count 3 — file I/O without ceremony."),
    typed("Chain itertools: flatten batches with chain, de-duplicate preserving order with dict.fromkeys, print the result list.", "from itertools import chain\nbatches = [[3, 1], [3, 2], [1, 4]]", code("flat = chain(*batches)", "unique = list(dict.fromkeys(flat))", "print(unique)"), ["chain(*batches)", "dict.fromkeys(flat)"], "[3, 1, 2, 4] — flatten lazily, dedupe in order."),
    typed("Robust parsing: parse_all(values) returns a list of int(v) for entries that convert, skipping ones that raise ValueError (use try/except inside a loop). Print parse_all([\"3\", \"x\", \"7\"]).", "", code("def parse_all(values):", "    results = []", "    for v in values:", "        try:", "            results.append(int(v))", "        except ValueError:", "            continue", "    return results", "", "print(parse_all([\"3\", \"x\", \"7\"]))"), ["except ValueError:", "results.append(int(v))", "parse_all([\"3\", \"x\", \"7\"])"], "Tolerant ingestion — prints [3, 7] without dying on 'x'."),
    typed("Async fan-out: async fetch(n) awaits asyncio.sleep(0.01) and returns n; in async main, gather fetch(1) and fetch(2), print the sum of results. Run with top-level await main().", "import asyncio", code("async def fetch(n):", "    await asyncio.sleep(0.01)", "    return n", "", "async def main():", "    results = await asyncio.gather(fetch(1), fetch(2))", "    print(sum(results))", "", "await main()"), ["asyncio.gather(fetch(1), fetch(2))", "await main()"], "Two concurrent awaits, one combined answer: 3."),
    typed("Final boss: from the events list, print the names of the 2 highest-priority events (LOWEST number = highest priority), comma-joined, using sorted + a list slice + join.", "events = [(\"deploy\", 2), (\"hotfix\", 1), (\"retro\", 3), (\"triage\", 1)]", code("top = sorted(events, key=lambda e: e[1])[:2]", "print(\", \".join(name for name, _ in top))"), ["sorted(events, key=lambda e: e[1])[:2]", "\", \".join("], "Sort, slice, project, join — prints hotfix, triage.")
  ])
];
