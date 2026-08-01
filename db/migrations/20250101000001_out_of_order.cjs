// Deliberately named so it sorts BEFORE the existing 20260101000001 migration.
// migration-checks must reject this: knex runs migrations in filename order, so
// this would run out of order on any database that already applied the later one.
exports.up = async (knex) => {
  await knex.schema.createTable('demo_out_of_order', (t) => t.increments('id'))
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('demo_out_of_order')
}
