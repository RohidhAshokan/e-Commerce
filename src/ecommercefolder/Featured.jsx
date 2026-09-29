import "./styles.css";
import { useEffect, useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import PageBtnComponent from "../components/PageBtnComponent";
import { CheckboxComponent } from "../components/CheckboxComponent";
import { Image } from "../images";
import { useSelector, useDispatch } from "react-redux";
import { getProductList, getSearchText } from "../redux/action";
import RangeComponent from "../components/RangeComponent";

export function Featured() {
  const dispatch = useDispatch();
  let [pageNumber, setPageNumber] = useState(1);
  const [categoryCheckbox, setCategoryCheckbox] = useState();
  const [colorCheckbox, setColorCheckbox] = useState();
  const { productList, searchText, isFilter } = useSelector(
    (state) => state.ProductReducer,
  );
  const shoppingCartIcon = Image.shoppingCartIcon;
  let numberOfProduct = 8;
  let lastIndex = pageNumber * numberOfProduct;
  let firstIndex = lastIndex - numberOfProduct;
  let searchResults = productList.filter((el) =>
    el.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  
  let price = [...new Set(searchResults.map((el) => el.price))];

  let newPrice = price.map((el) => el.replaceAll("₹", "").replaceAll(",", ""));
  newPrice.sort((a, b) => a - b);
  let min = 0;
  let maxNumber = newPrice[newPrice.length - 1];
  let max = Math.ceil(maxNumber / 1000) * 1000;

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  
  const categories = [...new Set(searchResults.map((el) => el.category))];
  let colors = [...new Set(searchResults.map((el) => el.colors.name))];
  useEffect(() => {
    setCategoryCheckbox((prev) =>
      categories.map((category, index) => {
        const existingCategory = prev?.find((item) => item.name === category);
        
        return {
          id: index + 1,
          name: category,
          isActive: true,
        };
      }),
    );
    setColorCheckbox((prev) =>
      colors.map((items, index) => {
        prev?.find((item) => item.name === items);

        return {
          id: index + 1,
          name: items,
          isActive: true,
        };
      }),
    );
  }, [searchText, productList]);

  if (categoryCheckbox) {
    searchResults = [...searchResults].filter((el) =>
      categoryCheckbox.find(
        (category) => category.isActive && el.category === category.name,
      ),
    );
  }
  if (colorCheckbox) {
    searchResults = [...searchResults].filter((el) =>
      colorCheckbox.find(
        (color) => color.isActive && el.colors.name === color.name,
      ),
    );
  }

  if (max) {
    searchResults = [...searchResults].filter(
      (el) =>
        el.price.replaceAll("₹", "").replaceAll(",", "") >= minVal &&
        el.price.replaceAll("₹", "").replaceAll(",", "") <= maxVal,
    );
  }
  let updatedList = searchResults.slice(firstIndex, lastIndex);
  let productListLength = Math.ceil(searchResults.length / numberOfProduct);

  const pageRedirect = (index) => setPageNumber(index + 1);
  const handlePreviousPage = () => setPageNumber(pageNumber - 1);
  const handleNextPage = () => setPageNumber(pageNumber + 1);

  const handleOnClick = (el) => {
    if (el.isAdded) {
      return;
    }
    handleAddToCart(el, false, true);
    setTimeout(() => {
      handleAddToCart(el, true, false);
    }, 500);
  };

  function handleAddToCart(el, isAdded, isLoading) {
    let updatedProductList = productList.map((item) => {
      if (item.id === el.id && item.inStock) {
        return { ...item, isAdded: isAdded, isLoading: isLoading, quantity: 1 };
      } else return item;
    });
    dispatch(getProductList(updatedProductList));
  }
  useEffect(() => {
    return () => {
      dispatch(getSearchText(""));
    };
  }, []);
  function handleCategory(e) {
    const { name, checked } = e.target;
    const updatedCategory = categoryCheckbox.map((el) => {
      if (name === el.name) {
        return { ...el, isActive: checked };
      } else return el;
    });
    const updatedColor = colorCheckbox.map((el) => {
      if (name === el.name) {
        return { ...el, isActive: checked };
      } else return el;
    });
    setCategoryCheckbox(updatedCategory);
    setColorCheckbox(updatedColor);
  }

  return (
    <div
      className="bg-wrap"
      style={{
        padding: "40px 48px",
      }}
    >
      <div
        className="search-layout"
        style={
          isFilter
            ? {
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                gap: "40px",
              }
            : {}
        }
      >
        {isFilter && (
          <div className="filter-sidebar">
            <div className="filters">
              <div className="filter-group">
                <h4>Category</h4>
                <CheckboxComponent
                  categoryCheckbox={categoryCheckbox}
                  onChange={(e) => handleCategory(e)}
                />
              </div>
              <div className="filter-group" style={{ paddingBottom: "20px" }}>
                <h4>Price</h4>
                <RangeComponent
                  setMinVal={setMinVal}
                  setMaxVal={setMaxVal}
                  min={0}
                  max={max}
                  minVal={minVal}
                  maxVal={maxVal}
                />
              </div>
              <div className="filter-group">
                <h4>Color</h4>
                <CheckboxComponent
                  colorCheckbox={colorCheckbox}
                  onChange={(e) => handleCategory(e)}
                />
              </div>
            </div>
          </div>
        )}

        <div>
          {isFilter && (
            <p className="search-header">
              Showing results for — {searchResults.length} items
            </p>
          )}
          <div
            className="feature-grid"
            style={isFilter ? { gap: "20px" } : { gap: "50px" }}
          >
            {updatedList.map((el) => {
              return (
                <div key={el.id}>
                  <img
                    src={el.image}
                    style={
                      isFilter
                        ? { height: "200px", width: "200px" }
                        : { height: "250px", width: "250px" }
                    }
                  />
                  <div className="card-title">{el.name}</div>
                  <div className="card-sub" style={{ display: "flex" }}>
                    {el.colors.name}
                  </div>
                  <div className="card-price">{el.price}</div>
                  <ButtonComponent
                    variant={
                      el.isAdded
                        ? "outlineFullWidth"
                        : el.inStock
                          ? "primaryFullWidth"
                          : "dangerFullWidth"
                    }
                    onClick={() => handleOnClick(el)}
                  >
                    <>
                      {el.isLoading ? (
                        <div className="loading-spinner"></div>
                      ) : (
                        <div className="button-style">
                          {el.isAdded ? (
                            <></>
                          ) : el.inStock ? (
                            <img
                              src={shoppingCartIcon}
                              style={{
                                height: "17px",
                                width: "17px",
                                alignItems: "center",
                              }}
                            />
                          ) : (
                            <></>
                          )}

                          {el.isAdded
                            ? "Added to Cart"
                            : el.inStock
                              ? "Add to Cart"
                              : "Out of Stock"}
                        </div>
                      )}
                    </>
                  </ButtonComponent>
                </div>
              );
            })}
          </div>
          <div className="page-wrap">
            <PageBtnComponent
              variant={"outlineRounded"}
              onClick={handlePreviousPage}
              disabled={pageNumber === 1}
            >
              {"<-"}
            </PageBtnComponent>
            {Array(productListLength)
              .fill("")
              .map((el, index) => {
                return (
                  <PageBtnComponent
                    key={index}
                    variant={
                      pageNumber === index + 1
                        ? "primaryRounded"
                        : "outlineRounded"
                    }
                    onClick={() => pageRedirect(index)}
                  >
                    {index + 1}
                  </PageBtnComponent>
                );
              })}
            <PageBtnComponent
              variant={"outlineRounded"}
              onClick={handleNextPage}
              disabled={pageNumber === productListLength}
            >
              {"->"}
            </PageBtnComponent>
          </div>
        </div>
      </div>
    </div>
  );
}
