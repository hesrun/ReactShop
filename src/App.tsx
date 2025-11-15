import { RouterProvider } from 'react-router';
import router from './routes/routes';
import { ToastContainer } from 'react-toastify';
import AppLoader from './components/layout/AppLoader';

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
            <AppLoader />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default App;
