import css from 'styled-jsx/css';

export default css`
  //-------------------------------------

  @import './frontend/styles/mixins/responsive.scss';

  //-------------------------------------

  .form {
    width: 100%;
    margin-top: 50px;
    :global(div) {
      margin-bottom: 40px;
    }
    :global(.captcha) {
      transform-origin: 0 0;
    }
    :global(.submit) {
      position: relative;
      bottom: 20px;
      background-color: transparent;
      border: 0;
      outline: 0;
    }
    :global(.notverified) {
      display: inline-block;
      user-select: none;
      text-decoration: line-through;
      cursor: not-allowed;
      margin: 0;
    }

    .label {
      position: absolute;
      left: 0;
      color: #808080;
      z-index: -1;
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

