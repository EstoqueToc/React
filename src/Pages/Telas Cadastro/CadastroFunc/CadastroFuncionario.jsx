import React, { useState } from 'react';
import styles from './CadastroProduto.module.css'; // Crie um arquivo CSS correspondente para estilizar seu formulário
import SideBar from '../../../Componentes/NavBarLateral/NavBarLateral';
import { toast } from "react-toastify";
import api from "../../../api";

function CadastroFuncionario() {
    const [formData, setFormData] = useState({
        nome: '',
        senha: '',
        funcao: '',
        dtNascimento: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {

            const objetoAdicionado = {
                nome: formData.nome,
                senha: formData.senha,
                funcao: formData.funcao,
                dtNascimento: formData.dtNascimento,
                cpf: formData.cpf,
                email: formData.email,
                fkEmpresa: sessionStorage.getItem('ID_EMPRESA'),
                acesso: true
            };

            api.post(`/usuarios/cadastro`, objetoAdicionado)
                .then(() => {
                    
                    toast.success("Novo funcionario cadastrado com sucesso !");
                  
                }).catch(() => {

                    toast.error("Ocorreu um erro ao salvar os dados, por favor, tente novamente.");

                });


            // Sucesso
            alert('Produto cadastrado com sucesso!');
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
            <SideBar BreadCrumb='Cadastro de Produtos' />

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
                                    name="Data"
                                    value={formData.dtNascimento}
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
                                    name="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Senha:</label>
                                <input
                                    type="password"
                                    name="Password"
                                    value={formData.senha}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>



                            <div className={styles.field}>
                                <label>Função:</label>
                                <input
                                    type="text"
                                    name="Função"
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
