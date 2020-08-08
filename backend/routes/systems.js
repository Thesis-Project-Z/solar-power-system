const router = require("express").Router();
var System = require("../models/system.model");
const verify = require("./verifyToken");

router.get("/", (req, res) => {
  System.find()
    .then((systems) => res.json(systems[systems.length - 1]))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  console.log(req.body);
  const size = req.body.size;
  const area = req.body.area;

  const newSystem = new System({
    area,
    size,
  });

  newSystem
    .save()
    .then(() => res.json("System added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  System.findById(req.params.id)
    .then((system) => res.json(system))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", (req, res) => {
  System.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/:id", (req, res) => {
  System.findById(req.params.id)
    .then((system) => {
      system.area = req.body.area;
      system.size = req.body.size;

      system
        .save()
        .then(() => res.json("System updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
