import { React, useState } from "react";
import { setDoc, db, auth, doc } from "../firebase";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../fontawesome.jsx";

export default function DeleteTaskPopup({ triggerDeleteTask, deleteTaskFun }) {
  return (
    <>
      <div className="handleParent">
        <div className="taskFormParent">
          <div className="taskDelConfirmBtnParent">
            <button
              onClick={deleteTaskFun}
              className="confirm deleteConfirmBtn"
            >
              Delete
            </button>
            <button
              onClick={triggerDeleteTask}
              className="confirm closeConfirmBtn"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
