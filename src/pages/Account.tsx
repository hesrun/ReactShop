import { Link } from 'react-router';
import Title from '../components/ui/Title';
import { LucideHouse, LucideNotebookText } from 'lucide-react';

const Account = () => {
    return (
        <>
            <Title type="h1">Account</Title>
            <div className="grid grid-cols-2 gap-4">
                <Link
                    className="flex items-center justify-center gap-2 bg-sky-500 text-center text-white text-xl rounded-2xl p-4 py-8 font-bold hover:bg-sky-600 transition-colors"
                    to={`/account/orders`}
                >
                    <LucideNotebookText />
                    My Orders
                </Link>
                <Link
                    className="flex items-center justify-center gap-2 bg-sky-500 text-center text-white text-xl rounded-2xl p-4 py-8 font-bold hover:bg-sky-600 transition-colors"
                    to={`/account/adresses`}
                >
                    <LucideHouse />
                    My Addresses
                </Link>
            </div>
        </>
    );
};

export default Account;
