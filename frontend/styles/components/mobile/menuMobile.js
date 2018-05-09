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
  .menuMobile {
    height: 100%;
    width: 100vw;
    background-color: #2A446D;
    display: flex;
    align-items: center;
    .wrapper {
      margin: 0 25%;
      ul {
        display: inline-flex;
        flex-direction: column;
        :global(li) {
          color: white;
          align-self: flex-start;
          cursor: pointer;
          margin: 0;
          transition: color .5s ease-out;
          &:hover {
            color: black;
          }
          
          @include responsive('phone-wide', min) {
            font-size: 40px;
          }
          @include responsive('tablet', min) {
            font-size: 45px;
          }
        }
      }
      
      .info {
        margin-top: 50px;
        @include responsive('phone', min) {
          font-size: 16px;
        }
        @include responsive('phone', max) {
          font-size: 12px;
        }
        h3 {
          font-size: inherit;
          margin: 0;
          color: white;
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            margin-left: 10px;
            background-color: white;
            height: 2px;
            width: 50px;
          }
        }
        span {
          font-size: inherit;
          margin: 10px 0;
          display: block;
          color: #F3F4F7;
        }
      }
      @media only screen and (orientation: landscape) {
        width: 70%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .info_container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .info {
            margin: 0;
          }
        }
        @media only screen and (max-width: 700px) {
          .info {
            font-size: 14px;
          }
          :global(li) {
            font-size: 35px !important;
          }
        }
        @media only screen and (max-width: 550px) {
          :global(li) {
            font-size: 30px !important;
          }
        }
        @media only screen and (max-height: 350px) {
          width: 60%;
          .info {
            font-size: 12px;
          }
        }
      }
    }
  }
  .closemenu {
    position: absolute;
    right: 37.5px;
    top: 25px;
    :global(line) {
      stroke: white;
    }
  }
  .impressum {
    position: absolute;
    right: 37.5px;
    bottom: 25px;
    font-size: 14px;
    color: white;
  }
`;