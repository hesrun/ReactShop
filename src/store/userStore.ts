import { makeAutoObservable } from 'mobx';
import supabase from '../api/supabase';
import type { User } from '@supabase/supabase-js';
import { toast } from 'react-toastify';
import { loadingStore } from './loadingStore';

class UserStore {
    user: User | null = null;
    error: string | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);

        supabase.auth.onAuthStateChange((_, session) => {
            this.user = session?.user ?? null;
        });

        this.initUser();
    }

    async initUser() {
        loadingStore.start();
        this.loading = true;
        const { data, error } = await supabase.auth.getSession();
        if (data.session?.user) {
            this.user = data.session.user;
        } else if (error) {
            this.error = error.message;
            toast.error(this.error);
        }
        loadingStore.stop();
        this.loading = false;
    }

    async logout() {
        loadingStore.start();
        const { error } = await supabase.auth.signOut();
        if (error) {
            this.error = error.message;
            toast.error(this.error);
        } else {
            this.user = null;
            toast.info('You was logout');
        }
        loadingStore.stop();
    }

    async signIn({ email, password }: { email: string; password: string }) {
        loadingStore.start();
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (data?.user) {
            this.user = data.user;
            toast.success('You are logged');
        } else if (error) {
            this.error = error.message;
            toast.error(this.error);
        }
        loadingStore.stop();
    }

    async signUp({ email, password }: { email: string; password: string }) {
        loadingStore.start();
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (data?.user) {
            this.user = data.user;
            toast.success('New account was created');
        } else if (error) {
            this.error = error.message;
            toast.error(this.error);
        }
        loadingStore.stop();
    }
}

export const userStore = new UserStore();
