import { Routes, Route } from "react-router-dom";
import { Featured } from "./ecommercefolder/Featured";
import { Orders } from "./ecommercefolder/Orders";
import { Cart } from "./ecommercefolder/Cart";
import { Login } from "./ecommercefolder/Login";
import { Navbar } from "./ecommercefolder/Navbar";
import { Home } from "./ecommercefolder/Home";
import { Signup } from "./ecommercefolder/Signup";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/reduxStore";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/featured" element={<Featured />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </PersistGate>
      </Provider>
    </>
  );
}
