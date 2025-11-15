import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router';
import CategoriesNav from './CategoriesNav';

const Layout = () => {
    return (
        <>
            <Header />
            <main className="container pb-8">
                <CategoriesNav />
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
