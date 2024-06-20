/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('incidents',function(table){
        table.increments();
        table.string('title').notNullable();
        table.string('descrition').notNullable();
        table.decimal('value').notNullable();

        table.string('ongid').notNullable;

        table.foreign('ongid').references('id').inTable('ongs');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   knex.schema.dropTable('incidents');
};
