import App, { Container } from 'next/app';

// PROVIDER
import { WebPProvider } from '../frontend/components/Context/WebP';
import { RouterProvider } from '../frontend/components/Context/Router';

import Loader from '../frontend/components/Loader/PageLoader';

import '../frontend/gsap/imports';

export default class MyApp extends App {
  state = { showLoader: true };

  componentDidMount() {
    // POLYFILL FOR INTERSECTION - OBSERVER
    require('intersection-observer');
    
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
    const { Component, pageProps } = this.props;
    return (
      <RouterProvider>
        <WebPProvider>
          <Container>
            {this.state.showLoader 
            ? <Loader 
                removeMe={this.removeLoader} 
              />
            : null
            }
              <Component {...pageProps} loader={this.state.showLoader} />
          </Container>    
       </WebPProvider>
      </RouterProvider>
    );
  }
}
