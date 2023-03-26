const WalletReducer = (state, action) => {
    switch (action.type) {
        case "GENERATE_INVOICE":
            return { ...state, items: [{ ...action.payload }, ...state.items] };
        case "SUBMIT_INVOICE":
            return {
                ...state,
                items: state.items.filter((i) =>
                    i.id === action.payload.id
                        ? (i.done = action.payload.done)
                        : action.payload.done
                )
            };
        case "PAY_INVOICE":
            return {
                ...state,
                items: state.items.filter((i) => i.id !== action.payload.id)
            };
        default:
            break;
    }
};

export default WalletReducer