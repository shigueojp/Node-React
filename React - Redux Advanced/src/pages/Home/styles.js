import styled from 'styled-components';
import { darken } from 'polished';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background: white;

    img {
      align-self: center;
      max-width: 150px;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      overflow: hidden;
      background: #ff9900;
      color: #fff;
      border: 0;
      border-radius: 3px;
      margin-top: auto;

      display: flex;
      align-items: center;

      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#FF9900')};
      }

      div {
        display: flex;
        align-items: ccenter;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }
      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;