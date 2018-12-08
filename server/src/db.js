const { Prisma } = require('prisma-binding');

/**
 *
 *  The object acts as a bridge to connect to the prisma DB and
 *  query it using regular JS.
 *
 */

module.exports = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: true,
});
