import css from 'styled-jsx/css';

export default css`
  //-------------------------------------

  @import './frontend/styles/mixins/responsive.scss';

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
