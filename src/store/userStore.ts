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
        try {
            const timeoutMs = 8000;
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), timeoutMs)
            );

            const { data, error } = (await Promise.race([
                supabase.auth.getSession(),
                timeoutPromise,
            ])) as any;
            if (data.session?.user) {
                this.user = data.session.user;
            } else if (error) {
                this.error = error.message;
                toast.error(this.error);
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            this.error = msg;
            toast.error(this.error);
        } finally {
            loadingStore.stop();
            this.loading = false;
        }
    }

    async logout() {
        loadingStore.start();
        try {
            const timeoutMs = 8000;
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), timeoutMs)
            );

            const { error } = (await Promise.race([
                supabase.auth.signOut(),
                timeoutPromise,
            ])) as any;
            if (error) {
                this.error = error.message;
                toast.error(this.error);
            } else {
                this.user = null;
                toast.info('You was logout');
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            this.error = msg;
            toast.error(this.error);
        } finally {
            loadingStore.stop();
        }
    }

    async signIn({ email, password }: { email: string; password: string }) {
        loadingStore.start();
        try {
            const timeoutMs = 8000;
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), timeoutMs)
            );

            const { data, error } = (await Promise.race([
                supabase.auth.signInWithPassword({ email, password }),
                timeoutPromise,
            ])) as any;
            if (data?.user) {
                this.user = data.user;
                toast.success('You are logged');
            } else if (error) {
                this.error = error.message;
                toast.error(this.error);
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            this.error = msg;
            toast.error(this.error);
        } finally {
            loadingStore.stop();
        }
    }

    async signUp({ email, password }: { email: string; password: string }) {
        loadingStore.start();
        try {
            const timeoutMs = 8000;
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), timeoutMs)
            );

            const { data, error } = (await Promise.race([
                supabase.auth.signUp({ email, password }),
                timeoutPromise,
            ])) as any;
            if (data?.user) {
                this.user = data.user;
                toast.success('New account was created');
            } else if (error) {
                this.error = error.message;
                toast.error(this.error);
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            this.error = msg;
            toast.error(this.error);
        } finally {
            loadingStore.stop();
        }
    }
}

export const userStore = new UserStore();
