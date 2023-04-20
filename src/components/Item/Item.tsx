import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { Checkbox, CheckboxProps } from '@mui/material';
import { FormGroup, FormControlLabel } from '@mui/material';


const Item = ({ name, removeFromList }: any) => {
    const [checked, setChecked] = useState(false);

    // const removeTodo = () => {
    //   if(!checked) {
    //     // removeFromList(name)
    //   }
    // }

    const handleChange = (event: any) => {
      setChecked(event.target.checked);
      // removeTodo()
    };
  
    return (
      <div>
        <FormControlLabel control={<Checkbox />} onChange={(event) => handleChange(event)} label={name} sx={{textDecorationLine: checked ? 'line-through' : 'none'}}/>
      </div>
    );
}

export default Item