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
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left border-b border-sky-500 pb-2">
                            City
                        </th>
                        <th className="text-left border-b border-sky-500 pb-2">
                            Street
                        </th>
                        <th className="text-left border-b border-sky-500 pb-2">
                            Zip
                        </th>
                        <th className="text-left border-b border-sky-500 pb-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="py-4 border-b border-gray-200">
                                {item.city}
                            </td>
                            <td className="py-4 border-b border-gray-200">
                                {item.street}
                            </td>
                            <td className="py-4 border-b border-gray-200">
                                {item.zip}
                            </td>
                            <td className="py-4 border-b border-gray-200 gap-2 w-[100px] text-right">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="p-2 text-gray-500 cursor-pointer hover:opacity-70"
                                    title="edit address"
                                >
                                    <LucideEdit size={24} />
                                </button>
                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="p-2 text-red-400 cursor-pointer hover:opacity-70"
                                    title="delete address"
                                >
                                    <LucideTrash size={24} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default AddressesTable;
