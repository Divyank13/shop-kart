import { useContext, useEffect } from 'react'
import './searchPage.css'
import { ProductReducerContext } from '../../contexts/productReducerContext/productReducerContext'
import { Products } from '../../components/products/products'

export const SearchPage = () => {
    const { searchBarData, searchData, setIsSearchModalOpen, setMenuState } = useContext(ProductReducerContext)

    const searchResults = searchData?.filter(({ title }) => title.slice(0, searchBarData?.length).toLowerCase() === searchBarData?.toLowerCase());

    const searchSuggestions = searchData?.filter(({ title }) => title.slice(0, searchBarData?.length).toLowerCase() !== searchBarData?.toLowerCase())
        ?.filter(({ title }) => title.toLowerCase()?.includes(searchBarData?.toLowerCase()))

    useEffect(() => {
        setIsSearchModalOpen(false)
        setMenuState(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="search-page">
            {searchBarData.length === 0 ?
                <div className="data-not-found">
                    <p>Enter a keyword or product name in the search bar above to start exploring.</p>
                </div>
                : searchData.length === 0 ?
                    <div className="data-not-found">
                        <p>Oops! We couldn't find any items matching your search criteria. Please try a different search term or browse through our categories to find what you're looking for.</p>
                    </div>
                    : <div className="data-found">
                        {searchResults?.length > 0 &&
                            <div className="data-search-results">
                                <p className="heading">Search Results</p>
                                <div className="searched-products">
                                    {searchResults?.map((product) => (
                                        <Products product={product} key={product?.id} />
                                    ))}
                                </div>
                                <hr />
                            </div>
                        }
                        {searchSuggestions?.length > 0 &&
                            <div className="data-search-suggestions">
                                <p className="heading">Search Suggestions</p>
                                <div className="search-suggestions">
                                    {searchSuggestions?.map((product) => (
                                        <Products product={product} key={product?.id} />
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
            }
        </div>
    )
}
