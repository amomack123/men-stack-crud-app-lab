const express = require('express');
const router = express.Router();
const Car = require('../models/carSchema');

// Index route
router.get('/', async (req, res) => {
  const cars = await Car.find();
  res.render('index', { cars });
});

// New route
router.get('/new', (req, res) => {
  res.render('new');
});

// Create route
router.post('/', async (req, res) => {
  const newCar = new Car(req.body);
  await newCar.save();
  res.redirect('/cars');
});

// Show route
router.get('/:id', async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.render('show', { car });
});

// Edit route
router.get('/:id/edit', async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.render('edit', { car });
});

// Update route
router.put('/:id', async (req, res) => {
  await Car.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/cars/${req.params.id}`);
});

// Destroy route
router.delete('/:id', async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.redirect('/cars');
});

module.exports = router;
