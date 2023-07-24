import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { DataHandler } from "./contexts/dataContext";
import { ProductReducerHandler } from "./contexts/productReducerContext/productReducerContext";
import { AuthenticationHandler } from "./contexts/authContext";
import { WishListHandler } from "./contexts/wishListContext";
import { CartHandler } from "./contexts/cartContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DataHandler>
        <ProductReducerHandler>
          <AuthenticationHandler>
            <WishListHandler>
              <CartHandler>
                <App />
              </CartHandler>
            </WishListHandler>
          </AuthenticationHandler>
        </ProductReducerHandler>
      </DataHandler>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
