const mysql = require('mysql')

const conexao = mysql.createConnection({
  host: '10.16.0.223',
  port: 3306,
  user: 'root',
  password: 'Nut1s2012',
  database: 'sints',
  multipleStatements: true
})

module.exports = conexao
