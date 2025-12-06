import Header from '../common/header/Header';
import { Outlet } from 'react-router';
import CategoriesNav from '../common/categories/CategoriesNav';

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
