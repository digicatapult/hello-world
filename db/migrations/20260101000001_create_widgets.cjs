/**
 * First knex migration for the migration-checks canary.
 *
 * Creates a widgets table with a CHECK-constrained `status` column, so the
 * migration-checks-npm workflow has a real schema (and a constraint of the
 * kind that caused the testbed-portal incident) to exercise its roundtrip
 * and seeded-upgrade jobs against.
 *
 * @param {import('knex').Knex} knex
 */
exports.up = async function up(knex) {
  await knex.schema.createTable('widgets', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.text('name').notNullable()
    table.text('status').notNullable().defaultTo('active')
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now())
  })

  await knex.raw(
    "ALTER TABLE widgets ADD CONSTRAINT widgets_status_check CHECK (status IN ('active', 'retired'))"
  )
}

/** @param {import('knex').Knex} knex */
exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists('widgets')
}
