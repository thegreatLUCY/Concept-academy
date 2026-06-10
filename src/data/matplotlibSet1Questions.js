const code = (...lines) => lines.join("\n");
const setId = "matplotlib-set1";

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

export const matplotlibSet1Modules = [
  { id: "mpl1-pyplot-figures", setId, title: "pyplot, Figures, and Axes" },
  { id: "mpl1-line-plots", setId, title: "Line Plots" },
  { id: "mpl1-labels-titles", setId, title: "Labels, Titles, and Legends" },
  { id: "mpl1-styling", setId, title: "Styling Lines and Markers" },
  { id: "mpl1-scatter", setId, title: "Scatter Plots" },
  { id: "mpl1-bars", setId, title: "Bar Charts" },
  { id: "mpl1-histograms", setId, title: "Histograms" },
  { id: "mpl1-subplots", setId, title: "Subplots" },
  { id: "mpl1-saving", setId, title: "Saving Figures" },
  { id: "mpl1-reading-charts", setId, title: "Reading and Choosing Charts" }
];

export const matplotlibSet1Lessons = {
  "mpl1-pyplot-figures": {
    summary:
      "Matplotlib is Python's foundational plotting library. You use it through pyplot, imported as plt by convention. A chart lives in a Figure (the whole canvas) containing one or more Axes (an individual plot with its x and y axis). The quick path is plt.plot(...) then plt.show(); the professional path creates them explicitly: fig, ax = plt.subplots().",
    points: [
      "import matplotlib.pyplot as plt — the standard import.",
      "Figure = the canvas; Axes = one plot on it (not the axis lines!).",
      "fig, ax = plt.subplots() then ax.plot(...) — the recommended pattern."
    ],
    example: code(
      "import matplotlib.pyplot as plt",
      "",
      "fig, ax = plt.subplots()",
      "ax.plot([1, 2, 3], [2, 4, 8])",
      "plt.show()"
    )
  },
  "mpl1-line-plots": {
    summary:
      "plt.plot(x, y) draws a line connecting your points in order — the chart for anything changing over time or a continuous range. Pass one list and matplotlib uses indexes 0,1,2... for x. Call plot multiple times before show() and the lines share the same axes — instant comparison charts. Nothing appears until plt.show().",
    points: [
      "plt.plot(x, y) — pairs (x[i], y[i]) joined by line segments.",
      "Two plot calls = two lines on one chart.",
      "plt.show() renders; forgetting it = blank nothing in scripts."
    ],
    example: code(
      "import matplotlib.pyplot as plt",
      "",
      "months = [1, 2, 3, 4]",
      "sales = [10, 14, 9, 20]",
      "plt.plot(months, sales)",
      "plt.show()"
    )
  },
  "mpl1-labels-titles": {
    summary:
      "An unlabeled chart is a riddle. plt.title() names the chart, plt.xlabel() and plt.ylabel() name the axes. When several lines share a chart, give each plot(...) a label= and call plt.legend() to display the key. These four calls turn a line into a communication.",
    points: [
      "plt.title(\"Monthly Sales\"), plt.xlabel(\"Month\"), plt.ylabel(\"Units\").",
      "plt.plot(x, y, label=\"2025\") + plt.legend() — named lines.",
      "Every shared chart needs title and axis labels. No exceptions."
    ],
    example: code(
      "import matplotlib.pyplot as plt",
      "",
      "plt.plot([1, 2, 3], [10, 14, 9], label=\"2024\")",
      "plt.plot([1, 2, 3], [12, 16, 15], label=\"2025\")",
      "plt.title(\"Monthly Sales\")",
      "plt.xlabel(\"Month\")",
      "plt.ylabel(\"Units\")",
      "plt.legend()",
      "plt.show()"
    )
  },
  "mpl1-styling": {
    summary:
      "plot() accepts styling keywords: color= sets the line color, linestyle= the pattern (\"-\" solid, \"--\" dashed, \":\" dotted), marker= dots at each data point (\"o\" circles, \"s\" squares), and linewidth= thickness. The compact format string bundles them: plt.plot(x, y, \"ro--\") means red circles, dashed.",
    points: [
      "color=\"green\", linestyle=\"--\", marker=\"o\", linewidth=2.",
      "Format shorthand: \"g--\" green dashed; \"ro\" red circle markers.",
      "Style distinguishes lines — vital when color printing is not guaranteed."
    ],
    example: code(
      "import matplotlib.pyplot as plt",
      "",
      "x = [1, 2, 3, 4]",
      "plt.plot(x, [1, 4, 9, 16], color=\"green\", linestyle=\"--\", marker=\"o\")",
      "plt.plot(x, [2, 5, 8, 11], \"r:\")",
      "plt.show()"
    )
  },
  "mpl1-scatter": {
    summary:
      "plt.scatter(x, y) draws unconnected points — the chart for relationships between two variables: does study time correlate with scores? Each point is one observation. s= sizes points and c= colors them, so a third variable can ride along. If your x values have no meaningful order, scatter beats a line every time.",
    points: [
      "plt.scatter(hours, scores) — one dot per observation.",
      "s= point size, c= color, alpha= transparency for dense data.",
      "Look for the trend: upward drift = positive correlation."
    ],
    example: code(
      "import matplotlib.pyplot as plt",
      "",
      "hours = [1, 2, 3, 4, 5]",
      "scores = [55, 62, 71, 76, 88]",
      "plt.scatter(hours, scores)",
      "plt.xlabel(\"Hours studied\")",
      "plt.ylabel(\"Score\")",
      "plt.show()"
    )
  },
  "mpl1-bars": {
    summary:
      "plt.bar(categories, values) compares amounts across categories — sales per region, users per plan. Categories belong on bars, not lines: a line implies continuity that categories do not have. plt.barh() flips horizontal (long labels read better), and bar colors highlight specific categories.",
    points: [
      "plt.bar([\"A\", \"B\"], [10, 14]) — one bar per category.",
      "barh for horizontal bars when labels are long.",
      "Lines imply order/continuity; categories get bars."
    ],
    example: code(
      "import matplotlib.pyplot as plt",
      "",
      "cities = [\"Cairo\", \"Lagos\", \"Nairobi\"]",
      "sales = [120, 95, 70]",
      "plt.bar(cities, sales)",
      "plt.title(\"Sales by city\")",
      "plt.show()"
    )
  },
  "mpl1-histograms": {
    summary:
      "plt.hist(values) shows a DISTRIBUTION: it slices the value range into bins and draws how many values land in each. One variable in, shape out — where data clusters, how it spreads, whether it skews. bins= controls the resolution: too few hides structure, too many shows noise. Histograms are not bar charts: bars compare categories, histograms bin one numeric variable.",
    points: [
      "plt.hist(ages, bins=10) — frequencies per value range.",
      "Histogram = one numeric variable's shape; bar chart = categories.",
      "Try a few bin counts before trusting the picture."
    ],
    example: code(
      "import matplotlib.pyplot as plt",
      "",
      "ages = [22, 25, 25, 26, 29, 31, 32, 32, 33, 38, 41, 55]",
      "plt.hist(ages, bins=5)",
      "plt.xlabel(\"Age\")",
      "plt.ylabel(\"Count\")",
      "plt.show()"
    )
  },
  "mpl1-subplots": {
    summary:
      "plt.subplots(rows, cols) creates a grid of plots in one figure: fig, axes = plt.subplots(1, 2) gives two side-by-side axes. Each axes object draws independently with ax.plot(), ax.set_title(), etc. fig.tight_layout() stops labels from overlapping. Subplots beat separate figures when the reader should compare panels.",
    points: [
      "fig, axes = plt.subplots(1, 2) — axes[0], axes[1].",
      "Per-axes API: ax.plot, ax.set_title, ax.set_xlabel.",
      "fig.tight_layout() fixes overlapping labels."
    ],
    example: code(
      "import matplotlib.pyplot as plt",
      "",
      "fig, axes = plt.subplots(1, 2)",
      "axes[0].plot([1, 2, 3], [1, 4, 9])",
      "axes[0].set_title(\"Squares\")",
      "axes[1].bar([\"A\", \"B\"], [3, 7])",
      "axes[1].set_title(\"Counts\")",
      "fig.tight_layout()",
      "plt.show()"
    )
  },
  "mpl1-saving": {
    summary:
      "plt.savefig(\"chart.png\") writes the current figure to disk — PNG for screens/docs, SVG or PDF for crisp vector output. dpi=200 sharpens raster images; bbox_inches=\"tight\" trims wasted margins. Save BEFORE show(): in scripts, show() can clear the figure, leaving savefig a blank canvas.",
    points: [
      "plt.savefig(\"chart.png\", dpi=200, bbox_inches=\"tight\").",
      "PNG = pixels; SVG/PDF = vectors that scale cleanly.",
      "Call savefig BEFORE show() in scripts."
    ],
    example: code(
      "import matplotlib.pyplot as plt",
      "",
      "plt.plot([1, 2, 3], [2, 4, 8])",
      "plt.title(\"Growth\")",
      "plt.savefig(\"growth.png\", dpi=200, bbox_inches=\"tight\")",
      "plt.show()"
    )
  },
  "mpl1-reading-charts": {
    summary:
      "Chart choice is a vocabulary: line for change over time, bar for category comparison, histogram for one variable's distribution, scatter for the relationship between two. Reading charts critically matters as much as making them: check the axes (does y start at zero?), the bins, and the labels before trusting any conclusion.",
    points: [
      "Time → line. Categories → bar. Distribution → histogram. Relationship → scatter.",
      "A y-axis that starts above zero visually exaggerates differences.",
      "No labels, no trust — demand titles and units, including from yourself."
    ],
    example: code(
      "# The decision in four lines:",
      "# trend over time?      plt.plot(dates, values)",
      "# compare categories?   plt.bar(names, values)",
      "# one variable's shape? plt.hist(values, bins=10)",
      "# two variables linked? plt.scatter(x, y)"
    )
  }
};

export const matplotlibSet1Questions = [
  ...attach("mpl1-pyplot-figures", [
    fill("Complete the standard import.", "import matplotlib.pyplot as __1__", [{ label: "__1__", answers: ["plt"] }], "plt is the universal alias for pyplot."),
    mcq("What is a Figure in matplotlib?", ["The whole canvas that holds one or more plots", "A single data point", "The x-axis"], "The whole canvas that holds one or more plots", "Figures contain Axes; Axes contain the actual chart."),
    mcq("What is an Axes object?", ["One individual plot, with its own x and y axis", "Just the axis lines", "A 3D camera"], "One individual plot, with its own x and y axis", "Confusingly named: an Axes is a PLOT, not a line."),
    mcq("What does fig, ax = plt.subplots() give you?", ["A new figure and one axes to draw on", "Two figures", "A saved file"], "A new figure and one axes to draw on", "The recommended explicit starting point for real charts."),
    mcq("What does plt.show() do?", ["Renders the figure in a window or notebook cell", "Saves the figure", "Clears the data"], "Renders the figure in a window or notebook cell", "In scripts, nothing appears without it."),
    tf("In Jupyter notebooks, charts often render without an explicit plt.show().", true, "Notebooks display figures automatically; scripts need show()."),
    mcq("Which is the object-oriented way to plot?", ["ax.plot([1, 2], [3, 4])", "plt.figure.plot()", "matplotlib.draw()"], "ax.plot([1, 2], [3, 4])", "Once you hold an axes, draw on IT — clearer with multiple plots."),
    tf("Matplotlib must be installed separately (pip install matplotlib).", true, "It is third-party, like NumPy and pandas."),
    mcq("Pandas' df.plot() uses what under the hood?", ["Matplotlib", "A browser canvas", "Excel"], "Matplotlib", "Learning matplotlib explains every chart pandas makes."),
    mcq("One Figure with FOUR mini-charts contains how many Axes?", ["Four", "One", "Eight"], "Four", "One Axes per subplot — the figure is just the container.")
  ]),
  ...attach("mpl1-line-plots", [
    mcq("What does plt.plot(x, y) draw?", ["A line connecting the (x, y) points in order", "Unconnected dots", "Bars"], "A line connecting the (x, y) points in order", "plot is the line chart function."),
    mcq("What does plt.plot([10, 20, 15]) (one list) use for x?", ["The indexes 0, 1, 2", "Random values", "It errors"], "The indexes 0, 1, 2", "A single list is treated as y with implicit x."),
    mcq("How do you get TWO lines on one chart?", ["Call plt.plot twice before plt.show()", "Open two windows", "You cannot"], "Call plt.plot twice before plt.show()", "Successive plot calls layer onto the same axes."),
    fill("Draw the line.", "plt.__1__(months, sales)\nplt.show()", [{ label: "__1__", answers: ["plot"] }], "plot connects the series in order."),
    mcq("You ran a script with plot() but no window appeared. Why?", ["plt.show() is missing", "The data is too small", "Lines need color"], "plt.show() is missing", "Scripts render only on show()."),
    tf("Line charts suit data with a meaningful order, like time.", true, "The connecting line IMPLIES continuity between points."),
    mcq("x and y must...", ["have the same length", "both start at zero", "be sorted"], "have the same length", "Each x pairs with one y; mismatched lengths raise an error."),
    mcq("What does this draw?", ["One line of squares: (1,1), (2,4), (3,9)", "Three separate lines", "A parabola error"], "One line of squares: (1,1), (2,4), (3,9)", "Each x[i] pairs with y[i].", code("import matplotlib.pyplot as plt", "plt.plot([1, 2, 3], [1, 4, 9])", "plt.show()")),
    mcq("Plotting unsorted x values produces...", ["A zigzag — plot connects points in the GIVEN order", "An automatic sort", "An error"], "A zigzag — plot connects points in the GIVEN order", "Sort by x first when drawing trends."),
    typed("Plot days [1, 2, 3] against visitors [120, 150, 90] and show the chart.", "import matplotlib.pyplot as plt", "plt.plot([1, 2, 3], [120, 150, 90])\nplt.show()", ["plt.plot([1, 2, 3], [120, 150, 90])", "plt.show()"], "x list, y list, then render.")
  ]),
  ...attach("mpl1-labels-titles", [
    mcq("Which call sets the chart's title?", ["plt.title(\"Sales\")", "plt.name(\"Sales\")", "plt.header(\"Sales\")"], "plt.title(\"Sales\")", "title labels the whole chart."),
    fill("Label the horizontal axis.", "plt.__1__(\"Month\")", [{ label: "__1__", answers: ["xlabel"] }], "xlabel/ylabel name the axes — include units!"),
    fill("Label the vertical axis.", "plt.__1__(\"Revenue (USD)\")", [{ label: "__1__", answers: ["ylabel"] }], "Units in labels prevent misreading by 1000x."),
    mcq("How does a legend know each line's name?", ["From the label= argument in each plot() call", "It reads variable names", "From the title"], "From the label= argument in each plot() call", "label= per line, then plt.legend() to display them."),
    mcq("You passed label= but no legend appears. Why?", ["plt.legend() was never called", "Labels are broken", "Legends need 3+ lines"], "plt.legend() was never called", "The legend renders only when requested."),
    fill("Show the legend.", "plt.plot(x, y, label=\"2025\")\nplt.__1__()", [{ label: "__1__", answers: ["legend"] }], "legend() displays the collected labels."),
    tf("In the object-oriented API, the equivalents are ax.set_title and ax.set_xlabel.", true, "The set_ prefix is the axes-method spelling."),
    mcq("Why do axis labels matter so much?", ["Without them, readers cannot know what the numbers mean", "They make charts colorful", "Matplotlib requires them"], "Without them, readers cannot know what the numbers mean", "A chart is communication; labels are its grammar."),
    mcq("What does plt.grid(True) add?", ["Background grid lines for easier value reading", "A table", "Borders"], "Background grid lines for easier value reading", "Light grids help readers trace values to the axes."),
    typed("Plot x=[1,2,3], y=[10,20,15], set the title Sales, label the x-axis Month, and show it.", "import matplotlib.pyplot as plt", "plt.plot([1, 2, 3], [10, 20, 15])\nplt.title(\"Sales\")\nplt.xlabel(\"Month\")\nplt.show()", ["plt.title(\"Sales\")", "plt.xlabel(\"Month\")", "plt.show()"], "Plot, label, show — the minimum responsible chart.")
  ]),
  ...attach("mpl1-styling", [
    mcq("How do you make a line green?", ["plt.plot(x, y, color=\"green\")", "plt.green(x, y)", "plt.style = \"green\""], "plt.plot(x, y, color=\"green\")", "color= names or hex codes the line."),
    fill("Make the line dashed.", "plt.plot(x, y, __1__=\"--\")", [{ label: "__1__", answers: ["linestyle"] }], "\"-\" solid, \"--\" dashed, \":\" dotted, \"-.\" dash-dot."),
    mcq("What does marker=\"o\" add?", ["A circle at every data point", "Zeros on the axis", "A watermark"], "A circle at every data point", "Markers reveal WHERE the actual data sits on the line."),
    mcq("What does the format string \"ro--\" mean?", ["Red, circle markers, dashed line", "Rotate 90 degrees", "Random orange"], "Red, circle markers, dashed line", "Color letter + marker symbol + line pattern, bundled."),
    mcq("What does linewidth=3 control?", ["The line's thickness", "The number of lines", "The axis width"], "The line's thickness", "Thicker lines carry emphasis in presentations."),
    tf("Styling helps distinguish lines even when color is unavailable (grayscale printing, color blindness).", true, "Combine linestyle and markers with color, not instead of it."),
    mcq("What does alpha=0.5 do?", ["Makes the drawing 50% transparent", "Halves the data", "Rotates labels"], "Makes the drawing 50% transparent", "Transparency keeps dense, overlapping plots readable."),
    fill("Add square markers.", "plt.plot(x, y, marker=\"__1__\")", [{ label: "__1__", answers: ["s"] }], "\"s\" = square, \"o\" = circle, \"^\" = triangle."),
    mcq("Two lines on one chart for print — best practice?", ["Different linestyles AND labels, e.g. solid vs dashed with a legend", "Two shades of similar blue", "Make one invisible"], "Different linestyles AND labels, e.g. solid vs dashed with a legend", "Style difference + legend survives any medium."),
    typed("Plot x=[1,2,3], y=[2,4,8] as a red dashed line with circle markers (use color, linestyle, marker), then show it.", "import matplotlib.pyplot as plt", "plt.plot([1, 2, 3], [2, 4, 8], color=\"red\", linestyle=\"--\", marker=\"o\")\nplt.show()", ["color=\"red\"", "linestyle=\"--\"", "marker=\"o\""], "Keyword styling reads clearly — the format-string \"ro--\" is the shorthand.")
  ]),
  ...attach("mpl1-scatter", [
    mcq("What does plt.scatter(x, y) draw?", ["Unconnected points, one per observation", "A connected line", "Bars"], "Unconnected points, one per observation", "Scatter shows individual data points and their relationship."),
    mcq("When is scatter the RIGHT chart?", ["Exploring how two variables relate (hours vs scores)", "Showing change over time", "Comparing categories"], "Exploring how two variables relate (hours vs scores)", "Relationships and correlations are scatter territory."),
    mcq("Each point in a scatter plot represents...", ["One observation (one row of data)", "An average", "A category"], "One observation (one row of data)", "Point = record: one student, one house, one measurement."),
    fill("Draw the relationship.", "plt.__1__(hours, scores)", [{ label: "__1__", answers: ["scatter"] }], "scatter for dots, plot for lines."),
    mcq("Points drifting up-right indicate...", ["Positive correlation", "Negative correlation", "No relationship"], "Positive correlation", "Higher x with higher y = positive association."),
    mcq("What does s=100 do in scatter?", ["Sets the point size", "Limits to 100 points", "Sets the speed"], "Sets the point size", "s can also be an array — sizing by a third variable."),
    mcq("What does c=colors enable?", ["Coloring each point, e.g. by group", "Counting points", "Centering the plot"], "Coloring each point, e.g. by group", "A third dimension via color — clusters become visible."),
    tf("alpha (transparency) helps when many scatter points overlap.", true, "Dense clouds become readable as darker regions."),
    mcq("Why would a LINE plot of (hours, scores) for 30 students mislead?", ["Connecting unrelated students implies a sequence that does not exist", "Lines cannot show 30 points", "Scores are too high"], "Connecting unrelated students implies a sequence that does not exist", "No order between observations → no connecting line."),
    typed("Scatter-plot hours [1,2,3,4] against scores [50,60,72,85] and show it.", "import matplotlib.pyplot as plt", "plt.scatter([1, 2, 3, 4], [50, 60, 72, 85])\nplt.show()", ["plt.scatter([1, 2, 3, 4], [50, 60, 72, 85])", "plt.show()"], "Four observations, visibly rising — a positive relationship.")
  ]),
  ...attach("mpl1-bars", [
    mcq("What does plt.bar(cities, sales) draw?", ["One bar per city, height = its sales", "A line through cities", "A pie chart"], "One bar per city, height = its sales", "Bars compare amounts across categories."),
    mcq("When are bars the right choice over lines?", ["Categorical comparisons with no inherent order", "Trends over time", "Distributions"], "Categorical comparisons with no inherent order", "Categories get bars; time gets lines."),
    fill("Draw the comparison.", "plt.__1__(plans, users)", [{ label: "__1__", answers: ["bar"] }], "bar(categories, values)."),
    mcq("What does plt.barh() draw?", ["Horizontal bars", "Higher bars", "A histogram"], "Horizontal bars", "Horizontal orientation gives long category labels room to breathe."),
    mcq("When do horizontal bars beat vertical ones?", ["When category names are long", "When values are negative", "Never"], "When category names are long", "Names read naturally instead of rotating 90 degrees."),
    mcq("How do you highlight one bar?", ["Pass a color list: color=[\"gray\", \"gray\", \"red\"]", "Draw it twice", "Increase its width only"], "Pass a color list: color=[\"gray\", \"gray\", \"red\"]", "Per-bar colors direct the reader's eye."),
    tf("Sorting bars by value usually makes comparison easier than alphabetical order.", true, "Ranked bars answer 'who leads?' instantly."),
    mcq("What does this draw?", ["Three bars: A=3, B=7, C=5", "A line through 3 points", "One bar of height 15"], "Three bars: A=3, B=7, C=5", "Each category gets its own bar.", code("import matplotlib.pyplot as plt", "plt.bar([\"A\", \"B\", \"C\"], [3, 7, 5])", "plt.show()")),
    mcq("A bar chart's y-axis starting at 50 instead of 0...", ["Visually exaggerates the differences between bars", "Is always clearer", "Changes the data"], "Visually exaggerates the differences between bars", "Bar AREA encodes the value — truncated axes distort it."),
    typed("Draw a bar chart of teams [\"Red\", \"Blue\"] with points [30, 45] and show it.", "import matplotlib.pyplot as plt", "plt.bar([\"Red\", \"Blue\"], [30, 45])\nplt.show()", ["plt.bar([\"Red\", \"Blue\"], [30, 45])", "plt.show()"], "Categories, values, show.")
  ]),
  ...attach("mpl1-histograms", [
    mcq("What does plt.hist(values) show?", ["The distribution: how many values fall in each range (bin)", "Each value as its own bar", "Values over time"], "The distribution: how many values fall in each range (bin)", "Histograms reveal the SHAPE of one variable."),
    mcq("What are bins?", ["The value ranges the data is grouped into", "Data errors", "Chart borders"], "The value ranges the data is grouped into", "bins=10 slices the range into 10 intervals."),
    fill("Draw the age distribution with 8 bins.", "plt.hist(ages, __1__=8)", [{ label: "__1__", answers: ["bins"] }], "The bins argument controls resolution."),
    mcq("Histogram vs bar chart — the real difference?", ["Histograms bin ONE numeric variable; bar charts compare separate categories", "Histograms are vertical only", "Bar charts cannot show counts"], "Histograms bin ONE numeric variable; bar charts compare separate categories", "Different questions: shape vs comparison."),
    mcq("Too FEW bins cause...", ["Oversmoothing — real structure gets hidden", "Noise", "An error"], "Oversmoothing — real structure gets hidden", "Too many bins show noise; try several counts."),
    mcq("A histogram with two separate peaks suggests...", ["Two distinct groups mixed in the data (bimodal)", "Bad data", "Perfect normality"], "Two distinct groups mixed in the data (bimodal)", "Shape carries meaning — investigate the two populations."),
    tf("The y-axis of a basic histogram shows counts per bin.", true, "density=True switches to proportions."),
    mcq("A long tail stretching right means...", ["Right-skewed data — a few unusually large values", "Left-skewed data", "Symmetric data"], "Right-skewed data — a few unusually large values", "Incomes and house prices classically skew right."),
    mcq("Which variable deserves a histogram?", ["Customer ages from 10,000 signups", "Sales per region (5 regions)", "Stock price over a year"], "Customer ages from 10,000 signups", "One numeric variable, many observations — that is a distribution question."),
    typed("Draw a histogram of values with 5 bins and show it.", "import matplotlib.pyplot as plt\nvalues = [1, 2, 2, 3, 3, 3, 4, 4, 5, 7, 8, 9]", "plt.hist(values, bins=5)\nplt.show()", ["plt.hist(values, bins=5)", "plt.show()"], "hist + bins + show — the distribution snapshot.")
  ]),
  ...attach("mpl1-subplots", [
    mcq("What does plt.subplots(1, 2) create?", ["One figure containing two side-by-side axes", "Two figures", "A 2x2 grid"], "One figure containing two side-by-side axes", "(rows, cols) — 1 row, 2 columns."),
    fill("Create the grid.", "fig, axes = plt.__1__(2, 2)", [{ label: "__1__", answers: ["subplots"] }], "subplots(rows, cols) returns the figure and an array of axes."),
    mcq("How do you draw on the FIRST plot of fig, axes = plt.subplots(1, 2)?", ["axes[0].plot(x, y)", "plt.first.plot(x, y)", "fig.plot(0, x, y)"], "axes[0].plot(x, y)", "Index the axes array, then use axes methods."),
    mcq("How do you title an individual subplot?", ["axes[0].set_title(\"Sales\")", "axes[0].title(\"Sales\")", "plt.title affects all"], "axes[0].set_title(\"Sales\")", "Axes methods take the set_ prefix."),
    mcq("What does fig.tight_layout() fix?", ["Overlapping labels and titles between subplots", "Wrong data", "Color clashes"], "Overlapping labels and titles between subplots", "Call it before show() on any multi-plot figure."),
    mcq("With fig, axes = plt.subplots(2, 2), how do you reach the bottom-right plot?", ["axes[1, 1]", "axes[4]", "axes[2, 2]"], "axes[1, 1]", "A 2D grid indexes like a 2D array — zero-based."),
    tf("Subplots beat separate figures when the panels should be compared side by side.", true, "Shared context = easier comparison."),
    mcq("What does sharex=True do in subplots?", ["Makes subplots share the same x-axis scale", "Hides the x-axis", "Duplicates data"], "Makes subplots share the same x-axis scale", "Shared scales keep comparisons honest."),
    mcq("Why does figsize=(10, 4) matter for a 1x2 grid?", ["Wide figures give side-by-side plots readable proportions", "It compresses the file", "It is required"], "Wide figures give side-by-side plots readable proportions", "Default sizes squeeze multi-plot figures."),
    typed("Create a 1x2 subplot grid; plot [1,2,3] vs [1,4,9] on the left and [1,2,3] vs [3,2,1] on the right, then show.", "import matplotlib.pyplot as plt", "fig, axes = plt.subplots(1, 2)\naxes[0].plot([1, 2, 3], [1, 4, 9])\naxes[1].plot([1, 2, 3], [3, 2, 1])\nplt.show()", ["plt.subplots(1, 2)", "axes[0].plot", "axes[1].plot"], "One figure, two independent axes.")
  ]),
  ...attach("mpl1-saving", [
    mcq("Which call saves the current figure to a file?", ["plt.savefig(\"chart.png\")", "plt.save(\"chart.png\")", "plt.export()"], "plt.savefig(\"chart.png\")", "The extension picks the format: .png, .svg, .pdf."),
    mcq("What does dpi=200 control?", ["The resolution (sharpness) of raster output", "Data point intensity", "The number of charts"], "The resolution (sharpness) of raster output", "Higher dpi = sharper PNG = bigger file."),
    fill("Save without wasteful margins.", "plt.savefig(\"chart.png\", bbox_inches=\"__1__\")", [{ label: "__1__", answers: ["tight"] }], "bbox_inches=\"tight\" crops to the content."),
    mcq("PNG vs SVG — the difference?", ["PNG is pixels; SVG is vectors that scale without blurring", "SVG is always smaller", "PNG supports more colors"], "PNG is pixels; SVG is vectors that scale without blurring", "Vector formats (SVG/PDF) stay crisp at any zoom — ideal for print."),
    mcq("Your saved PNG is blank, but show() displayed fine. Why?", ["savefig was called AFTER show(), which can clear the figure", "PNG is unsupported", "The data was empty"], "savefig was called AFTER show(), which can clear the figure", "Order in scripts: draw → savefig → show."),
    tf("plt.savefig(\"chart.pdf\") produces a vector PDF.", true, "Format follows the file extension."),
    mcq("Which format suits a chart going into a print publication?", ["PDF or SVG (vector)", "Low-dpi PNG", "GIF"], "PDF or SVG (vector)", "Print demands resolution-independent output."),
    fill("Sharpen the raster export.", "plt.savefig(\"plot.png\", __1__=300)", [{ label: "__1__", answers: ["dpi"] }], "300 dpi is print-quality raster."),
    mcq("Where does savefig write \"chart.png\" (no path)?", ["The current working directory", "The desktop", "A temp folder"], "The current working directory", "Provide a full path to control the destination."),
    typed("Plot [1,2,3] vs [2,4,8], then save it as growth.png BEFORE showing it.", "import matplotlib.pyplot as plt", "plt.plot([1, 2, 3], [2, 4, 8])\nplt.savefig(\"growth.png\")\nplt.show()", ["plt.savefig(\"growth.png\")", "plt.show()"], "savefig before show — the script-safe order.")
  ]),
  ...attach("mpl1-reading-charts", [
    mcq("Monthly revenue across two years — which chart?", ["Line plot", "Histogram", "Scatter plot"], "Line plot", "Ordered time series = line."),
    mcq("Number of users per subscription plan (4 plans) — which chart?", ["Bar chart", "Line plot", "Histogram"], "Bar chart", "Few categories compared = bars."),
    mcq("The distribution of 10,000 order values — which chart?", ["Histogram", "Bar chart", "Line plot"], "Histogram", "One numeric variable's shape = histogram."),
    mcq("Apartment size vs rent for 500 listings — which chart?", ["Scatter plot", "Line plot", "Bar chart"], "Scatter plot", "Two numeric variables' relationship = scatter."),
    mcq("A bar chart's y-axis starts at 90 instead of 0, making one bar look twice as tall. What is wrong?", ["The truncated axis exaggerates a small difference", "Nothing — always valid", "The bars are mislabeled"], "The truncated axis exaggerates a small difference", "Check axis origins before believing dramatic-looking gaps."),
    mcq("A scatter shows ice cream sales vs drowning deaths rising together. The right conclusion?", ["Correlation is not causation — summer drives both", "Ice cream causes drowning", "The data is fake"], "Correlation is not causation — summer drives both", "A lurking variable (season) explains the link."),
    tf("Changing histogram bin counts can change the story the chart appears to tell.", true, "Always try several bin widths before concluding."),
    mcq("A chart has no axis labels or units. What should you do?", ["Distrust it until labels clarify what is measured", "Assume dollars", "Judge by colors"], "Distrust it until labels clarify what is measured", "Unlabeled axes are uninterpretable — and sometimes deliberately so."),
    mcq("A line plot connects categories: apples, oranges, bananas. What is wrong?", ["The line implies an order/continuity categories do not have — use bars", "Too few fruits", "Lines need dates"], "The line implies an order/continuity categories do not have — use bars", "Chart grammar: connect only what is genuinely sequential."),
    mcq("Same data, two views: raw counts per category AND each category's value distribution. Which pairing?", ["Bar chart + histograms", "Two scatter plots", "Two pie charts"], "Bar chart + histograms", "Each question gets its proper chart type — often as subplots.")
  ])
];
