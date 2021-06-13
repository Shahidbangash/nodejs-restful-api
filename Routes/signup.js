var User = require("./Models/User");

function signUp(request) {
  console.log(req.body);
  const addedUser = new User(req.body);
  addedUser.save((error) => {
    if (error) {
      return `Error ${error}`;
    } else {
      return "Sucesss";
    }
  });
}
