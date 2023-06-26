import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AppNavbar, ShortUrlRedirect } from "./components";
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
			<Container className="app-container mx-auto my-3 p-3">

				<Routes>
					<Route exact path="/" element={<ShortenUrlPage />} />
					<Route exact path="/register" element={<RegistrationPage />} />
					<Route exact path="/login" element={<LoginPage />} />
					<Route exact path="/analytics" element={<AnalyticsPage />} />
					<Route exact path="/user-urls" element={<UserUrlsPage />} />
					<Route path="/:shortUrlId" element={<ShortUrlRedirect />} />
					{/* 404 route */}
					<Route path="*" element={<h1>404 Not Found</h1>} />
				</Routes>
      </Container>
			</div>
		</Router>
	);
}

export default App;
