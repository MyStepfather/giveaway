import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/modal";
import styles from './home.module.css'
import { useNavigate } from "react-router";

export const HomePage = () => {

	const [isModalShow, setIsModalShow] = useState<boolean>(false);
	const [isConfirm, setIsConfirm] = useState<boolean>(false);

	const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

	return (
		<div className="content">
			<div className={styles.main}>
				<h1>Вы выиграли 100 тысяч рублей, нажмите кнопку «Обменять на сертификат»</h1>
				<button onClick={() => setIsModalShow(true)}>Обменять на сертификат</button>
			</div>
			{<Modal 
				isShow={isModalShow}
				setIsShow={setIsModalShow}
				setIsConfirm={setIsConfirm}
			/>}
		</div>
	);
};