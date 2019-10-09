const executaQuery = require('../database/queries')

class Estabelecimento {
  lista(res) {
    const sql = 'SELECT * FROM ubs'

    return executaQuery(sql).then(dados => {
      const objetos = dados
  
      return objetos.map(objeto => ({
        cnes: objeto.cnes,
        nome: objeto.nome,
        tconsul: 1,
        tdiagn: 0,
        teduca: 0,
        
      }))
    })
  }

  buscaPorId(res, id) {
    const sql = `SELECT * FROM Servicos WHERE id=${parseInt(id)}`

    executaQuery(res, sql)
  }

  adiciona(res, item) {
    const { nome, preco, descricao } = item
    const sql = `INSERT INTO Servicos(nome, Preco, Descricao) VALUES('${nome}', ${preco}, '${descricao}')`

    executaQuery(res, sql)
  }

  atualiza(res, novoItem, id) {
    const { nome, preco, descricao } = novoItem
    const sql = `UPDATE Servicos SET nome='${nome}', Preco=${preco}, Descricao='${descricao}' WHERE id=${id}`

    executaQuery(res, sql)
  }

  deleta(res, id) {
    const sql = `DELETE FROM Servicos WHERE id=${id}`

    executaQuery(res, sql)
  }
}

module.exports = new Estabelecimento
