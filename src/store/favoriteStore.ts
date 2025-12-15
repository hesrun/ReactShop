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
    favorites: number[] = [];
    products: Product[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
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
                this.favorites.push(id);
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
                this.favorites = data?.map(row => row.product_id) ?? []
            }
        } finally {
            this.loading = false;
        }
    }

    async removeFavorite(product_id: number) {
        this.loading = true;
        try {
            await supabase
                .from(tableName)
                .delete()
                .eq('product_id', product_id)
                .eq('user_id', userStore.user?.id);

            this.favorites = this.favorites.filter(id => id !== product_id);
            toast.info('Removed from favorites');
        } finally {
            this.loading = false;
        }
    }

    async toggleFavorite(product_id: number) {
        if (this.isInFavoite(product_id)) {
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
                this.favorites.map(id => fetchProduct(id))
            );
            this.products = products;
        } finally {
            this.loading = false;
        }
    }

    isInFavoite(id: number) {
        return this.favorites.includes(id)
    }

    get favoritesCount() {
        return this.favorites.length
    }

}

export const favoriteStore = new FavoriteStore();
