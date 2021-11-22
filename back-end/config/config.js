require('dotenv').config()

module.exports = {
  development: {
    "username": process.env.usernameDB,
    "password": process.env.passwordDB,
    "database": process.env.database,
    "host": process.env.host,
    "dialect": "mysql"
  },
  test: {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  production: {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
