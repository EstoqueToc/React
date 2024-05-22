import React from 'react';
import styles from './FiltroProduto.module.css'; // Corrected import path for CSS
import { Link } from 'react-router-dom';

// Import images for the Sidebar
import OioArrow from '../../Assets/oui--arrow-up.svg';

const Filtro = ({ isOpen, toggle }) => {
  return (
    <nav className={isOpen ? `${styles.sidebar} ${styles.open}` : styles.sidebar}>
      <span className={styles.hamburger} onClick={toggle}>
        <img
          src={OioArrow}
          alt='arrow'
          className={styles.rotate}
        />
        Aperte aqui para configurar os status de estoque
      </span>
      <br />
      <br />

      <div id='campos' className={styles.campos}>
        <div>
          <label htmlFor='alto'>
            Quantidade de estoque considerado alto:
          </label>
          <input
            type='text'
            id='alto'
            placeholder='Coloque um valor'
            onClick={(event) => event.stopPropagation()}
          />
        </div>
        <div>
          <label htmlFor='medio'>
            Quantidade de estoque considerado médio:
          </label>
          <input
            type='text'
            id='medio'
            placeholder='Coloque um valor'
            onClick={(event) => event.stopPropagation()}
          />
        </div>
        <div>
          <label htmlFor='falta'>
            Quantidade de estoque considerado baixo:
          </label>
          <input
            type='text'
            id='falta'
            placeholder='Coloque um valor'
            onClick={(event) => event.stopPropagation()}
          />
        </div>
        <div className={styles.botaoCadStatus}>
          <button
            className={styles.btnCadStatus}
            onClick={(event) => event.stopPropagation()}
          >
            Salvar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Filtro;
