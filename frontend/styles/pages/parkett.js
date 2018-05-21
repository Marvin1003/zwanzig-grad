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
  

  // SECTION TWO
  .sec_two_parkett{
    @include responsive("tablet-wide", min){
      height: 300vh;
    }
    .sec_two_text{
      @include responsive("tablet-wide", min){
        position: absolute;
        left: 75%;
        transform: translateX(-50%);
        top: 130vh;
      }
    }
    :global([data-name="lazy"]) {
      @include responsive("tablet-wide", min){
        @include parallax(-1);
        @include calcDistance(bottom, 50vh, -1);
        @include calcDistance(left, 15% , -1 );
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP);        
        position: absolute;
        width: 33.33%;
        height:  60vh;
      }
      @include responsive("tablet-wide", max){
        width: 100%;
        height: 75vh;
        margin-top: 100px;
      }
    }
  }

  // SECTION THREE
  .sec_three_parkett{
    @include responsive("tablet-wide", min){
      height: 200vh;
    }
    .sec_three_text{
      @include responsive("tablet-wide", min){
        position: absolute;
        top: 60vh;
        left: 15%;
      }
      @include responsive("tablet-wide", max) {
        p{
          text-align: center;
          hyphens: initial;
        }
      }
    }
    :global([data-name="lazy"]) {
      @include responsive("tablet-wide", min){
        @include parallax(-1);
        @include calcDistance(left, 48.33%, -1);
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP);        
        position: absolute;
        top: 75vh;
        width: 51.7%;
        height: 50vh;
      }
      @include responsive("tablet-wide", max){
        margin-top: 50px;
        width: 100%;
        height: 360px;
      }
    }
  }

  // SECTION FOUR
  .sec_four_parkett{
    @include responsive("tablet-wide", min){
      height: 300vh;
    }
    .sec_four_headline{
      @include responsive("tablet-wide", min) {
        @include parallax(-2, -180deg);
        @include calcDistance(left, 50px, 0);    
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP);    
        bottom: 0;
      }
    }
    .sec_four_text{
      position: relative;
      @include responsive("tablet-wide", min){
        position: absolute;
        bottom: 50vh;
        right: 0;
        height: auto;
      }
      @include responsive("tablet-wide", max){
        width: 50%;
        left: 10%;
        margin-top: calc(10vw + 150px);
        margin-left: 0;
        text-align: center;
        p{
          hyphens: auto;
          text-align: justify;
          width: 100%;
        }
      }
      @include responsive("phone-wide", max){
        left: 50px;
        width: calc(100% - 50px);
      }
    }
    .sec_four_box{
      background-color: $zwanzig-grad-rot;
      position: absolute;
      @include responsive("tablet-wide", min){
        @include parallax(-2);
        @include calcDistance(left, 15%, -2);
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, $layoutGAP);        
        height: 80vh;
        width: 33.33%;
        bottom: 60vh;
      }
      @include responsive("tablet-wide", max){
        height: 70vh;
        width: 50%;
        top: 125px;
      }
    }
    :global([data-name="lazy"]) {
      @include responsive("tablet-wide", min){
        @include parallax(-1);
        @include calcDistance(left, calc(15% + 50px), -1);
        @include calcMarginPadding(0, margin, 0px, 0px, 0px, $layoutGAP);     
        position: absolute;
        bottom: 40vh;
        height: 61.7592592593vh;
        width: 41.6666666667vw;
        overflow: hidden;
      }
      @include responsive("tablet-wide", max){
        position: relative;
        height: 70vh;
        width: 90%;
        left: 10%;
        margin-left: 0;
        top: calc(10vw + 125px);
      }
      @include responsive("phone-wide", max){
        left: 50px;
        width: calc(100% - 50px);
      }
    }
  }

  //-------------------------------------
  
`;
