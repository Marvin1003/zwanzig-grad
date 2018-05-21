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
  $layoutGAP: 10vw;

  .container {
    * {
    transform-style: unset;
    }
    width: 100vw;
    position: absolute;
    @include responsive('tablet-wide', max) {
      display: flex;
      flex-direction: column;
    }
    .wrapper {
      position: relative;
      min-height: 600px;
      height: 100vh;
      @include responsive('tablet-wide', min) {
        width: 50%;
      }
      @include responsive('tablet-wide', max) {
        width: 100%;
      }
    }
    .layout_wrapper {
      display: flex;
      align-items: center;
      position: relative;
      top: $layoutGAP;
      bottom: $layoutGAP;
      height: calc(100% - (#{$layoutGAP} * 2));
    }
    >:global(div):last-of-type {
      overflow: hidden;
      height: 100vh;
      @include responsive('tablet-wide', min) {
        position: fixed;
        top: 0;
        right: 0;
        width: 50%;
      }
      @include responsive('tablet-wide', max) {
        width: 100%;
      }
    }
  }

  .address {
    position: absolute;
    bottom: 0;
    font-weight: inherit;
    color: rgba(0,0,0,0.5);
    font-size: 10px;
    letter-spacing: 1px;
    font-style: normal;
    text-transform: uppercase;
    @include responsive('phone-wide', max) {
      font-size: 8px;
    }
  }
  
  //-------------------------------------
  
`;
