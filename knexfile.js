// Knex config for the migration-checks canary. Connection defaults match the
// docker-compose `postgres` service so `npm run db:migrate` works both locally
// and in CI without extra environment variables.
const base = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'hello-world',
  },
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './seeds',
  },
}

module.exports = {
  development: base,
  test: base,
  production: base,
}
