import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Layout } from '@components';

const ArchivePage = ({ location }) => {
  return (
    <Layout location={location}>
      <Helmet title="Cybersecurity News" />
      <main>
        <header>
          <h1 className="big-heading">Cybersecurity News</h1>
          <p className="subtitle">Recent news in the cybersecurity world</p>
        </header>
        <div>
          <iframe
            src="https://www.rss-to-html.com/rss-feed-url"
            style={{ width: '100%', height: '600px', border: 'none' }}
            title="RSS Feed"
            frameBorder="0"
          ></iframe>
        </div>
      </main>
    </Layout>
  );
};

ArchivePage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ArchivePage;
