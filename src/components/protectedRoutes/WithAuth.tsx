import { observer } from 'mobx-react-lite';
import { type JSX } from 'react';
import { userStore } from '../../store/userStore';
import { Navigate } from 'react-router';
import { loadingStore } from '../../store/loadingStore';

const WithAuth = observer(({ children }: { children: JSX.Element }) => {
    if (loadingStore.loading) return null;
    if (!userStore.user) return <Navigate to="/signin" replace />;
    return children;
});

export default WithAuth;
