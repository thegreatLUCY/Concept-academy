const code = (...lines) => lines.join("\n");
const setId = "numpy-set1";

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

export const numpySet1Modules = [
  { id: "np1-why-numpy", setId, title: "Why NumPy" },
  { id: "np1-creating-arrays", setId, title: "Creating Arrays" },
  { id: "np1-shape-dtype", setId, title: "Shape, dtype, and reshape" },
  { id: "np1-indexing-slicing", setId, title: "Indexing and Slicing" },
  { id: "np1-vectorized", setId, title: "Vectorized Math" },
  { id: "np1-broadcasting", setId, title: "Broadcasting" },
  { id: "np1-masking", setId, title: "Boolean Masking" },
  { id: "np1-aggregations", setId, title: "Aggregations and axis" },
  { id: "np1-random-useful", setId, title: "Random and Useful Functions" },
  { id: "np1-views-copies", setId, title: "Views, Copies, and Pitfalls" }
];

export const numpySet1Lessons = {
  "np1-why-numpy": {
    summary:
      "NumPy is the foundation of scientific Python. Its core object, the ndarray, stores numbers in a contiguous block of memory with a single type, letting math run in optimized C instead of Python loops — often 10–100x faster. Pandas, Matplotlib, scikit-learn, and most of the data stack are built on top of it. The universal import: import numpy as np.",
    points: [
      "ndarray = fixed-type, n-dimensional, fast.",
      "Vectorized operations replace slow Python for-loops.",
      "import numpy as np is the universal convention."
    ],
    example: code(
      "import numpy as np",
      "",
      "prices = np.array([10.0, 20.0, 30.0])",
      "print(prices * 1.1)   # one operation, every element"
    )
  },
  "np1-creating-arrays": {
    summary:
      "np.array(list) converts Python lists (nested lists become 2D arrays). Generators build common shapes: np.zeros(n) and np.ones(n) for filled arrays, np.arange(start, stop, step) for ranges (stop excluded, like range), and np.linspace(start, stop, count) for evenly spaced points INCLUDING the stop.",
    points: [
      "np.array([[1, 2], [3, 4]]) — a 2x2 array from nested lists.",
      "np.zeros(3), np.ones((2, 3)) — pre-filled shapes.",
      "arange excludes the stop; linspace includes it."
    ],
    example: code(
      "import numpy as np",
      "",
      "print(np.array([1, 2, 3]))",
      "print(np.zeros(3))",
      "print(np.arange(0, 10, 2))",
      "print(np.linspace(0, 1, 5))"
    )
  },
  "np1-shape-dtype": {
    summary:
      "Every array has a shape — a tuple of sizes per dimension: a 2x3 array has shape (2, 3) — plus ndim (how many dimensions) and dtype (the single element type, like int64 or float64). reshape rearranges the same data into a new shape, as long as the total element count matches.",
    points: [
      "a.shape → (rows, cols); a.ndim → dimensions; a.dtype → element type.",
      "Mixing ints and floats upcasts everything to float.",
      "np.arange(6).reshape(2, 3) — 6 elements, new arrangement."
    ],
    example: code(
      "import numpy as np",
      "",
      "a = np.arange(6).reshape(2, 3)",
      "print(a)",
      "print(a.shape)",
      "print(a.dtype)"
    )
  },
  "np1-indexing-slicing": {
    summary:
      "1D arrays index like lists: a[0], a[-1], a[1:4]. 2D arrays take a comma per dimension: m[row, col], m[0] grabs a whole row, m[:, 1] grabs a whole column — the colon means 'everything along this axis'. Slices follow the same start:stop:step rules as Python lists.",
    points: [
      "m[1, 2] — row 1, column 2.",
      "m[0] or m[0, :] — first row; m[:, 0] — first column.",
      "a[1:4] — elements 1, 2, 3 (stop excluded)."
    ],
    example: code(
      "import numpy as np",
      "",
      "m = np.array([[1, 2, 3], [4, 5, 6]])",
      "print(m[1, 2])   # 6",
      "print(m[0])      # first row",
      "print(m[:, 1])   # second column"
    )
  },
  "np1-vectorized": {
    summary:
      "Arithmetic on arrays applies element by element with NO loop: prices * 1.1 scales everything, a + b adds matching positions. Comparisons vectorize too, returning boolean arrays. This is both the speed and the style of NumPy: if you are writing a for-loop over an array, there is probably a vectorized one-liner.",
    points: [
      "a * 2, a + 10, a ** 2 — element-wise, loop-free.",
      "a + b adds position by position (shapes must be compatible).",
      "a > 5 returns an array of True/False."
    ],
    example: code(
      "import numpy as np",
      "",
      "a = np.array([1, 2, 3])",
      "b = np.array([10, 20, 30])",
      "print(a * 2)",
      "print(a + b)",
      "print(b > 15)"
    )
  },
  "np1-broadcasting": {
    summary:
      "Broadcasting is how NumPy combines arrays of DIFFERENT shapes: the smaller one is conceptually stretched to fit. A scalar broadcasts to everything (a * 2); a 1D row of length 3 broadcasts across each row of a (n, 3) matrix. Shapes are compatible when each dimension matches or one of them is 1 — otherwise NumPy raises a broadcasting error.",
    points: [
      "Scalar with anything: a + 5 just works.",
      "(4, 3) matrix + (3,) row vector: the row applies to every matrix row.",
      "Mismatched shapes like (3,) + (4,) raise an error."
    ],
    example: code(
      "import numpy as np",
      "",
      "m = np.array([[1, 2, 3], [4, 5, 6]])",
      "row = np.array([10, 20, 30])",
      "print(m + row)   # row added to BOTH rows"
    )
  },
  "np1-masking": {
    summary:
      "A comparison like ages > 18 produces a boolean mask; indexing with that mask keeps only the True positions: ages[ages > 18]. Conditions combine with & (and) and | (or) — each wrapped in parentheses, NOT Python's and/or. Masks also assign: a[a < 0] = 0 clips negatives in place.",
    points: [
      "data[data > 100] — filter in one expression.",
      "(a > 0) & (a < 10) — parentheses and & |, never and/or.",
      "a[a < 0] = 0 — masked assignment."
    ],
    example: code(
      "import numpy as np",
      "",
      "ages = np.array([12, 25, 17, 40])",
      "print(ages[ages >= 18])",
      "print(ages[(ages >= 13) & (ages <= 19)])"
    )
  },
  "np1-aggregations": {
    summary:
      "Aggregations collapse arrays to summaries: a.sum(), a.mean(), a.max(), a.min(), a.std(). On 2D arrays the axis argument picks the direction: axis=0 collapses DOWN the rows (one result per column), axis=1 collapses ACROSS the columns (one result per row). argmax/argmin return the POSITION of the extreme instead of its value.",
    points: [
      "a.mean(), a.sum() — whole-array summaries.",
      "m.sum(axis=0) — per column; m.sum(axis=1) — per row.",
      "a.argmax() — index of the largest value."
    ],
    example: code(
      "import numpy as np",
      "",
      "m = np.array([[1, 2, 3], [4, 5, 6]])",
      "print(m.sum())        # 21",
      "print(m.sum(axis=0))  # [5 7 9]",
      "print(m.sum(axis=1))  # [6 15]"
    )
  },
  "np1-random-useful": {
    summary:
      "np.random generates data: np.random.rand(3) for uniform [0, 1), np.random.randint(low, high, size) for integers, np.random.normal for bell curves. Seed with np.random.seed(42) to make 'random' reproducible — essential for shareable experiments. Also everyday: np.sort, np.unique, and np.round.",
    points: [
      "np.random.randint(1, 7, size=10) — ten dice rolls (high exclusive).",
      "np.random.seed(42) — same 'random' numbers every run.",
      "np.unique(a) — sorted distinct values."
    ],
    example: code(
      "import numpy as np",
      "",
      "np.random.seed(42)",
      "rolls = np.random.randint(1, 7, size=5)",
      "print(rolls)",
      "print(np.unique(rolls))"
    )
  },
  "np1-views-copies": {
    summary:
      "Slicing a NumPy array returns a VIEW — a window onto the SAME memory. Changing the slice changes the original, unlike Python lists where slices copy. When you need independence, call .copy() explicitly. This is the number-one NumPy gotcha: silent data mutation through a forgotten view.",
    points: [
      "b = a[1:3] is a view: b[0] = 99 ALSO changes a.",
      "b = a[1:3].copy() — independent data.",
      "Python list slices copy; NumPy slices do not. Remember the difference."
    ],
    example: code(
      "import numpy as np",
      "",
      "a = np.array([1, 2, 3, 4])",
      "view = a[1:3]",
      "view[0] = 99",
      "print(a)            # [ 1 99  3  4] — changed!",
      "",
      "safe = a[1:3].copy()",
      "safe[0] = -1",
      "print(a)            # unchanged this time"
    )
  }
};

export const numpySet1Questions = [
  ...attach("np1-why-numpy", [
    mcq("What is NumPy's core data structure?", ["The ndarray — a fast, fixed-type, n-dimensional array", "The DataFrame", "The linked list"], "The ndarray — a fast, fixed-type, n-dimensional array", "Everything in NumPy revolves around the ndarray."),
    mcq("Why is NumPy so much faster than Python lists for math?", ["Operations run in optimized C over contiguous same-type memory", "It uses the GPU by default", "It caches results"], "Operations run in optimized C over contiguous same-type memory", "No per-element Python interpreter overhead."),
    fill("Complete the universal import.", "import numpy as __1__", [{ label: "__1__", answers: ["np"] }], "np is the convention every tutorial and codebase uses."),
    tf("A NumPy array can freely mix strings, ints, and dicts like a Python list.", false, "Arrays are homogeneous — one dtype for all elements is the price of speed."),
    mcq("What does prices * 1.1 do when prices is an ndarray?", ["Multiplies EVERY element by 1.1, no loop needed", "Repeats the array 1.1 times", "Raises a TypeError"], "Multiplies EVERY element by 1.1, no loop needed", "Vectorization: one expression, all elements."),
    mcq("What would the same operation do if prices were a Python LIST?", ["Raise a TypeError (lists do not multiply by floats)", "Scale each element", "Concatenate"], "Raise a TypeError (lists do not multiply by floats)", "List * int repeats; list * float errors — arrays actually do math."),
    mcq("Which libraries are built on top of NumPy?", ["Pandas, Matplotlib, scikit-learn", "Express and Django", "Git and Docker"], "Pandas, Matplotlib, scikit-learn", "NumPy is the data stack's foundation layer."),
    tf("NumPy must be installed (pip install numpy); it is not in the standard library.", true, "It is third-party — the most installed scientific package in Python."),
    mcq("When does NumPy beat plain Python MOST dramatically?", ["Math over thousands or millions of numbers", "String formatting", "File renaming"], "Math over thousands or millions of numbers", "The bigger the array, the bigger the win."),
    mcq("What does np.array([1, 2, 3]).dtype likely report?", ["int64 (an integer type)", "list", "str"], "int64 (an integer type)", "NumPy infers a single numeric dtype from the data.")
  ]),
  ...attach("np1-creating-arrays", [
    mcq("How do you create an array from a Python list?", ["np.array([1, 2, 3])", "np.list([1, 2, 3])", "array.np([1, 2, 3])"], "np.array([1, 2, 3])", "np.array converts lists (and nested lists) to ndarrays."),
    mcq("What does np.array([[1, 2], [3, 4]]) create?", ["A 2x2 two-dimensional array", "A flat array of 4", "An error"], "A 2x2 two-dimensional array", "Nested lists become rows of a 2D array."),
    fill("Create three zeros.", "z = np.__1__(3)", [{ label: "__1__", answers: ["zeros"] }], "np.zeros(n) fills with 0.0; np.ones is its sibling."),
    mcq("What does np.arange(0, 10, 2) produce?", ["[0 2 4 6 8]", "[0 2 4 6 8 10]", "[2 4 6 8 10]"], "[0 2 4 6 8]", "Like range: start included, stop excluded, step 2."),
    mcq("What does np.linspace(0, 1, 5) produce?", ["[0.   0.25 0.5  0.75 1.  ]", "[0 1 2 3 4]", "[0.2 0.4 0.6 0.8 1.0]"], "[0.   0.25 0.5  0.75 1.  ]", "linspace gives evenly spaced points INCLUDING both endpoints."),
    tf("np.arange excludes its stop value, but np.linspace includes it.", true, "The classic difference between the two range builders."),
    fill("Create a 2x3 array of ones.", "grid = np.ones((2, __1__))", [{ label: "__1__", answers: ["3"] }], "Multi-dimensional shapes pass as a tuple."),
    mcq("How do you create [5 5 5 5]?", ["np.full(4, 5)", "np.array(4, 5)", "np.fives(4)"], "np.full(4, 5)", "np.full(shape, value) fills any shape with one value."),
    mcq("What dtype does np.zeros(3) produce by default?", ["float64", "int64", "bool"], "float64", "zeros/ones default to floats; pass dtype=int to change."),
    typed("Import numpy as np and create an array named evens holding the even numbers 0 through 8 using np.arange, then print it.", "", "import numpy as np\nevens = np.arange(0, 10, 2)\nprint(evens)", ["import numpy as np", "np.arange(0, 10, 2)", "print(evens)"], "arange(0, 10, 2) yields 0, 2, 4, 6, 8.")
  ]),
  ...attach("np1-shape-dtype", [
    mcq("What does a.shape return for a 2-row, 3-column array?", ["(2, 3)", "(3, 2)", "6"], "(2, 3)", "Shape is (rows, columns) for 2D — a tuple, one entry per dimension."),
    mcq("What does a.ndim report?", ["The number of dimensions", "The total elements", "The dtype"], "The number of dimensions", "1 for vectors, 2 for matrices, and beyond."),
    mcq("What does a.size report?", ["The total number of elements", "The bytes used", "The largest value"], "The total number of elements", "size = the product of the shape."),
    fill("Check the element type.", "print(a.__1__)", [{ label: "__1__", answers: ["dtype"] }], "dtype is the single type shared by all elements."),
    mcq("What dtype results from np.array([1, 2.5])?", ["float64 — the int is upcast", "int64", "object"], "float64 — the int is upcast", "Mixed numeric input upcasts to the more general type."),
    mcq("What does np.arange(6).reshape(2, 3) produce?", ["[[0 1 2] [3 4 5]]", "[[0 1] [2 3] [4 5]] transposed", "An error"], "[[0 1 2] [3 4 5]]", "Same six elements, laid out as 2 rows of 3."),
    mcq("Why does np.arange(6).reshape(4, 2) fail?", ["6 elements cannot fill a 4x2 = 8 slot shape", "reshape only doubles", "arange cannot reshape"], "6 elements cannot fill a 4x2 = 8 slot shape", "reshape never invents data — counts must match exactly."),
    tf("reshape(-1) flattens any array back to 1D.", true, "-1 means 'compute this dimension for me'."),
    mcq("What does astype(int) do to np.array([1.7, 2.9])?", ["Converts to [1 2] — truncating toward zero", "Rounds to [2 3]", "Errors"], "Converts to [1 2] — truncating toward zero", "astype casts dtype; float→int truncates rather than rounds."),
    typed("Create m as np.arange(12) reshaped to 3 rows and 4 columns, then print its shape.", "import numpy as np", "m = np.arange(12).reshape(3, 4)\nprint(m.shape)", ["np.arange(12)", ".reshape(3, 4)", "print(m.shape)"], "12 elements fit (3, 4) exactly; shape prints (3, 4).")
  ]),
  ...attach("np1-indexing-slicing", [
    mcq("What does a[0] return for a = np.array([10, 20, 30])?", ["10", "[10]", "An error"], "10", "1D indexing is exactly like Python lists, zero-based."),
    mcq("What does a[-1] return?", ["The last element", "An error — no negatives", "The first element"], "The last element", "Negative indexing works just like lists."),
    mcq("How do you read row 1, column 2 of a 2D array m?", ["m[1, 2]", "m[2, 1]", "m(1)(2)"], "m[1, 2]", "Row first, then column, comma-separated in one bracket."),
    fill("Grab the entire second column.", "col = m[:, __1__]", [{ label: "__1__", answers: ["1"] }], "The colon spans all rows; index 1 picks the second column."),
    mcq("What does m[0] return for a 2D array?", ["The whole first ROW", "The first element", "The first column"], "The whole first ROW", "Single index on a 2D array selects along the first axis (rows)."),
    mcq("What does a[1:4] return for a = np.array([0, 10, 20, 30, 40])?", ["[10 20 30]", "[10 20 30 40]", "[0 10 20]"], "[10 20 30]", "start included, stop excluded — list slicing rules."),
    tf("a[::2] selects every second element.", true, "The step slot works exactly as in Python slicing."),
    mcq("What does m[0:2, 0:2] select?", ["The top-left 2x2 sub-array", "Two full rows", "Four single values"], "The top-left 2x2 sub-array", "Slicing per axis carves rectangular blocks."),
    fill("Take the first two rows, all columns.", "top = m[:2, __1__]", [{ label: "__1__", answers: [":"] }], "A bare colon means everything along that axis."),
    typed("Given m, print the element in the last row and last column using negative indexes.", "import numpy as np\nm = np.array([[1, 2], [3, 4]])", "print(m[-1, -1])", ["m[-1, -1]"], "Negative indexes count from the end on each axis — this prints 4.")
  ]),
  ...attach("np1-vectorized", [
    mcq("What does a * 2 do for an ndarray a?", ["Doubles every element", "Repeats the array twice", "Errors"], "Doubles every element", "Element-wise math is the default — contrast with lists, where * repeats."),
    mcq("What does a + b compute for equal-length arrays?", ["Element-wise sums position by position", "Concatenation", "A dot product"], "Element-wise sums position by position", "[1,2]+[10,20] → [11, 22] as arrays (lists would concatenate!)."),
    mcq("What does a ** 2 produce for a = np.array([1, 2, 3])?", ["[1 4 9]", "[1 2 3 1 2 3]", "9"], "[1 4 9]", "Powers, like all arithmetic, vectorize."),
    mcq("What does a > 2 return for a = np.array([1, 2, 3])?", ["[False False True]", "True", "[3]"], "[False False True]", "Comparisons produce boolean ARRAYS, the raw material of masking."),
    fill("Compute square roots for the whole array.", "roots = np.__1__(values)", [{ label: "__1__", answers: ["sqrt"] }], "np.sqrt, np.exp, np.log — universal functions apply element-wise."),
    tf("Replacing Python loops with vectorized expressions is both faster AND idiomatic NumPy.", true, "A loop over an ndarray is usually a missed one-liner."),
    mcq("Which one-liner converts Celsius array c to Fahrenheit?", ["f = c * 9 / 5 + 32", "f = [x * 9 / 5 + 32 for x in c] is required", "f = np.loop(c, ...)"], "f = c * 9 / 5 + 32", "The whole formula broadcasts over every element at once."),
    mcq("What does np.array([1, 2]) + np.array([10, 20, 30]) do?", ["Raises a shape mismatch error", "Returns [11, 22, 30]", "Pads with zeros"], "Raises a shape mismatch error", "Element-wise math needs compatible shapes — no silent padding."),
    mcq("What does (a * b).sum() compute for equal-length vectors?", ["Their dot product", "The longest vector", "Element count"], "Their dot product", "Multiply element-wise, then total — same as np.dot(a, b)."),
    typed("Given prices, create taxed as prices * 1.2 and print it.", "import numpy as np\nprices = np.array([10.0, 20.0, 50.0])", "taxed = prices * 1.2\nprint(taxed)", ["prices * 1.2", "print(taxed)"], "One vectorized multiply handles every price.")
  ]),
  ...attach("np1-broadcasting", [
    mcq("What is broadcasting?", ["NumPy stretching smaller shapes to combine arrays of different sizes", "Sending arrays over the network", "Printing arrays loudly"], "NumPy stretching smaller shapes to combine arrays of different sizes", "It makes scalar + array and row + matrix work naturally."),
    mcq("What does a + 5 do for an array a?", ["Adds 5 to every element — the scalar broadcasts", "Appends 5", "Errors"], "Adds 5 to every element — the scalar broadcasts", "Scalars are the simplest broadcast."),
    mcq("Shape (2, 3) matrix plus shape (3,) row vector — what happens?", ["The row is added to EACH matrix row", "Error", "Only the first row changes"], "The row is added to EACH matrix row", "The (3,) vector broadcasts across the first dimension."),
    mcq("When are two shapes compatible for broadcasting?", ["Each dimension (right-aligned) matches or one of them is 1", "They are exactly equal only", "Their products match"], "Each dimension (right-aligned) matches or one of them is 1", "(2,3) with (3,), (2,1), or scalar — all compatible."),
    mcq("What happens with shape (3,) + shape (4,)?", ["A broadcasting error", "[4 values]", "Zero padding"], "A broadcasting error", "3 vs 4 — neither matches nor is 1, so NumPy refuses."),
    tf("Broadcasting avoids physically copying the smaller array, so it stays memory-efficient.", true, "The 'stretching' is virtual — no real duplication."),
    mcq("How do you scale each COLUMN of a (4, 3) matrix by a different factor?", ["Multiply by a (3,) factors array — it broadcasts per column", "Loop over rows", "Transpose twice"], "Multiply by a (3,) factors array — it broadcasts per column", "The trailing dimensions align: 3 with 3."),
    mcq("What does this print?", ["[[11 22] [13 24]]", "[[11 12] [23 24]]", "Error"], "[[11 22] [13 24]]", "The (2,) row [10, 20] is added to each row of the matrix.", code("import numpy as np", "m = np.array([[1, 2], [3, 4]])", "print(m + np.array([10, 20]))")),
    fill("Center the data by subtracting the mean (a scalar broadcast).", "centered = data - data.__1__()", [{ label: "__1__", answers: ["mean"] }], "The scalar mean broadcasts across the whole array — classic normalization."),
    mcq("Why is broadcasting worth mastering?", ["It removes loops from real formulas: normalizing columns, applying per-row weights", "It is required syntax for printing", "It compresses files"], "It removes loops from real formulas: normalizing columns, applying per-row weights", "Most practical NumPy is arithmetic + broadcasting + masks.")
  ]),
  ...attach("np1-masking", [
    mcq("What does ages > 18 produce for an ndarray ages?", ["A boolean array, True where the condition holds", "The adult ages", "A count"], "A boolean array, True where the condition holds", "The mask itself — filtering comes when you index with it."),
    mcq("What does ages[ages > 18] return?", ["Only the elements greater than 18", "True/False values", "Indexes"], "Only the elements greater than 18", "Boolean indexing keeps the True positions."),
    fill("Keep the high scores.", "high = scores[scores __1__ 90]", [{ label: "__1__", answers: [">="] }], "Compare, then index with the comparison."),
    mcq("How do you combine two mask conditions (and)?", ["(a > 0) & (a < 10)", "a > 0 and a < 10", "a > 0 && a < 10"], "(a > 0) & (a < 10)", "Use & and | with parentheses; Python's and/or raise an error on arrays."),
    mcq("Why does a > 0 and a < 10 fail on arrays?", ["Python's and cannot decide truthiness of a whole array", "and is deprecated", "Arrays only allow one condition"], "Python's and cannot decide truthiness of a whole array", "The 'truth value of an array is ambiguous' error — use & instead."),
    mcq("What does a[a < 0] = 0 do?", ["Replaces every negative element with 0, in place", "Deletes negatives", "Errors"], "Replaces every negative element with 0, in place", "Masked assignment edits just the matching positions."),
    mcq("What does (ages > 18).sum() compute?", ["HOW MANY elements exceed 18", "The sum of adult ages", "Always 1"], "HOW MANY elements exceed 18", "True counts as 1 — summing a mask counts matches."),
    tf("ages[ages > 18] returns a new array; the original is unchanged.", true, "Boolean indexing copies the selected data."),
    fill("Count the matching elements.", "count = (temps > 30).__1__()", [{ label: "__1__", answers: ["sum"] }], "Summing booleans counts the Trues."),
    typed("Given temps, print only the values above 25 using a boolean mask.", "import numpy as np\ntemps = np.array([18, 30, 22, 35])", "print(temps[temps > 25])", ["temps[temps > 25]"], "Compare and index in one expression — prints [30 35].")
  ]),
  ...attach("np1-aggregations", [
    mcq("What does a.mean() compute?", ["The average of all elements", "The middle element", "The most common value"], "The average of all elements", "mean, sum, max, min, std — the summary toolkit."),
    mcq("What does m.sum(axis=0) compute for a 2D array?", ["One sum PER COLUMN (collapsing down the rows)", "One sum per row", "The grand total"], "One sum PER COLUMN (collapsing down the rows)", "axis=0 collapses the first dimension — down the rows."),
    mcq("What does m.sum(axis=1) compute?", ["One sum PER ROW", "One sum per column", "The transpose"], "One sum PER ROW", "axis=1 collapses across the columns."),
    mcq("What does m.sum() (no axis) return?", ["A single grand total of every element", "Per-column sums", "An error"], "A single grand total of every element", "No axis = collapse everything."),
    fill("Find the largest value.", "peak = readings.__1__()", [{ label: "__1__", answers: ["max"] }], ".max() / .min() find the extremes."),
    mcq("What does a.argmax() return?", ["The INDEX of the largest element", "The largest element", "The last element"], "The INDEX of the largest element", "arg-functions answer 'where?', not 'what?'."),
    mcq("For m with shape (2, 3), what is the shape of m.mean(axis=0)?", ["(3,)", "(2,)", "(2, 3)"], "(3,)", "Collapsing axis 0 leaves one mean per column — 3 of them."),
    tf("a.std() measures how spread out the values are.", true, "Standard deviation is the spread companion to the mean."),
    mcq("What does this print?", ["[2. 3.]", "[1.5 3.5]", "2.5"], "[2. 3.]", "axis=0 averages each column: (1+3)/2=2 and (2+4)/2=3.", code("import numpy as np", "m = np.array([[1, 2], [3, 4]])", "print(m.mean(axis=0))")),
    typed("Given scores, print its mean and its max on separate lines.", "import numpy as np\nscores = np.array([70, 85, 90, 65])", "print(scores.mean())\nprint(scores.max())", ["scores.mean()", "scores.max()"], "Method-call aggregations — prints 77.5 then 90.")
  ]),
  ...attach("np1-random-useful", [
    mcq("What does np.random.rand(3) produce?", ["Three uniform floats in [0, 1)", "Three integers", "Three normal samples"], "Three uniform floats in [0, 1)", "rand is the uniform [0,1) generator."),
    mcq("What does np.random.randint(1, 7, size=10) simulate nicely?", ["Ten dice rolls (1 through 6)", "Ten coin flips", "Lottery numbers 1-7"], "Ten dice rolls (1 through 6)", "randint's high end is EXCLUSIVE — note the 7."),
    tf("In np.random.randint(1, 7), the value 7 can be returned.", false, "Unlike Python's random.randint, NumPy's high is exclusive — a classic trap."),
    mcq("What does np.random.seed(42) accomplish?", ["Makes subsequent random numbers reproducible", "Makes numbers more random", "Generates 42 numbers"], "Makes subsequent random numbers reproducible", "Seeding fixes the sequence — vital for shareable experiments and tests."),
    fill("Seed the generator.", "np.random.__1__(123)", [{ label: "__1__", answers: ["seed"] }], "Same seed, same 'random' results, every run."),
    mcq("What does np.random.normal(0, 1, 100) sample?", ["100 values from a bell curve with mean 0, std 1", "100 uniform values", "Integers 0 to 100"], "100 values from a bell curve with mean 0, std 1", "The normal distribution drives statistics and simulations."),
    mcq("What does np.unique(np.array([3, 1, 3, 2, 1])) return?", ["[1 2 3] — sorted distinct values", "[3 1 2]", "3"], "[1 2 3] — sorted distinct values", "unique de-duplicates AND sorts."),
    mcq("What does np.sort(a) do that a.sort() does not?", ["Returns a sorted COPY, leaving a unchanged", "Sorts faster", "Sorts descending"], "Returns a sorted COPY, leaving a unchanged", "Method sorts in place; function returns new — same trap as Python lists."),
    fill("Round to 2 decimals.", "clean = np.__1__(values, 2)", [{ label: "__1__", answers: ["round"] }], "np.round(array, decimals) vectorizes rounding."),
    typed("Seed numpy's random generator with 42, then print 5 random integers from 1 to 10 inclusive (remember the exclusive high).", "import numpy as np", "np.random.seed(42)\nprint(np.random.randint(1, 11, size=5))", ["np.random.seed(42)", "np.random.randint(1, 11", "size=5"], "Inclusive 10 requires high=11 — the exclusive-high rule in action.")
  ]),
  ...attach("np1-views-copies", [
    mcq("What does slicing an ndarray return?", ["A VIEW onto the same memory", "An independent copy", "A Python list"], "A VIEW onto the same memory", "This is the opposite of Python list slicing — and the source of subtle bugs."),
    mcq("What does this print?", ["[ 1 99  3  4]", "[1 2 3 4]", "[99 99 99 99]"], "[ 1 99  3  4]", "view shares a's memory, so writing through it changes a.", code("import numpy as np", "a = np.array([1, 2, 3, 4])", "view = a[1:3]", "view[0] = 99", "print(a)")),
    mcq("How do you get an INDEPENDENT slice?", ["a[1:3].copy()", "a[1:3].clone", "list(a[1:3]) only"], "a[1:3].copy()", ".copy() allocates new memory — edits stay local."),
    tf("Python list slices copy data, but NumPy array slices share it.", true, "Same syntax, opposite semantics — remember which world you are in."),
    mcq("Does boolean mask indexing (a[a > 2]) return a view or a copy?", ["A copy — masked selections are always copies", "A view", "Depends on the mask"], "A copy — masked selections are always copies", "Fancy/boolean indexing copies; plain slices view."),
    mcq("b = a.reshape(2, 3); b[0, 0] = 99. What happened to a?", ["a changed too — reshape returns a view when it can", "a is untouched", "a was deleted"], "a changed too — reshape returns a view when it can", "Reshapes share memory where possible."),
    fill("Make the sub-array safe to mutate.", "chunk = data[10:20].__1__()", [{ label: "__1__", answers: ["copy"] }], "Explicit copy = explicit independence."),
    mcq("A function modified its input array unexpectedly. Likely cause?", ["It mutated a view/the original instead of working on a copy", "NumPy bug", "The array was too small"], "It mutated a view/the original instead of working on a copy", "Defensive functions copy inputs they intend to modify."),
    tf("a += 1 modifies the array in place, while a = a + 1 creates a new array.", true, "In-place operators matter when views are watching the same memory."),
    typed("Given a, create safe as an independent copy of the first three elements, set safe[0] to -1, then print a (unchanged).", "import numpy as np\na = np.array([5, 6, 7, 8])", "safe = a[:3].copy()\nsafe[0] = -1\nprint(a)", ["a[:3].copy()", "safe[0] = -1", "print(a)"], "The .copy() keeps the mutation away from a — prints [5 6 7 8].")
  ])
];
