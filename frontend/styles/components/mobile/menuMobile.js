import css from 'styled-jsx/css';

export default css`
  //-------------------------------------

  @import './frontend/styles/mixins/variables.scss';

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
    padding: calc(#{$layoutGAP} + 50px) $layoutGAP $layoutGAP $layoutGAP;
    height: 100%;
    width: 100%;
    .closemenu {
      position: absolute;
      right: 0;
      align-self: flex-start;
    }

    .impressum {
      position: absolute;
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
          h4 {
            align-self: flex-start;
            margin-bottom: 20px;
          }
          span {
            align-self: flex-start;
            padding: 5px 0;
          }
        }
      }
      @media only screen and (max-height: 650px) {
        .info_container {
          margin-bottom: 50px;
          .info_menu {
            &:first-of-type {
              margin-bottom: 20px
            }
            h4 {
              margin-bottom: 10px;
            }
          }
        }
      }
    }
    @media only screen and (max-height: 600px) {
      .info_container {
        display: flex;
        justify-content: space-between;
        @media only screen and (orientation: landscape) {
          .info_menu:first-of-type {
            margin-right: 25px;
          }
        }
      }
    }
    @media only screen and (max-height: 500px) and (orientation: portrait) {
      .info_container {
        display: none;
      }
      .stroke {
        display: none;
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
      @media only screen and (max-height: 500px) {
        ul {
          margin-bottom: 30px;
        }
        .info_container {
          margin-bottom: 0 !important;
        }
      }
      @media only screen and (max-height: 420px) {
        .impressum {
          right: $layoutGAP;
        }
      }
    }
  }
`;
