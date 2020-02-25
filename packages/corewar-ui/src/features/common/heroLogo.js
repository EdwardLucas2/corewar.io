import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import { colour, space, font } from '../common/theme'
import { media } from '../common/mediaQuery'

const Feature = styled.div`
  border-right: 1px solid ${colour.lightbg};
  ${media.tablet`border-right: none;`};
  ${media.desktop`border-right: none;`};
  ${media.tablet`border-bottom: 1px solid ${colour.lightbg}; padding-bottom: ${space.l};`};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${space.l};
  ${media.desktop`margin-top: ${space.s};`};

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
    font-size: ${font.large};
    color: ${colour.warrior[2]};
    margin: 0;
  }

  h3 {
    margin: ${space.m};
    ${media.tablet`margin: ${space.s}`};
    font-size: ${font.base};
    font-weight: 300;
    color: ${colour.lightgrey};
    text-align: center;
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
  }

  :hover {
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

const HeroLogo = () => (
  <section className="flex flex-row justify-center items-center font-thin mt-4 mx-16">
    <div className="flex flex-row justify-center items-center">
      <h1 className="text-5xl md:text-7xl">
        corewar<span className="font-light">.io</span>
      </h1>
      <Octicon name="chevron-right" className="text-2xl md:text-3xl text-blue ml-8 pt-4" />
    </div>
    <section className="hidden md:flex flex-row flex-wrap justify-center ml-16">
      <Feature>
        <Octicon name="rocket" />
        <h3>Play corewar</h3>
      </Feature>
      <Feature>
        <Octicon name="device-mobile" />
        <h3>On any device</h3>
      </Feature>
      <Feature>
        <Octicon name="megaphone" />
        <h3>In new ways</h3>
      </Feature>
    </section>
  </section>
)

export default HeroLogo
