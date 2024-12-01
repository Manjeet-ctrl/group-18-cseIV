const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For hashing passwords

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 10); // Hash with salt rounds
	next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;

