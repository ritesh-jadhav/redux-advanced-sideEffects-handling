import { uiSliceActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-product-store-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
      }));
    } catch (error) {
      dispatch(
        uiSliceActions.showNotification({
          status: "error",
          title: "Error !",
          message: "Fetching cart data failed !",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-product-store-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data to backend falied...");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiSliceActions.showNotification({
          status: "success",
          title: "Success !",
          message: "sent cart data suceesfully !",
        })
      );
    } catch (error) {
      dispatch(
        uiSliceActions.showNotification({
          status: "error",
          title: "Error !",
          message: "sending cart data failed !",
        })
      );
    }
  };
};
