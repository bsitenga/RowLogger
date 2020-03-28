import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function Home(props) {
	//State
	const [ rowType, setRowType ] = useState('Single Distance');
	const [ rowDate, setRowDate ] = useState(new Date());
	const [ rowDistance, setRowDistance ] = useState('');
	const [ rowHours, setRowHours ] = useState('');
	const [ rowMinutes, setRowMinutes ] = useState('');
	const [ rowSeconds, setRowSeconds ] = useState('');
	const [ rowTenths, setRowTenths ] = useState('');
	const [ rowSPM, setRowSPM ] = useState('');
	const [ splitMinutes, setSplitMinutes ] = useState('');
	const [ splitSeconds, setSplitSeconds ] = useState('');
	const [ splitTenths, setSplitTenths ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState('');
	const [ rowData, setRowData ] = useState([]);
	const [ singleTimeData, setSingleTimeData ] = useState([]);
	const [ singleDistanceData, setSingleDistanceData ] = useState([]);
	const [ distanceIntervalData, setDistanceIntervalData ] = useState([]);
	const [ timeIntervalData, setTimeIntervalData ] = useState([]);
	const [ variableIntervalData, setVariableIntervalData ] = useState([]);
	const [ rowNotes, setRowNotes ] = useState('');

	//On Mount
	useEffect(
		() => {
			axios.get('http://localhost:5000/api/userrows').then((res) => {
				//temporary arrays for row data
				let tempData = [];
				let tempSingleDistanceData = [];
				let tempSingleTimeData = [];
				let tempDistanceIntervalData = [];
				let tempTimeIntervalData = [];
				let tempVariableIntervalData = [];

				//grabs all row data
				for (let i = 0; i < res.data.length; i++) {
					if (res.data[i].email === props.userEmail) {
						tempData = res.data[i].rows;
						setRowData(tempData);
					}
				}

				//separates all row data into arrays by type
				for (let i = 0; i < tempData.length; i++) {
					if (tempData[i].rowType === 'Single Distance') {
						tempSingleDistanceData.push(tempData[i]);
					} else if (tempData[i].rowType === 'Single Time') {
						tempSingleTimeData.push(tempData[i]);
					} else if (tempData[i].rowType === 'Intervals: Distance') {
						tempDistanceIntervalData.push(tempData[i]);
					} else if (tempData[i].rowType === 'Intervals: Time') {
						tempTimeIntervalData.push(tempData[i]);
					} else if (tempData[i].rowType === 'Intervals: Variable') {
						tempVariableIntervalData.push(tempData[i]);
					}
				}

				//sorts rows by date in each category
				sortByDate(tempSingleDistanceData);
				sortByDate(tempSingleTimeData);
				sortByDate(tempDistanceIntervalData);
				sortByDate(tempTimeIntervalData);
				sortByDate(tempVariableIntervalData);

				//sets state for each row type
				setSingleDistanceData(tempSingleDistanceData);
				setSingleTimeData(tempSingleTimeData);
				setDistanceIntervalData(tempDistanceIntervalData);
				setTimeIntervalData(tempTimeIntervalData);
				setVariableIntervalData(tempVariableIntervalData);
			});
		},
		[ rowData ]
	);

	//sorts by date in reverse chronological order
	const sortByDate = (arry) => {
		arry.sort(function(a, b) {
			return new Date(b.rowDate) - new Date(a.rowDate);
		});
	};

	//All form state change functions
	const changeDate = (date) => {
		setRowDate(date);
	};

	const changeType = (e) => {
		setRowType(e.target.value);
	};

	const changeDistance = (e) => {
		if (!isNaN(e.target.value)) {
			setRowDistance(e.target.value);
		}
	};

	const changeHours = (e) => {
		if (!isNaN(e.target.value)) {
			setRowHours(e.target.value);
		}
	};

	const changeMinutes = (e) => {
		if (!isNaN(e.target.value)) {
			setRowMinutes(e.target.value);
		}
	};

	const changeSeconds = (e) => {
		if (!isNaN(e.target.value)) {
			setRowSeconds(e.target.value);
		}
	};

	const changeTenths = (e) => {
		if (!isNaN(e.target.value)) {
			setRowTenths(e.target.value);
		}
	};

	const changeSPM = (e) => {
		if (!isNaN(e.target.value)) {
			setRowSPM(e.target.value);
		}
	};

	const changeSplitMinutes = (e) => {
		if (!isNaN(e.target.value)) {
			setSplitMinutes(e.target.value);
		}
	};

	const changeSplitSeconds = (e) => {
		if (!isNaN(e.target.value)) {
			setSplitSeconds(e.target.value);
		}
	};

	const changeSplitTenths = (e) => {
		if (!isNaN(e.target.value)) {
			setSplitTenths(e.target.value);
		}
	};

	const changeNotes = (e) => {
		setRowNotes(e.target.value);
	};

	//clears the form
	const clearForm = () => {
		setRowHours('');
		setRowMinutes('');
		setRowSeconds('');
		setRowTenths('');
		setRowDate(new Date());
		setRowDistance('');
		setErrorMessage('');
		setRowSPM('');
		setSplitMinutes('');
		setSplitSeconds('');
		setSplitTenths('');
		setRowNotes('');
	};

	//Submits the row form
	const submitRow = async (e) => {
		e.preventDefault();

		//gets the row time in number of seconds
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
			rowTime += rowTenths * 0.1;
		}

		//Post req for rows
		if (rowType === 'Single Distance' || rowType === 'Single Time') {
			if (rowDistance === '') {
				setErrorMessage('Please enter a valid distance');
			} else if (rowTime === 0) {
				setErrorMessage('Please enter a valid time');
			} else {
				let tempAverageSplit = rowTime / (rowDistance / 500);
				let tempDate = '' + (rowDate.getMonth() + 1) + '/' + rowDate.getDate() + '/' + rowDate.getFullYear().toString()[2] + rowDate.getFullYear().toString()[3];
				const userRow = {
					email: props.userEmail,
					row: {
						rowDate: tempDate,
						rowType: rowType,
						rowDistance: rowDistance,
						rowTime: rowTime,
						rowSPM: rowSPM,
						averageSplit: tempAverageSplit,
						rowNotes: rowNotes
					}
				};
				axios.post('http://localhost:5000/api/userrows', userRow).then((res) => {});
				clearForm();
				console.log('Submitted Row!', userRow);
			}
		} else if (
			rowType === 'Intervals: Distance' ||
			rowType === 'Intervals: Time' ||
			rowType === 'Intervals: Variable'
		) {
			if (rowDistance === '') {
				setErrorMessage('Please enter a valid distance');
			} else if (rowTime === 0) {
				setErrorMessage('Please enter a valid time');
			} else if (splitMinutes === '' && splitSeconds === '' && splitTenths === '') {
				setErrorMessage('Please enter a valid average split');
			} else {
				if (splitMinutes === '') {
					setSplitMinutes(0);
				}
				if (splitSeconds === '') {
					setSplitSeconds(0);
				}
				if (splitTenths === '') {
					setSplitTenths(0);
				}
				let tempAverageSplit = Number(splitMinutes) * 60 + Number(splitSeconds) + Number(splitTenths) * 0.1;
				let tempDate = '' + (rowDate.getMonth() + 1) + '/' + rowDate.getDate() + '/' + rowDate.getFullYear().toString()[2] + rowDate.getFullYear().toString()[3];
				const userRow = {
					email: props.userEmail,
					row: {
						rowDate: tempDate,
						rowType: rowType,
						rowDistance: rowDistance,
						rowTime: rowTime,
						rowSPM: rowSPM,
						averageSplit: tempAverageSplit
					}
				};
				axios.post('http://localhost:5000/api/userrows', userRow).then((res) => {});
				clearForm();
				console.log('Submitted Row!', userRow);
			}
		}
	};

	//Creates the form from components
	const formSwitch = () => {
		if (rowType === 'Single Distance' || rowType === 'Single Time') {
			return (
				<span>
					{DistanceForm()}
					{TimeForm()}
					{noteForm()}
				</span>
			);
		} else if (rowType === 'Intervals: Distance' || rowType === 'Intervals: Time') {
			return (
				<span>
					{DistanceForm()}
					{TimeForm()}
					{averageSplitForm()}
					{noteForm()}
				</span>
			);
		} else if (rowType === 'Intervals: Variable') {
			return (
				<span>
					{DistanceForm()}
					{TimeForm()}
					{averageSplitForm()}
					{noteForm()}
				</span>
			);
		}
	};

	//Form components
	const DistanceForm = () => {
		return (
			<Form.Group className="rowDistanceGroup">
				<Form.Label>Distance (m)</Form.Label>
				<Form.Control placeholder="meters" value={rowDistance} onChange={(e) => changeDistance(e)} />
			</Form.Group>
		);
	};

	const TimeForm = () => {
		return (
			<span>
				<Form.Group className="rowTimeGroupA">
					<Form.Group className="rowTimeGroupAA">
						<Form.Label>h</Form.Label>
						<Form.Control placeholder="hour" value={rowHours} onChange={(e) => changeHours(e)} />
					</Form.Group>
					:
					<Form.Group className="rowTimeGroupAB">
						<Form.Label>mm</Form.Label>
						<Form.Control placeholder="mins" value={rowMinutes} onChange={(e) => changeMinutes(e)} />
					</Form.Group>
				</Form.Group>
				:
				<Form.Group className="rowTimeGroupB">
					<Form.Group className="rowTimeGroupBA">
						<Form.Label>ss</Form.Label>
						<Form.Control placeholder="secs" value={rowSeconds} onChange={(e) => changeSeconds(e)} />
					</Form.Group>
					.
					<Form.Group className="rowTimeGroupBB">
						<Form.Label>t</Form.Label>
						<Form.Control placeholder="tens" value={rowTenths} onChange={(e) => changeTenths(e)} />
					</Form.Group>
				</Form.Group>
				<Form.Group className="rowSPM">
					<Form.Label>SPM</Form.Label>
					<Form.Control value={rowSPM} onChange={(e) => changeSPM(e)} />
				</Form.Group>
			</span>
		);
	};

	const averageSplitForm = () => {
		return (
			<Form.Group className="rowAverageSplit">
				<Form.Label>Average Split (mm:ss.t)</Form.Label>
				<Form.Control value={splitMinutes} onChange={(e) => changeSplitMinutes(e)} />
				:
				<Form.Control value={splitSeconds} onChange={(e) => changeSplitSeconds(e)} />
				.
				<Form.Control value={splitTenths} onChange={(e) => changeSplitTenths(e)} />
			</Form.Group>
		);
	};

	const noteForm = () => {
		return (
			<Form.Group className="rowNotes">
				<Form.Label>Notes</Form.Label>
				<Form.Control value={rowNotes} onChange={(e) => changeNotes(e)} />
			</Form.Group>
		);
	};

	//Average split parsing functions
	const findSplitMins = (fullSplit) => {
		return Math.floor(fullSplit / 60);
	};

	const findSplitSecs = (fullSplit) => {
		let sec = Math.floor(fullSplit - findSplitMins(fullSplit) * 60).toString();
		if (sec.length === 1) {
			sec = '0' + sec;
		}
		return sec;
	};

	const findSplitTenths = (fullSplit) => {
		let tenths = 0;
		if (fullSplit) {
			let tenthString = fullSplit.toString();
			for (let i = 0; i < tenthString.length; i++) {
				if (tenthString[i] === '.') {
					tenths = tenthString[i + 1];
				}
			}
		}
		return tenths;
	};

	//Finds date
	const getDate = (date) => {
		let year = date[2] + date[3];
		let month = date[5] + date[6];
		let day = date[8] + date[9];
		return month + '/' + day + '/' + year;
	};

	//Finds full time
	const getTime = (time) => {
		let hours = Math.floor(time / 60 / 60).toString();
		let minutes = (Math.floor(time / 60) - hours * 60).toString();
		if (minutes.length === 1) {
			minutes = '0' + minutes;
		}
		let seconds = Math.floor(time % 60).toString();
		if (seconds.length === 1) {
			seconds = '0' + seconds;
		}
		let tenths = 0;
		if (time) {
			let tenthString = time.toString();
			for (let i = 0; i < tenthString.length; i++) {
				if (tenthString[i] === '.') {
					tenths = tenthString[i + 1];
				}
			}
		}
		if (hours === '0') {
			hours = '';
		} else {
			hours = hours + ':';
		}
		return hours + minutes + ':' + seconds + '.' + tenths;
	};

	//Full Page
	return rowData ? (
		<div>
			{/* Rowing Form */}
			<div className="rowForm">
				<Form onSubmit={(e) => submitRow(e)}>
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
					<Form.Group controlId="rowDate" className="rowDateGroup">
						<Form.Label className="rowDateLabel">Date</Form.Label>
						<DatePicker selected={rowDate} onChange={changeDate} />
					</Form.Group>
					{formSwitch()}
					<span className="errorMessage">{errorMessage}</span>
					<Button block bsSize="large" type="submit" className="rowButton">
						Submit
					</Button>
				</Form>
				<div className="bottomTag">
					<hr className="versionTag" />
					<p>RowLogger v1.0.0</p>
				</div>
			</div>
			{/* Full Rowing Log */}
			<div className="rowLog" id="rowLogger">
				{/* Single Distance Log */}
				<div className="singleDistances">
					<h5>Single Distance Rows</h5>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Distance</th>
								<th>Time</th>
								<th>Split</th>
								<th>SPM</th>
							</tr>
						</thead>
						<tbody>
							{singleDistanceData.map((item) => {
								let min = findSplitMins(item.averageSplit);
								let sec = findSplitSecs(item.averageSplit);
								let tenths = findSplitTenths(item.averageSplit);
								return (
									<tr>
										<td>{item.rowDate}</td>
										<td>{item.rowDistance}</td>
										<td>{getTime(item.rowTime)}</td>
										<td>
											{min}:{sec}.{tenths}
										</td>
										<td>{item.rowSPM}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{/* Single Time Log */}
				<div className="singleTimes">
					<h5>Single Time Rows</h5>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Distance</th>
								<th>Time</th>
								<th>Split</th>
								<th>SPM</th>
							</tr>
						</thead>
						<tbody>
							{singleTimeData.map((item) => {
								let min = findSplitMins(item.averageSplit);
								let sec = findSplitSecs(item.averageSplit);
								let tenths = findSplitTenths(item.averageSplit);
								return (
									<tr>
										<td>{item.rowDate}</td>
										<td>{item.rowDistance}</td>
										<td>{getTime(item.rowTime)}</td>
										<td>
											{min}:{sec}.{tenths}
										</td>
										<td>{item.rowSPM}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{/* Distance Interval Log */}
				<div className="distanceIntervals">
					<h5>Distance Intervals</h5>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Distance</th>
								<th>Time</th>
								<th>Split</th>
								<th>SPM</th>
							</tr>
						</thead>
						<tbody>
							{distanceIntervalData.map((item) => {
								let min = findSplitMins(item.averageSplit);
								let sec = findSplitSecs(item.averageSplit);
								let tenths = findSplitTenths(item.averageSplit);
								return (
									<tr>
										<td>{item.rowDate}</td>
										<td>{item.rowDistance}</td>
										<td>{getTime(item.rowTime)}</td>
										<td>
											{min}:{sec}.{tenths}
										</td>
										<td>{item.rowSPM}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{/* Time Interval Log */}
				<div className="timeIntervals">
					<h5>Time Intervals</h5>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Distance</th>
								<th>Time</th>
								<th>Split</th>
								<th>SPM</th>
							</tr>
						</thead>
						<tbody>
							{timeIntervalData.map((item) => {
								let min = findSplitMins(item.averageSplit);
								let sec = findSplitSecs(item.averageSplit);
								let tenths = findSplitTenths(item.averageSplit);
								return (
									<tr>
										<td>{item.rowDate}</td>
										<td>{item.rowDistance}</td>
										<td>{getTime(item.rowTime)}</td>
										<td>
											{min}:{sec}.{tenths}
										</td>
										<td>{item.rowSPM}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{/* Variable Interval Log */}
				<div className="variableIntervals">
					<h5>Variable Intervals</h5>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Distance</th>
								<th>Time</th>
								<th>Split</th>
								<th>SPM</th>
							</tr>
						</thead>
						<tbody>
							{variableIntervalData.map((item) => {
								let min = findSplitMins(item.averageSplit);
								let sec = findSplitSecs(item.averageSplit);
								let tenths = findSplitTenths(item.averageSplit);
								return (
									<tr>
										<td>{item.rowDate}</td>
										<td>{item.rowDistance}</td>
										<td>{getTime(item.rowTime)}</td>
										<td>
											{min}:{sec}.{tenths}
										</td>
										<td>{item.rowSPM}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	) : (
		<div>loading...</div>
	);
}

export default Home;
