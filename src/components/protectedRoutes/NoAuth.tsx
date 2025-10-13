import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router';
import { userStore } from '../../store/userStore';
import type { JSX } from 'react';

const NoAuth = observer(({ children }: { children: JSX.Element }) => {
    if (userStore.user) {
        return <Navigate to="/account" replace />;
    }
    return children;
});

export default NoAuth;
