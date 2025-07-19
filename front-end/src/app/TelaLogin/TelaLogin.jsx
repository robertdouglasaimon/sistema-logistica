import './TelaLogin.css';
import { useEffect } from 'react';

function TelaLogin() {
  useEffect(() => { // Adiciona o ano atual ao footer.
    document.getElementById('anoAtual').textContent = new Date().getFullYear();
    const botao = document.getElementById('botao-logar');
    if (botao) {
      botao.addEventListener('click', () => alert('Botão clicado com sucesso!'));
    }
  }, []);

  return (
    <div className="wrapper" style={{ backgroundImage: 'url(/assets/img/logistica.jpg)' }}>
      <div className="login-box">
        <h2>Sistema de Logística</h2>
      <form>
        <div className="input-box">
          <label for="username" className="label">Nome de Usuário</label>
          <div className="input-field">
            <i className="bx bx-user icon"></i>
            <input type="text" id="username" placeholder="Entrar com usuário" required />
          </div>
        </div>

        <div className="input-box">
          <label for="password" class="label">Senha</label>
          <div className="input-field">
            <i className="bx bx-lock-alt icon"></i>
            <input type="password" id="password" placeholder="Entrar com senha" required />
          </div>
        </div>

        <div className="remember-forgot">
          <label><input type="checkbox" /> Lembrar-me</label>
          <a href="#">Esqueceu a senha?</a>
        </div>

        <button type="submit" class="btn" id="botao-logar">Entrar</button>

        <div className="register">
          <p><b>Não possui uma conta? <a href="#"> <br/> Cadastre-se aqui</a></b></p>
        </div>
      </form>
      </div>

      <footer>
        <div className="footer-content">
          <p>
            &copy; <span id="anoAtual"></span> <a href="#">Sistema de Logística</a>. <br />
            Todos os direitos reservados a <a href="https://github.com/robertdouglasaimon">Robert Douglas</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default TelaLogin;