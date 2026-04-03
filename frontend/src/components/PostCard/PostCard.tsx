import {Box, Paper} from "@mui/material";
import type {IPosts} from "../../types";
import {apiURL} from "../../constants";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import dayjs from "dayjs";
import {NavLink} from "react-router-dom";

interface Props {
    post: IPosts;
}

const PostCard: React.FC<Props> = ({post}) => {
    const image = post.image
    let cardImage = null;

    if (image) {
        cardImage = apiURL + '/' + image;
    }
    return (
        <>
            <Paper component={NavLink} to={`/post/${post._id}`} sx={{margin: '15px',padding: '20px', display: 'flex', alignItems: 'center'}}>
                {cardImage ? <img width='25%' src={cardImage} alt={post.title}/> : <ChatBubbleIcon/>}
            <Box sx={{marginX: '20px'}}>
                <span>{dayjs(post.createdAt).format('DD.MM.YY - hh:mm:s' )}</span>
                <span>by {post.user.username}</span>
                <h3 style={{display: 'block', margin: '10px 0'}}>{post.title}</h3>
            </Box>
            </Paper>
        </>
    );
};

export default PostCard;