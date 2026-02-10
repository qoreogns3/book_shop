import React from 'react'
import styles from './Button.module.css'

//객체 키값 지정 방법
// data = {
//   name : 'kim',
//   age : 20
// }

//data.name
//data[name]  --- 배열로 주는 경우에 키값을 변수로 줄수 있다.

const Button = ({
  title='버튼', 
  variant='brown', 
  size='small',
  disabled=false,
  ...props
}) => {
  return (
    <button 
      type='button'
      className={
        `${styles.button} 
        ${styles[variant]} 
        ${styles[size]} 
        ${disabled && styles.disabled}`
      }
      disabled={disabled}
      {...props}
    >{title}</button>
  )
}

export default Button