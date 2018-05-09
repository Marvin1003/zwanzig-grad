import css from 'styled-jsx/css';

export default css`
  // LOADER 
  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 100%;
    width: 100%;
    background-color: #F3F4F7;
    .loader {
      position: relative;
      left: 0;
      width: 100%;
      height: 100%;
      transform: scaleY(0.001) scaleX(0);
      transform-origin: left center;
      background-color: #2A446D;
      text-align: center;
      .cookie_message {
        user-select: none;
        opacity: 0;
        max-width: 50%;
        position: absolute;
        display: inline-block;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 22px;
        font-weight: normal;
      }
      .button {
        position: relative;
        top: 100vh;
        display: inline-block;
        color: white;
        font-size: 16px;
        .buttonAnimation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: scaleX(0);
          background-color: #2A446D;
          transform-origin: left;
        }
      }
    }
  }
`