// Layout.js
import React, { useState } from 'react';
import Sidebar from './Filtro';
import Hamburguer from '../../Assets/menu-hamburguer.png'


const FiltroPrincipal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="layout">
     <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
    </div>
  );
};

export default FiltroPrincipal;
