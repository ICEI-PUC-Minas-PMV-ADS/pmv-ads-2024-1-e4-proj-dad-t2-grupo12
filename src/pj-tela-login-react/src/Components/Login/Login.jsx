import { FaUser, FaLock} from 'react-icons/fa';

import { useState } from 'react'; /*manipular os dados adicionar estado a componentes funcionais. Ele retorna um par de valores: o valor atual do estado e uma função para atualizar esse valor */ 
import "./Login.css"

const Login = () => {
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    alert("Envaindo os dados" + username); 

    console.log(username, password);
    console.log("Envio");
  }
  
  return (
  <div className="conteiner">
    <form onSubmit={handleSubmit}>
        <h1>Acesso ao sistema</h1>
        <div className ='input-field'>
            <input type="email"placeholder='E-mail'required onChange={(e) => setUsername(e.target.value)}/>
            <FaUser className='icon'/>
        </div>
        <div className ='input-field'>
            <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)}/>
            <FaLock className='icon'/>
        </div>   
        
        <div className='recall-forget'>
            <a href='#' >Recuperar senha</a>
        </div>
        
        <button> Entrar</button>
        
        <div className='signup-link'>
            <p>
                Cadastrar novo usuário.<a href='#'>Criar conta</a>
            </p>
        </div>
    
    </form>
  </div>
  )
}

export default Login
