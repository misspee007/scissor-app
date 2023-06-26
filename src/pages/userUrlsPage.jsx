import { useState, useEffect } from "react";
import { ListGroup, Button, Alert, Pagination } from "react-bootstrap";
import axios from "axios";
import config from "../config";
import { getCookie } from "../helpers";

function UserUrlsPage() {
	const [userUrls, setUserUrls] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [error, setError] = useState("");

	useEffect(() => {
		setError("");

		const fetchUserUrls = async () => {
			try {
				const { baseUrl } = config.Api;
				const accessToken = getCookie("access_token");

				axios
					.get(`${baseUrl}/url`, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
						params: {
							skip: (currentPage - 1) * 5,
							take: 5, // Set the desired limit per page
						},
					})
					.then(({ data }) => {
						setUserUrls(data.urls);
						setTotalPages(Math.ceil(data.count / 5));
					})
					.catch((err) => {
						if (
							err.response &&
							err.response.data &&
							err.response.data.message
						) {
							setError(err.response.data.message);
						} else {
							setError(
								"An error occurred while fetching the URLs. Please refresh the page."
							);
						}
					});
			} catch (error) {
				setError(
					"An error occurred while fetching the URLs. Please refresh the page."
				);
			}
		};

		fetchUserUrls();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage, totalPages]);

	const handleDeleteUrl = (shortUrlId) => {
		const baseUrl = config.Api.baseUrl;
		const accessToken = getCookie("access_token");

		axios
			.delete(`${baseUrl}/url/${shortUrlId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			// eslint-disable-next-line no-unused-vars
			.then(({ data }) => {
				// Remove the deleted URL from the userUrls state
				setUserUrls((prevUserUrls) =>
					prevUserUrls.filter((url) => url.shortUrlId !== shortUrlId)
				);
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.message) {
					setError(err.response.data.message);
				} else {
					setError(
						"An error occurred while deleting the URL. Please try again."
					);
				}
			});
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleGenerateQrcode = (shortUrlId) => {
		try {
			const { baseUrl } = config.Api;
			const accessToken = getCookie("access_token");

			axios
				.post(`${baseUrl}/url/qrcode/${shortUrlId}`, null, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
				.then(({ data }) => {
					// Update the URL with the generated QR code
					setUserUrls((prevUserUrls) =>
						prevUserUrls.map((url) =>
							url.shortUrlId === shortUrlId
								? { ...url, qrCode: data.image }
								: url
						)
					);
				})
				.catch((err) => {
					if (err.response && err.response.data && err.response.data.message) {
						setError(err.response.data.message);
					} else {
						setError(
							"An error occurred while generating the QR code. Please try again."
						);
					}
				});
		} catch (error) {
			setError(
				"An error occurred while generating the QR code. Please try again."
			);
		}
	};

	return (
		<div>
			<h2>URLs</h2>
			{error && <Alert variant="danger">{error}</Alert>}

			{!userUrls || userUrls.length === 0 ? (
				<Alert variant="info">No URLs created yet.</Alert>
			) : (
				<>
					<ListGroup>
						{userUrls.map((url) => (
							<ListGroup.Item key={url.id}>
								<div>
									<strong>Original URL:</strong> {url.longUrl}
								</div>
								<div>
									<strong>Short URL:</strong> {url.shortUrl}
								</div>
								{url.qrCode ? (
									<img src={`${url.qrCode.image}`} alt="QR Code" />
								) : (
									<Button
										variant="primary"
										onClick={() => handleGenerateQrcode(url.shortUrlId)}
									>
										Generate QR Code
									</Button>
								)}
								<Button
									variant="danger"
									onClick={() => handleDeleteUrl(url.shortUrlId)}
								>
									Delete
								</Button>
							</ListGroup.Item>
						))}
					</ListGroup>

					{totalPages > 1 && ( // Hide pagination when there is only one page
						<Pagination>
							{Array.from({ length: totalPages }, (_, index) => index + 1).map(
								(page) => (
									<Pagination.Item
										key={page}
										active={page === currentPage}
										onClick={() => handlePageChange(page)}
									>
										{page}
									</Pagination.Item>
								)
							)}
						</Pagination>
					)}
				</>
			)}
		</div>
	);
}

export default UserUrlsPage;
