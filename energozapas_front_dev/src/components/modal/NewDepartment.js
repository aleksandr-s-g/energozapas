import React from 'react'
import add_logo from '../img/add.svg';
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
        height:'200px'
    },
    icon:
    {
        height:'20px',
        width:'20px',
        marginLeft:'10px',
        cursor:'pointer',
        paddingRight:'15px'
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
    },
    li:
    {
        cursor:'pointer',
        display:'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem',
        marginRight: '1rem'
    }
}

export default class NewDepartment extends React.Component{

    state = {
        isOpen:false
    }

    render(){
        return(
            <React.Fragment>
                <ul><li style={styles.li} onClick = {() =>  this.setState({isOpen:true})}><span><img src={add_logo} style={styles.icon} />Добавить новый отдел</span></li></ul>
                {this.state.isOpen && (<div style = {styles.modal}>
                    <div style = {styles.modal_body}>
                        <h1 style={styles.center}>Добавление нового отдела</h1>
                        <table style={styles.table}>
                        <tbody>
                        <tr><td style={styles.value}>Имя:</td><td style={styles.value}><input id='new_department_input' type='text'/></td></tr>
                        </tbody>
                        </table>
                        <div style={styles.center}>
                        <button onClick = {() => {this.setState({isOpen:false})
                                                    this.props.addDepartment(document.getElementById('new_department_input').value)}} style = {styles.button}>Применить</button>
                        <button onClick = {() => this.setState({isOpen:false})} style = {styles.button}>Отменить</button>
                        </div>
                    </div>
                </div>)}
            </React.Fragment>
        )
    }
}
