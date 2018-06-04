import css from 'styled-jsx/css';

export default css`
  //-------------------------------------

    @import './frontend/styles/mixins/variables.scss';
    @import './frontend/styles/mixins/responsive.scss';
    @import './frontend/styles/mixins/parallax.scss';

  //-------------------------------------
  :global(.root) {
    background: linear-gradient(white 50%, $zwanzig-grad-rot 50%);
  }

  :global(.parallax) {
    background: white;
    @include responsive('tablet-wide', min) {
      height: 100vh;
      overflow-x: hidden;
      overflow-y: auto;
      perspective-origin: 0 0;
      perspective: 1px;
      -webkit-overflow-scrolling: touch;
      position: relative;
      &, :global(.section) {
        transform-style: preserve-3d;
      }
    }
    // PARALLAX_CLASSES
    :global(.section) {
      width: calc(100% - (#{$layoutGAP} * 2));
      position: relative;
      margin: 0 auto;
      :global(.sec_text) {
        @include responsive("tablet-wide", min) {
          width: 22%;
        }
        @include responsive("tablet-wide", max) {
          width: 75%;
          margin: 0 auto;
          text-align: center;             
          p{
            margin: 0 auto;
            width: 100%;
          }
        }
        @include responsive("phone-wide", max) {
          width: 100%;
          p{
            margin: 0 auto;
          }
        }
      }
    }
  }

  // SEC ONE 

  .sec_one {
    @include responsive("tablet-wide", min){
      height: 175vh;
    }
    @include responsive("tablet-wide", max){
      height: 100vh;
    }
    .sec_one_box {
      position: absolute;
      background: $zwanzig-grad-rot;
      @include responsive("tablet-wide", min) {
        @include parallax(-2);
      }
      @include responsive("tablet-wide", max){
        left: -$layoutGAP;
        top: 50vh;
        width: 100vw;;
      }
    }
    :global(.auto_slider) {
      width: 35vh;
      height: 35vh;
      top: 32.5vh;
      left: 50%;
      transform: translateX(-50%);
      @include responsive('phone', min) {
        width: 75%;
      }
      @media only screen and (orientation: landscape) {
        top: 30vh;
        height: 40vh;
        width: 70vw;
      }
    }
  }
  
  .sec_one_headline{
    @include responsive("tablet-wide", min) {
      bottom: calc(75vh + 75px);
    }
    @include responsive("tablet-wide", max) {
      left: 50%;
      top: 32.5vh;
      transform: translate(-50%, -50%);
      margin: 0;
    }
    @media only screen and (orientation: landscape) {
      top: 30vh;
    }
  }
  
  /* INDIVIDUAL SEC-ONE STYLES */
  // PARKETT
  .sec_one_parkett {
    :global(.auto_slider) {    
      @include responsive("tablet-wide", min) {
        @include parallax(-1, 0, true);
        @include calcDistance(top, 25vh , -1 );
        @include calcDistance(left, 15%, -1 );
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP);
        @include autoSliderDimensions(height, 50vh, -1);
        @include autoSliderDimensions(width, 60%, -1);
      }
    }
  
    .sec_one_box_parkett {
      @include responsive("tablet-wide", min) {
        @include calcDistance(top, 18vh , -2 );
        @include calcDistance(left, 50% , -2);
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP);
        width: 40vw;
        height: 64vh;
      }
      @include responsive("tablet-wide", max) {
        height: calc(50vh + 37.5vh + 100px);
      }
    }
  }
  
  // TREPPE
  .sec_one_treppe {
    :global(.auto_slider) {
      @include responsive("tablet-wide", min) {
        @include parallax(-1, 0, true);
        @include calcDistance(top, 25vh , -1 );
        @include calcDistance(left, 15%, -1 );
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP);
        @include autoSliderDimensions(height, 45vh, -1);
        @include autoSliderDimensions(width, 50%, -1);
      }
    }
    .sec_one_box_treppe {
      @include responsive("tablet-wide", min) {
        @include calcDistance(left, calc(65vw - (#{$layoutGAP} * 2)), -2);
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP);
        height: 60vh;
        width: 35vw;
      }
      @include responsive("tablet-wide", max) {
        height: calc(50vh + 37.5vh + 100px);
      }
    }
  }
  
  // MOEBEL
  .sec_one_moebel {
    :global(.auto_slider) {    
      @include responsive("tablet-wide", min) {
        @include parallax(-1, 0, true);
        @include calcDistance(top, calc(25vh + 5vw), -1 );
        @include calcDistance(left, 15vw, -1 );
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP);
        @include autoSliderDimensions(height, 50vh, -1);
        @include autoSliderDimensions(width, 50vw, -1);
      }
    }
    .sec_one_box_moebel{
      @include responsive("tablet-wide", min) {
        @include calcDistance(top, 25vh, -2 );
        @include calcDistance(left, $layoutGAP, -2);
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP);
        width: 60vw;
        height: 50vh;
      }
      @include responsive("tablet-wide", max) {
        width: 100vw;
        height: calc(50vh + 15vh + 100px);
        bottom: 0;
      }
    }
  }

  // INNENAUSBAU
  .sec_one_innenausbau {
    :global(.auto_slider) {    
      @include responsive("tablet-wide", min) {
        @include parallax(-1, 0, true);
        @include calcDistance(top, 225px, -1 );
        @include calcDistance(left, calc(100% - ((70% - 75px))), -1);
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP);
        @include autoSliderDimensions(height, 50vh, -1);
        @include autoSliderDimensions(width, calc(70% - 150px), -1);
      }
    }
    .sec_one_box_innenausbau {
      @include responsive("tablet-wide", min) {
        @include calcDistance(top, 150px, -2 );
        @include calcDistance(left, 15%, -2);
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP);
        width: 55vw;
        height: 40vh;
      }
      @include responsive("tablet-wide", max) {
        height: calc(50vh + 15vh + 100px);
      }
    }
  }

`