import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledJobsSection = styled.section`
  max-width: 1100px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  .tab-company {
    display: block;
  }

  .tab-duration {
    display: block;
    margin-top: 2px;
    font-size: var(--fz-xxs);
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    flex-direction: row;
    flex-shrink: 0;
    width: auto;
    min-width: auto;
    height: 42px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid
      ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--lightest-navy)')};
    text-align: center;

    .tab-duration {
      display: none;
    }
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 2px dashed var(--green);
    outline-offset: 3px;
  }

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  .job-header {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 25px;

    @media (max-width: 600px) {
      gap: 14px;
    }
  }

  .company-logo {
    flex-shrink: 0;
    width: 72px;
    height: 72px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    box-shadow: 0 6px 18px rgba(2, 12, 27, 0.6);

    img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
    }

    &.no-frame {
      background-color: transparent;
      padding: 0;
      img {
        width: 100%;
        height: 100%;
        max-width: none;
        max-height: none;
        object-fit: cover;
      }
    }

    &.tight {
      padding: 2px;
    }

    @media (max-width: 600px) {
      width: 56px;
      height: 56px;
      padding: 6px;

      &.no-frame {
        padding: 0;
      }
    }
  }

  .job-meta {
    min-width: 0;
  }

  h3 {
    margin: 0 0 4px 0;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--green);
    }
  }

  .range {
    margin: 0;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .range-duration {
    display: block;
    margin-top: 2px;
    opacity: 0.7;
    @media (min-width: 601px) {
      display: none;
    }
  }
`;

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const parseRangePart = s => {
  if (!s) return null;
  if (s.trim() === 'Present') {
    const now = new Date();
    return { month: now.getMonth(), year: now.getFullYear(), isPresent: true };
  }
  const m = s.trim().match(/^(?:([A-Za-z]+)\s+)?(\d{4})$/);
  if (!m) return null;
  const monthIdx = m[1] ? MONTHS.indexOf(m[1]) : 0;
  return { month: monthIdx >= 0 ? monthIdx : 0, year: parseInt(m[2], 10) };
};

const computeDuration = range => {
  if (!range || typeof range !== 'string') return null;
  const parts = range.split(/\s*[-–]\s*/);
  if (parts.length !== 2) return null;
  const start = parseRangePart(parts[0]);
  const end = parseRangePart(parts[1]);
  if (!start || !end) return null;
  let totalMonths = (end.year - start.year) * 12 + (end.month - start.month) + 1;
  if (totalMonths < 1) totalMonths = 1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const yLabel = years === 1 ? 'year' : 'years';
  const mLabel = months === 1 ? 'month' : 'months';
  if (years === 0) return `${months} ${mLabel}`;
  if (months === 0) return `${years} ${yLabel}`;
  return `${years} ${yLabel} and ${months} ${mLabel}`;
};

const COMPANY_LOGOS = {
  Bitdefender: '/bd-logo.webp',
  'Elettrosud Group': '/es-logo.png',
  'Liceul Teoretic Pâncota': '/logo-ltp.png',
};

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = [...data.jobs.edges].sort((a, b) => {
    const aRange = a.node.frontmatter.range || '';
    const bRange = b.node.frontmatter.range || '';
    const aCurrent = aRange.includes('Present');
    const bCurrent = bRange.includes('Present');
    // Current jobs first
    if (aCurrent && !bCurrent) return -1;
    if (!aCurrent && bCurrent) return 1;
    // Within past: keep date DESC (already sorted by GraphQL)
    return 0;
  });

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">Where I’ve Worked</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { company, range } = node.frontmatter;
              const isCurrent = typeof range === 'string' && range.includes('Present');
              const duration = computeDuration(range);
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  isCurrent={isCurrent}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span className="tab-company">{company}</span>
                  {duration && <span className="tab-duration">{duration}</span>}
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { title, url, company, range } = frontmatter;

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                    <div className="job-header">
                      {COMPANY_LOGOS[company] && (
                        <div
                          className={`company-logo ${
                            company === 'Bitdefender'
                              ? 'no-frame'
                              : company === 'Liceul Teoretic Pâncota'
                              ? 'tight'
                              : ''
                          }`.trim()}>
                          <img src={COMPANY_LOGOS[company]} alt={company} />
                        </div>
                      )}
                      <div className="job-meta">
                        <h3>
                          <span>{title}</span>
                          <span className="company">
                            &nbsp;@&nbsp;
                            <a href={url} className="inline-link">
                              {company}
                            </a>
                          </span>
                        </h3>
                        <p className="range">
                          {range}
                          {computeDuration(range) && (
                            <span className="range-duration">{computeDuration(range)}</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: html }} />
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
