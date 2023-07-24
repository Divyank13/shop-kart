import { NavLink, Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import {
  FaSearch,
  FaTimes,
  FaAlignJustify,
  FaShoppingCart,
  FaRegHeart,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "./header.css";
import { ProductReducerContext } from "../../contexts/productReducerContext/productReducerContext";
import { AuthContext } from "../../contexts/authContext";
import { toast } from "react-toastify";

export const Header = () => {
  const {
    searchHandler,
    searchData,
    isSearchModalOpen,
    searchBarData,
    menuState,
    setMenuState,
    setIsSearchModalOpen,
  } = useContext(ProductReducerContext);
  const { isLoggedIn, wishlistedIds, cartItemsIds } = useContext(AuthContext);

  const navigate = useNavigate();

  const searchClickHandler = () => {
    setIsSearchModalOpen(false);
    if (searchBarData.length === 0) {
      toast(
        "Enter a keyword or product name in the search bar above to start exploring.",
        {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } else if (searchData.length === 0) {
      toast.warn(
        "Oops! We couldn't find any items matching your search criteria. Please try a different search term or browse through our categories to find what you're looking for.",
        {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } else {
      navigate("/search");
    }
  };

  const singleProductNavigationHandler = (productId) => {
    setTimeout(() => {
      navigate("/");
    }, 0);
    setTimeout(() => {
      navigate(`/product/${productId}`);
    }, 1);
  };

  const handleKeyPressFunc = (event) => {
    if (event.key === "Enter") {
      searchClickHandler();
    }
  };

  return (
    <>
      <div className="header">
        <Link to="/" className="nav-head">
          Shop-Kart
        </Link>
        <div className="search">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search"
            onChange={searchHandler}
            onKeyDown={handleKeyPressFunc}
          />
          <button onClick={searchClickHandler}>
            <FaSearch />
          </button>
        </div>
        <div className="menuButtons">
          <button className="menuBtn" onClick={() => setMenuState(!menuState)}>
            {" "}
            {menuState ? <FaTimes /> : <FaAlignJustify />}{" "}
          </button>
        </div>
        <nav className="nav-links">
          {!isLoggedIn && (
            <NavLink to="/login" className="nav-link nav-btn">
              Login
            </NavLink>
          )}
          <NavLink to="/products" className="nav-link nav-btn">
            Explore
          </NavLink>
          <NavLink to="/wishlist" className="nav-link">
            <FaRegHeart className="nav-icon" />
            {wishlistedIds?.length > 0 && (
              <sub className="nav-quantity">{wishlistedIds?.length}</sub>
            )}
          </NavLink>
          <NavLink to="/cart" className="nav-link">
            <FaShoppingCart className="nav-icon" />
            {cartItemsIds?.length > 0 && (
              <sub className="nav-quantity">{cartItemsIds?.length}</sub>
            )}
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/profile" className="nav-link">
              <CgProfile className="nav-icon" />
            </NavLink>
          )}
        </nav>
      </div>
      {searchData.length > 0 && isSearchModalOpen && (
        <div className="search-results">
          {searchData.map((product) => (
            <div
              className="search-result"
              key={product?.id}
              onClick={() => singleProductNavigationHandler(product?._id)}
            >
              <div className="img-container">
                <img src={product?.thumbnail} alt={product?.title} />
              </div>
              <div className="content">
                <div className="title-price">
                  <p className="product-title">{product.title}</p>
                  <p className="product-price">{`₹ ${Math.round(
                    product?.price -
                      product?.price * (product.discountPercentage / 100)
                  )}`}</p>
                </div>
                <p className="brand">{product.brand}</p>
                <p className="desc">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {menuState && (
        <div className="menu-links">
          <nav className="menu-nav-links">
            <NavLink to="/products" className="nav-link">
              Explore
            </NavLink>
            <NavLink to="/wishlist" className="nav-link">
              Wishlist
            </NavLink>
            <NavLink to="/cart" className="nav-link">
              Cart
            </NavLink>
            {isLoggedIn ? (
              <NavLink to="/profile" className="nav-link">
                Profile
              </NavLink>
            ) : (
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            )}
          </nav>
        </div>
      )}
    </>
  );
};
