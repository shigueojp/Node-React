import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { useSelector } from 'react-redux';
import logo from '../../assets/img/logo_aws.svg';
import { Container, Cart } from './style';

// import { Container } from './styles';

export default function Header() {
  const cartSize = useSelector((state) => state.cart.length);
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="AWS" />
      </Link>
      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span> {cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="orange" />
      </Cart>
    </Container>
  );
}
