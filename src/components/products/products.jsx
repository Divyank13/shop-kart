import { useContext } from 'react'
import './products.css'
import { WishListContext } from '../../contexts/wishListContext'
import { AuthContext } from '../../contexts/authContext'
import { CartContext } from '../../contexts/cartContext'
import { useNavigate } from 'react-router'
import { FaRegHeart } from "react-icons/fa";
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'

export const Products = ({ product }) => {
    const { addToWishList, removeFromWishlist } = useContext(WishListContext)
    const { wishlistedIds, cartItemsIds } = useContext(AuthContext)
    const { addToCart } = useContext(CartContext)

    const navigate = useNavigate()

    return (
        <div className="product-card">
            {wishlistedIds?.includes(product?._id)
                ?
                < button className="remove-from-wishlist wishlist-btn" onClick={() => removeFromWishlist(product?._id)}><AiFillHeart /></button>
                :
                < button className="add-to-wishlist wishlist-btn" onClick={() => addToWishList(product)}><FaRegHeart /></button>
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
    )
}
