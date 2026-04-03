import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectorLoading, selectorOnePost} from "../../features/posts/postsSelectors.ts";
import {useEffect} from "react";
import { getPostById} from "../../features/posts/postsThunk.ts";
import {Box, Button, CircularProgress, Paper} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import dayjs from "dayjs";
import {apiURL} from "../../constants.ts";
import { useParams} from "react-router-dom";
import AddComment from "../../components/AddComment/AddComment.tsx";
import {getAllComment} from "../../features/comments/commentsThunk.ts";
import {selectorComments} from "../../features/comments/commentsSelectors.ts";


const FullInfoAboutPost = () => {
    const dispatch = useAppDispatch();
    const post = useAppSelector(selectorOnePost);
    const comments = useAppSelector(selectorComments)
    const loading = useAppSelector(selectorLoading);
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            dispatch(getPostById(id));
            dispatch(getAllComment())
        }
    }, []);

    const image = post?.image
    let cardImage = null;

    if (image) {
        cardImage = apiURL + '/' + image;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {loading && <CircularProgress/>}
            {!loading && post && (
                <>
                    <Paper sx={{width: '50%', margin: '15px', padding: '20px', display: 'flex', alignItems: 'center'}}>
                        {cardImage ? <img width='25%' src={cardImage} alt={post.title}/> : <ChatBubbleIcon/>}
                        <Box sx={{marginX: '50px'}}>
                            <span>{dayjs(post.createdAt).format('DD.MM.YY - hh:mm:s')}</span>
                            <span>by {post?.user.username}</span>
                            <h3>{post.title}</h3>
                            <p>{post.description}</p>
                        </Box>
                        <Button >Delete post</Button>
                    </Paper>
                    <hr/>
                    <AddComment/>
                    {loading && <CircularProgress/>}
                    {!loading && comments.length === 0 && <p>No comments</p>}
                    { comments.length > 0 && <>
                        {comments.map(comment => (
                            <Paper key={comment._id} sx={{width: '50%', margin: '15px', padding: '20px', display: 'flex', alignItems: 'center'}}>
                                {cardImage ? <img width='25%' src={cardImage} alt={post.title}/> : <ChatBubbleIcon/>}
                                <Box sx={{marginX: '50px'}}>
                                    <span>by {comment.user.username}</span>
                                    <h3>{comment.post.title}</h3>
                                    <p>{comment.description}</p>
                                </Box>
                                <Button >Delete comment</Button>
                            </Paper>
                        ))}
                    </>}
                </>
            )
            }
        </div>
    );
};

export default FullInfoAboutPost;