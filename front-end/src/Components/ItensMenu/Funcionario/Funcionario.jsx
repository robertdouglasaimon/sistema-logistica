"use client";
import './Funcionario.css';
import { use, useState } from "react";

function Funcionario() {
    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [data_admissao, setDataAdmissao] = useState("");
    const [salario, setSalario] = useState("");

    return (
        <section className='funcionario-section'>
            <div className="funcionario-box">
                <h1 className='funcionario-title'>Cadastro de Funcionarios</h1>

                <form className='funcionario-form'>
                    <div>
                        <label className='funcionario-label'>Nome</label>
                        <input 
                            type="text" 
                            value={nome} 
                            onChange={(e) => setNome(e.target.value)} 
                            className="funcionario-input" 
                            placeholder="Digite o nome do funcionario" 
                            required 
                        />

                    </div>

                    <div>
                        <label className='funcionario-label'>CPF</label>
                        <input 
                            type="text" 
                            value={cpf} 
                            onChange={(e) => setCPF(e.target.value)} 
                            className="funcionario-input" 
                            placeholder="Digite o CPF do funcionario" 
                            required 
                        />

                    </div>

                    <div>
                        <label className='funcionario-label'>Data de Admissão</label>
                        <input 
                            type="date" 
                            value={data_admissao} 
                            onChange={(e) => setDataAdmissao(e.target.value)} 
                            className="funcionario-input" 
                            placeholder="Digite a data de admissão do funcionario" 
                            required 
                        />

                    </div>

                    <div>
                        <label className='funcionario-label'>Salario</label>
                        <input 
                            type="number" 
                            value={salario} 
                            onChange={(e) => setSalario(e.target.value)} 
                            className="funcionario-input" 
                            placeholder="Digite o salario do funcionario" 
                            required 
                        />

                    </div>

                    <button className='funcionario-button'>Cadastrar Funcionário</button>
                </form>
            </div>
        </section>
    );
}

export default Funcionario;