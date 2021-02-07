import React from 'react'
import add_logo from '../img/add.svg';
import Select from 'react-select'
const styles = {
    modal:
    {
        position: 'fixed',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        background: 'rgba(0,0,0,.5)',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '5rem'
    },
    modal_body: {
        padding: '2rem',
        width: '500px',
        borderRadius: '5px',
        background: '#fff',
        height: '400px'
    },
    icon:
    {
        height: '20px',
        width: '20px',
        marginLeft: '10px',
        cursor: 'pointer',
        paddingRight: '15px'
    },
    table:
    {
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '0px solid black'
    },
    center:
    {
        textAlign: 'center'
    },
    button:
    {
        height: '50px',
        width: '200px',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '20px',
        marginTop: '20px',
        border: '1px solid #ccc',
        borderRadius: '25px'
    },
    value:
    {
        paddingLeft: '5px',
        paddingRight: '5px',
        fontSize: '1rem'
    },
    li:
    {
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem',
        marginRight: '1rem'
    }
}
const options_test = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
var options = []
function positions_to_options(new_positions) {
    var options = []
    new_positions.forEach(function (item, i, position) {
        options.push({ value: item.id, label: item.name });
    });
    return options
}

function departments_to_options(new_departments) {
    var options = []
    new_departments.forEach(function (item, i, department) {
        options.push({ value: item.id, label: item.name });
    });
    return options
}

function addNewEmployee(addEmployee) {
    var new_employee = {
        first_name: document.getElementById('new_employee_first_name').value,
        last_name: document.getElementById('new_employee_last_name').value,
        patronymic: document.getElementById('new_employee_patronymic').value,
        email: document.getElementById('new_employee_email').value,
        phone_number: document.getElementById('new_employee_phone_number').value,
        position_id: selected_position_id,
        department_id: selected_department_id
    }
    if (document.getElementById('new_employee_bdate').value !== "") { new_employee.bdate = document.getElementById('new_employee_bdate').value }
    addEmployee(new_employee)

}
var selected_position_id = null
var selected_department_id = null
export default class NewEmployee extends React.Component {
    state = {
        isOpen: false
    }
    render() {
        return (

            <React.Fragment>
                <ul><li style={styles.li} onClick={() => this.setState({ isOpen: true })}><span><img src={add_logo} style={styles.icon} />Добавить нового сотрудника</span></li></ul>
                {this.state.isOpen && (<div style={styles.modal}>
                    <div style={styles.modal_body}>
                        <h1 style={styles.center}>Добавление нового сотрудника</h1>

                        <table style={styles.table}>
                            <tbody>
                                <tr><td style={styles.value}>*Имя:</td><td style={styles.value}><input id="new_employee_first_name" type='text' /></td></tr>
                                <tr><td style={styles.value}>*Фамилия:</td><td style={styles.value}><input id="new_employee_last_name" type='text' /></td></tr>
                                <tr><td style={styles.value}>Отчество:</td><td style={styles.value}><input id="new_employee_patronymic" type='text' /></td></tr>
                                <tr><td style={styles.value}>*Email:</td><td style={styles.value}><input id="new_employee_email" type='text' /></td></tr>
                                <tr><td style={styles.value}>Дата рождения:</td><td style={styles.value}><input id="new_employee_bdate" type='date' /></td></tr>
                                <tr><td style={styles.value}>*Телефон:</td><td style={styles.value}><input id="new_employee_phone_number" type='text' /></td></tr>
                                <tr><td style={styles.value}>Должность:</td><td style={styles.value}><Select options={positions_to_options(this.props.positions)} onChange={(pos) => {
                                    selected_position_id = pos.value
                                    console.log(selected_position_id)
                                }
                                } /></td></tr>
                                <tr><td style={styles.value}>Отдел:</td><td style={styles.value}><Select options={departments_to_options(this.props.departments)} onChange={(pos) => {
                                    selected_department_id = pos.value
                                    console.log(selected_department_id)
                                }
                                } /></td></tr>
                            </tbody>
                        </table>
                        <div style={styles.center}>
                            <button onClick={() => {
                                this.setState({ isOpen: false })
                                addNewEmployee(this.props.addEmployee)
                            }} style={styles.button}>Применить</button>
                            <button onClick={() => this.setState({ isOpen: false })} style={styles.button}>Отменить</button>
                        </div>
                    </div>
                </div>)}
            </React.Fragment>
        )
    }
}
