import css from 'styled-jsx/css';

export default css`
  //-------------------------------------

  @import './frontend/styles/mixins/responsive.scss';

  //-------------------------------------

  .form {
    width: 100%;
    position: relative;
    .field {
      position: relative;
      margin-bottom: 40px;
      transition: margin-bottom ease-out 1s;
    }
    .alpha {
      opacity: 0.7;
      will-change: opacity;
    }
    :global(.captcha) {
      transform-origin: 0 0;
      margin: 0;
    }
    :global(.submit) {
      margin: 20px 0;
      background-color: transparent;
      border: 0;
      outline: 0;
    }
    :global(.notverified) {
      display: inline-block;
      user-select: none;
      text-decoration: line-through;
      cursor: not-allowed;
    }

    .label {
      position: absolute;
      left: 0;
      z-index: -1;
      will-change: transform;
    }
    
    .textarea {
      overflow: hidden;
      resize: none;
      max-height: 150px;
    }
    
    .textarea, .input {
      padding-bottom: 2px;
      outline: none;
      width: 100%;
      background-color: transparent;
      border: 0;
      border-radius: 0;
      border-bottom: 1px solid #808080;
      box-shadow: none;
    }

    .status {
      display: none;
      position: absolute;
      font-weight: normal;
    }
  }
  
  //-------------------------------------

`;

