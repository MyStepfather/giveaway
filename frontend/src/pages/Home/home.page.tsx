import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/modal";
import styles from './home.module.css'
import { useAuth } from "../../context/authContext";

export const HomePage = () => {

	const [isModalShow, setIsModalShow] = useState<boolean>(false);
	const [isConfirm, setIsConfirm] = useState<boolean>(false);
	const {token} = useAuth();

	const setDownloaded = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/user', {
				method: "PATCH",
				headers: {
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({ isShown: true })
			})
			return await response.json();
		} catch (error) {
			console.error(error)
		}
	}

  const getFile = async () => {
    try {
		const response = await fetch('http://localhost:3000/api/file/download', {
			method: "GET",
			headers: {
			"Authorization": `Bearer ${token}`
			}
		});
		return response;
	} catch (error) {
		console.error('Error fetching file:', error);
	}
	}

	const downloadFile = async (response: Response) => {
		try {
		// Получаем имя файла из заголовка `Content-Disposition`, если доступно
      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition?.match(/filename="?(.+)"?/);
      const filename = filenameMatch ? filenameMatch[1] : 'Сертификат.pdf';

      // Обрабатываем поток и инициируем загрузку
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('ReadableStream not supported');
      }

      const chunks: Uint8Array[] = [];
      let receivedLength = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          receivedLength += value.length;
        }
      }

      // Создаем Blob и ссылку для скачивания
      const blob = new Blob(chunks, { type: response.headers.get('Content-Type') || 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);


      console.log('Файл успешно скачан');		
	} catch (error) {
		console.error('Error download file:', error);
	}
	}

  useEffect(() => {
    const getCertificate = async () => {
      try {
        const response = await getFile();
      	if (!response?.ok) {
        	throw new Error(`Failed to download file: ${response?.statusText}`);
      	}
		downloadFile(response);
		await setDownloaded();
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    if (isConfirm) {
      getCertificate();
      setIsConfirm(false); // Сбрасываем флаг, чтобы избежать повторного вызова
    }
  }, [isConfirm]);

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
				isConfirm={isConfirm}
			/>}
		</div>
	);
};