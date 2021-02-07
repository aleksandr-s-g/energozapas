import React from 'react'
import delete_logo from '../img/delete.svg';
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
        width: '600px',
        borderRadius: '5px',
        background: '#fff',
        height: '200px',
        textAlign: 'center'
    },
    icon:
    {
        height: '20px',
        width: '20px',
        marginLeft: '10px',
        cursor: 'pointer'
    },
    button:
    {
        height: '50px',
        width: '200px',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '25px'
    }
}

export default class DepartmentDeleteAssurance extends React.Component {
    state = {
        isOpen: false
    }

    render() {
        return (
            <React.Fragment>
                <img src={delete_logo} style={styles.icon} onClick={() => this.setState({ isOpen: true })} />
                {this.state.isOpen && (<div style={styles.modal}>
                    <div style={styles.modal_body}>
                        <h1>Вы уверены, что хотите удалить отдел {this.props.department.name}?</h1>
                        <button onClick={() => {
                            this.setState({ isOpen: false })
                            console.log(this.props.removeDepartment)
                            this.props.removeDepartment(this.props.department.id)
                        }} style={styles.button}>Да</button>
                        <button onClick={() => this.setState({ isOpen: false })} style={styles.button}>Нет</button>
                    </div>
                </div>)}
            </React.Fragment>
        )
    }
}
