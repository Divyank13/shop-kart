import { createContext, useContext } from "react";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const WishListContext = createContext();

export const WishListHandler = ({ children }) => {
    const encodedToken = localStorage?.getItem('encodedToken');

    const {wishlistedIds, setWishlistedIds, isLoggedIn} = useContext(AuthContext)

    const navigate = useNavigate()

    const addToWishList = async (product) => {
        if (isLoggedIn) 
        {try {
            if (wishlistedIds.includes(product?.id)) {
                alert('already exists')
            } else {
                await fetch('/api/user/wishlist', {
                    method: 'POST',
                    headers: { authorization: encodedToken },
                    body: JSON.stringify({ product })
                });
                setWishlistedIds([...wishlistedIds, product?.id])
                toast.success(' Item added to wishlist', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
        } catch (error) {
            console.error(error);
        }} else {
            navigate('/login')
        }
    }

    const removeFromWishlist = async (productId) => {
        try {
            await fetch(`/api/user/wishlist/${productId}`, {
                method: 'DELETE',
                headers: { authorization: encodedToken }
            });
            setWishlistedIds(wishlistedIds?.filter((id) => id !== productId ))
            toast.warn('Item removed from wishlist', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <WishListContext.Provider value={{
            addToWishList,
            removeFromWishlist,
        }}>
            {children}
        </WishListContext.Provider>
    )
}