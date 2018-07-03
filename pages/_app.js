import App, { Container } from 'next/app';
import Error from './_error';

// PROVIDER
import { WebPProvider } from '../frontend/components/Context/WebP';
import { RouterProvider } from '../frontend/components/Context/Router';
import { DeviceProvider } from '../frontend/components/Context/Device';

import Loader from '../frontend/components/Loader/PageLoader';

import mobileHeight from '../frontend/functions/mobileHeight';

import '../frontend/gsap/imports';

export default class MyApp extends App {
  static getInitialProps({ ctx }) {
    if(ctx.res) {
      const support = JSON.parse(ctx.res._headers.supported);
      const { statusCode } = ctx.res;
      return { support, statusCode };
    } else 
      return { support: true, statusCode: 200 };
  }

  state = { showLoader: true }
  
  componentDidMount() {
    if(this.props.support && this.props.statusCode === 200) {
      require('intersection-observer');
      
      mobileHeight();
      this.createPageTransitionDOM();
    }
  }

  createPageTransitionDOM() {
    const pageTransitionWrapper = document.createElement('div');
    const pageTransition = document.createElement('div');

    pageTransitionWrapper.classList.add('page_transition_wrapper');
    pageTransition.classList.add('page_transition');
    
    pageTransitionWrapper.appendChild(pageTransition);
    document.body.appendChild(pageTransitionWrapper);
  }

  removeLoader = () => {
    // REMOVE LOADER
    this.setState({ showLoader: false });
  }

  render() {
    if(!this.props.support)
      return <Error message='Dieser Browser wird momentant nicht unterstützt.' type={2} />;
    else if(this.props.statusCode === 404)
      return <Error message='Die Seite konnte nicht gefunden werden.' />;
    else {
      const { Component, pageProps } = this.props;
      return (
        <RouterProvider>
          <WebPProvider>
            <DeviceProvider>
              <Container>
                {this.state.showLoader
                  ? <Loader removeMe={this.removeLoader} />
                  : null}
                <Component {...pageProps} loader={this.state.showLoader} />
              </Container>   
            </DeviceProvider> 
          </WebPProvider>
        </RouterProvider>
      );
    } 
  }
}