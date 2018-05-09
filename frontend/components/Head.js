import Head from 'next/head';
import { Fragment } from 'react';
import style from '../styles/global/common';

export default ({ title }) => (
  <Fragment>
    <Head>
      <title>{`20° - ${title}`}</title>
    </Head>
    <style jsx global>{style}</style>
  </Fragment>
);