import React, { useState , useEffect } from 'react';
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        editUser();
    }, []); 

    const editUser = () => {
        if(sessionStorage.getItem('ID_EDIT_USER') !== null) {
            api.get(`/usuarios/${sessionStorage.getItem('ID_EDIT_USER')}`)
            .then(response => {
                setFormData({
                    nome: response.data.nome,
                    senha: "",
                    funcao: response.data.funcao,
                    dataNascimento: response.data.dataNascimento,
                    cpf: response.data.cpf,
                    email: response.data.email
                });
            })
            .catch(error => {
                toast.error("Erro ao buscar usuário:", error);
            });
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
                dataNascimento: formData.dtNascimento,
                cpf: formData.cpf,
                email: formData.email,
                empresa: {
                    id: sessionStorage.getItem('ID_EMPRESA')
                },
                acesso: 0,
                ativo: 1
            };

            if(sessionStorage.getItem('ID_EDIT_USER') !== null) {
                api.put(`/usuarios/${sessionStorage.getItem('ID_EDIT_USER')}`, objetoAdicionado)
                .then(() => {
                    toast.success("Funcionário atualizado com sucesso!");
                    sessionStorage.removeItem('ID_EDIT_USER');
                })
                .catch(() => {
                    toast.error("Ocorreu um erro ao salvar os dados, por favor, tente novamente.");
                });
            } else {

            api.post(`/usuarios/cadastro`, objetoAdicionado)
                .then(() => {
                    toast.success("Novo funcionario cadastrado com sucesso !");
                }).catch(() => {
                    toast.error("Ocorreu um erro ao salvar os dados, por favor, tente novamente.");
                });
            }

            setFormData({
                nome: formData.nome,
                senha: formData.senha,
                funcao: formData.funcao,
                dtNascimento: formData.dtNascimento,
                cpf: formData.cpf,
                email: formData.email,
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

                    <h1>Cadastro de Funcionario</h1>

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
                                {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
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
