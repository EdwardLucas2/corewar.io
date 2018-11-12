import styled from 'styled-components'

import { colour, space } from '../common/theme'
import { media } from '../common/mediaQuery'

const WarriorPanel = styled.section`
  ${media.phone`
     height: calc(100vh - ${space.controls} - ${space.controls} - ${space.s} - ${space.controls});
     display: grid;
     grid-template-rows: ${space.header} 1fr ${space.header};
  `} display: grid;

  border-right: 1px solid ${colour.darkbg};

  /* display: grid;
  grid-template-columns: 1fr; */
  /* flex-direction: row;
  flex-wrap: wrap; */

  flex-direction: column;
  align-items: flex-start;

  overflow-x: hidden;
  overflow-y: hidden;

  ${media.designer`

  `} .octicon {
    padding-left: 4px;
  }
`

export default WarriorPanel
