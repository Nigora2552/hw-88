import React, {useState} from 'react';
import type {CommentMutation} from "../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import {addComment} from "../../features/comments/commentsThunk.ts";
import {Container, Paper,Typography,Box,Grid,TextField,Button} from "@mui/material";
import { useParams } from 'react-router-dom';

const AddComment = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<CommentMutation>({
        description: '',
    });
    console.log(form)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(form.description.trim().length > 0){
            await dispatch(addComment({
                ...form,
                post: id
            }));
        }
     

    };


    return (
        <Container component="main" maxWidth="lg">
            <Paper  elevation={3} sx={{p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography component="h1" variant="h5">
                    Add comment
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                name="description"
                                fullWidth
                                label="description"
                                value={form.description}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, py: 1.5}}
                    >
                        Add comment
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AddComment;