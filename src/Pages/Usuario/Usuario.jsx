import React from "react";
import { Link } from "react-router-dom"; // Asumiendo que estás usando React Router
import styles from './Usuario.module.css'; // Importa tus estilos CSS correctamente
import adicionarUsuarioImg from '../../Assets/adicionar-usuario.png'; // Importa la imagen correctamente

import SideBar from '../../Componentes/NavBarLateral/NavBarLateral'


function Usuario() {
    return (
        <>

            <SideBar BreadCrumb='Usuarios'/>

            <div className={styles.sec}>

                <div className={styles.header}>

                    <Link to='/CadastroFunc' className={styles.logo}>
                        Usuários
                        <img src={adicionarUsuarioImg} alt="adicionar novo usuario" />
                    </Link>

                    <div className={styles["header-right"]}>
                        <input type="search" />
                        <button >Pesquisar</button>
                    </div>

                </div>

                <div className={styles["container-usuarios"]}>

                    <table className={styles["tabela-usuario"]}>

                        <thead>
                            <tr>
                                <th>Nome de Usuário</th>
                                <th>Email</th>
                                <th>Função</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Raquel Guimarães</td>
                                <td>raquel.guimaraes@example.com</td>
                                <td>Admin</td>
                                <td>Ativo</td>
                            </tr>
                            <tr>
                                <td>Arthur Ciliberti</td>
                                <td>arthur.ciliberti@example.com</td>
                                <td>Admin</td>
                                <td>Ativo</td>
                            </tr>
                        </tbody>

                    </table>

                </div>

                <footer className={styles.footer}>
                    <p>&copy;EstoqueToc.</p>
                </footer>

            </div>
        </>
    );
}

export default Usuario;
