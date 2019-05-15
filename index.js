const { GraphQLServer } = require("graphql-yoga");
const db = require("./db.json");

const typeDefs = `
    type User {
        id: ID!
        firstname: String!
        lastname: String!
        bio: String!
        age: Int
        bookslist: [Book]
    }
    type Book {
        id: ID!
        name: String!
        description: String!
        genre: String!
        author: String!
    }
    type Query {
        getUsers: [User]
        getBooks: [Book]
    }    
`;

const resolvers = {
  Query: {
    getUsers: () => {
      const users = [];
      for (let user in db.users) {
        users.push({
          id: user,
          firstname: db.users[user].firstname,
          lastname: db.users[user].lastname,
          bio: db.users[user].bio,
          age: db.users[user].age,
          bookslist: db.users[user].bookslist
        });
      }
      return users;
    },
    getBooks: () => {
      const books = [];
      for (let book in db.books) {
        books.push({
          id: book,
          name: db.books[book].name,
          description: db.books[book].description,
          genre: db.books[book].genre,
          author: db.books[book].author
        });
      }
      return books;
    }
  },
  User: {
    bookslist: user => {
      const books = [];
      for (let i = 0; i < user.bookslist.length; i++) {
        const book = db.books[user.bookslist[i]];
        if (Object.keys(book).length) {
          books.push({
            id: user.bookslist[i],
            name: book.name,
            description: book.description,
            genre: book.genre,
            author: book.author
          });
        }
      }
      return books;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log(`Server is running on port 4000`));
