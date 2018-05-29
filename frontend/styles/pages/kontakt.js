import css from 'styled-jsx/css';

export default css`
  //-------------------------------------

  @import './frontend/styles/mixins/responsive.scss';
  @import './frontend/styles/mixins/parallax.scss';  
  @import './frontend/styles/mixins/variables.scss';

  //-------------------------------------

  .container {
    width: 100vw;
    position: absolute;
    @include responsive('tablet-wide', max) {
      display: flex;
      flex-direction: column;
    }
    .wrapper {
      position: relative;
      min-height: 600px;
      height: 100vh;
      @include responsive('tablet-wide', min) {
        width: 50%;
      }
      @include responsive('tablet-wide', max) {
        width: 100%;
      }
    }
    .layout_wrapper {
      display: flex;
      align-items: center;
      position: relative;
      top: $layoutGAP;
      bottom: $layoutGAP;
      height: calc(100% - (#{$layoutGAP} * 2));
    }
    >:global(div):last-of-type {
      overflow: hidden;
      height: 100vh;
      @include responsive('tablet-wide', min) {
        position: fixed;
        top: 0;
        right: 0;
        width: 50%;
      }
      @include responsive('tablet-wide', max) {
        width: 100%;
      }
    }
  }

  .address {
    position: absolute;
    bottom: 0;
    color: rgba(0,0,0,0.5);
    letter-spacing: 1px;
    font-style: normal;
    text-transform: uppercase;
  }
  
  //-------------------------------------
  
`;
