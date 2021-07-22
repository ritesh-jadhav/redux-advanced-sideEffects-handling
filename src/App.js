import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiSliceActions } from "./store/ui-slice";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    const sentCartData = async () => {
      dispatch(
        uiSliceActions.showNotification({
          status: "Pending",
          title: "Sending...",
          message: "sending cart data!",
        })
      );

      const response = await fetch(
        "https://redux-product-store-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data to backend falied...");
      }

      dispatch(
        uiSliceActions.showNotification({
          status: "success",
          title: "Success !",
          message: "sent cart data suceesfully !",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }
    sentCartData().catch((error) =>
      dispatch(
        uiSliceActions.showNotification({
          status: "error",
          title: "Error !",
          message: "sending cart data failed !",
        })
      )
    );
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
