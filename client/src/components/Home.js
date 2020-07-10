import React, { useState, useEffect, useRef } from "react";
import RowPopup from "./RowPopup";
import FolderPopup from "./FolderPopup";
import axios from "axios";

function Home(props) {
  //State
  const [rowData, setRowData] = useState([]);
  const [userFolders, setUserFolders] = useState([]);
  const [userPremium, setUserPremium] = useState("");
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
        let tempUserPremium = 0;
        //grabs all row data
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].email === props.userEmail) {
            tempData = res.data[i].rows;
            tempFolders = res.data[i].folders;
            tempUserPremium = res.data[i].pro;
            sortByDate(tempData);
            setUserPremium(tempUserPremium);
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

  //Split Finding Functions
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
          sortByDate={sortByDate}
        ></RowPopup>
      ) : null}
      {folderPopup ? (
        <FolderPopup
          numFolders={userFolders.length}
          userPremium={userPremium}
          cancelPopup={() => closeFolderPopup()}
          userFolders={userFolders}
          setUserFolders={setUserFolders}
        ></FolderPopup>
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
                    <>
                      <tr>
                        <td>{item.rowDate}</td>
                        <td>{item.rowDistance}</td>
                        <td className="middleCell">{getTime(item.rowTime)}</td>
                        <td>
                          {min}:{sec}.{tenths}
                        </td>
                        <td>{item.rowSPM}</td>
                      </tr>
                    </>
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
