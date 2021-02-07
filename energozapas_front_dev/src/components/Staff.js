import React from 'react'
import PropTypes from 'prop-types'
import Employee from './Employee'


function Staff(props){
    return(
        <ul>
            {props.staff.map((employee) => {
                return <Employee employee = {employee} key={employee.id} positions={props.positions} departments={props.departments} removeEmployee={props.removeEmployee} editEmployee={props.editEmployee}/>
            }

            )}
        </ul>
    )
}

export default Staff