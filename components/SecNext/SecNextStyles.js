import css from "styled-jsx/css";

export default css`
  //-------------------------------------

  @import "styles/mixins/variables.scss";
  @import "styles/mixins/responsive.scss";

  //-------------------------------------

  // SEC NEXT
  .sec_next {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    @include responsive("tablet-wide", min) {
      height: 100vh;
      top: 150vh;
    }
    @include responsive("tablet-wide", max) {
      position: relative;
      height: 100vh;
      margin-top: 50px;
    }
    .sec_next_background {
      will-change: left, top;
      height: 100%;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background: $zwanzig-grad-rot;
      transform-origin: 100% 100%;
    }
    .sec_next_topic {
      overflow: hidden;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      text-transform: capitalize;
      z-index: 2;
    }
    :global(.sec_next_wrapper) {
      cursor: pointer;
      position: absolute;
      z-index: 1;
      width: calc(100% - (#{$layoutGAP} * 2));
      @include responsive("tablet-wide", max) {
        top: 50%;
        height: 50%;
      }
      @include responsive("tablet-wide", min) {
        top: calc(100% - 100px);
        height: 100px;
      }
    }
    .sec_next_image {
      display: flex;
      width: 100%;
      height: 100%;
      .sec_next_image_background {
        height: 100%;
        width: 100vw;
        position: absolute;
        top: 0;
        left: -$layoutGAP;
        background: $zwanzig-grad-rot;
        transform-origin: 100% 100%;
        transform: scaleY(0);
        z-index: 3;
      }
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
`;
