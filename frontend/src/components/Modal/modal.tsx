import {MouseEvent, useEffect} from 'react'
import style from './modal.module.css'
import cn from 'classnames';

type Props = {
	isShow: boolean
	setIsShow: (state: boolean) => void
	setIsConfirm: (state: boolean) => void;
	isConfirm: boolean;
}

export const Modal = ({isShow, setIsShow, setIsConfirm}: Props) => {

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsShow(false);
    }
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
	if (e.target === e.currentTarget) {
		setIsShow(false);
		setIsConfirm(true)
	}
  }

	return (
		<div onClick={handleOverlayClick} className={cn(style.modal, {
			[style.active]: isShow
		})}>
			<div className={style.content}>
				<h2 className={style.head}>Подтвердить получение сертификата</h2>
				<button onClick={handleButtonClick}>Подтвердить</button>
			</div>
		</div>
	);
};