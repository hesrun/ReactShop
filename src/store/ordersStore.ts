import { makeAutoObservable } from 'mobx';
import supabase from '../api/supabase';
import { toast } from 'react-toastify';
import { userStore } from './userStore';
import type { NewOrder, Order } from '../types/Types';
const tableName = 'orders';

class OrdersStore {
    orders: Order[] | null = null;
    order: Order | null = null;
    lastOrder: Order | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
    async addOrder(order: NewOrder) {
        this.loading = true
        const user_id = userStore.user ? userStore.user.id : null;

        const { data, error } = await supabase
            .from(tableName)
            .insert({
                ...order,
                user_id: user_id,
            })
            .select()
            .single<Order>()
        
        this.loading = false
        if (data) {
            toast.success(`Order#${data.id} was added`);
            this.lastOrder = data;
        } else if (error) {
            toast.error(error.message);
        }
    }

    async getOrders() {
        this.loading = true
        const user_id = userStore.user ? userStore.user.id : null;
        const { data, error } = await supabase
            .from(tableName)
            .select()
            .eq('user_id', user_id);

        if (data) {
            this.orders = data ?? null;
        } else if (error) {
            toast.error(error.message);
        }
        this.loading = false
    }

    async getOrder(id: number) {
        this.loading = true
        const { data, error } = await supabase
            .from(tableName)
            .select()
            .eq('id', id)
            .single();

        if (data) {
            this.order = data;
        } else if (error) {
            toast.error(error.message);
        }
        this.loading = false
    }

    async deleteOrder(id: number) {
        this.loading = true
        const { data, error } = await supabase
            .from(tableName)
            .delete()
            .eq('id', id)
            .select();

        if (error) {
            toast.error(error.message);
            return;
        }

        if (data && this.orders) {
            this.orders = this.orders.filter((order) => order.id !== id);
            toast.success(`Order #${id} was deleted`);
        }
        this.loading = false
    }
}

export const ordersStore = new OrdersStore();
