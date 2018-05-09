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

  .form {
    width: 100%;
    margin-top: 50px;
    :global(div) {
      margin-bottom: 40px;
    }
    :global(.captcha) {
      transform-origin: 0 0;
    }
    :global(.submit) {
      position: relative;
      bottom: 20px;
      font-size: 20px;
      background-color: transparent;
      border: 0;
      outline: 0;
    }
    :global(.notverified) {
      display: inline-block;
      user-select: none;
      text-decoration: line-through;
      cursor: not-allowed;
      margin: 0;
    }

    .label {
      position: absolute;
      left: 0;
      font-size: 14px;
      color: #808080;
      z-index: -1;
    }
    
    .textarea {
      overflow: hidden;
      resize: none;
      max-height: 150px;
    }
    
    .textarea, .input {
      font-size: 16px;
      padding-bottom: 2px;
      outline: none;
      width: 100%;
      background-color: transparent;
      border: 0;
      border-radius: 0;
      border-bottom: 1px solid #808080;
      box-shadow: none;
    }

    .status {
      display: none;
      position: absolute;
      font-size: 24px;
      font-weight: normal;
    }
  }
  
  //-------------------------------------

`;

