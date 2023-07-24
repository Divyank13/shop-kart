import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataHandler = ({ children }) => {
    const [responseData, setResponseData] = useState({ productData: [], productCategories: [] });

    const fetchProductsData = async () => {
        try {
            const data = await fetch('/api/products')
            const category = await fetch('/api/categories')
            setResponseData({ ...responseData, productData: await data.json(), productCategories: await category.json() })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProductsData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <DataContext.Provider value={{
            responseData
        }}>
            {children}
        </DataContext.Provider>
    )

}