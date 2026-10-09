
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import ModalMui from "@mui/material/Modal";
import { useDynamicWidth } from "../customHooks/useDynamicWidth";
import "../ecommercefolder/styles.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

export default function Modal({
  modalOpen,
  handleModalClose,
  children,
}) {
  const dynamicWidth = useDynamicWidth();

  return (
    <ModalMui
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalOpen}
      onClose={handleModalClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Box
        sx={{
          ...style,
          ...dynamicWidth,
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </ModalMui>
  );
}
