import React from 'react';
import ToastBootstrap from 'react-bootstrap/Toast';

const Toast = ({ show, title, time, children, onClose }) => {
  return (
    <div className="toast-container">
      <ToastBootstrap show={show} animation={true} onClose={onClose}>
        <ToastBootstrap.Header>
          <strong className="mr-auto">{title}</strong>
        </ToastBootstrap.Header>
        <ToastBootstrap.Body>{children}</ToastBootstrap.Body>
      </ToastBootstrap>
    </div>
  );
};

export default Toast;