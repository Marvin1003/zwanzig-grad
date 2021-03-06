import css from 'styled-jsx/css';

export default css`
  //-------------------------------------

  @import './frontend/styles/mixins/variables.scss';
  @import './frontend/styles/mixins/responsive.scss';
  @import './frontend/styles/mixins/parallax.scss';

  //-------------------------------------

  // SECTION TWO
  .sec_two_treppe {
    @include responsive("tablet-wide", min){
      height: 400vh;
    }
    .sec_two_box{
      background: $zwanzig-grad-rot;
      position: absolute;
      @include responsive("tablet-wide", min){
        left: 60%;
        top: 235vh;
        width: 40%;
        height: 45vh;
      }
      @include responsive("tablet-wide", max){
        display: none;
      }
    }

    :global([data-name="lazy"]):nth-of-type(1) {
      @include responsive("tablet-wide", min){
        @include parallax(-2);
        @include calcDistance(top, 91vh , -2);
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP);     
        position: relative;   
        height: 65vh;
        width: 60%;
      }
      @include responsive("tablet-wide", max){
        width: 100%;
        height: 75vh;
        margin-top: 100px;
      }
    }
    :global([data-name="lazy"]):nth-of-type(2) {
      width: 100%;
      height: 100%;
      position: absolute;
      @include responsive("tablet-wide", min){
        @include parallax(-1);
        @include calcDistance(top, 127vh , -1);
        @include calcDistance(left, 30%, -1);
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP);        
        height: 60vh;
        width: 60%;
      }
      @include responsive("tablet-wide", max){
        display: none;
      }
    }
  }

  // SECTION THREE
  .sec_three_treppe {
    @include responsive("tablet-wide", min){
      height: 400vh;
    }
    .sec_three_text{
      @include responsive("tablet-wide", min){
        position: absolute;
        width: 25%;
        left: 15%;
        height: auto;
        top: 160vh;
      }
    }
    :global([data-name="lazy"]) {
      width: 100%;
      height: 100%;
      @include responsive("tablet-wide", min){
        @include parallax(-1);
        @include calcDistance(top, 85vh, -1);
        @include calcDistance(left, 60%, -1);
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP);    
        position: absolute;
        height: 69.4444444444vh;
        width: 40%;  
      }
      @include responsive("tablet-wide", max) {
        width: 100%;
        height: 75vh;
        margin: 50px 0;
      }
    }
  }

  // SECTION FOUR
  .sec_four_treppe {
    width: 100vw;
    position: relative;
    :global(div) {
      position: relative;
      height: 100vh;
    }
    @include responsive("tablet-wide", min){
      @include parallax(-2);
      @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP); 
      display: flex;
      margin: 150vh 0;
      :global(div) {
        width: 50vw;
      }
    }
    @include responsive("tablet-wide", max){
      flex-direction: column;
      :global(div) {
        width: 100%;
      }
    }
  }

  // SECTION FIVE
  .sec_five_treppe {
    @include responsive("tablet-wide", min){
      height: 300vh;
    }
    .sec_five_headline{
      @include responsive("tablet-wide", min){
        @include parallax(-2, -180deg);
        @include calcDistance(bottom, 0vh, -2); 
        @include calcDistance(left, 50px, 0);    
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP);  
      }
    }
    .sec_five_text{
      @include responsive("tablet-wide", min){
        position: absolute;
        right: 0;
        bottom: -20vh;
        width: 25%;
        height: auto;
      }
      @include responsive("tablet-wide", max){
        text-align: center;
        position: relative;
        left: 50%;
        width: calc(100% - 100px);
        margin-top: calc(-50vh + 75px);
        margin-left: 0px;
        transform: translateX(-50%);
        p{
          hyphens: auto;
          text-align: justify;
          width: 100%;
        }
      }
      @include responsive("phone-wide", max){
        left: 50px;
        transform: none;
      }
    }
    .sec_five_box{
      background: $zwanzig-grad-rot;
      @include responsive("tablet-wide", min){
        @include parallax(-2);
        @include calcDistance(left, 15% , -2);
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP);    
        position: absolute;
        width: 45%;
        height: 40vh;
        bottom: 10vh;
      }
      @include responsive("tablet-wide", max){
        position: relative;
        width: 100%;
        top: 25px;
        height: 50vh;
      }
    }
    :global([data-name="lazy"]) {
      @include responsive("tablet-wide", min){
        @include parallax(-1);
        @include calcDistance(left, 30%, -1);
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP);    
        position: absolute;
        bottom: -25vh;
        width: 40%;
        height: 35vh;
        overflow: hidden;
      }
      @include responsive("tablet-wide", max){
        position: relative;
        height: 55vh;
        width: calc(100% - 100px);
        top: calc(75px + 5vh);
        transform: translate(0, -100%);
        margin: 0 auto;
      }
    }
  }

  //-------------------------------------
  
`;
