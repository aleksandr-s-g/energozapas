import React, { Component, useContext } from 'react';
import DepartmentDeleteAssurance from './modal/DepartmentDeleteAssurance'
import DepartmentEdit from './modal/DepartmentEdit'
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


function Department({ department, removeDepartment, editDepartment }) {
    return <li style={styles.li}>
        <span style={styles.span_name}>{department.name}</span>

        <DepartmentEdit department={department} editDepartment={editDepartment} />
        <DepartmentDeleteAssurance department={department} removeDepartment={removeDepartment} /></li>
}

export default Department;