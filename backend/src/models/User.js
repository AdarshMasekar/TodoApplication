const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    membership: {
        type: String,
        enum: ["silver", "gold", "diamond"],
        default: "silver"
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    status: {
        type: String,
        enum: ["active", "suspended", "deleted"],
        default: "active"
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    avatar: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    todos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Todo"
        }
    ]
}, { timestamps: true });

// Set membership dynamically based on role
userSchema.pre('save', function(next) {
    if (!this.membership) {
        this.membership = this.role === 'admin' ? 'diamond' : 'silver';
    }
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
