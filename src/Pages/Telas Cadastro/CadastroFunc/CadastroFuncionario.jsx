import React, { useState, useEffect } from 'react';
import styles from './CadastroProduto.module.css'; // Crie um arquivo CSS correspondente para estilizar seu formulário
import SideBar from '../../../Componentes/NavBarLateral/NavBarLateral';
import { toast } from "react-toastify";
import api from "../../../api";

function CadastroFuncionario() {
    const [formData, setFormData] = useState({
        nome: '',
        senha: '',
        funcao: '',
        dataNascimento: '',
        cpf: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('ID_EDIT_USER') !== null) {
            setIsEditing(true);
            editUser();
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const editUser = async () => {
        try {
            const response = await api.get(`/usuarios/${sessionStorage.getItem('ID_EDIT_USER')}`);
            setFormData({
                nome: response.data.nome,
                senha: "",
                funcao: response.data.funcao,
                dataNascimento: response.data.dataNascimento,
                cpf: response.data.cpf,
                email: response.data.email
            });
        } catch (error) {
            toast.error("Erro ao buscar usuário:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const objetoAdicionado = {
                nome: formData.nome,
                senha: formData.senha,
                funcao: formData.funcao,
                dataNascimento: formData.dataNascimento,
                cpf: formData.cpf,
                email: formData.email,
                empresa: {
                    id: sessionStorage.getItem('ID_EMPRESA')
                },
                acesso: 0,
                ativo: 1
            };

            if (isEditing) {
                await api.put(`/usuarios/${sessionStorage.getItem('ID_EDIT_USER')}`, objetoAdicionado);
                toast.success("Funcionário atualizado com sucesso!");
                sessionStorage.removeItem('ID_EDIT_USER');
            } else {
                await api.post(`/usuarios/cadastro`, objetoAdicionado);
                toast.success("Novo funcionário cadastrado com sucesso!");
            }

            setFormData({
                nome: '',
                senha: '',
                funcao: '',
                dataNascimento: '',
                cpf: '',
                email: ''
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SideBar />

            <div className={styles.main}>
                <div className={styles.container}>
                    <h1>{isEditing ? 'Editar Funcionário' : 'Cadastro de Funcionário'}</h1>

                    <div className={styles.lado_lado}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.field}>
                                <label>Nome:</label>
                                <input
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>CPF:</label>
                                <input
                                    type="text"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Data de Nascimento:</label>
                                <input
                                    type="date"
                                    name="dataNascimento"
                                    value={formData.dataNascimento}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </form>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.field}>
                                <label>E-mail:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Senha:</label>
                                <input
                                    type="password"
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Função:</label>
                                <input
                                    type="text"
                                    name="funcao"
                                    value={formData.funcao}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </form>
                    </div>

                    <div>
                        <div className={styles.actions}>
                            <button type="submit" disabled={isSubmitting} onClick={handleSubmit}>
                                {isSubmitting ? (isEditing ? 'Atualizando...' : 'Cadastrando...') : (isEditing ? 'Editar' : 'Cadastrar')}
                            </button>
                        </div>
                        {error && <p className={styles.error}>{error}</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CadastroFuncionario;
