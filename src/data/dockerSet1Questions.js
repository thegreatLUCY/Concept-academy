const code = (...lines) => lines.join("\n");
const setId = "docker-set1";

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
// commands are case-insensitively string-graded, like the bash/linux tracks
const typed = (prompt, starter, expected, accepted, explanation) =>
  item("code", {
    prompt,
    starter,
    expected,
    accepted: accepted ?? [expected],
    required: [],
    caseInsensitive: true,
    explanation
  });

function attach(moduleId, items) {
  return items.map((question, index) => ({
    id: `${moduleId}-${String(index + 1).padStart(2, "0")}`,
    setId,
    moduleId,
    ...question
  }));
}

export const dockerSet1Modules = [
  { id: "docker-why-containers", setId, title: "Containers vs Virtual Machines" },
  { id: "docker-images-containers", setId, title: "Images, Containers, and the Registry" },
  { id: "docker-run", setId, title: "Running and Managing Containers" },
  { id: "docker-dockerfile", setId, title: "Writing a Dockerfile" },
  { id: "docker-build", setId, title: "Building Images and Layer Caching" },
  { id: "docker-volumes", setId, title: "Volumes and Persistent Data" },
  { id: "docker-networking", setId, title: "Ports and Container Networking" },
  { id: "docker-compose", setId, title: "Docker Compose" },
  { id: "docker-registries", setId, title: "Tags, Pushing, and Registries" },
  { id: "docker-production", setId, title: "Multi-stage Builds and Production Practice" }
];

export const dockerSet1Lessons = {
  "docker-why-containers": {
    summary:
      "A container packages an application with everything it needs — code, runtime, libraries, settings — and runs it as an isolated process on the host's kernel. Unlike a virtual machine, it does not boot its own operating system, so containers start in milliseconds and you can run dozens where one VM would fit. The payoff: 'works on my machine' becomes 'works anywhere the image runs'.",
    points: [
      "Containers share the host kernel; VMs each boot a full guest OS.",
      "An image is the frozen recipe; a container is a running instance of it.",
      "Same image runs identically on a laptop, CI, and production."
    ],
    example: code(
      "# the classic first container",
      "docker run hello-world",
      "",
      "# an interactive Ubuntu shell, gone when you exit",
      "docker run -it --rm ubuntu bash"
    )
  },
  "docker-images-containers": {
    summary:
      "Images are immutable templates built from stacked read-only layers — each layer records one change. Containers add a thin writable layer on top. Images live in registries (Docker Hub is the default); docker pull downloads one, docker images lists what you have locally. A tag like node:20-alpine names a specific variant.",
    points: [
      "Image = read-only layers; container = image + a writable layer.",
      "name:tag — node:20-alpine is the node image, variant 20-alpine.",
      "docker pull fetches; docker images lists; layers are shared between images."
    ],
    example: code(
      "docker pull nginx:1.27        # download from Docker Hub",
      "docker images                 # list local images",
      "docker history nginx:1.27     # the layers it is made of",
      "docker rmi nginx:1.27         # remove a local image"
    )
  },
  "docker-run": {
    summary:
      "docker run creates and starts a container from an image. The flags you will use daily: -d detaches (runs in background), -it gives you an interactive terminal, --name labels it, --rm cleans up on exit. Then docker ps shows what's running, docker logs reads output, docker exec runs a command inside, and docker stop/rm end and delete it.",
    points: [
      "docker run -d --name web nginx — background container you can refer to by name.",
      "docker ps (running) / docker ps -a (including stopped).",
      "docker logs -f web tails output; docker exec -it web bash gets a shell inside."
    ],
    example: code(
      "docker run -d --name web -p 8080:80 nginx",
      "docker ps",
      "docker logs -f web",
      "docker exec -it web bash",
      "docker stop web && docker rm web"
    )
  },
  "docker-dockerfile": {
    summary:
      "A Dockerfile is the build recipe. FROM picks the base image, WORKDIR sets the working directory, COPY brings files in, RUN executes build-time commands (each creating a layer), ENV sets environment variables, EXPOSE documents the port, and CMD gives the default startup command. ENTRYPOINT fixes the executable; CMD then supplies default arguments.",
    points: [
      "FROM is always first: the base everything builds on.",
      "RUN happens at BUILD time; CMD happens at RUN time (one CMD wins — the last).",
      "ENTRYPOINT = fixed program; CMD = overridable default arguments."
    ],
    example: code(
      "FROM node:20-alpine",
      "WORKDIR /app",
      "COPY package*.json ./",
      "RUN npm ci",
      "COPY . .",
      "EXPOSE 3000",
      "CMD [\"node\", \"server.js\"]"
    )
  },
  "docker-build": {
    summary:
      "docker build -t name:tag . builds an image from the Dockerfile in the current directory — the '.' is the build context, the set of files COPY can see. Docker caches each layer: if a step and its inputs are unchanged, it is reused. That is why you COPY package.json and install dependencies BEFORE copying the rest of the source — editing app code then skips the slow install. .dockerignore keeps junk (node_modules, .git) out of the context.",
    points: [
      "docker build -t myapp:1.0 . — tag at build time, context is '.'.",
      "Order steps least- to most-frequently-changing to maximize cache hits.",
      ".dockerignore excludes files from the build context (faster, smaller, safer)."
    ],
    example: code(
      "# .dockerignore",
      "node_modules",
      ".git",
      "*.log",
      "",
      "# build and run",
      "docker build -t myapp:1.0 .",
      "docker run -d -p 3000:3000 myapp:1.0"
    )
  },
  "docker-volumes": {
    summary:
      "A container's writable layer dies with the container — databases need somewhere durable. Named volumes (-v pgdata:/var/lib/postgresql/data) are managed by Docker and survive container removal. Bind mounts (-v $(pwd):/app) map a host directory in, perfect for live-editing code during development. docker volume ls/inspect/rm manage them.",
    points: [
      "Named volume: -v pgdata:/path — Docker-managed, survives docker rm.",
      "Bind mount: -v $(pwd):/app — your real folder inside the container.",
      "Data that matters never lives only in the container's writable layer."
    ],
    example: code(
      "# database with durable storage",
      "docker run -d --name db \\",
      "  -v pgdata:/var/lib/postgresql/data \\",
      "  -e POSTGRES_PASSWORD=secret postgres:16",
      "",
      "# dev server editing live code",
      "docker run -it --rm -v $(pwd):/app -w /app node:20 npm run dev"
    )
  },
  "docker-networking": {
    summary:
      "Containers get their own network namespace — nothing is reachable until you publish it. -p 8080:80 maps host port 8080 to container port 80 (host:container, always). Containers on the same user-defined network reach each other by NAME: a container called db is just db:5432 to its neighbors, courtesy of Docker's built-in DNS.",
    points: [
      "-p HOST:CONTAINER — -p 8080:80 means localhost:8080 → container's 80.",
      "docker network create mynet; containers joined to it resolve each other by name.",
      "EXPOSE documents a port; only -p actually publishes it."
    ],
    example: code(
      "docker network create appnet",
      "docker run -d --name db --network appnet postgres:16",
      "docker run -d --name api --network appnet -p 3000:3000 myapi",
      "# inside api, the database is simply: postgres://db:5432"
    )
  },
  "docker-compose": {
    summary:
      "Real apps are several containers — API, database, cache. Docker Compose describes them all in one compose.yaml: each service gets an image or build, ports, volumes, environment, and dependencies. docker compose up -d starts the whole stack on a shared network (services see each other by name); docker compose down tears it down. One file replaces a page of docker run commands.",
    points: [
      "services: define each container; compose networks them together automatically.",
      "docker compose up -d / down / logs -f / ps — the daily four.",
      "depends_on orders startup; environment and volumes work per service."
    ],
    example: code(
      "# compose.yaml",
      "services:",
      "  api:",
      "    build: .",
      "    ports:",
      "      - \"3000:3000\"",
      "    environment:",
      "      DATABASE_URL: postgres://db:5432/app",
      "    depends_on:",
      "      - db",
      "  db:",
      "    image: postgres:16",
      "    volumes:",
      "      - pgdata:/var/lib/postgresql/data",
      "volumes:",
      "  pgdata:"
    )
  },
  "docker-registries": {
    summary:
      "Sharing an image means pushing it to a registry. docker tag gives your local image its registry name (username/app:1.0), docker login authenticates, docker push uploads. Tags are mutable pointers — 'latest' is just a default tag that someone can re-point, which is why production pins exact versions (or immutable digests like @sha256:...).",
    points: [
      "docker tag myapp:1.0 user/myapp:1.0 — registry names include the owner.",
      "docker login → docker push user/myapp:1.0.",
      "'latest' is not special and not stable — pin versions in production."
    ],
    example: code(
      "docker tag myapp:1.0 lucy/myapp:1.0",
      "docker login",
      "docker push lucy/myapp:1.0",
      "",
      "# on any other machine",
      "docker pull lucy/myapp:1.0"
    )
  },
  "docker-production": {
    summary:
      "Production images are small, reproducible, and unprivileged. Multi-stage builds compile in a fat builder stage, then COPY --from only the artifacts into a slim final image — build tools never ship. Use specific slim/alpine bases, run as a non-root USER, add a HEALTHCHECK, and pass secrets via environment/secret stores, never baked into layers (every layer is forever).",
    points: [
      "Multi-stage: build in stage one, COPY --from=build only the output.",
      "USER node (or another non-root user) limits the blast radius of a breakout.",
      "Secrets never go in images — a deleted file still exists in an earlier layer."
    ],
    example: code(
      "FROM node:20 AS build",
      "WORKDIR /app",
      "COPY package*.json ./",
      "RUN npm ci",
      "COPY . .",
      "RUN npm run build",
      "",
      "FROM node:20-alpine",
      "WORKDIR /app",
      "COPY --from=build /app/dist ./dist",
      "COPY --from=build /app/node_modules ./node_modules",
      "USER node",
      "CMD [\"node\", \"dist/server.js\"]"
    )
  }
};

export const dockerSet1Questions = [
  ...attach("docker-why-containers", [
    mcq(
      "What is the key difference between a container and a virtual machine?",
      [
        "Containers share the host's kernel; VMs each boot a full guest operating system",
        "Containers are always slower than VMs",
        "VMs cannot run Linux"
      ],
      "Containers share the host's kernel; VMs each boot a full guest operating system",
      "No guest OS to boot is why containers start in milliseconds and use far less memory."
    ),
    mcq(
      "What problem does Docker primarily solve?",
      [
        "\"Works on my machine\" — the app ships with its entire environment",
        "Slow internet connections",
        "Writing code without bugs"
      ],
      "\"Works on my machine\" — the app ships with its entire environment",
      "The image carries code, runtime, and dependencies, so every machine runs the same thing."
    ),
    mcq(
      "Which statement about images and containers is correct?",
      [
        "An image is a frozen template; a container is a running instance of it",
        "An image is a running process; a container is its backup",
        "They are two words for the same thing"
      ],
      "An image is a frozen template; a container is a running instance of it",
      "Class vs object, recipe vs meal — one image can run as many containers."
    ),
    tf(
      "A container includes its own full operating system kernel.",
      false,
      "Containers isolate processes but share the HOST kernel — that is what makes them light."
    ),
    tf(
      "You can run many containers from the same image at the same time.",
      true,
      "Each gets its own writable layer and isolated process space."
    ),
    mcq(
      "Why do containers start so much faster than VMs?",
      [
        "There is no operating system to boot — just a process to start",
        "They skip loading the application code",
        "They run with fewer CPU instructions"
      ],
      "There is no operating system to boot — just a process to start",
      "Starting a container is closer to launching a program than booting a machine."
    ),
    fill(
      "Complete the classic first command.",
      "docker __1__ hello-world",
      [{ label: "__1__", answers: ["run"] }],
      "docker run creates and starts a container from the named image."
    ),
    mcq(
      "Which is a typical use case where containers shine?",
      [
        "Running the exact same app environment on a laptop, in CI, and in production",
        "Increasing a single program's raw CPU speed",
        "Replacing version control"
      ],
      "Running the exact same app environment on a laptop, in CI, and in production",
      "Consistency across environments is the core promise."
    ),
    typed(
      "Type the command that runs an interactive Ubuntu container with a bash shell (interactive + terminal flags before the image).",
      "docker ",
      "docker run -it ubuntu bash",
      ["docker run -it ubuntu bash", "docker run -i -t ubuntu bash"],
      "-i keeps stdin open, -t allocates a terminal — together they make the shell usable."
    ),
    tf(
      "Docker containers can only run on Linux hosts, with no way to use them on macOS or Windows.",
      false,
      "Docker Desktop runs a lightweight Linux VM under the hood, so Mac and Windows develop with containers daily."
    )
  ]),

  ...attach("docker-images-containers", [
    mcq(
      "What is an image layer?",
      [
        "A read-only record of one filesystem change, stacked with others to form the image",
        "A running copy of the container",
        "A network configuration file"
      ],
      "A read-only record of one filesystem change, stacked with others to form the image",
      "Each Dockerfile step adds a layer; layers are cached and shared between images."
    ),
    mcq(
      "In node:20-alpine, what is '20-alpine'?",
      ["The tag — a named variant of the node image", "The registry hostname", "A checksum"],
      "The tag — a named variant of the node image",
      "name:tag — here Node 20 built on the tiny Alpine Linux base."
    ),
    fill(
      "Download the nginx image at tag 1.27 without running it.",
      "docker __1__ nginx:1.27",
      [{ label: "__1__", answers: ["pull"] }],
      "docker pull fetches an image from the registry to your local cache."
    ),
    mcq(
      "Which command lists the images stored locally?",
      ["docker images", "docker ps", "docker list --local"],
      "docker images",
      "docker images shows repository, tag, image id, and size. (docker ps lists containers.)"
    ),
    tf(
      "When a container writes a file, it modifies the image's layers so all other containers see the change.",
      false,
      "Writes go to the container's own thin writable layer — the image stays immutable."
    ),
    mcq(
      "What is Docker Hub?",
      [
        "The default public registry where images are stored and shared",
        "The Docker configuration directory",
        "A GUI for writing Dockerfiles"
      ],
      "The default public registry where images are stored and shared",
      "When you docker pull nginx, it comes from Docker Hub unless you name another registry."
    ),
    fill(
      "Remove a local image you no longer need.",
      "docker __1__ nginx:1.27",
      [{ label: "__1__", answers: ["rmi", "image rm"] }],
      "docker rmi (remove image) deletes it from your local cache — containers need docker rm instead."
    ),
    tf(
      "If two images share the same base layers, Docker stores those layers only once on disk.",
      true,
      "Layer sharing is why having 10 node-based images doesn't cost 10× the space."
    ),
    typed(
      "Type the command that shows the layers an image is built from.",
      "docker ",
      "docker history nginx:1.27",
      ["docker history nginx:1.27", "docker history nginx"],
      "docker history lists each layer with the instruction that created it and its size."
    ),
    mcq(
      "If you run docker pull nginx with no tag, which tag does Docker assume?",
      ["latest", "stable", "1.0"],
      "latest",
      "No tag means :latest — which is just a tag name, not a guarantee of being newest."
    )
  ]),

  ...attach("docker-run", [
    fill(
      "Run nginx in the background with a name.",
      "docker run __1__ --name web nginx",
      [{ label: "__1__", answers: ["-d", "--detach"] }],
      "-d detaches the container so your terminal stays free."
    ),
    mcq(
      "What does docker ps show by default?",
      ["Running containers only", "All containers including stopped ones", "Available images"],
      "Running containers only",
      "Add -a to include stopped containers."
    ),
    fill(
      "Include stopped containers in the list.",
      "docker ps __1__",
      [{ label: "__1__", answers: ["-a", "--all"] }],
      "docker ps -a shows every container, running or exited."
    ),
    mcq(
      "Which command shows a running container's output (and follows it live)?",
      ["docker logs -f web", "docker watch web", "docker output --tail web"],
      "docker logs -f web",
      "docker logs reads stdout/stderr; -f follows like tail -f."
    ),
    typed(
      "Type the command that opens an interactive bash shell INSIDE the running container named web.",
      "docker ",
      "docker exec -it web bash",
      ["docker exec -it web bash", "docker exec -i -t web bash"],
      "exec runs an extra command in a running container; -it makes it an interactive shell."
    ),
    mcq(
      "What is the difference between docker stop and docker rm?",
      [
        "stop ends the running process; rm deletes the (stopped) container",
        "They are synonyms",
        "rm stops it politely; stop force-kills it"
      ],
      "stop ends the running process; rm deletes the (stopped) container",
      "A stopped container still exists (docker ps -a) until removed."
    ),
    tf(
      "The --rm flag makes Docker delete the container automatically when it exits.",
      true,
      "Perfect for one-off commands — no stopped containers piling up."
    ),
    fill(
      "Restart a stopped container by name.",
      "docker __1__ web",
      [{ label: "__1__", answers: ["start"] }],
      "docker start brings a stopped container back; docker restart = stop + start."
    ),
    mcq(
      "docker run ubuntu vs docker exec web — what is the difference?",
      [
        "run creates a NEW container; exec runs a command in an EXISTING one",
        "exec is faster but otherwise identical",
        "run only works with Linux images"
      ],
      "run creates a NEW container; exec runs a command in an EXISTING one",
      "A very common beginner mix-up: exec needs a running container to enter."
    ),
    tf(
      "Passing -e KEY=value to docker run sets an environment variable inside the container.",
      true,
      "Environment variables are the standard way to configure containers — e.g. -e POSTGRES_PASSWORD=secret."
    )
  ]),

  ...attach("docker-dockerfile", [
    mcq(
      "Which instruction must come first in a Dockerfile?",
      ["FROM", "RUN", "CMD"],
      "FROM",
      "Every image builds on a base image — FROM declares it."
    ),
    fill(
      "Complete the base image line for a Node 20 Alpine app.",
      "__1__ node:20-alpine",
      [{ label: "__1__", answers: ["FROM"] }],
      "FROM node:20-alpine starts the build from that base."
    ),
    mcq(
      "What is the difference between RUN and CMD?",
      [
        "RUN executes at build time (creating a layer); CMD is the default command at container start",
        "RUN is for Linux, CMD for Windows",
        "CMD executes every Dockerfile line"
      ],
      "RUN executes at build time (creating a layer); CMD is the default command at container start",
      "RUN npm ci bakes dependencies into the image; CMD [\"node\",\"server.js\"] runs when the container starts."
    ),
    fill(
      "Set the directory all later instructions run in.",
      "__1__ /app",
      [{ label: "__1__", answers: ["WORKDIR"] }],
      "WORKDIR /app creates and switches to /app — no need for cd in RUN lines."
    ),
    mcq(
      "Why does this Dockerfile copy package*.json and install BEFORE copying the rest of the code?",
      [
        "So the slow npm ci layer is cached and only re-runs when dependencies change",
        "Because COPY can only move two files at a time",
        "npm refuses to run if source files exist"
      ],
      "So the slow npm ci layer is cached and only re-runs when dependencies change",
      "Source code changes daily; dependencies change rarely — order steps so the cache survives.",
      code(
        "COPY package*.json ./",
        "RUN npm ci",
        "COPY . ."
      )
    ),
    tf(
      "If a Dockerfile has three CMD instructions, all three run when the container starts.",
      false,
      "Only the LAST CMD takes effect — there is one default command."
    ),
    mcq(
      "What does EXPOSE 3000 actually do?",
      [
        "Documents that the app listens on 3000 — publishing still requires -p",
        "Opens port 3000 on the host firewall",
        "Redirects traffic from 80 to 3000"
      ],
      "Documents that the app listens on 3000 — publishing still requires -p",
      "EXPOSE is metadata; -p 8080:3000 at run time is what makes it reachable."
    ),
    mcq(
      "How do ENTRYPOINT and CMD work together?",
      [
        "ENTRYPOINT is the fixed executable; CMD supplies default arguments you can override",
        "They must never appear in the same Dockerfile",
        "CMD always overrides ENTRYPOINT completely"
      ],
      "ENTRYPOINT is the fixed executable; CMD supplies default arguments you can override",
      "ENTRYPOINT [\"node\"] + CMD [\"server.js\"]: docker run image other.js swaps only the argument."
    ),
    fill(
      "Copy everything from the build context into the image's working directory.",
      "__1__ . .",
      [{ label: "__1__", answers: ["COPY"] }],
      "COPY src dest — the first . is the build context, the second is the WORKDIR."
    ),
    typed(
      "Write the CMD instruction (exec form, JSON array) that starts node server.js.",
      "CMD ",
      "CMD [\"node\", \"server.js\"]",
      ["CMD [\"node\", \"server.js\"]", "CMD [\"node\",\"server.js\"]"],
      "Exec form (a JSON array) runs the process directly, without a shell wrapper — preferred."
    )
  ]),

  ...attach("docker-build", [
    fill(
      "Build the current directory into an image named myapp tagged 1.0.",
      "docker build __1__ myapp:1.0 .",
      [{ label: "__1__", answers: ["-t", "--tag"] }],
      "-t names and tags the image at build time."
    ),
    mcq(
      "What is the build context (the '.' in docker build .)?",
      [
        "The set of files sent to the builder — what COPY instructions can see",
        "The directory where the image is stored after building",
        "A temporary container used for testing"
      ],
      "The set of files sent to the builder — what COPY instructions can see",
      "Everything in the context uploads to the build — which is why you trim it."
    ),
    mcq(
      "What does .dockerignore do?",
      [
        "Excludes files from the build context, like .gitignore for builds",
        "Hides containers from docker ps",
        "Prevents an image from being pushed"
      ],
      "Excludes files from the build context, like .gitignore for builds",
      "node_modules and .git in the context mean slow builds and bloated, possibly leaky images."
    ),
    tf(
      "If a Dockerfile step and its input files are unchanged since the last build, Docker reuses the cached layer.",
      true,
      "Layer caching is what makes rebuilds near-instant when you order steps well."
    ),
    mcq(
      "You edit only src/index.js. With the dependencies-first Dockerfile pattern, which steps re-run on rebuild?",
      [
        "Only COPY . . and later steps — npm ci comes from cache",
        "Every step including FROM downloads again",
        "Nothing re-runs"
      ],
      "Only COPY . . and later steps — npm ci comes from cache",
      "The first changed step invalidates the cache from that point DOWN — everything above stays cached."
    ),
    tf(
      "Changing one early line in a Dockerfile invalidates the cache for every step after it.",
      true,
      "The cache is a chain: a changed layer breaks reuse for all layers built on top of it."
    ),
    fill(
      "Two entries every Node project's .dockerignore should have.",
      code("__1__", ".git"),
      [{ label: "__1__", answers: ["node_modules"] }],
      "Dependencies get installed IN the image by npm ci; shipping your host's node_modules breaks cross-platform builds."
    ),
    typed(
      "Type the full command to build the current directory as shop:2.0.",
      "docker ",
      "docker build -t shop:2.0 .",
      ["docker build -t shop:2.0 .", "docker build --tag shop:2.0 ."],
      "Name and tag with -t; the trailing dot is the build context."
    ),
    mcq(
      "After a successful build, where is the new image?",
      [
        "In your local image store — visible with docker images",
        "Automatically pushed to Docker Hub",
        "Inside the build context folder"
      ],
      "In your local image store — visible with docker images",
      "Builds are local; sharing requires an explicit docker push."
    ),
    mcq(
      "Which change produces the FASTEST average rebuild for an app whose code changes constantly?",
      [
        "Moving COPY . . as late as possible, after dependency installation",
        "Moving COPY . . to the first line",
        "Deleting the .dockerignore"
      ],
      "Moving COPY . . as late as possible, after dependency installation",
      "The most-frequently-changing input belongs at the bottom of the layer stack."
    )
  ]),

  ...attach("docker-volumes", [
    mcq(
      "What happens to files a container wrote when that container is removed?",
      [
        "They are deleted with its writable layer — unless stored in a volume",
        "They move to the image",
        "Docker archives them automatically"
      ],
      "They are deleted with its writable layer — unless stored in a volume",
      "Containers are disposable; durable data needs a volume."
    ),
    fill(
      "Attach a named volume for Postgres data.",
      "docker run -d -v __1__:/var/lib/postgresql/data postgres:16",
      [{ label: "__1__", answers: ["pgdata"] }],
      "Named volumes (pgdata) are created and managed by Docker, surviving container removal."
    ),
    mcq(
      "What is the difference between a named volume and a bind mount?",
      [
        "Named volumes are Docker-managed storage; bind mounts map a specific host directory in",
        "Bind mounts are read-only, volumes are not",
        "Named volumes only work on Windows"
      ],
      "Named volumes are Docker-managed storage; bind mounts map a specific host directory in",
      "Volumes for durable app data; bind mounts for live-editing source in development."
    ),
    mcq(
      "Which run flag mounts your current directory into /app for live development?",
      ["-v $(pwd):/app", "-p $(pwd):/app", "--copy . /app"],
      "-v $(pwd):/app",
      "A bind mount: edits on the host appear instantly inside the container."
    ),
    tf(
      "Removing a container with docker rm also deletes the named volumes it used.",
      false,
      "Volumes outlive containers by design — that is their whole point. docker volume rm deletes them."
    ),
    fill(
      "List the volumes Docker manages.",
      "docker __1__ ls",
      [{ label: "__1__", answers: ["volume"] }],
      "docker volume ls / inspect / rm manage the volume lifecycle."
    ),
    mcq(
      "Where should a containerized database keep its data files?",
      [
        "In a named volume mounted at its data directory",
        "In the container's writable layer",
        "Baked into the image with COPY"
      ],
      "In a named volume mounted at its data directory",
      "Upgrade the database by replacing the container — the volume carries the data forward."
    ),
    tf(
      "A bind mount can hide files that exist at the same path inside the image.",
      true,
      "The mount shadows the image's directory — mounting an empty folder over /app makes /app look empty."
    ),
    typed(
      "Type the command to delete the named volume pgdata.",
      "docker ",
      "docker volume rm pgdata",
      ["docker volume rm pgdata"],
      "Explicit and irreversible — this is where the data actually lives."
    ),
    mcq(
      "In compose.yaml, what does the top-level volumes: section declare?",
      [
        "The named volumes the stack's services can mount",
        "Folders to delete on shutdown",
        "Maximum disk usage"
      ],
      "The named volumes the stack's services can mount",
      "Declare once at the top level, mount per-service under that service's volumes: list."
    )
  ]),

  ...attach("docker-networking", [
    mcq(
      "In -p 8080:80, which side is the host port?",
      ["8080 — the format is host:container", "80 — the format is container:host", "Both are container ports"],
      "8080 — the format is host:container",
      "Memorize once: -p HOST:CONTAINER. localhost:8080 reaches the container's 80."
    ),
    fill(
      "Publish container port 3000 on host port 5000.",
      "docker run -d __1__ 5000:3000 myapi",
      [{ label: "__1__", answers: ["-p", "--publish"] }],
      "-p host:container is the only thing that makes a container reachable from outside."
    ),
    mcq(
      "Two containers join the same user-defined network. How does one address the other?",
      [
        "By container name — Docker's DNS resolves it",
        "Only by IP address, looked up manually",
        "Through the host's public IP"
      ],
      "By container name — Docker's DNS resolves it",
      "On network appnet, the container named db is reachable as db — connection strings just use the name."
    ),
    fill(
      "Create a network for the app's containers.",
      "docker __1__ create appnet",
      [{ label: "__1__", answers: ["network"] }],
      "docker network create makes a user-defined bridge network with name-based DNS."
    ),
    tf(
      "Without -p, a container's ports are reachable from the host's browser.",
      false,
      "Containers are isolated by default — unpublished ports are only reachable from other containers on the same network."
    ),
    mcq(
      "An API container needs to reach a Postgres container named db on the same network. Which connection host is right?",
      ["db", "localhost", "127.0.0.1"],
      "db",
      "localhost inside a container is THAT container — sibling services go by their service/container name."
    ),
    tf(
      "Inside a container, localhost refers to the container itself, not the host machine.",
      true,
      "The classic networking bug: pointing the app at localhost:5432 when the database is a different container."
    ),
    mcq(
      "What does docker run -P (capital P) do?",
      [
        "Publishes every EXPOSEd port to random available host ports",
        "Makes the container privileged",
        "Disables networking entirely"
      ],
      "Publishes every EXPOSEd port to random available host ports",
      "Handy for quick tests; check the assignments with docker ps."
    ),
    typed(
      "Type the command to run nginx detached with host port 8080 mapped to container port 80.",
      "docker ",
      "docker run -d -p 8080:80 nginx",
      ["docker run -d -p 8080:80 nginx", "docker run -p 8080:80 -d nginx"],
      "Detached web server, published port — the bread-and-butter run command."
    ),
    mcq(
      "Which command shows which ports a running container has published?",
      ["docker ps", "docker volume ls", "docker history"],
      "docker ps",
      "The PORTS column shows mappings like 0.0.0.0:8080->80/tcp."
    )
  ]),

  ...attach("docker-compose", [
    mcq(
      "What problem does Docker Compose solve?",
      [
        "Defining and running a multi-container app from one declarative file",
        "Compressing images for faster pulls",
        "Replacing the need for Dockerfiles"
      ],
      "Defining and running a multi-container app from one declarative file",
      "One compose.yaml instead of a page of docker run commands that must be typed in order."
    ),
    fill(
      "Start the whole stack in the background.",
      "docker compose __1__ -d",
      [{ label: "__1__", answers: ["up"] }],
      "docker compose up -d builds (if needed), creates the network, and starts every service."
    ),
    mcq(
      "What does docker compose down do?",
      [
        "Stops and removes the stack's containers and network",
        "Only pauses the containers",
        "Deletes the compose.yaml"
      ],
      "Stops and removes the stack's containers and network",
      "Named volumes survive unless you add -v — data is deliberately harder to destroy."
    ),
    mcq(
      "In compose.yaml, what is a service?",
      [
        "One container definition — its image/build, ports, environment, volumes",
        "A Linux background daemon",
        "A paid Docker subscription tier"
      ],
      "One container definition — its image/build, ports, environment, volumes",
      "services: api: ... db: ... — each key under services describes one container of the stack."
    ),
    tf(
      "Services in one compose file can reach each other using their service names as hostnames.",
      true,
      "Compose puts the stack on a shared network with DNS — the api service connects to db:5432."
    ),
    fill(
      "Make the api service start after the database.",
      code(
        "  api:",
        "    build: .",
        "    __1__:",
        "      - db"
      ),
      [{ label: "__1__", answers: ["depends_on"] }],
      "depends_on orders startup (it does not wait for the DB to be READY — healthchecks do that)."
    ),
    mcq(
      "Which line under a service builds its image from the local Dockerfile instead of pulling one?",
      ["build: .", "image: local", "from: Dockerfile"],
      "build: .",
      "build: . points at a build context; image: name pulls from a registry — a service uses one or the other (or both to name the built image)."
    ),
    tf(
      "depends_on guarantees the database is fully ready to accept connections before the api starts.",
      false,
      "It only orders container STARTUP — readiness needs a healthcheck plus condition: service_healthy, or retry logic in the app."
    ),
    fill(
      "Follow the live logs of every service in the stack.",
      "docker compose logs __1__",
      [{ label: "__1__", answers: ["-f", "--follow"] }],
      "docker compose logs -f interleaves all services' output, labeled per service."
    ),
    typed(
      "Type the command that stops and removes the compose stack.",
      "docker ",
      "docker compose down",
      ["docker compose down", "docker-compose down"],
      "Tear down containers and network in one command; volumes persist without -v."
    )
  ]),

  ...attach("docker-registries", [
    fill(
      "Give the local image a registry name under the user lucy.",
      "docker __1__ myapp:1.0 lucy/myapp:1.0",
      [{ label: "__1__", answers: ["tag"] }],
      "docker tag adds another name to the same image — push needs the user/name form."
    ),
    mcq(
      "What is the correct order of commands to share an image on Docker Hub?",
      [
        "docker tag → docker login → docker push",
        "docker push → docker tag → docker login",
        "docker login → docker run → docker share"
      ],
      "docker tag → docker login → docker push",
      "Name it for the registry, authenticate, upload."
    ),
    typed(
      "Type the command that uploads lucy/myapp:1.0 to the registry.",
      "docker ",
      "docker push lucy/myapp:1.0",
      ["docker push lucy/myapp:1.0"],
      "push uploads the layers the registry doesn't already have."
    ),
    tf(
      "The :latest tag always points to the most recently published version of an image.",
      false,
      "latest is an ordinary, mutable tag — it points wherever the publisher last aimed it, which may be old or surprising."
    ),
    mcq(
      "Why do production deployments pin image versions (myapp:1.4.2) instead of using :latest?",
      [
        "Reproducibility — the same tag could silently become different code tomorrow",
        "latest images cost more to pull",
        "Registries delete latest tags weekly"
      ],
      "Reproducibility — the same tag could silently become different code tomorrow",
      "A deploy should be a known artifact; mutable tags make rollbacks and debugging guesswork."
    ),
    mcq(
      "What is an image digest (myapp@sha256:...)?",
      [
        "An immutable content hash that identifies exactly one image build",
        "A password for the registry",
        "The image's compression format"
      ],
      "An immutable content hash that identifies exactly one image build",
      "Tags can move; digests cannot — the strictest way to pin."
    ),
    fill(
      "Authenticate to the registry before pushing.",
      "docker __1__",
      [{ label: "__1__", answers: ["login"] }],
      "docker login stores credentials for subsequent push/pull of private images."
    ),
    tf(
      "Anyone can pull a public Docker Hub image without logging in.",
      true,
      "Public images are anonymous-pull; pushing (and private images) require auth."
    ),
    mcq(
      "Your image name is registry.company.com/team/app:2.1. What is registry.company.com?",
      [
        "A private registry hostname — pulls and pushes go there instead of Docker Hub",
        "A mandatory mirror of Docker Hub",
        "The container's hostname at runtime"
      ],
      "A private registry hostname — pulls and pushes go there instead of Docker Hub",
      "The full image reference is registry/namespace/name:tag; no registry part means Docker Hub."
    ),
    mcq(
      "A teammate on another machine wants to run your pushed image. What single command gets and starts it?",
      [
        "docker run lucy/myapp:1.0 — pull happens automatically if it's missing",
        "docker build lucy/myapp:1.0",
        "docker compose lucy/myapp:1.0"
      ],
      "docker run lucy/myapp:1.0 — pull happens automatically if it's missing",
      "run pulls on demand; an explicit docker pull first is optional."
    )
  ]),

  ...attach("docker-production", [
    mcq(
      "What is a multi-stage build?",
      [
        "Compiling in one stage, then copying only the artifacts into a slim final image",
        "Building the same image three times for safety",
        "Running multiple CMD instructions in sequence"
      ],
      "Compiling in one stage, then copying only the artifacts into a slim final image",
      "Build tools, compilers, and dev dependencies never ship to production."
    ),
    fill(
      "Copy the built output from the build stage into the final image.",
      "COPY __1__=build /app/dist ./dist",
      [{ label: "__1__", answers: ["--from"] }],
      "COPY --from=build reaches into the earlier stage named with AS build."
    ),
    fill(
      "Name the first stage so later stages can reference it.",
      "FROM node:20 __1__ build",
      [{ label: "__1__", answers: ["AS", "as"] }],
      "FROM ... AS build names the stage for COPY --from=build."
    ),
    mcq(
      "Why run the final container as a non-root user (USER node)?",
      [
        "A compromised app then has limited power inside the container and on the host",
        "Root users make containers slower",
        "Docker refuses to start root containers"
      ],
      "A compromised app then has limited power inside the container and on the host",
      "Least privilege: containers share the host kernel, so root in the container is worth real caution."
    ),
    tf(
      "Deleting a secret file in a LATER Dockerfile layer removes it from the image.",
      false,
      "Layers are append-only — the file still exists in the earlier layer for anyone who looks. Never COPY secrets in."
    ),
    mcq(
      "How should a production container receive its database password?",
      [
        "Via environment variables or a secret store at runtime",
        "Hard-coded in the Dockerfile with ENV",
        "Committed in a config file COPYed into the image"
      ],
      "Via environment variables or a secret store at runtime",
      "Images are shared artifacts; secrets are injected where the container runs."
    ),
    mcq(
      "Why prefer node:20-alpine or -slim bases for the final image?",
      [
        "Far smaller images: faster pulls and deploys, less attack surface",
        "Alpine images cannot crash",
        "Full images are not allowed in registries"
      ],
      "Far smaller images: faster pulls and deploys, less attack surface",
      "A 1.1 GB image vs 140 MB matters at every deploy and in every CVE scan."
    ),
    fill(
      "Drop privileges before the app starts.",
      "__1__ node",
      [{ label: "__1__", answers: ["USER"] }],
      "USER switches the user for all later instructions and the running container."
    ),
    tf(
      "A HEALTHCHECK instruction lets Docker (and orchestrators) detect a container that is running but no longer serving.",
      true,
      "A process can be alive while the app is wedged — healthchecks probe actual behavior."
    ),
    mcq(
      "Which is the best production image-building checklist?",
      [
        "Pinned slim base, multi-stage build, non-root USER, no secrets in layers, healthcheck",
        "Biggest base image, latest tag, root user for flexibility",
        "One stage, secrets baked in for convenience, no tags"
      ],
      "Pinned slim base, multi-stage build, non-root USER, no secrets in layers, healthcheck",
      "Small, reproducible, unprivileged, observable — the four habits of production images."
    )
  ])
];
