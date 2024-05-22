import React from "react";
import { Link } from "react-router-dom"; // Asumiendo que estás usando React Router
import styles from './Usuario.module.css'; // Importa tus estilos CSS correctamente
import adicionarUsuarioImg from '../../Assets/adicionar-usuario.png'; // Importa la imagen correctamente

import Sidebar from "../../Componentes/NavBarLateral/SideBarPrincipal";

function Usuario() {
    return (
        <>

            <div className={styles.sec}>
                <div className={styles.header}>
                    <Sidebar />
                    <Link to='/CadastroUsuarios' className={styles.logo}>
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

                    <div className={styles.containerr}>
                        <div className={styles.content}>
                            <h1 className={styles.title}>Cadastro de Usuários</h1>
                            <form className={styles.form} id="usuario-form">
                                <div className={styles.content2}>

                                    <div className={styles.right}>
                                        <label htmlFor="funcao">Função</label>
                                        <input className={styles.input} type="text" id="funcao" name="funcao" />

                                        <label htmlFor="status">Status</label>
                                        <input className={styles.input} type="text" id="status" name="status" /><br />
                                    </div>

                                    <div className={styles.left}>
                                        <label htmlFor="usuario">Usuário</label>
                                        <input className={styles.input} type="text" id="usuario" name="usuario" />

                                        <label htmlFor="email">Email</label>
                                        <input className={styles.input} type="email" id="email" name="email" />
                                    </div>


                                </div>
                                <div className={styles.buttons}>
                                    <button className={styles.btnCadUsuario} type="button" onClick={() => window.history.back()}>Cancelar</button>
                                    <button className={styles.btnCadUsuario}>Cadastrar</button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
                <footer className={styles.footer}>
                    <p>&copy;EstoqueToc.</p>
                </footer>
            </div>

        </>
    );
}

export default Usuario;
