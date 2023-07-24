import { useContext } from 'react';
import './priceCard.css'

import { useNavigate } from 'react-router'
import { ProductReducerContext } from '../../contexts/productReducerContext/productReducerContext';
import { toast } from 'react-toastify';

export const PriceCard = ({ cartData }) => {
    const navigate = useNavigate()

    const { addressData } = useContext(ProductReducerContext);

    const navigateCheckOutHandler = () => {
        if (addressData?.length > 0) {
            navigate('/checkout')
        } else {
            toast.warn('It is essential to provide a valid shipping address', {
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
    }

    return (
        <div className="price-details">
            <div className="price-details-card">

                <p className="heading">Cart Price Details</p>
                <div className="cart-items-details">

                    {cartData?.map((cartItem) => (
                        <div className="product-price-name" key={cartItem?._id}>
                            <p className="item-title">{`${cartItem?.title?.slice(0, 12)}...`} ({cartItem?.qty})</p>
                            <p className="item-price">{`₹ ${Math.round(((Math.round(cartItem?.price - (cartItem?.price * (cartItem?.discountPercentage / 100))) * cartItem?.qty) + Number.EPSILON) * 100) / 100}`}</p>
                        </div>
                    ))}
                </div>
                <div className="price-container">
                    <p className="price-heading">Total Price:</p>
                    <p className="total-price">{`₹ ${Math.round(((cartData?.reduce((acc, curr) => acc + (curr?.price * curr?.qty), 0) - cartData?.reduce((acc, curr) => acc + ((curr?.price * (curr.discountPercentage / 100)) * curr?.qty), 0)) + Number.EPSILON) * 100) / 100}`}</p>
                </div>
                <button className="checkout" onClick={() => navigateCheckOutHandler()} >Checkout</button>
            </div>
        </div>
    )
}