const code = (...lines) => lines.join("\n");
const setId = "set5";

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

export const set5Modules = [
  { id: "set5-route-trees-layouts", setId, title: "Route Trees and Layouts" },
  { id: "set5-navigation-url", setId, title: "Navigation and URL State" },
  { id: "set5-params-query", setId, title: "Params, Query Params, and Filters" },
  { id: "set5-protected-auth-routes", setId, title: "Protected Routes and Auth Flow" },
  { id: "set5-data-routers", setId, title: "Router Loaders, Actions, and Errors" },
  { id: "set5-pending-navigation", setId, title: "Pending Navigation UI" },
  { id: "set5-route-architecture-deployment", setId, title: "Route Architecture and SPA Deployment" },
  { id: "set5-server-state", setId, title: "Server State Concepts" },
  { id: "set5-tanstack-query", setId, title: "TanStack Query Basics" },
  { id: "set5-mutations-rollback", setId, title: "Mutations and Optimistic Rollback" },
  { id: "set5-api-service-layer", setId, title: "API Client and Error Shapes" },
  { id: "set5-request-lifecycle", setId, title: "Request Lifecycle and Error UI" },
  { id: "set5-pagination-infinite", setId, title: "Pagination and Infinite Queries" },
  { id: "set5-search-filter-sync", setId, title: "Search, Filters, and URL Sync" },
  { id: "set5-crud-workflows", setId, title: "CRUD Workflows and Toasts" },
  { id: "set5-auth-workflow", setId, title: "Auth Workflow and Security Warnings" },
  { id: "set5-form-libraries", setId, title: "React Hook Form and Validation" },
  { id: "set5-app-layouts", setId, title: "App Layout Workflows" },
  { id: "set5-env-config", setId, title: "Environment and API Configuration" },
  { id: "set5-mini-workflows", setId, title: "Mini Real-App Programs" }
];

export const set5Questions = [
  ...attach("set5-route-trees-layouts", [
    mcq("Why do real React apps usually define a route tree instead of rendering pages with one big if statement?", ["A route tree makes URL-to-screen structure explicit and composable", "React requires every app to use nested routes", "It prevents all network requests"], "A route tree makes URL-to-screen structure explicit and composable", "Routes become easier to scan, nest, protect, lazy-load, and connect to data."),
    mcq("Which route is a layout route?", ["A route that renders shared UI and an Outlet for child routes", "A route that only renders a button", "A route that changes package.json"], "A route that renders shared UI and an Outlet for child routes", "Layout routes hold common shells such as sidebars, headers, and tabs."),
    fill("Complete the nested route placeholder.", "function DashboardLayout() {\n  return <section><Sidebar /><__1__ /></section>;\n}", [{ label: "__1__", answers: ["Outlet"] }], "Outlet is where the matching child route renders."),
    tf("A parent layout route can stay mounted while child routes change.", true, "This is the point of nested layouts: shared UI remains stable while nested content changes."),
    mcq("Which route setup best matches /settings/profile inside a settings layout?", ["A settings parent route with a profile child route", "Three unrelated BrowserRouter components", "A single button with onClick only"], "A settings parent route with a profile child route", "Nested routes should reflect nested screens when the UI shares a layout."),
    fill("Complete a route object with children.", "{ path: \"dashboard\", element: <DashboardLayout />, __1__: [{ path: \"reports\", element: <Reports /> }] }", [{ label: "__1__", answers: ["children"] }], "Route objects use children to describe nested route branches."),
    mcq("Where should a route-specific page component usually live in a feature-based app?", ["Near the feature or route it belongs to", "Only inside node_modules", "Inside package-lock.json"], "Near the feature or route it belongs to", "Feature-oriented routes reduce hunting across unrelated folders."),
    tf("Every presentational component should also define its own route.", false, "Routes are for navigable screens or layout boundaries, not every small UI component."),
    fill("Complete the root route element in a data router object.", "{ path: \"/\", __1__: <RootLayout /> }", [{ label: "__1__", answers: ["element"] }], "The element property describes what the route renders."),
    typed("Write a route object for /dashboard that renders DashboardPage.", "", "const route = { path: \"/dashboard\", element: <DashboardPage /> };", ["path", "/dashboard", "element", "DashboardPage"], "This is the basic route object shape used before nesting.")
  ]),
  ...attach("set5-navigation-url", [
    mcq("When should you use Link instead of a normal anchor tag for internal app navigation?", ["When navigating to another route inside the SPA", "When submitting a login password", "When importing CSS"], "When navigating to another route inside the SPA", "Link updates the client route without forcing a full page reload."),
    fill("Complete the dashboard navigation link.", "<Link __1__=\"/dashboard\">Dashboard</Link>", [{ label: "__1__", answers: ["to"] }], "The to prop is the target route."),
    mcq("What is useNavigate used for?", ["Programmatic navigation after logic runs", "Creating a reducer", "Reading CSS variables"], "Programmatic navigation after logic runs", "Examples include redirecting after login, save, or cancel."),
    fill("After saving, navigate back to the /projects list.", "const navigate = useNavigate();\nawait saveProject(project);\nnavigate(\"__1__\");", [{ label: "__1__", answers: ["/projects"] }], "After a successful mutation, navigation can move the user back to the list."),
    tf("The URL is part of app state when it determines what screen, tab, filter, or item is shown.", true, "Good routing treats the URL as shareable state, not just a decoration."),
    mcq("Which value should usually be stored in the URL instead of only in useState?", ["The current search query on a shareable products page", "Whether one tooltip is open", "A temporary input focus ref"], "The current search query on a shareable products page", "Shareable filters and navigation state belong well in the URL."),
    mcq("What is a common reason to use Navigate as a component?", ["Declarative redirect during render", "Parsing JSON", "Registering a form field"], "Declarative redirect during render", "A guard component can render <Navigate /> when access should be denied."),
    fill("Complete a replace redirect.", "<Navigate to=\"/login\" __1__ />", [{ label: "__1__", answers: ["replace"] }], "replace avoids leaving the denied route in the history stack."),
    tf("Calling navigate inside render is the recommended way to redirect.", false, "Use <Navigate /> for render-time redirects or call navigate from events/effects when appropriate."),
    typed("Write a cancel button that navigates back to /projects.", "", "<button type=\"button\" onClick={() => navigate(\"/projects\")}>Cancel</button>", ["button", "type=\"button\"", "onClick", "navigate", "/projects"], "Programmatic navigation belongs in an event handler for a button action.")
  ]),
  ...attach("set5-params-query", [
    mcq("What does a route parameter represent?", ["A dynamic part of the path such as /users/:id", "A package script", "A CSS selector"], "A dynamic part of the path such as /users/:id", "Params identify resources or nested screens in the path."),
    fill("Complete the route path for a product details page.", "<Route path=\"products/:__1__\" element={<ProductPage />} />", [{ label: "__1__", answers: ["productId", "id"] }], "The colon marks a dynamic segment."),
    fill("Read the productId param.", "const { __1__ } = useParams();", [{ label: "__1__", answers: ["productId"] }], "useParams returns route parameter strings."),
    tf("Route params are usually strings even when the ID looks numeric.", true, "Convert IDs when your API or logic expects a number."),
    mcq("What is the best use for search params such as ?page=2&sort=price?", ["Optional URL state for filtering, sorting, and pagination", "Replacing all component props", "Hiding secret API keys"], "Optional URL state for filtering, sorting, and pagination", "Search params make list state shareable and reload-safe."),
    fill("Complete reading URL search params.", "const [searchParams, __1__] = useSearchParams();", [{ label: "__1__", answers: ["setSearchParams"] }], "React Router exposes a getter and setter for query params."),
    mcq("Why should filter state often sync to the URL?", ["Users can refresh, bookmark, and share the same filtered view", "It makes React render no components", "It removes the need for validation"], "Users can refresh, bookmark, and share the same filtered view", "URL-backed filters survive navigation and sharing."),
    fill("Complete a URL-backed page number fallback.", "const page = Number(searchParams.get(\"page\") ?? \"__1__\");", [{ label: "__1__", answers: ["1"] }], "Search params are strings, so use a default and convert intentionally."),
    tf("Secrets such as private API keys are safe in query params if the app uses React Router.", false, "Anything in the browser URL is visible to users and logs."),
    typed("Write code that reads a query param named q with an empty string fallback.", "", "const query = searchParams.get(\"q\") ?? \"\";", ["searchParams.get", "\"q\"", "??", "\"\""], "This handles the missing-param case without crashing.")
  ]),
  ...attach("set5-protected-auth-routes", [
    mcq("What is the job of a protected route?", ["Allow, redirect, or block based on the user's auth/permission state", "Encrypt React components automatically", "Install auth dependencies"], "Allow, redirect, or block based on the user's auth/permission state", "Route guards enforce whether a screen should be reachable."),
    mcq("Which route should usually be protected?", ["Account billing page", "Public pricing page", "Landing page hero"], "Account billing page", "Private account data should require authentication."),
    fill("Complete a basic auth guard return.", "return user ? <Outlet /> : <Navigate to=\"/__1__\" replace />;", [{ label: "__1__", answers: ["login"] }], "An authenticated user sees child routes; guests are redirected."),
    tf("A protected route in the frontend is enough to secure server data.", false, "Frontend guards improve UX, but the server must still enforce authorization."),
    mcq("Why store the originally requested route during login redirect?", ["So the user can return there after successful login", "So passwords can be saved in the URL", "So React skips rendering"], "So the user can return there after successful login", "Return-to behavior makes protected flows smoother."),
    fill("Complete passing a return target through location state.", "<Navigate to=\"/login\" state={{ from: __1__ }} replace />", [{ label: "__1__", answers: ["location"] }], "The current location can be remembered before redirecting."),
    mcq("What is a role-based route guard?", ["A guard that checks permissions such as admin or editor", "A guard that checks font size", "A guard that runs npm scripts"], "A guard that checks permissions such as admin or editor", "Authentication says who the user is; authorization says what they may do."),
    tf("A 401 usually means unauthenticated, while a 403 usually means authenticated but forbidden.", true, "Good apps distinguish login-required from permission-denied."),
    fill("Complete an admin-only guard condition.", "if (!user || user.role !== \"__1__\") return <Navigate to=\"/403\" replace />;", [{ label: "__1__", answers: ["admin"] }], "Role checks should be explicit and mirrored by server authorization."),
    typed("Write a ProtectedRoute that renders Outlet for a user and redirects otherwise.", "", "function ProtectedRoute({ user }) {\n  return user ? <Outlet /> : <Navigate to=\"/login\" replace />;\n}", ["function ProtectedRoute", "user", "Outlet", "Navigate", "/login", "replace"], "This is the core frontend route-guard pattern.")
  ]),
  ...attach("set5-data-routers", [
    mcq("What is a React Router loader for?", ["Loading route data before rendering the route", "Creating CSS modules", "Replacing every API client"], "Loading route data before rendering the route", "Loaders move route-level data needs into the route definition."),
    mcq("What is a React Router action for?", ["Handling route-level mutations and form submissions", "Rendering SVG icons", "Sorting arrays only"], "Handling route-level mutations and form submissions", "Actions handle data writes that belong to a route."),
    fill("Read data returned by a route loader.", "const projects = __1__();", [{ label: "__1__", answers: ["useLoaderData"] }], "useLoaderData reads the current route loader result."),
    fill("Complete a data-router form import/use.", "<__1__ method=\"post\"><button>Save</button></__1__>", [{ label: "__1__", answers: ["Form"] }], "React Router Form submits to route actions and activates pending UI."),
    tf("After a route action completes, React Router can revalidate loader data so the UI stays current.", true, "This is a major reason to learn data routers."),
    mcq("What should route error elements handle?", ["Thrown loader/action errors and route-level failures", "Only CSS hover states", "Only local input focus"], "Thrown loader/action errors and route-level failures", "Route error boundaries keep failed routes from blanking the whole app."),
    fill("Complete throwing a 404 from a loader.", "if (!project) throw new Response(\"Not Found\", { status: __1__ });", [{ label: "__1__", answers: ["404"] }], "Route loaders can signal not-found states before rendering."),
    mcq("When might TanStack Query be a better fit than router loaders?", ["Highly interactive cached data shared across many components with background refetching", "A static about page title", "A one-time route-only redirect"], "Highly interactive cached data shared across many components with background refetching", "Router loaders are route-centered; query caches are app-wide server-state tools."),
    mcq("When is a router loader a good fit?", ["Data needed to render a route before the screen appears", "A dropdown open boolean", "A DOM ref"], "Data needed to render a route before the screen appears", "Route-level data dependencies fit naturally in loaders."),
    typed("Write a loader that fetches projects and returns them.", "", "export async function loader() {\n  const projects = await api.getProjects();\n  return { projects };\n}", ["export async function loader", "await api.getProjects", "return", "projects"], "This teaches route-level data loading before rendering.")
  ]),
  ...attach("set5-pending-navigation", [
    mcq("Which hook exposes global pending navigation state in React Router data routers?", ["useNavigation", "useNavigate", "useParams"], "useNavigation", "useNavigation tells the UI whether navigation/submission is idle, loading, or submitting."),
    fill("Complete a loading flag from navigation state.", "const navigation = useNavigation();\nconst isLoading = navigation.state === \"__1__\";", [{ label: "__1__", answers: ["loading"] }], "loading means the next route loaders are being awaited."),
    fill("Complete a submitting flag.", "const isSubmitting = navigation.state === \"__1__\";", [{ label: "__1__", answers: ["submitting"] }], "submitting means a route action is currently being called."),
    mcq("Why is pending route UI different from normal component loading state?", ["It represents route transitions and form submissions controlled by the router", "It only works in CSS", "It is stored in package-lock.json"], "It represents route transitions and form submissions controlled by the router", "The router knows about in-flight navigations before the next route renders."),
    tf("A submit button should often be disabled while its submission is pending.", true, "This prevents duplicate submissions and gives clear feedback."),
    fill("Disable a submit button during submission.", "<button disabled={__1__}>Save</button>", [{ label: "__1__", answers: ["isSubmitting"] }], "Disable or busy states protect mutation flows."),
    mcq("What UI is commonly shown while route data is loading?", ["A skeleton or progress indicator in the layout", "An alert saying success", "A random redirect"], "A skeleton or progress indicator in the layout", "Pending UI keeps transitions understandable."),
    mcq("Which value can identify the form currently submitting?", ["navigation.formAction", "window.title", "params.Form"], "navigation.formAction", "formAction helps target pending UI to one form."),
    tf("Optimistic UI and pending UI are the same thing.", false, "Pending UI says work is in progress; optimistic UI previews the expected result before confirmation."),
    typed("Write a button label that changes while submitting.", "", "<button disabled={isSubmitting}>{isSubmitting ? \"Saving...\" : \"Save\"}</button>", ["button", "disabled", "isSubmitting", "Saving...", "Save"], "This is a small but real route-action UX pattern.")
  ]),
  ...attach("set5-route-architecture-deployment", [
    mcq("What is the SPA refresh problem?", ["Directly visiting /dashboard on static hosting may 404 because the server looks for a file path", "React cannot render nested components", "Vite cannot import JSX"], "Directly visiting /dashboard on static hosting may 404 because the server looks for a file path", "Client routing needs the server to send index.html for app routes."),
    fill("Complete a Vercel rewrite destination for a Vite SPA.", "{ \"source\": \"/(.*)\", \"destination\": \"__1__\" }", [{ label: "__1__", answers: ["/index.html"] }], "A catch-all rewrite lets the React app handle client routes."),
    tf("If /dashboard works after clicking a Link but fails after refresh in production, routing code may be fine and hosting rewrites may be missing.", true, "This is one of the most common React Router deployment bugs."),
    mcq("Which file is commonly used to configure Vercel rewrites?", ["vercel.json", "package-lock.json", "src/App.jsx only"], "vercel.json", "vercel.json can define a rewrite from all paths to index.html for SPAs."),
    mcq("What is the purpose of a 404 route inside the React app?", ["Show a friendly page for unmatched client-side routes", "Configure DNS records", "Cache server data"], "Show a friendly page for unmatched client-side routes", "The app should handle unknown paths even when hosting rewrites are configured."),
    fill("Complete a catch-all route path.", "{ path: \"__1__\", element: <NotFoundPage /> }", [{ label: "__1__", answers: ["*"] }], "The star catches unmatched routes in the route tree."),
    tf("A client-side 404 route and a hosting rewrite solve exactly the same problem.", false, "The rewrite serves the app for deep links; the app route decides what UI to show."),
    mcq("What should route modules avoid becoming?", ["A mix of unrelated pages, API clients, validation, and huge UI blocks in one file", "Small focused files", "Lazy-loaded boundaries"], "A mix of unrelated pages, API clients, validation, and huge UI blocks in one file", "Route files can coordinate, but large responsibilities should still be split."),
    fill("Complete a route-level lazy import.", "const DashboardPage = lazy(() => import(\"./routes/__1__.jsx\"));", [{ label: "__1__", answers: ["DashboardPage", "Dashboard"] }], "Route-level code splitting keeps heavier screens out of the first bundle."),
    typed("Write a minimal vercel.json rewrite for a Vite SPA.", "", "{\n  \"rewrites\": [{ \"source\": \"/(.*)\", \"destination\": \"/index.html\" }]\n}", ["rewrites", "source", "/(.*)", "destination", "/index.html"], "This fixes direct visits to client routes on static Vite deployments.")
  ]),
  ...attach("set5-server-state", [
    mcq("What is server state?", ["Data owned by a remote source and fetched into the UI", "Only a useState boolean", "A CSS media query"], "Data owned by a remote source and fetched into the UI", "The server remains the source of truth for fetched entities."),
    mcq("Why is server state harder than local UI state?", ["It can be loading, fail, become stale, refetch, and be shared", "It cannot be cached", "It never changes after fetch"], "It can be loading, fail, become stale, refetch, and be shared", "Server state brings network and freshness concerns."),
    tf("A modal open boolean is server state.", false, "That is local UI state, not data owned by the server."),
    fill("Complete the common request-state trio.", "const state = { data, __1__, error };", [{ label: "__1__", answers: ["isLoading", "loading"] }], "Server-state UI usually needs data, loading, and error status."),
    mcq("What does stale data mean?", ["Cached data that may no longer match the server", "A syntax error", "An empty route path"], "Cached data that may no longer match the server", "Cached data can remain useful while a refetch checks for freshness."),
    mcq("What is refetching?", ["Requesting server data again to refresh the UI", "Calling setState inside render", "Changing a CSS class"], "Requesting server data again to refresh the UI", "Refetching keeps a cache synchronized with the source of truth."),
    fill("Complete an explicit empty state check.", "if (!isLoading && projects.length === __1__) return <EmptyState />;", [{ label: "__1__", answers: ["0"] }], "Empty is different from loading and error."),
    tf("Server state should always be duplicated into local state immediately after fetching.", false, "Duplicating fetched data can create stale copies unless there is a clear editing reason."),
    mcq("What should the UI usually show when a request fails?", ["A useful error message and retry path", "A blank page", "A success toast"], "A useful error message and retry path", "Error states are part of the request lifecycle."),
    typed("Write a guard that renders RetryError when error exists.", "", "if (error) return <RetryError message={error.message} onRetry={refetch} />;", ["if (error)", "RetryError", "error.message", "refetch"], "Production UI should make request failures recoverable.")
  ]),
  ...attach("set5-tanstack-query", [
    mcq("What problem does TanStack Query mainly solve?", ["Managing server state such as caching, loading, errors, refetching, and mutations", "Replacing all React components", "Compiling CSS"], "Managing server state such as caching, loading, errors, refetching, and mutations", "It specializes in asynchronous server-state workflows."),
    fill("Complete the basic query hook.", "const { data, isLoading, error } = __1__({ queryKey: [\"projects\"], queryFn: fetchProjects });", [{ label: "__1__", answers: ["useQuery"] }], "useQuery reads and caches server data."),
    mcq("What is a queryKey for?", ["Identifying cached data", "Naming a CSS file", "Declaring an event handler"], "Identifying cached data", "Query keys decide what data is cached, reused, invalidated, or refetched."),
    fill("Complete a query key that includes a page number.", "queryKey: [\"projects\", { page: __1__ }]", [{ label: "__1__", answers: ["page"] }], "Variables that affect fetched data should be part of the key."),
    tf("If search text changes what the API returns, it should usually be represented in the query key.", true, "The cache needs to distinguish different server-state results."),
    mcq("What does enabled: false do in a query?", ["Prevents the query from automatically running until enabled", "Deletes the query cache", "Forces a route redirect"], "Prevents the query from automatically running until enabled", "This is useful when a required ID or token is not ready."),
    fill("Complete a conditional query.", "useQuery({ queryKey: [\"user\", userId], queryFn: fetchUser, enabled: Boolean(__1__) });", [{ label: "__1__", answers: ["userId"] }], "Do not fetch a user details endpoint before the ID exists."),
    mcq("What does invalidating a query usually mean?", ["Mark it stale and cause it to refetch when appropriate", "Remove React Router", "Turn it into local state"], "Mark it stale and cause it to refetch when appropriate", "Invalidation is the normal after-mutation refresh pattern."),
    tf("TanStack Query replaces the need to design API errors and empty states.", false, "It gives state tools, but your UI still needs good error and empty handling."),
    typed("Write a useQuery call for products with category in the key.", "", "const productsQuery = useQuery({\n  queryKey: [\"products\", category],\n  queryFn: () => fetchProducts(category)\n});", ["useQuery", "queryKey", "products", "category", "queryFn", "fetchProducts"], "Query keys must include inputs that change the fetched result.")
  ]),
  ...attach("set5-mutations-rollback", [
    mcq("Which hook is commonly used for server writes in TanStack Query?", ["useMutation", "useQuery", "useParams"], "useMutation", "Mutations handle create, update, delete, and other writes."),
    fill("Complete a mutation declaration.", "const createProject = __1__({ mutationFn: api.createProject });", [{ label: "__1__", answers: ["useMutation"] }], "useMutation wraps server-side writes."),
    mcq("What should often happen after a successful create/update/delete?", ["Invalidate or update affected queries", "Reload the whole browser every time", "Hide all errors"], "Invalidate or update affected queries", "The list/detail cache should reflect the confirmed server result."),
    fill("Complete invalidating the projects query.", "queryClient.invalidateQueries({ queryKey: [\"__1__\"] });", [{ label: "__1__", answers: ["projects"] }], "Invalidation tells the project list to refresh."),
    mcq("What is an optimistic update?", ["Updating the UI before the server confirms because the expected result is likely", "Waiting for the server before showing any pending state", "A route import"], "Updating the UI before the server confirms because the expected result is likely", "Optimistic UI improves speed perception but needs failure handling."),
    mcq("What is rollback in an optimistic update?", ["Restoring the previous cache/UI if the mutation fails", "Navigating to /rollback", "Deleting package-lock.json"], "Restoring the previous cache/UI if the mutation fails", "Rollback protects the user from fake data when the server rejects the write."),
    tf("Optimistic updates are risky for actions involving payments, permissions, or irreversible operations.", true, "Use optimistic UI carefully when failure cost is high."),
    fill("Complete storing a previous cache snapshot.", "const previousProjects = queryClient.__1__([\"projects\"]);", [{ label: "__1__", answers: ["getQueryData"] }], "A snapshot gives rollback something to restore."),
    fill("Complete restoring a failed optimistic cache.", "queryClient.__1__([\"projects\"], previousProjects);", [{ label: "__1__", answers: ["setQueryData"] }], "Rollback writes the previous snapshot back to the cache."),
    typed("Write an onError rollback callback using context.previousProjects.", "", "onError: (_error, _variables, context) => {\n  queryClient.setQueryData([\"projects\"], context.previousProjects);\n}", ["onError", "queryClient.setQueryData", "projects", "context.previousProjects"], "Optimistic flows should plan the failure path, not only the happy path.")
  ]),
  ...attach("set5-api-service-layer", [
    mcq("Why create an API client layer instead of calling fetch everywhere?", ["To centralize base URL, headers, parsing, and error handling", "To avoid all network requests", "To replace React Router"], "To centralize base URL, headers, parsing, and error handling", "A consistent client keeps screens focused on workflow."),
    fill("Complete a base API URL read in Vite.", "const API_URL = import.meta.env.__1__;", [{ label: "__1__", answers: ["VITE_API_URL"] }], "Vite exposes public frontend env vars with the VITE_ prefix."),
    mcq("Why define a consistent API error shape?", ["UI can extract messages and field errors predictably", "It makes every request successful", "It hides all HTTP status codes"], "UI can extract messages and field errors predictably", "Consistent errors reduce one-off parsing in every screen."),
    fill("Complete a helpful error object shape.", "{ status: 422, message: \"Invalid input\", __1__: { email: \"Required\" } }", [{ label: "__1__", answers: ["fieldErrors"] }], "422 validation errors often need field-level messages."),
    mcq("What should a 401 response usually trigger?", ["Login or token refresh flow", "A success toast", "Sorting the current array"], "Login or token refresh flow", "401 means the request is not authenticated."),
    mcq("What does 422 commonly represent in CRUD forms?", ["Validation failed for submitted data", "User is offline only", "The page route is missing"], "Validation failed for submitted data", "422 responses often carry field errors."),
    tf("A 500 error should usually be shown as a field-level email error.", false, "500 is a server failure and is usually a general error, not a single-field validation problem."),
    fill("Throw on non-OK fetch responses.", "if (!response.__1__) throw await parseApiError(response);", [{ label: "__1__", answers: ["ok"] }], "Fetch only rejects on network errors by default, so HTTP errors need explicit handling."),
    mcq("Why avoid hardcoding API URLs in many components?", ["Changing environments becomes fragile and duplicated", "React cannot render hardcoded strings", "It disables JSX"], "Changing environments becomes fragile and duplicated", "Config should live in one place."),
    typed("Write a request helper that parses JSON after an OK response.", "", "async function request(path) {\n  const response = await fetch(`${API_URL}${path}`);\n  if (!response.ok) throw await parseApiError(response);\n  return response.json();\n}", ["async function request", "fetch", "response.ok", "parseApiError", "response.json"], "This starts a reusable API client layer.")
  ]),
  ...attach("set5-request-lifecycle", [
    mcq("Which states should a serious request UI usually consider?", ["idle/loading/success/error/empty", "only success", "only hover"], "idle/loading/success/error/empty", "Good data UI is explicit about every important request state."),
    fill("Complete a loading branch.", "if (query.isLoading) return <__1__ />;", [{ label: "__1__", answers: ["Spinner", "Skeleton", "LoadingState"] }], "Loading UI should be visible while data is not ready."),
    mcq("What is the difference between error and empty?", ["Error means the request failed; empty means the request succeeded with no items", "They are always identical", "Empty means the server crashed"], "Error means the request failed; empty means the request succeeded with no items", "Users need different guidance in each case."),
    tf("A retry button is useful only if it actually triggers another request.", true, "Retry UI should be wired to refetch or re-submit, not just decorative."),
    fill("Complete a retry button.", "<button onClick={__1__}>Try again</button>", [{ label: "__1__", answers: ["refetch", "handleRetry"] }], "The retry handler should re-run the failed request."),
    mcq("What should happen if a user navigates away during a slow request?", ["The app should avoid setting state on unmounted screens or let a server-state/router tool manage it", "The app should always show success", "The browser should close"], "The app should avoid setting state on unmounted screens or let a server-state/router tool manage it", "Unmounted request handling prevents confusing stale updates."),
    mcq("What is a race condition in request UI?", ["An older slower request overwrites a newer result", "A component has two buttons", "A query has a key"], "An older slower request overwrites a newer result", "Search and filter UIs are especially prone to stale responses."),
    fill("Complete a simple ignore flag cleanup.", "return () => { ignore = __1__; };", [{ label: "__1__", answers: ["true"] }], "Ignoring old responses is a beginner-safe cleanup pattern for manual effects."),
    tf("Route loaders and TanStack Query can reduce manual loading/error/race handling, but you still design the UI states.", true, "Tools organize async state; they do not design your product experience."),
    typed("Write a manual effect guard that only sets data when ignore is false.", "", "if (!ignore) {\n  setData(result);\n}", ["if", "!ignore", "setData", "result"], "This is the key condition in an ignore-flag cleanup pattern.")
  ]),
  ...attach("set5-pagination-infinite", [
    mcq("What is pagination?", ["Loading a known page of results at a time", "Rendering every possible record forever", "A replacement for auth"], "Loading a known page of results at a time", "Pagination makes large lists manageable and addressable."),
    fill("Include page in a query key.", "queryKey: [\"projects\", { page: __1__ }]", [{ label: "__1__", answers: ["page"] }], "The current page changes which data is fetched."),
    mcq("When is numbered pagination often better than infinite scroll?", ["When users need stable positions, direct page links, or comparison", "When records are secret", "When the list has one item"], "When users need stable positions, direct page links, or comparison", "Pagination is predictable for admin tables and search results."),
    mcq("What is infinite scrolling?", ["Loading more pages as the user asks or scrolls", "One request for all app data", "A CSS animation only"], "Loading more pages as the user asks or scrolls", "Infinite queries append pages to the current list."),
    fill("Complete the TanStack Query hook for infinite lists.", "const query = __1__({ queryKey: [\"feed\"], queryFn, getNextPageParam });", [{ label: "__1__", answers: ["useInfiniteQuery"] }], "useInfiniteQuery models paginated data as pages."),
    tf("A Load more button is often easier to control and test than automatic scroll detection.", true, "Automatic infinite scroll adds viewport and timing complexity."),
    fill("Complete a Load More button disabled state.", "<button disabled={!hasNextPage || __1__}>Load more</button>", [{ label: "__1__", answers: ["isFetchingNextPage"] }], "Disable while fetching to prevent duplicate page loads."),
    mcq("What does getNextPageParam decide?", ["How to find the next page cursor/page value", "Which CSS class to use", "Which route is protected"], "How to find the next page cursor/page value", "Infinite queries need to know whether another page exists and how to request it."),
    tf("Infinite scroll is always better than pagination.", false, "Infinite scroll can hurt findability, footer access, and control for many workflows."),
    typed("Write a Load More button that calls fetchNextPage.", "", "<button disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()}>Load more</button>", ["button", "disabled", "hasNextPage", "isFetchingNextPage", "onClick", "fetchNextPage"], "This is the simplest infinite-query interaction.")
  ]),
  ...attach("set5-search-filter-sync", [
    mcq("Why debounce a search input before fetching?", ["To avoid firing a request on every keystroke", "To make passwords safer", "To create route params"], "To avoid firing a request on every keystroke", "Debounce waits for typing to pause before requesting data."),
    fill("Complete a debounce timeout cleanup.", "return () => clearTimeout(__1__);", [{ label: "__1__", answers: ["timeoutId", "id", "timer"] }], "Cleanup cancels the previous pending update."),
    mcq("What should be in the query key for a filtered list?", ["Every value that changes the fetched result", "Only the component name", "Only the button label"], "Every value that changes the fetched result", "Search, filters, sort, and page should be represented."),
    fill("Complete a product list query key.", "queryKey: [\"products\", { q, category, __1__ }]", [{ label: "__1__", answers: ["sort", "page"] }], "The cache key should describe the server result."),
    tf("If a filter is shareable, it is often better stored in URL search params than only local state.", true, "URL filters survive refresh and can be copied to another user."),
    mcq("Why should page often reset to 1 when search text changes?", ["The previous page number may not exist for the new results", "React Router requires page 1 always", "It clears node_modules"], "The previous page number may not exist for the new results", "Filter changes usually define a new result set."),
    fill("Complete setting URL filters.", "setSearchParams({ q: nextQuery, page: \"__1__\" });", [{ label: "__1__", answers: ["1"] }], "Resetting page prevents empty results caused by stale pagination."),
    mcq("What is a race risk in live search?", ["A slow old search response renders after a faster new one", "The input has a placeholder", "The query uses an array"], "A slow old search response renders after a faster new one", "Debounce and query tools reduce stale response bugs."),
    fill("Debounce the query by 300 milliseconds.", "const debouncedQuery = useDebounce(query, __1__);", [{ label: "__1__", answers: ["300"] }], "A few hundred milliseconds is common for search debounce."),
    typed("Write a query key for products filtered by debouncedQuery and category.", "", "queryKey: [\"products\", { q: debouncedQuery, category }]", ["queryKey", "products", "debouncedQuery", "category"], "Use the debounced value for fetching so typing does not request every character.")
  ]),
  ...attach("set5-crud-workflows", [
    mcq("What does CRUD stand for?", ["Create, Read, Update, Delete", "Cache, Route, Use, Deploy", "Click, Render, Undo, Draw"], "Create, Read, Update, Delete", "CRUD is the base workflow for many admin and product apps."),
    mcq("Which UI should normally confirm a successful create?", ["A success toast or visible new record after the server confirms", "A fake success before the request starts", "A blank screen"], "A success toast or visible new record after the server confirms", "Success feedback should match actual server state unless explicitly optimistic."),
    fill("Complete a success toast after mutation success.", "onSuccess: () => toast.__1__(\"Project created\")", [{ label: "__1__", answers: ["success"] }], "Success toasts are common after confirmed creates, updates, and deletes."),
    fill("Complete an error toast.", "onError: () => toast.__1__(\"Could not save project\")", [{ label: "__1__", answers: ["error"] }], "Global error toasts fit failures that are not tied to one field."),
    tf("Inline field errors are better than a generic toast when the server says the email field is invalid.", true, "Field-specific errors should appear near the field."),
    mcq("When should you avoid showing a success toast?", ["Before the server confirms, unless using a deliberate optimistic pattern", "After a confirmed save", "After a successful delete"], "Before the server confirms, unless using a deliberate optimistic pattern", "Premature success breaks trust when the request fails."),
    mcq("What should a delete flow often include?", ["Confirmation for destructive actions and clear success/error feedback", "Immediate silent deletion with no feedback", "A route param named delete always"], "Confirmation for destructive actions and clear success/error feedback", "Destructive actions deserve more careful UX."),
    fill("After a successful save, navigate back to the /projects list.", "onSuccess: () => {\n  toast.success(\"Saved\");\n  navigate(\"__1__\");\n}", [{ label: "__1__", answers: ["/projects"] }], "CRUD flows often return to a list after a save."),
    tf("A CRUD edit page should consider loading the existing record, handling not found, validation errors, and save pending state.", true, "Edit screens combine route data, form state, mutation state, and errors."),
    typed("Write a mutation success handler that invalidates projects and shows a toast.", "", "onSuccess: () => {\n  queryClient.invalidateQueries({ queryKey: [\"projects\"] });\n  toast.success(\"Project saved\");\n}", ["onSuccess", "invalidateQueries", "projects", "toast.success", "Project saved"], "This ties confirmed server writes to cache refresh and user feedback.")
  ]),
  ...attach("set5-auth-workflow", [
    mcq("What is the difference between authentication and authorization?", ["Authentication verifies identity; authorization checks permissions", "They are exactly the same", "Authorization only changes CSS"], "Authentication verifies identity; authorization checks permissions", "Both are needed in real apps."),
    mcq("Where must real authorization checks happen?", ["On the server/API", "Only in a React protected route", "Only in localStorage"], "On the server/API", "Frontend route guards can be bypassed, so the server must enforce access."),
    fill("Complete attaching a bearer token header.", "headers: { Authorization: `Bearer ${__1__}` }", [{ label: "__1__", answers: ["token"] }], "Authenticated API clients often attach an access token."),
    tf("Storing long-lived highly sensitive tokens in localStorage has security tradeoffs.", true, "Frontend storage choices affect XSS and session-risk models."),
    mcq("What should a 401 from an API often do?", ["Clear invalid auth state or redirect to login", "Show a success toast", "Retry forever without limit"], "Clear invalid auth state or redirect to login", "Unauthenticated responses should move the user toward re-authentication."),
    mcq("What is a refresh token flow for?", ["Getting a new access token when the current one expires", "Refreshing CSS variables", "Resetting a form field"], "Getting a new access token when the current one expires", "Token lifetimes and refresh flows shape auth UX."),
    fill("Complete a login mutation handler.", "onSuccess: (session) => {\n  setUser(session.__1__);\n  navigate(\"/dashboard\");\n}", [{ label: "__1__", answers: ["user"] }], "After login, app auth state and navigation should update."),
    tf("The frontend can hide an Admin link for non-admin users, but the API must still reject non-admin requests.", true, "UI hiding is not security; it is only helpful UX."),
    mcq("What is an auth bootstrap request?", ["A request on app start to learn the current session/user", "A CSS reset", "A package install step"], "A request on app start to learn the current session/user", "Apps often need to restore session state after refresh."),
    typed("Write an API helper branch that redirects on 401.", "", "if (error.status === 401) {\n  navigate(\"/login\");\n}", ["if", "error.status", "401", "navigate", "/login"], "Auth errors should be handled intentionally, often in a central place.")
  ]),
  ...attach("set5-form-libraries", [
    mcq("Why introduce React Hook Form in larger apps?", ["It helps manage form registration, validation, errors, and submission state with less re-render pressure", "It replaces React Router", "It makes API responses unnecessary"], "It helps manage form registration, validation, errors, and submission state with less re-render pressure", "Form libraries pay off as forms grow more complex."),
    fill("Complete a basic React Hook Form setup.", "const { register, handleSubmit, formState } = __1__();", [{ label: "__1__", answers: ["useForm"] }], "useForm creates the form API."),
    fill("Register an email input.", "<input {...register(\"__1__\")} />", [{ label: "__1__", answers: ["email"] }], "register connects an input to React Hook Form."),
    mcq("What is schema validation with Zod/Yup used for?", ["Defining validation rules in a reusable schema", "Creating route links", "Invalidating query caches"], "Defining validation rules in a reusable schema", "Schemas centralize data shape and validation rules."),
    fill("Complete a Zod resolver setup.", "useForm({ resolver: __1__(schema) });", [{ label: "__1__", answers: ["zodResolver", "yupResolver"] }], "Resolvers connect schema libraries to form validation."),
    mcq("What is the difference between client validation and server validation?", ["Client validation improves UX; server validation is authoritative", "Client validation replaces all server checks", "Server validation only checks colors"], "Client validation improves UX; server validation is authoritative", "Never trust only browser-side validation."),
    tf("Server field errors such as { email: 'Already taken' } should be shown near the matching input when possible.", true, "Field errors are more useful inline than only as global alerts."),
    fill("Complete setting a server field error in React Hook Form.", "setError(\"email\", { type: \"server\", message: errors.__1__ });", [{ label: "__1__", answers: ["email"] }], "setError can map API field errors into the form UI."),
    mcq("When might a form-level error be better than a field-level error?", ["When credentials are invalid but no single field should be blamed", "When the email format is wrong", "When the password field is empty"], "When credentials are invalid but no single field should be blamed", "Some errors describe the whole submission."),
    typed("Write a handleSubmit usage that calls onSubmit.", "", "<form onSubmit={handleSubmit(onSubmit)}>", ["form", "onSubmit", "handleSubmit", "onSubmit"], "React Hook Form wraps submit handling through handleSubmit.")
  ]),
  ...attach("set5-app-layouts", [
    mcq("What belongs in an application shell layout?", ["Persistent navigation, header, sidebar, and Outlet", "Every API function", "All route validation schemas"], "Persistent navigation, header, sidebar, and Outlet", "The shell coordinates shared UI around route content."),
    fill("Complete an app shell with nested route content.", "<AppSidebar />\n<main><__1__ /></main>", [{ label: "__1__", answers: ["Outlet"] }], "Outlet renders the active child screen inside the layout."),
    mcq("Where should global providers usually be placed?", ["Near the root around the router/app tree", "Inside every list item", "Inside package.json"], "Near the root around the router/app tree", "Providers such as QueryClientProvider and AuthProvider need to wrap consumers."),
    fill("Complete a QueryClient provider wrapper.", "<__1__ client={queryClient}><App /></__1__>", [{ label: "__1__", answers: ["QueryClientProvider"] }], "TanStack Query needs a provider with a query client."),
    tf("A modal route can let a detail screen appear over a list while preserving the list route context.", true, "Route-driven modals are an advanced navigation pattern."),
    mcq("What is a breadcrumbs component based on?", ["The current route matches or route metadata", "The package manager", "Only localStorage"], "The current route matches or route metadata", "Route metadata can drive navigation aids."),
    fill("Complete route metadata for a label.", "{ path: \"projects\", handle: { crumb: \"__1__\" } }", [{ label: "__1__", answers: ["Projects"] }], "A route handle can store UI metadata such as breadcrumb labels."),
    mcq("Why put NotFound inside the app layout sometimes?", ["So unknown routes still show the normal navigation shell", "So the server ignores all URLs", "So useState stops working"], "So unknown routes still show the normal navigation shell", "Users should not lose app navigation because one path is unmatched."),
    tf("App layout is only visual; it should never coordinate loading bars or auth-aware navigation.", false, "Layouts often coordinate navigation, pending indicators, and auth-aware shell UI."),
    typed("Write a RootLayout that renders Header and Outlet.", "", "function RootLayout() {\n  return <><Header /><Outlet /></>;\n}", ["function RootLayout", "Header", "Outlet"], "A layout route composes persistent UI with active child content.")
  ]),
  ...attach("set5-env-config", [
    mcq("Why use environment variables for API base URLs?", ["Different environments can use different backends without editing source code", "They hide all values from browser users", "They replace package scripts"], "Different environments can use different backends without editing source code", "Local, staging, and production often use different APIs."),
    fill("Complete a Vite public env var name.", "import.meta.env.__1__", [{ label: "__1__", answers: ["VITE_API_URL"] }], "Vite only exposes env variables prefixed with VITE_ to browser code."),
    tf("VITE_ environment variables are secret because they are read with import.meta.env.", false, "Frontend env vars are bundled into client code and visible in the browser."),
    mcq("Where should private API keys live?", ["On the server or in serverless/backend environment variables", "In a React component", "In a query param"], "On the server or in serverless/backend environment variables", "The browser cannot keep private secrets."),
    fill("Fall back to the relative path /api when VITE_API_URL is missing.", "const baseUrl = import.meta.env.VITE_API_URL ?? \"__1__\";", [{ label: "__1__", answers: ["/api"] }], "A fallback can make local/proxy setup easier."),
    mcq("What is a common use for .env.local?", ["Local developer-specific environment values", "Compiled production assets", "Git commit history"], "Local developer-specific environment values", ".env.local should usually stay out of git when it contains local config."),
    tf("Changing Vite env variables often requires restarting the dev server.", true, "Vite reads env files at startup."),
    mcq("Why centralize config parsing?", ["Missing or malformed env values fail clearly in one place", "It makes all values secret", "It creates route params"], "Missing or malformed env values fail clearly in one place", "Config validation catches deployment mistakes early."),
    fill("Complete a config export.", "export const config = { apiUrl: import.meta.env.__1__ };", [{ label: "__1__", answers: ["VITE_API_URL"] }], "A config module keeps environment reads out of every component."),
    typed("Write a tiny config guard for missing VITE_API_URL.", "", "if (!import.meta.env.VITE_API_URL) {\n  throw new Error(\"Missing VITE_API_URL\");\n}", ["if", "import.meta.env.VITE_API_URL", "throw new Error", "Missing VITE_API_URL"], "Failing loudly can be better than making requests to undefined.")
  ]),
  ...attach("set5-mini-workflows", [
    mcq("A projects page reads ?q=react&page=2, fetches data, and has a Create button. Which concepts are working together?", ["URL search params, server state, pagination, and navigation", "Only CSS and package-lock", "Only local button hover state"], "URL search params, server state, pagination, and navigation", "Real app screens combine several earlier concepts at once."),
    mcq("A dashboard route needs data before render and has a form that mutates the same route data. Which React Router pair fits?", ["loader and action", "useRef and Fragment", "memo and CSS"], "loader and action", "Loaders read route data; actions handle route-level writes."),
    fill("Complete route action form wiring.", "<Form method=\"__1__\" action=\"/projects/new\">", [{ label: "__1__", answers: ["post", "POST"] }], "POST submissions call route actions in data-router workflows."),
    tf("A full workflow question may require deciding where data lives, how errors appear, and how navigation changes after success.", true, "Advanced React is about composing concepts, not memorizing one hook at a time."),
    fill("Complete a confirmed delete flow sequence.", "await deleteProject(id);\nqueryClient.invalidateQueries({ queryKey: [\"projects\"] });\ntoast.__1__(\"Project deleted\");", [{ label: "__1__", answers: ["success"] }], "Mutation success should refresh affected data and give feedback."),
    mcq("A route has /projects/:projectId/edit and receives 404 from the loader. What should the UI do?", ["Render route-level not-found/error UI", "Pretend the project exists", "Show a success toast"], "Render route-level not-found/error UI", "Loader failures should map to route error states."),
    mcq("A Save button is clicked twice quickly and creates duplicate records. What concept should fix the UI side?", ["Pending submission state with the button disabled", "A larger font size", "A different import path"], "Pending submission state with the button disabled", "Pending UI prevents common duplicate mutation bugs."),
    fill("Complete a server validation mapping loop.", "for (const [field, message] of Object.entries(error.fieldErrors)) {\n  setError(field, { type: \"server\", __1__ });\n}", [{ label: "__1__", answers: ["message"] }], "Mapping field errors keeps API validation visible next to inputs."),
    typed("Write a route loader that throws 404 when project is missing.", "", "export async function loader({ params }) {\n  const project = await api.getProject(params.projectId);\n  if (!project) throw new Response(\"Not Found\", { status: 404 });\n  return { project };\n}", ["export async function loader", "params.projectId", "api.getProject", "throw new Response", "status: 404", "return", "project"], "This is a route-level data and error workflow."),
    typed("Write a compact create-project success workflow with cache refresh, toast, and navigation.", "", "onSuccess: () => {\n  queryClient.invalidateQueries({ queryKey: [\"projects\"] });\n  toast.success(\"Project created\");\n  navigate(\"/projects\");\n}", ["onSuccess", "invalidateQueries", "projects", "toast.success", "Project created", "navigate", "/projects"], "This final task combines mutation, cache, notification, and routing.")
  ])
];
