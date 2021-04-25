import './Nav.css'
import React from 'react'
import NavItem from './NavItem'

export default props =>
    <aside className='menu-area'>
        <nav className="menu">
            <NavItem path='/' icon='home' name='Início' />
            <NavItem path='/delivery' icon='users' name='Nova Entrega' />
            <NavItem path='/deliveries' icon='users' name='Entregas' />

        </nav>
    </aside>
