import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import config from "../config";

function ShortenUrlForm() {
	const [originalUrl, setOriginalUrl] = useState("");

	const handleUrlChange = (e) => {
		setOriginalUrl(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle URL shortening logic here
		const { baseUrl } = config.Api;

		axios
			.post(`${baseUrl}/url`, { longUrl: originalUrl })
			.then(({ data }) => {
				console.log("Shorten URL", data);

				// Reset form fields
				setOriginalUrl("");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="formOriginalUrl">
				<Form.Label>Original URL</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter the URL to shorten"
					value={originalUrl}
					onChange={handleUrlChange}
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Shorten URL
			</Button>
		</Form>
	);
}

export default ShortenUrlForm;
