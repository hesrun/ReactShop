import { makeAutoObservable } from 'mobx';
import supabase from '../api/supabase';
import { toast } from 'react-toastify';
import type { Product } from '../types/Types';
import { userStore } from './userStore';

const tableName = 'favorites';

async function fetchProduct(id: number) {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return await res.json();
}

class FavoriteStore {
    favoriteIds: number[] = [];
    favoriteProducts: Product[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    async addFavorite(product_id: number) {
        this.loading = true;
        try {
            const user_id = userStore.user?.id ?? null;

            const { data, error } = await supabase
                .from(tableName)
                .insert({ product_id, user_id })
                .select()
                .single();

            if (error) {
                toast.error(error.message);
            } else if (data) {
                const id = data.product_id;
                toast.success(`Was added to favorites`);
                this.favoriteIds.push(id);
            }
        } finally {
            this.loading = false;
        }
    }

    async getFavorites() {
        this.loading = true;
        try {
            const { data, error } = await supabase.from(tableName).select('product_id');
            if (error) {
                toast.error(error.message);
            } else if (data) {
                console.log(data);
                this.favoriteIds = data?.map(row => row.product_id) ?? []
            }
        } finally {
            this.loading = false;
        }
    }

    async removeFavorite(product_id: number) {
        try {
            await supabase
                .from(tableName)
                .delete()
                .eq('product_id', product_id)
                .eq('user_id', userStore.user?.id);

            this.favoriteIds = this.favoriteIds.filter(id => id !== product_id);
            this.favoriteProducts = this.favoriteProducts.filter(product => product.id !== product_id);
            toast.info('Removed from favorites');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            toast.error(message);
        }
    }

    async toggleFavorite(product_id: number) {
        if (this.isFavorite(product_id)) {
            await this.removeFavorite(product_id);
        } else {
            await this.addFavorite(product_id);
        }
    }

    async getFavoriteProducts() {
        this.loading = true;
        try {
            await this.getFavorites();
            const products = await Promise.all(
                this.favoriteIds.map(id => fetchProduct(id))
            );
            this.favoriteProducts = products;
        } finally {
            this.loading = false;
        }
    }

    isFavorite(id: number) {
        return this.favoriteIds.includes(id)
    }

    get favoritesCount() {
        return this.favoriteIds.length
    }

}

export const favoriteStore = new FavoriteStore();
