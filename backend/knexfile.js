module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 8080, 
      user: 'root',
      password: 'root',
      database: 'budget_tracker'
    },
    migrations: {
      directory: './migrations'
    }
  }
};
