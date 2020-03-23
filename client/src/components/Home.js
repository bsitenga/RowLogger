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
  const [ rowSPM, setRowSPM ] = useState('');
  const [ averageSplit, setAverageSplit ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ rowData, setRowData ] = useState([]);
  const [ singleTimeData, setSingleTimeData ] = useState([]);
  const [ singleDistanceData, setSingleDistanceData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/userrows')
    .then(res => {
      let tempData = [];
      let tempSingleDistanceData = [];
      let tempSingleTimeData = [];
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].email === props.userEmail) {
          tempData = res.data[i].rows;
          setRowData(res.data[i].rows);
        }
      }
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i].rowType === "Single Distance") {
          tempSingleDistanceData.push(tempData[i]);
        } else if (tempData[i].rowType === "Single Time") {
          tempSingleTimeData.push(tempData[i]);
        }
      }
      setSingleDistanceData(tempSingleDistanceData);
      setSingleTimeData(tempSingleTimeData);
      console.log("rowData", rowData);
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

  const addTotalWord = () => {
    if (rowType === "Intervals: Distance" || rowType === "Intervals: Time") 
      return "Total "
    return "";
  }

  const changeSPM = (e) => {
    if (!isNaN(e.target.value)) {
      setRowSPM(e.target.value);
    }
  }

  const changeSplit = (e) => {
    if (!isNaN(e.target.value)) {
      setAverageSplit(e.target.value);
    }
  }

  const clearForm = () => {
    setRowHours('');
      setRowMinutes('');
      setRowSeconds('');
      setRowTenths('');
      setRowDate(new Date());
      setRowDistance('');
      setErrorMessage('');
      setRowSPM('');
      setAverageSplit('');
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
        clearForm();
        console.log("submitted row");
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
      return <>
      {DistanceForm()}
      {TimeForm()}
      {averageSplitForm()}
      </>
    } else if (rowType === 'Intervals: Time') {
      return <>
      {DistanceForm()}
      {TimeForm()}
      {averageSplitForm()}
      </>
    } else if (rowType === 'Intervals: Variable') {
      return <>
      {DistanceForm()}
      {TimeForm()}
      {averageSplitForm()}
      </>
    }
  }

  const DistanceForm = () => {
    return <Form.Group className = "rowDistanceGroup">
  <Form.Label>{addTotalWord()}Distance (m)</Form.Label>
    <Form.Control value={rowDistance} onChange={(e) => changeDistance(e)} />
  </Form.Group>
  }

  const TimeForm = () => {
    return <><Form.Group className = "rowTimeGroupA">
      <Form.Group className = "rowTimeGroupAA">
      <Form.Label>{addTotalWord()}Hours</Form.Label>
    <Form.Control value={rowHours} onChange={(e) => changeHours(e)} />
      </Form.Group>
      <Form.Group className = "rowTimeGroupAB">
      <Form.Label>{addTotalWord()}Minutes</Form.Label>
    <Form.Control value={rowMinutes} onChange={(e) => changeMinutes(e)} />
      </Form.Group>   
    </Form.Group>
    <Form.Group className = "rowTimeGroupB">
      <Form.Group className = "rowTimeGroupBA">
      <Form.Label>{addTotalWord()}Seconds</Form.Label>
    <Form.Control value={rowSeconds} onChange={(e) => changeSeconds(e)} />
      </Form.Group>
      <Form.Group className = "rowTimeGroupBB">
      <Form.Label>{addTotalWord()}Tenths</Form.Label>
    <Form.Control value={rowTenths} onChange={(e) => changeTenths(e)} />
      </Form.Group>
  </Form.Group>
  <Form.Group className = "rowSPM">
    <Form.Label>SPM</Form.Label>
    <Form.Control value={rowSPM} onChange={(e) => changeSPM(e)} />
  </Form.Group>
  </>
  }

  const averageSplitForm = () => {
    return <Form.Group className = "rowAverageSplit">
      <Form.Label>Average Split</Form.Label>
      <Form.Control value = {averageSplit} onChange={(e) => changeSplit(e)} />
    </Form.Group>
  }

	return (
    <div>
      <div className="rowForm">
      {errorMessage}
			<Form onSubmit={e => submitRow(e)}>
				<Form.Group controlId="rowType" className="rowTypeGroup">
					<Form.Label>Type</Form.Label>
					<Form.Control as="select" onChange={(e) => changeType(e)}>
						<option>Single Distance</option>
						<option>Single Time</option>
						<option>Intervals: Distance</option>
						<option>Intervals: Time</option>
						<option>Intervals: Variable</option>
					</Form.Control>
				</Form.Group>
        <Form.Group controlId="rowDate" className = "rowDateGroup">
          <Form.Label className="rowDateLabel">Date</Form.Label>
          <DatePicker 
          selected={rowDate}
          onChange={changeDate}
          />
        </Form.Group>
        {formSwitch()}
        <Button block bsSize="large" type="submit" className="rowButton">
					Submit
				</Button>
			</Form>
      <div className = "bottomTag">
        <hr className="versionTag"></hr>
        <p>RowLogger v1.0.0</p>
      </div>
		</div>
    <div className = "rowLog">
      <div className = "singleDistances">
        Single Distances
          {singleDistanceData.map((item) => {
            return <p>{item.rowDistance} {item.rowTime}</p>
          })}
      </div>
      <div className = "singleTimes">
        Single Times
          {singleTimeData.map((item) => {
          return <p>{item.rowTime} {item.rowDistance}</p>
          })}
      </div>
      <div className = "distanceIntervals">
          Distance Intervals
      </div>
      <div className = "timeIntervals">
          time Intervals
      </div>
    </div>
    </div>
		
	);
}

export default Home;
