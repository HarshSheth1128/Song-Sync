// Update with your config settings.

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'db',
            user: 'root',
            password: 'password',
            database: 'main',
            port: '3306'
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: `${__dirname}/db/migrations`
        },
        seeds: {
            directory: `${__dirname}/db/seeds`
        },
        debug: true
    }
};
