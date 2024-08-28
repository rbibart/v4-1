import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
import { usePrefersReducedMotion } from '@hooks';

const StyledResumeContainer = styled.div`
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
`;

const Timeline = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;

  &::before {
    content: '';
    position: absolute;
    width: 6px;
    background-color: var(--lightest-slate);
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
  }
`;

const TimelineItem = styled.div`
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;

  &:nth-child(odd) {
    left: 0;
  }

  &:nth-child(even) {
    left: 50%;
  }

  &::before {
    content: ' ';
    position: absolute;
    width: 25px;
    height: 25px;
    right: -17px;
    background-color: var(--lightest-slate);
    border: 4px solid var(--navy);
    top: 15px;
    border-radius: 50%;
    z-index: 1;
  }

  &:nth-child(even)::before {
    left: -16px;
  }

  .content {
    padding: 20px;
    background-color: var(--light-navy);
    position: relative;
    border-radius: var(--border-radius);
  }

  h3 {
    margin-top: 0;
    font-size: var(--fz-lg);
  }

  p {
    margin-bottom: 0;
    font-size: var(--fz-md);
  }

  time {
    font-size: var(--fz-sm);
    color: var(--slate);
  }
`;

const ResumePage = ({ location }) => {
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
      <Helmet title="Resume - Razvan Bibart" />

      <main>
        <header ref={revealTitle}>
          <h1 className="big-heading">Resume</h1>
          <p className="subtitle">Razvan Bibart's professional experience and skills</p>
        </header>

        <StyledResumeContainer>
          <section ref={el => (revealSections.current[0] = el)} className="section">
            <h2>Experience Timeline</h2>
            <Timeline>
              <TimelineItem>
                <div className="content">
                  <h3>Information Security Engineer</h3>
                  <p>Bitdefender</p>
                  <time>January 2021 - Present</time>
                  <p>Perform vulnerability assessment, penetration testing, and security monitoring.</p>
                </div>
              </TimelineItem>

              <TimelineItem>
                <div className="content">
                  <h3>System Administrator</h3>
                  <p>Bitdefender</p>
                  <time>September 2019 - January 2021</time>
                  <p>Provided system administration services for Windows and Linux infrastructure.</p>
                </div>
              </TimelineItem>

              <TimelineItem>
                <div className="content">
                  <h3>Information Technology System Engineer</h3>
                  <p>Elettrosud Group</p>
                  <time>2015 - 2019</time>
                  <p>Maintained systems, software, hardware, and networks, providing support and training.</p>
                </div>
              </TimelineItem>

              <TimelineItem>
                <div className="content">
                  <h3>IT Teacher</h3>
                  <p>Liceul Teoretic Pancota</p>
                  <time>2009 - 2014</time>
                  <p>Taught informatics courses.</p>
                </div>
              </TimelineItem>
            </Timeline>
          </section>

          <section ref={el => (revealSections.current[1] = el)} className="section">
            <h2>Education</h2>
            <h3>University „Aurel Vlaicu” Arad</h3>
            <p className="title">Master's degree, Informatics (2012 - 2014)</p>
            <p className="title">Bachelor's degree, Informatics (2009 - 2012)</p>
          </section>

          <section ref={el => (revealSections.current[2] = el)} className="section">
            <h2>Skills</h2>
            <ul>
              <li>Experience managing AD, DNS, WSUS, Microsoft 365, Exchange, Antivirus Management (Gravity Zone), Azure, AWS, GCP, Splunk, Nessus, Intune, Paloalto.</li>
              <li>Scripting knowledge: Bash, PowerShell, Python.</li>
              <li>Virtualization technologies: Hyper V, VMware, Proxmox.</li>
              <li>Web Applications, Cybersecurity, SQL, Jira administration, C#, WordPress.</li>
            </ul>
          </section>
        </StyledResumeContainer>
      </main>
    </Layout>
  );
};

ResumePage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ResumePage;
