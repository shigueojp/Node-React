import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductList } from './styles';
import * as CartActions from '../../store/modules/cart/action';
import api from '../../services/api';

import formatPrice from '../../utils/format';

function Home({ amount, addToCartRequest }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Way to run async function in React Hooks
    async function loadProducts() {
      const response = await api.get('/products');

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice.format(product.price),
      }));

      // setProducts({ products: data });
      // TO
      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    addToCartRequest(id);
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />
              {amount[product.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
