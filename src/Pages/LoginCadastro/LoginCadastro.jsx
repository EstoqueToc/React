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

    const handleEnter = () => {
        const login = {
            email: email,
            senha: senha
        };

        api.post(`/usuarios/login`, login)
        .then((response) => {
            console.log("API Response:", response);
            const { data } = response;

            if (data.token) { 
                toast.success("Login realizado com sucesso!");

                sessionStorage.setItem("EMAIL", data.email);
                sessionStorage.setItem("ID_EMPRESA", data.fkEmpresa.id);
                sessionStorage.setItem("ID_USUARIO", data.userId);
                sessionStorage.setItem("NOME", data.nome);
                sessionStorage.setItem("FUNCAO", data.funcao);
                sessionStorage.setItem("ACESSO", data.acesso);
                sessionStorage.setItem("TOKEN", data.token);
                console.log("Data", data);

                navigate("/pagina-geral");
            } else {
                toast.error("Login falhou. Verifique suas credenciais.");
            }
        }).catch((error) => {
            console.error("Error during login:", error);
            toast.error("Ocorreu um erro ao verificar os dados, por favor, tente novamente.");
        });
    }

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }

    const handleSave = () => {
        
        const objetoAdicionado = {
            nomeEmpresa: nomeEmpresa,
            razaoSocial: null,
            cnpj: CNPJ,
            telefone: null,
            emailCorporativo: emailCorporativo,
            fklogradouro: null,
            ativo: true,
        };

        console.log("Objeto adicionado", objetoAdicionado);

        api.post(`/empresas/cadastro`, objetoAdicionado)
            .then((response) => {
                console.log("Empresa cadastrada com sucesso!", response.data);
                handleSaveUser(response.data.id);
                toast.success("Nova Empresa cadastrada com sucesso!");
            }).catch((error) => {
                console.error("Error during empresa cadastro:", error);
                toast.error("Ocorreu um erro ao salvar os dados, por favor, tente novamente.");
            });
    };

    const handleSaveUser = (fkEmpresa) => {
        const usuarioAdicionado = {
            nome: razaoSocial,
            CPF: null,
            email: emailCorporativo,
            senha: senhaEmpresa,
            dtNascimento: null,
            funcao: 'Empresa',
            acesso: true,
            fkEmpresa: {
                id: fkEmpresa
            }
        }

        console.log("Usuário adicionado", usuarioAdicionado);

        api.post(`/usuarios/cadastro`, usuarioAdicionado)
            .then(() => {
                toast.success("Usuário cadastrado com sucesso!");
            }).catch((error) => {
                console.error("Error during usuario cadastro:", error);
                toast.error("Ocorreu um erro ao salvar os dados do usuario, por favor, tente novamente.");
            });
    }

    return (
        <>
            <NavBar />
            <div className="container" id="container">
                <div className="form-container cadastrar-se">
                    <form>
                        
                        <div className="formulario">
                           
                            <input type="text" value={nomeEmpresa} placeholder="Nome Fantasia"
                                onChange={(e) => handleInputChange(e, setNomeEmpresa)} />
                            <input type="text" value={CNPJ} placeholder="CNPJ"
                                onChange={(e) => handleInputChange(e, setCNPJ)} />
                            <input type="email" value={emailCorporativo} placeholder="E-mail Corporativo"
                                onChange={(e) => handleInputChange(e, setEmailCorporativo)} />
                            <input type="text" value={razaoSocial} placeholder="Nome Representante"
                                onChange={(e) => handleInputChange(e, setRazaoSocial)} />
                            <input type="text" value={razaoSocial} placeholder="CEP"
                                onChange={(e) => handleInputChange(e, setRazaoSocial)} />
                            <input type="text" value={razaoSocial} placeholder="Rua"
                                onChange={(e) => handleInputChange(e, setRazaoSocial)} />
                            <input type="text" value={razaoSocial} placeholder="Bairro"
                                onChange={(e) => handleInputChange(e, setRazaoSocial)} />
                            <input type="text" value={razaoSocial} placeholder="Cidade"
                                onChange={(e) => handleInputChange(e, setRazaoSocial)} />
                            <input type="text" value={razaoSocial} placeholder="Estado"
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