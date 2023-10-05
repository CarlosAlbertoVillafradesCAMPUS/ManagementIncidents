import React from 'react'

export default function OptionSelect(props) {
  return (
    <>
      <option value={props.value}>
        {props.name}
      </option>
    </>
  );
}
