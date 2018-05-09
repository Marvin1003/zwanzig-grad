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

  .container {
    * {
    transform-style: unset;
    }
    width: 100vw;
    position: absolute;
    @include responsive('tablet-wide', max) {
      display: flex;
      top: 50px;
      // 100px == 2xNavHeight
      flex-direction: column;
    }
    >:global(div):first-of-type {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      padding: 50px 0 37.5px 0;
      margin: 0 auto;
      @include responsive('tablet-wide', min) {
        position: absolute;
        top: 0;
        left: 0;
        min-height: calc(100vh - 75px);
        margin: 75px 50px 0 50px;
        width: calc(50% - 100px);
      }
      @include responsive('tablet-wide', max) {
        // REMINDER
        min-height: calc(100vh - 50px);
        width: calc(100% - 100px);
      }
      @include responsive('phone-wide', max) {
        padding: 30px 0 25px 0;
        width: calc(100% - 75px);
      }
    }
    >:global(div):last-of-type {
      overflow: hidden;
      @include responsive('tablet-wide', min) {
        position: fixed;
        top: 0;
        right: 0;
        width: 50%;
        height: 100vh;
      }
      @include responsive('tablet-wide', max) {
        height: calc(100vh - 50px);
        width: 100%;
      }
    }
  }

  .address {
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
  
  .headline {
    font-weight: inherit;
    align-self: flex-start;
    font-size: 22px;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    @include responsive('tablet-wide', min) {
      top: 112.5px;
    }
  }

  //-------------------------------------
  
`;
