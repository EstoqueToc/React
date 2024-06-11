import React, { useState } from 'react';
import logo from '../../Assets/Logo.png';
import userImage from '../../Assets/usuario.png';
import styles from './teste.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUser,
    faUsers,
    faAngleDown,
    faUserPlus,
    faBoxes,
    faCube,
    faTruck,
    faEnvelope,
    faQuestionCircle,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

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
    };

    return (
        <>
            <div>
                <div className={styles['superior']}>
                    <div className={styles['perfil']}>
                        <h6 className={styles['empresa']}>
                            {empresa} x {usuario} &ensp;
                        </h6>
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
                            <div>
                                <Link to="/DashBoard" className={styles['nav-text']}>
                                    <FontAwesomeIcon icon={faHome} size="lg" />
                                    Página Inicial
                                </Link>
                            </div>
                        </li>
                        <li className={styles['item-menu']} onClick={() => toggleSubmenu('funcionario')}>
                            <div>
                                <FontAwesomeIcon icon={faUser} size="lg" />
                                <span className={styles['nav-text']}>
                                    Funcionário <FontAwesomeIcon icon={faAngleDown} />
                                </span>
                            </div>
                            <ul id="submenu-funcionario" style={{ display: submenuFuncionario ? 'block' : 'none' }}>
                                <li>
                                    <Link to="/usuarios" className={styles['nav-text']}>
                                        <FontAwesomeIcon icon={faUsers} size="sm" id="iconeCadastrar" />
                                        Funcionários
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/CadastroFunc" className={styles['nav-text']}>
                                        <FontAwesomeIcon icon={faUserPlus} size="sm" id="iconeCadastrar" />
                                        Cadastrar Funcionário
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className={styles['item-menu']} onClick={() => toggleSubmenu('estoque')}>
                            <div>
                                <FontAwesomeIcon icon={faBoxes} size="lg" />
                                <span className={styles['nav-text']}>
                                    Estoque <FontAwesomeIcon icon={faAngleDown} />
                                </span>
                            </div>
                            <ul id="submenu-estoque" style={{ display: submenuEstoque ? 'block' : 'none' }}>
                                <li>
                                    <Link to="/Produtos" className={styles['nav-text']}>
                                        <FontAwesomeIcon icon={faCube} size="sm" />
                                        Meu Estoque
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/CadastroProduto" className={styles['nav-text']}>
                                        <FontAwesomeIcon icon={faCube} size="sm" />
                                        Cadastrar Produtos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/CadastroFornecedor" className={styles['nav-text']}>
                                        <FontAwesomeIcon icon={faTruck} size="sm" />
                                        Cadastrar Fornecedor
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className={styles['item-menu']}>
                            <div>
                                <Link to="/" className={styles['nav-text']}>
                                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                                    Contato
                                </Link>
                            </div>
                        </li>
                        <li className={styles['item-menu']}>
                            <div>
                                <Link to="/" className={styles['nav-text']}>
                                    <FontAwesomeIcon icon={faQuestionCircle} size="lg" />
                                    Ajuda
                                </Link>
                            </div>
                        </li>
                        <li className={styles['item-menu']} onClick={() => toggleSair()}>
                            <div>
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
