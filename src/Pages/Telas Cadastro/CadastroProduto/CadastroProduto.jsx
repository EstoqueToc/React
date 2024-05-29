import React, { useState } from 'react';
import styles from './CadastroProduto.module.css'; // Crie um arquivo CSS correspondente para estilizar seu formulário
import SideBar from '../../../Componentes/NavBarLateral/NavBarLateral';

function CadastroProduto() {
    const [formData, setFormData] = useState({
        nome: '',
        precoDeVenda: '',
        precoDeCompra: '',
        dataDeEntrada: '',
        unidadeDeMedida: '',
        descricao: '',
        categoria: '',
        preco: '',
        fornecedor: ''
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
                qtdEstoque: formData.qtdEstoque,
                precoDeVenda: formData.precoDeVenda,
                precoDeCompra: formData.precoDeCompra,
                dataDeEntrada: formData.dataDeEntrada,
                unidadeDeMedida: formData.unidadeDeMedida,
                descricao: formData.descricao,
                categoria: formData.categoria,
                preco: formData.preco,
                fornecedor: formData.fornecedor,
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
                qtdEstoque: '',
                precoDeVenda: '',
                precoDeCompra: '',
                dataDeEntrada: '',
                unidadeDeMedida: '',
                descricao: '',
                categoria: '',
                preco: '',
                fornecedor: ''
                
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

                    <h1>Cadastro de Produto</h1>

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
                                <label>Preço de Venda:</label>
                                <input
                                    type="text"
                                    name="descricao"
                                    value={formData.descricao}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Preço de Compra:</label>
                                <input
                                    type="text"
                                    name="preco"
                                    value={formData.preco}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Data de Entrada:</label>
                                <input
                                    type="text"
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Unidade de Medida:</label>
                                <input
                                    type="text"
                                    name="estoque"
                                    value={formData.estoque}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                        </form>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.field}>
                                <label>Descrição:</label>
                                <input
                                    type="text"
                                    name="descricaco"
                                    value={formData.descricao}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Categoria:</label>
                                <input
                                    type="text"
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Quantidade em Estoque:</label>
                                <input
                                    type="number"
                                    name="qtdEstoque"
                                    value={formData.qtdEstoque}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Data de Validade:</label>
                                <input
                                    type="date"
                                    name="categoria"
                                    value={formData.dataDeValidade}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Forncedor:</label>
                                <input
                                    type="text"
                                    name="fornecedor"
                                    value={formData.fornecedor}
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

export default CadastroProduto;
