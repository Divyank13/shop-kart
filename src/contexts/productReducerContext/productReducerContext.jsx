import { createContext, useContext, useReducer, useState } from "react";
import { DataContext } from "../dataContext";
import { ProductReducer } from "./productReducer";
import { types } from './types'


export const ProductReducerContext = createContext();


export const ProductReducerHandler = ({ children }) => {
    const { responseData } = useContext(DataContext);

    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [searchBarData, setSearchBarData] = useState('')
    const [menuState, setMenuState] = useState(false);

    const initialState = {
        searchData: [],
        addresses: [{
            id: 1,
            name: 'Bruce Wayne',
            phone: '0123456789',
            pin: '1007',
            city: 'Gotham',
            address: 'Wayne Manor, Mountain Drive, Gotham',
            state: 'New Jersey'
        },
        {
            id: 2,
            name: 'Tony Stark',
            phone: '9876543210',
            pin: '90265',
            city: 'Malibu',
            address: '10880 Malibu Point, Malibu',
            state: 'California'
        },
    ]
    };

    const {
        SEARCH,
        ADD_ADDRESS,
        EDIT_ADDRESS,
        REMOVE_ADDRESS,
    } = types

    const [state, dispatch] = useReducer(ProductReducer, initialState);

    const searchHandler = (event) => {
        setIsSearchModalOpen(true)
        setSearchBarData(event.target.value)
        dispatch({
            type: SEARCH,
            payload: { input: event.target.value, data: responseData?.productData?.products }
        })
    }

    const addAddress = (address) => {
        dispatch({
            type: ADD_ADDRESS,
            payload: address
        })
    }

    const editAddress = (addressID, addressData) => {
        dispatch({
            type: EDIT_ADDRESS,
            payload: {id: addressID, data: addressData}
        })
    }
    
    const removeAddress = (addressID) => {
        dispatch({
            type: REMOVE_ADDRESS,
            payload: addressID
        })
    }

    return (
        <ProductReducerContext.Provider value={{
            searchHandler,
            searchData: state.searchData,
            isSearchModalOpen,
            setIsSearchModalOpen,
            searchBarData,
            addressData: state.addresses,
            addAddress,
            editAddress,
            removeAddress,
            menuState,
            setMenuState
        }}>
            {children}
        </ProductReducerContext.Provider>
    )
}