import Head from 'next/head';
import style from '../styles/global/common';

// WEIRD BUG IF STYLE IS NESTED INSIDE OF HEAD

const HTMLHead = ({ title }) => (
  <>
    <style jsx global>{style}</style>
    <Head>
      <title>{`20° ${title}`}</title>
    </Head>
  </>
);

HTMLHead.defaultProps = {
  title: ''
}

export default HTMLHead;