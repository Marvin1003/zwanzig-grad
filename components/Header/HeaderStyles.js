import css from 'styled-jsx/css';

export default css`
  //-------------------------------------

  @import 'styles/mixins/variables.scss';
  @import 'styles/mixins/responsive.scss';
  
  //-------------------------------------

  // DEFAULT 
  
  .standard_nav {
    will-change: opacity;
    width: 100vw;
    position: fixed;
    left: 0;
    display: flex;
    justify-content: space-between;
    color: black;
    z-index: 101;
    .menuicon {
      overflow: visible;
      position: absolute;
      padding-top: 2px;
      top: $layoutGAP;
      right: $layoutGAP;
      align-self: flex-start;
      width: 20px;
      :global(line) {
        stroke-width: 2px;
        stroke: currentcolor;
      }
    }

    :global(.logo) {
      position: absolute;
      top: $layoutGAP;
      left: $layoutGAP;
      cursor: pointer;
      user-select: none;
      img {
        pointer-events: none;
        user-select: none;
        transition: width .5s cubic-bezier(.91,0,.17,.99);
        transform-origin: left;
        width: 55px;
        @include responsive('tablet-wide', max) {
          width: 42.5px;
        }
      }
    }
  }

  //-------------------------------------

  // HOME 
  .header_home {
    color: white;
  }

  //-------------------------------------
`;
