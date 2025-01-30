import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  Radio,
} from "@mui/material";

const SuRadioGroup = (props: any) => {
  const { name, label, value, onChange, items } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item: any) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};

export default SuRadioGroup;
