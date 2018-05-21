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

  // MENU MOBILE
  :global(.menu) {
    width: 100vw;
    display: flex;
    z-index: 50;
  }

  .menuMobile {
    display: flex;
    align-items: flex-end;
    position: relative;
    padding: calc(10vw + 50px) 10vw 10vw 10vw;
    height: 100%;
    width: 100%;
    .closemenu {
      position: absolute;
      right: 0;
      align-self: flex-start;
    }

    .impressum {
      position: absolute;
      left: 10vw;
      text-transform: lowercase;
    }

    .wrapper {
      height: 100%;
      width: 100%;
      max-height: 600px;
      align-self: flex-start;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .stroke {
        transform-origin: 0 0;
        width: 25px;
        border: 0;
        border-bottom: 1px solid black;
      }

      ul {
        display: flex;
        flex-direction: column;
        :global(.mobile_menu_headline) {
          text-transform: capitalize;
          align-self: flex-start;
          line-height: 1;
          color: black;
          cursor: pointer;
          transition: color .5s ease-out;
          margin: 0 0 12.5px 0;
          &:last-child {
            margin: 0;
          }
          @include responsive('phone-wide', max) {
            font-size: 26px;
          }
          @include responsive('phone-wide', min) {
            font-size: 35px;
          }
          @include responsive('tablet', min) {
            font-size: 45px;
          }
        }
      }
      .info_container {
        margin-bottom: 75px;
        .info_menu {
          display: flex;
          flex-direction: column;
          &:first-of-type {
            margin-bottom: 35px;
          }
          h3 {
            align-self: flex-start;
            font-size: 16px;
            margin-bottom: 20px;
          }
          span {
            align-self: flex-start;
            font-size: 12px;
            padding: 5px 0;
            display: block;
          }
        }
      }
      @media only screen and (max-height: 650px) {
        font-size: 22px;
        .info_container {
          margin-bottom: 50px;
          .info_menu {
            &:first-of-type {
              margin-bottom: 20px
            }
            h3 {
              font-size: 14px;
              margin-bottom: 10px;
            }
          }
        }
      }
    }
    @media only screen and (max-height: 550px) and (orientation: portrait) {
      :global(.mobile_menu_headline) {
        font-size: 22px !important;
      }
      h3 {
        font-size: 12px !important;
      }
      span {
        font-size: 10px !important;
      }
    }
    @media only screen and (max-height: 500px) {
      .info_container {
        display: flex;
        justify-content: space-between;
      }
    }
    @media only screen and (orientation: landscape) {
      align-items: center;
      .closemenu {
        top: initial;
      }
      .impressum {
        align-self: flex-end;
      }
      .wrapper {
        height: auto;
        flex-direction: row;
        .stroke {
          display: none;
        }
      }
      .info_container {
        margin: 0;
        .info_menu {
          margin: 0;
        }
      }
      @media only screen and (max-width: 700px) {
        .info_menu {
          font-size: 14px;
        }
        :global(.mobile_menu_headline) {
          font-size: 35px;
        }
      }
      @media only screen and (max-height: 500px) {
        ul {
          margin-bottom: 30px;
        }
        :global(.mobile_menu_headline) {
          font-size: 30px !important;
        }
        .info_container {
          margin-bottom: 0 !important;
        }
      }
      @media only screen and (max-height: 400px) {
        .info_container {
          display: none;
        }
        :global(.mobile_menu_headline) {
          font-size: 20px !important;
        }
      }
    }
  }
`;
