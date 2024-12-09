import { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";

export const LoginPage = () => {

	const {login} = useAuth();
	const navigate = useNavigate();
	const [loginInput, setLoginInput] = useState<string>('');
	const [passwordInput, setPasswordInput] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);


	const handleSubmitForm = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		
		try {
			const response = await fetch('http://localhost:3000/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ login: loginInput, password: passwordInput }),
			});
			const {access_token} = await response.json();
			if (access_token) {
				login(access_token);
				navigate('/');
			} else {
				console.error('Токен отсутствует в ответе');
			}
		} catch (error) {
			console.error('Ошибка:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<form className={styles.form} onSubmit={handleSubmitForm}>
				<label className={styles.label} htmlFor="login">
					Введите логин
					<input id="login" value={loginInput} onChange={(e) => setLoginInput(e.target.value)}/>    
				</label>
				<label className={styles.label} htmlFor="password">
					Введите пароль
					<input id="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}/>    
				</label>
				<button type="submit">Вход</button>
			</form>
		</div>
	);
};