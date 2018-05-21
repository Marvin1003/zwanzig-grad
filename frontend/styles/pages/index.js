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
  $zwanzig-grad-rot: #6D2A2A;
  $zwanzig-grad-gruen: #C1C12B;

  :global(section) {
    display: inline-block;
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .topic_container {
    display: inline-block;
    position: fixed;
    overflow: hidden;
    user-select: none;
    top: 50%;
    @include responsive('phone-wide', min) {
      left: 33.33%;
      transform: translateY(-50%);
    }
    @include responsive('phone-wide', max) {
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .topic {
      white-space: nowrap;
      max-width: 100%;
      text-transform: capitalize;
      @include responsive('tablet-wide', min) {
        font-size: 50px;
      }
      @include responsive('tablet-wide', max) {
        font-size: 30px;
      }
      @media only screen and (max-width: 350px) {
        font-size: 24px;
      }
    }
  }

  :global(.topic_link) {
    @include responsive('tablet-wide', min) {
      display: none !important;
    } 
    @include responsive('tablet-wide', max) {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      text-transform: lowercase;
    }
  }
  :global(.home_snake_area) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  :global(.snake_container) {
    @include responsive('tablet-wide', min) {
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: 1;
    }
  }

  :global(.home_container) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    & > :global(section):first-child {
      z-index: 1;
    }
  }

  .layout {
    width: 100%;
    height: calc(100% - #{$layoutGAP});
    position: relative;
    top: $layoutGAP;
    color: white;
    z-index: 10;
    .side {
      user-select: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .current_section {
      left: 0;
      font-size: 12px;
      span {
        padding: 0 3px;
      }
    }
    
    :global(.links) {
      position: absolute;
      bottom: 0;
      z-index: 1;
      cursor: pointer;
    }

    :global(.right) {
      right: 0;
    } 

    :global(.left) {
      left: 0;
    }

    .home_buttons {
      right: 0;
      display: flex;
      flex-direction: column;
      z-index: 1;
      :global(div):last-child {
        margin-top: 15px;
      }
    }
  }`;
