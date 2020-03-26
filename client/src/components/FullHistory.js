import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FullHistory(props) {
	//State
	const [ rowData, setRowData ] = useState([]);
	const [ singleTimeData, setSingleTimeData ] = useState([]);
	const [ singleDistanceData, setSingleDistanceData ] = useState([]);
	const [ distanceIntervalData, setDistanceIntervalData ] = useState([]);
	const [ timeIntervalData, setTimeIntervalData ] = useState([]);
	const [ variableIntervalData, setVariableIntervalData ] = useState([]);
	const [ dateSorter, setDateSorter ] = useState('↓');
	const [ distanceSorter, setDistanceSorter ] = useState('●');

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
						setRowData(res.data[i].rows);
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
				if (!dateSorter || dateSorter === '↓') {
					sortByDate(tempData, 'descending');
					setRowData(tempData);
				} else if (dateSorter === '↑') {
					sortByDate(tempData, 'ascending');
				}
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
				console.log('rowData', rowData);
			});
		},
		[ rowData ]
	);

	//sorts by date in reverse chronological order
	const sortByDate = (arry, direction) => {
		arry.sort(function(a, b) {
			a = a.rowDate.slice(0, 10).split('-').join('');
			b = b.rowDate.slice(0, 10).split('-').join('');
			if (direction === 'ascending') {
				return a.localeCompare(b);
			}
			return b.localeCompare(a);
		});
	};

	const sortByDistance = (arry) => {};

	//changes sorting order
	const changeDate = () => {
		if (dateSorter === '↑' || dateSorter === '●') {
			setDateSorter('↓');
		} else {
			setDateSorter('↑');
		}
	};

	//gets date from date string
	const getDate = (date) => {
		let year = date[2] + date[3];
		let month = date[5] + date[6];
		let day = date[8] + date[9];
		return month + '/' + day + '/' + year;
	};

	return (
		<div>
			Full History
			<div>
				Date <button onClick={changeDate}>{dateSorter}</button>
			</div>
			{rowData.map((row) => {
				return (
					<p>
						{getDate(row.rowDate)} {row.rowDistance}
					</p>
				);
			})}
		</div>
	);
}

export default FullHistory;
