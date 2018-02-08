import React from 'react'
import Media from 'react-media'

import MobileLayout from './mobileLayout'
import TabletLayout from './tabletLayout'
import DesktopLayout from './desktopLayout'

import { sizes } from '../common/mediaQuery'

const App = () => (
  <div>
    <Media
      query={{ maxWidth: sizes.phone }}
      render={() => <MobileLayout />}
    />

    <Media
      query={{ minWidth: sizes.phone, maxWidth: sizes.desktop }}
      render={() => <TabletLayout />}
    />

    <Media
      query={{ minWidth: sizes.desktop }}
      render={() => <DesktopLayout />}
    />
  </div>
)

export default App
