const router = require('express').Router();
var System = require('../models/system.model')

router.route('/').get((req, res) => {
  System.find()
    .then(systems => res.json(systems))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const kwh = req.body.kwh;
  const area = req.body.area;
  const loadsupport = req.body.loadsupport;
  

  const newSystem = new System({
    area,
    kwh,
    loadsupport
  });

  newSystem.save()
  .then(() => res.json('System added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  System.findById(req.params.id)
    .then(system => res.json(system))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  System.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  System.findById(req.params.id)
    .then(system => {
      system.area = req.body.area;
      system.kwh = req.body.kwh;
      system.loadsupport = req.body.loadsupport;

      system.save()
        .then(() => res.json('System updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;