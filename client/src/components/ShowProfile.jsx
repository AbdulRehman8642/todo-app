import { React, useState } from "react";
import { setDoc, db, auth, doc } from "../firebase.js";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../fontawesome.jsx";

export default function ShowProfile({ logoutFun, triggerShowProfileFun }) {
  return (
    <>
      <div className="profileParent">
        <div onClick={logoutFun} className="pfpItem pfpItemTop">
          Logout
        </div>
        <div onClick={triggerShowProfileFun} className="pfpItem pfpItemBottom">cancel</div>
      </div>
    </>
  );
}
