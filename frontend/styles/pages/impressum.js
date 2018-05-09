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

  // IMPRESSUM
  .wrapper {
    color: rgba(0,0,0,0.5);
    line-height: 1.75;
    hyphens: auto;
    text-align: justify;
    display: flex;
    position: relative;
    top: 20vh;
    margin: 0 auto;
    @include responsive('phone-wide', min) {
      width: calc(100vw - 100px);
    }
    @include responsive('tablet-wide', max) {
      flex-direction: column;
    }
    @include responsive('phone-wide', max) {
      width: calc(100vw - 75px);
    }
   
    .info {
      max-width: 250px;
      display: flex;
      flex-direction: column;
      text-transform: uppercase;
      font-style: normal;
      font-size: 10.5px;
      letter-spacing: 3px;
      * {
        display: inline-block;
      }
      :global(&>div, &>span){
        margin-bottom: 10px;
      }
      @include responsive('tablet-wide', max) {
        margin-bottom: calc(20vh - 50px);
      }
    }
      
    .rechtliches {
      font-size: 10.5px;
      max-width: 600px;
      :global(h3) {
        font-weight: normal;
        font-size: 14px;
      }
      :global(p) {
        margin: 20px 0;        
      }
      @include responsive('tablet-wide', min) {
        margin-left: 150px;
      }
    }
  }
  
  //-------------------------------------
  
`;
