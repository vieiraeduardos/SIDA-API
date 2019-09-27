const executaQuery = require('../database/queries')

class Cliente {
  lista() {
    const sql = 'SELECT * FROM objeto_aprendizagem'

    return executaQuery(sql).then(dados => {
        const objetos = dados
    
        return objetos.map(objeto => ({
          id: objeto.id,
          tema: objeto.tema,
          dtdispo: objeto.data,
          finalidade: objeto.finalidade,
          atividade: objeto.atividade,
          dplataf: objeto.disp_telessaude,
          dares: objeto.disp_ares, 
          url_ares: objeto.url_ares, 
          url_youtube: objeto.url_youtube, 
          davasus: objeto.disp_avasus, 
          drsociais: objeto.disp_rede_social, 
          doutros: objeto.disp_outros, 
          tipo: objeto.tipo, 
          decs: objeto.tema_decs, 
          num: objeto.num_acesso
          
        }))
    })
  }

  buscaPorId(id) {
    const sql = `SELECT * FROM Clientes WHERE id=${id}; SELECT * FROM objetos WHERE donoId=${id}`

    return executaQuery(sql).then(dados => {
        const cliente = dados[0][0]
        const objetos = dados[1]

        return ({
            ...cliente,
            objetos
        })
    })
  }

  adiciona(item) {
    const { nome, cpf } = item
    const sql = `INSERT INTO Clientes(nome, CPF) VALUES('${nome}', '${cpf}')`

    return executaQuery(sql).then(resposta =>
      ({
        id: resposta.insertId,
        nome,
        cpf

      })  
    )
  }

  atualiza(novoItem) {
    const {id, nome, cpf } = novoItem
    const sql = `UPDATE Clientes SET nome='${nome}', CPF='${cpf}' WHERE id=${id}`

    return executaQuery(sql).then(() => novoItem);
  }

  deleta(id) {
    const sql = `DELETE FROM Clientes WHERE id=${id}`

    return executaQuery(sql).then(() => id);
  }
}

module.exports = new Cliente
