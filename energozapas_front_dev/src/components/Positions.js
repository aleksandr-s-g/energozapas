import React from 'react'
import PropTypes from 'prop-types'
import Position from './Position'


function Positions(props) {
    return (
        <ul>
            {props.positions.map((position) => {
                return <Position position={position} key={position.id} removePosition={props.removePosition} editPosition={props.editPosition} />
            }
            )}
        </ul>
    )
}

export default Positions