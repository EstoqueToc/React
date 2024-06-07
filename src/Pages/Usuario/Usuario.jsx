import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './Usuario.module.css';
import adicionarUsuarioImg from '../../Assets/adicionar-usuario.png';
import SideBar from '../../Componentes/NavBarLateral/NavBarLateral';
import api from '../../api';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Usuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();
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

    const handleEdit = (usuarioId) => {
        sessionStorage.setItem("ID_EDIT_USER", usuarioId);
        navigate("/CadastroFunc");
    };

    const handleDelete = (usuarioId) => {
        api.delete(`/usuarios/${usuarioId}`)
        .then(response => {
            toast.success("Usuário excluído com sucesso!");
            listarUsuarios();
        })
        .catch(error => {
            toast.error("Erro ao excluir usuário:", error);
        });
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
                                <th>Ações</th>
                                <th>Nome de Usuário</th>
                                <th>Email</th>
                                <th>Função</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(usuario => (
                                <tr key={usuario.id}>
                                    <td className={styles["acao-buttons"]}>
                                        <button className={styles.excluir} onClick={() => handleDelete(usuario.id)}>
                                            Excluir &ensp;
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                            </svg>
                                        </button>
                                        <button className={styles.editar} onClick={() => handleEdit(usuario.id)}>
                                            Editar &ensp; 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                                            </svg>
                                        </button>
                                    </td>
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
