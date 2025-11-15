import { observer } from 'mobx-react-lite';
import { loadingStore } from '../../store/loadingStore';
import { Loader2 } from 'lucide-react';

const AppLoader = observer(() => {
    if (!loadingStore.loading) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <Loader2 size={64} className="animate-spin text-white" />
        </div>
    );
});

export default AppLoader;
