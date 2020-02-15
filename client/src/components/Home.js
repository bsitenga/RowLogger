import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormControl';
import FormLabel from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
 import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function Home(props) {
  const [ rowType, setRowType ] = useState('Single Distance');
  const [ rowDate, setRowDate ] = useState(new Date());
  const [ rowDistance, setRowDistance ] = useState('');
  const [ rowHours, setRowHours ] = useState('');
  const [ rowMinutes, setRowMinutes ] = useState('');
  const [ rowSeconds, setRowSeconds ] = useState('');
  const [ rowTenths, setRowTenths ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ rowData, setRowData ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/userrows')
    .then(res => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].email === props.userEmail) {
          setRowData(res.data[i].rows);
        }
      }
      console.log("2", rowData);
    })
  }, [rowData] );

  const changeDate = date => {
    setRowDate(date);
  }

  const changeType = (e) => {
    setRowType(e.target.value)
  }

  const changeDistance = (e) => {
    if (!isNaN(e.target.value)) {
      setRowDistance(e.target.value);
    }
  }
  
  const changeHours = (e) => {
    if (!isNaN(e.target.value)) {
      setRowHours(e.target.value);
    }
  }

  const changeMinutes = (e) => {
    if (!isNaN(e.target.value)) {
      setRowMinutes(e.target.value);
    }
  }

  const changeSeconds = (e) => {
    if (!isNaN(e.target.value)) {
      setRowSeconds(e.target.value);
    }
  }

  const changeTenths = (e) => {
    if (!isNaN(e.target.value)) {
      setRowTenths(e.target.value);
    }
  }

  const submitRow = async (e) => {
    e.preventDefault();
    let rowTime = 0;
    if (rowHours !== '') {
      rowTime += rowHours * 60 * 60;
    }
    if (rowMinutes !== '') {
      rowTime += rowMinutes * 60;
    }
    if (rowSeconds !== '') {
      rowTime += rowSeconds * 1;
    }
    if (rowTenths !== '') {
      rowTime += rowTenths * .1;
    }
    if (rowType === 'Single Distance' || rowType === 'Single Time') {
      if (rowDistance === '') {
        setErrorMessage('Please enter a valid distance')
      } else if (rowTime === 0) {
        setErrorMessage('Please enter a valid time');
      } else {
        const userRow = {
          email: props.userEmail,
          row: {
            rowDate: rowDate,
            rowType: rowType,
            rowDistance: rowDistance,
            rowTime: rowTime
          }
        }
        axios.post('http://localhost:5000/api/userrows', userRow)
    .then(res => {
    })
        console.log("test");
      }
    } else if (rowType === 'Intervals: Distance') {

    } else if (rowType === 'Intervals: Time') {

    } else if (rowType === 'Intervals: Variable') {

    }
  }

  const formSwitch = () => {
    if (rowType === 'Single Distance' || rowType === 'Single Time') {
      return (<>
      {DistanceForm()}
      {TimeForm()}
      </>);
    } else if (rowType === 'Intervals: Distance') {
      return <p>idis</p>
    } else if (rowType === 'Intervals: Time') {
      return <p>iTim</p>
    } else if (rowType === 'Intervals: Variable') {
      return <p>iVar</p>
    }
  }

  const DistanceForm = () => {
    return <Form.Group>
    <Form.Label>Distance (m)</Form.Label>
    <Form.Control value={rowDistance} onChange={(e) => changeDistance(e)} />
  </Form.Group>
  }

  const TimeForm = () => {
    return <Form.Group>
    <Form.Label>Hours</Form.Label>
    <Form.Control value={rowHours} onChange={(e) => changeHours(e)} />
    <Form.Label>Minutes</Form.Label>
    <Form.Control value={rowMinutes} onChange={(e) => changeMinutes(e)} />
    <Form.Label>Seconds</Form.Label>
    <Form.Control value={rowSeconds} onChange={(e) => changeSeconds(e)} />
    <Form.Label>Tenths</Form.Label>
    <Form.Control value={rowTenths} onChange={(e) => changeTenths(e)} />
  </Form.Group>
  }

	return (
		<div>
      {errorMessage}
			<Form onSubmit={e => submitRow(e)}>
				<Form.Group controlId="rowType">
					<Form.Label>Type</Form.Label>
					<Form.Control as="select" onChange={(e) => changeType(e)}>
						<option>Single Distance</option>
						<option>Single Time</option>
						<option>Intervals: Distance</option>
						<option>Intervals: Time</option>
						<option>Intervals: Variable</option>
					</Form.Control>
				</Form.Group>
        <Form.Group controlId="rowDate">
          <Form.Label>Date</Form.Label>
          <DatePicker 
          selected={rowDate}
          onChange={changeDate}
          />
        </Form.Group>
        {formSwitch()}
        <Button block bsSize="large" type="submit">
					Submit
				</Button>
			</Form>
      {rowData.map((item) => {
      return <p>{item.rowType} {item.rowDistance}</p>
      })}
		</div>
	);
}

export default Home;
