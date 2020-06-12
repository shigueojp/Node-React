export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_TO_CART_REQUEST',
    id,
  };
}

export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_TO_CART_SUCCESS',
    product,
  };
}

export function removeToCart(id) {
  return { type: '@cart/REMOVE_FROM_CART', id };
}

export function updateAmountToCartRequest(id, amount) {
  return { type: '@cart/UPDATE_AMOUNT_TO_CART_REQUEST', id, amount };
}

export function updateAmountToCartSuccess(id, amount) {
  return { type: '@cart/UPDATE_AMOUNT_TO_CART_SUCCESS', id, amount };
}
