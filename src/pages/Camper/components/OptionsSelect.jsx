import React from 'react'

export default function OptionsSelect(array) {
  return (
    <>
     {
        array?.map(item=><option key={item.Area} value={item.Area}>{item.Area}</option> )
    }
    </>
  )
}
