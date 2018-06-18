import css from 'styled-jsx/css';

export default css`
  //-------------------------------------
  
  @import './frontend/styles/mixins/variables.scss';
  @import './frontend/styles/mixins/responsive.scss';

  //-------------------------------------

  // IMPRESSUM
  .wrapper {
    hyphens: auto;
    text-align: justify;
    display: flex;
    position: relative;
    top: calc(#{$layoutGAP} + 150px);
    margin: 0 auto;
    @include responsive('tablet-wide', max) {
      flex-direction: column;
    }

    .info {
      text-align: left;
      color: rgba(0,0,0,0.5);
      max-width: 250px;
      display: flex;
      flex-direction: column;
      font-style: normal;
      * {
        display: block;
      }
      :global(&>div, &>span){
        margin-bottom: 25px;
      }
      @include responsive('tablet-wide', max) {
        margin-bottom: calc(20vh - 50px);
      }
    }
      
    .rechtliches {
      color: rgba(0,0,0,0.5);
      line-height: 1.75;
      max-width: 600px;
      :global(h3) {
        line-height: 1;
        font-weight: normal;
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
