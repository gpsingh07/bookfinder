import React, { useState, useCallback } from 'react';
import { debounce } from '../utils/util'
import '../App.css';

function Form(props) {
  const [value, setValue] = useState('');
  const [index, setIndex] = useState(-1);
  const handleDebounce = useCallback(debounce(q => props.findBook(q.toLowerCase()), 500), []);

  function handleClick(selected){
    setValue(props.suggestions[selected]);
    setIndex(selected);
    props.handleClick();
  }

  function handleChange(e){
    setValue(e.target.value);
    handleDebounce(e);
  }

  function handleSubmit(e){
    setValue('');
    props.handleSubmit(index);
  }


  return (
    <div className="form-cont">
      <input 
        placeholder="Search books" 
        onChange={handleChange} 
        value={value}
      />
      <div className="suggestions">
        {props.suggestions.map( (title, i) => {
          return(
            <div 
              key={i}
              className="suggestion" 
              onClick={handleClick.bind(null, i)}
            >
              {title}
            </div>
          )
        })}
        
      </div>
      <button onClick={handleSubmit} disabled={index === -1}>
        Submit
      </button> 
    </div>
  );
}

export default Form;
