import React, { useState } from 'react';

function LoginInput({ label, type, placeholder, value, onChange }) {
  return (
    <div className="input-group">
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Lógica de autenticação aqui
    console.log('Usuário:', username);
    console.log('Senha:', password);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <LoginInput
        label="Usuário"
        type="text"
        placeholder="Digite seu usuário"
        value={username}
        onChange={handleUsernameChange}
      />
      <LoginInput
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
