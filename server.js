const { GraphQLServer } = require('graphql-yoga')

const conexao = require('./infraestrutura/conexao')

const Operacoes = require('./infraestrutura/operations')

const ObjetosDeAprendizagem = new Operacoes('ObjetoDeAprendizagem');

const Atividades = new Operacoes('Atividade');

const resolvers = {
  Query: {
    objetosDeAprendizagem: () => ObjetosDeAprendizagem.lista(),
    atividades: () => Atividades.lista()

  }
}

const servidor = new GraphQLServer({
  resolvers,
  typeDefs: './schema.graphql'
})

servidor.start(() => console.log('O servidor está executando...'))

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('O banco de dados está executando...')

})

