const mysql = require('mysql')

const conexao = mysql.createConnection({
  host: '',
  port: '',
  user: '',
  password: '',
  database: '',
  multipleStatements: true
})

module.exports = conexao
