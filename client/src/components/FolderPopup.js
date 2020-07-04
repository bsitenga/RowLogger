import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

function FolderPopup(props) {
  const [folderName, setFolderName] = useState("");

    const submitFolder = (e) => {
        e.preventDefault();
        
    }

  return (
    <div className="rowPopup folderPopup">
      <div className="rowPopupInner">
        <h3>Add Folder+</h3>
        <Form onSubmit={(e) => submitFolder(e)}>
        <Form.Group className="rowDistanceGroup">
            <Form.Label>Folder Name<span style={{color: "red"}}>*</span></Form.Label>
            <Form.Control
              placeholder="Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </Form.Group>
          <button className="rowSubmit" type="submit">Submit</button>
          <p className="rowCancel" onClick={() => props.cancelPopup()}>Cancel</p>
        </Form>
      </div>
    </div>
  );
}

export default FolderPopup;
