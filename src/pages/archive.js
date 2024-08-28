import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
import { usePrefersReducedMotion } from '@hooks';
import videoSrc from '../videos/cyberia.mp4'; // Import the video

const StyledStoryContainer = styled.div`
  margin: 100px 0;
  line-height: 1.5;

  .section {
    margin-bottom: 50px;
  }

  h2 {
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    margin-bottom: 20px;
  }

  h3 {
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    margin-bottom: 15px;
  }

  p {
    font-size: var(--fz-lg);
    margin-bottom: 10px;
  }

  .title {
    font-weight: 600;
  }

  .story-content {
    font-size: var(--fz-md);
    line-height: 1.6;
  }

  .story-content h3 {
    font-size: var(--fz-lg);
    margin-top: 20px;
  }

  .story-content p {
    margin-bottom: 15px;
  }

  video {
    width: 100%;
    height: auto;
    margin-bottom: 50px;
  }
`;

const StoryPage = ({ location }) => {
  const revealTitle = useRef(null);
  const revealSections = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealSections.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 10)));
  }, [prefersReducedMotion]);

  return (
    <Layout location={location}>
      <Helmet title="ZEN STORY - Story" />

      <main>
        <header ref={revealTitle}>
          <h1 className="big-heading">Zen Story</h1>
          <p className="subtitle">A tale of cyber resilience and expertise</p>
        </header>

        <StyledStoryContainer>
          {/* Video Section */}
          <section>
            <video controls>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </section>

          <section ref={el => (revealSections.current[0] = el)} className="section">
            <h2>The Attack on VortexTech Enterprises</h2>
            <div className="story-content">
              {/* Story content goes here */}
            </div>
          </section>
        </StyledStoryContainer>
      </main>
    </Layout>
  );
};

StoryPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default StoryPage;
