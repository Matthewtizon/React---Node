const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'node-backend',
    password: 'johnmatthew300',
    port: '5432'
});

module.exports = pool;