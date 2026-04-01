import {NextFunction, Request, Response} from "express"
import {HydratedDocument} from "mongoose";
import {UserFields} from "../types";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";

export interface RequestWithUser extends Request {
    user: HydratedDocument<UserFields>;
}

const auth = async (expressReq: Request, res: Response, next: NextFunction) => {
    try {
        const req = expressReq as RequestWithUser;

        const token = req.get('Authorization')?.replace("Bearer", '')
        console.log(token)
        if (!token) return res.status(401).send({error: 'No token present'});

        const decoded = jwt.verify(token, config.jwtSecret) as { _id: string };
        const user = await User.findOne({_id: decoded._id}, token);

        if (!user) return res.status(401).send({error: 'No such user'});

        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({error: "Please authenticate"})
    }

}

export default auth;