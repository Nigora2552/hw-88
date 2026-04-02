import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectorLoading, selectorPosts} from "../../features/posts/postsSelectors.ts";
import {useEffect} from "react";
import {getAllPosts} from "../../features/posts/postsThunk.ts";
import {CircularProgress} from "@mui/material";
import PostCard from "../../components/PostCard/PostCard.tsx";


const Home = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectorPosts);
    const loading = useAppSelector(selectorLoading);

    useEffect(() => {
        dispatch(getAllPosts())
    }, []);

    return (
        <>
            {loading && <CircularProgress/>}
            {!loading && posts.length === 0 && <p>No posts yet</p>}
            {posts.length > 0 && (
                posts.map(post => (
                    <PostCard post={post} key={post._id}/>
                ))
            )}

        </>
    );
};

export default Home;