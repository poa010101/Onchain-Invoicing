function getRandomDateTime(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleString();
}

const startDate = new Date('2022-01-01');
const endDate = new Date('2022-12-31');
const randomDateTime = getRandomDateTime(startDate, endDate);

function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const mockUnpaidData = [
    {
        invoiceId: Math.floor(Math.random() * 1000000000000000),
        date: randomDateTime,
        poNumber: Math.floor(Math.random() * 1000000),
        amount: `${Math.floor(Math.random() * 1000)} USD`,
        clientWallet: generateRandomString(10),
        paid: false,
        active: true,
    },
    {
        invoiceId: Math.floor(Math.random() * 1000000000000000),
        date: randomDateTime,
        poNumber: Math.floor(Math.random() * 1000000),
        amount: `${Math.floor(Math.random() * 1000)} USD`,
        clientWallet: generateRandomString(10),
        paid: false,
        active: true,
    },
    {
        invoiceId: Math.floor(Math.random() * 1000000000000000),
        date: randomDateTime,
        poNumber: Math.floor(Math.random() * 1000000),
        amount: `${Math.floor(Math.random() * 1000)} USD`,
        clientWallet: generateRandomString(10),
        paid: false,
        active: true,
    },
    {
        invoiceId: Math.floor(Math.random() * 1000000000000000),
        date: randomDateTime,
        poNumber: Math.floor(Math.random() * 1000000),
        amount: `${Math.floor(Math.random() * 1000)} USD`,
        clientWallet: generateRandomString(10),
        paid: false,
        active: true,
    },
    {
        invoiceId: Math.floor(Math.random() * 1000000000000000),
        date: randomDateTime,
        poNumber: Math.floor(Math.random() * 1000000),
        amount: `${Math.floor(Math.random() * 1000)} USD`,
        clientWallet: generateRandomString(10),
        paid: false,
        active: true,
    },
    {
        invoiceId: Math.floor(Math.random() * 1000000000000000),
        date: randomDateTime,
        poNumber: Math.floor(Math.random() * 1000000),
        amount: `${Math.floor(Math.random() * 1000)} USD`,
        clientWallet: generateRandomString(10),
        paid: false,
        active: true,
    },
    {
        invoiceId: Math.floor(Math.random() * 1000000000000000),
        date: randomDateTime,
        poNumber: Math.floor(Math.random() * 1000000),
        amount: `${Math.floor(Math.random() * 1000)} USD`,
        clientWallet: generateRandomString(10),
        paid: false,
        active: true,
    },
    {
        invoiceId: Math.floor(Math.random() * 1000000000000000),
        date: randomDateTime,
        poNumber: Math.floor(Math.random() * 1000000),
        amount: `${Math.floor(Math.random() * 1000)} USD`,
        clientWallet: generateRandomString(10),
        paid: false,
        active: true,
    },
    {
        invoiceId: Math.floor(Math.random() * 1000000000000000),
        date: randomDateTime,
        poNumber: Math.floor(Math.random() * 1000000),
        amount: `${Math.floor(Math.random() * 1000)} USD`,
        clientWallet: generateRandomString(10),
        paid: false,
        active: true,
    },
    {
        invoiceId: Math.floor(Math.random() * 1000000000000000),
        date: randomDateTime,
        poNumber: Math.floor(Math.random() * 1000000),
        amount: `${Math.floor(Math.random() * 1000)} USD`,
        clientWallet: generateRandomString(10),
        paid: false,
        active: true,
    },
    {
        invoiceId: Math.floor(Math.random() * 1000000000000000),
        date: randomDateTime,
        poNumber: Math.floor(Math.random() * 1000000),
        amount: `${Math.floor(Math.random() * 1000)} USD`,
        clientWallet: generateRandomString(10),
        paid: false,
        active: true,
    },
];

export { mockUnpaidData }