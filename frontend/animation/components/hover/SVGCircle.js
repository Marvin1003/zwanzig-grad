import { Arrow } from '../../../../static/svg/svg.js';
import { CursorHome } from '../../../../static/svg/svg.js';

import style from '../../../styles/components/common/svg';

export default class SVGCircle extends React.Component {
  constructor(props) {
    super(props);

    // REF 
    this.svgContainer = React.createRef();
  }

  static defaultProps = {
    className: ''
  }

  renderCircle() {
    if(this.props.hover)
      return <Arrow />
    else 
      return <CursorHome />
  }

  render() {
    if(this.props.hover)
      return (
        <div ref={this.svgContainer} 
          className={`svg_container ${this.props.className}`}>
          <style jsx global>{style}</style>
          {this.renderCircle()}
        </div>
      );
    else {
      return (
        <div ref={this.svgContainer}  
          className={`svg_container ${this.props.className}`}>
          <style jsx global>{style}</style>
          {this.renderCircle()}
        </div>
      );
    }
  }
}