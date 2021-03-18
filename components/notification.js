import React, { useState } from "react"
import CloseIcon from "../assets/svgs/Close"

const Notification = () => {
  let notification
  if (typeof window !== "undefined") {
    notification = localStorage.getItem("notification") || 1
  }
  const [isShow, setShow] = useState(Number(notification))
  
  const handleClose = () => {
    setShow(0)
    localStorage.setItem("notification", false)
  }
  if (!isShow) return null
  return (
    <div className="notification-container">
      <a
        href="https://play.google.com/store/apps/details?id=com.tejimandi"
        style={{ display: "inherit", top: "12px", position: "relative" }}
      >
        <div className="notification-icon">
          <img
            src="/static/logo.png"
            alt="Tejimandi"
            style={{ position: "relative", top: "-10px" }}
          />
        </div>
        <div className="notification-content">
          <p>Download the Teji Mandi App</p>
        </div>
      </a>
      <div
        role="presentation"
        className="notification-close"
        onClick={handleClose}
      >
        <CloseIcon />
      </div>
    </div>
  )
}

Notification.propTypes = {}

export default Notification
