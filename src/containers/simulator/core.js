import React from 'react'
import Cell from './cell';

const Core = props => {
  return <div className="core">
    {props.data && props.data.map((data, i) =>
      {
      return <Cell key={data.address} data={data} />
    })}
  </div>
};

export default Core;