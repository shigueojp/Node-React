import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
/* Zerando as configurações */
  * {
    margin: 0;
    padding:0;
    outline: 0;
    box-sizing: border-box
  }

  /* Pegar a tela inteira em relação a altura */
  html, border-style, #root {
    min-height: 100%
  }

  /* Deixa as fontes mais bonitas */
  body {
    background: #7159c1;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
  color: #222;
  font-size: 14px;
}

button {
  cursor: pointer;
}
`;
