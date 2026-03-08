import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exist'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
            'Please fill a valid email address'
        ],

    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'username already exists'],
        match: [
            /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/,
            'Please fill a valid username'
        ]
    },
    avatar: {
        type: String,

    }
}, {timestamps: true});


userSchema.pre('save', function saveUser(next) {
    const user = this;
    user.avatar = `https://robohash.org/${user.username}`;
    next();
})


const User = mongoose.model('users', userSchema);


export default User;