import css from 'styled-jsx/css';

export default css`
  // RESPONSIVE 
  $breakpoints: (
    "phone":        400px,
    "phone-wide":   480px,
    "phablet":      560px,
    "tablet-small": 640px,
    "tablet":       768px,
    "tablet-wide":  1025px,
    "desktop":      1248px,
    "desktop-wide": 1440px
  );
  @mixin responsive($width, $type: min) {
    @if map_has_key($breakpoints, $width) {
        $width: map_get($breakpoints, $width);
        @if $type == max {
            $width: $width - 1px;
        }
        @media only screen and (#{$type}-width: $width){
            @content;
        }
    }
  }

  //-------------------------------------

  // PARALLAX
  @mixin calcDistance($direction, $directionPX, $distanceZ){
    #{$direction} : calc(#{$directionPX} * (#{-($distanceZ - 1)}));
  }
  @mixin autoSliderDimensions($dimension, $size, $distanceZ){
    #{$dimension} : calc(#{$size} * (#{-($distanceZ - 1)}));
  }
  @mixin calcMarginPadding($distanceZ, $MorP, $top : 0px, $right : 0px, $bottom : 0px, $left: 0px){
    #{$MorP} : calc(#{$top} * (#{-($distanceZ - 1)})) calc(#{$right} * (#{-($distanceZ - 1)})) calc(#{$bottom} * (#{-($distanceZ - 1)}))  calc(#{$left} * (#{-($distanceZ - 1)}));
  }
  @mixin parallax(
    $distance: 0,
    $rotate: 0,
    $autoSlider: false
  )
  {
    z-index: $distance * 1000;
    transform-origin: 0 0;

    @if $rotate != 0{
      transform-origin: initial;
      transform:
        translateZ($distance * 1px)
        scale(abs($distance - 1))
        rotate(#{$rotate})
    }
    @else if $autoSlider == true {
      transform: 
        translateZ($distance * 1px)
    }
    @else{
      transform:
        translateZ($distance * 1px)
        scale(abs($distance - 1))
    }
  }

  //-------------------------------------

  $layoutGAP: 10vw;
  $zwanzig-grad-rot: #6D2A2A;
  $zwanzig-grad-rot-dunkel: #3B1717;
  $zwanzig-grad-gruen: #C1C12B;

  :global(.parallax) {
    @include responsive('tablet-wide', min) {
      height: 100vh;
      overflow-x: hidden;
      overflow-y: auto;
      perspective-origin: 0 0;
      perspective: 1px;
      -webkit-overflow-scrolling: touch;
      position: relative;
      // REMINDER --- & * didnt work
      & * {
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
      background-color: $zwanzig-grad-rot;
      @include responsive("tablet-wide", min) {
        @include parallax(-2);
      }
      @include responsive("tablet-wide", max){
        left: -$layoutGAP;
        top: 50vh;
        width: 100vw;;
        z-index: -1;
      }
    }
    :global(.auto_slider) {
      width: 35vh;
      height: 35vh;
      top: 32.5vh;
      left: 50%;
      transform: translateX(-50%);
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
        z-index: -1;
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
        @include calcDistance(left, 10vw, -2);
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP);
        width: 60vw;
        height: 50vh;
      }
      @include responsive("tablet-wide", max) {
        width: 100vw;
        height: calc(50vh + 15vh + 100px);
        left: -$layoutGAP;
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