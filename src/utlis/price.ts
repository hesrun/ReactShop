const discountPriceCalc = (price: number, discount: number) => {
    return Number(
        (discount ? price - (price * discount) / 100 : price).toFixed(2)
    );
};

export { discountPriceCalc };
