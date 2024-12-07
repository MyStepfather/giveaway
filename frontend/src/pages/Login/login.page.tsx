import { useEffect, useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router";

export const LoginPage = () => {

	const [login, setLogin] = useState<string | undefined>();
	const [password, setPassword] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();

const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password }),
        });
		const {access_token} = await response.json();
		if (access_token) {
			localStorage.setItem('access_token', access_token);
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
					<input id="login" value={login} onChange={(e) => setLogin(e.target.value)}/>    
				</label>
				<label className={styles.label} htmlFor="password">
					Введите пароль
					<input id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>    
				</label>
				<button type="submit">Вход</button>
			</form>
		</div>
	);
};