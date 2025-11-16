import { makeAutoObservable } from 'mobx';
import supabase from '../api/supabase';
import { toast } from 'react-toastify';
import type { Address } from '../types/Types';
import { userStore } from './userStore';

const tableName = 'address';

class AddressStore {
    addresses: Address[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async addAddress(address: Address) {
        this.loading = true;
        try {
            const { data, error } = await supabase
                .from(tableName)
                .insert({
                    ...address,
                    user_id: userStore.user?.id,
                })
                .select();

            if (error) {
                toast.error(error.message);
            } else if (data && data.length > 0) {
                const newAddress = data[0];
                this.addresses.push(newAddress);
                toast.success('Address was added');
            }
        } finally {
            this.loading = false;
        }
    }

    async getAddresses() {
        this.loading = true;
        try {
            const { data, error } = await supabase.from(tableName).select();

            if (error) {
                toast.error(error.message);
            } else if (data) {
                this.addresses = data;
            }
        } finally {
            this.loading = false;
        }
    }

    async editAddress(address: Address, id: number) {
        this.loading = true;
        try {
            const { data, error } = await supabase
                .from(tableName)
                .update(address)
                .eq('id', id)
                .select();

            if (error) {
                toast.error(error.message);
            } else if (data) {
                const updatedAddress = data[0];
                this.addresses = this.addresses.map((item) =>
                    item.id === updatedAddress.id ? updatedAddress : item
                );
                toast.success('Address was edited');
            }
        } finally {
            this.loading = false;
        }
    }

    async deleteAddress(id: number) {
        this.loading = true;

        try {
            const { data, error } = await supabase
                .from(tableName)
                .delete()
                .eq('id', id)
                .select();

            if (error) {
                toast.error(error.message);
            } else if (data && data.length > 0) {
                const deletedId = data[0].id;
                this.addresses = this.addresses.filter(
                    (item) => item.id !== deletedId
                );
                toast.success('Address was deleted');
            }
        } finally {
            this.loading = false;
        }
    }
}

export const addressStore = new AddressStore();
