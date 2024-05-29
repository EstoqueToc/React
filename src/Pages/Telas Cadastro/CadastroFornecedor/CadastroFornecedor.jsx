import React, { useState } from 'react';
import styles from './CadastroProduto.module.css'; // Crie um arquivo CSS correspondente para estilizar seu formulário
import SideBar from '../../../Componentes/NavBarLateral/NavBarLateral';

function CadastroFornecedor() {
    const [formData, setFormData] = useState({
        nome: '',
        nomeFantasia: '',
        razaoSocial: '',
        preco: '',
        telefone: '',
        email: '',
        cnpj:''
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
                razaoSocial: formData.razaoSocial,
                nomeSocial: formData.nomeSocial,
                preco: formData.dtNascimento,
                cnpj: formData.cpf,
                email: formData.email,
                telefone: formData.telefone,
                fkEmpresa: sessionStorage.getItem('ID_EMPRESA'),
                acesso: true
            };

            const response = await fetch('URL_DA_SUA_API/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar o produto');
            }

            // Sucesso
            alert('Produto cadastrado com sucesso!');
            setFormData({
                nome: '',
                nomeFantasia: '',
                razaoSocial: '',
                telefone: '',
                cnpj: '',
                preco: '',
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
            <SideBar BreadCrumb='Cadastro de Fornecedor' />

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
                                <label>Nome Representante:</label>
                                <input
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
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
                                <label>Preço do Produto:</label>
                                <input
                                    type="number"
                                    name="preco"
                                    value={formData.preco}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                        </form>

                        <form className={styles.form} onSubmit={handleSubmit}>

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
                                    type="number"
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
