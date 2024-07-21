import { AuthContext } from "../../context/Auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Chip } from "@mui/joy";
import { ApplicationContext } from "../../context/Application/ApplicationContext";
import Table from "react-bootstrap/Table";

import "./userInfor.css";
const UserInfor = () => {
  const { current, user, getUsers, users, deleteUser, dispatch, updateUser } =
    useContext(AuthContext);
  const {
    applications,

    addApplication,
    getApplications,
    deleteApplication,
    updateApplication,
  } = useContext(ApplicationContext);

  const [stateModal, setStateModal] = useState(false);
  const [temp, setTemp] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    getUsers();
    if (current) {
      setTemp(current);
    }
  }, [current]);
  return (
    <div>
      <div className="User-infor">
        <h1>My Info</h1>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <Chip variant="outlined" color="primary">
          {user.role}
        </Chip>
        {user.role === "client" ? (
          <div>
            <Chip
              variant="outlined"
              color="success"
              style={{
                marginTop: "10px",

                cursor: "pointer",
              }}
            >
              {
                // checking if ther is an application for the user with the status of pending
                applications.length > 0 &&
                applications.find(
                  (application) =>
                    application.user === user._id &&
                    application.status === "pending"
                ) ? (
                  <span>Application Pending</span>
                ) : (
                  <span
                    onClick={() => {
                      addApplication({
                        user: user._id,
                      });
                    }}
                  >
                    Apply
                  </span>
                )
              }
            </Chip>
          </div>
        ) : null}
      </div>
      {user.role === "admin" && (
        <div>
          <UserData setStateModal={setStateModal} />
          <UserEdit
            setStateModal={setStateModal}
            stateModal={stateModal}
            temp={temp}
            setTemp={setTemp}
            updateUser={updateUser}
          />
          <ApplicationTable />
        </div>
      )}
    </div>
  );
};

export default UserInfor;

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
const UserData = ({ setStateModal }) => {
  const { users, deleteUser, dispatch } = useContext(AuthContext);
  const handleClick = (user) => {
    dispatch({ type: "SET_CURRENT", payload: user });
    setStateModal(true);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td>
                  <button
                    className="btn btn-primary"
                    style={{
                      margin: "0 10px",
                    }}
                    // btn click event to update user
                    onClick={() => handleClick(user)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

function UserEdit({ stateModal, setStateModal, temp, setTemp, updateUser }) {
  const handleClose = () => setStateModal(false);

  const handleChange = (e) => {
    setTemp({ ...temp, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal show={stateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                value={temp.name}
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={temp.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </Form.Group>
            {/* Role is a drop down menu with three option admin,partner,client */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                onChange={handleChange}
                value={temp.role}
                placeholder="Enter role"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateUser(temp);
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const ApplicationTable = () => {
  const { applications, deleteApplication, updateApplication } =
    useContext(ApplicationContext);

  const { updateUser } = useContext(AuthContext);

  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Application</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 &&
            applications.map((application) => (
              <tr key={application._id + Math.random() * 1000}>
                <td>{application.name}</td>
                <td>{application.status}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    style={{ margin: "0 10px" }}
                    onClick={() => {
                      updateApplication({
                        ...application,
                        status: "approved",
                      });
                    }}
                    disabled={application.status === "pending" ? false : true}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      updateApplication({
                        ...application,
                        status: "rejected",
                      })
                    }
                    disabled={application.status === "pending" ? false : true}
                  >
                    Reject
                  </button>
                  <button
                    className="btn  btn-danger mx-3"
                    onClick={() => {
                      updateApplication({
                        ...application,
                        status: "rejected",
                      });
                      deleteApplication(application._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
