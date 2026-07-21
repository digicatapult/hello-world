/**
 * Smoke seed for the migration-checks canary: leaves one representative
 * widgets row so the seeded-upgrade job migrates a non-empty table once this
 * setup is on the base branch.
 *
 * @param {import('knex').Knex} knex
 */
exports.seed = async function seed(knex) {
  await knex('widgets').del()
  await knex('widgets').insert([
    { id: '40000000-0000-0000-0000-000000000001', name: 'smoke-widget', status: 'active' },
  ])
}
