import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import { colour, font, space } from '../common/theme'
import { media } from '../common/mediaQuery'

const HomeGrid = styled.main`
  display: grid;
  grid-template-rows: ${space.header} 52vh 1fr 250px 1fr 250px 1fr 100px;
  color: ${colour.white};
`

const Header = styled.header`
  display: flex;
  flex-direction: row-reverse;
  margin-left: ${space.xl};
  margin-right: ${space.xl};

  nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  a {
    color: ${colour.white};
    display: inline-block;
    min-width: 100px;
    text-decoration: none;
    font-weight: 400;

  }
`

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${font.xxlarge};
  font-weight: 200;
  margin-top: ${space.l};

  span {
    font-weight: 300;
  }

  .octicon {
    font-size: ${font.xxlarge};
    color: ${colour.blue};
    margin: ${space.l};
    margin-bottom: ${space.s};
    padding-left: ${space.l};
  }

`

const Features = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  border-top: 1px solid ${colour.lightbg};
  margin-left: ${space.xl};
  margin-right: ${space.xl};
  margin-bottom: ${space.l};
  margin-top: ${space.m};
`

const Feature = styled.div`

  border-right: 1px solid ${colour.lightbg};
  ${media.tablet`border-right: none;`};
  ${media.tablet`border-bottom: 1px solid ${colour.lightbg};`};
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-height: 300px;
  margin-top: ${space.l};

  :last-child {
    border: none;

    .octicon {
      color: ${colour.warrior[4]};
    }

  }

  :first-child {
    .octicon {
      color: ${colour.warrior[1]};
    }
  }

  .octicon {
    font-size: ${font.xlarge};
    color: ${colour.warrior[2]};
  }

  h3 {
    margin: ${space.m};
    ${media.tablet`margin: ${space.s}`};
    font-size: ${font.xlarge};
    color: ${colour.lightgrey};
  }

  p {
    color: ${colour.blue};
    font-family: ${font.code};
    font-size: ${font.base};
    padding: ${space.m};
    text-align: center;
    margin-left: ${space.xl};
    margin-right: ${space.xl};

    ${media.desktop`margin-left: ${space.s};`};
    ${media.desktop`margin-right: ${space.s};`};

    min-height: 80px;

  }
`

const FeatureButton = styled.a`
  border: 2px solid ${colour.white};
  border-radius: 5px;
  margin: ${space.m};
  padding: ${space.m};
  background: none;
  display: inline-block;
  min-width: 200px;
  color: ${colour.white};
  font-weight: bold;
  text-align: center;
  text-decoration: none;

  :hover {
    color: ${colour.coral};
    background-color: ${colour.lightbg};
    cursor: pointer;
  }
`

const PrimaryButton = FeatureButton.extend`
  background: ${colour.white};
  color: ${colour.darkbg};
`

const Prospect = styled.section.attrs({
  id: props => props.id
})`
  height: 250px;
  background-color: ${colour.coral};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${font.xlarge};
  margin-bottom: ${space.xl};

  h2 {
    margin: ${space.l};
  }

  .octicon {
    font-size: ${font.xxlarge};
    color: ${colour.blue};
    margin: ${space.m};
    padding-left: ${space.l};
  }
`

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colour.lightbg};
`

const Roadmap = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const RoadmapItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  grid-template-rows: 80px 1fr;
  min-height: 200px;

`

const Timeline = styled.div`
  background-color: ${colour.white};
  border-radius: 5px;
  width: 5px;
  height: 100%;
  grid-column-start: 2;
  margin-left: calc(50% - 5px);
`

const IconWrapper = styled.div`
  grid-column-start: 2;
  grid-row-start: 1;
  justify-self: center;
  align-self: center;

  .octicon {
    ${props => props.colour && `color: ${props.colour};`}
    font-size: ${font.xlarge};
    text-align: center;
  }
`

const RoadmapText = styled.div`
  ${props => props.left && `justify-self: end; text-align: right;`}
  ${props => props.right && `justify-self: start;`}
  grid-row: 1 / 3;
  font-size: ${font.large};
  width: 350px;
  align-self: center;
  color: ${colour.lightgrey};
`

const Home = () => (
  <HomeGrid>
    <Header>
      <nav>
        <a href={`/app/src`}>play</a>
        <a href={`#who-are-you`}>learn</a>
        <a href={`#roadmap`}>features</a>
        <a href={`https://github.com/gareththegeek/corewar`}>code</a>
      </nav>
    </Header>
    <Hero>
      <h1>corewar<span>.io</span></h1>
      <Octicon name="chevron-down" />
    </Hero>
    <Features>
      <Feature>
        <Octicon name="rocket" />
        <h3>play corewar</h3>
        <p>Enjoy a slice of coding history by playing and learning the classic game corewar</p>
        <PrimaryButton href="/app/src">Play Now</PrimaryButton>
      </Feature>
      <Feature>
        <Octicon name="device-mobile" />
        <h3>on any device</h3>
        <p>Our web platform gives the ability to play where and when you want on any system with no installs</p>
        <FeatureButton href="#who-are-you">Learn more</FeatureButton>
      </Feature>
      <Feature>
      <Octicon name="megaphone" />
        <h3>in new ways</h3>
        <p>We have a fully featured roadmap bringing new ideas to the well established corewar player</p>
        <FeatureButton href="#roadmap">View Roadmap</FeatureButton>
      </Feature>
    </Features>
    <Prospect id={`who-are-you`}>
      <h2>What best describes you?</h2>
      <Octicon name="person" />
    </Prospect>
    <Features>
      <Feature>
        <Octicon name="mortar-board" />
        <h3>experienced player</h3>
        <p>I’ve played corewar before and understand the instructions and concepts</p>
        <PrimaryButton href="/app/src">Play Now</PrimaryButton>
      </Feature>
      <Feature>
        <Octicon name="law" />
        <h3>new to the game</h3>
        <p>I’ve done some coding before but never played corewar</p>
        <FeatureButton>Learn more</FeatureButton>
      </Feature>
      <Feature>
      <Octicon name="unverified" />
        <h3>total beginner</h3>
        <p>I’ve never done any coding or heard of corewar</p>
        <FeatureButton>Is it for me?</FeatureButton>
      </Feature>
    </Features>
    <Prospect id={`roadmap`}>
      <h2>The roadmap</h2>
      <Octicon name="milestone" />
    </Prospect>
    <Roadmap>
      <RoadmapItem>
        <RoadmapText left>The idea to develop corewar as a modern web app is concieved</RoadmapText>
        <IconWrapper colour={colour.warrior[2]}>
          <Octicon name="light-bulb" />
        </IconWrapper>
        <RoadmapText right>November 2017</RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>March 2018</RoadmapText>
        <IconWrapper colour={colour.blue}>
          <Octicon name="calendar" />
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
          <Octicon name="megaphone" />
        </IconWrapper>
        <RoadmapText right>Today</RoadmapText>
        <Timeline />
      </RoadmapItem>
    </Roadmap>
    <Footer>
      &copy; 2018
    </Footer>
  </HomeGrid>
)

export default Home
