import React, { useState, useEffect } from 'react';
import styles from './CadastroProduto.module.css'; // Crie um arquivo CSS correspondente para estilizar seu formulário
import SideBar from '../../../Componentes/NavBarLateral/NavBarLateral';
import { toast } from "react-toastify";
import api from '../../../api'; // Supondo que você tenha configurado um arquivo de API

function CadastroProduto() {
    const [formData, setFormData] = useState({
        nomeProduto: '',
        descricaoProduto: '',
        dataValidade: '',
        precoCompraProduto: '',
        precoVendaProduto: '',
        dataEntrada: '',
        unidadeMedida: '',
        qtdEntrada: '',
        categoria: '',
        fornecedor: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const fetchData = async () => {
        try {
            const empresaId = sessionStorage.getItem('ID_EMPRESA');
            const categoriaResponse = await api.get(`/categorias/empresa/${empresaId}`);
            const fornecedorResponse = await api.get(`/fornecedores/empresa/${empresaId}`);
            setCategorias(categoriaResponse.data);
            setFornecedores(fornecedorResponse.data);
        } catch (error) {
            toast.error('Erro ao buscar categorias e fornecedores', error);
            setError('Erro ao buscar categorias e fornecedores');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const objetoAdicionado = {
                nomeProduto: formData.nomeProduto,
                descricaoProduto: formData.descricaoProduto,
                dataValidade: formData.dataValidade,
                precoCompraProduto: formData.precoCompraProduto,
                precoVendaProduto: formData.precoVendaProduto,
                dataEntrada: formData.dataEntrada,
                unidadeMedida: formData.unidadeMedida,
                qtdEntrada: formData.qtdEntrada,
                categoria: formData.categoria,
                fornecedor: formData.fornecedor,
                empresa: sessionStorage.getItem('ID_EMPRESA'),
            };

            const response = await api.post('/produtos', objetoAdicionado);

            if (!response.created) {
                toast.error('Erro ao cadastrar o produto');
            }

            alert('Produto cadastrado com sucesso!');
            setFormData({
                nomeProduto: '',
                descricaoProduto: '',
                dataValidade: '',
                precoCompraProduto: '',
                precoVendaProduto: '',
                dataEntrada: '',
                unidadeMedida: '',
                qtdEntrada: '',
                categoria: '',
                fornecedor: ''
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Renderização condicional enquanto os dados estão sendo carregados
    if (categorias.length === 0 || fornecedores.length === 0) {
        return <p>Carregando...</p>;
    }

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
                                    name="nomeProduto"
                                    value={formData.nomeProduto}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Descrição do Produto:</label>
                                <input
                                    type="text"
                                    name="descricaoProduto"
                                    value={formData.descricaoProduto}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Data de Validade:</label>
                                <input
                                    type="date"
                                    name="dataValidade"
                                    value={formData.dataValidade}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Unidade de Medida:</label>
                                <input
                                    type="text"
                                    name="unidadeMedida"
                                    value={formData.unidadeMedida}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </form>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.field}>
                                <label>Preço da Compra do Produto:</label>
                                <input
                                    type="text"
                                    name="precoCompraProduto"
                                    value={formData.precoCompraProduto}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Preço de Venda do Produto</label>
                                <input
                                    type="text"
                                    name="precoVendaProduto"
                                    value={formData.precoVendaProduto}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Quantidade de Entrada:</label>
                                <input
                                    type="number"
                                    name="qtdEntrada"
                                    value={formData.qtdEntrada}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Categoria:</label>
                                <select
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.field}>
                                <label>Fornecedor:</label>
                                <select
                                    name="fornecedor"
                                    value={formData.fornecedor}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Selecione um fornecedor</option>
                                    {fornecedores.map((fornecedor) => (
                                        <option key={fornecedor.id} value={fornecedor.id}>
                                            {fornecedor.nomeFantasia}
                                        </option>
                                    ))}
                                </select>
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