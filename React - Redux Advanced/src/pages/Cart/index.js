import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import * as CartActions from '../../store/modules/cart/action';
import { Container, ProductTable, Total } from './styles';
import formatPrice from '../../utils/format';
// import { Container } from './styles';
export default function Cart() {
  const cart = useSelector((state) =>
    state.cart.map((product) => ({
      ...product,
      totalPrice: formatPrice.format(product.amount * product.price),
    }))
  );

  const dispatch = useDispatch();

  const total = useSelector((state) =>
    formatPrice.format(
      state.cart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.amount;
      }, 0)
    )
  );

  function increaseAmountToCartHandler(product) {
    dispatch(
      CartActions.updateAmountToCartRequest(product.id, product.amount + 1)
    );
  }

  function decreaseAmountToCartHandler(product) {
    dispatch(
      CartActions.updateAmountToCartRequest(product.id, product.amount - 1)
    );
  }
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QDE</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.price}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    onClick={() => decreaseAmountToCartHandler(product)}
                  >
                    <MdRemoveCircleOutline size={20} color="#FF9900" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button
                    type="button"
                    onClick={() => increaseAmountToCartHandler(product)}
                  >
                    <MdAddCircleOutline size={20} color="#FF9900" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.totalPrice}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => dispatch(CartActions.removeToCart(product.id))}
                >
                  <MdDelete size={20} color="#FF9900" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
