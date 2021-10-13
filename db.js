var mongoose = require("mongoose");

require("dotenv").config();


const dbPassword = process.env.DBPASSWORD;
const dbUser = process.env.dbUser;
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.hhdhg.mongodb.net/gardening?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log(mongoose.ConnectionStates);
    console.log(`error ${error}`);
  });
