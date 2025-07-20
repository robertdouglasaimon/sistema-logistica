"use client";
import './Filial.css';
import { useState } from "react";

function Filial() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [endereco, setEndereco] = useState("");

  const salvarDadosFilial = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", { nome, tipo, endereco });

    // Aqui vai vir lógica para enviar os dados para o backend.
  };

    return(
    <section className='filial-section'>
        <div className="filial-box">
            <h1 className='filial-title'>Cadastro de Filiais</h1>

            <form action="" onSubmit={salvarDadosFilial} className="filial-form">
                <div>
                    <label className='filial-label'>Nome</label>
                    <input 
                        type="text" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                        className="filial-input" 
                        placeholder="Digite o nome da filial" 
                        required 
                    />
                </div>

                <div>
                    <label className='filial-label'>Tipo</label>
                    <input 
                        type="text" 
                        value={tipo} 
                        onChange={(e) => setTipo(e.target.value)} 
                        className="filial-input" 
                        placeholder="Digite o tipo da filial" 
                        required 
                    />
                </div>

                <div>
                    <label className='filial-label'>Endereço</label>
                    <input 
                        type="text" 
                        value={endereco} 
                        onChange={(e) => setEndereco(e.target.value)} 
                        className="filial-input" 
                        placeholder="Digite o endereço da filial" 
                        required 
                    />
                </div>

                <button type="submit" className="filial-button">Salvar Filial</button>
            </form>
        </div>
    </section>
    );
}

export default Filial;
