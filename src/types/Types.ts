export interface Category {
    slug: string;
    name: string;
    url: string;
}

export interface Reviews {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Reviews[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    images: string[];
    thumbnail: string;
}

export interface CartProduct extends Product {
    quantity: number;
    total: string;
}

export interface CategoryProducts {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface Address {
    id: number;
    user_id: string;
    city: string;
    street: string;
    zip: string;
}

export type NewAddress = Omit<Address, 'id'>;


export interface Order {
    id: number;
    user_id: string | null;
    cart: string;
    email: string;
    fullName: string;
    phone: string;
    total: string;
    city: string;
    street: string;
    zip: string;
    created_at?: string;
    comment?: string;
}
export type NewOrder = Omit<Order, 'id'>;



export interface SearchRes {
    products: Product[],
    total: number,
    skip: number,
    limit: number
}
