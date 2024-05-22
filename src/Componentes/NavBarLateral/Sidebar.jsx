import React from 'react';
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';

// Import images for the Sidebar
import Hamburguer from '../../Assets/menu-hamburguer.png'
import Usuario from '../../Assets/usuario.png'
import EstoquePronto from '../../Assets/estoque-pronto.png'
import Compras from '../../Assets/compras.png'
import Relatorio from '../../Assets/relatorio.png'
import AddUsuario from '../../Assets/adicionar-usuario.png'


const Sidebar = ({ isOpen, toggle }) => {
  return (
    <nav className={isOpen ? `${styles.sidebar} ${styles.open}` : styles.sidebar}>

      <span className={styles.hamburger} onClick={toggle}>
        <img src={Hamburguer} alt='ola' />
      </span>

      <div className={styles.usuario}>

        <h4 id="Empresa">Empresa ABC</h4>
        <img src={Usuario} alt="" />
        <p id="Usuario">Raquel Guimarães</p>

      </div>
      <ul className={styles.ul_sidebar}>
        <li className={styles.item_menu}>
          <Link to='/pagina-geral'>
            <span className={styles.icone}></span>
            <span className={styles.texto}>Estoque <img src={EstoquePronto} alt="" /></span>
          </Link>
        </li>

        <li className={styles.item_menu}>

          <Link>
            <span className={styles.icone}></span>
            <span className={styles.texto}>Compras <img src={Compras} alt="" /></span>
          </Link>

        </li>

        <li className={styles.item_menu}>

          <Link>
            <span className={styles.icone}></span>
            <span className={styles.texto}>Realtorio <img src={Relatorio} alt="" /></span>
          </Link>

        </li>
        
        <li className={styles.item_menu}>

          <Link>
            <span className={styles.icone}></span>
            <span className={styles.texto}>Usuario <img src={AddUsuario} alt="" /></span>
          </Link>

        </li>

        <li className={styles.item_menu}>

          <Link>
            <span className={styles.icone}></span>
            <span className={styles.texto}>Sair </span>
          </Link>

        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
