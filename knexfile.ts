import type { Knex } from 'knex';

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'monorail.proxy.rlwy.net',
      database: 'railway',
      user: 'postgres',
      password: 'AggbB4g4dcG*2E1*DbdBBE2Bd516FA--',
      port: 58407,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      user: 'postgres',
      database: 'synergy',
      password: '1234',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      user: 'postgres',
      database: 'synergy',
      password: '1234',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default config;
