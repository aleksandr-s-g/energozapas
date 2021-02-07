import React, { Component, useContext } from 'react';
import PositionDeleteAssurance from './modal/PositionDeleteAssurance'
import PositionEdit from './modal/PositionEdit'
const styles = {
    li:
    {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem',
        marginRight: '1rem'
    },
    span_name:
    {
        width: '100%'
    },
    icon:
    {
        height: '20px',
        width: '20px',
        marginLeft: '10px',
        cursor: 'pointer'
    }
}


function Position({ position, removePosition, editPosition }) {
    return <li style={styles.li}>
        <span style={styles.span_name}>{position.name}</span>

        <PositionEdit position={position} editPosition={editPosition} />
        <PositionDeleteAssurance position={position} removePosition={removePosition} /></li>
}

export default Position;