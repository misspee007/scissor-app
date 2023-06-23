import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppNavbar } from "./components";
import {
	RegistrationPage,
	LoginPage,
	ShortenUrlPage,
	AnalyticsPage,
	UserUrlsPage,
} from "./pages";

function App() {
	return (
		<Router>
			<div>
				<AppNavbar />
				<Routes>
					<Route exact path="/" element={<ShortenUrlPage />} />
					<Route exact path="/register" element={<RegistrationPage />} />
					<Route exact path="/login" element={<LoginPage />} />
					<Route exact path="/analytics" element={<AnalyticsPage />} />
					<Route exact path="/user-urls" element={<UserUrlsPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
