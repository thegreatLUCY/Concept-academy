// Real SQL execution in the browser via sql.js (SQLite compiled to WebAssembly).
// A seeded in-memory database backs both the lessons (Run a query, see the table)
// and execution grading (compare the learner's result set to the reference query's).

const SQLJS_VERSION = "1.12.0";
const SQLJS_BASE = `https://cdn.jsdelivr.net/npm/sql.js@${SQLJS_VERSION}/dist/`;

let sqlPromise = null;
let runQueue = Promise.resolve();

// Schema + sample rows that every SQL question's tables/columns can rely on.
export const SEED_SQL = `
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, city TEXT, email TEXT);
INSERT INTO users VALUES
  (1,'Aya',25,'Cairo','aya@example.com'),
  (2,'Omar',31,'Lagos','omar@example.com'),
  (3,'Lin',17,'Cairo',NULL),
  (4,'Bo',42,'Nairobi','bo@example.com'),
  (5,'Mira',19,'Cairo','mira@example.com');

CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, category TEXT, stock INTEGER);
INSERT INTO products VALUES
  (1,'Tea',4.5,'drinks',40),
  (2,'Coffee',7.0,'drinks',0),
  (3,'Water',1.0,'drinks',120),
  (4,'Lamp',30.0,'home',12),
  (5,'Mug',9.0,'home',55);

CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, total REAL, status TEXT);
INSERT INTO orders VALUES
  (1,1,250.0,'completed'),
  (2,1,40.0,'pending'),
  (3,2,160.0,'completed'),
  (4,2,20.0,'completed'),
  (5,4,90.0,'cancelled');

CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, email TEXT, city TEXT);
INSERT INTO customers VALUES
  (1,'Aya','aya@example.com','Cairo'),
  (2,'Omar','omar@example.com','Lagos'),
  (3,'Sam','sam@example.com','Cairo');

CREATE TABLE suppliers (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO suppliers VALUES (1,'Aya'),(2,'Dana'),(3,'Omar');

CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, manager_id INTEGER, salary REAL, dept TEXT);
INSERT INTO employees VALUES
  (1,'Aya',NULL,120,'eng'),
  (2,'Bo',1,95,'eng'),
  (3,'Cy',1,80,'art'),
  (4,'Dana',2,70,'art');

CREATE TABLE players (id INTEGER PRIMARY KEY, name TEXT, city TEXT, score INTEGER);
INSERT INTO players VALUES
  (1,'Aya','Cairo',95),
  (2,'Omar','Lagos',88),
  (3,'Lin','Cairo',95),
  (4,'Bo','Lagos',70),
  (5,'Mira','Cairo',60);

CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO authors VALUES (1,'Herbert'),(2,'Le Guin');

CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, author_id INTEGER, pages INTEGER);
INSERT INTO books VALUES
  (1,'Dune',1,412),
  (2,'Dispossessed',2,387),
  (3,'Messiah',1,256);

CREATE TABLE sales (id INTEGER PRIMARY KEY, city TEXT, amount REAL);
INSERT INTO sales VALUES
  (1,'Cairo',600),(2,'Lagos',450),(3,'Cairo',550),(4,'Nairobi',300);

CREATE TABLE monthly_sales (month INTEGER PRIMARY KEY, revenue REAL);
INSERT INTO monthly_sales VALUES (1,100),(2,140),(3,90),(4,200);

CREATE TABLE accounts (id INTEGER PRIMARY KEY, balance REAL);
INSERT INTO accounts VALUES (1,500),(2,300);

CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO students VALUES (1,'Aya'),(2,'Omar');

CREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT);
INSERT INTO courses VALUES (1,'Math'),(2,'Art');

CREATE TABLE monthly (month INTEGER, revenue REAL);
INSERT INTO monthly VALUES (1,100),(2,140),(3,90);
`;

// Table → columns summary derived from the seed, for playground/reference UI.
export const SEED_SCHEMA = [...SEED_SQL.matchAll(/CREATE TABLE (\w+) \(([^;]+)\);/g)].map(
  ([, table, cols]) => ({
    table,
    columns: cols.split(",").map((col) => col.trim().split(/\s+/)[0])
  })
);

function injectScript() {
  return new Promise((resolve, reject) => {
    if (window.initSqlJs) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `${SQLJS_BASE}sql-wasm.js`;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Could not download the SQL engine. Check your internet connection and try again."));
    document.head.appendChild(script);
  });
}

export function isSqlReady() {
  return Boolean(sqlPromise);
}

// Resolves to the sql.js module (the SQL constructor), loaded once and cached.
export function loadSql() {
  if (!sqlPromise) {
    sqlPromise = injectScript()
      .then(() => window.initSqlJs({ locateFile: (file) => `${SQLJS_BASE}${file}` }))
      .catch((error) => {
        sqlPromise = null;
        throw error;
      });
  }

  return sqlPromise;
}

// A fresh, fully-seeded database — each run starts from the same clean state,
// so a learner's INSERT/UPDATE/DELETE never leaks into the next question.
async function freshDatabase() {
  const SQL = await loadSql();
  const db = new SQL.Database();
  db.run(SEED_SQL);
  return db;
}

function normalizeError(error) {
  return String(error?.message ?? error).replace(/^Error:\s*/, "").trim() || "SQL error";
}

async function executeSql(sql) {
  let db;

  try {
    db = await freshDatabase();
  } catch (error) {
    return { columns: [], rows: [], error: normalizeError(error) };
  }

  try {
    // exec runs every statement; the last result set (if any) is what we show.
    const results = db.exec(sql);
    const last = results[results.length - 1];

    if (!last) {
      return { columns: [], rows: [], error: null, rowsAffected: db.getRowsModified() };
    }

    return { columns: last.columns, rows: last.values, error: null };
  } catch (error) {
    return { columns: [], rows: [], error: normalizeError(error) };
  } finally {
    db.close();
  }
}

// Serialized so concurrent runs never interleave on the shared engine.
export function runSql(sql) {
  const task = runQueue.then(() => executeSql(sql));
  runQueue = task.catch(() => {});
  return task;
}
