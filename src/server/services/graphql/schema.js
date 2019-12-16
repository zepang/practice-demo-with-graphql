const typeDefinitions = `
type PostFeed {
  posts: [Post]
}

type User {
  id: Int
  avatar: String
  username: String
  messages: [Message]
  chats: [Chat]
}

type Post {
  id: Int
  text: String,
  user: User
}

type Message {
  id: Int
  text: String
  chat: Chat
  user: User
}

type Chat {
  id: Int
  messages: [Message],
  users: [User]
  lastMessage: Message
}

type UserSearch {
  users: [User]
}

type RootQuery {
  posts: [Post]
  chats: [Chat]
  chat(chatId:Int): Chat
  postsFeed(
    page: Int,
    limit: Int
  ):PostFeed
  userSearch(
    page: Int,
    limit: Int,
    text: String!
  ):UserSearch
}

input PostInput {
  text: String!
}

input UserInput {
  avatar: String!
  username: String!
}

input ChatInput {
  users: [Int]
}

input MessageInput {
  text: String!
  chatId: Int!
}

type Response {
  success: Boolean
}

type RootMutation {
  addPost(
    post: PostInput!
  ):Post
  addChat(
    chat: ChatInput!
  ):Chat
  addMessage(
    message: MessageInput!
  ):Message
  updatePost(
    post: PostInput!
    postId: Int!
  ):Post
  deletePost(
    postId: Int!
  ):Response
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`

export default [typeDefinitions]
