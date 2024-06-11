import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CadastroProduto.module.css';
import SideBar from '../../../Componentes/NavBarLateral/NavBarLateral';
import { toast } from "react-toastify";
import api from '../../../api'; // Supondo que você tenha configurado um arquivo de API

function CadastroProduto() {
    const navigate = useNavigate();
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
        fornecedor: '',
        alerta: {
            alertaModerado: '',
            alertaGrave: ''
        }
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [showCategoriaModal, setShowCategoriaModal] = useState(false);
    const [newCategoria, setNewCategoria] = useState('');

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

    const handleAlertaInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            alerta: {
                ...formData.alerta,
                [name]: value
            }
        });
    };


    const fetchData = async () => {
        try {
            const empresaId = sessionStorage.getItem('ID_EMPRESA');
            const categoriaResponse = await api.get(`/categorias/empresa/${empresaId}`);
            const fornecedorResponse = await api.get(`/fornecedores/empresa/${empresaId}`);
            setCategorias(categoriaResponse.data);
            setFornecedores(fornecedorResponse.data);
            if (sessionStorage.getItem('ID_EDIT_PRODUTO') !== null) {
                editProduto();
            }
        } catch (error) {
            toast.error('Erro ao buscar categorias e fornecedores', error);
            setError('Erro ao buscar categorias e fornecedores');
        }
    };

    const editProduto = () => {
        if (sessionStorage.getItem('ID_EDIT_PRODUTO') !== null) {
            api.get(`/produtos/${sessionStorage.getItem('ID_EDIT_PRODUTO')}`)
                .then(response => {
                    setFormData({
                        nomeProduto: response.data.nomeProduto,
                        descricaoProduto: response.data.descricaoProduto,
                        dataValidade: response.data.dataValidade,
                        precoCompraProduto: response.data.precoCompraProduto,
                        precoVendaProduto: response.data.precoVendaProduto,
                        dataEntrada: response.data.dataEntrada,
                        unidadeMedida: response.data.unidadeMedida,
                        qtdEntrada: response.data.qtdEntrada,
                        categoria: response.data.categoria.id,
                        fornecedor: response.data.fornecedor.id,
                        alerta: {
                            alertaModerado: '',
                            alertaGrave: ''
                        }
                    });
                })
                .catch(error => {
                    toast.error('Erro ao buscar produto:', error);
                });
        }
    }

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
                categoria: {
                    id: formData.categoria
                },
                fornecedor: {
                    id: formData.fornecedor
                },
                alerta: [
                    {
                        alertaModerado: formData.alerta.alertaModerado,
                        alertaGrave: formData.alerta.alertaGrave
                    }
                ],
                empresa: {
                    id: sessionStorage.getItem('ID_EMPRESA')
                }
            };

            if (sessionStorage.getItem('ID_EDIT_PRODUTO') !== null) {
                const response = await api.put(`/produtos/${sessionStorage.getItem('ID_EDIT_PRODUTO')}`, objetoAdicionado);
                toast.success('Produto atualizado com sucesso!');
                sessionStorage.removeItem('ID_EDIT_PRODUTO');
                navigate('/Produtos');
            }

            const response = await api.post('/produtos', objetoAdicionado);

            toast.success('Produto cadastrado com sucesso!');
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
                fornecedor: '',
                alerta: {
                    alertaModerado: '',
                    alertaGrave: ''
                }
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCategoriaChange = (e) => {
        if (e.target.value === 'nova_categoria') {
            setShowCategoriaModal(true);
        } else {
            setFormData({
                ...formData,
                categoria: e.target.value
            });
        }
    };

    const handleFornecedorChange = (e) => {
        if (e.target.value === 'novo_fornecedor') {
            navigate('/CadastroFornecedor');
        } else {
            setFormData({
                ...formData,
                fornecedor: e.target.value
            });
        }
    };

    const handleAddCategoria = async () => {
        try {
            const empresaId = sessionStorage.getItem('ID_EMPRESA');
            const response = await api.post('/categorias', {
                nome: newCategoria, empresa: {
                    id: empresaId
                }
            });
            toast.success(`Categoria ${response.data.nome} adicionada com sucesso`);
            setCategorias([...categorias, response.data]);
            setNewCategoria('');
            setShowCategoriaModal(false);
            setError('');
        } catch (error) {
            toast.error('Erro ao adicionar categoria', error);
            setError('Erro ao adicionar categoria');
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
                                <label>Preço de Venda do Produto:</label>
                                <input
                                    type="text"
                                    name="precoVendaProduto"
                                    value={formData.precoVendaProduto}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Categoria:</label>
                                <select
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleCategoriaChange}
                                    required
                                >
                                    <option value="">Selecione uma categoria</option>
                                    <option value="nova_categoria">Cadastrar nova categoria + </option>
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
                                    onChange={handleFornecedorChange}
                                    required
                                >
                                    <option value="">Selecione um fornecedor</option>
                                    <option value="novo_fornecedor">Cadastrar novo fornecedor + </option>
                                    {fornecedores.map((fornecedor) => (
                                        <option key={fornecedor.id} value={fornecedor.id}>
                                            {fornecedor.nomeFantasia}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.field}>
                                <label>Alerta Moderado:</label>
                                <input
                                    type="number"
                                    name="alertaModerado"
                                    value={formData.alerta.alertaModerado}
                                    onChange={handleAlertaInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Alerta Grave:</label>
                                <input
                                    type="number"
                                    name="alertaGrave"
                                    value={formData.alerta.alertaGrave}
                                    onChange={handleAlertaInputChange}
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

            {showCategoriaModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Cadastrar Nova Categoria</h2>
                        <label>Nome da Categoria:</label>
                        <input
                            type="text"
                            value={newCategoria}
                            onChange={(e) => setNewCategoria(e.target.value)}
                        />
                        <button onClick={handleAddCategoria}>Adicionar</button>
                        <button onClick={() => setShowCategoriaModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default CadastroProduto;
