const WalletReducer = (state, action) => {
    switch (action.type) {
        case "GENERATE_INVOICE":
            return { ...state, invoices: [{ ...action.payload }, ...state.invoices] };
        default:
            break;
    }
};

export default WalletReducer