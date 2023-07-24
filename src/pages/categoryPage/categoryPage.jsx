import { useNavigate, useParams } from 'react-router-dom';
import './categoryPage.css'
import { useContext, useEffect, useState } from 'react';
import { ProductReducerContext } from '../../contexts/productReducerContext/productReducerContext';
import { DataContext } from '../../contexts/dataContext';
import { Products } from '../../components/products/products';
import { Loader } from '../../components/loader/loader';
import 'react-toastify/dist/ReactToastify.css';
import {FaFilter} from 'react-icons/fa'

export const CategoryPage = () => {
    const { categoryName } = useParams();

    const navigate = useNavigate();

    const [isResponsiveFiltersOpen, setIsResponsiveFiltersOpen] = useState(false);

    const { setIsSearchModalOpen, setMenuState } = useContext(ProductReducerContext);
    const { responseData } = useContext(DataContext);

    const category = responseData?.productCategories?.categories?.find((category) => category?.categoryName === categoryName);
    const products = responseData?.productData?.products?.filter(({ category }) => category === categoryName)
    const otherCategories = responseData?.productCategories?.categories?.filter((category) => category?.categoryName !== categoryName);

    const checkBoxArr = [...new Set(products?.map(({ brand }) => brand))]
    const maxPrice = products?.reduce((acc, curr) => acc > (curr?.price - (curr?.price * (curr.discountPercentage / 100))) ? acc : (curr?.price - (curr?.price * (curr.discountPercentage / 100))), 0) + 1;

    const [priceFilteredData, setPriceFilteredData] = useState(products);
    const [checkedArr, setCheckedArr] = useState(products?.map(({ brand }) => brand))

    const priceChangeHandler = (event) => {
        setPriceFilteredData(products?.filter((product) => (product?.price - (product?.price * (product.discountPercentage / 100))) <= event.target.value))
    }
    const checkBoxHandler = (event) => {
        if (checkedArr) {
            if (event.target.checked) {
                setCheckedArr([...checkedArr, event.target.value])
            } else {
                setCheckedArr(checkedArr?.filter((category) => category !== event.target.value))
            }
        } else {
            setCheckedArr(checkBoxArr.filter((category) => category !== event.target.value))
            if (priceFilteredData) {
                setPriceFilteredData(priceFilteredData)
            } else {
                setPriceFilteredData(products)
            }

        }
    }

    const filteredData = priceFilteredData?.filter(({ brand }) => (
        !checkedArr?.every(checkbox => (brand !== checkbox))
    ))

    const sortLoToHi = (event) => {
        if (event.target.checked) {
            filteredData ?
                setPriceFilteredData(filteredData?.sort((a, b) => (a?.price - (a?.price * (a.discountPercentage / 100))) - (b?.price - (b?.price * (b?.discountPercentage / 100)))))
                :
                setPriceFilteredData(products?.sort((a, b) => (a?.price - (a?.price * (a.discountPercentage / 100))) - (b?.price - (b?.price * (b?.discountPercentage / 100)))));
        }
    }

    const sortHiToLo = (event) => {
        if (event.target.checked) {
            filteredData ?
                setPriceFilteredData(filteredData?.sort((a, b) => (b?.price - (b?.price * (b?.discountPercentage / 100))) - (a?.price - (a?.price * (a.discountPercentage / 100)))))
                :
                setPriceFilteredData(products?.sort((a, b) => (b?.price - (b?.price * (b?.discountPercentage / 100))) - (a?.price - (a?.price * (a?.discountPercentage / 100)))));
        }
    }
    const ratingHandlerLoToHi = (event) => {
        if (event.target.checked) {
            filteredData ?
                setPriceFilteredData(filteredData?.sort((a, b) => a.rating - b.rating))
                :
                setPriceFilteredData(products?.sort((a, b) => a.rating - b.rating));
        }
    }
    const ratingHandlerHiToLo = (event) => {
        if (event.target.checked) {
            filteredData ?
                setPriceFilteredData(filteredData?.sort((a, b) => b.rating - a.rating))
                :
                setPriceFilteredData(products?.sort((a, b) => b.rating - a.rating));
        }
    }

    const otherCategoryClickHandler = (categoryName) => {
        setTimeout(() => {
            navigate(`/`)
        }, 0);
        setTimeout(() => {
            navigate(`/category/${categoryName}`)
        }, 1);
    }

    useEffect(() => {
        setIsSearchModalOpen(false)
        setMenuState(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        !responseData?.productCategories?.categories
            ?
            <Loader />
            :
            <div className="category-page">
                <div className="category-front" style={{ backgroundImage: `url(${category?.image})` }}>
                    <p className="category-title">
                        {category?.categoryName}
                    </p>
                </div>
                <div className="contents">
                    <div className="category-filters">
                        <div className="filters">
                            <p className="filter-head">Filters</p>
                            <div className="filters-div">
                                <div className="price-slider-div">
                                    {maxPrice &&
                                        <label className='price-slider'>
                                            <p>Price</p>
                                            <div className="prices">
                                                <p>0</p>
                                                <p>₹ {Math.round(maxPrice / 2)}</p>
                                                <p>₹ {Math.round(maxPrice - 1)}</p>
                                            </div>
                                            <input type="range" className="price-slider" min='0' max={maxPrice + 1} defaultValue={maxPrice + 1} onChange={priceChangeHandler} />
                                        </label>}
                                </div>
                                <div className="brand-section">
                                    <p>Brands</p>
                                    {checkBoxArr?.map((brand, index) => (
                                        <label className="brand-selector" key={index} onChange={checkBoxHandler}>
                                            <input type="checkbox" name={brand} value={brand} defaultChecked /> {brand}
                                        </label>
                                    ))}
                                </div>
                                <div className="sort-by-price">
                                    <p>Sort By Price</p>
                                    <label onChange={sortHiToLo}><input type="radio" name="price" id="" />Sort high To Low</label>
                                    <label onChange={sortLoToHi}><input type="radio" name="price" id="" />Sort Low to High</label>
                                </div>
                                <div className="sort-by-rating">
                                    <p>Sort By Rating</p>
                                    <label onChange={ratingHandlerHiToLo}><input type="radio" name="rating" id="" />Sort high To Low</label>
                                    <label onChange={ratingHandlerLoToHi}><input type="radio" name="rating" id="" />Sort Low to High</label>
                                </div>
                            </div>
                        </div>

                        <div className="filters">
                            {isResponsiveFiltersOpen && <>
                                <div className="responsive-filters-div">
                                <p className="filter-head">Filters</p>
                                    <div className="price-slider-div">
                                        {maxPrice &&
                                            <label className='price-slider'>
                                                <p>Price</p>
                                                <div className="prices">
                                                    <p>0</p>
                                                    <p>₹ {Math.round(maxPrice / 2)}</p>
                                                    <p>₹ {Math.round(maxPrice - 1)}</p>
                                                </div>
                                                <input type="range" className="price-slider" min='0' max={maxPrice + 1} defaultValue={maxPrice + 1} onChange={priceChangeHandler} />
                                            </label>}
                                    </div>
                                    <div className="brand-section">
                                        <p>Brands</p>
                                        {checkBoxArr?.map((brand, index) => (
                                            <label className="brand-selector" key={index} onChange={checkBoxHandler}>
                                                <input type="checkbox" name={brand} value={brand} defaultChecked /> {brand}
                                            </label>
                                        ))}
                                    </div>
                                    <div className="sort-by-price">
                                        <p>Sort By Price</p>
                                        <label onChange={sortHiToLo}><input type="radio" name="price" id="" />Sort high To Low</label>
                                        <label onChange={sortLoToHi}><input type="radio" name="price" id="" />Sort Low to High</label>
                                    </div>
                                    <div className="sort-by-rating">
                                        <p>Sort By Rating</p>
                                        <label onChange={ratingHandlerHiToLo}><input type="radio" name="rating" id="" />Sort high To Low</label>
                                        <label onChange={ratingHandlerLoToHi}><input type="radio" name="rating" id="" />Sort Low to High</label>
                                    </div>
                                </div>
                            </>}
                        </div>
                    </div>
                    <div className='products'>

                        <div className="other-categories">
                            <p className="heading">Other Categories</p>
                            <div className="contents">
                                {otherCategories?.map((category) => (
                                    <div className="other-category" key={category?._id} onClick={() => otherCategoryClickHandler(category?.categoryName)}>
                                        <div className="category-img-container">
                                            <img src={category?.image} alt="" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="product-div">
                            {
                                priceFilteredData ?

                                    filteredData.length === 0 ?
                                        <div className="not-available">
                                            <p>Sorry, but there are no products that match both the selected price range and brands. Please try adjusting your filters or selecting different options to find products that meet your criteria.</p>
                                        </div>

                                        : <div className="product-card-container">
                                            {filteredData?.map((product) => (
                                                <Products product={product} key={product?._id} />
                                            ))}
                                        </div>

                                    :
                                    <div className="product-card-container">
                                        {products?.map((product) => (
                                            <Products product={product} key={product?._id} />
                                        ))}
                                    </div>


                            }
                        </div>
                    </div>
                    <button className="toggle-responsive-filters" onClick={() => setIsResponsiveFiltersOpen(!isResponsiveFiltersOpen)} >
                        <FaFilter />
                    </button>
                </div>
            </div>
    )
}