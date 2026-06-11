// Real JavaScript / TypeScript / JSX execution in the browser.
// Babel standalone transpiles the snippet (JSX always, types stripped for the
// TypeScript track), then it runs against a live playground element with
// console output captured. React components are rendered for real with the
// React UMD build; jQuery code manipulates a seeded playground DOM so
// selectors and effects have something visible to act on.

const CDN = {
  babel: {
    src: "https://cdn.jsdelivr.net/npm/@babel/standalone@7.26.4/babel.min.js",
    ready: () => Boolean(window.Babel)
  },
  react: {
    src: "https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js",
    ready: () => Boolean(window.React)
  },
  reactDom: {
    src: "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js",
    ready: () => Boolean(window.ReactDOM)
  },
  jquery: {
    src: "https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js",
    ready: () => Boolean(window.jQuery)
  }
};

const loadPromises = new Map();

export const JS_RUNTIMES = ["react", "typescript", "jquery"];

export function isJsRuntime(runtime) {
  return JS_RUNTIMES.includes(runtime);
}

// The mini-page jQuery snippets run against: every id/class the lessons and
// questions reference exists here, so selectors always find something.
const PLAYGROUND_HTML = `
<h2 id="title">Playground</h2>
<p id="message">A plain message</p>
<p id="intro" class="item">Intro paragraph</p>
<p id="status" class="item">Status: idle</p>
<div id="banner">Banner</div>
<ul id="menu"><li>Home</li><li>About</li></ul>
<input id="name-input" value="Aya" />
<a id="link" href="#">A link</a>
<button id="save">Save</button>
<button id="btn">Click me</button>
<div id="alert" style="display:none">Alert!</div>
<div id="panel">Panel content</div>
<div id="toast">Toast</div>
<div class="card">A card <button class="delete">Delete</button></div>
<ul id="list"></ul>
<p id="msg"></p>
<div id="box">Box</div>
`;

function injectScript({ src, ready }) {
  if (!loadPromises.has(src)) {
    loadPromises.set(
      src,
      new Promise((resolve, reject) => {
        if (ready()) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.crossOrigin = "anonymous";
        script.onload = () => resolve();
        script.onerror = () => {
          loadPromises.delete(src);
          reject(new Error("Could not download the JavaScript tools. Check your internet connection and try again."));
        };
        document.head.appendChild(script);
      })
    );
  }

  return loadPromises.get(src);
}

function requirementsFor(flavor) {
  const needed = [CDN.babel];

  if (flavor === "jquery") {
    needed.push(CDN.jquery);
  } else {
    // react + typescript snippets both may render components
    needed.push(CDN.react, CDN.reactDom);
  }

  return needed;
}

export function isJsReady(flavor) {
  return requirementsFor(flavor).every((entry) => entry.ready());
}

export async function loadJs(flavor) {
  // sequential on purpose: the react-dom UMD needs the react global first
  for (const requirement of requirementsFor(flavor)) {
    await injectScript(requirement);
  }
}

// Library identifiers the curriculum teaches conceptually but the playground
// cannot actually supply (React Router, TanStack Query, Testing Library, ...).
const UNAVAILABLE_LIBS =
  /\b(useQuery|useMutation|useInfiniteQuery|useForm|useNavigate|useParams|useNavigation|useLocation|useSearchParams|useDebounce|BrowserRouter|RouterProvider|Routes|Route|NavLink|Outlet|QueryClient|QueryClientProvider|fireEvent|renderHook|axios)\b/;

// Lessons mix runnable snippets with terminal commands, HTML documents, CSS,
// JSON configs, and teaching fragments — only offer a Run button when the
// example is a self-contained piece of JavaScript.
export function looksRunnableJs(code) {
  const text = String(code ?? "");

  if (!text.trim()) return false;
  if (/^\s*(#|\$\s|npm\s|npx\s|cd\s|git\s|node\s|tsc\s)/m.test(text)) return false; // terminal
  if (/^\s*<(!|script|html|head|body|link|meta)/im.test(text)) return false; // HTML doc
  if (/^\s*[.#@][\w-]+\s*\{/m.test(text)) return false; // CSS rules
  if (/(import|export)\s+[^;]*["']\.{1,2}\//.test(text)) return false; // relative imports
  if (/import\s*\(\s*["']\.{1,2}\//.test(text)) return false; // dynamic relative imports
  if (/\bimport\.meta\b/.test(text)) return false;
  if (UNAVAILABLE_LIBS.test(text)) return false;
  if (/\bawait\b/.test(text) && !/\basync\b/.test(text)) return false; // top-level await
  if (/\breturn\b/.test(text) && !/\b(function|class)\b|=>/.test(text)) return false; // body fragment
  if (/\bset[A-Z]\w*\s*\(/.test(text) && !/\buseState\b/.test(text)) return false; // setter fragment
  if (/^(use[A-Z]\w*\s*\(|const\s*\[.*\]\s*=\s*use[A-Z])/m.test(text)) return false; // hook outside a component

  const firstReal = text
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith("//") && !line.startsWith("/*"));

  if (!firstReal) return false;
  if (firstReal.startsWith("{")) return false; // JSON config excerpt
  if (firstReal.startsWith("<")) return false; // bare JSX fragment

  return true;
}

function transform(code) {
  // types are always stripped — React lessons drift into TS syntax too
  return window.Babel.transform(code, {
    presets: [
      ["env", { modules: "commonjs" }],
      "react",
      ["typescript", { isTSX: true, allExtensions: true }]
    ],
    filename: "snippet.tsx"
  }).code;
}

function formatValue(value) {
  if (typeof value === "string") return value;
  if (typeof value === "function") return `[function ${value.name || "anonymous"}]`;

  try {
    const json = JSON.stringify(value);
    return json === undefined ? String(value) : json;
  } catch {
    return String(value);
  }
}

function normalizeError(error) {
  return String(error?.message ?? error)
    .replace(/^\/?snippet\.[jt]sx:\s*/, "")
    .replace(/\s*\(\d+:\d+\)[\s\S]*$/, (match) => match.split("\n")[0])
    .trim() || "JavaScript error";
}

// import X from "..." compiles to require("...") — resolve the handful of
// packages the curriculum teaches, fail with a friendly message otherwise.
function makeRequire(rootElement) {
  return (name) => {
    if (name === "react") return window.React;
    if (name === "react-dom") return window.ReactDOM;
    if (name === "react-dom/client") {
      return { createRoot: (el) => window.ReactDOM.createRoot(el ?? rootElement) };
    }
    if (name === "jquery") return window.jQuery;
    throw new Error(`The playground can't import "${name}" — only react, react-dom, and jquery are available here.`);
  };
}

// document.getElementById("root") and friends resolve inside the playground,
// never against the surrounding app page.
function makeDocumentProxy(host, rootElement) {
  return {
    getElementById: (id) => host.querySelector(`#${CSS.escape(id)}`) ?? (id === "root" ? rootElement : null),
    querySelector: (selector) => host.querySelector(selector),
    querySelectorAll: (selector) => host.querySelectorAll(selector),
    createElement: (tag) => document.createElement(tag),
    createTextNode: (text) => document.createTextNode(text),
    body: host
  };
}

// $ scoped to the playground: string selectors search inside it, everything
// else ($(fn), $(this), $("<li>")) passes straight through to real jQuery.
function makeScopedJquery(host) {
  const real = window.jQuery;
  const scoped = (arg, context) =>
    typeof arg === "string" && !/^\s*</.test(arg) ? real(arg, context ?? host) : real(arg, context);

  Object.setPrototypeOf(scoped, real);
  scoped.fn = real.fn;
  return scoped;
}

// When a React snippet defines components but never mounts one, render the
// most likely root (App if present, otherwise the last component defined) so
// "write a component" examples still show their output.
function autoRenderEpilogue(code, flavor) {
  if (flavor === "jquery") return "";

  const names = [...code.matchAll(/(?:function|const|class)\s+([A-Z][A-Za-z0-9_]*)/g)].map((m) => m[1]);
  const pick = names.includes("App") ? "App" : names[names.length - 1];

  if (!pick) return "";
  return `\n;__autoRender(typeof ${pick} === "function" ? ${pick} : null);`;
}

async function execute(code, flavor, host) {
  host.innerHTML = flavor === "jquery" ? PLAYGROUND_HTML : '<div id="js-root"></div>';
  const rootElement = host.querySelector("#js-root") ?? host;

  const logs = [];
  const push = (args) => logs.push(args.map(formatValue).join(" "));
  const fakeConsole = {
    log: (...args) => push(args),
    info: (...args) => push(args),
    warn: (...args) => push(args),
    error: (...args) => push(args),
    table: (...args) => push(args)
  };

  // For project step tests: render a component and hand back its markup.
  const renderToHtml = (Component, props) => {
    if (typeof Component !== "function") {
      throw new Error("Expected a component function — did you define it with the right name?");
    }

    const mount = document.createElement("div");
    host.appendChild(mount);

    try {
      const root = window.ReactDOM.createRoot(mount);
      window.ReactDOM.flushSync(() => root.render(window.React.createElement(Component, props)));
      return mount.innerHTML;
    } finally {
      mount.remove();
    }
  };

  const autoRender = (Component) => {
    if (!Component || rootElement.childNodes.length || !window.ReactDOM) return;

    try {
      const root = window.ReactDOM.createRoot(rootElement);
      window.ReactDOM.flushSync(() => root.render(window.React.createElement(Component)));
    } catch {
      // not actually a renderable component — leave the playground empty
    }
  };

  let compiled;

  try {
    compiled = transform(code) + autoRenderEpilogue(code, flavor);
  } catch (error) {
    return { output: logs.join("\n"), html: "", error: normalizeError(error) };
  }

  const jq = flavor === "jquery" ? makeScopedJquery(host) : undefined;

  // Hooks are in scope without imports, the way most teaching snippets are
  // written; explicit `import { useState } from "react"` works too.
  const hookNames = [
    "useState", "useEffect", "useRef", "useMemo", "useCallback", "useContext",
    "useReducer", "useId", "createContext", "memo", "lazy", "Suspense",
    "Fragment", "StrictMode", "forwardRef"
  ];
  const hookValues = hookNames.map((name) => window.React?.[name]);

  try {
    const fn = new Function(
      "console", "require", "module", "exports", "document",
      "React", "ReactDOM", "$", "jQuery", "__autoRender", "__renderToHtml",
      ...hookNames,
      compiled
    );
    const moduleShim = { exports: {} };

    fn(
      fakeConsole, makeRequire(rootElement), moduleShim, moduleShim.exports,
      makeDocumentProxy(host, rootElement),
      window.React, window.ReactDOM, jq, jq, autoRender, renderToHtml,
      ...hookValues
    );
  } catch (error) {
    return { output: logs.join("\n"), html: "", error: normalizeError(error) };
  }

  // React 18 createRoot renders async by default — let the commit flush.
  await Promise.resolve();

  const html = flavor === "jquery" ? host.innerHTML : rootElement.innerHTML;
  return { output: logs.join("\n"), html, error: null };
}

// Runs a snippet. With a host element (the run panel's preview) the result
// renders live in place; without one, a hidden offscreen host is used and
// cleaned up — that is the grading path.
export async function runJs(code, flavor, host) {
  await loadJs(flavor);

  let scratch = null;

  if (!host) {
    scratch = document.createElement("div");
    scratch.style.cssText = "position:fixed;left:-9999px;top:0;width:480px;";
    document.body.appendChild(scratch);
    host = scratch;
  }

  try {
    return await execute(code, flavor, host);
  } finally {
    if (scratch) {
      scratch.remove();
    }
  }
}
