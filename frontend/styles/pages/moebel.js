import css from 'styled-jsx/css';

export default css`
  //-------------------------------------

  @import './frontend/styles/mixins/responsive.scss';
  @import './frontend/styles/mixins/parallax.scss';
  @import './frontend/styles/mixins/variables.scss';

  //-------------------------------------
  
  // SECTION TWO
  .sec_two_moebel {
    @include responsive("tablet-wide", min){
      height: 300vh;
    }
    .sec_two_text {
      p{
        color: black;
      }
      @include responsive("tablet-wide", min){
        position: absolute;
        left: 15%;
        bottom: 80vh;
      }
    }
    .sec_two_box {
      @include responsive("tablet-wide", min){  
        @include parallax(-1);
        @include calcDistance(bottom, 0vh, -1);
        @include calcDistance(left, 70% , -1);
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP); 
        position: absolute;
        width: 30%;
        height: 20vh;
        background-color: $zwanzig-grad-rot;
      }
    }
    :global([data-name="lazy"]) {
      overflow: hidden;
      @include responsive("tablet-wide", min){
        @include parallax(-2);
        @include calcDistance(bottom, 0vh, -2);
        @include calcDistance(left, 50%, -2);
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP);        
        position: absolute;
        width: 40%;
        height: 41.666666666666667vh;
      }
      @include responsive("tablet-wide", max){
        height: 30vh;
        margin-top: 100px;
        width: 100%;
        div{
          position: relative;
          height: 100%;
        }
      }
    }
  }
  
  // SECTION THREE
  .sec_three_moebel {
    @include responsive("tablet-wide", min){
      height: 300vh;
    }
    .sec_three_headline {
      @include responsive("tablet-wide", min){
        @include parallax(-2, -180deg);
        @include calcDistance(left, 50px, 0);    
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP);         
        bottom: -50vh;
      }
      @include responsive("tablet-wide", max){
        margin-bottom: 25px;
      }
    }
    .sec_three_text {
      @include responsive("tablet-wide", min){
        bottom: 15vh;
        right: 22.25%;
        transform: translateX(50%);
        position: absolute;
      }
    }
    :global([data-name="lazy"]) {
      @include responsive("tablet-wide", min){
        @include parallax(-1);
        @include calcDistance(left, 15%, -1);
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP);                 
        position: absolute;
        bottom: 3vh;
        width: 40%;
        height: 59.259259259259259vh;
      }
      @include responsive("tablet-wide", max){
        width: 100%;
        height: 75vh;
      }
    }
  }
  
  // SECTION FOUR
  .sec_four_moebel {
    @include responsive("tablet-wide", min){
      height: 300vh;
    }
    @include responsive("tablet-wide", max){
      height: 50vh;
      margin: 25px auto 100px auto;
    }
    :global([data-name="lazy"]) {
      @include responsive("tablet-wide", min) {
        position: absolute;
        width: 30%;
        height: 50vh;
      }
    }
    :global([data-name="lazy"]) {
      @include responsive("tablet-wide", max){
        position: relative;
        height: 25vh;
        width: 60%;
      }
    }
    :global([data-name="lazy"]):nth-of-type(1) {
      @include responsive("tablet-wide", min){
        @include parallax(-2);
        @include calcDistance(bottom, 0vh , -2);
        @include calcDistance(left, 15% , -2);
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP);                 
      }
     
    }
    :global([data-name="lazy"]):nth-of-type(2) {
      @include responsive("tablet-wide", min) {
        @include parallax(-1);
        @include calcDistance(left, 35% , -1);
        @include calcDistance(bottom, calc(-25vh + 37.5px), -1);
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP);         
      }
      @include responsive("tablet-wide", max) {
        left: 20%;
        transform: translateY(-50%);
      }
    }
    :global([data-name="lazy"]):nth-of-type(3) {
      @include responsive("tablet-wide", min){
        @include parallax(-0.5);
        @include calcDistance(left, 55%, -0.5);
        @include calcDistance(bottom, calc(-50vh + 75px), -0.5);
        @include calcMarginPadding(0.5, margin, 0px, 0px, 0px, $layoutGAP);         
      }
      @include responsive("tablet-wide", max) {
        left: 40%;
        transform: translateY(-100%);
      }
    }
  }

  //-------------------------------------
  
`;
