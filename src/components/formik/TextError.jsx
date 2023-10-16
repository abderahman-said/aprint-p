import React from 'react'

const TextError = (props) => {
  return (
    <div className='error_message text-danger mt-2'>* {props.children}</div>
  )
}

export default TextError