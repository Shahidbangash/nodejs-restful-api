var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require("../Models/User");

// RETURNS ALL THE USERS IN THE DATABASE
router.get("/", function (req, res) {
  User.find({}, function (err, users) {
    if (err)
      return res
        .status(500)
        .send(`There was a problem finding the users. ${err}`);
    res.status(200).send(users);
  });
});

// CREATES A NEW USER
router.post("/addUser", function (req, res) {
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      password: req.body.password,
    },
    function (err, user) {
      if (err)
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      res.status(200).send(`user added successfully`);
    }
  );
});

// GETS A SINGLE USER FROM THE DATABASE
router.get("/searchUser", function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });
});

// DELETES A USER FROM THE DATABASE
router.delete("/DeleteUser", function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err)
      return res.status(500).send("There was a problem deleting the user.");
    res.status(200).send("User: " + user.name + " was deleted.");
  });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put("/updateUser", function (req, res) {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function (err, user) {
      if (err)
        return res.status(500).send("There was a problem updating the user.");
      res.status(200).send(user);
    }
  );
});

// Garden

// RETURNS ALL THE Gardens IN THE DATABASE
router.get("/gardens", function (req, res) {
  Garden.find({}, function (err, gardens) {
    if (err)
      return res.status(500).send("There was a problem finding the Garden.");
    res.status(200).send(gardens);
  });
});

// CREATES A NEW Garden
router.post("/addGarden", function (req, res) {
  User.create(
    {
      name: req.body.name,
      createdBy: req.body.userID,
      length: req.body.length,
      width: req.body.width,
    },
    function (err, obj) {
      if (err)
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      res.status(200).send(`Garden added successfully`);
    }
  );
});

// GETS A SINGLE Garden FROM THE DATABASE
router.get("/searchGarden", function (req, res) {
  Garden.findById(req.params.id, function (err, garden) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!garden) return res.status(404).send(`No Garden with ${id} found`);
    res.status(200).send(garden);
  });
});

// DELETES A Garden FROM THE DATABASE
router.delete("/DeleteGarden", function (req, res) {
  Garden.findByIdAndRemove(req.params.id, function (err, garden) {
    if (err)
      return res.status(500).send("There was a problem deleting the Garden.");
    res.status(200).send("Garden: " + garden.name + " was deleted.");
  });
});

// UPDATES A SINGLE Garden IN THE DATABASE
router.put("/updateGarden", function (req, res) {
  Garden.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function (err, garden) {
      if (err)
        return res.status(500).send("There was a problem updating the user.");
      res.status(200).send(garden);
    }
  );
});

// RETURNS ALL THE Plants IN THE DATABASE
router.get("/plants", function (req, res) {
  Plant.find({}, function (err, plants) {
    if (err)
      return res.status(500).send("There was a problem finding the Plants.");
    res.status(200).send(plants);
  });
});

// GETS A SINGLE Plants FROM THE DATABASE
router.get("/searchPlants", function (req, res) {
  Plant.findById(req.params.id, function (err, plant) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!plant) return res.status(404).send(`No Plant with ${id} found`);
    res.status(200).send(plant);
  });
});

// UPDATES A SINGLE Garden IN THE DATABASE
router.put("/updatePlants", function (req, res) {
  Plant.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function (err, plant) {
      if (err)
        return res.status(500).send("There was a problem updating the Plant.");
      res.status(200).send(plant);
    }
  );
});

// DELETES A Garden FROM THE DATABASE
router.delete("/DeleteGarden", function (req, res) {
  Plants.findByIdAndRemove(req.params.id, function (err, plant) {
    if (err)
      return res.status(500).send("There was a problem deleting the Plant.");
    res.status(200).send("Garden: " + plant.name + " was deleted.");
  });
});

// CREATES A NEW Garden
router.post("/addPlant", function (req, res) {
  User.create(
    {
      name: req.body.name,
      belongsTo: req.body.gardenID,
      date: new Date(),
      description: req.body.description,
    },
    function (err, obj) {
      if (err)
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      res.status(200).send(`Plant added successfully`);
    }
  );
});

module.exports = router;
