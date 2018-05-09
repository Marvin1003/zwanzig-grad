import { PureComponent, Fragment } from 'react';
import Link from '../components/Utility/Link';
import { Consumer } from '../components/Context';

//WRAPPER
import Wrapper from '../components/Wrapper';

// ANIMATION
import SnakeNSwitch from '../animation/components/SnakeNSwitch';
import TextHover from '../animation/components/hover/TextHover';
import SVGCircle from '../animation/components/hover/SVGCircle';

// COMPONENT
import Background from '../components/Home/HomeBackground';

// FUNCTIONS
import autoScroll from '../functions/autoScroll';
import nextTopic from '../animation/nextTopic';
import toSpan from '../functions/helper/toSpan';
import runOnce from '../functions/helper/runOnce';

import images from '../../static/json/homeImages.json';

import style from '../styles/pages/index';

/* eslint-disable */
       
class Home extends PureComponent {
  constructor(props) {
    super(props);

    // REFS
    this.container = React.createRef();
    this.current = React.createRef();
    this.amount = React.createRef();
    this.headlineWrapper = React.createRef();
    this.subTextWrapper = React.createRef();

    this.headlines = [];
    this.content = [];
    this.colors = [];

    for(const key in images.source) {
      this.colors.push(images.source[key].color);
      this.headlines.push(key);
    }

    for(const value of images.content) {
      this.content.push(value);
    }

    this.autoScroll = runOnce(autoScroll);
    this.initialTextAnimation = runOnce(this.initialTextAnimation);
    
    // FOR THE TEXTHOVER LINK
    this.state = { currentLink: this.headlines[window.APP.nextSection] }
  }

  componentDidMount() {
    window.APP.sectionAmount = Object.keys(images.source).length;
    window.APP.nextTopic = nextTopic.bind(this, this.headlines, this.content, this.colors);

    // INITIAL
    this.current.current.innerText = `0${window.APP.nextSection + 1}`;
    this.amount.current.innerText = `0${window.APP.sectionAmount}`;

  }

  componentDidUpdate() {
    // UPDATE CURRENT LINK
    this.startScripts();
  }

  updateCurrentLink = () => {
    this.setState((prevState) => (
      prevState.currentLink !== this.headlines[window.APP.nextSection]
        ? { currentLink: this.headlines[window.APP.nextSection] }
        : null
    ));
  }

  startScripts() {
    // IF COOKIES ACCEPTED INITIATE
    this.props.context.acceptedCookies && this.autoScroll();
  }
  
  renderComponent(device, mime) {
    if(device === 'desktop') {
      return (
        <div ref={this.container} className="snake_container">
          <SnakeNSwitch currentLink={this.state.currentLink} wrapper={this.container} images={images.source} sets={images.sizes} />
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <Wrapper title="Home" header="header_home">      
        <style jsx>{style}</style>
        <div className="layout futura_normal">
          <div className="innerContainer">
            <div className="content">
             <div className="topic_container"><h1 className="topic geomanist_normal" /></div>
              <p className="normal_text topic_subtext" />
            </div>
              <Link className="topic_link futura_normal" href={this.state.currentLink} type="link">ansehen</Link>
          </div>
          <div className="current_section side">
            <span ref={this.current} className="sec_current" />
            /
            <span ref={this.amount} className="sec_amount" />
          </div>
          <div className="home_buttons side">
            <SVGCircle svg={'arrow'} className="prev" touch={this.props.context.touch} />
            <SVGCircle svg={'arrow'} className="next" touch={this.props.context.touch} />
          </div>
          {/* <Link className="left links" href="">werte</Link> */}
          <a className="left links">werte</a>
          <Link className="right links" href="kontakt">kontakt</Link>
        </div>
        <div onClick={this.goToTopic} className="home_container">
          <Background images={images} content={this.headlines} mime={this.props.context.mime} />;
        </div>
        {this.renderComponent(this.props.context.device, this.props.context.acceptedCookies,      this.props.context.mime)}
      </Wrapper>
    );
  }
}

export default (props) => (
  <Consumer>
    {(context) => <Home {...props} context={context} />}
  </Consumer>
)