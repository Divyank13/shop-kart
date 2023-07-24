/* eslint-disable react/jsx-no-target-blank */
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { DataContext } from "../contexts/dataContext";
import { ProductReducerContext } from "../contexts/productReducerContext/productReducerContext";
import './productPage.css'
import { Loader } from "../components/loader/loader";
import { CartContext } from "../contexts/cartContext";
import { AuthContext } from "../contexts/authContext";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { WishListContext } from "../contexts/wishListContext";

export const ProductPage = () => {
    const { productID } = useParams();
    const { responseData } = useContext(DataContext);
    const product = responseData?.productData?.products?.find(({ _id }) => _id === productID);
    const { setIsSearchModalOpen, setMenuState } = useContext(ProductReducerContext);
    const navigate = useNavigate()

    const { addToCart } = useContext(CartContext)
    const { cartItemsIds, wishlistedIds } = useContext(AuthContext)
    const { addToWishList } = useContext(WishListContext)

    useEffect(() => {
        setIsSearchModalOpen(false)
        setMenuState(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(product)

    return (
        !product
            ?
            <Loader />
            :
            <div className="single-product-page">
                <div className="product-details-modal">
                    <div className="product-images">
                        {product?.images?.map((image, index) => (
                            <div className="img-container" key={index}>
                                <a href={image} target="_blank"><img src={image} alt={`number ${index}`} /></a>
                            </div>
                        ))}
                    </div>
                    <div className="product-details">
                        <div className="title-rating">
                            <p className="product-title">
                                {product?.title}
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
                        <div className="desc">
                            <div className="brand">
                                <p className="desc-heading">
                                    Brand:
                                </p>
                                <p className="brand-name">
                                    {product?.brand}
                                </p>
                            </div>
                            <div className="desc">
                                <p className="desc-heading">
                                    Desc:
                                </p>
                                <p className="desc">
                                    {product?.description}
                                </p>
                            </div>
                        </div>
                        <div className="btns">
                            {wishlistedIds?.includes(product?._id)
                                ?
                                < button className="go-to-wishlist wishlist-btn" onClick={() => navigate('/wishlist')}><FaRegHeart /> Go to wishlist</button>
                                :
                                < button className="add-to-wishlist wishlist-btn" onClick={() => addToWishList(product)}><FaRegHeart /> Add to wishlist</button>
                            }
                            {cartItemsIds?.includes(product?._id)
                                ?
                                < button className="go-to-cart cart-btn" onClick={() => navigate('/cart')}><AiOutlineShoppingCart /> Go to cart</button>
                                :
                                < button className="add-to-cart cart-btn" onClick={() => addToCart(product)}><AiOutlineShoppingCart /> Add to cart</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}