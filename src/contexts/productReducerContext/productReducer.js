import { types } from './types';

export const ProductReducer = (state, action) => {

    const {
        SEARCH,
        ADD_ADDRESS,
        EDIT_ADDRESS,
        REMOVE_ADDRESS,
    } = types

    switch (action.type) {
        case SEARCH:
            if (action?.payload?.input) {
                return {
                    ...state,
                    searchData: [
                        ...action?.payload?.data?.filter(({ title }) => title.slice(0, action?.payload?.input.length).toLowerCase() === action?.payload?.input.toLowerCase()),
                        ...action?.payload?.data?.filter(({ title }) => title.slice(0, action?.payload?.input.length).toLowerCase() !== action?.payload?.input.toLowerCase())
                            ?.filter(({ title }) => title.toLowerCase()?.includes(action?.payload?.input?.toLowerCase()))]
                }
            } else {
                return {
                    ...state,
                    searchData: []
                }
            }

        case ADD_ADDRESS:
            const id = state?.addresses?.length > 0 ? state?.addresses[state?.addresses?.length -1]?.id + 1 : 1
            const addressData = {...action?.payload, id: id}
            return {
                ...state,
                addresses: [...state?.addresses, addressData]
            }
            
        case EDIT_ADDRESS: 
            return {
                ...state,
                addresses: [...state?.addresses?.filter(({id}) => id !== action?.payload?.id ), action?.payload?.data]
            }

        case REMOVE_ADDRESS:
            return {
                ...state,
                addresses: state?.addresses?.filter(({id}) => id !== action?.payload )
            }

        default:
            return state;
    }
}