import React from 'react'
import info_logo from '../img/information.svg';
const styles = {
    modal:
    {
        position: 'fixed',
        top:'0',
        right:'0',
        bottom:'0',
        left:'0',
        background: 'rgba(0,0,0,.5)',
        display: 'flex',
        justifyContent : 'center',
        paddingTop: '5rem'
    },
    modal_body: {
        padding:'2rem',
        width:'500px',
        borderRadius:'5px',
        background:'#fff',
        height:'350px',
        textAlign : 'left'
    },
    icon:
    {
        height:'20px',
        width:'20px',
        marginLeft:'10px',
        cursor:'pointer'
    },
    table:
    {
        marginLeft: 'auto',
        marginRight: 'auto',
        border:'0px solid black'
    },
    center:
    {
        textAlign : 'center'
    },
    button:
    {
        height:'50px',
        width:'200px',
        marginLeft:'20px',
        marginRight:'20px',
        marginBottom:'20px',
        marginTop:'20px',
        border: '1px solid #ccc',
        borderRadius: '25px'
    },
    value:
    {
        paddingLeft:'5px',
        paddingRight:'5px',
        fontSize:'1rem'
    }
    
}

export default class EmployeeInfo extends React.Component{

    state = {
        isOpen:false
    }
    

    render(){
        return(
            <React.Fragment>
                <img src={info_logo} style={styles.icon} onClick = {() =>  this.setState({isOpen:true})}/>
                {this.state.isOpen && (<div style = {styles.modal}>
                    <div style = {styles.modal_body}>
                        <h1 style={styles.center}>Информация о сотруднике</h1>
                        <table style={styles.table}>
                        <tbody>
                        <tr><td style={styles.value}>Имя:</td><td style={styles.value}>{this.props.employee.first_name}</td></tr>
                        <tr><td style={styles.value}>Фамилия:</td><td style={styles.value}>{this.props.employee.last_name}</td></tr>
                        <tr><td style={styles.value}>Отчество:</td><td style={styles.value}>{this.props.employee.patronymic}</td></tr>
                        <tr><td style={styles.value}>Email:</td><td style={styles.value}>{this.props.employee.email}</td></tr>
                        <tr><td style={styles.value}>Дата рождения:</td><td style={styles.value}>{this.props.employee.bdate}</td></tr>
                        <tr><td style={styles.value}>Телефон:</td><td style={styles.value}>{this.props.employee.phone_number}</td></tr>
                        {this.props.employee.position_id && <tr><td style={styles.value}>Должность:</td><td style={styles.value}>{this.props.employee.position_name}</td></tr>}
                        {this.props.employee.department_id && <tr><td style={styles.value}>Отдел:</td><td style={styles.value}>{this.props.employee.department_name}</td></tr>}
                        </tbody>
                        </table>
                        <div style={styles.center}><button style={styles.button} onClick = {() => this.setState({isOpen:false})} >Закрыть</button></div>
                    </div>
                </div>)}
            </React.Fragment>
        )
    }
}
