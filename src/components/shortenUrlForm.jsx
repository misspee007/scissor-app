import { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import config from "../config";
import { getCookie } from "../helpers";

function ShortenUrlForm() {
	const [originalUrl, setOriginalUrl] = useState("");
	const [shortenedUrl, setShortenedUrl] = useState("");
	const [error, setError] = useState(null);
	const [accessToken, setAccessToken] = useState("");

	useEffect(() => {
		const retrievedAccessToken = getCookie("access_token");
		setAccessToken(retrievedAccessToken);
	}, []);

	useEffect(() => {
		axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
	}, [accessToken]);

	const handleUrlChange = (e) => {
		setOriginalUrl(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const { baseUrl } = config.Api;

		axios
			.post(`${baseUrl}/url`, { longUrl: originalUrl })
			.then(({ data }) => {
				console.log("Shorten URL", data);
				setShortenedUrl(data);
				setError(null);
				setOriginalUrl("");
			})
			.catch((err) => {
				console.log(err);
				setError("An error occurred while shortening the URL.");
				setShortenedUrl("");
			});
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(shortenedUrl);
		// Optionally show a notification or feedback to the user
		alert("Shortened URL copied to clipboard!");
	};

	return (
		<Form onSubmit={handleSubmit}>
			{error && <Alert variant="danger">{error}</Alert>}
			<Form.Group controlId="formOriginalUrl">
				<Form.Label> Paste your long URL below to shorten it.</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter the URL to shorten"
					value={originalUrl}
					onChange={handleUrlChange}
				/>
			</Form.Group>
			{shortenedUrl && (
				<Alert variant="success">
					Shortened URL: <span className="shortened-url">{shortenedUrl}</span>{" "}
					<Button variant="secondary" size="sm" onClick={handleCopy}>
						Copy
					</Button>
				</Alert>
			)}
			<Button variant="primary" type="submit">
				Shorten URL
			</Button>
		</Form>
	);
}

export default ShortenUrlForm;
