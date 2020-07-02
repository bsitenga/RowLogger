import React, { useState, useEffect, useRef } from "react";
import RowPopup from "./RowPopup";
import FolderPopup from "./FolderPopup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function Home(props) {
  //State
  const [rowType, setRowType] = useState("Single Distance");
  const [rowDate, setRowDate] = useState(new Date());
  const [rowDistance, setRowDistance] = useState("");
  const [rowHours, setRowHours] = useState("");
  const [rowMinutes, setRowMinutes] = useState("");
  const [rowSeconds, setRowSeconds] = useState("");
  const [rowTenths, setRowTenths] = useState("");
  const [rowSPM, setRowSPM] = useState("");
  const [splitMinutes, setSplitMinutes] = useState("");
  const [splitSeconds, setSplitSeconds] = useState("");
  const [splitTenths, setSplitTenths] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rowData, setRowData] = useState([]);
  const [userFolders, setUserFolders] = useState([]);
  const [singleTimeData, setSingleTimeData] = useState([]);
  const [singleDistanceData, setSingleDistanceData] = useState([]);
  const [distanceIntervalData, setDistanceIntervalData] = useState([]);
  const [timeIntervalData, setTimeIntervalData] = useState([]);
  const [variableIntervalData, setVariableIntervalData] = useState([]);
  const [rowNotes, setRowNotes] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFolder, setActiveFolder] = useState("All Folders");
  const [mounted, setMounted] = useState(false);
  const [rowPopup, setRowPopup] = useState(false);
  const [folderPopup, setFolderPopup] = useState(false);

  //On Mount
  useEffect(() => {
    if (!mounted) {
      axios.get("https://rowlogger.herokuapp.com/api/users").then((res) => {
        console.log("grabbing user data...");
        //temporary arrays for row data
        let tempData = [];
        let tempFolders = [];
        //grabs all row data
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].email === props.userEmail) {
            tempData = res.data[i].rows;
            tempFolders = res.data[i].folders;
            setRowData(tempData);
            setUserFolders(tempFolders);
          }
        }
        console.log("grabbed user data");
      });
      setMounted(true);
    }
    console.log("state change");
  }, [rowData, userFolders, activeIndex]);

  //sorts by date in reverse chronological order
  const sortByDate = (arry) => {
    arry.sort(function (a, b) {
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
    setRowHours("");
    setRowMinutes("");
    setRowSeconds("");
    setRowTenths("");
    setRowDate(new Date());
    setRowDistance("");
    setErrorMessage("");
    setRowSPM("");
    setSplitMinutes("");
    setSplitSeconds("");
    setSplitTenths("");
    setRowNotes("");
  };

  //Submits the row form
  const submitRow = async (e) => {
    e.preventDefault();

    //gets the row time in number of seconds
    let rowTime = 0;
    if (rowHours !== "") {
      rowTime += rowHours * 60 * 60;
    }
    if (rowMinutes !== "") {
      rowTime += rowMinutes * 60;
    }
    if (rowSeconds !== "") {
      rowTime += rowSeconds * 1;
    }
    if (rowTenths !== "") {
      rowTime += rowTenths * 0.1;
    }

    //Post req for rows
    if (rowType === "Single Distance" || rowType === "Single Time") {
      if (rowDistance === "") {
        setErrorMessage("Please enter a valid distance");
      } else if (rowTime === 0) {
        setErrorMessage("Please enter a valid time");
      } else {
        let tempAverageSplit = rowTime / (rowDistance / 500);
        let tempDate =
          "" +
          (rowDate.getMonth() + 1) +
          "/" +
          rowDate.getDate() +
          "/" +
          rowDate.getFullYear().toString()[2] +
          rowDate.getFullYear().toString()[3];
        const userRow = {
          email: props.userEmail,
          row: {
            rowDate: tempDate,
            rowType: rowType,
            rowDistance: rowDistance,
            rowTime: rowTime,
            rowSPM: rowSPM,
            averageSplit: tempAverageSplit,
            rowNotes: rowNotes,
          },
        };
        axios
          .post("https://rowlogger.herokuapp.com/api/userrows", userRow)
          .then((res) => {});
        clearForm();
        console.log("Submitted Row!", userRow);
      }
    } else if (
      rowType === "Intervals: Distance" ||
      rowType === "Intervals: Time" ||
      rowType === "Intervals: Variable"
    ) {
      if (rowDistance === "") {
        setErrorMessage("Please enter a valid distance");
      } else if (rowTime === 0) {
        setErrorMessage("Please enter a valid time");
      } else if (
        splitMinutes === "" &&
        splitSeconds === "" &&
        splitTenths === ""
      ) {
        setErrorMessage("Please enter a valid average split");
      } else {
        if (splitMinutes === "") {
          setSplitMinutes(0);
        }
        if (splitSeconds === "") {
          setSplitSeconds(0);
        }
        if (splitTenths === "") {
          setSplitTenths(0);
        }
        let tempAverageSplit =
          Number(splitMinutes) * 60 +
          Number(splitSeconds) +
          Number(splitTenths) * 0.1;
        let tempDate =
          "" +
          (rowDate.getMonth() + 1) +
          "/" +
          rowDate.getDate() +
          "/" +
          rowDate.getFullYear().toString()[2] +
          rowDate.getFullYear().toString()[3];
        const userRow = {
          email: props.userEmail,
          row: {
            rowDate: tempDate,
            rowType: rowType,
            rowDistance: rowDistance,
            rowTime: rowTime,
            rowSPM: rowSPM,
            averageSplit: tempAverageSplit,
          },
        };
        axios
          .post("https://rowlogger.herokuapp.com/api/userrows", userRow)
          .then((res) => {});
        clearForm();
        console.log("Submitted Row!", userRow);
      }
    }
  };

  //Creates the form from components
  const formSwitch = () => {
    if (rowType === "Single Distance" || rowType === "Single Time") {
      return (
        <span>
          {DistanceForm()}
          {TimeForm()}
          {noteForm()}
        </span>
      );
    } else if (
      rowType === "Intervals: Distance" ||
      rowType === "Intervals: Time"
    ) {
      return (
        <span>
          {DistanceForm()}
          {TimeForm()}
          {averageSplitForm()}
          {noteForm()}
        </span>
      );
    } else if (rowType === "Intervals: Variable") {
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
        <Form.Control
          placeholder="meters"
          value={rowDistance}
          onChange={(e) => changeDistance(e)}
        />
      </Form.Group>
    );
  };

  const TimeForm = () => {
    return (
      <span>
        <Form.Group className="rowTimeGroupA">
          <Form.Group className="rowTimeGroupAA">
            <Form.Label>h</Form.Label>
            <Form.Control
              placeholder="hour"
              value={rowHours}
              onChange={(e) => changeHours(e)}
            />
          </Form.Group>
          :
          <Form.Group className="rowTimeGroupAB">
            <Form.Label>mm</Form.Label>
            <Form.Control
              placeholder="mins"
              value={rowMinutes}
              onChange={(e) => changeMinutes(e)}
            />
          </Form.Group>
        </Form.Group>
        :
        <Form.Group className="rowTimeGroupB">
          <Form.Group className="rowTimeGroupBA">
            <Form.Label>ss</Form.Label>
            <Form.Control
              placeholder="secs"
              value={rowSeconds}
              onChange={(e) => changeSeconds(e)}
            />
          </Form.Group>
          .
          <Form.Group className="rowTimeGroupBB">
            <Form.Label>t</Form.Label>
            <Form.Control
              placeholder="tens"
              value={rowTenths}
              onChange={(e) => changeTenths(e)}
            />
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
        <Form.Control
          value={splitMinutes}
          onChange={(e) => changeSplitMinutes(e)}
        />
        :
        <Form.Control
          value={splitSeconds}
          onChange={(e) => changeSplitSeconds(e)}
        />
        .
        <Form.Control
          value={splitTenths}
          onChange={(e) => changeSplitTenths(e)}
        />
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
      sec = "0" + sec;
    }
    return sec;
  };

  const findSplitTenths = (fullSplit) => {
    let tenths = 0;
    if (fullSplit) {
      let tenthString = fullSplit.toString();
      for (let i = 0; i < tenthString.length; i++) {
        if (tenthString[i] === ".") {
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
    return month + "/" + day + "/" + year;
  };

  //Finds full time
  const getTime = (time) => {
    let hours = Math.floor(time / 60 / 60).toString();
    let minutes = (Math.floor(time / 60) - hours * 60).toString();
    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }
    let seconds = Math.floor(time % 60).toString();
    if (seconds.length === 1) {
      seconds = "0" + seconds;
    }
    let tenths = 0;
    if (time) {
      let tenthString = time.toString();
      for (let i = 0; i < tenthString.length; i++) {
        if (tenthString[i] === ".") {
          tenths = tenthString[i + 1];
        }
      }
    }
    if (hours === "0") {
      hours = "";
    } else {
      hours = hours + ":";
    }
    return hours + minutes + ":" + seconds + "." + tenths;
  };

  //Creates Subfolder
  const SubFolder = (props) => {
    const handleFolderClick = () => {
      setActiveIndex(props.index);
      setActiveFolder(props.name);
    };
    return (
      <div onClick={() => handleFolderClick()} className="subFolderWrapper">
        <p className={activeIndex === props.index ? "active" : "inactive"}>
          {props.name}
        </p>
      </div>
    );
  };

  const closeRowPopup = () => {
    setRowPopup(false);
  };

  const closeFolderPopup = () => {
    setFolderPopup(false);
  };

  //Full Page
  return rowData ? (
    <div className="logPage">
      {rowPopup ? (
        <RowPopup
          cancelPopup={() => closeRowPopup()}
          userEmail={props.userEmail}
          rowData={rowData}
          setRowData={setRowData}
        ></RowPopup>
      ) : null}
      {folderPopup ? (
        <FolderPopup cancelPopup={() => closeFolderPopup()}></FolderPopup>
      ) : null}
      <div className="leftTab">
        <div className="allFolders">
          <div className="folderHeader">
            <h3>My Folders</h3>
            <span>Edit</span>
          </div>
          <div className="subFolders">
            <SubFolder name="All Folders" index={0}></SubFolder>
            {userFolders.map((item, ind) => {
              return <SubFolder name={item} index={ind + 1}></SubFolder>;
            })}
            <p className="addFolder" onClick={() => setFolderPopup(true)}>
              Add Folder+
            </p>
          </div>
        </div>
      </div>
      <div className="rightTab">
        <h1>
          {activeFolder}{" "}
          <button onClick={() => setRowPopup(true)}>Add Row+</button>
        </h1>
        <div className="rows">
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
              {rowData.map((item) => {
                if (item.folders.includes(activeFolder)) {
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
                }
              })}
            </tbody>
          </table>
        </div>
        <div className="rowAnalysis"></div>
      </div>
    </div>
  ) : (
    <div className="loadingScreen">loading...</div>
  );
}

export default Home;
