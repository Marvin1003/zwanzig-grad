import css from 'styled-jsx/css';

export default css`
  //-------------------------------------

  @import './frontend/styles/mixins/variables.scss';
  @import './frontend/styles/mixins/responsive.scss';

  //-------------------------------------

  .container {
    width: 100vw;
    position: absolute;
    @include responsive('tablet-wide', min) {
      height: 100%;
    }
    @include responsive('tablet-wide', max) {
      min-height: 200%;
      display: flex;
      flex-direction: column;
    }
    .wrapper {
      position: relative;
      @include responsive('tablet-wide', min) {
        height: 100% !important;
        width: 50%;
      }
      @include responsive('tablet-wide', max) {
        min-height: 525px;
        height: 50%;
        width: 100%;
      }
    }
    .layout_wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      @include responsive('tablet-wide', min) {
        padding-top: 0;
      }
      padding-bottom: 0;
    }
    & > :global(div:last-of-type) {
      overflow: hidden;
      @include responsive('tablet-wide', min) {
        height: 100% !important;
        position: fixed;
        top: 0;
        right: 0;
        width: 50%;
      }
      @include responsive('tablet-wide', max) {
        position: relative;
        width: 100%;
      }
    }
  }
  .kontakt_header {
    display: inline-block;
    position: relative;
    bottom: 25px;
    @include responsive('tablet-wide', min) {
      display: none;
    }
  }

  .address {
    position: absolute;
    width: 100%;
    background-color: white;
    left: 0;
    padding: 0 $layoutGAP;
    color: rgba(0,0,0,0.5);
    z-index: 1;
    @include responsive('tablet-wide', max) {
      height: 10%;
      bottom: -10%;
      text-align: center;
      display: flex;
      align-items: center;
    }
    @include responsive('tablet-wide', min) {
      position: absolute;
      bottom: $layoutGAP;
    }
    address {
      letter-spacing: 1px;
      font-style: normal;
      text-transform: uppercase;
      span {
        white-space: pre;
        display: inline-block;
      }
    }

  }
  
  //-------------------------------------
  
`;
