import { login } from './utils';
import './index.css';
import { useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:

// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos. 
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login enquanto você está executando o login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isRequesting, setIsRequesting] = useState(false)
  const [error, setError] = useState(null)

  const isDisabled = formData.email.trim().length === 0 || formData.password.trim().length < 6 || isRequesting

  const handleInputs = (event) => {
    const { id, value } = event.target;

    setFormData({ ...formData, [id]: value }) 
  } 

  const resetForm = () => {
    setFormData({ email: '', password: '' })
    setIsRequesting(false)
  }
  
  const handleSubmit = () => {
    setError(null)
    setIsRequesting(true)

    login(formData)
      .then(() => alert('Login realizado com sucesso'))
      .catch((error) => setError(error.message))
      .finally(() => resetForm())
  } 
  

  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1> 
        {error && <div className='errorMessage'>{error}</div>}
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input
            id={'email'}
            type={'email'}
            autoComplete='off'
            value={formData.email} 
            onChange={(event) => handleInputs(event)}
          />
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input
            id={'password'}
            type={'password'}
            value={formData.password} 
            onChange={(event) => handleInputs(event)}
          />
        </div>

        <div className='button'>
          <button disabled={isDisabled} onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
}
