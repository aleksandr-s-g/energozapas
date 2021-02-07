import React from 'react'
import PropTypes from 'prop-types'
import Department from './Department'


function Departments(props) {
    return (
        <ul>
            {props.departments.map((department) => {
                return <Department department={department} key={department.id} removeDepartment={props.removeDepartment} editDepartment={props.editDepartment} />
            }
            )}
        </ul>
    )
}

export default Departments