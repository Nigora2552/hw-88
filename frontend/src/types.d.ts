export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string
}

export interface GlobalError {
    error: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface IPosts{
    user: User;
    _id: string;
    title: '',
    description: '',
    image: string | null;
    createdAt: string;
}

export interface PostMutation{
    title: '',
    description: '',
    image: File | null;
    createdAt?: string  ;
}

export interface IComments{
    _id: string;
    user: User;
    post:IPosts;
    description: string,
}

export interface CommentMutation{
    description: '',
    post?: string;
}