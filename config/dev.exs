use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :lunatube, LunaTube.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  reloadable_paths: ["api"],
  check_origin: false,
  watchers: []

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development.
# Do not configure such in production as keeping
# and calculating stacktraces is usually expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :lunatube, LunaTube.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "homestead",
  password: "secret",
  database: "lunatube_dev",
  hostname: "localhost",
  port: 54320,
  pool_size: 10
