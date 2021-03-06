import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function RowPopup(props) {
  const [rowDate, setRowDate] = useState(new Date());
  const [rowDistance, setRowDistance] = useState("");
  const [rowHours, setRowHours] = useState("");
  const [rowMinutes, setRowMinutes] = useState("");
  const [rowSeconds, setRowSeconds] = useState("");
  const [rowTenths, setRowTenths] = useState("");
  const [rowSPM, setRowSPM] = useState("");
  const [rowNotes, setRowNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const changeDate = (date) => {
    setRowDate(date);
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
    if (!isNaN(e.target.value) && e.target.value.toString().length < 3) {
      setRowMinutes(e.target.value);
    }
  };

  const changeSeconds = (e) => {
    if (!isNaN(e.target.value) && e.target.value.toString().length < 3) {
      setRowSeconds(e.target.value);
    }
  };

  const changeTenths = (e) => {
    if (!isNaN(e.target.value) && e.target.value.toString().length < 2) {
      setRowTenths(e.target.value);
    }
  };

  const changeSPM = (e) => {
    if (!isNaN(e.target.value)) {
      setRowSPM(e.target.value);
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
      let tempFolders = ["All Folders"];
      const userRow = {
        email: props.userEmail,
        row: {
          rowDate: tempDate,
          rowDistance: rowDistance,
          rowTime: rowTime,
          rowSPM: rowSPM,
          averageSplit: tempAverageSplit,
          rowNotes: rowNotes,
          folders: tempFolders,
        },
      };
      axios
        .post("https://rowlogger.herokuapp.com/api/userrows", userRow)
        .then((res) => {});
      clearForm();
      console.log("Submitted Row!", userRow);
      let tempRows = props.rowData;
      tempRows.push(userRow.row);
      props.sortByDate(tempRows);
      props.setRowData(tempRows);
      props.cancelPopup();
    }
  };

  return (
    <div className="rowPopup">
      <div className="rowPopupInner">
        <h3>Add Row+</h3>
        <Form onSubmit={(e) => submitRow(e)}>
          <Form.Group controlId="rowDate" className="rowDateGroup">
            <span className="dateLabel">Date<span style={{color: "red"}}>*</span></span>
            <DatePicker selected={rowDate} onChange={changeDate} />
          </Form.Group>
          <Form.Group className="rowDistanceGroup">
            <Form.Label>Distance (m)<span style={{color: "red"}}>*</span></Form.Label>
            <Form.Control
              placeholder="meters"
              value={rowDistance}
              onChange={(e) => changeDistance(e)}
            />
          </Form.Group>
          <Form.Group className="rowTimeHours">
            <Form.Label>Total Time<span style={{color: "red"}}>*</span></Form.Label>
            <Form.Control
              placeholder="h"
              value={rowHours}
              onChange={(e) => changeHours(e)}
            />
          </Form.Group>
          :
          <Form.Group className="rowTimeMinutes">
            <Form.Control
              placeholder="mm"
              value={rowMinutes}
              onChange={(e) => changeMinutes(e)}
            />
          </Form.Group>
          :
          <Form.Group className="rowTimeSeconds">
            <Form.Control
              placeholder="ss"
              value={rowSeconds}
              onChange={(e) => changeSeconds(e)}
            />
          </Form.Group>
          .
          <Form.Group className="rowTimeTenths">
            <Form.Control
              placeholder="t"
              value={rowTenths}
              onChange={(e) => changeTenths(e)}
            />
          </Form.Group>
          <Form.Group className="rowSPM">
            <Form.Label>SPM</Form.Label>
            <Form.Control value={rowSPM} onChange={(e) => changeSPM(e)} />
          </Form.Group>
          <Form.Group className="rowNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control value={rowNotes} onChange={(e) => changeNotes(e)} />
          </Form.Group>
          <button className="rowSubmit" type="submit">Submit</button>
          <p className="rowCancel" onClick={() => props.cancelPopup()}>Cancel</p>
        </Form>
      </div>
    </div>
  );
}

export default RowPopup;
