import { LucideX } from 'lucide-react';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { modalStore } from '../../store/modalStore';
import Button from './Button';

interface ModalProps {
    title: string;
    formId?: string;
    isloading?: boolean;
    onSuccess?: () => void;
    onCancel?: () => void;
    children: React.ReactNode;
}

const Modal = observer(
    ({
        title,
        onSuccess,
        onCancel,
        formId,
        isloading,
        children,
    }: ModalProps) => {
        const softClose = () => {
            modalStore.close();
        };

        const hardClose = () => {
            onCancel?.();
            modalStore.close();
        };

        useEffect(() => {
            const handleKey = (e: KeyboardEvent) => {
                if (e.key === 'Escape') softClose();
            };
            document.addEventListener('keydown', handleKey);
            return () => document.removeEventListener('keydown', handleKey);
        }, []);

        return (
            <div>
                {modalStore.isOpen && (
                    <div className="fixed inset-0 z-50 flex p-8">
                        <div
                            onClick={softClose}
                            className="bg-black/50 absolute inset-0 backdrop-blur-[3px]"
                        ></div>
                        <div className="bg-white relative z-10 m-auto w-full max-w-[600px] rounded-2xl p-6 grid gap-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">
                                    {title}
                                </h2>
                                <button
                                    type="button"
                                    onClick={softClose}
                                    title="close modal"
                                    className="hover:text-sky-500 cursor-pointer"
                                >
                                    <LucideX />
                                </button>
                            </div>
                            <div>{children}</div>
                            <div className="flex gap-4">
                                <Button
                                    color="blue"
                                    onClick={onSuccess}
                                    type={formId ? 'submit' : 'button'}
                                    form={formId}
                                    loading={isloading}
                                    disabled={isloading}
                                >
                                    Save
                                </Button>
                                <Button
                                    type="button"
                                    color="gray"
                                    onClick={hardClose}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

export default Modal;
