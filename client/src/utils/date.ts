const currentDate = (timeStamp: any) => {
    if (!timeStamp) {
        return false;
    }

    const date = new Date(timeStamp);

    const months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });

    return `${month} ${day}, ${year}, ${time}`;
};

export default currentDate;
