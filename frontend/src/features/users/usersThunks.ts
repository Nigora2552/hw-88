import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {GlobalError, LoginMutation, RegisterMutation, User, ValidationError} from "../../types";
import {isAxiosError} from "axios";
import {toast} from "react-toastify";

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>('users/register',
    async (registerMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<{ user: User, message: string }>('/users', registerMutation);
            toast.success(response.data.message);
            return response.data.user
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    });

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError }>('users/login',
    async (loginMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<{ user: User, message: string }>('/users/sessions', loginMutation);
            toast.success(response.data.message);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }
            throw e;
        }
    });