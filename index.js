const { graphqlHTTP } = require('express-graphql');
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = 3000;

const graphql = require('./helpers/graphql');

mongoose.connect(
    `connectionString`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
mongoose.connection.once('open', () => console.log('Database connected'));

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/graphql", graphqlHTTP({
    schema: graphql,
    graphiql: true
}));
app.listen(PORT, () => console.log(`App is running on ${PORT}`));