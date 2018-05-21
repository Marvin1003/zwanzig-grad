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


  // SEC NEXT
  
  .sec_next {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    @include responsive("tablet-wide", min){
      height: 100vh;
      top: 150vh;
    }
    @include responsive("tablet-wide", max){
      position: relative;
      height: 100vh;
      margin-top: 50px;
    }
    .sec_next_background {
      height: 100%;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background: $zwanzig-grad-rot;
      transform-origin: 100% 100%;
      z-index: -1;
    }
    .sec_next_topic {
      overflow: hidden;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      z-index: 1;
      color: white;
      text-transform: capitalize;
      h1 {
        @include responsive("tablet-wide", min){
          font-size: 60px;
        }
        @include responsive("tablet-wide", max){
          font-size: 30px;
        }
      }
    }
    :global(.sec_next_wrapper) {
      cursor: pointer;
      position: absolute;
      width: calc(100% - (#{$layoutGAP} * 2));
      @include responsive('tablet-wide', max) {
        top: 50%;
        height: 50%;
      }
      @include responsive('tablet-wide', min) {
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
      }
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
`