//const { ApolloServer, gql } = require("apollo-server");

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");

const connectDB = require("./config/db");

const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "variables.env" });

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers["authorization"] || "";

    if (token) {
      try {
        const usuario = jwt.verify(
          token.replace("Bearer ", ""),
          process.env.JWT_SECRET
        );

        return {
          usuario,
        };
      } catch (error) {
        console.log(error);
      }
    }
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log("server listo en ${url} ");
});
