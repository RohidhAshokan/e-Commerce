import "./styles.css";
import { useEffect, useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import PageBtnComponent from "../components/PageBtnComponent";
import { CheckboxComponent } from "../components/CheckboxComponent";
import Collection from "../components/Collection";
import { Image } from "../images";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategoriesCb,
  getCategoryId,
  getColorsCb,
  getFilterStatus,
  getProductList,
  getSearchText,
} from "../redux/action";
import RangeComponent from "../components/RangeComponent";

export function Featured() {
  const dispatch = useDispatch();
  let [pageNumber, setPageNumber] = useState(1);
  const {
    productList,
    searchText,
    isFilter,
    categoriesCb,
    colorsCb,
    categoryId,
  } = useSelector((state) => state.ProductReducer);
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
    return () => {
      dispatch(getFilterStatus(true));
    };
  }, []);
  useEffect(() => {
    resetCb();
  }, [searchText]);

  const resetCb = () => {
    dispatch(
      getCategoriesCb(
        categories.map((category, index) => {
          const existingCategory = categoriesCb?.find(
            (item) => item.name === category,
          );
          if (categoryId.length > 0) {
            return {
              id: index + 1,
              name: category,
              isActive: categoryId.includes(category),
            };
          } else {
            return {
              id: index + 1,
              name: category,
              isActive: true,
            };
          }
        }),
      ),
    );

    dispatch(getCategoryId([]));
    dispatch(
      getColorsCb(
        colors.map((items, index) => {
          colorsCb?.find((item) => item.name === items);

          return {
            id: index + 1,
            name: items,
            isActive: true,
          };
        }),
      ),
    );
    setPageNumber(1);
  };

  if (categoriesCb) {
    searchResults = [...searchResults].filter((el) =>
      categoriesCb.find(
        (category) => category.isActive && el.category === category.name,
      ),
    );
  }
  if (colorsCb) {
    searchResults = [...searchResults].filter((el) =>
      colorsCb.find((color) => color.isActive && el.colors.name === color.name),
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
    const updatedCategory = categoriesCb.map((el) => {
      if (name === el.name) {
        return { ...el, isActive: checked };
      } else return el;
    });
    const updatedColor = colorsCb.map((el) => {
      if (name === el.name) {
        return { ...el, isActive: checked };
      } else return el;
    });
    dispatch(getCategoriesCb(updatedCategory));
    dispatch(getColorsCb(updatedColor));
    setPageNumber(1);
  }
  function handleCollection(elId) {
    dispatch(getSearchText(""));
    dispatch(getCategoryId(elId));
    setMinVal(min);
    setMaxVal(max);
    resetCb();
  }
  function handleClearFilter() {
    dispatch(getSearchText(""));
    setMinVal(min);
    setMaxVal(max);
    resetCb();
  }
  return (
    <div
      className="search-layout"
      style={
        isFilter && searchResults.length > 0
          ? {
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "40px",
              padding: "40px 48px",
            }
          : searchResults.length > 0
            ? { padding: "40px 64px" }
            : { padding: "56px 48px", maxWidth: "920px", margin: "0 auto" }
      }
    >
      {isFilter && searchResults.length > 0 && (
        <div className="filter-sidebar">
          <div className="filter-group">
            <h4>Category</h4>
            <CheckboxComponent
              onChange={(e) => handleCategory(e)}
              data={categoriesCb}
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
              onChange={(e) => handleCategory(e)}
              data={colorsCb}
            />
          </div>
        </div>
      )}

      {searchResults.length > 0 ? (
        <div>
          {
            <p className="search-header">
              Showing results for{" "}
              {searchText && <strong>"{searchText}"</strong>} —{" "}
              {searchResults.length} items
            </p>
          }

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
          {productListLength > 1 && (
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
          )}
        </div>
      ) : (
        <div>
          <p className="search-header">
            Showing results for {searchText && <strong>"{searchText}"</strong>}{" "}
            — {searchResults.length} items
          </p>
          <div className="cart-rule-line" style={{ opacity: "0.25" }}></div>
          <div className="cart-empty-wrap">
            <div>
              <img
                src={Image.searchCancled}
                style={{
                  height: "40px",
                  width: "40px",
                  marginBottom: "16px",
                }}
              />
            </div>
            <h2 className="cart-empty-head">
              No products found {searchText ? " for" + ` "${searchText}"` : ""}
            </h2>
            <p className="cart-empty-para" style={{ margin: "0" }}>
              {searchText
                ? "Check the spelling, try a different keyword,"
                : categoriesCb.find((el) => el.isActive === true)
                  ? colorsCb.find((el) => el.isActive === true)
                    ? "Provided price does not matched any of the product,"
                    : "Selected color is not availabe, try a diffrent color or product,"
                  : "Category does not match, try a diffrent category,"}
              or
            </p>
            <p className="cart-empty-para">remove some filters.</p>
            <ButtonComponent variant={"primary"} onClick={handleClearFilter}>
              Clear filter
            </ButtonComponent>
          </div>
          <div className="cart-rule-line"></div>
          <div style={{ padding: "30px 0 0 0", fontSize: "20px" }}>
            <Collection
              handleCollection={handleCollection}
              picLable={"Popular right now"}
              picHeight={"195px"}
              picWidth={"261px"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
