import React from 'react'
import C from './Header.module.css'

const Header = () => {
  return (
    <header className={C.header}>
        <h1>Reactodo, lista de tarefas</h1>
    </header>
  )
};

export default Header;