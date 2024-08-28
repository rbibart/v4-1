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

  ul {
    margin: 0 0 30px 20px;
    list-style-type: square;

    li {
      margin-bottom: 10px;
      font-size: var(--fz-lg);
    }
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
            <h2>Experience</h2>

            <h3>Bitdefender - Information Security Engineer</h3>
            <p className="title">January 2021 - Present</p>
            <ul>
              <li>Perform vulnerability assessment and conduct penetration testing on network, systems, and applications.</li>
              <li>Involved in vulnerability assessment tasks; creating vulnerability assessment reports, reviewing scan reports (Nessus), and creating tickets for fixing vulnerabilities.</li>
              <li>Automate penetration tests and other security checks on network, systems, and applications.</li>
              <li>Monitor and analyze security events from multiple sources including SIEM tools, network and host-based IDS, firewall logs, and system logs.</li>
              <li>Collaborate with Operations Engineers and technical teams for issue resolution and mitigation.</li>
              <li>Develop automation and information security scripts.</li>
              <li>Document actions taken for audit, regulatory, and legal purposes.</li>
              <li>Administer Antivirus & Malware protection applications.</li>
              <li>Write security assessment reports and contribute to ongoing projects.</li>
            </ul>

            <h3>Bitdefender – System Administrator</h3>
            <p className="title">September 2019 - January 2021</p>
            <ul>
              <li>Provided system administration services for Windows and Linux infrastructure and development systems.</li>
              <li>Ensured systems were kept in the required configuration profile, including maintenance and software updates.</li>
              <li>Troubleshooted hardware, software, and networking issues on Windows and Linux systems.</li>
              <li>Performed failure recovery procedures for managed systems and applications.</li>
              <li>Provided technical support for internal users and updated operational procedures.</li>
            </ul>

            <h3>Elettrosud Group – Information Technology System Engineer</h3>
            <p className="title">2015 - 2019</p>
            <ul>
              <li>Installed, configured, maintained, and ensured reliable operation of systems, software, hardware, and networks.</li>
              <li>Responsible for Gamma Enterprise and provided training for ERP systems.</li>
              <li>Automated common Infrastructure and Platform administration tasks using scripts and tools.</li>
              <li>Provided training, guidance, and support to end-users on computer operations.</li>
              <li>Designed, installed, and configured servers, network devices, and firewalls.</li>
            </ul>

            <h3>Liceul Teoretic Pancota – IT Teacher</h3>
            <p className="title">2009 - 2014</p>
            <ul>
              <li>Taught informatics courses.</li>
            </ul>
          </section>

          <section ref={el => (revealSections.current[2] = el)} className="section">
            <h2>Education</h2>
            <h3>University „Aurel Vlaicu” Arad</h3>
            <p className="title">Master's degree, Informatics (2012 - 2014)</p>
            <p className="title">Bachelor's degree, Informatics (2009 - 2012)</p>
          </section>

          <section ref={el => (revealSections.current[3] = el)} className="section">
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
