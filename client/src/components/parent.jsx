import { useState, useEffect } from "react";
import "../App.css";
import NewTaskPopup from "./NewTaskPopup.jsx";
import UpdateTaskComp from "./UpdateTaskComp.jsx";
import Signup from "./Signup.jsx";
import Swal from "sweetalert2";
import TaskCardPopup from "./TaskCardPopup.jsx";
import {
  setDoc,
  db,
  auth,
  doc,
  getDoc,
  getDocs,
  collection,
  onAuthStateChanged,
  updateDoc,
  deleteDoc,
  signOut,
} from "../firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../fontawesome.jsx";
import DeleteTaskPopup from "./deleteTaskPopup.jsx";
import ShowProfile from "./ShowProfile.jsx";

export default function Parent() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isNewTask, setIsNewTask] = useState(false);
  const [isUpdateTask, setIsUpdateTask] = useState(false);
  const [isDeleteTask, setIsDeleteTask] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [whichTasks, setWhichTasks] = useState("all");
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isShowProfile, setIsShowProfile] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is signed in and uid is ==>", user.uid);
        setIsSignedIn(true);
        getTasksData();
        getUserData();
      } else {
        setIsSignedIn(false);
        console.log(isSignedIn);
        console.log("user is not signed in");
      }
    });
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      getTasksData();
    }
  }, [whichTasks]);

  // ---

  const newTaskToggle = () => {
    setIsNewTask(!isNewTask);
  };

  const [taskCards, setTaskCards] = useState([]);

  const receivedTaskData = async (data) => {
    setIsNewTask(!isNewTask);
    Swal.fire({
      position: "center",
      // icon: "success",
      title: "New Task has been created",
      showConfirmButton: false,
      timer: 900,
    });
    const dueDateObject = new Date(data.taskDueDate);
    const dueDateMills = dueDateObject.getTime();
    const docRef = doc(db, "user", auth.currentUser.uid);
    const newTaskCollectionRef = doc(collection(docRef, "tasks"));
    await setDoc(newTaskCollectionRef, {
      taskID: newTaskCollectionRef.id,
      taskSubject: data.taskSubject,
      taskDescription: data.taskDescription,
      taskDueDate: data.taskDueDate,
      taskDueDateMills: dueDateMills,
      taskStatus: "incomplete",
    });
    getTasksData();
  };

  //
  // SEPARATION
  // getting user data

  const getUserData = async () => {
    const docRef = doc(db, "user", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      console.log(docData);
      setUsername(docData.name);
    }
  };

  //
  // SEPARATION
  const getTasksData = async () => {
    const docRef = doc(db, "user", auth.currentUser.uid);
    const tasksCollectionRef = collection(docRef, "tasks");
    const docSnap = await getDoc(docRef);
    const tasksDocSnap = await getDocs(tasksCollectionRef);
    const dataCollectingArray = [];
    if (docSnap.exists()) {
      tasksDocSnap.forEach((doc) => {
        dataCollectingArray.push(doc.data());
      });

      const completedTasks = dataCollectingArray.filter(
        (task) => task.taskStatus === "completed"
      );

      setIsCompleteArr(completedTasks.map((task) => task.taskID));

      const remainingTasks = dataCollectingArray.filter(
        (task) => task.taskStatus === "incomplete"
      );

      if (whichTasks === "all") {
        setTaskCards(dataCollectingArray);
      }

      if (whichTasks === "completed") {
        setTaskCards(completedTasks);
      }

      if (whichTasks === "remaining") {
        setTaskCards(remainingTasks);
      }
    } else {
      console.log("No such document!");
    }
  };

  //Task Description Shortener Function
  const taskDescShortener = (desc) => {
    if (desc && desc.length > 14) {
      const shortDesc = desc.slice(0, 20) + "...";
      return shortDesc;
    } else {
      return desc;
    }
  };

  //
  // SEPARATION
  const [currentTaskID, setCurrentTaskID] = useState(0);
  const updateTaskToggle = (id) => {
    setIsUpdateTask(!isUpdateTask);
    setCurrentTaskID(id);
  };
  const receivedUpdateTaskFun = async (data) => {
    setIsUpdateTask(!isUpdateTask);
    Swal.fire({
      position: "center",
      // icon: "success",
      title: "Task has been updated",
      showConfirmButton: false,
      timer: 900,
    });
    const TaskDocRef = doc(
      db,
      "user",
      auth.currentUser.uid,
      "tasks",
      currentTaskID
    );
    await updateDoc(TaskDocRef, {
      taskSubject: data.taskSubject,
      taskDescription: data.taskDescription,
      taskDueDate: data.taskDueDate,
    });
    getTasksData();
  };

  const deleteTaskToggle = (id) => {
    setIsDeleteTask(!isDeleteTask);
    setCurrentTaskID(id);
  };
  const deleteTask = async () => {
    setIsDeleteTask(!isDeleteTask);
    const TaskDocRef = doc(
      db,
      "user",
      auth.currentUser.uid,
      "tasks",
      currentTaskID
    );
    await deleteDoc(TaskDocRef);
    getTasksData();
  };

  const [isCompleteArr, setIsCompleteArr] = useState([]);

  const completeTask = async (id, status) => {
    const TaskDocRef = doc(db, "user", auth.currentUser.uid, "tasks", id);
    if (status === "incomplete") {
      setIsCompleteArr((prev) => [...prev, id]);
      await updateDoc(TaskDocRef, {
        taskStatus: "completed",
      });
    } else {
      setIsCompleteArr((prev) =>
        prev.filter((conditionalId) => conditionalId !== id)
      );
      await updateDoc(TaskDocRef, {
        taskStatus: "incomplete",
      });
    }
    getTasksData();
  };

  const triggerSignup = () => {
    setIsSignup(!isSignup);
  };

  // Logout
  const logout = () => {
    signOut(auth)
      .then(() => {
        setIsSignedIn(false);
        setTaskCards([]);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  // Separation
  // Task card opener
  // Task card opener

  const taskOpenerToggle = (id) => {
    setIsTaskOpen(!isTaskOpen);
    setCurrentTaskID(id);
  };

  const triggerShowProfile = () => {
    setIsShowProfile(!isShowProfile);
  };

  return (
    <>
      <div className="parent">
        <nav className="navbar">
          <div className="navItemsParent">
            <div
              onClick={() => setWhichTasks("all")}
              className={`navItem ${whichTasks === "all" ? "allTaskNav" : ""}`}
            >
              All Tasks
            </div>
            <div
              onClick={() => setWhichTasks("completed")}
              className={`navItem ${
                whichTasks === "completed" ? "compTaskNav" : ""
              }`}
            >
              completed Tasks
            </div>
            <div
              onClick={() => setWhichTasks("remaining")}
              className={`navItem ${
                whichTasks === "remaining" ? "remainTaskNav" : ""
              }`}
            >
              Remaining Tasks
            </div>
          </div>
          {!isSignedIn && (
            <div className="signUpBtnParent">
              <div onClick={triggerSignup} className="signUpBtn navItem">
                Signup
              </div>
            </div>
          )}

          {isSignedIn && (
            <div className="signUpBtnParent">
              <div onClick={triggerShowProfile} className="signUpBtn navItem">
                {username}
                {!isShowProfile && <FontAwesomeIcon icon={icons.chevronDown} />}
                {isShowProfile && <FontAwesomeIcon icon={icons.chevronUp} />}
              </div>
              {isShowProfile && (
                <ShowProfile
                  triggerShowProfileFun={triggerShowProfile}
                  logoutFun={logout}
                />
              )}
            </div>
          )}
        </nav>

        <div className="bodyParent">
          <div className="newTaskParent">
            <button onClick={newTaskToggle} className="newTaskBtn">
              <FontAwesomeIcon icon={icons.plus} className="plusIcon" />
            </button>
          </div>
          <div className="taskCardsParent">
            {taskCards.map((data) => {
              return (
                <div
                  className={`task ${
                    isCompleteArr.includes(data.taskID) ? "completedTask" : ""
                  }`}
                  key={data.taskID}
                >
                  <div className="subjectParent">
                    <h2
                      onClick={() => taskOpenerToggle(data.taskID)}
                      className="taskSubj"
                    >
                      {data.taskSubject}
                    </h2>

                    <div className="topRightIcons">
                      {/* circle hollow Icon */}
                      {!isCompleteArr.includes(data.taskID) && (
                        <FontAwesomeIcon
                          onClick={() => {
                            completeTask(data.taskID, data.taskStatus);
                            // taskIconChanger();
                          }}
                          icon={icons.hollowCircle}
                          className="checkIcon hollowCircle"
                        />
                      )}

                      {/* circle Check Icon */}
                      {isCompleteArr.includes(data.taskID) && (
                        <FontAwesomeIcon
                          onClick={() => {
                            completeTask(data.taskID, data.taskStatus);
                            // taskIconChanger();
                          }}
                          icon={icons.checkCircle}
                          className="checkIcon checkCircle"
                        />
                      )}
                    </div>
                  </div>
                  <div className="descriptionParent">
                    <p className="taskDesc">
                      {taskDescShortener(data.taskDescription)}
                    </p>
                  </div>
                  <div className="dateParent">
                    <p className="dDDateHeading">Due Date:</p>
                    <p className="dDDate">{data.taskDueDate}</p>
                  </div>
                  <div className="upDelBtnContainer">
                    <button
                      onClick={() => updateTaskToggle(data.taskID)}
                      className={`upDelBtn updateTask ${
                        isCompleteArr.includes(data.taskID)
                          ? "compUpDelBtn"
                          : ""
                      }`}
                    >
                      Edit
                    </button>
                    <br />
                    <button
                      onClick={() => deleteTaskToggle(data.taskID)}
                      className={`upDelBtn deleteTask ${
                        isCompleteArr.includes(data.taskID)
                          ? "compUpDelBtn"
                          : ""
                      }`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isNewTask && (
        <NewTaskPopup
          triggerNewTaskToggle={newTaskToggle}
          taskCardData={receivedTaskData}
        />
      )}

      {isUpdateTask && (
        <UpdateTaskComp
          allTasksData={taskCards}
          taskCurrentID={currentTaskID}
          triggerUpdateTaskToggle={updateTaskToggle}
          updateTaskFun={receivedUpdateTaskFun}
        />
      )}
      {isDeleteTask && (
        <DeleteTaskPopup
          triggerDeleteTask={deleteTaskToggle}
          deleteTaskFun={deleteTask}
        />
      )}

      {isSignup && <Signup triggerSignupFun={triggerSignup} />}

      {isTaskOpen && (
        <TaskCardPopup
          triggerTaskOpenerToggle={taskOpenerToggle}
          allTasksData={taskCards}
          taskCurrentID={currentTaskID}
          updateTaskFun={receivedUpdateTaskFun}
        />
      )}
    </>
  );
}
