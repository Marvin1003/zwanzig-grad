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

  
  $spacingDesktop: 7.8125vw;

  body {
    height: 100% !important;
  }

  :global(section) {
    display: inline-block;
    position: absolute;
    height: 100%;
    width: 100%;
  }
  :global(.section_background_wrapper) {
    background-color: #F3F4F7;
    perspective: 400px;
  }

  .innerContainer {
    @include responsive('tablet-wide', max) {
      position: relative;
      top: 50px;
      left: 50px;
  
      height: calc(100% - 100px);
      width: calc(100% - 100px);
    }

    .content {
      user-select: none;
      position: absolute;
      display: flex;
      left: 50%;
      transform: translateX(-50%);
      @include responsive('tablet-wide', max) {
        top: 50%;
        flex-direction: column;
      }
      @include responsive('tablet-wide', min) {
        bottom: 0;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
      }
    }
  }
  
  .topic_subtext {
    min-width: 100px;
    max-width: 300px;
    padding-left: 15px;
    color: inherit;
    font-size: 14px;
    text-align: left;
    border-left: 1px solid #C1C12B;
    line-height: 1 !important; 
    @include responsive('tablet-wide', min) {
      font-size: 16px;
      margin-left: 25px;
    }
  }
  // THIS TOPIC CONTAINER IS IMPORTANT AS WE CANT USE TRANSLATEY ON TOPIC ITSELF - ANIMATION OVERWRITES IT - 
  .topic_container {
    @include responsive("tablet-wide", max) {
      transform: translateY(-50%);
    }
    .topic {
      white-space: nowrap;
      overflow: hidden;
      font-size: 16px;
      max-width: 100%;
      margin: 0;
      text-transform: lowercase;
      font-size: 24px;
      word-wrap: break-word;
      @include responsive('tablet-wide', min) {
        line-height: 0.9;
        font-size: 30px;
      }
      :global(.topic_chars):first-child {
        text-transform: capitalize;
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
      position: absolute;
      top: calc(#{$spacingDesktop} + 50px);
      left: calc(#{$spacingDesktop} + 50px);
  
      height: calc((100% - #{$spacingDesktop} * 2) - 100px);
      width:  calc((100% - #{$spacingDesktop} * 2) - 100px);
      z-index: 100;
    }
  }

  :global(.home_container) {
    position: absolute;
    height: 100%;
    width: 100%;
    & > :global(section):first-child {
      z-index: 1;
    }
  }

  .layout {
    color: white;
    position: fixed;
    top: $spacingDesktop;
    left: $spacingDesktop;
    height: calc(100% - #{$spacingDesktop} * 2);
    width: calc(100% - #{$spacingDesktop} * 2);
    z-index: 10;
    @media only screen and (orientation: landscape) {
      top: $spacingDesktop / 2;
      left: $spacingDesktop / 2;
      height: calc(100% - #{$spacingDesktop / 2} * 2);
      width: calc(100% - #{$spacingDesktop / 2} * 2);
    }

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
