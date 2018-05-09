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

  // SECTION TWO
  .sec_two_treppe {
    @include responsive("tablet-wide", min){
      height: 400vh;
    }
    @include responsive("tablet-wide", max){
      height: 90vh;
    }
    .sec_two_box{
      background-color: #C1C12B;
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
      width: 100%;
      height: 100%;
      position: absolute;
      @include responsive("tablet-wide", min){
        @include parallax(-2);
        @include calcDistance(top, 91vh , -2);
        @include calcDistance(left, 50px , -1);
        height: 65vh;
        width: 60%;
      }
      @include responsive("tablet-wide", max){
        width: 100%;
        height: 80vh;
        top: 10vh;
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
        left: 12.5%;
        height: auto;
        top: 160vh;
        p{
          width: 75%;
        }
      }
    }
    :global([data-name="lazy"]) {
      width: 100%;
      height: 100%;
      @include responsive("tablet-wide", min){
        position: absolute;
        height: 69.4444444444vh;
        width: 31.25vw;
        @include parallax(-1);
        @include calcDistance(left, 50px, 0);
        @include calcDistance(top, 85vh, -1);
        @include calcMarginPadding(-1, margin, 0px,0px,0px, 50%);
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
    @include responsive("tablet-wide", min){
      @include parallax(-2);
      width: 100vw;
      height: calc(100vh - 75px);
      display: flex;
      margin: 150vh 0;
      :global(div) {
        width: 50%;
        height: 100%;
      }
    }
    @include responsive("tablet-wide", max){
      width: 100vw;
      flex-direction: column;
      :global(div) {
        height: calc(100vh - 50px);
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
        @include calcDistance(left, 50px , -2);
        @include calcDistance(bottom, 25vh, -1); 
      }
    }
    .sec_five_text{
      @include responsive("tablet-wide", min){
        position: absolute;
        right: 0;
        bottom: 20vh;
        width: 20.41666667vw;
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
      background-color: #C1C12B;
      @include responsive("tablet-wide", min){
        @include parallax(-2);
        @include calcDistance(left, 50px , -1);
        @include calcMarginPadding(-2, margin, 0px, 0px, 0px, 100px);
        position: absolute;
        width: 50vw;
        height: 55.5555vh;
        bottom: 50vh;
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
        position: absolute;
        @include parallax(-1);
        @include calcDistance(left, 50px, 0);
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, calc(200px + 12vw));
        bottom: 5vh;
        width: 38.020833333vw;
        height: 52.78vh;
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
