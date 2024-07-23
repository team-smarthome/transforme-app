import { Backdrop, CircularProgress } from "@mui/material";

export default function Loader({ open }) {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 99999999 }} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
