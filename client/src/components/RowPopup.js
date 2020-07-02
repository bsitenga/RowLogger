import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RowPopup(props) {
  const [rowDate, setRowDate] = useState(new Date());
  const [rowDistance, setRowDistance] = useState("");
  const [rowHours, setRowHours] = useState("");
  const [rowMinutes, setRowMinutes] = useState("");
  const [rowSeconds, setRowSeconds] = useState("");
  const [rowTenths, setRowTenths] = useState("");
  const [rowSPM, setRowSPM] = useState("");

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

  return (
    <div className="rowPopup">
      <div className="rowPopupInner">
        <h3>RowPopup</h3>
        <div className="form">
          <Form>
            <Form.Group controlId="rowDate" className="rowDateGroup">
              <Form.Label className="rowDateLabel">Date</Form.Label>
              <DatePicker selected={rowDate} onChange={changeDate} />
            </Form.Group>
            <Form.Group className="rowDistanceGroup">
              <Form.Label>Distance (m)</Form.Label>
              <Form.Control
                placeholder="meters"
                value={rowDistance}
                onChange={(e) => changeDistance(e)}
              />
            </Form.Group>
            <Form.Group className="rowTimeHours">
              <Form.Label>h</Form.Label>
              <Form.Control
                placeholder="hour"
                value={rowHours}
                onChange={(e) => changeHours(e)}
              />
            </Form.Group>
            :
            <Form.Group className="rowTimeMinutes">
              <Form.Label>mm</Form.Label>
              <Form.Control
                placeholder="mins"
                value={rowMinutes}
                onChange={(e) => changeMinutes(e)}
              />
            </Form.Group>
            :
            <Form.Group className="rowTimeSeconds">
              <Form.Label>ss</Form.Label>
              <Form.Control
                placeholder="secs"
                value={rowSeconds}
                onChange={(e) => changeSeconds(e)}
              />
            </Form.Group>
            .
            <Form.Group className="rowTimeTenths">
              <Form.Label>t</Form.Label>
              <Form.Control
                placeholder="tens"
                value={rowTenths}
                onChange={(e) => changeTenths(e)}
              />
            </Form.Group>
            <Form.Group className="rowSPM">
              <Form.Label>SPM</Form.Label>
              <Form.Control value={rowSPM} onChange={(e) => changeSPM(e)} />
            </Form.Group>
          </Form>
        </div>
        <button onClick={() => props.cancelPopup()}>Cancel</button>
        <button>Submit</button>
      </div>
    </div>
  );
}

export default RowPopup;
