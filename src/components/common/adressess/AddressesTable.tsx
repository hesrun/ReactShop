import { LucideEdit, LucideTrash } from 'lucide-react';
import type { Address } from '../../../types/Types';

interface AddressTableProps {
    data: Address[];
    onEdit: (address: Address) => void;
    onDelete: (id: number) => void;
}

const AddressesTable = ({ data, onEdit, onDelete }: AddressTableProps) => {
    return (
        <>
            {/* Header (desktop only) */}
            <div className="hidden md:grid grid-cols-[1fr_1fr_120px_100px] gap-4 border-b border-sky-500 text-sky-500 font-semibold pb-4">
                <div>City</div>
                <div>Street</div>
                <div>Zip</div>
                <div></div>
            </div>

            {data.map((item) => (
                <div
                    key={item.id}
                    className="relative py-4 grid grid-cols-2 gap-4 border-b border-black/10 first:pt-0 md:grid-cols-[1fr_1fr_120px_100px] md:items-center"
                >
                    <div className="col-span-2 md:col-span-1">
                        <div className="text-sm text-gray-500 md:hidden">
                            City
                        </div>
                        <div className="font-bold">{item.city}</div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <div className="text-sm text-gray-500 md:hidden">
                            Street
                        </div>
                        <div className="font-bold">{item.street}</div>
                    </div>
                    <div className="md:col-span-1">
                        <div className="text-sm text-gray-500 md:hidden">
                            Zip
                        </div>
                        <div className="font-bold">{item.zip}</div>
                    </div>
                    <div className="absolute top-4 right-0 flex gap-2 md:static md:justify-end">
                        <button
                            onClick={() => onEdit(item)}
                            className="p-2 text-gray-500 cursor-pointer hover:opacity-70"
                            title="edit address"
                        >
                            <LucideEdit size={20} />
                        </button>
                        <button
                            onClick={() => onDelete(item.id)}
                            className="p-2 text-red-400 cursor-pointer hover:opacity-70"
                            title="delete address"
                        >
                            <LucideTrash size={20} />
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default AddressesTable;
