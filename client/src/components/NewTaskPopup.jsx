import { React, useState } from "react";
import { setDoc, db, auth, doc } from "../firebase";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../fontawesome.jsx";

export default function NewTaskPopup({ triggerNewTaskToggle, taskCardData }) {
  // storing task details by using useState() below
  const [taskSubj, setTaskSubj] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDueDate, settaskDueDate] = useState("");

  // new task creator function below...
  const taskCardCreator = () => {
    if (taskSubj && taskDesc && taskDueDate) {
      console.log("task subject ==>", taskSubj);
      console.log("task description ==>", taskDesc);
      console.log("task due date ==>", taskDueDate);

      // converting date into milliseconds taake tasks to sort kar saken...
      const dateObject = new Date(taskDueDate);
      const dateMills = dateObject.getTime();
      console.log(dateMills);
      const taskCardDataObject = {
        taskSubject: taskSubj,
        taskDescription: taskDesc,
        taskDueDate: taskDueDate,
      };
      taskCardData(taskCardDataObject);
    }
  };

  return (
    <>
      <div className="handleParent">
        <div className="taskFormParent">
          <div className="crossIconParent">
            <FontAwesomeIcon
              onClick={triggerNewTaskToggle}
              icon={icons.cross}
              className="crossIcon"
            />
          </div>
          <div className="inpSubjectParent tDetailSeparation">
            {/* <button onClick={triggerNewTaskToggle}>X</button> */}
            <p className="taskSubjHeading fieldHeading">Task Subject </p>

            <input
              className="inputFields subjectInp"
              onChange={(e) => setTaskSubj(e.target.value)}
              type="text"
              id="subjectInpId"
              placeholder="Enter Task Subject"
              maxLength={14}
            />
          </div>
          <div className="textareaParent tDetailSeparation">
            <p className="taskDescHeading fieldHeading">Task Description</p>

            <textarea
              className="inputFields descriptionTA"
              onChange={(e) => setTaskDesc(e.target.value)}
              id="descriptionInpId"
              placeholder="Enter Task description"
              maxLength={150}
            ></textarea>
          </div>
          <div className="taskDueDateParent tDetailSeparation">
            <p className="taskDDateHeading fieldHeading">Task Due Date</p>

            <input
              className="inputFields taskDueDate"
              onChange={(e) => settaskDueDate(e.target.value)}
              type="date"
              id="taskDueDateId"
            />
          </div>

          <div className="createNewTaskBtnParent">
            <button
              onClick={() => {
                taskCardCreator();
              }}
              className="createNewTaskBtn"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
