import React, { useEffect, useState } from "react";
import './LoginCadastro.css';
import NavBar from "../../Componentes/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";

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

    const [razaoSocial, setRazaoSocial] = useState("");
    const [nomeEmpresa, setNomeEmpresa] = useState("");
    const [CNPJ, setCNPJ] = useState("");
    const [emailCorporativo, setEmailCorporativo] = useState("");
    const [senhaEmpresa, setSenhaEmpresa] = useState("");
    const [confirmSenhaEmrpesa, setConfirmSenhaEmrpesa] = useState("");

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
                sessionStorage.setItem("ID_EMPRESA", data.empresa.id);
                sessionStorage.setItem("ID_USUARIO", data.userId);
                sessionStorage.setItem("NOME_EMPRESA", data.empresa.nomeEmpresa);
                sessionStorage.setItem("NOME", data.nome);
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

        sessionStorage.clear();

        if (!razaoSocial || !nomeEmpresa || !CNPJ || !emailCorporativo || !senhaEmpresa) {
            toast.error("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (senhaEmpresa !== confirmSenhaEmrpesa) {
            toast.error("As senhas não coincidem.");
            return;
        }

        const objetoAdicionado = {
            nomeEmpresa: nomeEmpresa,
            razaoSocial: razaoSocial,
            cnpj: CNPJ,
            telefone: '1198754321',
            emailCorporativo: emailCorporativo,
            logradouro: null,
            ativo: 1,
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
            ativo: 1,
            funcao: 'Empresa',
            acesso: 1,
            empresa: {
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

                            <input
                                required
                                type="text"
                                value={nomeEmpresa}
                                placeholder="Nome Fantasia"
                                onChange={(e) => handleInputChange(e, setNomeEmpresa)}
                            />

                            <input
                                required
                                type="text"
                                value={CNPJ}
                                placeholder="CNPJ"
                                onChange={(e) => handleInputChange(e, setCNPJ)}

                            />

                            <input
                                required
                                type="email"
                                value={emailCorporativo}
                                placeholder="E-mail Corporativo"
                                onChange={(e) => handleInputChange(e, setEmailCorporativo)}
                            />

                            <input
                                required
                                type="text"
                                value={razaoSocial}
                                placeholder="Nome Representante"
                                onChange={(e) => handleInputChange(e, setRazaoSocial)}
                            />

                            {/* <input
                                required
                                type="text"
                                value={cep}
                                placeholder="CEP"
                                onChange={(e) => handleInputChange(e, setCep)}
                            />

                            <input
                                required
                                type="text"
                                value={rua}
                                placeholder="Rua"
                                onChange={(e) => handleInputChange(e, setRua)}
                            />

                            <input
                                required
                                type="text"
                                value={bairro}
                                placeholder="Bairro"
                                onChange={(e) => handleInputChange(e, setBairro)}
                            />

                            <input
                                required
                                type="text"
                                value={cidade}
                                placeholder="Cidade"
                                onChange={(e) => handleInputChange(e, setCidade)} />

                            <input
                                required
                                type="text"
                                value={estado}
                                placeholder="Estado"
                                onChange={(e) => handleInputChange(e, setEstado)}
                            /> */}

                            <input
                                required
                                type="password"
                                value={senhaEmpresa}
                                placeholder="Senha"
                                onChange={(e) => handleInputChange(e, setSenhaEmpresa)}
                            />

                            <input
                                required
                                type="password"
                                value={confirmSenhaEmrpesa}
                                placeholder="Confirmar Senha"
                                onChange={(e) => handleInputChange(e, setConfirmSenhaEmrpesa)}
                            />

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