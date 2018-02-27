import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import { colour, font, space, icon } from '../common/theme'
import { media } from '../common/mediaQuery'

import SiteNav from '../common/siteNav'
import HeroLogo from '../common/heroLogo'
import FeatureButton from '../common/featureButton'

const HomeGrid = styled.main`
  display: grid;
  grid-template-rows: ${space.header} 50vh auto auto auto 200px auto 200px auto 200px 1fr auto 100px;
  grid-template-columns: 100%;
  color: ${colour.white};
  background-color: ${colour.darkbg};
`

const CallToAction = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  min-height: 150px;
`

const Features = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: ${space.m} ${space.xl} ${space.l} ${space.xl};
  ${media.phone`margin: ${space.m};`}
`

const Feature = styled.div`

  border-right: 1px solid ${colour.lightbg};
  ${media.tablet`border-right: none;`};
  ${media.tablet`border-bottom: 1px solid ${colour.lightbg}; padding-bottom: ${space.l};`};
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-height: 200px;
  margin-top: ${space.l};

  :first-child {
    .octicon {
      color: ${colour.warrior[1]};
    }
    li .octicon {
      color: ${colour.white};
    }
  }

  :last-child {
    border: none;

    .octicon {
      color: ${colour.warrior[4]};
    }
    li .octicon {
      color: ${colour.white};
    }
  }

  .octicon {
    font-size: ${font.xlarge};
    color: ${colour.warrior[2]};
  }

  h3 {
    margin: ${space.m};
    ${media.tablet`margin: ${space.s}`};
    font-size: ${font.large};
    font-weight: 300;
    color: ${colour.lightgrey};
  }

  p {
    color: ${colour.blue};
    font-family: ${font.code};
    line-height: 1.5em;
    font-size: ${font.base};
    padding: ${space.m};
    text-align: center;
    margin-left: ${space.xl};
    margin-right: ${space.xl};

    ${media.desktop`margin-left: ${space.s};`};
    ${media.desktop`margin-right: ${space.s};`};

    min-height: 80px;
  }

  :hover {
    cursor: pointer;
    .guidance {
      opacity: 1;
      transition: 0.5s;
    }
  }

  ul {
    margin: ${space.m};

    li {
      margin: ${space.s};
      font-weight: 300;
      line-height: ${font.large};

      .octicon {
        font-size: ${font.base};
        margin-right: ${space.m};
        color: ${colour.white};
      }
    }
  }
`

const Guidance = styled.div.attrs({
  className: 'guidance'
})`
  opacity: 0;
  ${media.tablet`opacity: 1;`}
  transition: 0.5s;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: ${space.l};
  ${media.phone`margin: ${space.m};`}

  .octicon.octicon-hubot {
    color: ${colour.white};
    font-size: ${font.xlarge};
    padding: ${space.m};
  }
`
const SpeechArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;

  border-right: 10px solid  ${colour.defaultbg};
`

const SpeechBubble = styled.div`
  border-radius: 10px;
  background-color: ${colour.defaultbg};
  min-height: 200px;
  margin-right: ${space.l};
  padding: ${space.m};
  line-height: 1.5em;
  text-align: center;
  color: ${colour.white};
  font-family: ${font.code};
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const PrimaryButton = FeatureButton.extend`
  background: ${colour.white};
  color: ${colour.darkbg};
  transition: 0.2s;
  font-weight: bold;
`

const Prospect = styled.section.attrs({
  id: props => props.id
})`
  min-height: 200px;
  background-color: ${colour.lightbg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${font.large};

  h2 {
    margin: ${space.l};
    font-weight: 300;
  }

  .octicon {
    font-size: ${icon.xlarge};
    color: ${colour.blue};
    margin: ${space.m};
  }
`

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${colour.lightbg};
  font-weight: 200;
  font-size: ${font.base};
  font-family: ${font.code};

  a {
    color: ${colour.blue};
    display: inline-block;
    padding: 0 ${space.m};
  }
`

const Roadmap = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: ${space.l};
`

const RoadmapItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  grid-template-rows: 80px 1fr;
  min-height: 200px;
  font-weight: 300;

`

const Timeline = styled.div`
  background-color: ${colour.white};
  border-radius: 4px;
  width: 5px;
  height: 100%;
  grid-column-start: 2;
  margin-left: calc(50% - 4px);
`

const IconWrapper = styled.div`
  grid-column-start: 2;
  grid-row-start: 1;
  justify-self: center;
  align-self: center;

  .octicon {
    ${props => props.colour && `color: ${props.colour};`}
    font-size: ${font.large};
    text-align: center;
  }
`

const RoadmapText = styled.div`
  ${props => props.left && `justify-self: end; text-align: right; padding-left: ${space.m};`}
  ${props => props.right && `justify-self: start; padding-right: ${space.m};`}
  grid-row: 1 / 3;
  font-size: ${font.base};

  line-height: ${font.large};

  max-width: 350px;
  align-self: center;
  color: ${colour.lightgrey};
`

const TimelineDivider = styled.div`
  width: 80%;
  margin: ${space.l} 10% ${space.l} 10%;
  border-bottom: 2px solid ${colour.grey};
  font-size: ${font.large};
  padding: ${space.m};
  text-align: center;

  h3 {
    text-align: center;
    font-weight: 300;
    line-height: ${font.xlarge};
  }
`

const Tagline = styled.section`

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  background-color: ${colour.defaultbg};
  min-height: 300px;

  h2 {
    width: 50%;
    ${media.phone`width: 60%;`}
    font-weight: 300;
    line-height: ${font.xlarge};
    color: ${colour.blue};
    font-size: ${font.large};
    ${media.phone`font-size: ${font.base};`}
    margin: ${space.m};
  }
`

const Home = () => (
  <HomeGrid>
    <SiteNav />
    <HeroLogo />
    <CallToAction>
      <PrimaryButton href='/app/src'>
        Play Now
      </PrimaryButton>
      <FeatureButton href='/learn'>
        Learn more
      </FeatureButton>
    </CallToAction>
    <Tagline>
      <h2>
        Corewar is a coding game where you write and battle programs against other players.
        Write your warriors and parse them online with our redcode parser, load them into our core
        simulator to fine tune your strategy and then enter our live online hills to test your skill.
      </h2>
    </Tagline>
    <Features>
      <Feature>
        <Octicon name='rocket' />
        <h3>Play corewar</h3>
        <p>Enjoy a slice of coding history by playing and learning the classic game corewar</p>
        <PrimaryButton href='/app/src'>Play Now</PrimaryButton>
      </Feature>
      <Feature>
        <Octicon name='device-mobile' />
        <h3>On any device</h3>
        <p>Our web platform gives the ability to play where and when you want on any system with no installs</p>
        <FeatureButton href='#who-are-you'>Learn more</FeatureButton>
      </Feature>
      <Feature>
      <Octicon name='megaphone' />
        <h3>In new ways</h3>
        <p>We have a fully featured roadmap bringing new ideas to the well established corewar player</p>
        <FeatureButton href='#roadmap'>View Roadmap</FeatureButton>
      </Feature>
    </Features>
    <Prospect id={`who-are-you`}>
      <h2>What best describes you?</h2>
      <Octicon name='person' />
    </Prospect>
    <Features>
      <Feature>
        <Octicon name='mortar-board' />
        <h3>Experienced player</h3>
        <p>I’ve played corewar before and understand the instructions and concepts</p>
        <PrimaryButton href='/app/src'>Play Now</PrimaryButton>
        <Guidance>
          <Octicon name='hubot' />
          <SpeechArrow />
          <SpeechBubble>
            You should head over to the app and follow the tutorial to explore the features
          </SpeechBubble>
        </Guidance>
      </Feature>
      <Feature>
        <Octicon name='law' />
        <h3>New to the game</h3>
        <p>I’ve done some coding before but never played corewar</p>
        <FeatureButton>Learn more</FeatureButton>
        <Guidance>
          <Octicon name='hubot' />
          <SpeechArrow />
          <SpeechBubble>
            You should take a look at the app and run through the tutorial, then follow some of our
            guides to get a better idea of what corewar is all about
          </SpeechBubble>
        </Guidance>
      </Feature>
    </Features>
    <Prospect id={`features`}>
      <h2>Features</h2>
      <Octicon name='tasklist' />
    </Prospect>
    <Features>
      <Feature>
        <Octicon name='terminal' />
        <h3>Redcode parser</h3>
        <ul>
          <li><Octicon name='check' />Parses redcode to '88 and '94 standards</li>
          <li><Octicon name='check' />Console output for parser errors</li>
          <li><Octicon name='check' />File manager to load example warriors</li>
        </ul>
      </Feature>
      <Feature>
        <Octicon name='bug' />
        <h3>Core simulator</h3>
        <ul>
          <li><Octicon name='check' />Core visualation</li>
          <li><Octicon name='check' />Unique warrior icons</li>
          <li><Octicon name='check' />Basic core debugger</li>
        </ul>
      </Feature>
      <Feature>
      <Octicon name='globe' />
        <h3>Web based</h3>
        <ul>
          <li><Octicon name='check' />Multi device</li>
          <li><Octicon name='check' />Multi platform</li>
          <li><Octicon name='check' />No install</li>
        </ul>
      </Feature>
    </Features>
    <Prospect id={`roadmap`}>
      <h2>The roadmap</h2>
      <Octicon name='milestone' />
    </Prospect>
    <Roadmap>
      <RoadmapItem>
        <RoadmapText left>The idea to develop corewar as a modern web app is concieved</RoadmapText>
        <IconWrapper colour={colour.warrior[2]}>
          <Octicon name='light-bulb' />
        </IconWrapper>
        <RoadmapText right>November 2017</RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>March 2018</RoadmapText>
        <IconWrapper colour={colour.blue}>
          <Octicon name='calendar' />
        </IconWrapper>
        <RoadmapText right>Public beta, allowing players to experience the initial feature set</RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>
          We are now actively listening for user feedback whilst we build
          the next set of features but here’s what we had in mind
        </RoadmapText>
        <IconWrapper colour={colour.warrior[3]}>
          <Octicon name='megaphone' />
        </IconWrapper>
        <RoadmapText right>Today</RoadmapText>
        <Timeline />
      </RoadmapItem>

      <TimelineDivider>
        <h3>Future development</h3>
      </TimelineDivider>

      <RoadmapItem>
        <RoadmapText left>
          Log in &amp; Warrior Management
        </RoadmapText>
        <IconWrapper colour={colour.warrior[2]}>
          <Octicon name='git-commit' />
        </IconWrapper>
        <RoadmapText right>
          Create an account and build up your warriors,
          including file versioning and statistics over time
        </RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>
          We will host and run hills for all skill levels. Which will allow you to submit you warriors online
          and see the results in realtime
        </RoadmapText>
        <IconWrapper colour={colour.coral}>
          <Octicon name='git-commit' />
        </IconWrapper>
        <RoadmapText right>
          Live online hills
        </RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>
          Private hills
        </RoadmapText>
        <IconWrapper colour={colour.warrior[4]}>
          <Octicon name='git-commit' />
        </IconWrapper>
        <RoadmapText right>
          Want to play with just your friends? We will add invite only hills so you can chose the rules
          and the players
        </RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>
          Feel like you’ve done all corewar can offer? We will develop specific challenges and situations to challenge
          the most experienced players
        </RoadmapText>
        <IconWrapper colour={colour.blue}>
          <Octicon name='git-commit' />
        </IconWrapper>
        <RoadmapText right>
          Corewar challenges
        </RoadmapText>
        <Timeline />
      </RoadmapItem>

    </Roadmap>
    <Prospect>
      <h2>Check out the app</h2>
      <Octicon name='beaker' />
      <PrimaryButton href='/app/src'>
        Play Now
      </PrimaryButton>
    </Prospect>
    <Footer>
      &copy; 2018 <a href='http://www.corewar.io'>www.corewar.io</a> - crafted with love by <a href='https://github.com/gareththegeek'>@gareththegeek</a> &amp; <a href='https://github.com/dougajmcdonald/'>@dougajmcdonald</a>
    </Footer>
  </HomeGrid>
)

export default Home
