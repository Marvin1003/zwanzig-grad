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
  .standard_nav {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F3F4F7;  
    border-bottom: 1px solid #EAEAEA;
    transition: height .5s cubic-bezier(.91,0,.17,.99);
    transform: translate3d(0,0,0);
    z-index: 100;
    @include responsive("tablet-wide", min) {
      height: 75px;
    }
    @include responsive("tablet-wide", max) {
      height: 50px;
    }
    :global(.logo) {
      user-select: none;
      position: relative;
      @include responsive("phone-wide", min) {
        left: 50px;
      }
      @include responsive("phone-wide", max) {
        left: 37.5px;
      }
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
    .menu {
      display: flex;
      position: relative;
      .menu_icon {
        @extend .menuicon;
        width: 30px;
      }
      @include responsive("phone-wide", min) {
        right: 50px;
      }
      @include responsive("phone-wide", max) {
        right: 37.5px;
      }
    }
  }
  .menuicon {  
    display: flex;
    flex-direction: column;
    height: 13px;
    width: 30px;
    align-items: center;
    justify-content: space-between;
    overflow-x: hidden;
    cursor: pointer;
    &> div {
      position: relative;
      display: flex;
      left: -5px;
      &> div {
        background-color: currentcolor;
        height: 2px;
      }
    }
    &> div:first-child > div:first-child {
      width: 22.5px;
      margin-right: 7.5px;
    }
    &> div:nth-child(2) > div:first-child {
      width: 25px;
      margin-right: 5px;
    }
    &> div:last-child > div:first-child {
      width: 17.5px;
      margin-right: 12.5px;
    }
    &> div > div:last-child {
      width: 10px;
    }
  }


  //-------------------------------------

  // HOME 
  $spacingDesktop: 7.8125vw;
  
  .header_home {
    color: white;
    background-color: transparent;
    padding: $spacingDesktop $spacingDesktop 0 $spacingDesktop;
    height: auto;
    align-items: flex-start;
    border-bottom: 0;
    @media only screen and (orientation: landscape) {
      padding: $spacingDesktop / 2 $spacingDesktop / 2 0 $spacingDesktop / 2;
    }
    
    .menu {
      right: 0;
    }
    :global(.logo) {
      left: 0;
    }
    .icon {
      right: 0;
    }
    @include responsive("tablet-wide", max) {
      background-color: transparent;
    }
  }

  //-------------------------------------
  
  // CONTACT 
  .header_contact {
    @include responsive('tablet-wide', min) {
      width: 50%;
    }
    @include responsive('phone-wide', max) {
      width: 100%;
    }
  }

  //-------------------------------------

`;
