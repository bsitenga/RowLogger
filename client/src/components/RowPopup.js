import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RowPopup(props) {
  const [rowDate, setRowDate] = useState(new Date());

  const changeDate = (date) => {
    setRowDate(date);
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
          </Form>
        </div>
        <button onClick={() => props.cancelPopup()}>Cancel</button>
        <button>Submit</button>
      </div>
    </div>
  );
}

export default RowPopup;
