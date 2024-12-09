import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router'
import { HomePage } from './pages/Home/home.page.tsx'
import { LoginPage } from './pages/Login/login.page.tsx'
import { MainLayout } from './layout/main-layout.tsx'
import { RouterProvider } from 'react-router/dom'
import { AuthProvider } from './context/authProvider.tsx'
import ProtectedRoute from './components/ProtectedRout/ProtectedRoute.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<AuthProvider>
				<MainLayout />
			</AuthProvider>
		),
		children: [
			{
				path: '/',
				element: (
					<ProtectedRoute>
						<HomePage />
					</ProtectedRoute>
				)
			},
			{
				path: '/login',
				element: <LoginPage />
			},
		]
	}
]);

createRoot(document.getElementById('root')!).render(
	<RouterProvider router={router}/>
)
