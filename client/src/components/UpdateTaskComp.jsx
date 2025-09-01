import { React, useEffect, useState } from "react";
import { setDoc, db, auth, doc } from "../firebase";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../fontawesome.jsx";

export default function UpdateTaskComp({
  allTasksData,
  taskCurrentID,
  triggerUpdateTaskToggle,
  updateTaskFun,
}) {
  // storing task details by using useState() below
  const [taskSubjUP, setTaskSubjUP] = useState("");
  const [taskDescUP, setTaskDescUP] = useState("");
  const [taskDueDateUP, settaskDueDateUP] = useState("");
  const [task, setTask] = useState({});

  useEffect(() => {
    const currentTask = allTasksData.find(
      (task) => task.taskID === taskCurrentID
    );
    if (currentTask) {
      setTask(currentTask);
      setTaskSubjUP(currentTask.taskSubject || "");
      setTaskDescUP(currentTask.taskDescription || "");
      settaskDueDateUP(currentTask.taskDueDate || "");
    }
  }, []);

  // task updater function below...
  const taskCardUpdater = () => {
    if (taskSubjUP && taskDescUP && taskDueDateUP) {
      // converting date into milliseconds taake tasks to sort kar saken...
      const dateObject = new Date(taskDueDateUP);
      const dateMills = dateObject.getTime();
      const taskCardDataObject = {
        taskSubject: taskSubjUP,
        taskDescription: taskDescUP,
        taskDueDate: taskDueDateUP,
      };
      updateTaskFun(taskCardDataObject);
    }
  };

  return (
    <>
      <div className="handleParent">
        <div className="taskFormParent">
          <div className="crossIconParent">
            <FontAwesomeIcon
              onClick={triggerUpdateTaskToggle}
              icon={icons.cross}
              className="crossIcon"
            />
          </div>
          <div className="inpSubjectParent  tDetailSeparation">
            {/* <button onClick={triggerNewTaskToggle}>X</button> */}
            <p className="taskSubjHeading fieldHeading">Task Subject </p>

            <input
              className="inputFields subjectInp"
              onChange={(e) => setTaskSubjUP(e.target.value)}
              type="text"
              id="subjectInpId"
              placeholder="Enter Task Subject"
              maxLength={14}
              value={taskSubjUP}
            />
          </div>
          <div className="textareaParent tDetailSeparation">
            <p className="taskDescHeading fieldHeading">Task Description</p>

            <textarea
              className="inputFields descriptionTA"
              onChange={(e) => setTaskDescUP(e.target.value)}
              id="descriptionInpId"
              placeholder="Enter Task description"
              maxLength={150}
              value={taskDescUP}
            ></textarea>
          </div>
          <div className="taskDueDateParent tDetailSeparation">
            <p className="taskDDateHeading fieldHeading">Task Due Date</p>

            <input
              className="inputFields taskDueDate"
              onChange={(e) => settaskDueDateUP(e.target.value)}
              type="date"
              id="taskDueDateId"
              value={taskDueDateUP}
            />
          </div>

          <div className="createNewTaskBtnParent">
            <button
              onClick={() => {
                taskCardUpdater();
              }}
              className="createNewTaskBtn"
            >
              Update Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
