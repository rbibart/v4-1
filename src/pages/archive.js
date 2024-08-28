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

  time {
    font-size: var(--fz-sm);
    color: var(--slate);
    display: block;
    margin-bottom: 10px;
  }

  h3 {
    margin-top: 0;
    font-size: var(--fz-lg);
  }

  p {
    margin-bottom: 0;
    font-size: var(--fz-md);
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
            <h2>Personal Information</h2>
            <p><span className="title">Name:</span> BIBARȚ RĂZVAN IOAN</p>
            <p><span className="title">Location:</span> Arad</p>
            <p><span className="title">Website:</span> <a href="https://razvanbibart.com">razvanbibart.com</a></p>
            <p><span className="title">Email:</span> rbibart@razvanbibart.com</p>
          </section>

          <section ref={el => (revealSections.current[1] = el)} className="section">
            <h2>Experience Timeline</h2>
            <Timeline>
              <TimelineItem>
                <div className="content">
                  <h3>Information Security Engineer</h3>
                  <p>Bitdefender</p>
                  <time>January 2021 - Present</time>
                  <p>• Perform vulnerability assessment and penetration testing on network, systems, and applications.</p>
                  <p>• Automate penetration tests and other security checks on network, systems, and applications.</p>
                  <p>• Monitor and analyze security events from multiple sources including SIEM tools, IDS, firewall logs, and system logs.</p>
                  <p>• Collaborate with technical teams for issue resolution and mitigation.</p>
                  <p>• Develop automation and information security scripts.</p>
                  <p>• Document actions for audit, regulatory, and legal purposes.</p>
                  <p>• Administer Antivirus & Malware protection applications and write security assessment reports.</p>
                </div>
              </TimelineItem>

              <TimelineItem>
                <div className="content">
                  <h3>System Administrator</h3>
                  <p>Bitdefender</p>
                  <time>September 2019 - January 2021</time>
                  <p>• Provided system administration services for Windows and Linux infrastructure and development systems.</p>
                  <p>• Ensured systems were maintained, updated, and properly configured.</p>
                  <p>• Troubleshot hardware, software, and networking issues.</p>
                  <p>• Performed specific failure recovery procedures and provided technical support for internal users.</p>
                  <p>• Updated operational procedures and provided weekly status reports.</p>
                </div>
              </TimelineItem>

              <TimelineItem>
                <div className="content">
                  <h3>Information Technology System Engineer</h3>
                  <p>Elettrosud Group</p>
                  <time>2015 - 2019</time>
                  <p>• Managed installation, configuration, and maintenance of systems, software, hardware, and networks.</p>
                  <p>• Responsible for Gamma Enterprise and provided training for ERP systems.</p>
                  <p>• Automated Infrastructure and Platform administration tasks using scripts and tools.</p>
                  <p>• Provided training and support to end-users on computer operations and policies.</p>
                  <p>• Designed, installed, and configured servers, network devices, and firewalls.</p>
                </div>
              </TimelineItem>

              <TimelineItem>
                <div className="content">
                  <h3>IT Teacher</h3>
                  <p>Liceul Teoretic Pancota</p>
                  <time>2009 - 2014</time>
                  <p>• Taught informatics courses.</p>
                </div>
              </TimelineItem>
            </Timeline>
          </section>

          <section ref={el => (revealSections.current[2] = el)} className="section">
            <h2>Education</h2>
            <h3>University „Aurel Vlaicu” Arad</h3>
            <p className="title">Master's degree, Informatics (2012 - 2014)</p>
            <p className="title">Bachelor's degree, Informatics (2009 - 2012)</p>
          </section>

          <section ref={el => (revealSections.current[3] = el)} className="section">
            <h2>Skills</h2>
            <div>
              <h3>Technical Skills</h3>
              <ul>
                <li>Managing AD, DNS, WSUS, Microsoft 365, Exchange</li>
                <li>Antivirus Management (Gravity Zone), Azure, AWS, GCP</li>
                <li>Splunk, Nessus, Intune, Paloalto</li>
              </ul>
            </div>
            <div>
              <h3>Scripting & Automation</h3>
              <ul>
                <li>Bash, PowerShell, Python</li>
                <li>Automation of Infrastructure and Platform tasks</li>
              </ul>
            </div>
            <div>
              <h3>Virtualization & Cloud Technologies</h3>
              <ul>
                <li>Hyper-V, VMware, Proxmox</li>
                <li>Web Applications</li>
              </ul>
            </div>
            <div>
              <h3>Additional Skills</h3>
              <ul>
                <li>Cybersecurity</li>
                <li>SQL</li>
                <li>Jira administration</li>
                <li>C#</li>
                <li>WordPress</li>
              </ul>
            </div>
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
