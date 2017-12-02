const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

UserSchema.methods.apiRepr = function() {
    return {
        email: this.email || '',
        id: this._id || ''
    };
};

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
