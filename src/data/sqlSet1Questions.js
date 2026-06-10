const code = (...lines) => lines.join("\n");
const setId = "sql-set1";

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
// SQL keywords are case-insensitive, so typed answers grade case-insensitively.
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

export const sqlSet1Modules = [
  { id: "sql1-what-databases", setId, title: "What Databases Are" },
  { id: "sql1-select", setId, title: "SELECT Basics" },
  { id: "sql1-where", setId, title: "Filtering with WHERE" },
  { id: "sql1-sort-limit", setId, title: "Sorting and Limiting" },
  { id: "sql1-null-distinct", setId, title: "NULL and DISTINCT" },
  { id: "sql1-aggregates", setId, title: "Aggregate Functions" },
  { id: "sql1-groupby", setId, title: "GROUP BY and HAVING" },
  { id: "sql1-joins", setId, title: "Joins" },
  { id: "sql1-modify", setId, title: "INSERT, UPDATE, DELETE" },
  { id: "sql1-tables", setId, title: "Creating Tables" }
];

export const sqlSet1Lessons = {
  "sql1-what-databases": {
    summary:
      "A relational database stores data in tables — grids of rows and columns, like disciplined spreadsheets. Each row is one record (one user, one order); each column is one attribute (name, price). SQL (Structured Query Language) is the language every relational database (PostgreSQL, MySQL, SQLite...) understands for reading and changing that data.",
    points: [
      "Table = rows (records) + columns (attributes).",
      "Each table holds ONE kind of thing: users, orders, products.",
      "SQL is the standard language across all relational databases."
    ],
    example: code(
      "-- a users table",
      "-- id | name  | age",
      "-- 1  | Aya   | 25",
      "-- 2  | Omar  | 31",
      "SELECT * FROM users;"
    )
  },
  "sql1-select": {
    summary:
      "SELECT reads data. You list the columns you want, then FROM names the table: SELECT name, age FROM users. The star * means every column — convenient for exploring, wasteful in real applications. Statements conventionally end with a semicolon, and SQL keywords are case-insensitive (SELECT and select are identical).",
    points: [
      "SELECT name, age FROM users; — chosen columns only.",
      "SELECT * FROM users; — every column.",
      "Keywords are case-insensitive; column/table NAMES may not be."
    ],
    example: code(
      "SELECT name, age",
      "FROM users;"
    )
  },
  "sql1-where": {
    summary:
      "WHERE filters which ROWS come back: SELECT * FROM users WHERE age >= 18. Conditions combine with AND/OR, test sets with IN, ranges with BETWEEN, and text patterns with LIKE, where % matches any run of characters. Note: SQL uses a single = for comparison, and text values use 'single quotes'.",
    points: [
      "WHERE age >= 18 AND city = 'Cairo' — both must hold.",
      "WHERE city IN ('Cairo', 'Lagos') — match any listed value.",
      "WHERE name LIKE 'A%' — names starting with A."
    ],
    example: code(
      "SELECT name",
      "FROM users",
      "WHERE age >= 18 AND city = 'Cairo';"
    )
  },
  "sql1-sort-limit": {
    summary:
      "ORDER BY sorts the result: ascending by default, DESC for descending. LIMIT caps how many rows return — essential for top-N questions and pagination. Combined, they answer questions like \"the 5 most expensive products\": ORDER BY price DESC LIMIT 5.",
    points: [
      "ORDER BY age — ascending; ORDER BY age DESC — descending.",
      "LIMIT 10 returns at most 10 rows.",
      "Sort first, then limit: ORDER BY price DESC LIMIT 5."
    ],
    example: code(
      "SELECT name, price",
      "FROM products",
      "ORDER BY price DESC",
      "LIMIT 5;"
    )
  },
  "sql1-null-distinct": {
    summary:
      "NULL means \"no value\" — not zero, not empty text. Crucially, nothing equals NULL, not even NULL: you must test with IS NULL or IS NOT NULL. DISTINCT removes duplicate rows from a result, perfect for questions like \"which cities do our users live in?\".",
    points: [
      "WHERE email IS NULL — never email = NULL.",
      "NULL = NULL is not true; comparisons with NULL are unknown.",
      "SELECT DISTINCT city FROM users; — each city once."
    ],
    example: code(
      "SELECT DISTINCT city",
      "FROM users",
      "WHERE email IS NOT NULL;"
    )
  },
  "sql1-aggregates": {
    summary:
      "Aggregate functions collapse many rows into one summary value: COUNT counts rows, SUM adds, AVG averages, MIN/MAX find extremes. COUNT(*) counts all rows; COUNT(column) skips NULLs in that column — a subtle difference that changes answers.",
    points: [
      "COUNT(*), SUM(price), AVG(age), MIN/MAX.",
      "COUNT(email) ignores rows where email IS NULL.",
      "Aggregates return ONE row unless paired with GROUP BY."
    ],
    example: code(
      "SELECT COUNT(*) AS user_count, AVG(age) AS avg_age",
      "FROM users;"
    )
  },
  "sql1-groupby": {
    summary:
      "GROUP BY splits rows into buckets and runs aggregates per bucket: revenue per country, orders per customer. The rule: every selected column must be either in the GROUP BY or inside an aggregate. To filter on aggregate results use HAVING — WHERE filters rows BEFORE grouping, HAVING filters groups AFTER.",
    points: [
      "GROUP BY city + COUNT(*) → one row per city with its count.",
      "WHERE filters rows first; HAVING filters the grouped results.",
      "HAVING COUNT(*) > 5 keeps only groups with more than 5 rows."
    ],
    example: code(
      "SELECT city, COUNT(*) AS users_in_city",
      "FROM users",
      "GROUP BY city",
      "HAVING COUNT(*) > 5;"
    )
  },
  "sql1-joins": {
    summary:
      "Real data spans tables: orders reference users by id. A JOIN stitches them together on a matching condition. INNER JOIN keeps only rows that match in BOTH tables; LEFT JOIN keeps every row from the left table and fills missing right-side values with NULL — that is how you find \"users with no orders\".",
    points: [
      "JOIN orders ON orders.user_id = users.id — the matching rule.",
      "INNER JOIN: matches only. LEFT JOIN: all left rows, NULLs where unmatched.",
      "Prefix columns (users.name) when both tables share names."
    ],
    example: code(
      "SELECT users.name, orders.total",
      "FROM users",
      "LEFT JOIN orders ON orders.user_id = users.id;"
    )
  },
  "sql1-modify": {
    summary:
      "INSERT adds rows, UPDATE changes them, DELETE removes them. UPDATE and DELETE apply to EVERY row that matches — and to the whole table if you forget WHERE. That missing-WHERE mistake is famous enough to have ruined careers; always write the WHERE first.",
    points: [
      "INSERT INTO users (name, age) VALUES ('Aya', 25);",
      "UPDATE users SET age = 26 WHERE id = 1; — WHERE or everyone changes.",
      "DELETE FROM users WHERE id = 1; — WHERE or everyone goes."
    ],
    example: code(
      "INSERT INTO users (name, age) VALUES ('Aya', 25);",
      "UPDATE users SET age = 26 WHERE name = 'Aya';",
      "DELETE FROM users WHERE name = 'Aya';"
    )
  },
  "sql1-tables": {
    summary:
      "CREATE TABLE defines a table's columns and their types: INTEGER, TEXT/VARCHAR, REAL/DECIMAL, BOOLEAN, DATE. A PRIMARY KEY uniquely identifies each row (usually an auto-incrementing id); NOT NULL forbids missing values; UNIQUE forbids duplicates. Good column constraints catch bad data at the door.",
    points: [
      "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL);",
      "PRIMARY KEY = unique row identity; one per table.",
      "NOT NULL and UNIQUE are guardrails — use them liberally."
    ],
    example: code(
      "CREATE TABLE users (",
      "  id INTEGER PRIMARY KEY,",
      "  name TEXT NOT NULL,",
      "  email TEXT UNIQUE",
      ");"
    )
  }
};

export const sqlSet1Questions = [
  ...attach("sql1-what-databases", [
    mcq("In a relational database, what is a table?", ["Rows and columns storing one kind of record", "A single value", "A stylesheet for data"], "Rows and columns storing one kind of record", "Tables are the core structure: rows are records, columns are attributes."),
    mcq("What does one ROW in a users table represent?", ["One user", "One attribute shared by all users", "The table schema"], "One user", "A row is a single record — one concrete user."),
    mcq("What does one COLUMN represent?", ["One attribute, like name or age, across all records", "One user", "One query"], "One attribute, like name or age, across all records", "Columns define what facts every record stores."),
    tf("SQL is only used with one specific database product.", false, "SQL is a standard understood (with small dialect differences) by PostgreSQL, MySQL, SQLite, SQL Server, and more."),
    mcq("What does SQL stand for?", ["Structured Query Language", "Simple Question List", "Sequential Quality Logic"], "Structured Query Language", "SQL is the language for querying and changing relational data."),
    tf("A well-designed table stores one kind of thing, like users OR orders, not both mixed together.", true, "One entity per table keeps data clean and queries simple."),
    mcq("Which of these is a typical relational database?", ["PostgreSQL", "Photoshop", "React"], "PostgreSQL", "PostgreSQL, MySQL, and SQLite are popular relational databases."),
    mcq("Why do databases beat spreadsheets for application data?", ["They handle many users, enforce rules, and answer complex queries fast", "They have prettier charts", "They are easier to email"], "They handle many users, enforce rules, and answer complex queries fast", "Concurrency, constraints, and query power are the database advantages."),
    fill("Complete the name of the language used to query relational databases.", "__1__ (Structured Query Language)", [{ label: "__1__", answers: ["SQL", "sql"] }], "SQL is pronounced 'sequel' or spelled out S-Q-L."),
    mcq("A products table has columns id, name, price. What is price for the row (3, 'Tea', 4.5)?", ["4.5", "Tea", "3"], "4.5", "Each value in a row lines up with its column by position.")
  ]),
  ...attach("sql1-select", [
    mcq("Which query returns ALL columns from users?", ["SELECT * FROM users;", "SELECT all FROM users;", "GET users;"], "SELECT * FROM users;", "The star selects every column."),
    mcq("Which query returns only the name column?", ["SELECT name FROM users;", "SELECT users FROM name;", "FROM users SELECT name;"], "SELECT name FROM users;", "Columns come after SELECT; the table comes after FROM."),
    fill("Complete the query to read names and ages.", "__1__ name, age FROM users;", [{ label: "__1__", answers: ["SELECT", "select"] }], "SELECT starts every read query."),
    fill("Complete the table clause.", "SELECT name __1__ users;", [{ label: "__1__", answers: ["FROM", "from"] }], "FROM names the table being read."),
    tf("SQL keywords like SELECT and FROM are case-insensitive.", true, "select name from users works exactly like SELECT NAME — though uppercase keywords are the readability convention."),
    mcq("How do you select multiple specific columns?", ["Separate them with commas: SELECT name, age, city", "Separate them with spaces", "Use multiple SELECT keywords"], "Separate them with commas: SELECT name, age, city", "Commas separate the column list."),
    tf("In production code, SELECT * is preferred over naming columns.", false, "Naming columns is explicit, faster, and does not break when the table gains new columns."),
    mcq("What does AS do in SELECT price * 2 AS double_price?", ["Renames the result column to double_price", "Doubles the table", "Creates a new permanent column"], "Renames the result column to double_price", "AS gives a column (or table) an alias in the result."),
    mcq("What does this query return?", ["Each user's name and their age plus one", "An error — math is not allowed", "The ages only"], "Each user's name and their age plus one", "SELECT can compute expressions per row.", "SELECT name, age + 1 AS next_age FROM users;"),
    typed("Write a query that selects the name and email columns from the customers table.", "", "SELECT name, email FROM customers;", ["SELECT name, email", "FROM customers"], "Column list after SELECT, table after FROM, semicolon to finish.")
  ]),
  ...attach("sql1-where", [
    mcq("What does WHERE do?", ["Filters which rows are returned", "Chooses which columns appear", "Sorts the result"], "Filters which rows are returned", "WHERE keeps only rows whose condition is true."),
    mcq("Which query finds users older than 30?", ["SELECT * FROM users WHERE age > 30;", "SELECT * FROM users IF age > 30;", "SELECT * WHERE age > 30 FROM users;"], "SELECT * FROM users WHERE age > 30;", "WHERE follows FROM, and > compares values."),
    fill("Complete the filter for exact matches.", "SELECT * FROM users WHERE city __1__ 'Cairo';", [{ label: "__1__", answers: ["="] }], "SQL uses a single = for comparison (no ==)."),
    tf("Text values in SQL conditions use single quotes, like 'Cairo'.", true, "Single quotes mark string literals; double quotes usually mean identifiers."),
    mcq("Which condition matches ages from 18 to 65 inclusive?", ["age BETWEEN 18 AND 65", "age IN 18..65", "age FROM 18 TO 65"], "age BETWEEN 18 AND 65", "BETWEEN includes both endpoints."),
    mcq("Which condition matches users in Cairo OR Lagos?", ["city IN ('Cairo', 'Lagos')", "city = 'Cairo' AND city = 'Lagos'", "city HAS ('Cairo', 'Lagos')"], "city IN ('Cairo', 'Lagos')", "IN tests membership in a list; the AND version can never be true."),
    mcq("What does WHERE name LIKE 'A%' match?", ["Names starting with A", "Names containing exactly A%", "Names ending with A"], "Names starting with A", "% is the wildcard for any run of characters."),
    mcq("What does this query return?", ["Adults in Cairo only", "All adults plus everyone in Cairo", "An error"], "Adults in Cairo only", "AND requires both conditions on the same row.", "SELECT * FROM users WHERE age >= 18 AND city = 'Cairo';"),
    fill("Match every email at example.com.", "SELECT * FROM users WHERE email __1__ '%@example.com';", [{ label: "__1__", answers: ["LIKE", "like"] }], "LIKE enables pattern matching with % wildcards."),
    typed("Write a query selecting all columns from products where price is less than 10.", "", "SELECT * FROM products WHERE price < 10;", ["SELECT *", "FROM products", "WHERE price < 10"], "WHERE comes after FROM and filters the rows.")
  ]),
  ...attach("sql1-sort-limit", [
    mcq("What does ORDER BY age do by default?", ["Sorts ascending (smallest first)", "Sorts descending", "Groups equal ages"], "Sorts ascending (smallest first)", "ASC is the default direction; add DESC to flip it."),
    fill("Sort from most expensive to cheapest.", "SELECT * FROM products ORDER BY price __1__;", [{ label: "__1__", answers: ["DESC", "desc"] }], "DESC means descending."),
    mcq("What does LIMIT 10 do?", ["Returns at most 10 rows", "Returns 10 columns", "Repeats the result 10 times"], "Returns at most 10 rows", "LIMIT caps the result size."),
    mcq("Which query returns the 5 most expensive products?", ["SELECT * FROM products ORDER BY price DESC LIMIT 5;", "SELECT * FROM products LIMIT 5 ORDER BY price;", "SELECT TOP price FROM products;"], "SELECT * FROM products ORDER BY price DESC LIMIT 5;", "Sort descending first, then take the top 5 — and LIMIT comes after ORDER BY."),
    tf("Without ORDER BY, SQL guarantees rows come back in insertion order.", false, "Row order is undefined without ORDER BY — never rely on it."),
    mcq("How do you sort by city, then by age within each city?", ["ORDER BY city, age", "ORDER BY city AND age", "ORDER BY city THEN age"], "ORDER BY city, age", "Multiple sort keys are comma-separated, applied left to right."),
    fill("Return only the first 3 rows.", "SELECT name FROM users ORDER BY name __1__ 3;", [{ label: "__1__", answers: ["LIMIT", "limit"] }], "LIMIT caps the row count after sorting."),
    mcq("What is LIMIT with OFFSET typically used for?", ["Pagination — page 2 is LIMIT 10 OFFSET 10", "Faster queries", "Removing duplicates"], "Pagination — page 2 is LIMIT 10 OFFSET 10", "OFFSET skips rows, enabling page-by-page reading."),
    mcq("What does this query return?", ["The single youngest user", "The single oldest user", "All users sorted"], "The single youngest user", "Ascending age sort puts the youngest first; LIMIT 1 keeps only that row.", "SELECT name FROM users ORDER BY age LIMIT 1;"),
    typed("Write a query for the 3 highest-scoring players (all columns) from the players table, using the score column.", "", "SELECT * FROM players ORDER BY score DESC LIMIT 3;", ["ORDER BY score DESC", "LIMIT 3"], "Top-N questions are always ORDER BY ... DESC LIMIT N.")
  ]),
  ...attach("sql1-null-distinct", [
    mcq("What does NULL represent?", ["The absence of a value", "The number zero", "An empty string"], "The absence of a value", "NULL means 'unknown / not provided' — distinct from 0 and ''."),
    mcq("How do you find rows where email is missing?", ["WHERE email IS NULL", "WHERE email = NULL", "WHERE email == NULL"], "WHERE email IS NULL", "Nothing equals NULL — IS NULL is the only correct test."),
    tf("The condition email = NULL works the same as email IS NULL.", false, "Comparisons with NULL are 'unknown', so = NULL never matches; use IS NULL."),
    fill("Keep only rows that HAVE an email.", "SELECT * FROM users WHERE email IS __1__ NULL;", [{ label: "__1__", answers: ["NOT", "not"] }], "IS NOT NULL is the positive test."),
    mcq("What does SELECT DISTINCT city FROM users; return?", ["Each city once, duplicates removed", "Users with unique names", "Cities sorted alphabetically"], "Each city once, duplicates removed", "DISTINCT de-duplicates the result rows."),
    mcq("users has 10 rows; 3 have NULL email. What does COUNT(email) return?", ["7", "10", "3"], "7", "COUNT(column) skips NULLs; COUNT(*) would return 10."),
    tf("DISTINCT applies to the whole selected row, not just the first column.", true, "SELECT DISTINCT city, age de-duplicates (city, age) PAIRS."),
    mcq("Why might age + NULL be a problem in a calculation?", ["The result is NULL, silently propagating missing data", "It rounds to zero", "It raises a syntax error"], "The result is NULL, silently propagating missing data", "NULL spreads through arithmetic — guard with COALESCE or filters."),
    fill("Remove duplicates from the result.", "SELECT __1__ country FROM customers;", [{ label: "__1__", answers: ["DISTINCT", "distinct"] }], "DISTINCT goes right after SELECT."),
    typed("Write a query selecting the distinct city values from the users table.", "", "SELECT DISTINCT city FROM users;", ["SELECT DISTINCT city", "FROM users"], "DISTINCT collapses repeated cities into one row each.")
  ]),
  ...attach("sql1-aggregates", [
    mcq("What does COUNT(*) return?", ["The number of rows", "The number of columns", "The largest value"], "The number of rows", "COUNT(*) counts rows regardless of NULLs."),
    mcq("Which function adds up all values of a column?", ["SUM", "TOTAL", "ADD"], "SUM", "SUM(price) totals the column."),
    fill("Compute the average age.", "SELECT __1__(age) FROM users;", [{ label: "__1__", answers: ["AVG", "avg"] }], "AVG returns the mean of non-NULL values."),
    mcq("What do MIN(price) and MAX(price) return?", ["The smallest and largest price", "The first and last rows", "Prices sorted"], "The smallest and largest price", "MIN/MAX find the extremes of a column."),
    mcq("How many rows does SELECT COUNT(*) FROM users; return?", ["Exactly one", "One per user", "Zero"], "Exactly one", "An aggregate without GROUP BY collapses everything to a single summary row."),
    tf("COUNT(email) and COUNT(*) always return the same number.", false, "COUNT(email) skips NULL emails; COUNT(*) counts every row."),
    mcq("What does this query compute?", ["Total revenue of completed orders", "Number of completed orders", "The largest order"], "Total revenue of completed orders", "WHERE filters first, then SUM totals what remains.", "SELECT SUM(total) FROM orders WHERE status = 'completed';"),
    fill("Count all products.", "SELECT __1__(*) FROM products;", [{ label: "__1__", answers: ["COUNT", "count"] }], "COUNT(*) is the row counter."),
    mcq("Why does SELECT name, COUNT(*) FROM users; fail (without GROUP BY)?", ["name is per-row but COUNT collapses rows — SQL cannot mix them", "COUNT cannot be used with SELECT", "name must be quoted"], "name is per-row but COUNT collapses rows — SQL cannot mix them", "Plain columns alongside aggregates require GROUP BY."),
    typed("Write a query that returns the number of rows in the orders table.", "", "SELECT COUNT(*) FROM orders;", ["SELECT COUNT(*)", "FROM orders"], "COUNT(*) with no WHERE counts every order.")
  ]),
  ...attach("sql1-groupby", [
    mcq("What does GROUP BY city do?", ["Splits rows into one bucket per city so aggregates run per bucket", "Sorts rows by city", "Removes duplicate cities"], "Splits rows into one bucket per city so aggregates run per bucket", "GROUP BY powers per-category summaries."),
    mcq("What does this query return?", ["One row per city with its user count", "Every user with their city", "The biggest city only"], "One row per city with its user count", "Each group becomes one result row.", code("SELECT city, COUNT(*)", "FROM users", "GROUP BY city;")),
    fill("Group the orders by customer.", "SELECT customer_id, COUNT(*) FROM orders __1__ customer_id;", [{ label: "__1__", answers: ["GROUP BY", "group by"] }], "GROUP BY names the bucketing column."),
    mcq("Which clause filters GROUPS by an aggregate result?", ["HAVING", "WHERE", "LIMIT"], "HAVING", "HAVING runs after grouping; WHERE cannot see aggregate values."),
    mcq("What is the difference between WHERE and HAVING?", ["WHERE filters rows before grouping; HAVING filters groups after", "They are interchangeable", "HAVING is just faster"], "WHERE filters rows before grouping; HAVING filters groups after", "Remember the order: WHERE → GROUP BY → HAVING."),
    fill("Keep only cities with more than 5 users.", "SELECT city, COUNT(*) FROM users GROUP BY city __1__ COUNT(*) > 5;", [{ label: "__1__", answers: ["HAVING", "having"] }], "Aggregate conditions belong in HAVING."),
    tf("Every column in the SELECT must appear in GROUP BY or inside an aggregate.", true, "That rule is why SELECT name, COUNT(*) ... GROUP BY city fails."),
    mcq("What does this query compute?", ["Average price per category, for categories averaging over 10", "All products over 10", "The total price of everything"], "Average price per category, for categories averaging over 10", "GROUP BY buckets by category; HAVING keeps qualifying groups.", code("SELECT category, AVG(price)", "FROM products", "GROUP BY category", "HAVING AVG(price) > 10;")),
    mcq("Why does WHERE COUNT(*) > 5 fail?", ["WHERE runs before grouping, so aggregates do not exist yet", "COUNT needs uppercase", "WHERE cannot use numbers"], "WHERE runs before grouping, so aggregates do not exist yet", "Use HAVING for aggregate conditions."),
    typed("Write a query showing each status and how many orders have it, from the orders table.", "", "SELECT status, COUNT(*) FROM orders GROUP BY status;", ["SELECT status, COUNT(*)", "GROUP BY status"], "Group by the category column, count per group.")
  ]),
  ...attach("sql1-joins", [
    mcq("Why do joins exist?", ["Data lives in separate related tables that queries must combine", "To make queries longer", "To copy tables"], "Data lives in separate related tables that queries must combine", "Orders reference users by id; JOIN reunites them."),
    mcq("What does INNER JOIN return?", ["Only rows with a match in BOTH tables", "All rows from both tables", "Only unmatched rows"], "Only rows with a match in BOTH tables", "No match, no row — that is INNER."),
    mcq("What does LEFT JOIN return?", ["Every left-table row, with NULLs where the right table has no match", "Only matching rows", "Every right-table row"], "Every left-table row, with NULLs where the right table has no match", "LEFT JOIN preserves the left side completely."),
    fill("Complete the join condition.", "SELECT users.name, orders.total\nFROM users\nJOIN orders __1__ orders.user_id = users.id;", [{ label: "__1__", answers: ["ON", "on"] }], "ON states how rows from the two tables match."),
    mcq("In FROM users LEFT JOIN orders, which is the 'left' table?", ["users", "orders", "Whichever is larger"], "users", "Left is literally the table written before the JOIN keyword."),
    mcq("How do you find users who have NO orders?", ["LEFT JOIN orders then WHERE orders.id IS NULL", "INNER JOIN orders", "WHERE orders = 0"], "LEFT JOIN orders then WHERE orders.id IS NULL", "Unmatched left rows carry NULL right-side columns — filter on that."),
    tf("When both tables have a column named id, you must prefix it, like users.id.", true, "Unprefixed ambiguous columns cause an error."),
    mcq("What does this query produce?", ["Each order's total with the buyer's name", "All users without orders", "Two separate result tables"], "Each order's total with the buyer's name", "The ON condition lines each order up with its user.", code("SELECT users.name, orders.total", "FROM orders", "JOIN users ON users.id = orders.user_id;")),
    mcq("orders has 8 rows, all matching a user. How many rows does INNER JOIN users return?", ["8", "One per user", "64"], "8", "Each order matches exactly one user, so each produces one combined row."),
    typed("Write a query joining books to authors (books.author_id = authors.id), selecting books.title and authors.name.", "", "SELECT books.title, authors.name FROM books JOIN authors ON books.author_id = authors.id;", ["JOIN authors", "ON books.author_id = authors.id", "books.title", "authors.name"], "Name both tables, then connect them with ON.")
  ]),
  ...attach("sql1-modify", [
    mcq("Which statement adds a new row?", ["INSERT INTO users (name, age) VALUES ('Aya', 25);", "ADD ROW users ('Aya', 25);", "UPDATE users ADD ('Aya', 25);"], "INSERT INTO users (name, age) VALUES ('Aya', 25);", "INSERT names the columns, VALUES supplies the data."),
    fill("Complete the insert.", "INSERT INTO products (name, price) __1__ ('Tea', 4.5);", [{ label: "__1__", answers: ["VALUES", "values"] }], "VALUES introduces the new row's data."),
    mcq("What does UPDATE users SET age = 26 WHERE id = 1; do?", ["Changes age to 26 for the row with id 1", "Adds a new user aged 26", "Deletes user 1"], "Changes age to 26 for the row with id 1", "SET assigns; WHERE picks which rows."),
    mcq("What happens if you run UPDATE users SET age = 0; with NO WHERE?", ["EVERY user's age becomes 0", "Nothing — WHERE is required", "Only the first row changes"], "EVERY user's age becomes 0", "UPDATE applies to all matching rows — and with no WHERE, all rows match. The classic disaster."),
    tf("DELETE FROM users; (no WHERE) deletes every row in the table.", true, "Write the WHERE clause before anything else when updating or deleting."),
    fill("Delete one specific row.", "DELETE FROM users __1__ id = 7;", [{ label: "__1__", answers: ["WHERE", "where"] }], "WHERE limits the deletion to matching rows."),
    mcq("How do you change multiple columns in one UPDATE?", ["SET name = 'Aya', age = 26", "SET name = 'Aya' SET age = 26", "Two separate UPDATE keywords"], "SET name = 'Aya', age = 26", "Comma-separate the assignments after one SET."),
    mcq("Which is the safe workflow before running a DELETE?", ["Run a SELECT with the same WHERE first to preview affected rows", "Run DELETE then check", "Disable WHERE checks"], "Run a SELECT with the same WHERE first to preview affected rows", "Preview with SELECT, then swap in DELETE — professional habit."),
    tf("INSERT INTO users (name) VALUES ('Aya'); leaves unspecified columns as NULL or their default.", true, "Columns you omit get their default value (often NULL)."),
    typed("Write a statement inserting a customer named Omar with email omar@mail.com into customers (columns name, email).", "", "INSERT INTO customers (name, email) VALUES ('Omar', 'omar@mail.com');", ["INSERT INTO customers", "(name, email)", "VALUES", "'Omar'", "'omar@mail.com'"], "Column list and VALUES list must line up in order.")
  ]),
  ...attach("sql1-tables", [
    mcq("Which statement creates a new table?", ["CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);", "NEW TABLE users;", "MAKE users (id, name);"], "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);", "CREATE TABLE lists each column with its type and constraints."),
    mcq("What is a PRIMARY KEY?", ["A column that uniquely identifies each row", "The first column of any table", "A password for the table"], "A column that uniquely identifies each row", "Usually an auto-incrementing id; no two rows can share it."),
    fill("Complete the column definition.", "CREATE TABLE users (\n  id INTEGER __1__ KEY,\n  name TEXT\n);", [{ label: "__1__", answers: ["PRIMARY", "primary"] }], "PRIMARY KEY marks the unique row identifier."),
    mcq("Which type stores text in most SQL databases?", ["TEXT or VARCHAR", "STRING", "CHARS"], "TEXT or VARCHAR", "TEXT/VARCHAR hold strings; INTEGER and REAL/DECIMAL hold numbers."),
    mcq("What does NOT NULL enforce?", ["The column must always have a value", "The column must be unique", "The column is read-only"], "The column must always have a value", "Inserts missing that column (with no default) are rejected."),
    tf("UNIQUE allows two rows to share the same value in that column.", false, "UNIQUE rejects duplicates — ideal for emails and usernames."),
    mcq("What is a FOREIGN KEY?", ["A column that references the primary key of another table", "A backup key", "An encrypted column"], "A column that references the primary key of another table", "orders.user_id referencing users.id is what makes joins trustworthy."),
    mcq("Why give the email column UNIQUE NOT NULL?", ["Every user must have an email and no two can share one", "It speeds up SELECT *", "It encrypts the email"], "Every user must have an email and no two can share one", "Constraints push data quality into the database itself."),
    fill("Forbid missing names.", "name TEXT __1__ NULL", [{ label: "__1__", answers: ["NOT", "not"] }], "NOT NULL makes the column required."),
    typed("Create a table named books with an INTEGER PRIMARY KEY column id and a TEXT NOT NULL column title.", "", "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL);", ["CREATE TABLE books", "id INTEGER PRIMARY KEY", "title TEXT NOT NULL"], "Each column is 'name TYPE constraints', comma-separated inside parentheses.")
  ])
];
