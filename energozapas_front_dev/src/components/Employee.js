import React, { Component, useContext  }from 'react';
import DeleteAssurance from './modal/DeleteAssurance'
import EmployeeInfo from './modal/EmployeeInfo'
import EmployeeEdit from './modal/EmployeeEdit'
import { ReactComponent as InfoLogo } from './img/information.svg';
import edit_logo from './img/edit.svg';
import info_logo from './img/information.svg';
import delete_logo from './img/delete.svg';
import Context from '../context'
const styles = {
    li:
    {
        display:'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem',
        marginRight: '1rem'
    },
    span_name:
    {
        width:'100%'
    },
    icon:
    {
        height:'20px',
        width:'20px',
        marginLeft:'10px',
        cursor:'pointer'
    }
}


function Employee ({employee, positions,departments, removeEmployee, editEmployee})
{return <li style={styles.li}>
    <span style={styles.span_name}>{employee.first_name} {employee.last_name} {employee.patronymic} ({employee.position_name}, {employee.department_name})</span>
    <EmployeeInfo employee={employee}/>
    <EmployeeEdit employee={employee} positions={positions} departments={departments} editEmployee={editEmployee}/>
    <DeleteAssurance employee={employee} removeEmployee={removeEmployee}/></li>}



export default Employee;