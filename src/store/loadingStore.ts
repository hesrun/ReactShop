import { makeAutoObservable } from 'mobx';

class LoadingStore {
    active: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    start() {
        this.active++;
    }

    stop() {
        this.active--;
        this.active = this.active > 0 ? this.active : 0;
    }

    get loading() {
        return this.active > 0;
    }
}

export const loadingStore = new LoadingStore();
