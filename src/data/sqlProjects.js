const code = (...lines) => lines.join("\n");

// Guided SQL project: each step's SQL runs against a fresh seeded database
// together with hidden checks. Checks are a UNION ALL of rows shaped
// (check_name, ok) — the step passes when every ok is 1. Starters are
// cumulative so each step is self-contained on a fresh database.
export const sqlProjects = [
  {
    id: "sql-library-db",
    track: "sql",
    runtime: "sql",
    level: "SQL Foundations",
    title: "Design a Library Database",
    description:
      "Create a small lending library from scratch: tables, real rows, foreign keys, a join, and a reporting view — the full life of a schema.",
    steps: [
      {
        title: "Create the members table",
        instructions:
          "Create a table named lib_members with exactly three columns: id (INTEGER PRIMARY KEY), name (TEXT NOT NULL), and email (TEXT).",
        starter: code(
          "-- Step 1: the people who borrow books",
          "CREATE TABLE lib_members (",
          "  -- id, name, email",
          ");"
        ),
        tests: code(
          "SELECT 'lib_members table exists' AS check_name,",
          "       CASE WHEN COUNT(*) = 1 THEN 1 ELSE 0 END AS ok",
          "  FROM sqlite_master WHERE type = 'table' AND name = 'lib_members'",
          "UNION ALL",
          "SELECT 'it has exactly 3 columns',",
          "       CASE WHEN COUNT(*) = 3 THEN 1 ELSE 0 END",
          "  FROM pragma_table_info('lib_members')",
          "UNION ALL",
          "SELECT 'name column is NOT NULL',",
          "       CASE WHEN COUNT(*) = 1 THEN 1 ELSE 0 END",
          "  FROM pragma_table_info('lib_members')",
          " WHERE name = 'name' AND \"notnull\" = 1;"
        ),
        hint: "CREATE TABLE lib_members (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT);"
      },
      {
        title: "Insert the members",
        instructions:
          "Insert three members: (1, 'Aya', 'aya@lib.org'), (2, 'Omar', 'omar@lib.org'), and (3, 'Lina', NULL) — Lina has no email yet.",
        starter: code(
          "CREATE TABLE lib_members (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT);",
          "",
          "-- Step 2: add Aya, Omar, and Lina (Lina's email is NULL)",
          "INSERT INTO lib_members VALUES"
        ),
        tests: code(
          "SELECT 'three members inserted' AS check_name,",
          "       CASE WHEN COUNT(*) = 3 THEN 1 ELSE 0 END AS ok FROM lib_members",
          "UNION ALL",
          "SELECT 'Aya is member 1',",
          "       CASE WHEN COUNT(*) = 1 THEN 1 ELSE 0 END",
          "  FROM lib_members WHERE id = 1 AND name = 'Aya'",
          "UNION ALL",
          "SELECT 'Lina has a NULL email',",
          "       CASE WHEN COUNT(*) = 1 THEN 1 ELSE 0 END",
          "  FROM lib_members WHERE name = 'Lina' AND email IS NULL;"
        ),
        hint: "INSERT INTO lib_members VALUES (1, 'Aya', 'aya@lib.org'), (2, 'Omar', 'omar@lib.org'), (3, 'Lina', NULL);"
      },
      {
        title: "Create and fill the books table",
        instructions:
          "Create lib_books with id (INTEGER PRIMARY KEY), title (TEXT NOT NULL), and author (TEXT). Then insert: (1, 'Dune', 'Herbert'), (2, 'The Dispossessed', 'Le Guin'), (3, 'Kindred', 'Butler').",
        starter: code(
          "CREATE TABLE lib_members (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT);",
          "INSERT INTO lib_members VALUES",
          "  (1, 'Aya', 'aya@lib.org'), (2, 'Omar', 'omar@lib.org'), (3, 'Lina', NULL);",
          "",
          "-- Step 3: the catalog"
        ),
        tests: code(
          "SELECT 'lib_books table exists' AS check_name,",
          "       CASE WHEN COUNT(*) = 1 THEN 1 ELSE 0 END AS ok",
          "  FROM sqlite_master WHERE type = 'table' AND name = 'lib_books'",
          "UNION ALL",
          "SELECT 'three books inserted',",
          "       CASE WHEN COUNT(*) = 3 THEN 1 ELSE 0 END FROM lib_books",
          "UNION ALL",
          "SELECT 'Kindred is by Butler',",
          "       CASE WHEN COUNT(*) = 1 THEN 1 ELSE 0 END",
          "  FROM lib_books WHERE title = 'Kindred' AND author = 'Butler';"
        ),
        hint: "CREATE TABLE lib_books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author TEXT); then one INSERT with three value tuples."
      },
      {
        title: "Loans: connect members to books",
        instructions:
          "Create lib_loans with id (INTEGER PRIMARY KEY), member_id (INTEGER), book_id (INTEGER), and due_date (TEXT). Insert three loans: Aya borrowed Dune due '2026-07-01', Omar borrowed The Dispossessed due '2026-07-08', and Aya also borrowed Kindred due '2026-07-15' (ids 1, 2, 3 in that order).",
        starter: code(
          "CREATE TABLE lib_members (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT);",
          "INSERT INTO lib_members VALUES",
          "  (1, 'Aya', 'aya@lib.org'), (2, 'Omar', 'omar@lib.org'), (3, 'Lina', NULL);",
          "",
          "CREATE TABLE lib_books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author TEXT);",
          "INSERT INTO lib_books VALUES",
          "  (1, 'Dune', 'Herbert'), (2, 'The Dispossessed', 'Le Guin'), (3, 'Kindred', 'Butler');",
          "",
          "-- Step 4: who borrowed what, and when is it due?"
        ),
        tests: code(
          "SELECT 'lib_loans table exists' AS check_name,",
          "       CASE WHEN COUNT(*) = 1 THEN 1 ELSE 0 END AS ok",
          "  FROM sqlite_master WHERE type = 'table' AND name = 'lib_loans'",
          "UNION ALL",
          "SELECT 'three loans inserted',",
          "       CASE WHEN COUNT(*) = 3 THEN 1 ELSE 0 END FROM lib_loans",
          "UNION ALL",
          "SELECT 'Aya is linked to Dune',",
          "       CASE WHEN COUNT(*) = 1 THEN 1 ELSE 0 END",
          "  FROM lib_loans l",
          "  JOIN lib_members m ON m.id = l.member_id",
          "  JOIN lib_books b ON b.id = l.book_id",
          " WHERE m.name = 'Aya' AND b.title = 'Dune'",
          "UNION ALL",
          "SELECT 'Aya has two loans',",
          "       CASE WHEN COUNT(*) = 2 THEN 1 ELSE 0 END",
          "  FROM lib_loans l JOIN lib_members m ON m.id = l.member_id",
          " WHERE m.name = 'Aya';"
        ),
        hint: "CREATE TABLE lib_loans (id INTEGER PRIMARY KEY, member_id INTEGER, book_id INTEGER, due_date TEXT); INSERT INTO lib_loans VALUES (1, 1, 1, '2026-07-01'), (2, 2, 2, '2026-07-08'), (3, 1, 3, '2026-07-15');"
      },
      {
        title: "A reporting view with GROUP BY",
        instructions:
          "Management wants loan counts. Create a VIEW named lib_loan_counts with two columns — name and loan_count — that joins lib_members to lib_loans and counts loans per member with GROUP BY. Members with no loans should not appear (a plain JOIN does this).",
        starter: code(
          "CREATE TABLE lib_members (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT);",
          "INSERT INTO lib_members VALUES",
          "  (1, 'Aya', 'aya@lib.org'), (2, 'Omar', 'omar@lib.org'), (3, 'Lina', NULL);",
          "",
          "CREATE TABLE lib_books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author TEXT);",
          "INSERT INTO lib_books VALUES",
          "  (1, 'Dune', 'Herbert'), (2, 'The Dispossessed', 'Le Guin'), (3, 'Kindred', 'Butler');",
          "",
          "CREATE TABLE lib_loans (id INTEGER PRIMARY KEY, member_id INTEGER, book_id INTEGER, due_date TEXT);",
          "INSERT INTO lib_loans VALUES",
          "  (1, 1, 1, '2026-07-01'), (2, 2, 2, '2026-07-08'), (3, 1, 3, '2026-07-15');",
          "",
          "-- Step 5: CREATE VIEW lib_loan_counts AS ..."
        ),
        tests: code(
          "SELECT 'lib_loan_counts view exists' AS check_name,",
          "       CASE WHEN COUNT(*) = 1 THEN 1 ELSE 0 END AS ok",
          "  FROM sqlite_master WHERE type = 'view' AND name = 'lib_loan_counts'",
          "UNION ALL",
          "SELECT 'Aya shows 2 loans',",
          "       CASE WHEN COUNT(*) = 1 THEN 1 ELSE 0 END",
          "  FROM lib_loan_counts WHERE name = 'Aya' AND loan_count = 2",
          "UNION ALL",
          "SELECT 'Omar shows 1 loan',",
          "       CASE WHEN COUNT(*) = 1 THEN 1 ELSE 0 END",
          "  FROM lib_loan_counts WHERE name = 'Omar' AND loan_count = 1",
          "UNION ALL",
          "SELECT 'Lina (no loans) is not listed',",
          "       CASE WHEN COUNT(*) = 0 THEN 1 ELSE 0 END",
          "  FROM lib_loan_counts WHERE name = 'Lina';"
        ),
        hint: "CREATE VIEW lib_loan_counts AS SELECT m.name AS name, COUNT(l.id) AS loan_count FROM lib_members m JOIN lib_loans l ON l.member_id = m.id GROUP BY m.name;"
      }
    ]
  }
];
