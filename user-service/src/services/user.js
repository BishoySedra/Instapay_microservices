const User = require('../models/User');

exports.getUserById = async (id) => {
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
}

exports.getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('user not found');
    }
    return user;
}
