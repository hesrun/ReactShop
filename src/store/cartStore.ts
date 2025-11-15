import { makeAutoObservable } from 'mobx';
import type { Product, CartProduct } from '../types/Types';
import { discountPriceCalc } from '../utlis/price';

class CartStore {
    cart: CartProduct[] = [];

    constructor() {
        makeAutoObservable(this);
        const storage = localStorage.getItem('cart');
        if (storage) {
            this.cart = JSON.parse(storage);
        }
    }

    private saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    addProducts(product: Product, qty: number = 1) {
        const calcTotal = (
            price: number,
            discount: number,
            quantity: number
        ) => {
            return Number(
                (discountPriceCalc(price, discount) * quantity).toFixed(2)
            );
        };

        const existing = this.cart.find((item) => item.id === product.id);
        if (existing) {
            existing.quantity += qty;
            existing.total = calcTotal(
                existing.price,
                existing.discountPercentage,
                existing.quantity
            );
        } else {
            this.cart = this.cart.concat({
                ...product,
                quantity: qty,
                total: calcTotal(
                    product.price,
                    product.discountPercentage,
                    qty
                ),
            });
        }
        this.saveToStorage();
    }
    removeProduct(id: number) {
        this.cart = this.cart.filter((product) => product.id !== id);
        this.saveToStorage();
    }
    clearCart() {
        this.cart = [];
        this.saveToStorage();
    }
    get totalItems() {
        return this.cart.reduce((summ, item) => summ + item.quantity, 0);
    }
    get totalSum() {
        return String(
            this.cart.reduce((summ, item) => summ + item.total, 0).toFixed(2)
        );
    }
}

export const cartStore = new CartStore();
