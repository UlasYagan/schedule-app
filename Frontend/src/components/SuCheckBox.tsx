import { Checkbox } from '@mui/material';
import React from 'react'

const SuCheckBox = () => {
    
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     debugger;
     console.log(e.target.checked);
   };
 
   return (
     <Checkbox
       onChange={handleChange}
       sx={{
         pt: 1,
         "& .MuiSvgIcon-root": { fontSize: 15 },
       }}
     />
   );
 };
export default SuCheckBox;