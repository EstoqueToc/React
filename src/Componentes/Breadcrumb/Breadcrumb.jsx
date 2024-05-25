import React from 'react';

function Breadcrumb() {
  return (
    <section className="breadcrumbSuperior">
      <ul className="breadcrumb">
        <li><a href="./inicial.html">Home</a></li>
        <li><a href="#">Relatórios</a></li>
        <li><a href="#" className="localAtual">Gerar Relatório</a></li>
      </ul>
    </section>
  );
}

export default Breadcrumb;
