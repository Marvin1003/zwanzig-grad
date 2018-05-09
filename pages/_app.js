import App, { Container } from 'next/app';

import Provider from '../frontend/components/Context';

import registerSW from '../frontend/functions/registerSW';

export default class MyApp extends App {

  componentDidMount() {
    registerSW();
    
    const pageTransitionWrapper = document.createElement('div');
    const pageTransition = document.createElement('div');

    pageTransitionWrapper.classList.add('page_transition_wrapper');
    pageTransition.classList.add('page_transition');
    
    pageTransitionWrapper.appendChild(pageTransition);
    document.body.appendChild(pageTransitionWrapper);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider>
        <Container>
          <Component {...pageProps} />
        </Container>    
      </Provider>
    );
  }
}
