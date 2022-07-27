const { ApolloServer } = require('apollo-server');
const bandSchema = require('./api/band/schema/band.graphql');
const bandResolvers = require('./api/band/resolvers/bandResolvers');
const BandsAPI = require('./api/band/datasource/band');
/*
No resolver é explicito o dado que vc quer que a query retorne, qual a ação que ela vai executar.
Os resolvers são feitos na linguagem em que está utilizando no projeto (no nosso caso JS)

É nos schemas (usando a linguagem de query do GraphQL - SDL schema definition language) que definimos os tipos que precisamos para que a API retorne os dados esperados. Nos resolvers (implementados na própria linguagem da aplicação, no caso JS é implementada a lógica necessária para retornar estes dados.

Scalar Types: String, Boolean, Int, Float, ID
*/
const typeDefs = [bandSchema]
const resolvers = [bandResolvers];

// Cria a instância do nosso server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      bandsAPI: new BandsAPI()
    }
  },
  playground: true,
});

server.listen().then(({url}) => console.log(`Server rodando em ${url}`))
