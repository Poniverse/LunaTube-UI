ExUnit.start

Mix.Task.run "ecto.create", ~w(-r LunaTube.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r LunaTube.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(LunaTube.Repo)

