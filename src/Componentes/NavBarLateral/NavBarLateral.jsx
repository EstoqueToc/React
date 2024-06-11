import React, { useState } from 'react';
import logo from '../../Assets/Logo.png'; // Certifique-se de que o caminho esteja correto
import userImage from '../../Assets/usuario.png'
import styles from './teste.module.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser,faUsers, faAngleDown, faUserPlus, faBoxes, faCube, faTruck, faChartLine, faFile, faEnvelope, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
                            <a href="./inicial.html">
                                <FontAwesomeIcon icon={faHome} size="lg" />
                                <Link to={"/DashBoard"} className={styles['nav-text']}>Página Inicial</Link>
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
                                        <FontAwesomeIcon icon={faUsers} size="sm" id="iconeCadastrar" />
                                        <Link to={"/usuarios"} className={styles['nav-text']}> Funcionarios</Link>
                                    </a>
                                </li>
                                <li>
                                    <a href="cadastroUsuario.html">
                                        <FontAwesomeIcon icon={faUserPlus} size="sm" id="iconeCadastrar" />
                                        <Link to={"/CadastroFunc"} className={styles['nav-text']}>Cadastrar Funcionario</Link>
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
                                    <a href="estoque.html">
                                        <FontAwesomeIcon icon={faCube} size="sm" />
                                        <Link to={"/Produtos"} className={styles['nav-text']}>Meu Estoque</Link>
                                    </a>
                                </li>
                                <li>
                                    <a href="estoque.html">
                                        <FontAwesomeIcon icon={faCube} size="sm" />
                                        <Link to={"/CadastroProduto"} className={styles['nav-text']}>Cadastrar Produtos</Link>
                                    </a>
                                </li>
                               
                                <li>
                                    <a href="cadastroFornecedor.html">
                                        <FontAwesomeIcon icon={faTruck} size="sm" />
                                        <Link to={"/CadastroFornecedor"} className={styles['nav-text']}>Cadastrar Fornecedor</Link>
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
                            <a href="#" onClick={() => toggleSair()}>
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
