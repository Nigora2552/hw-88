import mongoose, {Document, HydratedDocument, Model} from "mongoose";
import {UserFields} from "../types";
import jwt from "jsonwebtoken";
import config from "../config";
import argon2 from "argon2";

interface userMethods {
    checkPassword: (password: string) => Promise<boolean>;
    generateAuthToken: () => void;
}

type UserModel = Model<UserFields, {}, userMethods>

const UserSchema = new mongoose.Schema<HydratedDocument<UserFields>,
    UserModel,
    userMethods,
    {}>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    token: {
        type: String,
        required: true,
    }
});

UserSchema.path('username').validate({
    validator: async function (this: Document, value: string) {
        if (!this.isModified('username')) return true;

        const user = await User.findOne({username: value});
        return !user;
    },
    message: 'Username is already exists.Please choose another one'
});

UserSchema.methods.checkPassword = function (password: string) {
    return argon2.verify(this.password, password);
};

UserSchema.methods.generateAuthToken = function () {
    this.token = jwt.sign({_id: this._id}, config.jwtSecret, {expiresIn: '1h'});
};

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    try {
        this.password = await argon2.hash(this.password);
    } catch (e) {
        throw new Error('Error hashing password');
    }
});

UserSchema.set('toJSON', {
    transform: (_doc, ret, _options) => {
        const {password, ...rest} = ret
        return rest;
    }
})

const User = mongoose.model('User', UserSchema);
export default User;