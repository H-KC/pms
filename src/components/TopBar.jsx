import React from "react";

import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

import { AiContext } from "../context/AI/AiContext";
import { useContext } from "react";

const TopBar = () => {
  const [open, setOpen] = React.useState(false);
  const { nlpModel, nlpRes, objectDetection, odRes } = useContext(AiContext);
  return (
    <div className="top-bar">
      <>
        <Button variant="solid" color="success" onClick={() => setOpen(true)}>
          NLP Model
        </Button>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />

            <NLPComponent
              nlpModel={nlpModel}
              nlpRes={nlpRes}
              objectDetection={objectDetection}
              odRes={odRes}
            />
          </Sheet>
        </Modal>
      </>
      <>
        <>
          <Button
            variant="solid"
            color="success"
            // onClick={() => setOpen(true)}
            style={{
              marginLeft: "0 10px",
            }}
          >
            Object Detection
          </Button>
          {/* <Modal
            aria-labelledby="modal-title1"
            aria-describedby="modal-desc1"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                maxWidth: 500,
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
              }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              Object Detection Component
            </Sheet>
          </Modal> */}
        </>
      </>
    </div>
  );
};
export default TopBar;

const NLPComponent = ({
  nlpModel,
  nlpRes,
  objectDetection,
  odRes,
  ...props
}) => {
  const [userData, setUserData] = React.useState({
    image: "",
    question: "",
  });

  const handleChanges = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Typography variant="h1">
        Upload an image and ask a question about it
      </Typography>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            setUserData({
              ...userData,
              image: reader.result,
            });
          };
          reader.readAsDataURL(file);
        }}
      />
      <input
        type="text"
        placeholder="Question"
        style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        onChange={(e) => {
          setUserData({
            ...userData,
            question: e.target.value,
          });
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => nlpModel(userData)}
        style={{
          backgroundColor: "#f50057",
        }}
      >
        Submit
      </Button>
    </>
  );
};
