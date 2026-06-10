const code = (...lines) => lines.join("\n");
const setId = "pandas-set1";

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

export const pandasSet1Modules = [
  { id: "pd1-series-dataframes", setId, title: "Series and DataFrames" },
  { id: "pd1-reading-data", setId, title: "Reading and Inspecting Data" },
  { id: "pd1-selecting", setId, title: "Selecting Columns and Rows" },
  { id: "pd1-filtering", setId, title: "Filtering Rows" },
  { id: "pd1-columns", setId, title: "Adding and Modifying Columns" },
  { id: "pd1-missing", setId, title: "Handling Missing Data" },
  { id: "pd1-sorting-counts", setId, title: "Sorting and Value Counts" },
  { id: "pd1-groupby", setId, title: "GroupBy and Aggregation" },
  { id: "pd1-merging", setId, title: "Merging and Joining" },
  { id: "pd1-cleanup", setId, title: "Cleanup Workflows" }
];

export const pandasSet1Lessons = {
  "pd1-series-dataframes": {
    summary:
      "Pandas gives Python labeled tables. A Series is one labeled column of values; a DataFrame is a full table — rows and named columns, like a spreadsheet or SQL table in memory. Built on NumPy underneath, imported as pd by universal convention: import pandas as pd.",
    points: [
      "Series = one column; DataFrame = the whole table.",
      "Build small frames from dicts: pd.DataFrame({\"name\": [...], \"age\": [...]}).",
      "df[\"age\"] returns a Series; the frame holds many of them."
    ],
    example: code(
      "import pandas as pd",
      "",
      "df = pd.DataFrame({",
      "    \"name\": [\"Aya\", \"Omar\"],",
      "    \"age\": [25, 31]",
      "})",
      "print(df)"
    )
  },
  "pd1-reading-data": {
    summary:
      "Real data arrives in files: pd.read_csv(\"sales.csv\") loads a CSV into a DataFrame in one line (read_excel, read_json for other formats). First moves with any new dataset: df.head() to see the first rows, df.shape for size, df.info() for column types and missing counts, df.describe() for summary statistics.",
    points: [
      "df = pd.read_csv(\"file.csv\") — the workhorse loader.",
      "df.head(), df.shape, df.info() — the first-look trio.",
      "df.describe() — count/mean/std/min/max per numeric column."
    ],
    example: code(
      "import pandas as pd",
      "",
      "df = pd.read_csv(\"sales.csv\")",
      "print(df.head())",
      "print(df.shape)",
      "df.info()"
    )
  },
  "pd1-selecting": {
    summary:
      "df[\"col\"] selects one column (a Series); df[[\"a\", \"b\"]] with a LIST selects multiple columns (a DataFrame). Rows select through .loc (by label and boolean masks) and .iloc (by integer position): df.loc[3] is the row labeled 3, df.iloc[0] is the first row regardless of labels.",
    points: [
      "df[\"price\"] — Series; df[[\"name\", \"price\"]] — DataFrame.",
      ".loc = label-based; .iloc = position-based.",
      "df.loc[2, \"name\"] — single cell by row label and column name."
    ],
    example: code(
      "import pandas as pd",
      "df = pd.DataFrame({\"name\": [\"Aya\", \"Omar\"], \"age\": [25, 31]})",
      "",
      "print(df[\"name\"])",
      "print(df.iloc[0])",
      "print(df.loc[1, \"age\"])"
    )
  },
  "pd1-filtering": {
    summary:
      "Filtering uses boolean masks, exactly like NumPy: df[df[\"age\"] > 18] keeps matching rows. Combine conditions with & and | (parenthesized — never Python's and/or). String helpers extend masks: df[\"name\"].str.contains(\"a\"), and .isin([...]) tests membership against a list.",
    points: [
      "df[df[\"price\"] > 100] — the fundamental filter shape.",
      "(df[\"a\"] > 1) & (df[\"b\"] < 5) — & | with parentheses.",
      "df[df[\"city\"].isin([\"Cairo\", \"Lagos\"])] — list membership."
    ],
    example: code(
      "import pandas as pd",
      "df = pd.DataFrame({\"name\": [\"Aya\", \"Omar\", \"Lin\"], \"age\": [25, 17, 31]})",
      "",
      "adults = df[df[\"age\"] >= 18]",
      "print(adults)"
    )
  },
  "pd1-columns": {
    summary:
      "New columns assign like dict keys, computed from existing ones in vectorized fashion: df[\"total\"] = df[\"price\"] * df[\"qty\"]. The same syntax overwrites existing columns. .apply(func) runs a function per value when no vectorized form exists, and df.drop(columns=[...]) removes columns (returning a new frame unless you reassign).",
    points: [
      "df[\"total\"] = df[\"price\"] * df[\"qty\"] — whole column at once.",
      "df[\"tier\"] = df[\"score\"].apply(grade_fn) — custom logic per value.",
      "df = df.drop(columns=[\"temp\"]) — drop returns a new frame."
    ],
    example: code(
      "import pandas as pd",
      "df = pd.DataFrame({\"price\": [10, 20], \"qty\": [3, 2]})",
      "",
      "df[\"total\"] = df[\"price\"] * df[\"qty\"]",
      "print(df)"
    )
  },
  "pd1-missing": {
    summary:
      "Missing values appear as NaN. df.isna().sum() counts them per column — the standard health check. Then decide: dropna() removes incomplete rows; fillna(value) substitutes (zeros, means, or sentinel values). Neither modifies the frame unless you reassign — pandas returns new frames by default.",
    points: [
      "df.isna().sum() — the missingness report.",
      "df.dropna() — drop incomplete rows; subset= targets columns.",
      "df[\"age\"] = df[\"age\"].fillna(df[\"age\"].mean()) — impute."
    ],
    example: code(
      "import pandas as pd",
      "df = pd.DataFrame({\"name\": [\"Aya\", \"Omar\"], \"age\": [25, None]})",
      "",
      "print(df.isna().sum())",
      "df[\"age\"] = df[\"age\"].fillna(0)",
      "print(df)"
    )
  },
  "pd1-sorting-counts": {
    summary:
      "df.sort_values(\"price\") sorts by a column (ascending=False for descending; a list sorts by several keys). For categorical questions, df[\"city\"].value_counts() is the single most useful Series method in pandas: it counts each distinct value, sorted by frequency. nlargest/nsmallest answer top-N directly.",
    points: [
      "df.sort_values(\"age\", ascending=False) — biggest first.",
      "df[\"status\"].value_counts() — frequency table in one call.",
      "df.nlargest(5, \"revenue\") — top five rows by a column."
    ],
    example: code(
      "import pandas as pd",
      "df = pd.DataFrame({\"city\": [\"Cairo\", \"Lagos\", \"Cairo\"]})",
      "",
      "print(df[\"city\"].value_counts())"
    )
  },
  "pd1-groupby": {
    summary:
      "groupby is pandas' answer to SQL GROUP BY: df.groupby(\"city\")[\"sales\"].sum() splits rows by city, sums sales within each group, and returns one result per city. .agg() computes several statistics at once. The split-apply-combine pattern answers most 'per-category' business questions in one line.",
    points: [
      "df.groupby(\"team\")[\"score\"].mean() — average per team.",
      ".agg([\"mean\", \"count\"]) — several summaries at once.",
      "Group by multiple keys: df.groupby([\"city\", \"year\"])."
    ],
    example: code(
      "import pandas as pd",
      "df = pd.DataFrame({",
      "    \"city\": [\"Cairo\", \"Lagos\", \"Cairo\"],",
      "    \"sales\": [100, 80, 150]",
      "})",
      "print(df.groupby(\"city\")[\"sales\"].sum())"
    )
  },
  "pd1-merging": {
    summary:
      "pd.merge(orders, users, on=\"user_id\") joins two DataFrames on a shared key — pandas' SQL JOIN. how= picks the flavor: \"inner\" (matches only, the default), \"left\" (keep all left rows, NaN where unmatched), \"outer\" (keep everything). pd.concat stacks frames vertically instead.",
    points: [
      "pd.merge(a, b, on=\"key\") — inner join by default.",
      "how=\"left\" keeps every left row; unmatched right columns become NaN.",
      "pd.concat([df1, df2]) — stack rows from same-shaped frames."
    ],
    example: code(
      "import pandas as pd",
      "users = pd.DataFrame({\"uid\": [1, 2], \"name\": [\"Aya\", \"Omar\"]})",
      "orders = pd.DataFrame({\"uid\": [1, 1, 2], \"total\": [50, 30, 20]})",
      "",
      "print(pd.merge(orders, users, on=\"uid\"))"
    )
  },
  "pd1-cleanup": {
    summary:
      "Real datasets arrive messy. The standard cleanup pass: rename awkward columns (df.rename(columns={...})), fix types (df[\"price\"].astype(float), pd.to_datetime for dates), strip whitespace (.str.strip()), and remove duplicate rows (df.drop_duplicates()). Clean first, analyze second — conclusions from dirty data are wrong conclusions.",
    points: [
      "df.rename(columns={\"Unit Price\": \"price\"}) — sane names.",
      "astype / pd.to_datetime / pd.to_numeric — fix types early.",
      "df.drop_duplicates() and .str.strip() — kill silent dirt."
    ],
    example: code(
      "import pandas as pd",
      "df = pd.DataFrame({\"Name \": [\" Aya\", \" Aya\"], \"Price\": [\"10\", \"10\"]})",
      "",
      "df = df.rename(columns={\"Name \": \"name\", \"Price\": \"price\"})",
      "df[\"name\"] = df[\"name\"].str.strip()",
      "df[\"price\"] = df[\"price\"].astype(float)",
      "df = df.drop_duplicates()",
      "print(df)"
    )
  }
};

export const pandasSet1Questions = [
  ...attach("pd1-series-dataframes", [
    mcq("What is a DataFrame?", ["A table of rows and named columns", "A single list of values", "A chart"], "A table of rows and named columns", "Think spreadsheet or SQL table, in Python memory."),
    mcq("What is a Series?", ["A single labeled column of values", "A row only", "A list of DataFrames"], "A single labeled column of values", "Each DataFrame column is a Series."),
    fill("Complete the universal import.", "import pandas as __1__", [{ label: "__1__", answers: ["pd"] }], "pd is the convention everywhere."),
    mcq("What does df[\"age\"] return?", ["A Series", "A DataFrame", "A Python list"], "A Series", "Single-column selection yields a Series."),
    mcq("Which creates a DataFrame from a dict?", ["pd.DataFrame({\"name\": [\"Aya\"], \"age\": [25]})", "pd.table({...})", "pd.read({...})"], "pd.DataFrame({\"name\": [\"Aya\"], \"age\": [25]})", "Keys become columns, lists become the values."),
    tf("Pandas is built on top of NumPy.", true, "Series values are NumPy arrays underneath — masks and vectorization carry over."),
    mcq("In a DataFrame, what is the index?", ["The row labels", "The first column of data", "The column names"], "The row labels", "The bold left-side labels — defaulting to 0, 1, 2..."),
    mcq("What does df.columns hold?", ["The column names", "The row count", "The dtypes"], "The column names", "Inspect it whenever a KeyError claims a column is missing."),
    tf("A DataFrame's columns can have different dtypes (one numeric, one text).", true, "Per-column types is exactly what frames add over plain 2D arrays."),
    typed("Create a DataFrame df from a dict with column city = [\"Cairo\", \"Lagos\"] and column pop = [20, 15], then print it.", "import pandas as pd", "df = pd.DataFrame({\"city\": [\"Cairo\", \"Lagos\"], \"pop\": [20, 15]})\nprint(df)", ["pd.DataFrame({", "\"city\"", "\"pop\"", "print(df)"], "Dict-of-lists is the standard small-frame constructor.")
  ]),
  ...attach("pd1-reading-data", [
    mcq("Which call loads sales.csv into a DataFrame?", ["pd.read_csv(\"sales.csv\")", "pd.open(\"sales.csv\")", "pd.csv(\"sales.csv\")"], "pd.read_csv(\"sales.csv\")", "read_csv parses the file straight into a frame."),
    mcq("What does df.head() show?", ["The first 5 rows", "The column names only", "The last rows"], "The first 5 rows", "head(n) adjusts the count; tail() shows the end."),
    fill("Peek at the first three rows.", "df.__1__(3)", [{ label: "__1__", answers: ["head"] }], "Always look at the data before analyzing it."),
    mcq("What does df.shape return for 1000 rows and 5 columns?", ["(1000, 5)", "(5, 1000)", "5000"], "(1000, 5)", "shape is (rows, columns)."),
    mcq("What does df.info() report?", ["Column names, dtypes, and non-null counts", "Statistical summaries", "The file path"], "Column names, dtypes, and non-null counts", "info() is the structure-and-missingness X-ray."),
    mcq("What does df.describe() report?", ["count, mean, std, min, max and quartiles for numeric columns", "The first rows", "Memory usage only"], "count, mean, std, min, max and quartiles for numeric columns", "describe() is instant summary statistics."),
    tf("Pandas also reads Excel and JSON via read_excel and read_json.", true, "The read_* family covers most tabular formats."),
    mcq("After loading, prices look like text. Which info() clue reveals it?", ["The price column's dtype shows object instead of float64", "The shape is wrong", "head() refuses to print"], "The price column's dtype shows object instead of float64", "object dtype on a numeric-looking column = strings in disguise."),
    fill("Write the frame back out.", "df.__1__(\"clean.csv\", index=False)", [{ label: "__1__", answers: ["to_csv"] }], "to_csv saves; index=False skips writing the row labels."),
    typed("Load data.csv into df and print its shape.", "import pandas as pd", "df = pd.read_csv(\"data.csv\")\nprint(df.shape)", ["pd.read_csv(\"data.csv\")", "print(df.shape)"], "Load, then size-check — the first two lines of every analysis.")
  ]),
  ...attach("pd1-selecting", [
    mcq("What does df[\"price\"] select?", ["The price column as a Series", "The row labeled price", "A new frame"], "The price column as a Series", "Single brackets + name = one column."),
    mcq("How do you select BOTH name and price?", ["df[[\"name\", \"price\"]] — note the double brackets", "df[\"name\", \"price\"]", "df.get2(\"name\", \"price\")"], "df[[\"name\", \"price\"]] — note the double brackets", "A LIST inside the brackets returns a DataFrame of those columns."),
    mcq("What is the difference between .loc and .iloc?", [".loc selects by label; .iloc by integer position", "They are aliases", ".iloc is for columns only"], ".loc selects by label; .iloc by integer position", "loc = labels, iloc = integers — the i is the hint."),
    fill("Get the FIRST row regardless of its label.", "first = df.__1__[0]", [{ label: "__1__", answers: ["iloc"] }], "iloc[0] is positional — works even when labels are shuffled."),
    mcq("What does df.loc[2, \"name\"] return?", ["The name value of the row labeled 2", "The third column", "Rows 0 to 2"], "The name value of the row labeled 2", "loc[row_label, column_name] reaches one cell."),
    mcq("What does df.iloc[0:3] return?", ["The first three rows", "Rows labeled 0 and 3", "Three columns"], "The first three rows", "iloc slices behave like Python slices — stop excluded."),
    tf("df.loc[0:2] (label slice) INCLUDES the row labeled 2.", true, "Label slicing is inclusive of the stop — a famous difference from iloc."),
    mcq("What does df[\"age\"].mean() compute?", ["The average of the age column", "The middle row", "An error"], "The average of the age column", "Series carry NumPy-style aggregations: mean, max, sum..."),
    fill("Select two columns as a frame.", "subset = df[[\"name\", __1__]]", [{ label: "__1__", answers: ["\"age\"", "'age'"] }], "The inner list names each wanted column."),
    typed("Print the name column of df as a Series.", "import pandas as pd\ndf = pd.DataFrame({\"name\": [\"Aya\", \"Omar\"], \"age\": [25, 31]})", "print(df[\"name\"])", ["df[\"name\"]"], "Single brackets, quoted column name."),
  ]),
  ...attach("pd1-filtering", [
    mcq("What does df[df[\"age\"] > 18] return?", ["Only the rows where age exceeds 18", "A boolean column", "The age column"], "Only the rows where age exceeds 18", "Mask inside brackets = row filter."),
    mcq("What does df[\"age\"] > 18 by itself produce?", ["A boolean Series (the mask)", "Filtered rows", "A count"], "A boolean Series (the mask)", "The mask is reusable: name it, combine it, sum it."),
    fill("Filter to completed orders.", "done = df[df[\"status\"] __1__ \"completed\"]", [{ label: "__1__", answers: ["=="] }], "Equality masks use ==, just like NumPy."),
    mcq("How do you require BOTH conditions?", ["df[(df[\"age\"] > 18) & (df[\"city\"] == \"Cairo\")]", "df[df[\"age\"] > 18 and df[\"city\"] == \"Cairo\"]", "df.where(age, city)"], "df[(df[\"age\"] > 18) & (df[\"city\"] == \"Cairo\")]", "& with parentheses around each comparison — and/or raise the ambiguity error."),
    mcq("Why does using Python's and between masks fail?", ["A whole Series has no single truth value — use & instead", "and is reserved by pandas", "Masks are immutable"], "A whole Series has no single truth value — use & instead", "'The truth value of a Series is ambiguous' — pandas' most famous error."),
    mcq("What does df[df[\"city\"].isin([\"Cairo\", \"Lagos\"])] select?", ["Rows whose city is either Cairo or Lagos", "Cities containing both words", "Rows missing a city"], "Rows whose city is either Cairo or Lagos", "isin replaces chains of == ORs."),
    fill("Match names containing 'ya'.", "hits = df[df[\"name\"].str.__1__(\"ya\")]", [{ label: "__1__", answers: ["contains"] }], ".str unlocks string operations across the whole column."),
    tf("Filtering returns a new frame; the original df keeps all its rows.", true, "Assign the result if you want to keep it: adults = df[mask]."),
    mcq("What does (df[\"price\"] > 100).sum() compute?", ["How many rows have price over 100", "The total of those prices", "Always 1"], "How many rows have price over 100", "Summing a mask counts the Trues — same trick as NumPy."),
    typed("Filter df to rows where score is at least 90 and print the result.", "import pandas as pd\ndf = pd.DataFrame({\"name\": [\"Aya\", \"Omar\"], \"score\": [95, 80]})", "print(df[df[\"score\"] >= 90])", ["df[df[\"score\"] >= 90]"], "The mask-in-brackets pattern — prints only Aya's row.")
  ]),
  ...attach("pd1-columns", [
    mcq("How do you add a total column from price and qty?", ["df[\"total\"] = df[\"price\"] * df[\"qty\"]", "df.add_column(\"total\")", "df[\"total\"] == df[\"price\"] * df[\"qty\"]"], "df[\"total\"] = df[\"price\"] * df[\"qty\"]", "Assigning to a new column name creates it — vectorized over all rows."),
    mcq("What does df[\"price\"] = df[\"price\"] * 1.2 do?", ["Overwrites the price column with raised values", "Creates price_2", "Errors"], "Overwrites the price column with raised values", "Assigning to an existing name replaces its values."),
    fill("Create a flag column.", "df[\"is_adult\"] = df[\"age\"] __1__ 18", [{ label: "__1__", answers: [">="] }], "Boolean expressions make boolean columns."),
    mcq("When do you reach for .apply(func)?", ["When the per-value logic has no vectorized equivalent", "For every column operation", "Only for strings"], "When the per-value logic has no vectorized equivalent", "Prefer vectorized forms; apply is the flexible fallback."),
    mcq("What does df[\"grade\"] = df[\"score\"].apply(to_grade) do?", ["Runs to_grade on each score and stores the results", "Applies the column to the function once", "Renames score"], "Runs to_grade on each score and stores the results", "apply maps a function down the Series."),
    mcq("How do you remove the temp column?", ["df = df.drop(columns=[\"temp\"])", "df.delete(\"temp\")", "del df.temp"], "df = df.drop(columns=[\"temp\"])", "drop returns a new frame — reassign (or pass inplace=True)."),
    tf("Most pandas operations return NEW frames rather than modifying in place.", true, "Forgetting to reassign is the top 'why didn't it change?' bug."),
    fill("Lowercase every name.", "df[\"name\"] = df[\"name\"].str.__1__()", [{ label: "__1__", answers: ["lower"] }], ".str.lower() transforms the whole text column."),
    mcq("What does df[\"price\"].round(2) return?", ["A new Series with rounded values (df unchanged until assigned)", "Rounds df in place", "An error"], "A new Series with rounded values (df unchanged until assigned)", "Assign it back: df[\"price\"] = df[\"price\"].round(2)."),
    typed("Add a column total to df equal to price times qty, then print df.", "import pandas as pd\ndf = pd.DataFrame({\"price\": [10, 20], \"qty\": [3, 2]})", "df[\"total\"] = df[\"price\"] * df[\"qty\"]\nprint(df)", ["df[\"total\"] = df[\"price\"] * df[\"qty\"]", "print(df)"], "Column arithmetic is row-wise automatically — totals 30 and 40.")
  ]),
  ...attach("pd1-missing", [
    mcq("How does pandas represent missing values?", ["NaN", "0", "The string \"missing\""], "NaN", "NaN (not a number) marks absent data — None becomes NaN on load."),
    mcq("Which expression counts missing values per column?", ["df.isna().sum()", "df.missing()", "df.count(NaN)"], "df.isna().sum()", "isna() masks the holes; sum() counts them column by column."),
    fill("Drop incomplete rows.", "clean = df.__1__()", [{ label: "__1__", answers: ["dropna"] }], "dropna removes any row containing NaN (subset= narrows which columns count)."),
    mcq("What does df[\"age\"].fillna(0) do?", ["Returns the age column with NaNs replaced by 0", "Deletes NaN rows", "Fills the whole frame"], "Returns the age column with NaNs replaced by 0", "fillna substitutes a value — remember to assign the result."),
    mcq("Which fills missing ages with the column's average?", ["df[\"age\"] = df[\"age\"].fillna(df[\"age\"].mean())", "df[\"age\"].fillna(\"mean\")", "df.fill(\"age\")"], "df[\"age\"] = df[\"age\"].fillna(df[\"age\"].mean())", "Mean imputation — a standard simple strategy."),
    tf("df.dropna() modifies df itself.", false, "It returns a new frame; reassign or use inplace=True."),
    mcq("When is DROPPING rows reasonable versus filling?", ["When few rows are affected and losing them won't bias the data", "Always — dropping is cleaner", "Never"], "When few rows are affected and losing them won't bias the data", "Dropping 2% is usually fine; dropping 40% destroys the dataset."),
    mcq("Why does a numeric column with NaNs sometimes surprise people in counts?", ["count() and mean() skip NaN — totals differ from len(df)", "NaN counts as zero", "NaN is negative"], "count() and mean() skip NaN — totals differ from len(df)", "Most aggregations silently ignore NaN — know what your denominator is."),
    fill("Find rows where email IS missing.", "no_email = df[df[\"email\"].__1__()]", [{ label: "__1__", answers: ["isna"] }], "isna() as a mask selects the incomplete rows themselves."),
    typed("Fill missing values in the age column of df with 0 (reassign the column), then print df.", "import pandas as pd\ndf = pd.DataFrame({\"name\": [\"Aya\", \"Omar\"], \"age\": [25, None]})", "df[\"age\"] = df[\"age\"].fillna(0)\nprint(df)", ["df[\"age\"].fillna(0)", "print(df)"], "fillna + reassignment is the imputation idiom.")
  ]),
  ...attach("pd1-sorting-counts", [
    mcq("How do you sort by price, cheapest first?", ["df.sort_values(\"price\")", "df.sort(\"price\")", "df.order(\"price\")"], "df.sort_values(\"price\")", "sort_values sorts by a column, ascending by default."),
    fill("Sort biggest first.", "ranked = df.sort_values(\"score\", __1__=False)", [{ label: "__1__", answers: ["ascending"] }], "ascending=False flips to descending."),
    mcq("What does df[\"city\"].value_counts() return?", ["Each distinct city with its row count, most frequent first", "The number of cities", "An alphabetical list"], "Each distinct city with its row count, most frequent first", "value_counts is THE instant frequency table."),
    mcq("How do you sort by city, then by score within each city?", ["df.sort_values([\"city\", \"score\"])", "df.sort_values(\"city\" + \"score\")", "Two separate sorts always"], "df.sort_values([\"city\", \"score\"])", "A list of keys sorts hierarchically, left to right."),
    mcq("What does df.nlargest(5, \"revenue\") return?", ["The 5 rows with the highest revenue", "The largest 5 columns", "Revenue above 5"], "The 5 rows with the highest revenue", "nlargest/nsmallest answer top-N without a full sort."),
    tf("sort_values returns a new frame; df itself stays unsorted unless reassigned.", true, "Same reassignment rule as everywhere in pandas."),
    mcq("What does df[\"status\"].unique() return?", ["The distinct status values as an array", "The frequency table", "The first status"], "The distinct status values as an array", "unique lists distinct values; value_counts also counts them."),
    mcq("What does df[\"city\"].nunique() return?", ["HOW MANY distinct cities there are", "The unique city names", "The most common city"], "HOW MANY distinct cities there are", "n-unique = number of unique values."),
    fill("Get the frequency table of grades.", "print(df[\"grade\"].__1__())", [{ label: "__1__", answers: ["value_counts"] }], "value_counts: distinct values + counts, sorted by frequency."),
    typed("Sort df by age descending and print the result.", "import pandas as pd\ndf = pd.DataFrame({\"name\": [\"Aya\", \"Omar\"], \"age\": [25, 31]})", "print(df.sort_values(\"age\", ascending=False))", ["sort_values(\"age\", ascending=False)"], "Omar (31) rises to the top.")
  ]),
  ...attach("pd1-groupby", [
    mcq("What does df.groupby(\"city\")[\"sales\"].sum() compute?", ["Total sales per city", "Total sales overall", "Cities per sale"], "Total sales per city", "Split by city, sum within each group, one row per city."),
    mcq("What is the split-apply-combine pattern?", ["Split rows into groups, apply an aggregate per group, combine results", "Splitting CSV files", "A merge strategy"], "Split rows into groups, apply an aggregate per group, combine results", "groupby implements the whole pattern in one chain."),
    fill("Average score per team.", "df.groupby(\"team\")[\"score\"].__1__()", [{ label: "__1__", answers: ["mean"] }], "Any aggregation works after the group: mean, sum, max, count..."),
    mcq("What does df.groupby(\"city\").size() return?", ["The number of rows per city", "The memory used", "City name lengths"], "The number of rows per city", "size() counts group members — like SQL's COUNT(*) per group."),
    mcq("How do you compute BOTH mean and count of sales per city?", ["df.groupby(\"city\")[\"sales\"].agg([\"mean\", \"count\"])", "Two separate groupbys are required", "df.groupby(\"city\").meancount()"], "df.groupby(\"city\")[\"sales\"].agg([\"mean\", \"count\"])", "agg with a list returns one column per statistic."),
    mcq("What does df.groupby([\"city\", \"year\"])[\"sales\"].sum() produce?", ["Sales totals per city-year combination", "Two separate tables", "An error"], "Sales totals per city-year combination", "Multiple keys nest the grouping."),
    tf("groupby is pandas' equivalent of SQL's GROUP BY.", true, "Same mental model: buckets, then aggregates per bucket."),
    mcq("Which question is groupby built to answer?", ["What is the average order value PER customer segment?", "What is in row 5?", "How do I rename a column?"], "What is the average order value PER customer segment?", "Any per-category summary is a groupby."),
    fill("Count orders per status.", "df.groupby(\"status\").__1__()", [{ label: "__1__", answers: ["size"] }], "size() per group = the categorical breakdown."),
    typed("Group df by city and print the sum of sales per city.", "import pandas as pd\ndf = pd.DataFrame({\"city\": [\"Cairo\", \"Lagos\", \"Cairo\"], \"sales\": [100, 80, 150]})", "print(df.groupby(\"city\")[\"sales\"].sum())", ["groupby(\"city\")", "[\"sales\"].sum()"], "Cairo totals 250, Lagos 80.")
  ]),
  ...attach("pd1-merging", [
    mcq("What does pd.merge(orders, users, on=\"user_id\") do?", ["Joins the frames on matching user_id values", "Stacks them vertically", "Copies users into orders"], "Joins the frames on matching user_id values", "merge is pandas' SQL JOIN."),
    mcq("What is the DEFAULT merge type?", ["inner — only rows with matches in both frames", "left", "outer"], "inner — only rows with matches in both frames", "Unmatched rows silently disappear in the default — know your how=."),
    fill("Keep every order even without a user match.", "result = pd.merge(orders, users, on=\"user_id\", how=\"__1__\")", [{ label: "__1__", answers: ["left"] }], "how=\"left\" preserves the left frame; missing right values become NaN."),
    mcq("After a left merge, what fills the right side of unmatched rows?", ["NaN", "Zeros", "Empty strings"], "NaN", "Missing matches surface as NaN — countable with isna()."),
    mcq("What does how=\"outer\" keep?", ["All rows from BOTH frames", "Only matches", "Only the left frame"], "All rows from BOTH frames", "Outer is the union; inner is the intersection."),
    mcq("What does pd.concat([jan, feb]) do for same-columned frames?", ["Stacks their rows into one taller frame", "Joins them on a key", "Averages them"], "Stacks their rows into one taller frame", "concat appends vertically; merge joins horizontally on keys."),
    tf("Merging frames whose key columns have different names requires left_on and right_on.", true, "pd.merge(a, b, left_on=\"uid\", right_on=\"user_id\")."),
    mcq("orders has 3 rows for user 1; users has user 1 once. How many user-1 rows after an inner merge?", ["3 — the user info repeats per order", "1", "0"], "3 — the user info repeats per order", "One-to-many joins duplicate the 'one' side per match."),
    mcq("How do you find users who placed NO orders?", ["Left-merge users to orders, then filter rows where the order column isna()", "Inner merge and look for zeros", "concat and drop duplicates"], "Left-merge users to orders, then filter rows where the order column isna()", "Same trick as SQL's LEFT JOIN + IS NULL."),
    typed("Merge orders with users on the uid column (inner) and print the result.", "import pandas as pd\nusers = pd.DataFrame({\"uid\": [1, 2], \"name\": [\"Aya\", \"Omar\"]})\norders = pd.DataFrame({\"uid\": [1, 2, 1], \"total\": [50, 20, 30]})", "print(pd.merge(orders, users, on=\"uid\"))", ["pd.merge(orders, users, on=\"uid\")"], "Each order row gains its user's name.")
  ]),
  ...attach("pd1-cleanup", [
    mcq("How do you rename the column Unit Price to price?", ["df = df.rename(columns={\"Unit Price\": \"price\"})", "df.columns.rename(\"price\")", "df[\"Unit Price\"].name = \"price\""], "df = df.rename(columns={\"Unit Price\": \"price\"})", "rename takes an old→new mapping; reassign the result."),
    mcq("A price column loaded as strings (\"10.5\"). How do you fix the type?", ["df[\"price\"] = df[\"price\"].astype(float)", "df[\"price\"].tofloat()", "float(df[\"price\"])"], "df[\"price\"] = df[\"price\"].astype(float)", "astype converts the column's dtype."),
    fill("Parse the date strings.", "df[\"date\"] = pd.__1__(df[\"date\"])", [{ label: "__1__", answers: ["to_datetime"] }], "to_datetime unlocks .dt accessors: year, month, weekday."),
    mcq("What does df.drop_duplicates() do?", ["Removes rows that are exact duplicates of earlier rows", "Removes duplicate columns", "Sorts unique values"], "Removes rows that are exact duplicates of earlier rows", "subset= restricts which columns define 'duplicate'."),
    fill("Strip stray whitespace from names.", "df[\"name\"] = df[\"name\"].str.__1__()", [{ label: "__1__", answers: ["strip"] }], "\" Aya\" and \"Aya\" should not count as different people."),
    mcq("Why fix types and whitespace BEFORE analysis?", ["Dirty data silently produces wrong groupings, joins, and math", "Pandas requires it to load", "It compresses the file"], "Dirty data silently produces wrong groupings, joins, and math", "\"10\" + \"10\" and ' Cairo' vs 'Cairo' corrupt results without erroring."),
    mcq("What does df[\"date\"].dt.year extract after to_datetime?", ["The year of each date", "The number of days", "A string"], "The year of each date", ".dt accessors decompose datetime columns."),
    tf("df.duplicated().sum() counts how many duplicate rows exist.", true, "The diagnosis before the drop_duplicates() cure."),
    mcq("Which is a sane cleanup ORDER for a fresh CSV?", ["inspect (head/info) → rename → fix types → strip text → dedupe → handle NaN", "groupby first, clean later", "Sort, then everything else"], "inspect (head/info) → rename → fix types → strip text → dedupe → handle NaN", "Look before touching; clean before analyzing."),
    typed("Rename column Name to name in df (reassign) and print df.columns.", "import pandas as pd\ndf = pd.DataFrame({\"Name\": [\"Aya\"]})", "df = df.rename(columns={\"Name\": \"name\"})\nprint(df.columns)", ["df.rename(columns={\"Name\": \"name\"})", "print(df.columns)"], "rename + reassign — the column list confirms the change.")
  ])
];
