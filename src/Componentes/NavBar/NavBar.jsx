import React from 'react';
import styles from './NavBar.module.css'
import logo from '../../Assets/Logo.png'
import { Link } from 'react-router-dom';

function NavBar({scrollSmooth}) {
    
    return (

        <header className={styles["header"]}>
            <nav className={styles["navbar"]}>
                <Link to='/' ><img src={logo} alt="Logo" className={styles["logo"]} /></Link>
                    <ul className={styles["nav-links"]}>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">Sobre Nós</a></li>
                        <li><a href="/">Serviços</a></li>
                        <li><a href="/">Contato</a></li>
                    </ul>
                    <Link to='/login' className={styles["btn-entrar"]}>Entrar</Link>
            </nav>
        </header>


    )
}
export default NavBar;
