import { makeAutoObservable } from 'mobx';
import supabase from '../api/supabase';
import type { User } from '@supabase/supabase-js';
import { toast } from 'react-toastify';

class UserStore {
    user: User | null = null;
    loading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);

        supabase.auth.onAuthStateChange((_, session) => {
            this.user = session?.user ?? null;
        });
    }

    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            this.error = error.message;
            toast.error(this.error);
        } else {
            this.user = null;
            toast.info('You was logout');
        }
    }

    async getSession() {
        const { data, error } = await supabase.auth.getSession();
        if (data.session?.user) {
            this.user = data.session?.user;
            console.log('setSession', this.user);
        } else if (error) {
            this.error = error.message;
            toast.error(this.error);
        }
    }

    async signIn({ email, password }: { email: string; password: string }) {
        this.loading = true;
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (data?.user) {
            this.user = data.user;
            toast.success('You are logged');
            console.log('signUp', this.user);
        } else if (error) {
            this.error = error.message;
            toast.error(this.error);
        }
        this.loading = false;
    }

    async signUp({ email, password }: { email: string; password: string }) {
        this.loading = true;
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (data?.user) {
            this.user = data.user;
            toast.success('New account was created');
            console.log('signUp', this.user);
        } else if (error) {
            this.error = error.message;
            toast.error(this.error);
        }
        this.loading = false;
    }
}

export const userStore = new UserStore();
