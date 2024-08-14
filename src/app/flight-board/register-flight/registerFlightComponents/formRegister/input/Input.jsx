import React from 'react'
import TextInput from './inputs/TextInput'
import TextAreaInput from './inputs/TextAreaInput';
import SelectInput from './inputs/SelectInput';
import DatePickerInput from './inputs/DatePickerInput';
import TimeInput from './inputs/TimeInput';

export default function Input({ type, onChange, value, name, label }) {
  
    switch(type){
        case('selectInput'):
            return <SelectInput value={value} label={label} name={name} onChange={onChange} />
        
        case('textAreaInput'):
            return <TextAreaInput value={value} label={label} name={name} onChange={onChange} />;

        case('datePickerInput'):
            return <DatePickerInput value={value} label={label} name={name} onChange={onChange} />;

        case('timeInput'):
            return <TimeInput value={value} label={label} name={name} onChange={onChange} />;

        default:
            return <TextInput value={value} label={label} name={name} onChange={onChange} />;
    }
  
}
