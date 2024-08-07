import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  Query: {
    // all the data of each type
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },

    // single data of each type
    review(_, args) {
      return db.reviews.find((r) => r.id === args.id);
    },
    author(_, args) {
      return db.authors.find((r) => args.id === args.id);
    },
    game(_, args) {
      return db.games.find((r) => r.id === args.id);
    },
  },

  // nested queries
  Game: {
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((a) => a.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((g) => g.id === parent.game_id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id);
    },
    gamesReviewed(parent) {
      console.log(db.reviews.filter((r) => r.author_id === parent.id));
      const initialReturn = db.reviews.filter((r) => r.author_id === parent.id);
      return initialReturn.map((eI) => {
        // console.log('line 55', db.games.find((g) => g.id === eI.game_id).title)
        // // db.games.find((g) => g.id === eI.game_id)
        return db.games.find((g) => g.id === eI.game_id);
      });
    },
  },

  Mutation: {
    deleteGame(_, args) {
      return db.games.filter((g) => g.id !== args.id);
    },
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(game);
      return game;
    },
    addAuthor(_, args) {
      let author = {
        ...args.author,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.authors.push(author);

      return author;
    },

    updateGame(_, args) {
      let x;
      db.games.map((g) => {
        if (g.id === args.id) {
          x = { ...g, ...args.edit };
          return x;
        } else {
          return g;
        }
      });
      return x;
    },
  },
};

// server setup
const server = new ApolloServer({
  // type defs
  typeDefs,
  // resolvers
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server ready at port", `http://localhost:${4000}`);
