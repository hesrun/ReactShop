import type { Delivery } from "../types/Types";

export const deliveries: Delivery[] = [
	{
		id: 1,
		name: 'Standard Shipping',
		description: 'Delivery within 5-7 business days',
		price: 5.99,
		estimatedTime: '5-7 business days',
	},
	{
		id: 2,
		name: 'Express Shipping',
		description: 'Delivery within 2-3 business days',
		price: 12.99,
		estimatedTime: '2-3 business days',
	},
	{
		id: 3,
		name: 'Overnight Shipping',
		description: 'Next day delivery for orders placed before 5 PM',
		price: 24.99,
		estimatedTime: '1 business day',
	}
];