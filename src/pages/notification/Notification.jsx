import React from "react";

const Notification = () => {
  return (
    <>
      {/* show example of ntification */}
      <div className="notification">
        <div className="notification__header">
          <h3>Notification</h3>
        </div>
        <div className="notification__body">
          <div className="notification__item">
            <div className="notification__item__header">
              <h4>Notification Title</h4>
              <p>Notification Date</p>
            </div>
            <div className="notification__item__body">
              <p>Notification Body</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
