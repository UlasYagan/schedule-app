import { Button as MuiButton } from "@mui/material";

const SuButton = (props: any) => {
  const { text, size, color, variant, onClick, ...other } = props;

  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      sx={{ textTransform: "none" }}
    >
      {text}
    </MuiButton>
  );
};

export default SuButton;
