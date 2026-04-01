import mongoose, {Document, HydratedDocument, Model} from "mongoose";
import {UserFields} from "../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config";

const SALT_WORK_FACTOR = 10;

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
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAuthToken = function () {
    this.token = jwt.sign({_id: this._id}, config.jwtSecret, {expiresIn: '1h'});
};

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
});

UserSchema.set('toJSON', {
    transform: (_doc, ret, _options) => {
        const {password, ...rest} = ret
        return rest;
    }
})

const User = mongoose.model('User', UserSchema);
export default User;