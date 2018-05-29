import css from 'styled-jsx/css';

export default css`
  //-------------------------------------

  @import './frontend/styles/mixins/responsive.scss';
  @import './frontend/styles/mixins/parallax.scss';
  @import './frontend/styles/mixins/variables.scss';

  //-------------------------------------

  // SECTION TWO
  .sec_two_innenausbau {
    @include responsive("tablet-wide", min){
      height: 300vh;
    }
    .sec_two_box {
      @include responsive("tablet-wide", min){  
        @include parallax(-1);
        @include calcDistance(bottom, 0vh, -1);
        @include calcDistance(left, 70% , -1);
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP);                 
        margin-left: 50px;
        position: absolute;
        width: 30%;
        height: 22.685185185185185vh;
        background-color: $zwanzig-grad-rot;
      }
    }
    .sec_two_text {
      p{
        color: black;
      }
      @include responsive("tablet-wide", min){
        position: absolute;
        left: 15%;
        bottom: 50vh;
      }
    }
    :global([data-name="lazy"]) {
      @include responsive("tablet-wide", min){
        @include parallax(-2);
        @include calcDistance(bottom, 5vh, -2);
        @include calcDistance(left, 45%, -2);
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP);                 
        position: absolute;
        width: 40%;
        height: 75vh;
      }
      @include responsive("tablet-wide", max){
        height: 30vh;
        margin-top: 100px;
        width: 100%;
        div{
          height: 100%;
        }
      }
    }
  }
  
  // SECTION THREE
  .sec_three_innenausbau {
    @include responsive("tablet-wide", min){
      height: 300vh;
    }
    .sec_three_text {
      @include responsive("tablet-wide", min){
        position: absolute;
        bottom: 15vh;
        left: 85%;
        transform: translateX(-100%);
      }
    }
    :global([data-name="lazy"]) {
      @include responsive("tablet-wide", min){
        @include parallax(-1);
        @include calcDistance(left, 15%, -1);
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP);                 
        position: absolute;
        bottom: -5vh;
        width: 40%;
        height: 75vh;
      }
      @include responsive("tablet-wide", max) {
        position: relative;
        z-index: -1;
        width: 100%;
        height: 75vh;
        margin-top: 50px;
      }
    }
  }
  
  // SECTION FOUR
  .sec_four_innenausbau {
    @include responsive("tablet-wide", min) {
      height: 300vh;
    }
    .sec_four_headline {
      @include responsive("tablet-wide", min){
        @include parallax(-2, -180deg);
        @include calcDistance(left, 50px, 0);
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP);                 
        bottom: -50vh;
      }
      @include responsive("tablet-wide", max) {
        margin-bottom: 25px;
      }
    }
    .sec_four_text {
      p{
        color: black;
      }
      @include responsive("tablet-wide", min){
        position: absolute;
        right: 0;
        bottom: 20vh;
      }
    }
    :global([data-name="lazy"]) {
      @include responsive("tablet-wide", min){
        position: absolute;
        @include parallax(-1);
        @include calcDistance(left, 15% , -1);
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP);                 
        width: 40.625vw;
        height: 59.2592592593vh;
        bottom: 0;
      }
      @include responsive("tablet-wide", max){
        width: 100%;
        height: 39.0625vh;
      }
    }
  }

  //-------------------------------------
`;
