import { makeAutoObservable } from 'mobx';
import supabase from '../api/supabase';
import { toast } from 'react-toastify';
import { userStore } from './userStore';
import type { Order } from '../types/Types';

const tableName = 'orders';

class OrdersStore {
    orders = [];

    constructor() {
        makeAutoObservable(this);
    }

    async addOrder(order: Order) {
        const user_id = userStore.user ? userStore.user.id : null;

        const { data, error } = await supabase
            .from(tableName)
            .insert({
                ...order,
                user_id: user_id,
            })
            .select();
        if (data) {
            toast.success('Order was added');
        } else if (error) {
            toast.error(error.message);
        }
    }
}

export const ordersStore = new OrdersStore();
