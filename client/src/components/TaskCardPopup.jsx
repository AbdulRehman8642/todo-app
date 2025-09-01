import { React, useState, useEffect } from "react";
import { setDoc, db, auth, doc } from "../firebase";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../fontawesome.jsx";

export default function TaskCardPopup({
  triggerTaskOpenerToggle,
  allTasksData,
  taskCurrentID,
  updateTaskFun,
}) {
  // storing task details by using useState() below
  const [taskSubj, setTaskSubj] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDueDate, settaskDueDate] = useState("");
  const [task, setTask] = useState({});
  const [isTO_edit, setIsTO_edit] = useState(false);

  useEffect(() => {
    const currentTask = allTasksData.find(
      (task) => task.taskID === taskCurrentID
    );
    if (currentTask) {
      setTask(currentTask);
      setTaskSubj(currentTask.taskSubject || "");
      setTaskDesc(currentTask.taskDescription || "");
      settaskDueDate(currentTask.taskDueDate || "");
    }
  }, []);

  const triggerTO_edit = () => {
    setIsTO_edit(!isTO_edit);
  };

  // task updater function below...
  const taskCardUpdater = () => {
    if (taskSubj && taskDesc && taskDueDate) {
        
      // converting date into milliseconds taake tasks to sort kar saken...
      const dateObject = new Date(taskDueDate);
      const dateMills = dateObject.getTime();
      const taskCardDataObject = {
        taskSubject: taskSubj,
        taskDescription: taskDesc,
        taskDueDate: taskDueDate,
      };
      updateTaskFun(taskCardDataObject);
    }
  };

  return (
    <>
      <div className="handleParent">
        <div className="taskFormParent taskCard">
          {/* <p onClick={triggerTaskOpenerToggle}>yu</p> */}

          <div className="topRightIconsParent">
            <div className="topRightIcons TO_crossIconParent">
              <FontAwesomeIcon
                onClick={triggerTaskOpenerToggle}
                icon={icons.cross}
                className="TO_crossIcon TO_icon"
              />
            </div>
            <div className="topRightIcons penIconParent">
              <FontAwesomeIcon
                onClick={triggerTO_edit}
                icon={icons.pen}
                className="TO_penIcon TO_icon"
              />
            </div>
          </div>

          <div className="taskOpenDetails">
            <div className="taskOpenSubjParent">
              <p className="TO_heading">Subject</p>

              {/* <p className="taskOpenSubj" onClick={triggerTaskOpenerToggle}>
                {taskSubj}
              </p> */}

              {isTO_edit === false && (
                <input
                  readOnly
                  value={taskSubj}
                  type="text"
                  className="taskOpenSubj"
                />
              )}

              {isTO_edit && (
                <input
                  onChange={(e) => setTaskSubj(e.target.value)}
                  value={taskSubj}
                  type="text"
                  className="taskOpenSubj"
                  maxLength={14}
                />
              )}
            </div>

            <div className="taskOpenDescParent">
              <p className="TO_heading">Description</p>

              {isTO_edit === false && (
                <textarea
                  readOnly
                  value={taskDesc}
                  className="taskOpenDesc"
                ></textarea>
              )}

              {isTO_edit && (
                <textarea
                  onChange={(e) => setTaskDesc(e.target.value)}
                  value={taskDesc}
                  className="taskOpenDesc"
                  maxLength={150}
                ></textarea>
              )}
            </div>

            <div className="taskOpenDDateParent">
              <p className="TO_heading">Due Date</p>

              {isTO_edit === false && (
                <input
                  readOnly
                  value={taskDueDate}
                  type="date"
                  className="taskOpenDDate"
                />
              )}

              {isTO_edit && (
                <input
                  onChange={(e) => settaskDueDate(e.target.value)}
                  value={taskDueDate}
                  type="date"
                  className="taskOpenDDate"
                />
              )}
            </div>
          </div>
          {isTO_edit && (
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
          )}
        </div>
      </div>
    </>
  );
}
