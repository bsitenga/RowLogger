import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function FullHistory(props) {
	//State
	const [ allData, setAllData ] = useState([]);
	const [ rowData, setRowData ] = useState([]);
	const [ rowTypes, setRowTypes ] = useState('all rows');
	const [ sortBy, setSortBy ] = useState('date');
	const [ order, setOrder ] = useState('descending');

	//On Mount
	useEffect(() => {
		axios.get('http://localhost:5000/api/userrows').then((res) => {
			//temporary array for row data
			let tempData = [];

			//grabs all row data
			for (let i = 0; i < res.data.length; i++) {
				if (res.data[i].email === props.userEmail) {
          tempData = res.data[i].rows;
          sortByDate(tempData, 'descending');
					setRowData(tempData);
					setAllData(tempData);
				}
			}
		});
	}, []);

	//master sorting function
	const sortFunction = (sortType, sortOrder, rowType) => {
		//set state for sorting
		setSortBy(sortType);
		setOrder(sortOrder);
		setRowTypes(rowType);

		//filters the row data by category
		let tempData = [];
		for (let i = 0; i < allData.length; i++) {
			if (rowType === 'all rows') {
				tempData.push(allData[i]);
			} else if (rowType === 'single distances') {
				if (allData[i].rowType === 'Single Distance') {
					tempData.push(allData[i]);
				}
			} else if (rowType === 'single times') {
				if (allData[i].rowType === 'Single Time') {
					tempData.push(allData[i]);
				}
			} else if (rowType === 'distance intervals') {
				if (allData[i].rowType === 'Intervals: Distance') {
					tempData.push(allData[i]);
				}
			} else if (rowType === 'time intervals') {
				if (allData[i].rowType === 'Intervals: Time') {
					tempData.push(allData[i]);
				}
			} else if (rowType === 'variable intervals') {
				if (allData[i].rowType === 'Intervals: Variable') {
					tempData.push(allData[i]);
				}
			}
		}

		//sorts the row data by sorting type and ordering
		if (!sortType || sortType === 'date') {
			if (!sortOrder || sortOrder === 'descending') {
				sortByDate(tempData, 'descending');
			} else if (sortOrder === 'ascending') {
				sortByDate(tempData, 'ascending');
			}
		} else if (sortType === 'distance') {
			if (!sortOrder || sortOrder === 'descending') {
				sortByDistance(tempData, 'descending');
			} else if (sortOrder === 'ascending') {
				sortByDistance(tempData, 'ascending');
			}
		} else if (sortType === 'time') {
			if (!sortOrder || sortOrder === 'descending') {
				sortByTime(tempData, 'descending');
			} else if (sortOrder === 'ascending') {
				sortByTime(tempData, 'ascending');
			}
		} else if (sortType === 'average split') {
			if (!sortOrder || sortOrder === 'descending') {
				sortBySplit(tempData, 'descending');
			} else if (sortOrder === 'ascending') {
				sortBySplit(tempData, 'ascending');
			}
		}

		//sets the state for sorted and filtered row data
		setRowData(tempData);
	};

	//sorts by date
	const sortByDate = (arry, direction) => {
		arry.sort(function(a, b) {
			if (direction === 'ascending') {
				return new Date(a.rowDate) - new Date(b.rowDate);
			} else if (direction === 'descending') {
				return new Date(b.rowDate) - new Date(a.rowDate);
			}
			return 0.5 - Math.random();
		});
	};

	//sorts by distance
	const sortByDistance = (arry, direction) => {
		arry.sort(function(a, b) {
			a = Number(a.rowDistance);
			b = Number(b.rowDistance);
			if (direction === 'ascending') {
				return a - b;
			} else if (direction === 'descending') {
				return b - a;
			}
			return 0.5 - Math.random();
		});
	};

	//sorts by time
	const sortByTime = (arry, direction) => {
		arry.sort(function(a, b) {
			a = Number(a.rowTime);
			b = Number(b.rowTime);
			if (direction === 'ascending') {
				return a - b;
			} else if (direction === 'descending') {
				return b - a;
			}
			return 0.5 - Math.random();
		});
	};

	//sorts by split
	const sortBySplit = (arry, direction) => {
		arry.sort(function(a, b) {
			a = Number(a.averageSplit);
			b = Number(b.averageSplit);
			if (direction === 'ascending') {
				return a - b;
			} else if (direction === 'descending') {
				return b - a;
			}
			return 0.5 - Math.random();
		});
	};

	//gets date from date string
	const getDate = (date) => {
		let year = date[2] + date[3];
		let month = date[5] + date[6];
		let day = date[8] + date[9];
		return month + '/' + day + '/' + year;
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

	return rowData ? (
		<div>
			<div className="sortingLine">
				<span>Show me</span>
				<span className="orderButton">
					<DropdownButton id="dropdown-basic-button" title={rowTypes}>
						<Dropdown.Item onClick={() => sortFunction(sortBy, order, 'all rows')}>all rows</Dropdown.Item>
						<Dropdown.Item onClick={() => sortFunction(sortBy, order, 'single distances')}>
							single distances
						</Dropdown.Item>
						<Dropdown.Item onClick={() => sortFunction(sortBy, order, 'single times')}>
							single times
						</Dropdown.Item>
						<Dropdown.Item onClick={() => sortFunction(sortBy, order, 'distance intervals')}>
							distance intervals
						</Dropdown.Item>
						<Dropdown.Item onClick={() => sortFunction(sortBy, order, 'time intervals')}>
							time intervals
						</Dropdown.Item>
						<Dropdown.Item onClick={() => sortFunction(sortBy, order, 'variable intervals')}>
							variable intervals
						</Dropdown.Item>
					</DropdownButton>
				</span>
				<span>sorted by</span>
				<span className="orderButton">
					<DropdownButton id="dropdown-basic-button" title={sortBy}>
						<Dropdown.Item onClick={() => sortFunction('date', order, rowTypes)}>date</Dropdown.Item>
						<Dropdown.Item onClick={() => sortFunction('distance', order, rowTypes)}>
							distance
						</Dropdown.Item>
						<Dropdown.Item onClick={() => sortFunction('time', order, rowTypes)}>time</Dropdown.Item>
						<Dropdown.Item onClick={() => sortFunction('average split', order, rowTypes)}>
							average split
						</Dropdown.Item>
					</DropdownButton>
				</span>
				<span>in</span>
				<span className="orderButton">
					<DropdownButton id="dropdown-basic-button" title={order}>
						<Dropdown.Item onClick={() => sortFunction(sortBy, 'ascending', rowTypes)}>
							ascending
						</Dropdown.Item>
						<Dropdown.Item onClick={() => sortFunction(sortBy, 'descending', rowTypes)}>
							descending
						</Dropdown.Item>
					</DropdownButton>
				</span>
				<span>order</span>
			</div>
			<div className="fullHistory">
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Distance</th>
							<th>Time</th>
							<th>Split</th>
							<th>SPM</th>
              <th>Notes</th>
						</tr>
					</thead>
					<tbody>
						{rowData.map((item) => {
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
              <td>{item.rowNotes}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	) : (
		<div>loading...</div>
	);
}

export default FullHistory;
