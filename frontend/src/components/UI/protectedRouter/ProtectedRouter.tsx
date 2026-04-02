import type {PropsWithChildren} from "react";
import {toast} from "react-toastify";
import {Navigate} from "react-router-dom";

interface Props extends PropsWithChildren {
    isAllowed: boolean | null;
}

const ProtectedRouter: React.FC<Props> = ({isAllowed, children}) => {
    if (!isAllowed) {
        toast.warning('You are not allowed to access this page');
        return <Navigate to='/login'/>
    }

    return children

};

export default ProtectedRouter;