import React from 'react';
import styles from './404.module.css'
import { Link } from 'react-router-dom';


function NotFound() {
  return (
    <div className={styles.erro}>
      <div >
        <h1>ERROR - 404</h1>
        <h1> Página não encontrada</h1>
        <p>Sentimos muito,mas que está buscando não existe.</p>

          <Link to='/' >
            Redirecionar
          </Link>
      
      </div>
    </div>
  );
}

export default NotFound;