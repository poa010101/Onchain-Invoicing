const WalletReducer = (state, action) => {
    switch (action.type) {
        case "GENERATE_INVOICE":
            return { ...state, invoices: [{ ...action.payload }, ...state.invoices] };
        case "PAY_INVOICE":
            return {
                ...state,
                items: state.items.filter((i) =>
                    i.id === action.payload.id
                        ? (i.done = action.payload.done)
                        : action.payload.done
                )
            };
        case "DECLINE_INVOICE":
            return {
                ...state,
                items: state.items.filter((i) => i.id !== action.payload.id)
            };
        default:
            break;
    }
};

export default WalletReducer