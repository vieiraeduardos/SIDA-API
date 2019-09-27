const { GraphQLServer } = require('graphql-yoga')

const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')
const Operacoes = require('./infraestrutura/operations')

const Clientes = new Operacoes('cliente');
const Pets = new Operacoes('pet');

const resolvers = {
  Query: {
    objetosDeAprendizagem: () => Clientes.lista()

  }
}

const servidor = new GraphQLServer({
  resolvers,
  typeDefs: './schema.graphql'
})

servidor.start(() => console.log('Servidor ouvindo'))

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('conectou no banco')

  //Tabelas.init(conexao)
})

