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

// FONTS
/*!
* Web Fonts from Fontspring.com
*
* All OpenType features and all extended glyphs have been removed.
* Fully installable fonts can be purchased at http://www.fontspring.com
*
* The fonts included in this stylesheet are subject to the End User License you purchased
* from Fontspring. The fonts are protected under domestic and international trademark and 
* copyright law. You are prohibited from modifying, reverse engineering, duplicating, or
* distributing this font software.
*
* (c) 2010-2018 Fontspring
*
*
*
*
* The fonts included are copyrighted by the vendor listed below.
*
* Vendor:      Paulo Goode
* License URL: https://www.fontspring.com/licenses/paulogoode/webfont
*
*
*/

/**
* @license
* MyFonts Webfont Build ID 3506932, 2018-01-08T15:07:59-0500
* 
* The fonts listed in this notice are subject to the End User License
* Agreement(s) entered into by the website owner. All other parties are 
* explicitly restricted from using the Licensed Webfonts(s).
* 
* You may obtain a valid license at the URLs below.
* 
* Webfont: Gilroy-ExtraBold by Radomir Tinkov
* URL: https://www.myfonts.com/fonts/radomir-tinkov/gilroy/extra-bold/
* Copyright: Copyright &#x00A9; 2016 by Radomir Tinkov. All rights reserved.
* Licensed pageviews: 500,000
* 
* 
* License: https://www.myfonts.com/viewlicense?type=web&buildid=3506932
* 
* © 2018 MyFonts Inc
*/

@font-face {
  font-family: 'Didonesque';
  src: url('../../static/fonts/didonesque_roman_macroman/didonesque-roman-webfont.woff2') format('woff2'),
      url('../../static/fonts/Didonesque/didonesque-roman-webfont.woff') format('woff');
}

@font-face {
  font-family: 'Futura';
  src: url('../../static/fonts/Futura/Futura-Book.ttf');
}

@font-face {
  font-family: 'Geomanist';
  src: url('../../static/fonts/Geomanist/geomanist-medium-webfont.ttf');
}

//-------------------------------------

// DEFAULT 

body {
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  *, *::before, *::after {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    box-sizing: inherit;
    outline: none;
    margin: 0;
    padding: 0;
  }
}

.parallax {
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
}



ul {
  list-style-type: none;
}

a {
  user-select: none;
  text-decoration: none;
  color: inherit;
}

.button {
  font-family: inherit;
  color: inherit;
  cursor: pointer;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover
textarea:-webkit-autofill:focus {
  box-shadow: 0 0 0px 1000px #F3F4F7 inset;
}
::selection {
  background-color: rgba(0,0,0,.99);
  color: white;
}
::-webkit-scrollbar {
  display: none;
}

//-------------------------------------

// DISPLAY TO SMALL 
@media only screen and (max-width: 300px) {
  html::after {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 0 10px;
    font-family: "didonesque-roman", serif;
    text-align: center;
    content: 'To visit this Website you need a larger display.'
  }
  // CAUSES BUG !! -- REMINDER -- / BUTTON HOVER / AUTOSLIDER
  body {
    display: none;
  }
}

//-------------------------------------

// PAGE TRANSITIONS
.page_transition_wrapper {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  transform: scaleX(0);
  background: #132B51;
  overflow: hidden;
  z-index: 1000;
  .page_transition {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0; 
    background: #2A446D;
  }
}

//-------------------------------------

// DEFAULT_CLASSES
.background_center {
  background-size: cover;
  background-position: center;
  object-fit: cover;
}

.didonesque_headline {
  @extend .didonesque_normal;
  color: black;
  margin: 25px 0;
  @include responsive("tablet-wide", min) {
    font-size: 37.5px;
  }
  @include responsive("tablet-wide", max) {
    font-size: 30px;
  }
}

.geomanist_headline { 
  @extend .geomanist_normal;
  line-height: 0.85;
  position: relative;
  z-index: 1;
  user-select: none;
  text-transform: uppercase;
  transition: font-size 0.5s cubic-bezier(.91,0,.17,.99);
  @include responsive("tablet-wide", min) {
    left: 0;
    transform: rotate(-180deg);
    writing-mode: vertical-rl;
    text-orientation: sideways;
    position: absolute;
    margin: 0;
    font-size: 60px;
  }
  @include responsive("tablet-wide", max) {
    display: inline-block;
    margin-top: 75px;
    font-size: 35px;
  }
  @include responsive("phone-wide", max) {
    font-size: 30px;
  }
}

.normal_text {
  @extend .futura_normal;
  font-size: 12.5px;
  line-height: 2;
  color: #404040;
  hyphens: auto;
  text-align: justify;
}

.button {
  border: 0;
  background-color: transparent;
}

.button_effect {
  @extend .futura_normal;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin: 25px 0 50px 0;
  padding: 12.5px 25px;
  user-select: none;
  color: black;
  text-decoration: none; 
}

.futura_normal {
  font-family: 'Futura', Helvetica, Arial, sans-serif;
  font-weight: normal;
}

.didonesque_normal {
  font-family: 'Didonesque', serif;
  font-weight: normal;
} 

.geomanist_normal {
  font-family: 'Geomanist', 'Bodoni Book', serif;
  font-weight: normal;
}

.text_hover {
  @extend .futura_normal;
  * { 
    color: black;
    text-decoration: none;
  }
}

.closemenu {
  cursor: pointer;
  height: 15px;
  width: 15px;
  svg {
    overflow: visible;
    line {
      stroke-width: 1px;
    }
  }
}
  
.full_space {
  height: 100vh;
  width: 100vw;
}
.full_spaceER {
  height: 100%;
  width: 100%;
}

.flex_colum {
  display: flex;
  flex-direction: column;
}

.hover_half_green {
  @extend .didonesque_headline;
  transition: all .5s cubic-bezier(.93,.01,.15,1);
  position: relative;
  text-decoration: none;
  &:before{
    content: " ";
    transform-origin: left;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    transform: scaleX(0);
    z-index: -1;
    transition: all .5s cubic-bezier(.93,.01,.15,1);
    background-color: #C1C12B;
  }
  &:hover:before{
    transform: scaleX(0.5);
    padding-left: 25px;
  }
  &:hover{
    padding-left: 25px;
  }
}

.lazy_container {
  height: 100%;
  user-select: none;
  position: relative;
  pointer-events: none;
}

.lazy_image {
  @extend .background_center;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  width: 0;
  @include responsive('tablet-wide', min) {
    position: absolute;
  }
  @include responsive('tablet-wide', max) {
    position: relative;
  }
}

.lazy {
  @extend .didonesque_headline;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;
  color: black;
  margin: 0;
  &::after {
    content: '';
    position: absolute;
    background-color: #2A446D;
    width: calc(100% + 30px);
    left: -15px;
    top: 50%;
    height: 14px;
    z-index: -1;
    transform: scaleX(0) translateY(-50%);  
    animation: lazyloading 2.5s 1s infinite cubic-bezier(.91,0,.17,.99);
  }
}
  
.lazy_fix_parallax {
  // FIX SIZE IN PARALLAX MODE
  @include responsive('tablet-wide', min) {
    transform: translate(-50%, -50%) scale(2) ;
  }
}
  @include responsive("tablet-wide", max) {
    position: relative;
  }

  @keyframes lazyloading {
    0% {
      transform: scaleX(0) translateY(-50%);  
      transform-origin: 0 0;
    }
    25% {
      transform: scaleX(1) translateY(-50%);
      transform-origin: 0 0;
    }
    75% {
      transform: scaleX(1) translateY(-50%);    
      transform-origin: 100% 100%;
    }
    100% {
      transform: scaleX(0) translateY(-50%);    
      transform-origin: 100% 100%;
    }
  }


  // PARALLAX_CLASSES
  .auto_slider {
    position: absolute;
  }
  .section {
    position: relative;
    margin: 0 auto;
    @include responsive('phone-wide', min){
      width: calc(100vw - 100px);
    }
    @include responsive('phone-wide', max){
      width: calc(100vw - 75px);
    }
    .sec_text{
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
  
  .sec_one {
    @include responsive("tablet-wide", min){
      height: 175vh;
    }
    @include responsive("tablet-wide", max){
      min-height: 500px;
      height: 100vh;
      width: 100%;
    }
    .sec_one_box {
      position: absolute;    
      background-color: #C1C12B;
      @include responsive("tablet-wide", min) {
        @include parallax(-2);
        @include calcMarginPadding(-1, margin, 0px, 0px, 0px, 50px);
      }
      @include responsive("tablet-wide", max){
        z-index: -1;
        height: 100%;
        width: 50%;
      }
    }
    .auto_slider {
      height: 50%;
      top: 25%;
      @include responsive("phone-wide", min) {
        right: 50px;
        width: calc(100% - 100px);
      }
      @include responsive("phone-wide", max) {
        right: 37.5px;
        width: calc(100% - 75px);
      }
    }
  }
  
  .sec_one_headline{
    @include responsive("tablet-wide", min) {
      bottom: calc(75vh + 75px);
    }
    @include responsive("tablet-wide", max) {
      left: 50px;
    }
    @include responsive("phone-wide", max) {
      left: 37.5px;
    }
  }
  

  /* INDIVIDUAL SEC-ONE STYLES */
  // PARKETT
  .sec_one_parkett {
    .auto_slider {    
      @include responsive("tablet-wide", min) {
        @include parallax(-1, 0, true);
        @include calcDistance(top, 25vh , -1 );
        @include calcDistance(left, calc(50% - 32.518115942vw) , -1 );
        @include autoSliderDimensions(height, 50vh, -1);
        @include autoSliderDimensions(width, 52.0833333333vw, -1);
        margin-left: 50px;
      }
    }
  
    .sec_one_box_parkett {
      @include responsive("tablet-wide", min) {
        @include calcDistance(top, 18vh , -2 );
        @include calcDistance(left, 50% , -2);
        width: 39.1304347826vw;
        height: 64vh;
      }
      @include responsive("tablet-wide", max) {
        right: 0;
      }
    }
  }

  
  // TREPPE
  .sec_one_treppe {
    .auto_slider {
      @include responsive("tablet-wide", min) {
        @include parallax(-1, 0, true);
        @include calcDistance(top, 25vh , -1 );
        @include calcDistance(left, 16.304347826vw , -1 );
        @include autoSliderDimensions(height, 54vh, -1);
        @include autoSliderDimensions(width, 40.625vw, -1);
      }
    }
    .sec_one_box_treppe {
      @include responsive("tablet-wide", min) {
        @include calcDistance(top, 75px, -2);
        @include calcDistance(left, 50%, -2);
        width: 50%;
        height: 65vh;
      }
      @include responsive("tablet-wide", max) {
        top: 0;
        z-index: -1;
      }
    }
  }
  
  
  // MOEBEL
  .sec_one_moebel {
    .auto_slider {    
      @include responsive("tablet-wide", min) {
        @include parallax(-1, 0, true);
        @include calcDistance(top, calc(18vh + 5vw), -1 );
        @include autoSliderDimensions(height, 60vh, -1);
        @include autoSliderDimensions(width, 60%, -1);
        @include calcDistance(right, -30%, -1);
        margin-right: -50px;
      }
    }
    .sec_one_box_moebel{
      @include responsive("tablet-wide", min) {
        @include calcDistance(top, 18vh , -2 );
        @include calcDistance(left, 15%, -2);
        width: 70%;
        height: 60vh;
      }
      @include responsive("tablet-wide", max) {
        width: 100%;
        height: 50%;
        bottom: 0;
      }
    }
  }
  

  // INNENAUSBAU
  .sec_one_innenausbau {
    .auto_slider {    
      @include responsive("tablet-wide", min) {
        @include parallax(-1, 0, true);
        @include calcDistance(top, calc(150px + 13.8888888889vh), -1 );
        @include calcDistance(left, calc(44.2708333334vw - 125px), -1);
        @include autoSliderDimensions(height, 50vh, -1);
        @include autoSliderDimensions(width, 50vw, -1);
        margin-left: 50px;
      }
    }
    .sec_one_box_innenausbau {
      @include responsive("tablet-wide", min) {
        @include calcDistance(top, 150px, -2 );
        @include calcDistance(left, calc(38.5416666667vw - 125px), -2);
        width: 61.4583333333vw;
        height: 38.8888888889vh;
      }
      @include responsive("tablet-wide", max) {
        position: absolute;
        height: 50%;
        width: 100%;
        top: 0;
        left: 0;
      }
    }
  }
  /* ------------------------------------------------ */
  
  .sec_next {
    @include responsive("tablet-wide", min){
      height: 100vh;
      top: 100vh;
    }
    @include responsive("tablet-wide", max){
      min-height: 500px;
      height: calc(100vh - 50px);
      margin-top: 50px;
    }
    .auto_slider {
      @include responsive("tablet-wide", min){
        height: 72.222222222%;
        width: 40%;
        top: 13.8888888889%;
        right: 16.67%;
        margin-right: -50px;
      }
      @include responsive("tablet-wide", max){
        height: 50%;
        width: 100vw;
        top: 0;
        right: 0;
        margin-right: -50px;
      }
      @include responsive("phone-wide", max){
        margin-right: -37.5px;
      }  
    }
    ul {
      display: inline-flex;
      flex-direction: column;
      position: relative;
      top: 50vh;
      transform: translateY(-50%);
      @include responsive("tablet-wide", min){
        left: 16.66666667%;
      }
      @include responsive("tablet-wide", max){
        top: 75%;
        left: 0;
        margin-left: 50px;
      }
      @include responsive("phone-wide", max){
        margin-left: 0;
      }
      li{
        align-self: flex-start;
      }
    }
  
    h1 {
      line-height: 1;
      position: absolute;
      font-family: 'Gilroy', Helvetica, sans-serif;
      z-index: 2;
      @include responsive("tablet-wide", min){
        left: 16.66666667%;
        top: 13.8888888889vh;
        transform: translateX(-50%);
        font-size: 22.5px;
      }
      @include responsive("tablet-wide", max){
        margin: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  //-------------------------------------

`;

