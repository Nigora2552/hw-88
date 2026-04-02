import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectorLoading, selectorPosts} from "../../features/posts/postsSelectors.ts";
import {useEffect} from "react";
import {getAllPosts} from "../../features/posts/postsThunk.ts";
import {Box, CircularProgress, Paper} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import dayjs from "dayjs";
import {apiURL} from "../../constants.ts";


const FullInfoAboutPost = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectorPosts);
    const loading = useAppSelector(selectorLoading);

    useEffect(() => {
        dispatch(getAllPosts())
    }, []);



    return (
        <div>
            {loading && <CircularProgress/>}
            {!loading && posts.length === 0 && <p>No posts yet</p>}
            {posts.length > 0 && (
                posts.map(post =>{
                    const image = post.image
                    let cardImage = null;

                    if (image) {
                        cardImage = apiURL + '/' + image;
                    }
                    return(
                        <Paper key={post._id} sx={{margin: '15px',padding: '20px', display: 'flex', alignItems: 'center'}}>
                            {cardImage ? <img width='100%' src={cardImage} alt={post.title}/> : <ChatBubbleIcon/>}
                            <Box sx={{marginX: '20px'}}>
                                <span>{dayjs(post.createdAt).format('DD.MM.YY - hh:mm:s' )}</span>
                                <span>by {post.user.username}</span>
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                            </Box>
                        </Paper>
                    )
                })
            )}
        </div>
    );
};

export default FullInfoAboutPost;