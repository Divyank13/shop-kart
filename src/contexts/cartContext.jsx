import { createContext, useContext } from "react";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartHandler = ({ children }) => {
    const encodedToken = localStorage?.getItem('encodedToken');

    const { cartItemsIds, setCartItemsIds, isLoggedIn } = useContext(AuthContext)

    const navigate = useNavigate()

    const addToCart = async (product) => {
        if (isLoggedIn) {
            try {
                if (cartItemsIds.includes(product?.id)) {
                    toast.error('Item alreasy exists', {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });
                } else {
                    await fetch('/api/user/cart', {
                        method: 'POST',
                        headers: { authorization: encodedToken },
                        body: JSON.stringify({ product })
                    });
                    setCartItemsIds([...cartItemsIds, product?.id])
                    toast.success('Item added to cart', {
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
            }
        } else {
            navigate('/login')
        }
    }

    const removeFromCart = async (productId) => {
        try {
            await fetch(`/api/user/cart/${productId}`, {
                method: 'DELETE',
                headers: { authorization: encodedToken }
            });
            setCartItemsIds(cartItemsIds?.filter((id) => id !== productId))
            toast.warn('Item removed from cart', {
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

    const incDecCart = async (productId, type) => {
        try {
            await fetch(`/api/user/cart/${productId}`, {
                method: 'POST',
                headers: { authorization: encodedToken },
                body: JSON.stringify({ action: { type } })
            })
        } catch (error) {
            console.error(error);
        }
    }

    const clearCart = async () => {
        try {
            for (const id of cartItemsIds) {
                await fetch(`/api/user/cart/${id}`, {
                    method: 'DELETE',
                    headers: { authorization: encodedToken }
                });
            }
            setCartItemsIds([])
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <CartContext.Provider value={{
            addToCart,
            removeFromCart,
            incDecCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}