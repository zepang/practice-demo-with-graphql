import logger from '../../helpers/logger'

export default function resolver ({ db }) {
  const { Post, User, Chat, Message, Sequelize } = db
  const resolvers = {
    User: {
      messages (user, args, context) {
        return user.getMessages()
      },
      chats (user, args, context) {
        return user.getChats()
      }
    },
    Post: {
      user (post, args, context) {
        return post.getUser()
      }
    },
    Message: {
      user (message, args, context) {
        return message.getUser()
      }
    },
    Chat: {
      messages (chat, args, context) {
        return chat.getMessages({ order: [['id', 'ASC']] })
      },
      users (chat, args, context) {
        return chat.getUsers()
      },
      lastMessage (chat, args, context) {
        return chat.getMessages({ limit: 1, order: [['id', 'DESC']] }).then(message => {
          return message[0]
        })
      }
    },
    RootQuery: {
      postsFeed (root, { page, limit }, context) {
        let skip = 0
        if (page && limit) {
          skip = page * limit
        }

        const query = {
          order: [['createdAt', 'DESC']],
          offset: skip
        }

        if (limit) {
          query.limit = limit
        }

        return {
          posts: Post.findAll(query)
        }
      },
      userSearch (root, { page, limit, text }, context) {
        if (text.length < 3) {
          return {
            users: []
          }
        }

        let skip = 0
        if (page && limit) {
          skip = page * limit
        }
        const query = {
          order: [['createdAt', 'DESC']],
          offset: skip
        }

        const { Op } = Sequelize

        if (limit) {
          query.limit = limit
        }

        query.where = {
          username: {
            [Op.like]: '%' + text + '%'
          }
        }

        return {
          users: User.findAll(query)
        }
      },
      posts (root, args, context) {
        return Post.findAll({ order: [['createdAt', 'DESC']] })
      },
      chats (root, args, context) {
        return User.findAll().then(users => {
          if (!users.length) {
            return []
          }
          const usersRow = users[0]
          return Chat.findAll({
            include: [{
              model: User,
              required: true,
              through: { where: { userId: usersRow.id } }
            }, {
              model: Message
            }]
          })
        })
      },
      chat (root, { chatId }, context) {
        return Chat.findByPk(chatId, {
          include: [{
            model: User,
            required: true
          }, {
            model: Message
          }]
        })
      }
    },
    RootMutation: {
      addPost (root, args, context) {
        const { post } = args
        logger.log({ level: 'info', message: 'Post was created' })
        return User.findAll().then(users => {
          const usersRow = users[0]
          return Post.create({
            ...post
          }).then(newPost => {
            return Promise.all([
              newPost.setUser(usersRow.id)
            ]).then(() => {
              return newPost
            })
          })
        })
      },
      addChat (root, { chat }, context) {
        logger.info({
          level: 'info',
          message: 'Message was created'
        })
        return Chat.create().then(newChat => {
          return Promise.all([
            newChat.setUsers(chat.users)
          ]).then(() => {
            return newChat
          })
        })
      },
      addMessage (root, { message }, context) {
        logger.log({
          level: 'info',
          message: 'Message was created'
        })

        return User.findAll().then(users => {
          const usersRow = users[0]
          return Message.create({
            ...message
          }).then(newMessage => {
            return Promise.all([
              newMessage.setUser(usersRow.id),
              newMessage.setChat(message.chatId)
            ]).then(() => {
              return newMessage
            })
          })
        })
      },
      updatePost (root, { post, postId }, content) {
        return Post.update({
          ...post
        }, {
          where: {
            id: postId
          }
        }).then(rows => {
          if (rows[0] === 1) {
            logger.log({
              level: 'info',
              message: 'Post' + postId + 'was updated'
            })

            return Post.findByPk(postId)
          }
        })
      },
      deletePost (root, { postId }, content) {
        return Post.destroy({
          where: {
            id: postId
          }
        }).then(rows => {
          if (rows === 1) {
            logger.log({
              level: 'info',
              message: 'Post' + postId + 'deleted'
            })
            return { success: true }
          } else {
            return { success: false }
          }
        }, error => {
          logger.log({
            level: 'error',
            message: error.message
          })
        })
      }
    }
  }
  return resolvers
}
