const mongoose = require('mongoose');

   const RegistrationSchema = new mongoose.Schema({
     name: { type: String, required: true },
     country: { type: String, required: true },
     phone: { type: String, required: true },
     dob: { type: Date, required: true },
     parts: { type: Number, required: true },
     birthCertificate: { type: String, required: true },
   });

   module.exports = mongoose.model('Registration', RegistrationSchema);