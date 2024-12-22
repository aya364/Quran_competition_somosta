const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/quran_competition', { useNewUrlParser: true, useUnifiedTopology: true });

const users = [
  { username: 'aya ashraf', password: '1234' },
  { username: 'ashraf ali', password: '123456' },
];

const addUsers = async () => {
  for (const user of users) {
    const newUser = new User(user);
    await newUser.save();
  }
  console.log('Users added');
  mongoose.connection.close();
};

addUsers();