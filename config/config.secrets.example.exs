use Mix.Config

# In this file, we keep various configuration options
# that you likely want to automate and keep it away from
# your VCS repository such as database credentials,
# oauth keys.

# Configure the secret key used for various encryption
config :lunatube, LunaTube.Endpoint,
  secret_key_base: "SECRET_KEY_BASE"

# Configure your database
config :lunatube, LunaTube.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "DB_USERNAME",
  password: "DB_PASSWORD",
  database: "DB_DATABASE_NAME",
  hostname: "DB_HOSTNAME",
  pool_size: 20

# Poniverse Auth config
config :lunatube, Poniverse.Auth,
  client_id: "PONIVERSE_CLIENT_ID",
  client_secret: "PONIVERSE_CLIENT_SECRET",
  redirect_uri: "REDIRECT_URI"

# Secret key for guardian tokens
config :guardian, Guardian,
  secret_key: "SECRET_KEY" # Geneate a key using mix phoenix.gen.secret
