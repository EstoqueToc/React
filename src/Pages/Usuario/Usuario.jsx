import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './Usuario.module.css';
import adicionarUsuarioImg from '../../Assets/adicionar-usuario.png';
import SideBar from '../../Componentes/NavBarLateral/NavBarLateral';
import api from '../../api';
import { toast } from "react-toastify";

function Usuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const fkEmpresa = sessionStorage.getItem('ID_EMPRESA');

    useEffect(() => {
        listarUsuarios();
    }, []);

    const listarUsuarios = () => {
        api.get(`/usuarios/simples/${fkEmpresa}`)
        .then(response => {
            setUsuarios(response.data);
        })
        .catch(error => {
            toast.error("Erro ao buscar usuários:", error);
        });
    };

    const fetchUsuarios = (nome, fkEmpresa) => {
        api.get(`/usuarios/simples/${nome}/${fkEmpresa}`)
        .then(response => {
            setUsuarios(response.data);
        })
        .catch(error => {
            console.error("Erro ao buscar usuários:", error);
        });
    };

    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            listarUsuarios();
        } else {
            fetchUsuarios(searchTerm, fkEmpresa);
        }
    };

    return (
        <>
            <SideBar BreadCrumb='Usuarios' />

            <div className={styles.sec}>
                <div className={styles.header}>
                    <Link to='/CadastroFunc' className={styles.logo}>
                        Usuários
                        <img src={adicionarUsuarioImg} alt="adicionar novo usuario" />
                    </Link>

                    <div className={styles["header-right"]}>
                        <input 
                            type="search" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} 
                        />
                        <button onClick={handleSearch}>Pesquisar</button>
                    </div>
                </div>

                <div className={styles["container-usuarios"]}>
                    <table className={styles["tabela-usuario"]}>
                        <thead>
                            <tr className={styles.ajuste}>
                                <th>Nome de Usuário</th>
                                <th>Email</th>
                                <th>Função</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(usuario => (
                                <tr key={usuario.id}>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.funcao}</td>
                                    <td>{usuario.ativo ? 'Ativo' : 'Inativo'}</td>
                                </tr>
                            ))}
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