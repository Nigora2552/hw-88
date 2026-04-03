import React, {useState} from 'react';
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    Grid,
    Paper
} from '@mui/material';
import FileInput from "../UI/FileInput/FileInput.tsx";
import type {PostMutation} from "../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import {addPost} from "../../features/posts/postsThunk.ts";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

const AddNewPost = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState<PostMutation>({
        title: '',
        description: '',
        image: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.description.trim() && !form.image) {
            toast.error("Please add description or choose image");
            return;
        } else {
            await dispatch(addPost(form));
            setForm({
                title: '',
                description: '',
                image: null,
            });

            navigate('/')
        }

    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if (files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0]
            }))
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper  elevation={3} sx={{p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography component="h1" variant="h5">
                    Add post
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                name="title"
                                fullWidth
                                label="title"
                                autoFocus
                                value={form.title}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                name="description"
                                fullWidth
                                label="description"
                                value={form.description}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={12}>
                            <FileInput
                                label='image'
                                name='image'
                                onChange={fileInputChangeHandler}
                            />
                        </Grid>

                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, py: 1.5}}
                    >
                        Created post
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AddNewPost;