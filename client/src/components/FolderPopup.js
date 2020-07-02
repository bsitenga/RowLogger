import React, { useState, useEffect } from "react";

function FolderPopup(props) {
    return (<div className="rowPopup">
        <div className = "rowPopupInner">
            <h1>FolderPopup</h1>
            <button onClick={() => props.cancelPopup()}>Cancel</button>
            <button>Submit</button>
        </div>
    </div>)
} 

export default FolderPopup