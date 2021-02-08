import React, { useEffect } from 'react';
import Tabs from "./components/Tabs";
import NewEmployee from "./components/modal/NewEmployee";
import NewPosition from "./components/modal/NewPosition";
import NewDepartment from "./components/modal/NewDepartment";
import './App.css';
import Staff from "./components/Staff"
import Positions from "./components/Positions"
import Departments from "./components/Departments"
import Select from 'react-select'
import Loader from './components/Loader'
const styles = {
  sort_select:
  {
    paddingInlineStart: '40px',
    display: 'inline-block',
    width: '300px',
    height: '30px'
  },
  filter:
  {
    display: 'inline-block',
    width: '200px',
    height: '30px',
    marginLeft: '20px'
  },
  button:
  {
    display: 'inline-block',
    height: '30px',
    width: '200px',
    marginLeft: '20px',
    marginRight: '20px',
    marginBottom: '20px',
    marginTop: '20px',
    border: '1px solid #ccc',
    borderRadius: '15px'
  }
}
const server_hostname = window.location.hostname
const server_port = '8080'
const server_get_staff_api_url = 'http://'+server_hostname+':'+server_port+'/api/stuff/?format=json'
const server_staff_api_url = 'http://'+server_hostname+':'+server_port+'/api/stuff/'
const server_staff_export_api_url = 'http://'+server_hostname+':'+server_port+'/api/stuff/export/'
const server_get_positions_api_url = 'http://'+server_hostname+':'+server_port+'/api/stuff/position/?format=json'
const server_positions_api_url = 'http://'+server_hostname+':'+server_port+'/api/stuff/position/'

const server_get_departments_api_url = 'http://'+server_hostname+':'+server_port+'/api/stuff/department/?format=json'
const server_departments_api_url = 'http://'+server_hostname+':'+server_port+'/api/stuff/department/'

const staff_sort_options = [
  { value: 'first_name', label: 'Сортировка по имени' },
  { value: 'last_name', label: 'Сортировка по фамилии' },
  { value: 'position_name', label: 'Сортировака по должности' }
]

function compare_employees_by_first_name(a, b) {
  if (a.first_name < b.first_name) {
    return -1;
  }
  if (a.first_name > b.first_name) {
    return 1;
  }
  // a должно быть равным b
  return 0;
}

function compare_positions_by_name(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  // a должно быть равным b
  return 0;
}
function compare_departments_by_name(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  // a должно быть равным b
  return 0;
}

function compare_employees_by_last_name(a, b) {
  if (a.last_name < b.last_name) {
    return -1;
  }
  if (a.last_name > b.last_name) {
    return 1;
  }
  // a должно быть равным b
  return 0;
}

function compare_employees_by_position(a, b) {
  var name_1 = a.position_name === undefined ? '' : a.position_name
  var name_2 = b.position_name === undefined ? '' : b.position_name
  if (name_1 < name_2) {
    return -1;
  }
  if (name_1 > name_2) {
    return 1;
  }
  // a должно быть равным b
  return 0;
}



var staff_sort_by = staff_sort_options[0]
function App() {
  const [staff, setStaff] = React.useState([])
  const [filtered_staff, setFilteredStaff] = React.useState([])
  const [positions, setPositions] = React.useState([])
  const [departments, setDepartments] = React.useState([])
  const [positions_loading, setPositionsLoading] = React.useState(true)
  const [staff_loading, setStaffLoading] = React.useState(true)
  const [departments_loading, setDepartmentsLoading] = React.useState(true)
  

  function staff_filter() {
    const svalue = document.getElementById('staff_filter_input').value.toLowerCase();
    const result = staff.filter(employee => {
      if (employee.first_name !== undefined) { if (employee.first_name.toLowerCase().indexOf(svalue) >= 0) { return true } }
      if (employee.last_name !== undefined) { if (employee.last_name.toLowerCase().indexOf(svalue) >= 0) { return true } }
      if (employee.patronymic !== undefined) { if (employee.patronymic.toLowerCase().indexOf(svalue) >= 0) { return true } }
      if (employee.department_name !== undefined) { if (employee.department_name.toLowerCase().indexOf(svalue) >= 0) { return true } }
      if (employee.position_name !== undefined) { if (employee.position_name.toLowerCase().indexOf(svalue) >= 0) { return true } }
      return false
    })

    setFilteredStaff([...result])
  }

  function addPosition(name) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        new_position: {
          name: name
        }
      })
    }
    setPositionsLoading(true)
    const request = async () => {
      const response = await fetch(server_positions_api_url, requestOptions)
      const json = await response.json();
      console.log(json);
      refreshPositions()
    }
    request();
  }

  function removePosition(id) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }


    setPositionsLoading(true)
    const request = async () => {
      const response = await fetch(server_positions_api_url + id, requestOptions)
      //const json = await response.json();
      console.log(response);
      refreshPositions()
    }
    request();
  }

  function editPosition(id, name) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ position: { name: name } })
    }


    setPositionsLoading(true)
    const request = async () => {
      const response = await fetch(server_positions_api_url + id, requestOptions)
      const json = await response.json();
      console.log(json);
      refreshPositions()
    }
    request();
  }

  function refreshPositions() {
    console.log('RP')
    fetch(server_get_positions_api_url)
      .then(response => response.json())
      .then(positions => {
        setPositions([...positions.sort(compare_positions_by_name)])
        setPositionsLoading(false)
        
      })
  }



  function addDepartment(name) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        new_department: {
          name: name
        }
      })
    }
    setDepartmentsLoading(true)
    const request = async () => {
      const response = await fetch(server_departments_api_url, requestOptions)
      const json = await response.json();
      console.log(json);
      refreshDepartments()
    }
    request();
  }

  function removeDepartment(id) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }


    setDepartmentsLoading(true)
    const request = async () => {
      const response = await fetch(server_departments_api_url + id, requestOptions)
      //const json = await response.json();
      console.log(response);
      refreshDepartments()
    }
    request();
  }

  function editDepartment(id, name) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ department: { name: name } })
    }


    setDepartmentsLoading(true)
    const request = async () => {
      const response = await fetch(server_departments_api_url + id, requestOptions)
      const json = await response.json();
      console.log(json);
      refreshDepartments()
    }
    request();
  }

  function refreshDepartments() {
    console.log('RP')
    fetch(server_get_departments_api_url)
      .then(response => response.json())
      .then(departments => {
        setDepartments([...departments.sort(compare_departments_by_name)])
        setDepartmentsLoading(false)
      })
  }


  function refreshStaff() {
    console.log('RP')
    fetch(server_get_staff_api_url)
      .then(response => response.json())
      .then(staff => {
        setStaff([...staff.sort(compare_employees_by_first_name)])
        sort_staff(staff_sort_by)
        setFilteredStaff([...staff])
        setStaffLoading(false)
      })
      console.log(staff_sort_by)
      
  }

  function removeEmployee(id) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }


    setStaffLoading(true)
    const request = async () => {
      const response = await fetch(server_staff_api_url + id, requestOptions)
      refreshStaff()
    }
    request();
  }

  function addEmployee(new_employee) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new_employee: new_employee })
    }
    setStaffLoading(true)
    const request = async () => {
      const response = await fetch(server_staff_api_url, requestOptions)
      refreshStaff()
    }
    request();
  }

  function editEmployee(new_employee, id) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employee: new_employee })
    }
    setStaffLoading(true)
    const request = async () => {
      const response = await fetch(server_staff_api_url + id, requestOptions)
      refreshStaff()
    }
    request();
  }

  function sort_staff(sort_by) {
    var sorted_staff
    staff_sort_by = sort_by
    switch (sort_by.value) {
      case 'first_name':
        var sorted_staff = staff.sort(compare_employees_by_first_name)
        setStaff([...sorted_staff])
        break
      case 'last_name':
        var sorted_staff = staff.sort(compare_employees_by_last_name)
        setStaff([...sorted_staff])
        break
      case 'position_name':
        var sorted_staff = staff.sort(compare_employees_by_position)
        setStaff([...sorted_staff])
        break

    }
    staff_filter()
  }

  useEffect(() => {
    fetch(server_get_staff_api_url)
      //fetch('127.0.0.1:8000/api/my_todolist_proj/?format=json')
      .then(response => response.json())
      .then(staff => {
        setStaff(staff.sort(compare_employees_by_first_name))
        setFilteredStaff([...staff])
        setStaffLoading(false)
      })
  }, [])

  useEffect(() => {
    fetch(server_get_positions_api_url)
      //fetch('127.0.0.1:8000/api/my_todolist_proj/?format=json')
      .then(response => response.json())
      .then(positions => {
        setPositions(positions.sort(compare_positions_by_name))
        setPositionsLoading(false)
      })
  }, [])

  useEffect(() => {
    fetch(server_get_departments_api_url)
      //fetch('127.0.0.1:8000/api/my_todolist_proj/?format=json')
      .then(response => response.json())
      .then(departments => {
        setDepartments(departments.sort(compare_departments_by_name))
        setDepartmentsLoading(false)
        console.log(departments)
      })
  }, [])




  return (

    <div>
      <h1>Менеджер сотрудников</h1>

      <Tabs>
        <div label="Сотрудники">
          <span style={styles.sort_select}><Select id="select_sort_by" onChange={sort_staff} defaultValue={staff_sort_options[0]} options={staff_sort_options} /></span>
          <span><input style={styles.filter} id='staff_filter_input' type='text' placeholder='Фильтровать по значению...' onChange={staff_filter} /></span>
          <span style={styles.filter}><form action={server_staff_export_api_url}>
            <input style={styles.button} type="submit" value="Экспорт в excel" />
          </form>
          </span>
          <NewEmployee positions={positions} addEmployee={addEmployee} departments={departments} />
          {staff_loading ? <Loader /> : <Staff staff={filtered_staff} positions={positions} departments={departments} removeEmployee={removeEmployee} editEmployee={editEmployee} />}
        </div>
        <div label="Должности">
          <NewPosition addPosition={addPosition} />
          {positions_loading ? <Loader /> : <Positions positions={positions} removePosition={removePosition} editPosition={editPosition} />}
        </div>
        <div label="Отделы">
          <NewDepartment addDepartment={addDepartment} />
          {departments_loading ? <Loader /> : <Departments departments={departments} removeDepartment={removeDepartment} editDepartment={editDepartment} />}

        </div>
      </Tabs>
    </div>
  );


}

export default App;