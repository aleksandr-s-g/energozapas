import React from 'react'
import edit_logo from '../img/edit.svg';
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
        height:'250px'
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

export default class PositionEdit extends React.Component{

    state = {
        isOpen:false
    }

    render(){
        return(
            <React.Fragment>
                <img src={edit_logo} style={styles.icon} onClick = {() =>  this.setState({isOpen:true})}/>
                {this.state.isOpen && (<div style = {styles.modal}>
                    <div style = {styles.modal_body}>
                        <h1 style={styles.center}>Изменение информации о должности</h1>
                        <table style={styles.table}>
                        <tbody>
                        <tr><td style={styles.value}>Название долдности:</td><td style={styles.value}><input id='new_position_input' type='text' defaultValue={this.props.position.name}/></td></tr>
                        </tbody>
                        </table>
                        <div style={styles.center}>
                        <button onClick = {() => {this.setState({isOpen:false})
                                                    this.props.editPosition(this.props.position.id, document.getElementById('new_position_input').value)}} style = {styles.button}>Применить</button>
                        <button onClick = {() => this.setState({isOpen:false})} style = {styles.button}>Отменить</button>
                        </div>
                    </div>
                </div>)}
            </React.Fragment>
        )
    }
}
