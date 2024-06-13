import React, { useState } from 'react';
import logo from '../../Assets/Logo.png'; // Certifique-se de que o caminho esteja correto
import userImage from '../../Assets/usuario.png'
import styles from './teste.module.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers, faAngleDown, faUserPlus, faBoxes, faCube, faTruck, faEnvelope, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
    const [submenuFuncionario, setSubmenuFuncionario] = useState(false);
    const [submenuEstoque, setSubmenuEstoque] = useState(false);
    const [submenuRelatorios, setSubmenuRelatorios] = useState(false);

    const empresa = sessionStorage.getItem('NOME_EMPRESA');
    const usuario = sessionStorage.getItem('NOME');

    const toggleSubmenu = (submenu) => {
        if (submenu === 'funcionario') {
            setSubmenuFuncionario(!submenuFuncionario);
        } else if (submenu === 'estoque') {
            setSubmenuEstoque(!submenuEstoque);
        } else if (submenu === 'relatorios') {
            setSubmenuRelatorios(!submenuRelatorios);
        }
    };

    const toggleSair = () => {
        sessionStorage.clear();
        window.location.href = '/';
    }

    return (
        <>
            <div>
                <div className={styles['superior']}>
                    <div className={styles['perfil']}>
                        <h6 className={styles['empresa']}>{empresa} x {usuario} &ensp;</h6>
                        <img src={userImage} alt="Perfil" className={styles['fotoPerfil']} />
                    </div>
                </div>
            </div>

            <nav className={styles['main-menu']}>
                <div>
                    <img src={logo} alt="Logo" className={styles['logo']} />
                </div>
                <div className={styles.scrollbar} id="style-1">
                    <ul>
                        <li className={styles['item-menu']}>
                            <Link to="/DashBoard" className={styles['nav-link']}>
                                <FontAwesomeIcon icon={faHome} size="lg" />
                                <span className={styles['nav-text']}>Página Inicial</span>
                            </Link>
                        </li>
                        <li className={styles['item-menu']}>
                            <div onClick={() => toggleSubmenu('funcionario')} className={styles['nav-link']}>
                                <FontAwesomeIcon icon={faUser} size="lg" />
                                <span className={styles['nav-text']}>Funcionário <FontAwesomeIcon icon={faAngleDown} /></span>
                            </div>
                            <ul id="submenu-funcionario" style={{ display: submenuFuncionario ? 'block' : 'none' }}>
                                <li>
                                    <Link to="/usuarios" className={styles['nav-link']}>
                                        <FontAwesomeIcon icon={faUsers} size="sm" id="iconeCadastrar" />
                                        <span className={styles['nav-text']}>Funcionarios</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/CadastroFunc" className={styles['nav-link']}>
                                        <FontAwesomeIcon icon={faUserPlus} size="sm" id="iconeCadastrar" />
                                        <span className={styles['nav-text']}>Cadastrar Funcionario</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className={styles['item-menu']}>
                            <div onClick={() => toggleSubmenu('estoque')} className={styles['nav-link']}>
                                <FontAwesomeIcon icon={faBoxes} size="lg" />
                                <span className={styles['nav-text']}>Estoque <FontAwesomeIcon icon={faAngleDown} /></span>
                            </div>
                            <ul id="submenu-estoque" style={{ display: submenuEstoque ? 'block' : 'none' }}>
                                <li>
                                    <Link to="/Produtos" className={styles['nav-link']}>
                                        <FontAwesomeIcon icon={faCube} size="sm" />
                                        <span className={styles['nav-text']}>Meu Estoque</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/CadastroProduto" className={styles['nav-link']}>
                                        <FontAwesomeIcon icon={faCube} size="sm" />
                                        <span className={styles['nav-text']}>Cadastrar Produtos</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/CadastroFornecedor" className={styles['nav-link']}>
                                        <FontAwesomeIcon icon={faTruck} size="sm" />
                                        <span className={styles['nav-text']}>Cadastrar Fornecedor</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className={styles['item-menu']}>
                            <Link to="/Contato" className={styles['nav-link']}>
                                <FontAwesomeIcon icon={faEnvelope} size="lg" />
                                <span className={styles['nav-text']}>Contato</span>
                            </Link>
                        </li>
                        <li className={styles['item-menu']}>
                            <Link to="/Ajuda" className={styles['nav-link']}>
                                <FontAwesomeIcon icon={faQuestionCircle} size="lg" />
                                <span className={styles['nav-text']}>Ajuda</span>
                            </Link>
                        </li>
                        <li className={styles['item-menu']}>
                            <div onClick={toggleSair} className={styles['nav-link']}>
                                <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                                <span className={styles['nav-text']}>Sair</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Menu;