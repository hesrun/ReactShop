import { createBrowserRouter } from 'react-router';
import Main from '../pages/Main';
import Layout from '../components/layout/Layout';
import Category from '../pages/Category';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import Auth from '../pages/Auth';
import Account from '../pages/Account';
import WithAuth from '../components/protectedRoutes/WithAuth';
import NoAuth from '../components/protectedRoutes/NoAuth';
import Orders from '../pages/Orders';
import Order from '../pages/Order';
import AccountLayout from '../components/layout/AccountLayout';
import Success from '../pages/Sucess';
import Adresses from '../pages/Adresses';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Main /> },
            { path: ':category', element: <Category /> },
            { path: ':category/:id', element: <Product /> },
            { path: 'cart', element: <Cart /> },
            {
                path: 'success',
                element: <Success />,
            },
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
                ],
            },
        ],
    },
]);
export default router;
