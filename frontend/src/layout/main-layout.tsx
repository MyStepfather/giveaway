import { Link, Outlet } from "react-router";
import style from './main-layout.module.css';

export const MainLayout = () => {
	return (
		<div className={style.container}>
			<Outlet/>
		</div>
	);
};