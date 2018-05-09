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
  $breakpointsDPI: (
    "phone":        0,
    "phone-wide":   0,
    "phablet":      0,
    "tablet-small": 0,
    "tablet":       0,
    "tablet-wide":  0,
    "desktop":      0,
    "desktop-wide": 0
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
  .google-map {
    height: 100%;
    width: 50%;
    overflow: hidden;
    border: 0;

    >:global(div) { 
      position: relative !important;
      height: 200% !important;
      width: 200% !important;
      left: -50% !important;
      top: -50% !important;
      * {
        cursor: -webkit-grab;
      }
    }
    @include responsive('tablet-wide', max) {
      height: 50%;
      width: 100%;
    }
}`;
