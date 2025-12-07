import { makeAutoObservable } from 'mobx';
import supabase from '../api/supabase';
import { toast } from 'react-toastify';
import { userStore } from './userStore';
import type { NewOrder, Order } from '../types/Types';

const tableName = 'orders';

class OrdersStore {
    orders: Order[] = [];
    order: Order | null = null;
    lastOrder: Order | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async addOrder(order: NewOrder) {
        this.loading = true;
        try {
            const user_id = userStore.user?.id ?? null;

            const { data, error } = await supabase
                .from(tableName)
                .insert({ ...order, user_id })
                .select()
                .single();

            if (error) {
                toast.error(error.message);
            } else if (data) {
                toast.success(`Order #${data.id} was added`);
                this.lastOrder = data;
            }
        } finally {
            this.loading = false;
        }
    }

    async getOrders() {
        this.loading = true;
        try {
            const user_id = userStore.user?.id ?? null;

            const { data, error } = await supabase
                .from(tableName)
                .select()
                .eq('user_id', user_id);

            if (error) {
                toast.error(error.message);
            } else if (data) {
                this.orders = data;
            }
        } finally {
            this.loading = false;
        }
    }

    async getOrder(id: number) {
        this.loading = true;
        try {
            const { data, error } = await supabase
                .from(tableName)
                .select()
                .eq('id', id)
                .single<Order>();

            if (error) {
                toast.error(error.message);
            } else if (data) {
                this.order = data;
            }
        } finally {
            this.loading = false;
        }
    }

    async deleteOrder(id: number) {
        this.loading = true;
        try {
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
                const deletedId = data[0]?.id;
                if (deletedId != null) {
                    this.orders = this.orders.filter(order => order.id !== deletedId);
                    toast.success(`Order #${deletedId} was deleted`);
                }
            }
        } finally {
            this.loading = false;
        }
    }
}

export const ordersStore = new OrdersStore();
