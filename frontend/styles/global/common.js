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
  font-family: 'Didonesque-Roman';
  font-display: swap;
  src: url('../../static/fonts/Didonesque/Didonesque-Roman.woff2') format('woff2'),
       url('../../static/fonts/Didonesque/Didonesque-Roman.woff') format('woff');
}

@font-face {
  font-family: 'Futura-Book';
  font-display: swap;
  src: url('../../static/fonts/Futura/Futura-Book.ttf');
}
@font-face {
  font-family: 'Quattrocento-Bold';
  font-display: swap;
  src: url('../../static/fonts/Quattrocento/Quattrocento-Bold.ttf');
}

//-------------------------------------

$layoutGAP: 10vw;
$zwanzig-grad-rot: #6D2A2A;
$zwanzig-grad-rot-dunkel: #3B1717;
$zwanzig-grad-gruen: #C1C12B;
$lazy-background: #f5f5f5;

// DEFAULT 

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover
textarea:-webkit-autofill:focus {
  box-shadow: 0 0 0px 1000px #F3F4F7 inset;
}


//-------------------------------------

ul {
  list-style-type: none;
}

a {
  user-select: none;
  text-decoration: none;
  color: inherit;
}

// LAYOUT WRAPPER

.layout_wrapper {
  position: absolute;
  bottom: $layoutGAP;
  left: $layoutGAP;
  width: calc(100%  - (#{$layoutGAP} * 2));
  height: calc(100%  - #{$layoutGAP});
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
  background: $zwanzig-grad-rot-dunkel;
  overflow: hidden;
  .page_transition {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0; 
    background: $zwanzig-grad-rot;
  }
}

//-------------------------------------

// MENU

.menu {
  .background_animation_mobile {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: white;
    transform-origin: 100% 100%;
    transform: scaleY(0);
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

.quattrocento_headline { 
  @extend .quattrocento_normal;
  line-height: 0.85;
  position: relative;
  z-index: 1;
  user-select: none;
  text-transform: capitalize;
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
  font-family: 'Futura-Book', Helvetica, Arial, sans-serif;
  font-weight: normal;
}

.didonesque_normal {
  font-family: 'Didonesque-Roman', serif;
  font-weight: normal;
} 

.quattrocento_normal {
  font-family: 'Quattrocento-Bold', 'Bodoni Book', serif;
  font-weight: normal;
}

.text_hover {
  @extend .futura_normal;
  * { 
    color: black;
    text-decoration: none;
  }
}

// SVG

.cursor_home {
  pointer-events: none;
  display: none;
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 1000;
  circle {
    &:first-of-type {
      stroke: white;
      position: absolute;
      top: 0;
    }
    &:last-of-type {
      stroke: rgba(255,255,255, 0.5);
      stroke-dashoffset: 0;
    }
  }
}

.closemenu, .menuicon {
  position: relative;
  z-index: 1;
  cursor: pointer;
  svg {
    overflow: visible;
  } 
}

.closemenu {
  height: 12.5px;
  width: 12.5px;
  line {
    stroke-width: 1px;
    stroke: black;
  }
}

.lazy_container {
  height: 100%;
  width: 100%;
  user-select: none;
  position: relative;
  pointer-events: none;
  background: $lazy-background;
}

.lazy_image {
  @extend .background_center;
  pointer-events: none;
  user-select: none;
  left: 0;
  object-fit: cover;
  @include responsive('tablet-wide', min) {
    position: absolute;
  }
  @include responsive('tablet-wide', max) {
    position: relative;
  }
}
  //-------------------------------------
`;


// .hover_half_green {
//   @extend .didonesque_headline;
//   transition: all .5s cubic-bezier(.93,.01,.15,1);
//   position: relative;
//   text-decoration: none;
//   &:before{
//     content: " ";
//     transform-origin: left;
//     position: absolute;
//     height: 100%;
//     width: 100%;
//     left: 0;
//     transform: scaleX(0);
//     z-index: -1;
//     transition: all .5s cubic-bezier(.93,.01,.15,1);
//     background-color: $zwanzig-grad-gruen;
//   }
//   &:hover:before{
//     transform: scaleX(0.5);
//     padding-left: 25px;
//   }
//   &:hover{
//     padding-left: 25px;
//   }
// }