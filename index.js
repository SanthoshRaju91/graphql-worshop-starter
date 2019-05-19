const { GraphQLServer } = require("graphql-yoga");
const db = require("./db.json");

const typeDefs = ``;

const resolvers = {};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log(`Server is running on port 4000`));
