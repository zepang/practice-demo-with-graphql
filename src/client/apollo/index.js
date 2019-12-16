import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import gql from 'graphql-tag'

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
})

console.log(client)

// client.query({
//   query: gql`
//   {
//     posts {
//       id
//       text
//       user {
//         avatar
//         username
//       }
//     }
//   }
//   `
// }).then(res => console.log(res))

export default client
