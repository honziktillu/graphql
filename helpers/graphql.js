const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    releaseDate: { type: GraphQLInt },
    price: { type: GraphQLInt },
    pages: { type: GraphQLInt },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorID);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    dateOfBirth: { type: GraphQLInt },
    quote: { type: GraphQLString },
    description: { type: GraphQLString },
    book: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorID: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find();
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        dateOfBirth: { type: GraphQLInt },
        quote: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          dateOfBirth: args.dateOfBirth,
          quote: args.quote,
          description: args.description
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        releaseDate: { type: new GraphQLNonNull(GraphQLInt) },
        authorID: { type: new GraphQLNonNull(GraphQLID) },
        pages: { type: GraphQLInt },
        price: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          releaseDate: args.releaseDate,
          authorID: args.authorID,
          pages: args.pages,
          price: args.price
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});


/*
Create Authors
POST /graphql
mutation {
    addAuthor(
        name:"J.K. Rowling",
        dateOfBirth: 1965,
        quote: "Always",
        description: "Joanne Rowling CH OBE FRSL, also known by her pen name J. K. Rowling, is a British author and philanthropist. She wrote Harry Potter, a seven-volume children's fantasy series published from 1997 to 2007.",
    ){
        name,
        dateOfBirth,
        quote,
        description
    }
}

POST /graphql
mutation {
    addAuthor(
        name: "George R. R. Martin",
        dateOfBirth: 1948,
        description: "George Raymond Richard Martin, also known as GRRM, is an American novelist, screenwriter, television producer and short story writer.",
    ){
        name,
        dateOfBirth,
        description
    }
}

Query Authors
query {
    author(
        id: "ObjectID",
    ) {
        id,
        name,
        dateOfBirth,
        quote,
        description
    }
}

query {
    authors {
        id,
        name,
        dateOfBirth,
        quote,
        description
    }
}

Create Books
POST /graphql
mutation {
    addBook(
        name: "Harry Potter and the Philosopher's Stone",
        releaseDate: 1997,
        authorID: "ObjectId",
        pages: 223,
        price: 999
    ) {
        name,
        releaseDate,
        pages,
        price,
        author {
            id,
            name,
            dateOfBirth,
            quote,
            description
        }
    }
}

Query Books
query {
    books {
        id,
        name,
        pages,
        releaseDate,
        price
    }
}

query {
    book(
        id: "ObjectID"
    ) {
        id,
        name,
        pages,
        releaseDate,
        price
    }
}

query {
    book(
        id: "ObjectID"
    ) {
        id,
        name,
        pages,
        releaseDate,
        price,
        author {
            id
            name,
            quote,
            dateOfBirth,
            description
        }
    }
}
*/