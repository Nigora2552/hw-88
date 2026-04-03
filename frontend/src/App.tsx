
import './App.css'
import {Route, Routes} from "react-router-dom";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import Home from "./containers/Home/Home.tsx";
import {ToastContainer} from "react-toastify";
import NavBar from "./components/UI/NavBar/NavBar.tsx";
import AddNewPost from "./components/AddNewPost/AddNewPost.tsx";
import ProtectedRouter from "./components/UI/protectedRouter/ProtectedRouter.tsx";
import {selectUser} from "./features/users/usersSelectore.ts";
import {useAppSelector} from "./app/hooks.ts";
import FullInfoAboutPost from "./containers/PostInfo/FullInfoAboutPost.tsx";
import {CssBaseline} from "@mui/material";

const App = () => {
    const user = useAppSelector(selectUser)

    return (<>
            <CssBaseline/>
            <ToastContainer/>
            <NavBar/>
            <Routes>
                <Route path='/' element={(<Home/>)}/>
                <Route path='/register' element={(<Register/>)}/>
                <Route path='/login' element={(<Login/>)}/>

                <Route path='/addPost' element={
                    <ProtectedRouter isAllowed={Boolean(user)}><AddNewPost/></ProtectedRouter>
                }/>
                <Route path='/post/:id' element={
                    <ProtectedRouter isAllowed={Boolean(user)}>
                        <FullInfoAboutPost/>
                    </ProtectedRouter>
                }/>
                <Route path='/*' element={<h1>Page not found</h1>}/>

            </Routes>
        </>
    );
}
export default App
