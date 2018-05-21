import css from 'styled-jsx/css';

export default css`
  $zwanzig-grad-rot: #6D2A2A;
  // LOADER 
  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 100%;
    width: 100%;
    user-select: none;
    background-color: #3B1717;
    .loader {
      width: 100%;
      height: 100%;
      transform-origin: left center;
      background-color: $zwanzig-grad-rot;
      text-align: center;
      color: white;
      .cookie_message {
        display: inline-block;
        visibility: hidden;
        user-select: none;
        max-width: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 22px;
        font-weight: normal;
      }
      .button {
        overflow: hidden;
        position: absolute;
        bottom: 50px;
        display: inline-block;
        color: white;
        font-size: 16px;
        transform: translateX(-50%);
        span {
          display: inline-block;
          transform: translateY(100%);
        }
        .buttonAnimation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: scaleX(0);
          background-color: $zwanzig-grad-rot;
          transform-origin: left;
        }
      }
      .cookie_disclaimer {
        opacity: 0;
        position: absolute;
        font-size: 14px;
        left: 50%;
        bottom: 25px;
        transform: translateX(-50%);
      }
    }
  }
`;

