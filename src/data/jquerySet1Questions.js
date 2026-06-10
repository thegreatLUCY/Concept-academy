const code = (...lines) => lines.join("\n");
const setId = "jquery-set1";

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

export const jquerySet1Modules = [
  { id: "jq1-what-jquery", setId, title: "What jQuery Is (and When)" },
  { id: "jq1-loading-ready", setId, title: "Loading jQuery and Document Ready" },
  { id: "jq1-selectors", setId, title: "Selectors" },
  { id: "jq1-dom-content", setId, title: "Reading and Changing Content" },
  { id: "jq1-classes-css", setId, title: "Classes and CSS" },
  { id: "jq1-events", setId, title: "Events" },
  { id: "jq1-effects", setId, title: "Showing, Hiding, and Effects" },
  { id: "jq1-traversal", setId, title: "Traversing the DOM" },
  { id: "jq1-ajax", setId, title: "AJAX" },
  { id: "jq1-vanilla", setId, title: "Migrating to Vanilla JS" }
];

export const jquerySet1Lessons = {
  "jq1-what-jquery": {
    summary:
      "jQuery is a JavaScript library from 2006 that made DOM manipulation, events, and AJAX painless when browsers disagreed about everything. Its $() function selects elements and returns a wrapped set with chainable methods. You learn it today mainly to MAINTAIN the enormous amount of existing jQuery code — new projects usually use modern vanilla JS or a framework.",
    points: [
      "$ is just a function: $(\"selector\") selects, methods act.",
      "Chainable: $(\"#box\").addClass(\"red\").fadeIn().",
      "Learn it to maintain legacy code; reach for vanilla JS in new code."
    ],
    example: code(
      "$(\"#message\")",
      "  .text(\"Hello, jQuery\")",
      "  .addClass(\"highlight\")",
      "  .fadeIn();"
    )
  },
  "jq1-loading-ready": {
    summary:
      "jQuery loads via a <script> tag (CDN or local file) BEFORE your own script. Code touching the DOM must wait for the page to be ready: $(document).ready(function() {...}) or its shorthand $(function() {...}). Running selectors before the elements exist is the classic 'nothing happens' bug.",
    points: [
      "<script src=\"jquery.min.js\"></script> before your code.",
      "$(function() { ... }) runs after the DOM is parsed.",
      "Selectors before ready find NOTHING — silently."
    ],
    example: code(
      "<script src=\"https://code.jquery.com/jquery-3.7.1.min.js\"></script>",
      "<script>",
      "  $(function () {",
      "    $(\"#status\").text(\"DOM is ready\");",
      "  });",
      "</script>"
    )
  },
  "jq1-selectors": {
    summary:
      "jQuery selectors are CSS selectors: $(\"#id\") for one element by id, $(\".class\") for a class, $(\"p\") for tags, $(\"ul li:first\") for refinements. The result is a jQuery set holding ZERO or more matches — methods apply to all of them at once, and an empty set fails silently.",
    points: [
      "$(\"#save\"), $(\".card\"), $(\"li\"), $(\"input[type=text]\").",
      "Methods act on EVERY matched element.",
      "Empty selections do not error — check .length when debugging."
    ],
    example: code(
      "$(\"#title\")        // by id",
      "$(\".item\")         // by class",
      "$(\"ul li\")         // descendants",
      "$(\".item\").length  // how many matched"
    )
  },
  "jq1-dom-content": {
    summary:
      "Reading and writing content: .text() handles plain text, .html() parses HTML markup, .val() reads/writes form inputs, .attr() handles attributes. Called with no argument they READ (from the first match); with an argument they WRITE (to all matches). Never put untrusted user input through .html() — that is an XSS hole.",
    points: [
      ".text() reads; .text(\"new\") writes — same for .html()/.val().",
      ".val() is for inputs, selects, and textareas.",
      ".html() executes markup — untrusted input goes in .text() only."
    ],
    example: code(
      "$(\"#title\").text(\"New title\");",
      "$(\"#intro\").html(\"<strong>Bold</strong> intro\");",
      "const name = $(\"#name-input\").val();",
      "$(\"#link\").attr(\"href\", \"https://example.com\");"
    )
  },
  "jq1-classes-css": {
    summary:
      "Styling state lives in classes: .addClass(), .removeClass(), and .toggleClass() flip them, .hasClass() checks. .css() reads or writes inline styles directly — fine for one-offs, but classes keep styling in the stylesheet where it belongs.",
    points: [
      ".addClass(\"active\") / .removeClass(\"active\") / .toggleClass(\"active\").",
      ".hasClass(\"open\") returns a boolean.",
      "Prefer classes over .css() so styles stay in CSS files."
    ],
    example: code(
      "$(\"#menu\").addClass(\"open\");",
      "$(\"#menu\").toggleClass(\"open\");",
      "$(\"#banner\").css(\"color\", \"crimson\");"
    )
  },
  "jq1-events": {
    summary:
      "Events attach with .on(): $(\"#save\").on(\"click\", handler). Inside the handler, $(this) is the element that fired. Delegation is the superpower: $(\"#list\").on(\"click\", \"li\", handler) catches clicks on li elements ADDED LATER too — direct bindings only cover elements that existed at bind time.",
    points: [
      ".on(\"click\", fn) — and .on(\"submit\"), .on(\"input\")...",
      "$(this) inside a handler = the firing element.",
      "Delegate for dynamic content: parent.on(event, childSelector, fn)."
    ],
    example: code(
      "$(\"#save\").on(\"click\", function () {",
      "  $(this).text(\"Saved!\");",
      "});",
      "",
      "// works for <li> added later too:",
      "$(\"#list\").on(\"click\", \"li\", function () {",
      "  $(this).toggleClass(\"done\");",
      "});"
    )
  },
  "jq1-effects": {
    summary:
      ".show(), .hide(), and .toggle() flip visibility instantly; .fadeIn()/.fadeOut() and .slideDown()/.slideUp() animate it. Durations come as milliseconds or \"slow\"/\"fast\", and an optional callback runs AFTER the animation finishes — the pre-Promise way of sequencing.",
    points: [
      ".hide(), .show(), .toggle() — instant.",
      ".fadeOut(400), .slideDown(\"slow\") — animated.",
      "Completion callbacks: .fadeOut(400, function () { ... })."
    ],
    example: code(
      "$(\"#alert\").fadeIn(300);",
      "$(\"#panel\").slideToggle(\"slow\");",
      "$(\"#toast\").fadeOut(400, function () {",
      "  $(this).remove();",
      "});"
    )
  },
  "jq1-traversal": {
    summary:
      "From any selection you can walk the tree: .parent() and .closest() go up (closest finds the nearest ancestor matching a selector), .find() searches all descendants, .children() only direct ones, .siblings() looks sideways. The everyday pattern: from $(this) in an event handler, traverse to the element you actually need.",
    points: [
      ".closest(\".card\") — nearest matching ancestor (including self).",
      ".find(\"input\") — all matching descendants.",
      ".siblings(), .next(), .prev() — same level."
    ],
    example: code(
      "// remove the card containing the clicked button",
      "$(\".delete\").on(\"click\", function () {",
      "  $(this).closest(\".card\").remove();",
      "});"
    )
  },
  "jq1-ajax": {
    summary:
      "jQuery made AJAX mainstream: $.get(url, callback) fetches, $.getJSON parses JSON, $.post(url, data, callback) sends, and $.ajax({...}) exposes every option including error handling. Requests are asynchronous — the callback runs later, when the response lands. Modern code uses fetch(), but legacy AJAX is everywhere.",
    points: [
      "$.getJSON(\"/api/users\", function (data) { ... }).",
      "$.post(\"/api/save\", { name: \"Aya\" }, callback).",
      "$.ajax({ url, method, success, error }) — the full-control form."
    ],
    example: code(
      "$.getJSON(\"/api/users\", function (users) {",
      "  users.forEach(function (user) {",
      "    $(\"#list\").append($(\"<li>\").text(user.name));",
      "  });",
      "});"
    )
  },
  "jq1-vanilla": {
    summary:
      "Everything jQuery does, modern browsers now do natively: document.querySelector replaces $(), classList replaces addClass, addEventListener replaces .on(), fetch replaces $.ajax. When you maintain legacy code, translating in your head is the skill; when you write new code, you usually do not need jQuery at all.",
    points: [
      "$(\"#x\") → document.querySelector(\"#x\"); $(\".y\") → querySelectorAll.",
      ".addClass(\"a\") → el.classList.add(\"a\"); .on(\"click\") → addEventListener.",
      "$.getJSON(url, cb) → fetch(url).then(r => r.json()).then(cb)."
    ],
    example: code(
      "// jQuery",
      "$(\"#save\").on(\"click\", () => $(\"#msg\").text(\"Saved\"));",
      "",
      "// Vanilla equivalent",
      "document.querySelector(\"#save\").addEventListener(\"click\", () => {",
      "  document.querySelector(\"#msg\").textContent = \"Saved\";",
      "});"
    )
  }
};

export const jquerySet1Questions = [
  ...attach("jq1-what-jquery", [
    mcq("What is jQuery?", ["A JavaScript library simplifying DOM work, events, and AJAX", "A programming language", "A database"], "A JavaScript library simplifying DOM work, events, and AJAX", "It is plain JavaScript underneath — $ is just a function."),
    mcq("What does $ refer to in jQuery code?", ["The jQuery function itself", "A currency formatter", "A CSS rule"], "The jQuery function itself", "$(\"...\") calls jQuery with a selector; jQuery(\"...\") works identically."),
    mcq("What does $(\".card\") return?", ["A jQuery set wrapping ALL elements with class card", "The first card only", "A raw DOM node"], "A jQuery set wrapping ALL elements with class card", "Methods called on the set apply to every match."),
    tf("jQuery methods chain: $(\"#box\").addClass(\"red\").fadeIn() is idiomatic.", true, "Most jQuery methods return the set, enabling chains."),
    mcq("Why was jQuery essential historically?", ["Browsers disagreed wildly; jQuery papered over the differences", "JavaScript could not touch the DOM", "It compiled to machine code"], "Browsers disagreed wildly; jQuery papered over the differences", "Pre-2015 cross-browser code without jQuery was painful."),
    mcq("Why learn jQuery TODAY?", ["A huge share of existing sites and plugins still run it — maintenance work pays", "It is required for React", "Browsers only understand jQuery"], "A huge share of existing sites and plugins still run it — maintenance work pays", "Legacy literacy is the practical motivation."),
    tf("For brand-new projects, plain modern JavaScript usually covers what jQuery offered.", true, "querySelector, classList, fetch, and addEventListener closed the gap."),
    mcq("What kind of thing is a jQuery plugin?", ["An extension adding methods to $, like $(\"#d\").datepicker()", "A browser extension", "A jQuery compiler"], "An extension adding methods to $, like $(\"#d\").datepicker()", "The plugin ecosystem is a big reason jQuery persists."),
    mcq("What happens when a selector matches nothing and you call a method on it?", ["Nothing — silently", "An exception", "The page reloads"], "Nothing — silently", "Empty sets no-op; check .length when an action mysteriously does nothing."),
    fill("Complete the iconic alias.", "jQuery(\"#title\") is the same as __1__(\"#title\")", [{ label: "__1__", answers: ["$"] }], "$ is an alias for the jQuery function.")
  ]),
  ...attach("jq1-loading-ready", [
    mcq("How does jQuery get onto a page?", ["A <script> tag loading it BEFORE your own script", "An import in CSS", "Browsers include it natively"], "A <script> tag loading it BEFORE your own script", "Your code needs $ to exist already — order matters."),
    mcq("What does $(document).ready(fn) do?", ["Runs fn once the DOM is fully parsed", "Waits for all images", "Reloads the document"], "Runs fn once the DOM is fully parsed", "DOM-touching code belongs inside it."),
    fill("Complete the ready shorthand.", "$(__1__() {\n  $(\"#app\").text(\"ready\");\n});", [{ label: "__1__", answers: ["function"] }], "$(function() {...}) is the common shorthand for document ready."),
    mcq("Your selector runs but finds nothing, though the element is in the HTML. Most likely cause?", ["The script ran before the DOM was parsed — wrap it in ready", "jQuery is broken", "The element is too deep"], "The script ran before the DOM was parsed — wrap it in ready", "Premature selection is THE classic jQuery bug."),
    tf("$(function() {...}) and $(document).ready(function() {...}) behave the same.", true, "The short form is just sugar."),
    mcq("What error does your code throw when jQuery failed to load?", ["$ is not defined", "DOM not found", "selector denied"], "$ is not defined", "A ReferenceError on $ means the library script did not load first."),
    mcq("Where do <script> tags commonly go to reduce ready-timing problems?", ["At the end of <body>, after the markup", "Inside <title>", "In the CSS file"], "At the end of <body>, after the markup", "Scripts after the markup see a parsed DOM (ready still recommended)."),
    tf("Code inside ready waits for every image to finish downloading.", false, "ready fires on DOM parse; the load event waits for images."),
    fill("Load the library first.", "<__1__ src=\"jquery.min.js\"></__1__>", [{ label: "__1__", answers: ["script"] }], "jQuery arrives via an ordinary script tag."),
    typed("Write the ready shorthand wrapping a line that sets the text of #status to loaded.", "", "$(function () {\n  $(\"#status\").text(\"loaded\");\n});", ["$(function", "$(\"#status\").text(\"loaded\")"], "Ready wrapper + a text() write — the smallest real jQuery program.")
  ]),
  ...attach("jq1-selectors", [
    mcq("Which selector targets the element with id save?", ["$(\"#save\")", "$(\".save\")", "$(\"save\")"], "$(\"#save\")", "# is id, . is class, bare names are tags — exactly like CSS."),
    mcq("Which selector targets ALL elements with class item?", ["$(\".item\")", "$(\"#item\")", "$(\"item\")"], "$(\".item\")", "The dot prefix selects by class."),
    fill("Select every paragraph.", "$(\"__1__\").hide();", [{ label: "__1__", answers: ["p"] }], "Tag selectors are the bare element name."),
    mcq("What does $(\"ul li\") select?", ["Every li inside any ul", "The first list only", "ul elements next to li"], "Every li inside any ul", "Descendant selectors work exactly as in CSS."),
    mcq("What does $(\"input[type=text]\") select?", ["All text inputs", "All inputs", "The input named text"], "All text inputs", "Attribute selectors refine by attribute values."),
    mcq("How do you check how many elements matched?", ["$(\".card\").length", "$(\".card\").count()", "$(\".card\").size"], "$(\".card\").length", ".length is the standard match-count check while debugging."),
    tf("$(\"#main .title\") finds elements with class title INSIDE #main.", true, "Combining id and class scopes the search."),
    mcq("What does $(\"li:first\") select?", ["The first li in the document", "Every first child", "The last li"], "The first li in the document", "jQuery adds convenience pseudo-selectors like :first and :last."),
    mcq("Which selector grabs BOTH #header and #footer at once?", ["$(\"#header, #footer\")", "$(\"#header + #footer\")", "$(\"#header AND #footer\")"], "$(\"#header, #footer\")", "Commas combine multiple selectors into one set."),
    typed("Write the selector call that hides every element with class banner.", "", "$(\".banner\").hide();", ["$(\".banner\")", ".hide()"], "Class selector then the hide method — the jQuery one-liner shape.")
  ]),
  ...attach("jq1-dom-content", [
    mcq("What does $(\"#title\").text() (no argument) do?", ["Reads the text content of the first match", "Clears the title", "Returns the HTML"], "Reads the text content of the first match", "No argument = read; argument = write."),
    mcq("What does $(\"#title\").text(\"Hi\") do?", ["Sets the text of every matched element to Hi", "Reads Hi from the title", "Appends Hi"], "Sets the text of every matched element to Hi", "Writing applies to ALL matches in the set."),
    mcq("What is the difference between .text() and .html()?", [".html() parses markup; .text() treats everything as plain text", "They are identical", ".text() is faster HTML"], ".html() parses markup; .text() treats everything as plain text", ".html(\"<b>x</b>\") renders bold; .text() would show the tags literally."),
    mcq("Why is $(\"#bio\").html(userInput) dangerous?", ["Untrusted input can inject scripts — an XSS vulnerability", "It is slow", "html() cannot take variables"], "Untrusted input can inject scripts — an XSS vulnerability", "User-provided content belongs in .text(), which neutralizes markup."),
    fill("Read the input's current value.", "const email = $(\"#email\").__1__();", [{ label: "__1__", answers: ["val"] }], ".val() is the form-field accessor."),
    mcq("How do you set an input's value to hello?", ["$(\"#name\").val(\"hello\")", "$(\"#name\").text(\"hello\")", "$(\"#name\").value = \"hello\""], "$(\"#name\").val(\"hello\")", "Form fields use .val() for both directions."),
    fill("Point the link at a new URL.", "$(\"#link\").__1__(\"href\", \"https://example.com\");", [{ label: "__1__", answers: ["attr"] }], ".attr(name, value) writes attributes."),
    mcq("What does $(\"#list\").append(\"<li>New</li>\") do?", ["Adds the item at the END of the list", "Replaces the list", "Adds it before the list"], "Adds the item at the END of the list", "append inserts inside, at the end; prepend inserts at the start."),
    mcq("What does $(\"#old-banner\").remove() do?", ["Deletes the element from the page entirely", "Hides it", "Empties its text"], "Deletes the element from the page entirely", ".remove() detaches it from the DOM; .hide() merely makes it invisible."),
    typed("Write the line that sets the text of the element with id greeting to Welcome back.", "", "$(\"#greeting\").text(\"Welcome back\");", ["$(\"#greeting\")", ".text(\"Welcome back\")"], "Select by id, write with .text().")
  ]),
  ...attach("jq1-classes-css", [
    mcq("What does $(\"#menu\").addClass(\"open\") do?", ["Adds the open class without touching existing classes", "Replaces all classes with open", "Creates a CSS rule"], "Adds the open class without touching existing classes", "addClass appends; the element keeps its other classes."),
    fill("Remove the class.", "$(\"#menu\").__1__(\"open\");", [{ label: "__1__", answers: ["removeClass"] }], "removeClass deletes just that class."),
    mcq("What does .toggleClass(\"dark\") do?", ["Adds the class if absent, removes it if present", "Always adds it", "Inverts all classes"], "Adds the class if absent, removes it if present", "Perfect for open/close and theme switches."),
    mcq("What does $(\"#panel\").hasClass(\"visible\") return?", ["true or false", "The class list", "The panel"], "true or false", "hasClass is the boolean check for conditional logic."),
    mcq("What does $(\"#box\").css(\"color\", \"red\") do?", ["Sets an inline style color:red on the element", "Edits the stylesheet", "Adds a class named red"], "Sets an inline style color:red on the element", "css() writes style attributes directly."),
    mcq("Why are classes usually better than .css() calls?", ["Styling stays in stylesheets; JS only flips state", "css() does not work on divs", "Classes load faster from CDN"], "Styling stays in stylesheets; JS only flips state", "addClass(\"error\") beats hardcoding five css() calls."),
    tf("$(\"#box\").css(\"width\") with one argument READS the computed width.", true, "One argument reads, two arguments (or an object) write."),
    fill("Toggle dark mode on the body.", "$(\"body\").__1__(\"dark-mode\");", [{ label: "__1__", answers: ["toggleClass"] }], "toggleClass flips the class each call."),
    mcq("How do you set several styles at once?", ["$(\"#b\").css({ color: \"red\", fontSize: \"18px\" })", "$(\"#b\").css(\"color red fontSize 18\")", "Multiple .style() calls only"], "$(\"#b\").css({ color: \"red\", fontSize: \"18px\" })", "css() accepts an object of property-value pairs."),
    typed("Write the line that adds the class active to every element with class tab.", "", "$(\".tab\").addClass(\"active\");", ["$(\".tab\")", ".addClass(\"active\")"], "Set selection + addClass applies to all matches at once.")
  ]),
  ...attach("jq1-events", [
    mcq("How do you run code when #save is clicked?", ["$(\"#save\").on(\"click\", function () { ... })", "$(\"#save\").click = function", "onClick(\"#save\")"], "$(\"#save\").on(\"click\", function () { ... })", ".on(eventName, handler) is the standard binding."),
    mcq("Inside a handler, what is $(this)?", ["The element that fired the event, wrapped in jQuery", "The document", "The event object"], "The element that fired the event, wrapped in jQuery", "$(this) lets you act on the clicked element."),
    fill("Bind the submit handler.", "$(\"#form\").__1__(\"submit\", function (e) {\n  e.preventDefault();\n});", [{ label: "__1__", answers: ["on"] }], ".on() attaches any event type."),
    mcq("What does e.preventDefault() do in a submit handler?", ["Stops the browser's default page-reloading submit", "Deletes the form", "Submits twice"], "Stops the browser's default page-reloading submit", "Required for AJAX form handling."),
    mcq("What is event delegation in $(\"#list\").on(\"click\", \"li\", fn)?", ["The parent listens and fires fn for clicks on li children — even ones added later", "li elements get individual copies of fn", "Clicks are sent to the server"], "The parent listens and fires fn for clicks on li children — even ones added later", "Delegation is the fix for dynamic content."),
    mcq("You append new list items, but their click handlers never fire. Why?", ["Handlers were bound directly to elements that existed earlier — delegate instead", "jQuery limits handler counts", "New elements are read-only"], "Handlers were bound directly to elements that existed earlier — delegate instead", "Direct binding covers only the elements present at bind time."),
    tf("$(\"#btn\").click(fn) is an older shorthand for .on(\"click\", fn).", true, "The shorthands exist; .on() is the modern, delegation-capable form."),
    mcq("Which event fires on every keystroke in a text input?", ["input", "submit", "load"], "input", ".on(\"input\", fn) tracks typing; change fires on blur."),
    fill("Use the firing element.", "$(\".delete\").on(\"click\", function () {\n  $(__1__).hide();\n});", [{ label: "__1__", answers: ["this"] }], "$(this) wraps the clicked delete button."),
    typed("Bind a click handler to #counter-btn that adds the class clicked to it (use $(this)).", "", "$(\"#counter-btn\").on(\"click\", function () {\n  $(this).addClass(\"clicked\");\n});", ["on(\"click\"", "$(this).addClass(\"clicked\")"], "Bind with .on, act through $(this).")
  ]),
  ...attach("jq1-effects", [
    mcq("What does $(\"#alert\").hide() do?", ["Makes the element invisible instantly (display: none)", "Deletes it", "Fades it out slowly"], "Makes the element invisible instantly (display: none)", "hide/show are instant; the fade/slide family animates."),
    mcq("What does .toggle() do?", ["Shows the element if hidden, hides it if visible", "Rotates it", "Toggles its classes"], "Shows the element if hidden, hides it if visible", "One method for both directions."),
    fill("Fade the message in over 300ms.", "$(\"#message\").__1__(300);", [{ label: "__1__", answers: ["fadeIn"] }], "fadeIn animates opacity from invisible to visible."),
    mcq("What does $(\"#panel\").slideUp() do?", ["Collapses the element upward until hidden", "Moves it up the page", "Scrolls the page"], "Collapses the element upward until hidden", "slideUp/slideDown animate height — the accordion duo."),
    mcq("What are valid duration arguments?", ["Milliseconds like 400, or \"slow\" / \"fast\"", "Only seconds", "CSS strings like 2em"], "Milliseconds like 400, or \"slow\" / \"fast\"", "400 is the default duration."),
    mcq("When does the callback in .fadeOut(400, fn) run?", ["After the fade finishes", "Before it starts", "Every frame"], "After the fade finishes", "Completion callbacks sequence animations and cleanup."),
    mcq("How do you remove a toast AFTER it fades out?", ["$(\"#toast\").fadeOut(400, function () { $(this).remove(); })", "$(\"#toast\").remove().fadeOut()", "$(\"#toast\").fadeOut().remove()"], "$(\"#toast\").fadeOut(400, function () { $(this).remove(); })", "Removing inside the callback waits for the animation; chaining remove() would yank it instantly."),
    tf("slideToggle() alternates between slideUp and slideDown.", true, "One call per click makes collapsible sections trivial."),
    fill("Collapse the section with an animation.", "$(\"#details\").__1__(\"slow\");", [{ label: "__1__", answers: ["slideUp"] }], "slideUp animates the element closed."),
    typed("Write the line that fades out the element with id banner over 500 milliseconds.", "", "$(\"#banner\").fadeOut(500);", ["$(\"#banner\")", ".fadeOut(500)"], "fadeOut with a millisecond duration.")
  ]),
  ...attach("jq1-traversal", [
    mcq("What does .parent() return?", ["The direct parent of each matched element", "All ancestors", "The document root"], "The direct parent of each matched element", "One level up; .parents() climbs the whole chain."),
    mcq("What does .closest(\".card\") do?", ["Finds the NEAREST ancestor (or self) matching .card", "Finds the nearest sibling", "Finds the closest by distance on screen"], "Finds the NEAREST ancestor (or self) matching .card", "closest climbs until the selector matches — the event-handler workhorse."),
    fill("Search inside the form.", "$(\"#form\").__1__(\"input\");", [{ label: "__1__", answers: ["find"] }], ".find() searches ALL descendants of the selection."),
    mcq("What is the difference between .children() and .find()?", [".children() is direct children only; .find() searches all depths", "They are identical", ".find() only finds one element"], ".children() is direct children only; .find() searches all depths", "Depth is the distinction."),
    mcq("What does $(\"#item-3\").siblings() return?", ["All elements sharing item-3's parent, excluding itself", "Its children", "Its parents"], "All elements sharing item-3's parent, excluding itself", "Sideways selection at the same level."),
    mcq("In a delete-button handler, how do you remove the whole surrounding card?", ["$(this).closest(\".card\").remove()", "$(this).parent().parent().parent().remove()", "$(\".card\").remove()"], "$(this).closest(\".card\").remove()", "closest is robust to markup changes; chained .parent() calls are brittle; $(\".card\") would nuke every card."),
    tf(".next() and .prev() select the immediately adjacent siblings.", true, "Handy for steppers and adjacent labels."),
    mcq("What does $(\"li\").first() return?", ["A set holding just the first matched li", "The first child of each li", "The li's first text node"], "A set holding just the first matched li", ".first()/.last()/.eq(n) pick from a matched set."),
    fill("Climb to the enclosing row.", "$(this).__1__(\"tr\").addClass(\"selected\");", [{ label: "__1__", answers: ["closest"] }], "closest(\"tr\") finds the table row containing the clicked element."),
    mcq("Why is .closest() preferred over chains of .parent()?", ["It survives markup restructuring by matching a selector, not a depth", "It is the only one that works on divs", "parent() is deprecated"], "It survives markup restructuring by matching a selector, not a depth", "Selector-based climbing is refactor-proof.")
  ]),
  ...attach("jq1-ajax", [
    mcq("What does AJAX let a page do?", ["Exchange data with a server without reloading the page", "Style elements faster", "Store files locally"], "Exchange data with a server without reloading the page", "Asynchronous requests power dynamic UIs."),
    mcq("What does $.getJSON(\"/api/users\", fn) do?", ["GETs the URL, parses JSON, passes the data to fn", "Downloads a file to disk", "Renders users automatically"], "GETs the URL, parses JSON, passes the data to fn", "The callback receives parsed data when the response arrives."),
    fill("Send form data to the server.", "$.__1__(\"/api/save\", { name: \"Aya\" }, function (res) {\n  console.log(res);\n});", [{ label: "__1__", answers: ["post"] }], "$.post sends a POST request with data."),
    mcq("Why does code right AFTER $.get(...) not see the response yet?", ["The request is asynchronous — the callback runs later", "jQuery caches responses", "The server is slow by spec"], "The request is asynchronous — the callback runs later", "Response-dependent code belongs INSIDE the callback."),
    mcq("Which form exposes error handling?", ["$.ajax({ url, success, error })", "$.get with a second URL", "$.try()"], "$.ajax({ url, success, error })", "$.ajax is the full-options API; shorthand helpers wrap it."),
    mcq("What does the error callback receive a chance to do?", ["Show a failure message instead of leaving the UI silent", "Retry automatically forever", "Fix the server"], "Show a failure message instead of leaving the UI silent", "Silent AJAX failures are a legacy-code epidemic — always handle errors."),
    tf("$.ajax can set the HTTP method, headers, and body.", true, "method: \"PUT\", headers, data — full control lives there."),
    mcq("What is the modern native replacement for $.ajax?", ["fetch()", "XMLHttpRequest2", "$.modern()"], "fetch()", "fetch with promises (and async/await) replaced jQuery AJAX."),
    mcq("What does this code do?", ["Fetches users and appends an li per user name", "Posts the list to the server", "Replaces the list with JSON text"], "Fetches users and appends an li per user name", "GET, parse, loop, append — the classic AJAX render loop.", code("$.getJSON(\"/api/users\", function (users) {", "  users.forEach(function (u) {", "    $(\"#list\").append($(\"<li>\").text(u.name));", "  });", "});")),
    typed("Write a $.getJSON call to /api/items whose callback logs the data with console.log.", "", "$.getJSON(\"/api/items\", function (data) {\n  console.log(data);\n});", ["$.getJSON(\"/api/items\"", "console.log(data)"], "URL first, callback receiving the parsed data second.")
  ]),
  ...attach("jq1-vanilla", [
    mcq("What is the vanilla equivalent of $(\"#title\")?", ["document.querySelector(\"#title\")", "document.find(\"#title\")", "window.$(\"#title\")"], "document.querySelector(\"#title\")", "querySelector takes the same CSS selectors."),
    mcq("What replaces $(\".item\") for multiple elements?", ["document.querySelectorAll(\".item\")", "document.querySelector(\".item\")", "document.all(\".item\")"], "document.querySelectorAll(\".item\")", "querySelectorAll returns a NodeList of all matches."),
    mcq("What is the vanilla version of .addClass(\"active\")?", ["el.classList.add(\"active\")", "el.class = \"active\"", "el.css(\"active\")"], "el.classList.add(\"active\")", "classList has add, remove, toggle, contains — the full jQuery class API."),
    fill("Translate the event binding.", "el.__1__(\"click\", handler);", [{ label: "__1__", answers: ["addEventListener"] }], "addEventListener is the native .on()."),
    mcq("What replaces $(\"#name\").val()?", ["document.querySelector(\"#name\").value", ".text()", "getValue(\"#name\")"], "document.querySelector(\"#name\").value", "The value property is the native form accessor."),
    mcq("What replaces .text(\"Hi\")?", ["el.textContent = \"Hi\"", "el.text = \"Hi\"", "el.innerText.set(\"Hi\")"], "el.textContent = \"Hi\"", "textContent is the safe plain-text property (innerHTML parses markup)."),
    mcq("What is the modern replacement for $.getJSON(url, cb)?", ["fetch(url).then(r => r.json()).then(cb)", "download(url, cb)", "$.fetch(url)"], "fetch(url).then(r => r.json()).then(cb)", "fetch + promises is the native AJAX."),
    tf("querySelectorAll results need a loop (or forEach) — methods do not auto-apply to all matches like jQuery sets.", true, "The implicit-iteration convenience is the main thing you give up."),
    mcq("A page's ONLY jQuery usage is one querySelector-style lookup and a click handler. What is the reasonable migration?", ["Replace with querySelector + addEventListener and drop the 30KB library", "Keep jQuery for safety", "Rewrite the page in React first"], "Replace with querySelector + addEventListener and drop the 30KB library", "Tiny usage = easy win; heavy plugin usage = migrate carefully or keep it."),
    typed("Translate $(\"#save\").on(\"click\", fn) to vanilla JS (use document.querySelector and addEventListener, handler name fn).", "", "document.querySelector(\"#save\").addEventListener(\"click\", fn);", ["document.querySelector(\"#save\")", "addEventListener(\"click\", fn)"], "Selector translates directly; .on becomes addEventListener.")
  ])
];
