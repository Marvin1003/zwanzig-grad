import css from 'styled-jsx/css';

export default css`
  //-------------------------------------

  @import './frontend/styles/mixins/variables.scss';

  //-------------------------------------
  
  // LOADER 
  .page_transition_wrapper {
    transform-origin: 0 0;
    transform: scale(1);
    .page_transition {
      transform-origin: inherit;
      text-align: center;
      color: white;
      .zwanzig-grad {
        font-size: 20px;
        text-transform: lowercase;
        letter-spacing: 1.5px;
        display: inline-block;
        visibility: hidden;
        user-select: none;
        max-width: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: normal;
      }
      .button {
        overflow: hidden;
        position: absolute;
        bottom: 50px;
        display: inline-block;
        color: white;
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
    }
  }
`;

