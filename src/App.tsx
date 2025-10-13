import { RouterProvider } from 'react-router';
import router from './routes/routes';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { useEffect } from 'react';
import { userStore } from './store/userStore';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

const App = observer(() => {
    useEffect(() => {
        async function renderUser() {
            await userStore.getSession();
            console.log('current user:', toJS(userStore.user));
        }
        renderUser();
    }, []);

    return (
        <>
            <RouterProvider router={router} />
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
});

export default App;
