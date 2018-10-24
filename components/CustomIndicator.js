// @flow

import React from 'react'

type PropType = {
  desc: string,
  type: string,
  value: number,
}

const CustomIndicator = ({ desc, type, value }: PropType) => (
  <React.Fragment>
    <div className="indicator-desc">{desc}</div>
    <div className="indicator">
      <i className="material-icons" style={{ fontSize: '20px' }}>
        play_arrow
      </i>
    </div>
    <style jsx>{`
      .indicator {
        top: -15px;
        height: 100%;
        color: #000;
        left: calc(${value}% - 15px);
        position: absolute;
        transform: rotate(${type === 'main' ? '90' : '-45'}deg);
      }
      .indicator-desc {
        left: calc(${value}% - 15px);
        top: -20px;
        width: 30px;
        text-align: center;
        position: absolute;
        color: #000;
        font-size: 12px;
      }
    `}</style>
  </React.Fragment>
)

export default CustomIndicator
