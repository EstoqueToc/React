import React, { useEffect, useState } from 'react';
import styles from './Produtos.module.css';
import { Link } from 'react-router-dom';
import adicionarProdutoImg from '../../Assets/adicionar-produto.png';
import OioArrow from '../../Assets/oui--arrow-up.svg';
import Tabler from '../../Assets/tabler--file-export (1).svg';
import SideBar from '../../Componentes/NavBarLateral/NavBarLateral';
import api from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Produtos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProdutoId, setSelectedProdutoId] = useState(null);
  const [quantidade, setQuantidade] = useState(0);
  const [historico, setHistorico] = useState([]);
  const [indiceHistorico, setIndiceHistorico] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstoque, setFiltroEstoque] = useState('');
  const empresaId = sessionStorage.getItem('ID_EMPRESA');
  const acesso = sessionStorage.getItem('ACESSO');

  useEffect(() => {
    // eslint-disable-next-line
    fetchInformacoesEstoque();
    // eslint-disable-next-line
  }, []);

  const fetchInformacoesEstoque = async () => {
    try {
      const response = await api.get('/estoque/informacoes', {
        params: { empresaId },
      });
      setProdutos(response.data);
      await api.get(`/estoque/total`)
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const fetchProdutos = async (nome, empresaId) => {
    try {
      const response = await api.get(`/estoque/produtos/simples/${nome}/${empresaId}`);
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleSearch = async () => {
    try {
      if (searchTerm.trim() === "") {
        fetchInformacoesEstoque();
        return;
      } else {
        fetchProdutos(searchTerm, empresaId);
      }

    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleFiltroChange = (event) => {
    setFiltroEstoque(event.target.value);
    fetchProdutosFiltrados(event.target.value);
  };

  const fetchProdutosFiltrados = async (filtro) => {
    try {
      switch (filtro) {
        case 'alto':
          const responseAlto = await api.get(`/estoque/alto`, {
            params: { empresaId },
          });
          setProdutos(responseAlto.data);
          break;
        case 'medio':
          const responseMedio = await api.get(`/estoque/medio`, {
            params: { empresaId },
          });
          setProdutos(responseMedio.data);
          break;
        case 'baixo':
          const responseBaixo = await api.get(`/estoque/baixo`, {
            params: { empresaId },
          });
          setProdutos(responseBaixo.data);
          break;
        default:
          fetchInformacoesEstoque();
          break;
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleEdit = (produtoId) => {
    sessionStorage.setItem('ID_EDIT_PRODUTO', produtoId);
    navigate('/CadastroProduto');
  };

  const handleMovimentacao = (produtoId) => {
    setSelectedProdutoId(produtoId);
    setShowModal(true);
  };

  const handleAddQuantidade = async () => {
    if (quantidade <= 0) {
      toast.error('Digite uma quantidade válida para adicionar.');
      return;
    }
    const produtoIndex = produtos.findIndex((p) => p.id === selectedProdutoId);
    const novoProduto = { ...produtos[produtoIndex], quantidade: produtos[produtoIndex].quantidade + quantidade };

    const novosProdutos = [...produtos];
    novosProdutos[produtoIndex] = novoProduto;
    setProdutos(novosProdutos);

    addToHistory("adicionar", selectedProdutoId, produtos[produtoIndex].quantidade, novoProduto.quantidade);
    toast.success(`Adicionado ${quantidade} unidades ao estoque.`);
    closeModal();
  };

  const handleRemoveQuantidade = async () => {
    if (quantidade <= 0) {
      toast.error('Digite uma quantidade válida para retirar.');
      return;
    }

    const produtoIndex = produtos.findIndex((p) => p.id === selectedProdutoId);
    if (quantidade > produtos[produtoIndex].quantidade) {
      toast.error('Não é possível retirar mais do que a quantidade disponível.');
      return;
    }

    const novoProduto = { ...produtos[produtoIndex], quantidade: produtos[produtoIndex].quantidade - quantidade };

    const novosProdutos = [...produtos];
    novosProdutos[produtoIndex] = novoProduto;
    setProdutos(novosProdutos);
    addToHistory("remover", selectedProdutoId, produtos[produtoIndex].quantidade, novoProduto.quantidade);
    toast.success(`Removido ${quantidade} unidades do estoque.`);
    closeModal();
  };

  const addToHistory = (tipo, produtoId, quantidadeAntes, quantidadeAlterada) => {
    const operacao = { tipo, produtoId, quantidadeAntes, quantidadeAlterada };
    const novoHistorico = [...historico.slice(0, indiceHistorico + 1), operacao];
    setHistorico(novoHistorico);
    setIndiceHistorico(indiceHistorico + 1);
  };

  const undo = () => {
    if (indiceHistorico >= 0) {
      const operacaoUndo = historico[indiceHistorico];
      const { produtoId, quantidadeAntes } = operacaoUndo;

      const produtoIndex = produtos.findIndex((p) => p.id === produtoId);
      const novoProduto = { ...produtos[produtoIndex], quantidade: quantidadeAntes };
      const novosProdutos = [...produtos];
      novosProdutos[produtoIndex] = novoProduto;
      setProdutos(novosProdutos);

      setIndiceHistorico(indiceHistorico - 1);
    }
  };

  const redo = () => {
    if (indiceHistorico < historico.length - 1) {
      const operacaoRedo = historico[indiceHistorico + 1];
      const { produtoId, quantidadeAlterada } = operacaoRedo;

      const produtoIndex = produtos.findIndex((p) => p.id === produtoId);
      const novoProduto = { ...produtos[produtoIndex], quantidade: quantidadeAlterada };
      const novosProdutos = [...produtos];
      novosProdutos[produtoIndex] = novoProduto;
      setProdutos(novosProdutos);

      setIndiceHistorico(indiceHistorico + 1);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProdutoId(null);
    setQuantidade(0);
  };

  const saveChanges = async () => {
    if (historico.length === 0) {
      return;
    }

    try {
      for (let i = 0; i <= indiceHistorico; i++) {
        const operacao = historico[i];
        const { tipo, produtoId, quantidadeAlterada } = operacao;

        console.log("Valor da quantidade alterada: ", quantidadeAlterada)

        if (tipo === 'adicionar') {
          await api.post(`/estoque/adicionar/${produtoId}?quantidadeAlterada=${quantidadeAlterada}`);
        } else if (tipo === 'remover') {
          await api.post(`/estoque/remover/${produtoId}?quantidadeAlterada=${quantidadeAlterada}`);
        }
      }

      toast.success('Alterações salvas com sucesso.');
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      toast.error('Erro ao salvar alterações. Por favor, tente novamente.');
    } finally {
      setHistorico([]);
      setIndiceHistorico(-1);
      fetchInformacoesEstoque(); // Atualiza as informações de estoque após salvar as alterações
    }
  };

  const handleExportarRelatorio = async () => {
    try {
      await api.post('/produtos/csv/produto');

      const response = await api.get('/produtos/csv/produto/download', {
        responseType: 'blob',
      });

      // Crie um link para fazer o download do arquivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'produtos.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Erro ao exportar o relatório:', error);
      toast.error('Erro ao exportar o relatório. Por favor, tente novamente.');
    }
  };

  const handleDelete = async (produtoId) => {
    try {
      await api.delete(`/estoque/${produtoId}`);
      toast.success('Produto excluído com sucesso!');
      fetchInformacoesEstoque();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      toast.error('Erro ao excluir produto. Por favor, tente novamente.');
    }
  }

  return (
    <>
      <SideBar BreadCrumb='Produtos' />
      <div className={styles.header}>
        <div className={styles.navColection}>
          <Link to='/CadastroProduto' className={styles.logo}>
            Produto
            <img src={adicionarProdutoImg} alt='adicionar novo produto' />
          </Link>
          <div className={styles['header-right']}>
            <input
              type='search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Pesquisar'
            />
            <button className={styles.pesquisar} onClick={handleSearch}>Pesquisar</button>
          </div>
        </div>

        <div className={styles['container-usuarios']}>
          <h1>Todos seus produtos</h1>
          <div id='quadrado' className={styles.quadrado}>
            <div className={styles.cabelaho} id='cabecalho'>
              <img src={OioArrow} alt='' className={styles.rotate} />
            </div>
          </div>

          <h4>Filtros de Status do seu Estoque</h4>
          <div className={styles.filtroStatus}>
            <div>
              <input
                type='radio'
                name='prioridade'
                value=''
                checked={filtroEstoque === ''}
                onChange={handleFiltroChange}
              /> Todos
            </div>
            <div>
              <input
                type='radio'
                name='prioridade'
                value='alto'
                checked={filtroEstoque === 'alto'}
                onChange={handleFiltroChange}
              /> Alto
            </div>
            <div>
              <input
                type='radio'
                name='prioridade'
                value='medio'
                checked={filtroEstoque === 'medio'}
                onChange={handleFiltroChange}
              /> Médio
            </div>
            <div>
              <input
                type='radio'
                name='prioridade'
                value='baixo'
                checked={filtroEstoque === 'baixo'}
                onChange={handleFiltroChange}
              /> Baixo
            </div>
          </div>

          <button onClick={handleExportarRelatorio} className={styles.exportarRelatorio}>
            <img src={Tabler} alt="Exportar Relatório" />
            Exportar Relatório
          </button>

          <table className={styles['tabela-usuario']}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço Unitário</th>
                <th>Status Estoque</th>
                <th>Movitação</th>
                {acesso === '1' && <th>Ações</th>}
              </tr>
            </thead>
            <tbody id='products-table'>
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.produto}</td>
                  <td>{produto.quantidade}</td>
                  <td>{produto.precoUnitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td>{produto.statusEstoque}</td>
                  <td className={styles['acao-buttons']}>
                    <button className={styles.movimentacao} onClick={() => handleMovimentacao(produto.id)}>
                      Movimentação &ensp;
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shuffle" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5" />
                        <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192" />
                      </svg>
                    </button>
                  </td>
                    {acesso === '1' && (
                  <td className={styles['acao-buttons-acoes']}>
                    <button className={styles.editar} onClick={() => handleEdit(produto.id)}>
                      Editar &ensp;
                      <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-pen-fill' viewBox='0 0 16 16'>
                        <path d='m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001' />
                      </svg>
                    </button>
                    <button className={styles.excluir} onClick={() => handleDelete(produto.id)}>
                      Excluir &ensp;
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                      </svg>
                    </button>
                  </td>
                    )}
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && (
            <div className={styles.modalBackground}>
              <div className={styles.modalContainer}>
                <h3>Escolha a quantidade a ser movimentada:</h3>
                <input
                  type='number'
                  placeholder='Quantidade'
                  value={quantidade}
                  onChange={(e) => setQuantidade(parseInt(e.target.value))}
                  className={styles.modalInput}
                />
                <div className={styles.modalButtons}>
                  <button onClick={handleAddQuantidade}>Adicionar</button>
                  <button onClick={handleRemoveQuantidade}>Retirar</button>
                  <button onClick={closeModal}>Cancelar</button>
                </div>
              </div>
            </div>
          )}

          <div className={styles['acoes-salvar']}>
            {indiceHistorico >= 0 && (
              <button className={styles.desfazer} onClick={undo}>
                Desfazer Movimentação
              </button>
            )}
            {indiceHistorico < historico.length - 1 && (
              <button className={styles.refazer} onClick={redo}>
                Refazer Movimentação
              </button>
            )}
            <button className={styles.salvar} onClick={saveChanges} disabled={historico.length === 0}>
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Produtos;
