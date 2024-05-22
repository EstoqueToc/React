import React, { useEffect, useState } from "react";
import './LoginCadastro.css';
import { BiLogoLinkedin } from "react-icons/bi";
import { CgFacebook } from "react-icons/cg";
import { AiOutlineGooglePlus } from "react-icons/ai";
import NavBar from "../../Componentes/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import { Link } from "react-router-dom";

const LoginCadastro = () => {
    useEffect(() => {
        const cadastrarBtn = document.getElementById('cadastrar-se');
        const entrarBtn = document.getElementById('entrar');

        const handleCadastrarClick = () => {
            const container = document.getElementById('container');
            container.classList.add("active");
        }

        const handleEntrarClick = () => {
            const container = document.getElementById('container');
            container.classList.remove("active");
        }

        cadastrarBtn.addEventListener('click', handleCadastrarClick);
        entrarBtn.addEventListener('click', handleEntrarClick);

        return () => {
            cadastrarBtn.removeEventListener('click', handleCadastrarClick);
            entrarBtn.removeEventListener('click', handleEntrarClick);
        }
    }, []);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [nomeEmpresa, setNomeEmpresa] = useState("");
    const [CNPJ, setCNPJ] = useState("");
    const [emailCorporativo, setEmailCorporativo] = useState("");
    const [razaoSocial, setRazaoSocial] = useState("");
    const [senhaEmpresa, setSenhaEmpresa] = useState("");

    // const [nome, setNome] = useState("");
    // const [CPF, setCPF] = useState("");
    // const [dtNascimento, setDtNascimento] = useState("");

    const handleEnter = () => {
        api.get(`/usuarios/login/${email}/${senha}`).then((response) => {
            const { data } = response;
            console.log("Você chegou no console log", data);
            if (data === true) {
                toast.success("Login realizado com sucesso!");
                navigate("/pagina-geral");
            }
        }).catch(() => {
            toast.error("Ocorreu um erro ao verificar os dados, por favor, tente novamente.");
        });
    }

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }

    const handleSave = () => {
        
        const objetoAdicionado = {
            nomeEmpresa: nomeEmpresa,
            razaoSocial: razaoSocial,
            cnpj: CNPJ,
            telefone: null,
            emailCorporativo: emailCorporativo,
            senhaEmpresa: senhaEmpresa,
            logradouro: null,
            ativo: true,
        };

        api.post(`/empresas/cadastro`, objetoAdicionado)
            .then(() => {
                // handleSaveUser();
                toast.success("Nova Empresa cadastrada com sucesso!");
                sessionStorage.setItem("editado", JSON.stringify(objetoAdicionado));
                
            }).catch(() => {
                toast.error("Ocorreu um erro ao salvar os dados, por favor, tente novamente.");
            });
    };

    // const handleSaveUser = () => {
    //     const usuarioAdicionado = {
    //         nome,
    //         CPF,
    //         email,
    //         senha,
    //         dtNascimento,
    //         funcao: null,
    //         acesso: true
    //     }

    //     console.log("Usuário adicionado", usuarioAdicionado);

    //     api.post(`/usuarios/cadastro`, usuarioAdicionado)
    //         .then(() => {
    //             console.log("Usuário cadastrado com sucesso!");
    //         }).catch(() => {
    //             toast.error("Ocorreu um erro ao salvar os dados do usuario, por favor, tente novamente.");
    //         });
    // }

    return (
        <>
            <NavBar />
            <div className="container" id="container">
                <div className="form-container cadastrar-se">
                    <form>
                        <h1>Criar conta</h1>
                        <div className="social-icons">
                            <a href="./" className="icon">
                                <AiOutlineGooglePlus />
                            </a>
                            <a href="./" className="icon">
                                <CgFacebook />
                            </a>
                            <a href="./" className="icon">
                                <BiLogoLinkedin />
                            </a>
                        </div>
                        <div className="formulario">
                            <span>ou utilize seu email para se registrar</span>
                            <input type="text" value={nomeEmpresa} placeholder="Nome Empresa"
                                onChange={(e) => handleInputChange(e, setNomeEmpresa)} />
                            <input type="text" value={CNPJ} placeholder="CNPJ"
                                onChange={(e) => handleInputChange(e, setCNPJ)} />
                            <input type="email" value={emailCorporativo} placeholder="E-mail Corporativo"
                                onChange={(e) => handleInputChange(e, setEmailCorporativo)} />
                            <input type="text" value={razaoSocial} placeholder="Razão Social"
                                onChange={(e) => handleInputChange(e, setRazaoSocial)} />
                            <input type="password" value={senhaEmpresa} placeholder="Senha"
                                onChange={(e) => handleInputChange(e, setSenhaEmpresa)} />
                            {/* <input type="text" value={nome} placeholder="Nome" */}
                                {/* onChange={(e) => handleInputChange(e, setNome)} /> */}
                            {/* <input type="text" value={CPF} placeholder="CPF" */}
                                {/* onChange={(e) => handleInputChange(e, setCPF)} /> */}
                            {/* <input type="text" value={email} placeholder="E-mail Pessoal" */}
                                {/* onChange={(e) => handleInputChange(e, setEmail)} /> */}
                            {/* <input type="password" value={senha} placeholder="Senha" */}
                                {/* onChange={(e) => handleInputChange(e, setSenha)} /> */}
                            {/* <input type="password" placeholder="Confirmar Senha" /> */}
                            {/* <input type="date" value={dtNascimento} placeholder="Data de Nascimento" */}
                                {/* onChange={(e) => handleInputChange(e, setDtNascimento)} /> */}
                        </div>
                        <button id="entrar" type="button" onClick={handleSave}>Cadastrar</button>
                    </form>
                </div>
                <div className="form-container entrar">
                    <form>
                        <h1>Entrar</h1>
                        <div className="social-icons">
                            <a href="./" className="icon">
                                <AiOutlineGooglePlus />
                            </a>
                            <a href="./" className="icon">
                                <CgFacebook />
                            </a>
                            <a href="./" className="icon">
                                <BiLogoLinkedin />
                            </a>
                        </div>

                        <span>ou utilize seu email e senha</span>

                        <input
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => handleInputChange(e, setEmail)}

                        />
                        <input
                            type="password"
                            value={senha}
                            placeholder="Senha"
                            onChange={(e) => handleInputChange(e, setSenha)}
                        />

                        <a href="./">Esqueci minha senha!</a>

                        <button onClick={handleEnter} type="button">Entrar</button>
                    </form>
                </div>
                <div className="alternar-container">
                    <div className="alternar">
                        <div className="alternar-painel alternar-esquerda">
                            <h1>Bem Vindo!</h1>
                            <p>Entre com seus dados pessoais para utilizar o site por completo</p>
                            <button className="esconder" id="entrar">Entrar</button>
                        </div>
                        <div className="alternar-painel alternar-direita">
                            <h1>Olá, Amigo!</h1>
                            <p>Cadastre-se com seus dados pessoais para utilizar o site por completo</p>
                            <button className="esconder" id="cadastrar-se">cadastrar-se</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container2">
                <div className="signup-section">
                    <header>Signup</header>

                    <div className="social-buttons">
                        <button><i className='bx bxl-google'></i> Use Google</button>
                        <button><i className='bx bxl-apple'></i> Use Apple</button>
                    </div>

                    <div className="separator">
                        <div className="line"></div>
                        <p>Or</p>
                        <div className="line"></div>
                    </div>

                    <form>

                        <input
                            value={email}
                            type="email"
                            placeholder="Email address"
                            onChange={(e) => handleInputChange(e, setEmail)}
                            required />

                        <input
                            value={senha}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => handleInputChange(e, setSenha)}
                            required />

                        <a href="./">Forget Password?</a>
                        <button type="button" className="btn">Signup</button>
                    </form>

                </div>

                <div className="login-section">
                    <header>Login</header>

                    <div className="social-buttons">
                        <button><i className='bx bxl-google'></i> Use Google</button>
                        <button><i className='bx bxl-apple'></i> Use Apple</button>
                    </div>

                    <div className="separator">
                        <div className="line"></div>
                        <p>Or</p>
                        <div className="line"></div>
                    </div>

                    <form>
                        <input type="email" placeholder="Email address" required />
                        <input type="password" placeholder="Password" required />
                        <a href="./">Forget Password?</a>
                        <button type="submit" className="btn">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginCadastro;