import React from 'react'
import s from './Titulos.module.css'

export default function Titulos({titulo}) {
  return (
    <div className={s.titlecont}>
        <h1 className={s.titlesec}>{titulo}</h1>
        <div className={s.titleseparator}></div>
    </div>
  )
}
