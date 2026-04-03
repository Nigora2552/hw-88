import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectorLoading, selectorOnePost} from "../../features/posts/postsSelectors.ts";
import {useEffect} from "react";
import { getPostById} from "../../features/posts/postsThunk.ts";
import {Box, CircularProgress, Paper} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import dayjs from "dayjs";
import {apiURL} from "../../constants.ts";
import {useParams} from "react-router-dom";


const FullInfoAboutPost = () => {
    const dispatch = useAppDispatch();
    const post = useAppSelector(selectorOnePost);
    const loading = useAppSelector(selectorLoading);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if(id){
            dispatch(getPostById(id))
        }
    }, []);

    const image = post?.image
    let cardImage = null;

    if (image) {
        cardImage = apiURL + '/' + image;
    }

    return (
        <>
            {loading && <CircularProgress/>}
            {!loading && post && (
                        <Paper  sx={{margin: '15px',padding: '20px', display: 'flex', alignItems: 'center'}}>
                            {cardImage ? <img width='25%' src={cardImage} alt={post.title}/> : <ChatBubbleIcon/>}
                            <Box sx={{marginX: '20px'}}>
                                <span>{dayjs(post.createdAt).format('DD.MM.YY - hh:mm:s' )}</span>
                                <span>by {post?.user.username}</span>
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                            </Box>
                        </Paper>
                    )
                }
        </>
    );
};

export default FullInfoAboutPost;