import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertTitle, IconButton, Snackbar } from "@mui/material";
function CustomSnackBar(params) {
  const { severity, message, open, setOpen } = params;

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6}
      >
        <Alert
          variant="filled"
          severity={severity || "info"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen((pre) => !pre);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomSnackBar;
