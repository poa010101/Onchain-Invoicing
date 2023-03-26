const WalletReducer = (state, action) => {
    switch (action.type) {
        case "GENERATE_INVOICE":
            return { ...state, invoices: [{ ...action.payload }, ...state.invoices] };
        case "PAID_INVOICE":
            return {
                ...state,
                invoices: state.items.filter((i) =>
                    i.id === action.payload.id
                        ? (i.pay = action.payload.pay)
                        : action.payload.pay
                )
            };
        default:
            break;
    }
};

export default WalletReducer