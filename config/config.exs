# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the namespace used by Phoenix generators
config :lunatube,
  app_namespace: LunaTube

# Configures the endpoint
config :lunatube, LunaTube.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "V1OdlebP1K2w/33z9XC0BZqEzePVv5v3l+2UWZBpdfNLSA5Mce0qsVk4o5NTdCVT",
  render_errors: [accepts: ~w(json)],
  pubsub: [name: LunaTube.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configures the tokens from Guardian
config :guardian, Guardian,
  allowed_algos: ["HS512"],
  verify_module: Guardian.JWT,
  issuer: "LunaTube",
  ttl: { 30, :days },
  verify_issuer: true,
  serializer: LunaTube.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Import relevant config secrets. Acts the same as .env files
import_config "config.secrets.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false
