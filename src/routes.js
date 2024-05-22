import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./Pages/HomeCorpo/Home";
import Login from "./Pages/LoginCadastro/LoginCadastro";

import NotFound from './Pages/404';
import Usuario from './Pages/Usuario/Usuario';
import Produtos from './Pages/Produtos/Produtos';

import Sidebar from './Componentes/NavBarLateral/SideBarPrincipal';
function Router() {
  return (

    <BrowserRouter>                                      
      <Routes>    

        {"Navegação da pagina Home"}
				<Route path={"/"} element={<Home />} />             
				<Route path={"/login"} element={<Login />} />             
				<Route path={"/DashBoardGeral"} element={<Login />} />    

        {"Navegação de tela após realizar o cadastro"}
	
        

       {"paginas após o login do usuario"}

        <Route path={"/pagina-geral"} element={<Sidebar />}/>
        <Route path={"/usuarios"} element={<Usuario />}/>
        <Route path={"/Produtos"} element={<Produtos />}/>
        

        {"Pagina de Not Found, para caso o cliente acesse alguma URL errada"}            
				<Route path={"*"} element={<NotFound />} />   

      </Routes>
    </BrowserRouter>
  );
}

export default Router;