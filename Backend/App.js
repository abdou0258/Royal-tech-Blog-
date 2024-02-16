const express = require("express");
const app = express();

const isAuth = require("./middleware/isAuth");
const adminRouter = require("./routes/admin");
const blogsRouter = require("./routes/blogs");
const subscribersRoute = require("./routes/subscribe");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const port = process.env.PORT || 5000;
const connectDB = require("./database/db");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();

//security
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store = new MongoDBSession({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
});

app.use(
  session({
    secret: "myseceret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 4 * 60 * 60 * 1000,
    },
  })
);
//routes

app.use("/admin", adminRouter);
app.use("/admin/blogs", isAuth);
app.use("/subscribers", subscribersRoute);
app.use("/blogs/myblogs", blogsRouter);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

//errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
require("express-async-errors");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error.message);
  }
};

start();
