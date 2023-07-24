import { useContext, useEffect, useState } from 'react'
import './wishListPage.css'
import { WishListContext } from '../../contexts/wishListContext'
import { ProductReducerContext } from '../../contexts/productReducerContext/productReducerContext';
import { Loader } from '../../components/loader/loader';
import { AuthContext } from '../../contexts/authContext';
import { FaRegHeart } from "react-icons/fa";
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { useNavigate } from 'react-router';
import { CartContext } from '../../contexts/cartContext';

export const WishListPage = () => {
    const encodedToken = localStorage?.getItem('encodedToken');

    const { removeFromWishlist } = useContext(WishListContext);
    const { setIsSearchModalOpen, setMenuState } = useContext(ProductReducerContext)
    const { wishlistedIds, cartItemsIds } = useContext(AuthContext)
    const { addToCart } = useContext(CartContext)

    const [wishlistData, setWishlistData] = useState(undefined);

    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await fetch('/api/user/wishlist', {
                method: 'GET',
                headers: { authorization: encodedToken }
            });
            setWishlistData((await response.json())?.wishlist)
        } catch (error) {
            console.error(error);
        }
    }

    const removeFromWishlistClickHandler = (productID) => {
        setWishlistData(wishlistData?.filter(({ _id }) => productID !== _id))
        removeFromWishlist(productID)
    }

    useEffect(() => {
        fetchData()
        setIsSearchModalOpen(false)
        setMenuState(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        !wishlistData
            ?
            <Loader />
            :
            <div className="wishlist-page">
                <p className="heading">Wishlist</p>
                {wishlistData?.length > 0 ?
                    <div className="wishlist-products">
                        {wishlistData?.map((product) => (
                            <div className="product-card" key={product?._id}>
                                {wishlistedIds?.includes(product?._id)
                                    ?
                                    < button className="remove-from-wishlist wishlist-btn" onClick={() => removeFromWishlistClickHandler(product?._id)}><AiFillHeart /></button>
                                    :
                                    < button className="add-to-wishlist wishlist-btn" ><FaRegHeart /></button>
                                }
                                <div className="product-card-img-container" onClick={() => navigate(`/product/${product?.id}`)}>
                                    <img src={product?.thumbnail} alt={product?.title} />
                                </div>
                                <div className="card-contents">
                                    <div className="title-rating" onClick={() => navigate(`/product/${product?.id}`)} >
                                        <p className="product-title">
                                            {product?.title?.length > 14 ? `${product?.title?.slice(0, 14)}...` : product?.title}
                                        </p>
                                        <p className="product-rating">
                                            {product?.rating} ✰
                                        </p>
                                    </div>
                                    <div className="product-card-price" onClick={() => navigate(`/product/${product?.id}`)}>
                                        <div className="prices">
                                            <p className="discounted-price">
                                                ₹ {Math.round((product?.price - (product?.price * (product.discountPercentage / 100))))}
                                            </p>
                                            <p className="original-price">
                                                ₹ {Math.round(product?.price)}
                                            </p>
                                        </div>
                                        <p className="discount">
                                            ({product?.discountPercentage}% off)
                                        </p>
                                    </div>
                                    {cartItemsIds?.includes(product?._id)
                                        ?
                                        < button className="go-to-cart cart-btn" onClick={() => navigate('/cart')}><AiOutlineShoppingCart /> Go to cart</button>
                                        :
                                        < button className="add-to-cart cart-btn" onClick={() => addToCart(product)}><AiOutlineShoppingCart /> Add to cart</button>
                                    }
                                </div>
                            </div >

                        ))}
                    </div>
                    :
                    <div className="empty-wishlist">
                        <h1>Empty Wishlist</h1>
                    </div>
                }
            </div>
    )
}
