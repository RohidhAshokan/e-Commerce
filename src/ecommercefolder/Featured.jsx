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
  const { productList, searchText, isFilter } = useSelector(
    (state) => state.ProductReducer,
  );
  let numberOfProduct = 8;
  let lastIndex = pageNumber * numberOfProduct;
  let firstIndex = lastIndex - numberOfProduct;
  let searchResults = productList.filter((el) =>
    el.name.toLowerCase().includes(searchText.toLowerCase()),
  );
  let updatedList = searchResults.slice(firstIndex, lastIndex);
  let productListLength = Math.ceil(searchResults.length / numberOfProduct);
  const shoppingCartIcon = Image.shoppingCartIcon;
  const pageRedirect = (index) => setPageNumber(index + 1);
  const handlePreviousPage = () => setPageNumber(pageNumber - 1);
  const handleNextPage = () => setPageNumber(pageNumber + 1);
  let category = [...new Set(productList.map((el) => el.category))];
  let price = [...new Set(productList.map((el) => el.price))];
  let checkboxOptions = [];
  let checkboxOptions2 = [];
  let colors = [...new Set(productList.map((el) => el.colors.name))];

  category.map((el, index) =>
    checkboxOptions.push({ id: index + 1, name: el, isActive: false }),
  );
  let newPrice = price.map((el) => el.replaceAll("₹", "").replaceAll(",", ""));
  newPrice.sort((a, b) => a - b);
  let min = 0;
  let maxNumber = newPrice[newPrice.length - 1];
  let max = Math.ceil(maxNumber / 1000) * 1000;
  colors.map((el, index) =>
    checkboxOptions2.push({ id: index + 1, name: el, isActive: false }),
  );

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
                <CheckboxComponent checkboxOptions={checkboxOptions} />
              </div>
              <div className="filter-group" style={{paddingBottom: "20px"}}>
                <h4>Price</h4>
                <RangeComponent min={min} max={max} />
              </div>
              <div className="filter-group">
                <h4>Color</h4>
                <CheckboxComponent checkboxOptions2={checkboxOptions2} />
              </div>
            </div>
          </div>
        )}

        <div>
          {isFilter && (
            <p className="search-header">
              Showing results for — {productList.length} items
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
