// src/App.js
import React from 'react';
import DashBoard2 from '../../Componentes/DasBoard/Dashboard'
import NavBarLateral from '../../Componentes/NavBarLateral/NavBarLateral';
import styles from './index.module.css'

const index = () => (
    <div className="App">

        <NavBarLateral  BreadCrumb='DashBoard'/>

        <DashBoard2 />

        <footer className={styles.footer}>
            <p>&copy;EstoqueToc.</p>
        </footer>

    </div>
);

export default index;
