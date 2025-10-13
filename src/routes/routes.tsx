import { createBrowserRouter } from 'react-router';
import Main from '../pages/Main';
import Layout from '../components/layout/Layout';
import Category from '../pages/Category';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import Auth from '../pages/Auth';
import Account from '../pages/Account';
import WithAuth from '../components/protectedRoutes/withAuth';
import NoAuth from '../components/protectedRoutes/NoAuth';

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            { index: true, Component: Main },
            { path: ':category', Component: Category },
            { path: ':category/:id', Component: Product },
            { path: 'cart', Component: Cart },
            {
                path: 'signup',
                element: (
                    <NoAuth>
                        <Auth />
                    </NoAuth>
                ),
            },
            {
                path: 'signin',
                element: (
                    <NoAuth>
                        <Auth />
                    </NoAuth>
                ),
            },
            {
                path: 'account',
                element: (
                    <WithAuth>
                        <Account />
                    </WithAuth>
                ),
            },
        ],
    },
]);

export default router;
