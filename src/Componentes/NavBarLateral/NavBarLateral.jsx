import React, { useState } from 'react';
import logo from '../../Assets/Logo.png'; // Certifique-se de que o caminho esteja correto
import userImage from '../../Assets/usuario.png'
import styles from './teste.module.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faAngleDown, faUserPlus, faBoxes, faCube, faTruck, faChartLine, faFile, faEnvelope, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
    const [submenuFuncionario, setSubmenuFuncionario] = useState(false);
    const [submenuEstoque, setSubmenuEstoque] = useState(false);
    const [submenuRelatorios, setSubmenuRelatorios] = useState(false);

    const toggleSubmenu = (submenu) => {
        if (submenu === 'funcionario') {
            setSubmenuFuncionario(!submenuFuncionario);
        } else if (submenu === 'estoque') {
            setSubmenuEstoque(!submenuEstoque);
        } else if (submenu === 'relatorios') {
            setSubmenuRelatorios(!submenuRelatorios);
        }
    };

    return (

        <>
            <div>
                <div className={styles['superior']}>
                    <div className={styles['perfil']}>
                        <h6 className={styles['empresa']}>Empresa x Ltda</h6>
                        <img src={userImage} alt="Perfil" className={styles['fotoPerfil']} />
                    </div>
                </div>

                <section className={styles['breadcrumbSuperior']}>
                    <ul className={styles['breadcrumb']}>
                        <li><a href="./inicial.html">Home</a></li>
                        <li><a href="#">Relatórios</a></li>
                        <li><a href="#" className={styles['localAtual']}>Gerar Relatório</a></li>
                    </ul>
                </section>
            </div>

            <nav className={styles['main-menu']}>
                <div>
                    <img src={logo} alt="Logo" className={styles['logo']} />
                </div>
                <div className={styles.scrollbar} id="style-1">
                    <ul>
                        <li className={styles['item-menu']}>
                            <a href="./inicial.html">
                                <FontAwesomeIcon icon={faHome} size="lg" />
                                <span className={styles['nav-text']}>Página Inicial</span>
                            </a>
                        </li>
                        <li  className={styles['item-menu']}>
                            <a href="#" onClick={() => toggleSubmenu('funcionario')}>
                                <FontAwesomeIcon icon={faUser} size="lg" />
                                <span className={styles['nav-text']}>Funcionário <FontAwesomeIcon icon={faAngleDown} /></span>
                            </a>
                            <ul id="submenu-funcionario" style={{ display: submenuFuncionario ? 'block' : 'none' }}>
                                <li>
                                    <a href="cadastroUsuario.html">
                                        <FontAwesomeIcon icon={faUserPlus} size="sm" id="iconeCadastrar" />
                                        <Link to={"/"} className={styles['nav-text']}>Cadastrar Funcionario</Link>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li  className={styles['item-menu']}>
                            <a href="#" onClick={() => toggleSubmenu('estoque')}>
                                <FontAwesomeIcon icon={faBoxes} size="lg" />
                                <span className={styles['nav-text']}>Estoque <FontAwesomeIcon icon={faAngleDown} /></span>
                            </a>
                            <ul id="submenu-estoque" style={{ display: submenuEstoque ? 'block' : 'none' }}>
                                <li>
                                    <a href="cadastroProdutos.html">
                                        <FontAwesomeIcon icon={faCube} size="sm" />
                                        <Link to={"/"} className={styles['nav-text']}>Cadastrar Produto</Link>
                                    </a>
                                </li>
                                <li>
                                    <a href="cadastroFornecedor.html">
                                        <FontAwesomeIcon icon={faTruck} size="sm" />
                                        <Link to={"/"} className={styles['nav-text']}>Cadastrar Fornecedor</Link>
                                    </a>
                                </li>
                                <li>
                                    <a href="dashboard.html">
                                        <FontAwesomeIcon icon={faChartLine} size="sm" />
                                        <span className={styles['nav-text']}>Análise do Estoque</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="estoque.html">
                                        <FontAwesomeIcon icon={faCube} size="sm" />
                                        <span className={styles['nav-text']}>Meu Estoque</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li  className={styles['item-menu']}>
                            <a href="#" onClick={() => toggleSubmenu('relatorios')}>
                                <FontAwesomeIcon icon={faFile} size="lg" />
                                <span className={styles['nav-text']}>Relatórios <FontAwesomeIcon icon={faAngleDown} /></span>
                            </a>
                            <ul id="submenu-relatorios" style={{ display: submenuRelatorios ? 'block' : 'none' }}>
                                <li>
                                    <a href="relatorios.html">
                                        <FontAwesomeIcon icon={faFile} size="lg" />
                                        <Link to={"/"} className={styles['nav-text']}>Gerar Relatorio</Link>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li  className={styles['item-menu']}>
                            <a href="#">
                                <FontAwesomeIcon icon={faEnvelope} size="lg" />
                                <Link to={"/"} className={styles['nav-text']}>Contato</Link>
                            </a>
                        </li>
                        <li  className={styles['item-menu']}>
                            <a href="#">
                                <FontAwesomeIcon icon={faQuestionCircle} size="lg" />
                                <Link to={"/"} className={styles['nav-text']}>Ajuda</Link>
                            </a>
                        </li>
                        <li  className={styles['item-menu']}>
                            <a href="#">
                                <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                                <Link to={"/"} className={styles['nav-text']}>Sair</Link>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Menu;
