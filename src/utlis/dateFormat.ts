const dateFormat = (date: string) => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return newDate.toLocaleDateString('de-DE', options);
};

export { dateFormat };
