import { makeAutoObservable } from 'mobx';
import type { Product, CartProduct, Delivery } from '../types/Types';
import { discountPriceCalc } from '../utlis/price';

class CartStore {
    cart: CartProduct[] = [];
    delivery: Delivery | null = null;

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
    adjustQuantity(id: number, qty: number) {
        const product = this.cart.find((item) => item.id === id);
        if (product) {
            product.quantity = qty;
            product.total = Number(
                (discountPriceCalc(
                    product.price,
                    product.discountPercentage
                ) * qty).toFixed(2)
            );
        }
        this.saveToStorage();
    }
    isIncart(id: number) {
        return this.cart.some((item) => item.id === id);
    }
    setDelivery(delivery: Delivery) {
        this.delivery = delivery;
    }
    get totalItems() {
        return this.cart.reduce((summ, item) => summ + item.quantity, 0);
    }
    get totalProductsSum() {
        return Number(this.cart
            .reduce((summ, item) => summ + Number(item.total), 0)
            .toFixed(2));
    }
    get deliveryPrice() {
        return this.delivery ? this.delivery.price : 0;
    }
    get totalSum() {
        if (this.delivery) {
            return Number((this.totalProductsSum + this.delivery.price).toFixed(2));
        }
        return this.totalProductsSum;
    }
}

export const cartStore = new CartStore();
