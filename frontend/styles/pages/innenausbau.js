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
  .sec_two_innenausbau {
    @include responsive("tablet-wide", min){
      height: 300vh;
    }
    .sec_two_box {
      @include responsive("tablet-wide", min){  
        @include parallax(-1);
        @include calcDistance(bottom, 0vh, -1);
        @include calcDistance(left, 70% , -1);
        margin-left: 50px;
        position: absolute;
        width: 30%;
        height: 22.685185185185185vh;
        background-color: #C1C12B;
      }
    }
    .sec_two_text {
      p{
        color: black;
      }
      @include responsive("tablet-wide", min){
        position: absolute;
        left: 13.0208333333vw;
        bottom: 50vh;
      }
    }
    :global([data-name="lazy"]) {
      @include responsive("tablet-wide", min){
        @include parallax(-2);
        @include calcDistance(bottom, 5vh, -2);
        @include calcDistance(left, calc(66.67777vw - 150px), -2);
        @include calcMarginPadding(-1, margin, 0px,0px,0px, 50px);
        position: absolute;
        width: 33.3333333333vw;
        height: 75.9259259259vh;
      }
      @include responsive("tablet-wide", max){
        height: 75vh;
        margin-top: 50px;
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
        bottom: 15vh;
        left: calc(66.67777vw - 150px);
        position: absolute;
      }
    }
    :global([data-name="lazy"]) {
      @include responsive("tablet-wide", min){
        @include parallax(-1);
        @include calcDistance(left, 13.0208333333vw, -1);
        margin-left: 50px;
        position: absolute;
        bottom: -5vh;
        width: 33.3333333333vw;
        height: 75.9259259259vh;
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
        @include calcDistance(left, 50px, -2);
        bottom: -75vh;
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
        left: 64.0625vw;
        bottom: 20vh;
      }
    }
    :global([data-name="lazy"]) {
      @include responsive("tablet-wide", min){
        position: absolute;
        @include parallax(-1);
        @include calcDistance(left, 15.625vw , -1);
        @include calcDistance(bottom, 0px , -1);
        width: 40.625vw;
        height: 59.2592592593vh;
        margin-left: 50px;
      }
      @include responsive("tablet-wide", max){
        width: 100%;
        height: 39.0625vh;
      }
    }
  }

  //-------------------------------------
`;
