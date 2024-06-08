import React, { useState } from 'react';
import styles from './CadastroProduto.module.css';
import SideBar from '../../../Componentes/NavBarLateral/NavBarLateral';
import { toast } from "react-toastify";
import api from "../../../api";

function CadastroFornecedor() {
    const [formData, setFormData] = useState({
        nomeFantasia: '',
        razaoSocial: '',
        telefone: '',
        email: '',
        cnpj: ''
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
            const fornecedorData = {
                razaoSocial: formData.razaoSocial,
                nomeFantasia: formData.nomeFantasia,
                cnpj: formData.cnpj,
                email: formData.email,
                telefone: formData.telefone,
                ativo: 1,
                logradouro: null,
            };

            console.log("Fornecedor data: ", fornecedorData);

            // Enviar requisição para cadastrar o fornecedor
            const fornecedorResponse = await api.post(`/fornecedores`, fornecedorData);
            const fornecedorId = fornecedorResponse.data.id;
            const empresaId = sessionStorage.getItem('ID_EMPRESA');

            // Criar a relação entre a empresa e o fornecedor
            const relacaoData = {
                empresa: empresaId,
                fornecedor: fornecedorId
            };

            console.log("Relação data: ", relacaoData);

            await api.post(`/empresaTemFornecedor`, relacaoData);

            toast.success("Novo Fornecedor cadastrado com sucesso!");
        } catch (error) {
            setError("Ocorreu um erro ao salvar os dados, por favor, tente novamente.");
            toast.error("Ocorreu um erro ao salvar os dados, por favor, tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SideBar />

            <div className={styles.main}>
                <div className={styles.container}>
                    <h1>Cadastro de Fornecedor</h1>
                    <form className={styles.form_isolada} onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label>Razão Social:</label>
                            <input
                                type="text"
                                name="razaoSocial"
                                value={formData.razaoSocial}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </form>

                    <div className={styles.lado_lado}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.field}>
                                <label>Razão Social:</label>
                                <input
                                    type="text"
                                    name="razaoSocial"
                                    value={formData.razaoSocial}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Nome Fantasia:</label>
                                <input
                                    type="text"
                                    name="nomeFantasia"
                                    value={formData.nomeFantasia}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>CNPJ:</label>
                                <input
                                    type="text"
                                    name="cnpj"
                                    value={formData.cnpj}
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
                                <label>Telefone:</label>
                                <input
                                    type="text"
                                    name="telefone"
                                    value={formData.telefone}
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

export default CadastroFornecedor;