import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router';
import CategoriesNav from './CategoriesNav';

const Layout = () => {
    return (
        <>
            <Header />
            <CategoriesNav />
            <main className="container pb-8">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
