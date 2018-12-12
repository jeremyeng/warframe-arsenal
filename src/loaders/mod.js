import DataLoader from 'dataloader';
import knex from '../../db/knex';

const modLoaders = {
  modById: new DataLoader(ids =>
    knex
      .table('mods')
      .whereIn('mod_id', ids)
      .then(rows =>
        ids.map(id => rows.find(row => row.mod_id === parseInt(id, 10))),
      ),
  ),
};

export default modLoaders;
