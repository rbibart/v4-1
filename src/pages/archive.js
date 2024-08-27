import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
import { usePrefersReducedMotion } from '@hooks';

const StyledTableContainer = styled.div`
  margin: 100px -20px;

  @media (max-width: 768px) {
    margin: 50px -10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    .hide-on-mobile {
      @media (max-width: 768px) {
        display: none;
      }
    }

    tbody tr {
      &:hover,
      &:focus {
        background-color: var(--light-navy);
      }
    }

    th,
    td {
      padding: 10px;
      text-align: left;

      &:first-child {
        padding-left: 20px;

        @media (max-width: 768px) {
          padding-left: 10px;
        }
      }
      &:last-child {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    tr {
      cursor: default;

      td:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      td:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
    }

    td {
      &.date {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
          font-size: var(--fz-sm);
        }
      }

      &.title {
        padding-top: 15px;
        padding-right: 20px;
        color: var(--lightest-slate);
        font-size: var(--fz-xl);
        font-weight: 600;
        line-height: 1.25;
      }

      &.source {
        font-size: var(--fz-lg);
        white-space: nowrap;
      }

      &.links {
        min-width: 100px;

        div {
          display: flex;
          align-items: center;

          a {
            ${({ theme }) => theme.mixins.flexCenter};
            flex-shrink: 0;
          }

          a + a {
            margin-left: 10px;
          }
        }
      }
    }
  }
`;

const ArchivePage = ({ location }) => {
  const newsItems = [
    {
      date: '2024-08-22',
      title: 'Netgear Smart Switch Vulnerability Disclosed',
      source: 'The Hacker News',
      link: 'https://thehackernews.com/2024/08/netgear-smart-switch-vulnerability.html',
    },
    {
      date: '2024-08-20',
      title: 'Continuous Penetration Testing and DDoS Attack Surge',
      source: 'The Hacker News',
      link: 'https://thehackernews.com/2024/08/ddos-attacks-increase-by-46-in-first.html',
    },
    {
      date: '2024-08-18',
      title: 'Microsoft Patches Zero-Day Vulnerability Exploited by Lazarus Group',
      source: 'The Hacker News',
      link: 'https://thehackernews.com/2024/08/microsoft-patches-zero-day.html',
    },
  ];

  const revealTitle = useRef(null);
  const revealTable = useRef(null);
  const revealNewsItems = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealTable.current, srConfig(200, 0));
    revealNewsItems.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 10)));
  }, []);

  return (
    <Layout location={location}>
      <Helmet title="Cybersecurity News" />

      <main>
        <header ref={revealTitle}>
          <h1 className="big-heading">Cybersecurity News</h1>
          <p className="subtitle">Recent news in the cybersecurity world</p>
        </header>

        <StyledTableContainer ref={revealTable}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th className="hide-on-mobile">Source</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {newsItems.length > 0 &&
                newsItems.map((news, i) => (
                  <tr key={i} ref={el => (revealNewsItems.current[i] = el)}>
                    <td className="overline date">{news.date}</td>

                    <td className="title">{news.title}</td>

                    <td className="source hide-on-mobile">{news.source}</td>

                    <td className="links">
                      <div>
                        <a href={news.link} aria-label="External Link">
                          <Icon name="External" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </StyledTableContainer>
      </main>
    </Layout>
  );
};

ArchivePage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ArchivePage;
