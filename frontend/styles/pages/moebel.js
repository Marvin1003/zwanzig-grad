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

  $zwanzig-grad-rot: #6D2A2A;
  $layoutGAP: 10vw;
  
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
