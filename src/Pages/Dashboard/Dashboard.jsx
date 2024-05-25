import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import '../css/dashboard.css';
import '../css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBoxes, faChartLine, faFile, faEnvelope, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
    useEffect(() => {
        const ctx = document.getElementById('revenueChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [{
                    label: 'Total de Faturamento',
                    data: [2569, 3236, 2890, 4022, 3688, 4277, 3902, 4590, 4782, 5120, 4899, 5300], // Substituir por seus dados reais
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                maintainAspectRatio: true,
                aspectRatio: 2 // Ajuste conforme necessário para controlar a altura do gráfico
            }
        });
    }, []);

    const toggleSubmenu = (submenuId) => {
        const submenu = document.getElementById(submenuId);
        submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
    };

    const botaoMenu = () => {
        const menuLateral = document.getElementById('menuLateral');
        const botaoMenuImg = document.getElementById('botaoMenuImg');
        menuLateral.classList.toggle('ver-menu');
        botaoMenuImg.style.display = menuLateral.classList.contains('ver-menu') ? 'none' : 'block';

        const content = document.querySelector('.content');
        content.classList.toggle('content-shift');
    };

    const openNav = () => {
        document.getElementById('mySidenav').style.width = '20%';
        document.querySelector('.main-content').style.width = '80%';
    };

    const closeNav = () => {
        document.getElementById('mySidenav').style.width = '0';
        document.querySelector('.main-content').style.width = '100%';
    };

    return (
        <>
            <div className="superior">
                <div className="perfil">
                    <h6 className="empresa">Empresa x Ltda</h6>
                    <img src="../img/usuario.png" alt="" className="fotoPerfil" />
                </div>
            </div>
            <section className="breadcrumbSuperior">
                <ul className="breadcrumb">
                    <li><a href="./inicial.html">Home</a></li>
                    <li><a href="#">Relatórios</a></li>
                    <li><a href="#" className="localAtual"> Gerar Relatório</a></li>
                </ul>
            </section>
            <nav className="main-menu" id="menuLateral">
                <div>
                    <img src="../img/Logo.png" alt="Logo" className="logo" />
                </div>
                <div className="scrollbar" id="style-1">
                    <ul>
                        <li className="item-menu">
                            <a href="./inicial.html">
                                <FontAwesomeIcon icon={faHome} />
                                <span className="nav-text">Página Inicial</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onClick={() => toggleSubmenu('submenu-funcionario')}>
                                <FontAwesomeIcon icon={faUser} />
                                <span className="nav-text">Funcionário<FontAwesomeIcon icon="angle-down" /></span>
                            </a>
                            <ul id="submenu-funcionario" style={{ display: 'none' }}>
                                <li>
                                    <a href="cadastroUsuario.html">
                                        <i className="fa fa-user-plus fa-sm" id="iconeCadastrar"></i>
                                        <span className="nav-text" id="textoCadastrarFuncionario">Cadastrar Funcionário</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onClick={() => toggleSubmenu('submenu-estoque')}>
                                <FontAwesomeIcon icon={faBoxes} />
                                <span className="nav-text"> Estoque <FontAwesomeIcon icon="angle-down" /></span>
                            </a>
                            <ul id="submenu-estoque" style={{ display: 'none' }}>
                                <li>
                                    <a href="cadastroProdutos.html">
                                        <i className="fa fa-cube fa-sm"></i>
                                        <span className="nav-text">Cadastrar Produto</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="cadastroFornecedor.html">
                                        <i className="fa fa-truck fa-sm"></i>
                                        <span className="nav-text">Cadastrar Fornecedor</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="dashboard.html">
                                        <i className="fa fa-chart-line fa-sm"></i>
                                        <span className="nav-text">Análise do Estoque</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="estoque.html">
                                        <i className="fa fa-cube fa-sm"></i>
                                        <span className="nav-text">Meu Estoque</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onClick={() => toggleSubmenu('submenu-relatorios')}>
                                <FontAwesomeIcon icon={faFile} />
                                <span className="nav-text">Relatórios<FontAwesomeIcon icon="angle-down" /></span>
                            </a>
                            <ul id="submenu-relatorios" style={{ display: 'none' }}>
                                <li>
                                    <a href="relatorios.html">
                                        <FontAwesomeIcon icon={faFile} />
                                        <span className="nav-text">Gerar Relatório</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span className="nav-text">Contato</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                                <span className="nav-text">Ajuda</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                <span className="nav-text">Sair</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="sec">
                <main className="main-content">
                    <section className="cards">
                        <div className="card">
                            <h2>Faturamento mês Janeiro</h2>
                            <p>R$ 2.569,00</p>
                            <span className="negative">-10% este mês</span>
                        </div>
                        <div className="card">
                            <h2>Faturamento mês Passado</h2>
                            <p>R$ 3.236,94</p>
                            <span className="positive">+20% este mês</span>
                        </div>
                        <div className="card">
                            <h2>Total Produtos Perdidos</h2>
                            <p>120 Uni.</p>
                            <span className="positive">+10% este mês</span>
                        </div>
                    </section>
                    <section className="chart">
                        <h2>Total de Faturamento</h2>
                        <canvas id="revenueChart"></canvas>
                    </section>
                </main>
            </div>
        </>
    );
}

export default Dashboard;

