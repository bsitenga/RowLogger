import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function FullHistory(props) {
	//State
	const [ rowData, setRowData ] = useState([]);
	const [ singleTimeData, setSingleTimeData ] = useState([]);
	const [ singleDistanceData, setSingleDistanceData ] = useState([]);
	const [ distanceIntervalData, setDistanceIntervalData ] = useState([]);
	const [ timeIntervalData, setTimeIntervalData ] = useState([]);
  const [ variableIntervalData, setVariableIntervalData ] = useState([]);
  const [ rowTypes, setRowTypes ] = useState('all rows');
	const [ sortBy, setSortBy ] = useState('date');
  const [ order, setOrder ] = useState('descending');

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
				if (!sortBy || sortBy === 'date') {
					if (!order || order === 'descending') {
						sortByDate(tempData, 'descending');
					} else if (order === 'ascending') {
						sortByDate(tempData, 'ascending');
					} 
				} else if (sortBy === 'distance') {
          if (!order || order === 'descending') {
            sortByDistance(tempData, 'descending');
          } else if (order === 'ascending') {
            sortByDistance(tempData, 'ascending');
          }
        } else if (sortBy === 'time') {
          if (!order || order === 'descending') {
            sortByTime(tempData, 'descending');
          } else if (order === 'ascending') {
            sortByTime(tempData, 'ascending');
          }
        } else if (sortBy === 'average split') {
          if (!order || order === 'descending') {
            sortBySplit(tempData, 'descending');
          } else if (order === 'ascending') {
            sortBySplit(tempData, 'ascending');
          }
        }
        setRowData(tempData);
        
        //sorts types by date
				sortByDate(tempSingleDistanceData, 'descending');
				sortByDate(tempSingleTimeData, 'descending');
				sortByDate(tempDistanceIntervalData, 'descending');
				sortByDate(tempTimeIntervalData, 'descending');
				sortByDate(tempVariableIntervalData, 'descending');

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

	//sorts by date
	const sortByDate = (arry, direction) => {
		arry.sort(function(a, b) {
			a = a.rowDate.slice(0, 10).split('-').join('');
			b = b.rowDate.slice(0, 10).split('-').join('');
			if (direction === 'ascending') {
				return a.localeCompare(b);
			} else if (direction === 'descending') {
        return b.localeCompare(a);
      }
			return .5 - Math.random();
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
			return .5 - Math.random();
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
			return .5 - Math.random();
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
			return .5 - Math.random();
		});
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
      Show me
      <DropdownButton id="dropdown-basic-button" title={rowTypes}>
				<Dropdown.Item onClick={() => setRowTypes('all rows')}>all rows</Dropdown.Item>
				<Dropdown.Item onClick={() => setRowTypes('single distances')}>single distances</Dropdown.Item>
				<Dropdown.Item onClick={() => setRowTypes('single times')}>single times</Dropdown.Item>
        <Dropdown.Item onClick={() => setRowTypes('distance intervals')}>distance intervals</Dropdown.Item>
				<Dropdown.Item onClick={() => setRowTypes('time intervals')}>time intervals</Dropdown.Item>
        <Dropdown.Item onClick={() => setRowTypes('variable intervals')}>variable intervals</Dropdown.Item>
			</DropdownButton>
      sorted by
			<DropdownButton id="dropdown-basic-button" title={sortBy}>
				<Dropdown.Item onClick={() => setSortBy('date')}>date</Dropdown.Item>
				<Dropdown.Item onClick={() => setSortBy('distance')}>distance</Dropdown.Item>
				<Dropdown.Item onClick={() => setSortBy('time')}>time</Dropdown.Item>
        <Dropdown.Item onClick={() => setSortBy('average split')}>average split</Dropdown.Item>
			</DropdownButton>
      in
			<DropdownButton id="dropdown-basic-button" title={order}>
				<Dropdown.Item onClick={() => setOrder('ascending')}>ascending</Dropdown.Item>
				<Dropdown.Item onClick={() => setOrder('descending')}>descending</Dropdown.Item>
			</DropdownButton>
      order
			{rowData.map((row) => {
				return (
					<p>
						{getDate(row.rowDate)} {row.rowDistance} {row.rowTime} {row.averageSplit}
					</p>
				);
			})}
		</div>
	);
}

export default FullHistory;
