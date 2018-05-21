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

  // DEFAULT 
  
  $layoutGAP: 10vw;
  
  .standard_nav {
    width: 100vw;
    position: fixed;
    left: 0;
    display: flex;
    justify-content: space-between;
    color: black;
    z-index: 101;
    .background {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0; 
      left: 0;
      background: white;
      transform-origin: 0 0;
      transform: scaleY(0);
    }

    .menuicon {
      position: absolute;
      top: $layoutGAP;
      right: $layoutGAP;
      align-self: flex-start;
      width: 20px;
      :global(line) {
        stroke-width: 2px;
        stroke: currentcolor;
      }
    }

    :global(.logo) {
      position: absolute;
      top: $layoutGAP;
      left: $layoutGAP;
      cursor: pointer;
      user-select: none;
      img {
        pointer-events: none;
        user-select: none;
        transition: width .5s cubic-bezier(.91,0,.17,.99);
        transform-origin: left;
        width: 55px;
        @include responsive('tablet-wide', max) {
          width: 42.5px;
        }
      }
    }
  }

  //-------------------------------------

  // HOME 
  .header_home {
    color: white;
  }

  //-------------------------------------

`;


// .menu_icon_wrapper {
//   display: flex;
//   position: relative;
//   .menu_icon {
//     @extend .menuicon;
//     width: 30px;
//   }
// }

// .menuicon {  
//   display: flex;
//   flex-direction: column;
//   height: 13px;
//   width: 30px;
//   align-items: center;
//   justify-content: space-between;
//   overflow-x: hidden;
//   cursor: pointer;
//   &> div {
//     position: relative;
//     display: flex;
//     left: -5px;
//     &> div {
//       background-color: currentcolor;
//       height: 2px;
//     }
//   }
//   &> div:first-child > div:first-child {
//     width: 22.5px;
//     margin-right: 7.5px;
//   }
//   &> div:nth-child(2) > div:first-child {
//     width: 25px;
//     margin-right: 5px;
//   }
//   &> div:last-child > div:first-child {
//     width: 17.5px;
//     margin-right: 12.5px;
//   }
//   &> div > div:last-child {
//     width: 10px;
//   }
// }
