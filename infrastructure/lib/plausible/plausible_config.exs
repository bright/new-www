import Config

config :plausible, Plausible.Mailer,
  ssl: [middlebox_comp_mode: false]
