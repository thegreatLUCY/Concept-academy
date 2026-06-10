const code = (...lines) => lines.join("\n");
const setId = "sql-set2";

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
  item("code", { prompt, starter, expected, required, explanation, caseInsensitive: true, ...(accepted ? { accepted } : {}) });

function attach(moduleId, items) {
  return items.map((question, index) => ({
    id: `${moduleId}-${String(index + 1).padStart(2, "0")}`,
    setId,
    moduleId,
    ...question
  }));
}

export const sqlSet2Modules = [
  { id: "sql2-subqueries", setId, title: "Subqueries" },
  { id: "sql2-ctes", setId, title: "CTEs with WITH" },
  { id: "sql2-case", setId, title: "CASE Expressions" },
  { id: "sql2-functions", setId, title: "Functions and COALESCE" },
  { id: "sql2-window-basics", setId, title: "Window Functions: Ranking" },
  { id: "sql2-window-advanced", setId, title: "Window Functions: LAG, LEAD, Running Totals" },
  { id: "sql2-set-ops", setId, title: "Self Joins and Set Operations" },
  { id: "sql2-transactions", setId, title: "Transactions and ACID" },
  { id: "sql2-indexes", setId, title: "Indexes and Performance" },
  { id: "sql2-schema-design", setId, title: "Normalization and Schema Design" }
];

export const sqlSet2Lessons = {
  "sql2-subqueries": {
    summary:
      "A subquery is a query inside a query. In WHERE, it feeds values to a condition: WHERE price > (SELECT AVG(price) FROM products) compares each row against a computed value, and WHERE id IN (SELECT user_id FROM orders) tests membership in another query's results. A scalar subquery must return exactly one value; an IN subquery may return many rows of one column.",
    points: [
      "Scalar: WHERE salary > (SELECT AVG(salary) FROM employees).",
      "Membership: WHERE id IN (SELECT user_id FROM orders).",
      "The inner query runs conceptually first; its result feeds the outer one."
    ],
    example: code(
      "-- products more expensive than average",
      "SELECT name, price",
      "FROM products",
      "WHERE price > (SELECT AVG(price) FROM products);"
    )
  },
  "sql2-ctes": {
    summary:
      "A CTE (common table expression) names a subquery up front with WITH, so the main query reads like a pipeline: WITH high_earners AS (SELECT ...) SELECT ... FROM high_earners. CTEs replace deeply nested subqueries with readable, reusable steps — and several CTEs can chain, each building on the previous one. For most queries, a CTE and an equivalent subquery perform the same; the win is clarity.",
    points: [
      "WITH name AS (SELECT ...) SELECT ... FROM name;",
      "Chain steps: WITH a AS (...), b AS (SELECT ... FROM a) SELECT ... FROM b;",
      "Prefer CTEs over nesting three subqueries deep — readability is a feature."
    ],
    example: code(
      "WITH city_totals AS (",
      "  SELECT city, SUM(amount) AS total",
      "  FROM sales",
      "  GROUP BY city",
      ")",
      "SELECT city, total",
      "FROM city_totals",
      "WHERE total > 1000;"
    )
  },
  "sql2-case": {
    summary:
      "CASE is SQL's if/else, usable anywhere an expression fits: CASE WHEN score >= 90 THEN 'A' WHEN score >= 80 THEN 'B' ELSE 'C' END. Conditions are tested top to bottom and the first match wins. Its power move is conditional aggregation: SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) computes a filtered total inside an unfiltered query — multiple metrics in one pass.",
    points: [
      "CASE WHEN cond THEN value WHEN cond THEN value ELSE fallback END.",
      "First matching WHEN wins; without ELSE, non-matches become NULL.",
      "Conditional aggregation: COUNT(CASE WHEN ... THEN 1 END) per category in one query."
    ],
    example: code(
      "SELECT name,",
      "  CASE",
      "    WHEN score >= 90 THEN 'A'",
      "    WHEN score >= 80 THEN 'B'",
      "    ELSE 'C'",
      "  END AS grade",
      "FROM students;"
    )
  },
  "sql2-functions": {
    summary:
      "Row functions transform values inline: UPPER/LOWER change case, LENGTH measures, SUBSTR slices, TRIM strips, and || (or CONCAT) joins strings. ROUND handles numbers. The one to burn in is COALESCE(a, b, ...): it returns the first non-NULL argument — the standard way to give missing data a default, as in COALESCE(nickname, name, 'Anonymous').",
    points: [
      "UPPER(name), LENGTH(email), SUBSTR(code, 1, 3), TRIM(input).",
      "COALESCE(phone, 'no phone') — first non-NULL wins.",
      "Functions in WHERE work but can defeat indexes — more in the index module."
    ],
    example: code(
      "SELECT",
      "  UPPER(name) AS shout,",
      "  COALESCE(nickname, name) AS display_name,",
      "  ROUND(price * 1.2, 2) AS taxed",
      "FROM users;"
    )
  },
  "sql2-window-basics": {
    summary:
      "Window functions compute across related rows WITHOUT collapsing them — every row stays, gaining a computed column. ROW_NUMBER() OVER (ORDER BY score DESC) numbers rows by rank; PARTITION BY restarts the numbering per group: ROW_NUMBER() OVER (PARTITION BY city ORDER BY score DESC) ranks within each city. RANK() leaves gaps after ties; DENSE_RANK() does not.",
    points: [
      "func() OVER (PARTITION BY group ORDER BY col) — the window shape.",
      "GROUP BY collapses rows; window functions keep them.",
      "ROW_NUMBER: 1,2,3,4. RANK with a tie: 1,1,3. DENSE_RANK: 1,1,2."
    ],
    example: code(
      "SELECT name, city, score,",
      "  ROW_NUMBER() OVER (PARTITION BY city ORDER BY score DESC) AS city_rank",
      "FROM players;"
    )
  },
  "sql2-window-advanced": {
    summary:
      "Windows also look sideways and backwards. LAG(col) OVER (ORDER BY date) reads the PREVIOUS row's value (LEAD reads the next) — perfect for month-over-month change. SUM(col) OVER (ORDER BY date) produces a running total because an ORDER BY inside OVER defaults the frame to 'start through current row'. Top-N-per-group queries wrap a ranking window in a CTE, then filter WHERE rn <= N.",
    points: [
      "LAG(revenue) OVER (ORDER BY month) — previous month's value, NULL on the first row.",
      "SUM(amount) OVER (ORDER BY date) — running total.",
      "Top-3 per category: rank in a CTE, then WHERE rank <= 3 outside."
    ],
    example: code(
      "SELECT month, revenue,",
      "  revenue - LAG(revenue) OVER (ORDER BY month) AS change,",
      "  SUM(revenue) OVER (ORDER BY month) AS running_total",
      "FROM monthly_sales;"
    )
  },
  "sql2-set-ops": {
    summary:
      "A self join joins a table to itself under two aliases — how you pair employees with their managers stored in the same table. Set operations combine whole result sets: UNION merges (deduplicating; UNION ALL keeps duplicates and is faster), INTERSECT keeps rows present in both, EXCEPT keeps rows in the first but not the second. Column counts and types must line up.",
    points: [
      "FROM employees e JOIN employees m ON e.manager_id = m.id — two aliases, one table.",
      "UNION dedupes; UNION ALL does not (and is cheaper).",
      "EXCEPT = in A but not B — a clean anti-join."
    ],
    example: code(
      "SELECT e.name AS employee, m.name AS manager",
      "FROM employees e",
      "JOIN employees m ON e.manager_id = m.id;"
    )
  },
  "sql2-transactions": {
    summary:
      "A transaction makes several statements succeed or fail as one unit: BEGIN, statements, COMMIT to keep them — or ROLLBACK to undo them all. The classic example is a money transfer: subtracting from one account and adding to another must never half-happen. ACID names the guarantees: Atomicity (all or nothing), Consistency (rules hold), Isolation (concurrent transactions do not trample each other), Durability (committed means saved).",
    points: [
      "BEGIN; UPDATE ...; UPDATE ...; COMMIT; — one atomic unit.",
      "ROLLBACK undoes everything since BEGIN.",
      "A crash mid-transaction = automatic rollback; committed work survives."
    ],
    example: code(
      "BEGIN;",
      "UPDATE accounts SET balance = balance - 100 WHERE id = 1;",
      "UPDATE accounts SET balance = balance + 100 WHERE id = 2;",
      "COMMIT;"
    )
  },
  "sql2-indexes": {
    summary:
      "An index is a sorted lookup structure on a column, turning full-table scans into fast seeks: CREATE INDEX idx_users_email ON users(email). Indexes are not free — every INSERT/UPDATE must also update them — so index the columns you actually filter and join on, not everything. EXPLAIN shows the query plan; wrapping an indexed column in a function (WHERE LOWER(email) = ...) usually prevents the index from being used.",
    points: [
      "CREATE INDEX idx_orders_user ON orders(user_id); — speed up joins/filters.",
      "Primary keys are indexed automatically.",
      "EXPLAIN reveals scans vs index seeks; functions on columns defeat indexes."
    ],
    example: code(
      "CREATE INDEX idx_orders_user ON orders(user_id);",
      "",
      "EXPLAIN",
      "SELECT * FROM orders WHERE user_id = 42;"
    )
  },
  "sql2-schema-design": {
    summary:
      "Normalization removes duplicated facts. 1NF: one value per cell (no comma-separated lists). 2NF/3NF in practice: every non-key column depends on the key, the whole key, and nothing but the key — so a customer's city lives in customers, not copied onto every order. Duplicated data drifts out of sync (update anomalies). Foreign keys with constraints enforce the links; denormalize only deliberately, for measured read performance.",
    points: [
      "Smell: the same fact stored in many rows — change one, miss the rest.",
      "Split repeating groups into their own tables linked by foreign keys.",
      "Many-to-many needs a junction table (student_courses)."
    ],
    example: code(
      "-- instead of orders(customer_name, customer_city, ...)",
      "CREATE TABLE customers (",
      "  id INTEGER PRIMARY KEY,",
      "  name TEXT NOT NULL,",
      "  city TEXT",
      ");",
      "CREATE TABLE orders (",
      "  id INTEGER PRIMARY KEY,",
      "  customer_id INTEGER REFERENCES customers(id),",
      "  total REAL",
      ");"
    )
  }
};

export const sqlSet2Questions = [
  ...attach("sql2-subqueries", [
    mcq("What is a subquery?", ["A query nested inside another query", "A query on a small table", "A saved query file"], "A query nested inside another query", "The inner query's result feeds the outer query's condition or FROM."),
    mcq("What does this query return?", ["Products priced above the overall average", "The average price", "All products, averaged"], "Products priced above the overall average", "The scalar subquery computes one number; each row compares against it.", code("SELECT name FROM products", "WHERE price > (SELECT AVG(price) FROM products);")),
    mcq("How many values must a scalar subquery (used with >) return?", ["Exactly one", "One per row", "Any number"], "Exactly one", "More than one value makes the comparison ambiguous and errors."),
    fill("Find users who have placed orders.", "SELECT * FROM users\nWHERE id __1__ (SELECT user_id FROM orders);", [{ label: "__1__", answers: ["IN", "in"] }], "IN tests membership in the subquery's result set."),
    mcq("How do you find users with NO orders using a subquery?", ["WHERE id NOT IN (SELECT user_id FROM orders)", "WHERE id != (SELECT user_id FROM orders)", "WHERE orders IS NULL"], "WHERE id NOT IN (SELECT user_id FROM orders)", "NOT IN excludes every id the subquery returned (beware NULLs in the subquery)."),
    tf("A subquery in WHERE can see and use columns from any unrelated query running at the same time.", false, "A subquery sees its own tables (and, if correlated, the outer query's row) — nothing else."),
    mcq("What is a correlated subquery?", ["An inner query that references the outer query's current row", "Two subqueries joined together", "A subquery with GROUP BY"], "An inner query that references the outer query's current row", "It conceptually re-runs per outer row — powerful but potentially slow."),
    mcq("Where else can a subquery appear besides WHERE?", ["In FROM (as a derived table) and in SELECT", "Only in WHERE", "Only in ORDER BY"], "In FROM (as a derived table) and in SELECT", "FROM (SELECT ...) AS t treats the result like a table."),
    tf("WHERE price > (SELECT price FROM products) is safe when products has many rows.", false, "A multi-row result breaks the scalar comparison — aggregate it or use IN/ANY."),
    typed("Write a query selecting name from employees whose salary is greater than the average salary (use a scalar subquery).", "", "SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);", ["(SELECT AVG(salary) FROM employees)", "WHERE salary >"], "The subquery computes the single average; the outer query filters against it.")
  ]),
  ...attach("sql2-ctes", [
    mcq("What does WITH introduce?", ["A named subquery (CTE) usable like a table in the main query", "A new table on disk", "A transaction"], "A named subquery (CTE) usable like a table in the main query", "Common table expressions name intermediate steps."),
    fill("Name the step.", "__1__ big_orders AS (\n  SELECT * FROM orders WHERE total > 100\n)\nSELECT COUNT(*) FROM big_orders;", [{ label: "__1__", answers: ["WITH", "with"] }], "WITH name AS (query) precedes the main SELECT."),
    mcq("Why prefer a CTE over a deeply nested subquery?", ["The query reads top-to-bottom as named steps", "CTEs are always dramatically faster", "Subqueries are deprecated"], "The query reads top-to-bottom as named steps", "The usual win is readability and reuse, not raw speed."),
    mcq("How do you define TWO CTEs?", ["WITH a AS (...), b AS (...) SELECT ...", "WITH a AS (...) WITH b AS (...)", "Two separate WITH statements"], "WITH a AS (...), b AS (...) SELECT ...", "One WITH, comma-separated CTEs — later ones can read earlier ones."),
    tf("A CTE is stored permanently in the database after the query runs.", false, "CTEs exist only for the duration of their statement — that is what makes them lightweight."),
    mcq("What does this return?", ["Cities whose total sales exceed 1000", "All sales over 1000", "One row with the grand total"], "Cities whose total sales exceed 1000", "Step 1 aggregates per city; step 2 filters the aggregates.", code("WITH city_totals AS (", "  SELECT city, SUM(amount) AS total", "  FROM sales GROUP BY city", ")", "SELECT city FROM city_totals WHERE total > 1000;")),
    mcq("Can the second CTE reference the first?", ["Yes — CTEs chain in order", "No, they are isolated", "Only with RECURSIVE"], "Yes — CTEs chain in order", "Pipelines of transformations are the idiomatic CTE style."),
    tf("Filtering an aggregate like SUM(amount) > 1000 can be done in the outer query's WHERE when the aggregate was computed in a CTE.", true, "Once the CTE materializes total as a column, plain WHERE applies — no HAVING needed outside."),
    mcq("What is WITH RECURSIVE used for?", ["Walking hierarchies like org charts or category trees", "Speeding up any CTE", "Avoiding GROUP BY"], "Walking hierarchies like org charts or category trees", "Recursive CTEs repeatedly join results to themselves until done — the advanced form."),
    typed("Using a CTE named adult_users that selects all users with age >= 18, count the rows in it.", "", "WITH adult_users AS (SELECT * FROM users WHERE age >= 18) SELECT COUNT(*) FROM adult_users;", ["WITH adult_users AS", "age >= 18", "SELECT COUNT(*) FROM adult_users"], "Define the step, then query it like a table.")
  ]),
  ...attach("sql2-case", [
    mcq("What is CASE in SQL?", ["An if/else expression usable wherever a value fits", "A loop", "A table constraint"], "An if/else expression usable wherever a value fits", "CASE produces a VALUE per row."),
    mcq("What grade does score = 85 get?", ["B", "A", "C"], "B", "Conditions check top-down; 85 fails >= 90, passes >= 80, and the first match wins.", code("CASE", "  WHEN score >= 90 THEN 'A'", "  WHEN score >= 80 THEN 'B'", "  ELSE 'C'", "END")),
    mcq("What happens to rows matching NO branch when there is no ELSE?", ["They get NULL", "They are removed", "The query errors"], "They get NULL", "Missing ELSE means a silent NULL — usually add the fallback."),
    fill("Complete the expression.", "SELECT name,\n  CASE __1__ stock = 0 THEN 'out' ELSE 'in stock' END AS availability\nFROM products;", [{ label: "__1__", answers: ["WHEN", "when"] }], "Each branch is WHEN condition THEN value."),
    tf("Branch order in CASE is irrelevant because SQL picks the best match.", false, "Strictly top-down, first match wins — putting >= 80 before >= 90 would swallow the A grades."),
    mcq("What does SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) compute?", ["The total of PAID amounts only, inside an unfiltered query", "The total of all amounts", "The count of paid rows"], "The total of PAID amounts only, inside an unfiltered query", "Conditional aggregation — multiple filtered metrics in one pass."),
    mcq("How do you count paid AND unpaid orders in ONE query without WHERE?", ["Two CASE-wrapped aggregates side by side", "Impossible — two queries needed", "GROUP BY both statuses twice"], "Two CASE-wrapped aggregates side by side", "COUNT(CASE WHEN paid THEN 1 END), COUNT(CASE WHEN NOT paid THEN 1 END)."),
    mcq("Where can CASE appear?", ["SELECT, WHERE, ORDER BY — anywhere expressions go", "Only SELECT", "Only WHERE"], "SELECT, WHERE, ORDER BY — anywhere expressions go", "ORDER BY CASE ... END enables custom sort orders."),
    tf("CASE can compare ranges like WHEN price BETWEEN 10 AND 20 THEN 'mid'.", true, "Any boolean condition works in WHEN."),
    typed("Write a SELECT from orders returning id and a column kind that is 'big' when total >= 100, otherwise 'small' (use CASE ... END AS kind).", "", "SELECT id, CASE WHEN total >= 100 THEN 'big' ELSE 'small' END AS kind FROM orders;", ["CASE WHEN total >= 100 THEN 'big'", "ELSE 'small'", "END AS kind"], "One CASE expression labels every row.")
  ]),
  ...attach("sql2-functions", [
    mcq("What does UPPER(name) return?", ["The name fully uppercased", "The first letter", "A sorted name"], "The name fully uppercased", "Row functions transform each value inline."),
    mcq("What does LENGTH('hello') return?", ["5", "4", "'hello'"], "5", "LENGTH counts characters."),
    fill("Take the first 3 characters of the code.", "SELECT __1__(code, 1, 3) FROM products;", [{ label: "__1__", answers: ["SUBSTR", "substr", "SUBSTRING", "substring"] }], "SUBSTR(value, start, length) — SQL starts at position 1."),
    mcq("What does COALESCE(nickname, name, 'Anonymous') return?", ["The FIRST non-NULL of the three", "All three joined", "NULL if any is NULL"], "The FIRST non-NULL of the three", "COALESCE is the standard default-for-NULL tool."),
    mcq("phone is NULL. What does COALESCE(phone, 'none') give?", ["'none'", "NULL", "An error"], "'none'", "NULL falls through to the next argument."),
    tf("In standard SQL, positions in SUBSTR start at 0 like Python.", false, "SQL string positions start at 1 — a classic cross-language trip-up."),
    mcq("What does ROUND(3.14159, 2) return?", ["3.14", "3.0", "3.1416"], "3.14", "The second argument is the decimal count."),
    fill("Give missing emails a default.", "SELECT __1__(email, 'no email') FROM users;", [{ label: "__1__", answers: ["COALESCE", "coalesce"] }], "COALESCE replaces NULL with the fallback."),
    mcq("What does 'Ms. ' || name produce (or CONCAT('Ms. ', name))?", ["The strings joined: Ms. Aya", "A logical OR", "An error"], "The strings joined: Ms. Aya", "|| is the standard concatenation operator."),
    typed("Write a query selecting LOWER(email) AS email_clean from users.", "", "SELECT LOWER(email) AS email_clean FROM users;", ["LOWER(email)", "AS email_clean"], "Case-normalizing emails on read is an everyday cleanup.")
  ]),
  ...attach("sql2-window-basics", [
    mcq("What makes window functions different from GROUP BY aggregates?", ["Rows are NOT collapsed — each keeps its own output value", "They are faster", "They cannot aggregate"], "Rows are NOT collapsed — each keeps its own output value", "Every row survives, gaining a computed column."),
    mcq("What does ROW_NUMBER() OVER (ORDER BY score DESC) produce?", ["1, 2, 3... assigned from highest score down", "The score itself", "Random numbers"], "1, 2, 3... assigned from highest score down", "A ranking column without losing any rows."),
    fill("Rank within each city.", "ROW_NUMBER() OVER (__1__ BY city ORDER BY score DESC)", [{ label: "__1__", answers: ["PARTITION", "partition"] }], "PARTITION BY restarts the numbering per group."),
    mcq("What does PARTITION BY do inside OVER?", ["Splits rows into groups; the function restarts per group", "Sorts the table", "Removes duplicates"], "Splits rows into groups; the function restarts per group", "It is GROUP BY's windowed cousin — without collapsing."),
    mcq("Scores 95, 95, 90: what does RANK() give?", ["1, 1, 3 — ties share, next rank skips", "1, 1, 2", "1, 2, 3"], "1, 1, 3 — ties share, next rank skips", "RANK leaves gaps; DENSE_RANK would give 1, 1, 2."),
    mcq("Same scores with DENSE_RANK()?", ["1, 1, 2", "1, 1, 3", "1, 2, 3"], "1, 1, 2", "DENSE means no gaps after ties."),
    tf("Window functions can be used directly inside the WHERE clause.", false, "WHERE runs before windows are computed — filter rankings via a CTE or subquery."),
    mcq("How do you get the top 3 scorers PER CITY?", ["Rank with PARTITION BY city in a CTE, then WHERE rank <= 3", "LIMIT 3", "GROUP BY city LIMIT 3"], "Rank with PARTITION BY city in a CTE, then WHERE rank <= 3", "Top-N-per-group is THE window function interview classic."),
    tf("Using a window function forces the query to drop all other columns.", false, "Window columns sit alongside normal columns — that is the point."),
    typed("Write a SELECT from players returning name, score, and ROW_NUMBER() OVER (ORDER BY score DESC) AS rank.", "", "SELECT name, score, ROW_NUMBER() OVER (ORDER BY score DESC) AS rank FROM players;", ["ROW_NUMBER() OVER (ORDER BY score DESC)", "AS rank"], "The window column ranks every player while keeping each row.")
  ]),
  ...attach("sql2-window-advanced", [
    mcq("What does LAG(revenue) OVER (ORDER BY month) return for each row?", ["The PREVIOUS month's revenue", "The next month's revenue", "The running total"], "The PREVIOUS month's revenue", "LAG looks back; LEAD looks forward."),
    mcq("What does LAG return for the FIRST row?", ["NULL (no previous row)", "0", "The first value itself"], "NULL (no previous row)", "Provide a default with LAG(revenue, 1, 0) if NULL is unwanted."),
    fill("Read next month's value.", "__1__(revenue) OVER (ORDER BY month)", [{ label: "__1__", answers: ["LEAD", "lead"] }], "LEAD is LAG's forward-looking twin."),
    mcq("How do you compute month-over-month change?", ["revenue - LAG(revenue) OVER (ORDER BY month)", "revenue - revenue", "DIFF(revenue)"], "revenue - LAG(revenue) OVER (ORDER BY month)", "Subtract the previous row's value — the canonical LAG use."),
    mcq("What does SUM(amount) OVER (ORDER BY date) compute?", ["A running total up to each row", "The grand total on every row", "Daily averages"], "A running total up to each row", "ORDER BY inside OVER makes the frame 'start through current row'."),
    mcq("And SUM(amount) OVER () with no ORDER BY?", ["The grand total repeated on every row", "A running total", "NULL"], "The grand total repeated on every row", "No order = whole-partition frame — handy for percent-of-total: amount / SUM(amount) OVER ()."),
    tf("A running total requires a self join — window functions cannot express it.", false, "SUM(...) OVER (ORDER BY ...) IS the running total; the self-join version is the painful old way."),
    mcq("What does AVG(price) OVER (ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) compute?", ["A 7-day moving average", "The weekly maximum", "The first week's average"], "A 7-day moving average", "Explicit frames define sliding windows."),
    mcq("Why wrap the ranking in a CTE for top-N-per-group?", ["WHERE cannot filter on a window function directly", "CTEs make windows faster", "Style only"], "WHERE cannot filter on a window function directly", "Compute the rank in one layer, filter it in the next."),
    typed("Write a SELECT from monthly_sales returning month, revenue, and the running total: SUM(revenue) OVER (ORDER BY month) AS running_total.", "", "SELECT month, revenue, SUM(revenue) OVER (ORDER BY month) AS running_total FROM monthly_sales;", ["SUM(revenue) OVER (ORDER BY month)", "AS running_total"], "One window expression replaces an entire self-join dance.")
  ]),
  ...attach("sql2-set-ops", [
    mcq("What is a self join?", ["A table joined to itself under two different aliases", "A join with no condition", "A join on a single column"], "A table joined to itself under two different aliases", "One physical table, two logical roles — employee and manager."),
    mcq("In FROM employees e JOIN employees m ON e.manager_id = m.id, what is m?", ["The same table playing the manager role", "A managers table", "A typo"], "The same table playing the manager role", "Aliases let one table appear twice with different meanings."),
    fill("Join employees to their managers.", "SELECT e.name, m.name AS manager\nFROM employees e\nJOIN employees __1__ ON e.manager_id = m.id;", [{ label: "__1__", answers: ["m"] }], "The second alias makes the self join possible."),
    mcq("What is the difference between UNION and UNION ALL?", ["UNION removes duplicate rows; UNION ALL keeps them (and is faster)", "UNION ALL removes duplicates", "They are identical"], "UNION removes duplicate rows; UNION ALL keeps them (and is faster)", "Deduplication costs a sort/hash — skip it when duplicates are fine or impossible."),
    mcq("What does INTERSECT return?", ["Rows present in BOTH result sets", "All rows from both", "Rows in the first only"], "Rows present in BOTH result sets", "Set intersection on whole rows."),
    mcq("What does EXCEPT return?", ["Rows in the first result set but NOT in the second", "Rows in neither", "An error"], "Rows in the first result set but NOT in the second", "SELECT email FROM users EXCEPT SELECT email FROM unsubscribed — a clean anti-join."),
    tf("UNION can combine results with different column counts as long as names match.", false, "Set operations require the same number of columns with compatible types — names are irrelevant."),
    mcq("Which finds customers who bought in 2024 but NOT in 2025?", ["2024 buyer query EXCEPT 2025 buyer query", "2024 UNION 2025", "2024 INTERSECT 2025"], "2024 buyer query EXCEPT 2025 buyer query", "EXCEPT subtracts the second set — churn analysis in two lines."),
    tf("In a self join for 'employees in the same city', e1.id < e2.id avoids duplicate mirrored pairs.", true, "The inequality keeps (Aya, Omar) and drops the mirror (Omar, Aya) and self-pairs."),
    typed("Combine names from customers and suppliers into one deduplicated list using UNION (two SELECT name queries).", "", "SELECT name FROM customers UNION SELECT name FROM suppliers;", ["SELECT name FROM customers", "UNION", "SELECT name FROM suppliers"], "UNION stitches the two result sets and removes duplicates.")
  ]),
  ...attach("sql2-transactions", [
    mcq("What problem do transactions solve?", ["Several statements must succeed or fail as ONE unit", "Slow queries", "Large tables"], "Several statements must succeed or fail as ONE unit", "A half-finished money transfer is corruption; a transaction makes it all-or-nothing."),
    mcq("Which statements wrap a transaction?", ["BEGIN ... COMMIT (or ROLLBACK)", "START ... END", "OPEN ... CLOSE"], "BEGIN ... COMMIT (or ROLLBACK)", "BEGIN opens, COMMIT keeps, ROLLBACK undoes."),
    fill("Undo everything since BEGIN.", "BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\n-- something went wrong:\n__1__;", [{ label: "__1__", answers: ["ROLLBACK", "rollback"] }], "ROLLBACK reverts every statement in the open transaction."),
    mcq("What does the A in ACID stand for?", ["Atomicity — all or nothing", "Availability", "Authorization"], "Atomicity — all or nothing", "The transaction either fully happens or fully does not."),
    mcq("What does Isolation guarantee?", ["Concurrent transactions do not see each other's half-done work", "Each table gets its own file", "Queries run one per second"], "Concurrent transactions do not see each other's half-done work", "Isolation levels tune how strictly this holds."),
    mcq("What does Durability promise?", ["Once committed, data survives crashes and restarts", "Tables never grow", "Backups are automatic"], "Once committed, data survives crashes and restarts", "COMMIT means persisted, not just in memory."),
    tf("If the database crashes mid-transaction, the half-finished changes remain applied.", false, "Recovery rolls back uncommitted work — atomicity holds even through crashes."),
    mcq("Why must a money transfer's two UPDATEs share one transaction?", ["A failure between them would destroy or create money", "Two UPDATEs are faster together", "SQL requires it"], "A failure between them would destroy or create money", "Debit without credit is the textbook atomicity violation."),
    tf("Most databases auto-commit each standalone statement when no transaction is open.", true, "Single statements are their own mini-transactions; BEGIN groups several."),
    typed("Write a 4-line transaction: BEGIN; debit account 1 by 50; credit account 2 by 50; COMMIT; (table accounts, column balance).", "", "BEGIN;\nUPDATE accounts SET balance = balance - 50 WHERE id = 1;\nUPDATE accounts SET balance = balance + 50 WHERE id = 2;\nCOMMIT;", ["BEGIN;", "balance - 50", "balance + 50", "COMMIT;"], "The transfer is atomic: both updates or neither.")
  ]),
  ...attach("sql2-indexes", [
    mcq("What is an index?", ["A sorted lookup structure that makes matching rows fast to find", "A backup copy of the table", "A naming convention"], "A sorted lookup structure that makes matching rows fast to find", "Like a book index: seek directly instead of reading every page."),
    fill("Speed up email lookups.", "CREATE __1__ idx_users_email ON users(email);", [{ label: "__1__", answers: ["INDEX", "index"] }], "CREATE INDEX name ON table(column)."),
    mcq("Without an index on email, what does WHERE email = '...' do on a million rows?", ["A full table scan — checks every row", "Fails", "Uses the primary key"], "A full table scan — checks every row", "Scans are linear; index seeks are roughly logarithmic."),
    mcq("What is the COST of an index?", ["Writes get slower and storage grows — every change must update the index", "Reads get slower", "Nothing, indexes are free"], "Writes get slower and storage grows — every change must update the index", "Index what you filter/join on, not every column."),
    tf("Adding indexes to every column is a sound default strategy.", false, "Each index taxes every INSERT/UPDATE — index deliberately, by query patterns."),
    mcq("Which columns are the strongest index candidates?", ["Columns used in WHERE filters and JOIN conditions", "Long text blobs", "Columns never queried"], "Columns used in WHERE filters and JOIN conditions", "orders(user_id) is the classic join-driven index."),
    tf("Primary key columns need a manually created index.", false, "Primary keys are indexed automatically — that is how their uniqueness is enforced."),
    mcq("What does EXPLAIN show?", ["The query plan — scans, index usage, join strategy", "The query's results twice", "Syntax errors"], "The query plan — scans, index usage, join strategy", "EXPLAIN is how you VERIFY an index is actually used."),
    mcq("Why can WHERE LOWER(email) = 'a@b.com' ignore the index on email?", ["The function transforms the column, so the sorted index no longer applies", "LOWER is slow", "Strings cannot be indexed"], "The function transforms the column, so the sorted index no longer applies", "Store normalized data or create a functional index instead."),
    typed("Create an index named idx_orders_user on the orders table's user_id column.", "", "CREATE INDEX idx_orders_user ON orders(user_id);", ["CREATE INDEX idx_orders_user", "ON orders(user_id)"], "The single most common real-world index: the join key.")
  ]),
  ...attach("sql2-schema-design", [
    mcq("What is normalization?", ["Structuring tables so each fact is stored exactly once", "Sorting tables alphabetically", "Compressing data"], "Structuring tables so each fact is stored exactly once", "One fact, one place — updates cannot drift out of sync."),
    mcq("Which violates FIRST normal form (1NF)?", ["A tags column holding 'red,blue,green'", "A table with many rows", "Two tables with a foreign key"], "A tags column holding 'red,blue,green'", "Multi-value cells defeat querying — repeating groups get their own table."),
    mcq("orders stores customer_city on every order. The customer moves. What is this problem called?", ["An update anomaly — many copies must change together", "A deadlock", "An index miss"], "An update anomaly — many copies must change together", "Duplicated facts are the disease normalization cures."),
    mcq("Where should customer_city live instead?", ["In customers, joined through orders.customer_id", "On every order, but updated by trigger", "In a CSV"], "In customers, joined through orders.customer_id", "Non-key facts belong with their key: the city depends on the customer, not the order."),
    fill("Link orders to customers.", "customer_id INTEGER __1__ customers(id)", [{ label: "__1__", answers: ["REFERENCES", "references"] }], "REFERENCES declares the foreign key relationship."),
    mcq("What does a foreign key constraint actually enforce?", ["Every reference points at a row that exists", "Faster joins", "Sorted data"], "Every reference points at a row that exists", "No orphaned orders pointing at deleted customers."),
    mcq("Students take many courses, courses have many students. What is the standard design?", ["A junction table student_courses(student_id, course_id)", "A courses column on students", "Duplicate student rows per course"], "A junction table student_courses(student_id, course_id)", "Many-to-many always resolves through a junction (bridge) table."),
    tf("Denormalizing (duplicating data on purpose) is always a design mistake.", false, "It is a deliberate, measured trade for read performance — the sin is doing it accidentally."),
    tf("The practical 3NF slogan is: every non-key column depends on the key, the whole key, and nothing but the key.", true, "If a column describes something OTHER than the row's key, it belongs in another table."),
    typed("Create a junction table student_courses with student_id INTEGER REFERENCES students(id) and course_id INTEGER REFERENCES courses(id).", "", "CREATE TABLE student_courses (student_id INTEGER REFERENCES students(id), course_id INTEGER REFERENCES courses(id));", ["CREATE TABLE student_courses", "student_id INTEGER REFERENCES students(id)", "course_id INTEGER REFERENCES courses(id)"], "Two foreign keys, one bridge — the many-to-many pattern.")
  ])
];
