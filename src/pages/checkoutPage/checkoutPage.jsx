import { useContext, useEffect, useState } from "react";
import "./checkout.css";
import { Navigate, useNavigate } from "react-router";
import { ProductReducerContext } from "../../contexts/productReducerContext/productReducerContext";
import { CartContext } from "../../contexts/cartContext";
import { Loader } from "../../components/loader/loader";
import { toast } from "react-toastify";
import ConfettiExplosion from "react-confetti-explosion";
import { FaArrowLeft } from "react-icons/fa";

export const CheckoutPage = () => {
  const encodedToken = localStorage?.getItem("encodedToken");

  const { addressData, addAddress } = useContext(ProductReducerContext);
  const { clearCart } = useContext(CartContext);

  const [cartData, setCartData] = useState(undefined);
  const [selectedAddressId, setSelectedAddressId] = useState(addressData[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addAddressData, setAddAddressData] = useState({
    name: "",
    phone: "",
    pin: "",
    city: "",
    address: "",
    state: "",
  });

  const selectedAddress = addressData?.find(
    ({ id }) => id === Number(selectedAddressId)
  );

  const navigate = useNavigate();

  let expectedDate = new Date();
  let dd = expectedDate.getDate() + Math.floor(Math.random() * 7) + 3;
  let mm = expectedDate.getMonth() + 1;
  let yy = expectedDate.getFullYear();
  if (dd >= 28) {
    dd = dd - 28 + 1;
    mm = Number(mm) + 1;
    if (mm === 12) {
      mm = 1;
      yy = Number(yy) + 1;
    }
  }
  if (dd <= 9) {
    dd = "0" + dd;
  }
  if (mm <= 9) {
    mm = "0" + mm;
  }
  expectedDate = dd + "-" + mm + "-" + yy;

  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const orderHandler = async () => {
    if (addressData?.length > 0) {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        toast.warn("Razorpay SDK failed to load, check you connection");
        return;
      }

      const options = {
        key: "rzp_test_UObwakhEPKhc1f",
        amount: totalPrice * 100,
        currency: "INR",
        name: "Shop-Kart",
        description: "Thank you for shopping with us",
        handler: function (response) {
          toast.success("Payment succesfull");
          setIsModalOpen(true);
          clearCart();
        },
        prefill: {
          name: "Divyank",
          email: "divyank039@gmail.com",
          contact: "9999999999",
        },
        theme: {
          color: "#000",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      toast.warn("Please select or add new adress");
    }
  };

  const nameAddHandler = (event) => {
    setAddAddressData({
      ...addAddressData,
      name: event?.target?.value,
    });
  };
  const phoneAddHandler = (event) => {
    setAddAddressData({
      ...addAddressData,
      phone: event?.target?.value,
    });
  };
  const pinAddHandler = (event) => {
    setAddAddressData({
      ...addAddressData,
      pin: event?.target?.value,
    });
  };
  const cityAddHandler = (event) => {
    setAddAddressData({
      ...addAddressData,
      city: event?.target?.value,
    });
  };
  const addressAddHandler = (event) => {
    setAddAddressData({
      ...addAddressData,
      address: event?.target?.value,
    });
  };
  const stateAddHandler = (event) => {
    setAddAddressData({
      ...addAddressData,
      state: event?.target?.value,
    });
  };

  const addAddressClickHandler = () => {
    if (
      addAddressData?.address?.length > 0 &&
      addAddressData?.state?.length > 0 &&
      addAddressData?.city?.length > 0 &&
      addAddressData?.pin?.length > 0 &&
      addAddressData?.phone?.length > 0 &&
      addAddressData?.name?.length > 0
    ) {
      addAddress(addAddressData);
      setIsAddressModalOpen(false);
      setAddAddressData({
        name: "",
        phone: "",
        pin: "",
        city: "",
        address: "",
        state: "",
      });
    } else {
      toast.warn("All fields are necessary", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const goShoppingClickHandler = () => {
    setCartData([]);
    navigate("/");
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/user/cart", {
        method: "GET",
        headers: { authorization: encodedToken },
      });
      setCartData((await response.json())?.cart);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPrice =
    250 +
    Math.round(
      (cartData?.reduce((acc, curr) => acc + curr?.price * curr?.qty, 0) -
        cartData?.reduce(
          (acc, curr) =>
            acc + curr?.price * (curr.discountPercentage / 100) * curr?.qty,
          0
        ) +
        Number.EPSILON) *
        100
    ) /
      100;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="checkout-page">
      {isModalOpen ? (
        <div className="modal-container">
          <ConfettiExplosion
            className="confetti"
            force={1}
            particleCount={100}
          />
          <div className="checkout-modal">
            <p className="heading">Order Confirmed</p>
            <div className="details">
              <p className="total-price">Total Price: ₹ {totalPrice}</p>
              <p className="eta">Expected Delivery: {expectedDate}</p>
              <p className="declaration">Order will be delivered to: </p>
              <p className="recipient-name">{selectedAddress?.name}</p>
              <p className="recipient-address">{selectedAddress?.address}</p>
              <p className="recipient-number">
                Phone Number: {selectedAddress?.phone}
              </p>
            </div>
            <button
              className="go-to-home-btn"
              onClick={() => goShoppingClickHandler()}
            >
              {" "}
              <FaArrowLeft className="left-arrow" /> Continue Shopping{" "}
            </button>
          </div>
          <ConfettiExplosion
            className="confetti"
            force={1}
            particleCount={100}
          />
        </div>
      ) : !cartData ? (
        <Loader />
      ) : (
        <>
          {isAddressModalOpen && (
            <div className="address-modal-container">
              <div className="add-address-modal">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="name"
                  className="name-input"
                  onChange={nameAddHandler}
                />
                <div className="two-inp-container">
                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="phone"
                    className="phone-input"
                    onChange={phoneAddHandler}
                  />
                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="pin-code"
                    className="pincode-input"
                    onChange={pinAddHandler}
                  />
                </div>
                <div className="two-inp-container">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="city"
                    className="city-input"
                    onChange={cityAddHandler}
                  />
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="state"
                    className="state-input"
                    onChange={stateAddHandler}
                  />
                </div>
                <textarea
                  name=""
                  id=""
                  cols="10"
                  rows="10"
                  placeholder="address"
                  onChange={addressAddHandler}
                ></textarea>
                <button
                  className="add-address-btn"
                  onClick={addAddressClickHandler}
                >
                  Add address
                </button>
                <button
                  className="cancel-add-address"
                  onClick={() => setIsAddressModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {cartData?.length > 0 ? (
            <div className="checkout">
              <h1 className="checkout-heading">Checkout</h1>
              <div className="checkout-parent">
                <div className="address-div">
                  <div className="radio-container">
                    <label className="address-label" key={addressData[0]?.id}>
                      <section className="radio">
                        <input
                          type="radio"
                          defaultChecked="true"
                          name="address"
                          id=""
                          value={addressData[0]?.id}
                          onClick={(event) =>
                            setSelectedAddressId(event?.target?.value)
                          }
                        />
                        <p className="name">{addressData[0]?.name}</p>
                      </section>
                      <p className="address">
                        {addressData[0]?.pin}, {addressData[0]?.address}
                      </p>
                      <p className="city">{addressData[0]?.city}</p>
                      <p className="state">{addressData[0]?.state}</p>
                    </label>
                  </div>
                  {addressData
                    ?.filter(({ id }) => id > 1)
                    ?.map((address) => (
                      <div className="radio-container">
                        <label className="address-label" key={address?.id}>
                          <section className="radio">
                            <input
                              type="radio"
                              name="address"
                              id=""
                              value={address?.id}
                              onClick={(event) =>
                                setSelectedAddressId(event?.target?.value)
                              }
                            />
                            <p className="name">{address?.name}</p>
                          </section>
                          <p className="address">
                            {address?.pin}, {address?.address}
                          </p>
                          <p className="city">{address?.city}</p>
                          <p className="state">{address?.state}</p>
                        </label>
                      </div>
                    ))}
                  <button
                    className="add-address"
                    onClick={() => setIsAddressModalOpen(true)}
                  >
                    Add address
                  </button>
                </div>

                <div className="checkout-card">
                  <p className="heading">Order Details</p>
                  {cartData?.map((cartItem) => (
                    <div className="product-price-name" key={cartItem?._id}>
                      <p className="item-title">{`${cartItem?.title}`}</p>
                      <p className="item-price">{`(${cartItem?.qty})`}</p>
                    </div>
                  ))}
                  <p className="heading">Price Details</p>
                  <div className="price-details">
                    <div className="price">
                      <p className="price-heading">
                        Price ({cartData?.length} items){" "}
                      </p>
                      <p className="price">{`₹ ${
                        Math.round(
                          (cartData?.reduce(
                            (acc, curr) => acc + curr?.price * curr?.qty,
                            0
                          ) +
                            Number.EPSILON) *
                            100
                        ) / 100
                      }`}</p>
                    </div>
                    <div className="discount">
                      <p className="discount-heading">Discount</p>
                      <p className="discount">{`-₹ ${
                        Math.round(
                          (cartData?.reduce(
                            (acc, curr) =>
                              acc +
                              curr?.price *
                                (curr.discountPercentage / 100) *
                                curr?.qty,
                            0
                          ) +
                            Number.EPSILON) *
                            100
                        ) / 100
                      }`}</p>
                    </div>
                    <div className="delivery">
                      <p className="delivery-heading">Delivery</p>
                      <p className="delivery-charge">₹ 250</p>
                    </div>
                    <div className="total-price">
                      <p className="total-price-heading">Total Price</p>
                      <p className="total-price">{`₹ ${totalPrice}`}</p>
                    </div>
                  </div>
                  <div className="address">
                    <p className="heading">Deliver to</p>
                    <p className="name">{selectedAddress?.name}</p>
                    <p className="phone">{selectedAddress?.phone}</p>
                  </div>
                  <button
                    className="place-order"
                    onClick={() => orderHandler()}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )}
        </>
      )}
    </div>
  );
};
