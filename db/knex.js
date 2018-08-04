import knexConfig from '../knexfile';
import knex from 'knex';

var environment = process.env.NODE_ENV || 'development';
var config = knexConfig[environment];

export default knex(config);