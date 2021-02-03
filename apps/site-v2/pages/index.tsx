import {
  BodyText,
  Content,
  NextBackNavigation,
  PageHeaderNavigation,
  Section,
} from "components/common";

export const Intro = () => {
  return (
    <Content>
      <Section maxWidth="small">
        <PageHeaderNavigation />
        <BodyText>
          Hello. My name is Jamie. I'm a freelance Creative Developer & Software
          Engineer based in London, UK. I enjoy making things with code and have
          18+ years experience using web technologies to build apps,
          installations & websites.
        </BodyText>
        <BodyText>
          I'm lucky to have contracted as a lead developer on projects such as:
          an iOS/Android games portal app for{" "}
          <a href="/recent-work/pbs-gamesapp">
            PBS Kids with 10+ million downloads
          </a>
          , building 25+ touch screen installations for the{" "}
          <a href="/recent-work/national-museum-of-qatar">
            {" "}
            National Museum of Qatar
          </a>
          , and developing prototyping & visualisation solutions within{" "}
          <a href="/recent-work/lbg-systems-thinking">
            Systems Thinking at Lloyds Banking Group.
          </a>
        </BodyText>
        <BodyText>
          Please have a look at some <a href="/recent-work">Recent Work</a>,
          check out the typical <a href="/tech-stack">Tech Stack</a> I currently
          use, or here are some <a href="/interests">Interests</a> that
          generally make me tick otherwise.
        </BodyText>
        <BodyText>
          Cheers! <br />
          <br />
          <a href="/get-in-touch">Get in Touch</a>
        </BodyText>
      </Section>
      <Section>
        <NextBackNavigation />
      </Section>
    </Content>
  );
};

export default Intro;
