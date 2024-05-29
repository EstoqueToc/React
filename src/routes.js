import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./Pages/HomeCorpo/Home";
import Login from "./Pages/LoginCadastro/LoginCadastro";

import NotFound from './Pages/404';
import Usuario from './Pages/Usuario/Usuario';
import Produtos from './Pages/Produtos/Produtos';
import DashBoard from './Pages/DashBoard/index'
import CadastroFunc from './Pages/Telas Cadastro/CadastroFunc/CadastroFuncionario';
import CadastroProduto from './Pages/Telas Cadastro/CadastroProduto/CadastroProduto'
import CadastroFornecedor from './Pages/Telas Cadastro/CadastroFornecedor/CadastroFornecedor'
import AttProduto from './Pages/Telas Cadastro/Atualização Produto/attProduto'



import Sidebar from './Componentes/NavBarLateral/NavBarLateral';
function Router() {
  return (

    <BrowserRouter>                                      
      <Routes>    

        {"Navegação da pagina Home"}
				<Route path={"/"} element={<Home />} />             
				<Route path={"/login"} element={<Login />} />             
				<Route path={"/DashBoardGeral"} element={<DashBoard />} />    

        {"Navegação de tela após realizar o cadastro"}
	
        

       {"paginas após o login do usuario"}

        <Route path={"/pagina-geral"} element={<Sidebar />}/>
        <Route path={"/usuarios"} element={<Usuario />}/>
        <Route path={"/Produtos"} element={<Produtos />}/>
        <Route path={"/DashBoard"} element={<DashBoard />}/>
        <Route path={"/CadastroFunc"} element={<CadastroFunc />}/>
        <Route path={"/CadastroProduto"} element={<CadastroProduto />}/>
        <Route path={"/CadastroFornecedor"} element={<CadastroFornecedor />}/>
        <Route path={"/AtualizaProduto"} element={<AttProduto />}/>
        

        {"Pagina de Not Found, para caso o cliente acesse alguma URL errada"}            
				<Route path={"*"} element={<NotFound />} />   

      </Routes>
    </BrowserRouter>
  );
}

export default Router;