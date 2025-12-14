import { createBrowserRouter } from 'react-router';
import Layout from '../components/layout/Layout';
import WithAuth from '../components/protectedRoutes/WithAuth';
import AccountLayout from '../components/layout/AccountLayout';
import NoAuth from '../components/protectedRoutes/NoAuth';
import Main from '../pages/Main';
import Category from '../pages/Category';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import Auth from '../pages/Auth';
import Account from '../pages/Account';
import Orders from '../pages/Orders';
import Order from '../pages/Order';
import Success from '../pages/Sucess';
import Adresses from '../pages/Adresses';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Main /> },
            { path: 'cart', element: <Cart /> },
            { path: 'success', element: <Success /> },
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
                        <AccountLayout />
                    </WithAuth>
                ),
                children: [
                    {
                        index: true,
                        element: <Account />,
                    },
                    {
                        path: 'orders',
                        element: <Orders />,
                    },
                    {
                        path: 'orders/:id',
                        element: <Order />,
                    },
                    {
                        path: 'adresses',
                        element: <Adresses />,
                    },
                    {
                        path: '*',
                        element: <NotFound />,
                    },
                ],
            },
            { path: ':category', element: <Category /> },
            { path: ':category/:id', element: <Product /> },
            { path: '*', element: <NotFound /> },
        ],
    },
]);
export default router;
