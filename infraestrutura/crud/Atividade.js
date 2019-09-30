const executaQuery = require('../database/queries')

class Atividade {
  lista() {
    const sql = 'SELECT * FROM atividade';

    return executaQuery(sql).then(objetos => {

        return objetos.map(objeto => ({
          id: objeto.id,
          modalidade: objeto.modalidade,
          tipo: objeto.tipo,
          tema: objeto.tema,
          decs: objeto.cod_decs,
          moderador: objeto.moderador,
          descricao: objeto.descricao,
          dtdispo: objeto.dt,
          hr_inicio: objeto.hr_inicio,
          hr_termino: objeto.hr_termino,
          local: objeto.local,
          status: objeto.status                
        }))
    })
  }

  buscaPorId(id) {
    const sql = `SELECT Pets.id, Pets.nome, Pets.tipo, Pets.observacoes, Clientes.id as donoId, Clientes.nome as donoNome, Clientes.cpf as donoCpf FROM Pets INNER JOIN Clientes WHERE Pets.id=${parseInt(id)} AND Clientes.id = Pets.donoId`

    return executaQuery(sql).then(pets => ({
        id: pets[0].id,
        nome: pets[0].nome,
        tipo: pets[0].tipo,
        observacoes: pets[0].observacoes,
        dono: {
            id: pets[0].donoId,
            nome: pets[0].donoNome,
            cpf: pets[0].donoCpf
        }
    }))
  }

  adiciona(item) {
    console.log(item);
    const { nome, donoId, tipo, observacoes } = item

    console.log(nome)
    console.log(donoId)
    console.log(tipo)
    console.log(observacoes)

    const sql = `INSERT INTO Pets(nome, donoId, tipo, observacoes) VALUES('${nome}', ${donoId}, '${tipo}', '${observacoes}')`

    return executaQuery(sql).then(resposta => 
      ({
          id: resposta.insertId,
          nome,
          donoId,
          tipo,
          observacoes
      }))
  }

  atualiza(novoItem) {
    const { id, nome, donoId, tipo, observacoes } = novoItem

    const sql = `UPDATE Pets SET nome='${nome}', donoId=${donoId}, tipo='${tipo}', observacoes='${observacoes}' WHERE id=${id}; SELECT * FROM Clientes WHERE id=${donoId}`

    return executaQuery(sql).then(dados => {
      const dono = dados[1][0]

      return ({
        ...novoItem, 
        dono
      })
    })
  }

  deleta(id) {
    const sql = `DELETE FROM Pets WHERE id=${id}`

    return executaQuery(sql).then(() => id)
  }
}

module.exports = new Atividade
