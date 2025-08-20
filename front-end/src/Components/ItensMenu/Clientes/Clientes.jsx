"use client";
import './Clientes.css';
import { useState, useEffect } from "react";

function Clientes() {
    return (
        <section className="clientes-container">
            <h1>Clientes</h1>
            
        {/* 📊 Indicadores: Clientes Ativos, Tipo: PJ/PF  */}
            <section className=''>
                <div className="clientes-indicadores">
                    <p>Aqui vai o conteúdo dos clientes. No ponto para continuar =D</p>
                </div>
            </section>
        </section>
    );
}

export default Clientes;