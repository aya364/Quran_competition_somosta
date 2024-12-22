
const express = require('express');
const multer = require('multer');
const path = require('path');
const Registration = require('../models/Registration');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('birthCertificate'), async (req, res) => {
  try {
    const { name, country, phone, dob, parts } = req.body;
    const birthCertificate = req.file.path;

    const newRegistration = new Registration({
      name,
      country,
      phone,
      dob,
      parts,
      birthCertificate,
    });

    await newRegistration.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});







router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Registration.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedRegistration = await Registration.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(updatedRegistration);
  } catch (error) {
    console.error('Error updating registration:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});



module.exports = router;