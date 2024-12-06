import { useEffect, useState } from "react";
import styles from "./login.module.css";

export const LoginPage = () => {

	const [login, setLogin] = useState<string | undefined>();
	const [password, setPassword] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmitForm = () => {
		
	}

	useEffect(() => {
		
	}, [])

	return (
		<div>
			<form className={styles.form} onSubmit={handleSubmitForm}>
				<label className={styles.label} htmlFor="login">
					Введите логин
					<input id="login" value={login} onChange={() => setLogin}/>    
				</label>
				<label className={styles.label} htmlFor="password">
					Введите пароль
					<input id="password" value={password} onChange={() => setPassword}/>    
				</label>
				<button type="submit">Вход</button>
			</form>
		</div>
	);
};