import css from 'styled-jsx/css';

export default css.global`
  //-------------------------------------

  @import './node_modules/modularscale-sass/stylesheets/modularscale';
  @import './frontend/styles/mixins/variables.scss';
  @import './frontend/styles/mixins/responsive.scss';

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

  // DEFAULT 

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover
  textarea:-webkit-autofill:focus {
    box-shadow: 0 0 0px 1000px #F3F4F7 inset;
  }

  *, *::before, *::after {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    box-sizing: inherit;
    outline: none;
    margin: 0;
    padding: 0;
  }

  html {
    width: 100%;
    overflow: hidden;
    overflow-y: -ms-autohiding-scrollbar;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;  
    box-sizing: border-box;
  }

  ::selection {
    background-color: rgba(0,0,0,.99);
    color: white;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  //-------------------------------------

  $modularscale: (
    base: 12px,
    ratio: 1.25,
    400px: (
      ratio: 1.25,
    ),
    480px: (
      ratio: 1.35,
    ),
    768px: (
      base: 13px,
      ratio: 1.45,
    ),
  );

  body {
    font-size: ms(0);
    width: 100%;
    background-color: white;
  }

  h1, h2, h3, h4, {
    font-weight: normal;
    line-height: 1;
  }

  h1 { @include ms-respond(font-size,4); }

  h2 { @include ms-respond(font-size,3); }

  h3 { @include ms-respond(font-size,2); }

  h4 { @include ms-respond(font-size,1); }
  
  .font_small { @include ms-respond(font-size, -1); }
  
  .font_medium { @include ms-respond(font-size,1); }

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

  ul {
    list-style-type: none;
  }

  a {
    user-select: none;
    text-decoration: none;
    color: inherit;
  }

  .root {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .layout_wrapper {
    position: absolute;
    padding: $layoutGAP;
    width: 100%;
    height: 100%;
  }
  
  //-------------------------------------

  // MAIN PAGE TRANSITION
  .page_transition_wrapper {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform: scale(0);
    z-index: 1000;
    pointer-events: none;
    background-color: $zwanzig-grad-rot-dunkel;
    
    // TEMP FIX
    border: 1px solid transparent;
    .page_transition {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: $zwanzig-grad-rot;
    }

    &.page_transition_initial {
      transform: scale(1);
      transform-origin: 0 0;
      .page_transition {
        transform-origin: inherit;
        color: white;
      }
      .zwanzig-grad {
        font-size: 20px;
        text-transform: lowercase;
        letter-spacing: 1.5px;
        display: inline-block;
        visibility: hidden;
        user-select: none;
        max-width: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: normal;
      }
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
    user-select: none;
  }

  .didonesque_headline {
    @extend .didonesque_normal;
    color: black;
    // 20px on BOTTOM dude to line-height of <p>
    margin: 25px 0 20px 0;
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
    }
    @include responsive("tablet-wide", max) {
      display: inline-block;
      margin-top: 75px;
    }
    @include responsive("phone-wide", max) {
    }
  }

  .normal_text {
    @extend .futura_normal;
    line-height: 2;
    color: #404040;
    hyphens: auto;
    text-align: justify;
  }

  .button_effect {
    @extend .futura_normal;
    text-transform: uppercase;
    letter-spacing: 4px;
    margin: 25px 0 50px 0;
    padding: 12.5px 25px;
    user-select: none;
    color: black;
    text-decoration: none; 
  }

  .button {
    border: 0;
    background-color: transparent;
    font-family: inherit;
    color: inherit;
    cursor: pointer;
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
    // background: $lazy-background;
    z-index: 1;
    div {
      will-change: transform;
    }
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