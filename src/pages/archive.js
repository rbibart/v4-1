import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
import { usePrefersReducedMotion } from '@hooks';

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
      <Helmet title="ZEN STORY - Story - Razvan Bibart" />

      <main>
        <header ref={revealTitle}>
          <h1 className="big-heading">Zen Story</h1>
          <p className="subtitle">A tale of cyber resilience and expertise</p>
        </header>

        <StyledStoryContainer>
          <section ref={el => (revealSections.current[0] = el)} className="section">
            <h2>The Attack on VortexTech Enterprises</h2>
            <div className="story-content">
              <p>
                On an otherwise ordinary morning in the vibrant city of Cyberia, a global hub for technological innovation and digital advancement, VortexTech Enterprises, one of the most prestigious technology companies, was struck by an unusually severe cyber attack. Cyberia was known for its futuristic urban landscape, with glass skyscrapers and a public transport network that seemed to float between buildings, but also for its clusters of cutting-edge technology companies fueling the world’s digital progress.
              </p>
              <p>
                VortexTech Enterprises, located in one of the city’s most modern neighborhoods, was renowned for its innovations in software and hardware, being a leader in artificial intelligence and cybersecurity. Its offices were equipped with the latest technologies and offered a dynamic and creative working atmosphere. However, one morning, what seemed like an ordinary day for the VortexTech employees turned into a cyber nightmare.
              </p>
              <p>
                Ransomware began encrypting the company’s essential data, and the breach in the network threatened to cause digital chaos throughout VortexTech's system. The management, aware of the gravity of the situation and the potential impact on the entire digital ecosystem of the city, decided that a specialist with exceptional expertise and remarkable crisis resolution ability needed to intervene. Thus, they called Zen, a cybersecurity engineer known for his efficiency and reputation as a savior in the face of cyber threats.
              </p>
              <p>
                Zen arrived at the office wearing a shirt that read "No hacker gets through!" and carrying a backpack full of advanced equipment that could rival the most sophisticated gadgets from a sci-fi film. The atmosphere in the office was electrifying and panicked, but Zen maintained a professional calm, knowing that every minute counted.
              </p>
              <p>
                The first thing he did was examine the network traffic and logs using state-of-the-art tools. With the help of these sophisticated tools, Zen quickly identified that the attackers were exploiting a vulnerability in the DNS system, using a complex technique that seemed to be inspired by a futuristic scenario. He reconfigured the firewalls to block suspicious traffic and strengthened network protection, creating a security barrier reminiscent of a “virtual shield,” providing an extra layer of protection.
              </p>
              <p>
                Next, Zen updated the IDS/IPS system rules, ensuring they now had an “attack radar” capable of detecting and responding rapidly to any unusual activity. He implemented network segmentation solutions to isolate compromised parts and prevent the spread of the ransomware, similar to how an emergency crew would isolate damaged parts of a spacecraft.
              </p>
              <p>
                Simultaneously, Zen enhanced authentication measures, introducing security protocols that would impress any security specialist. He reviewed access policies and created a multi-factor authentication system that significantly reinforced the company’s access barriers, making it nearly impossible for attackers to gain further entry.
              </p>
              <p>
                Throughout the crisis, Zen communicated effectively with the IT teams and management, using a clear and concise update system that kept team morale high. “We’re handling this like a crew repairing a ship in the midst of a stellar storm,” he said, bringing a smile to his colleagues’ faces and refreshing the tense atmosphere.
              </p>
              <p>
                Thanks to his critical thinking skills and deep knowledge of threats, Zen managed to limit the impact of the attack and fully restore VortexTech’s systems. The company avoided significant losses and strengthened its security measures, turning the crisis into an opportunity to bolster its systems. Zen demonstrated that, regardless of the complexity of challenges, through deep knowledge and unwavering dedication, any situation can be navigated and successfully overcome.
              </p>
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
