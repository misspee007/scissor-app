import { useState, useEffect } from "react";
import { ListGroup, Alert, Pagination, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../config";
import { getCookie, parseUserAgent } from "../helpers";

function AnalyticsPage() {
	const [analyticsData, setAnalyticsData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const { baseUrl } = config.Api;
				const accessToken = getCookie("access_token");

				await axios
					.get(`${baseUrl}/analytics`, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
						params: {
							skip: (currentPage - 1) * 10,
							take: 10, // Set the desired limit per page
						},
					})
					.then(({ data }) => {
						// Parse the user agent string
						data.analytics.forEach((item) => {
							item.clickEvents.forEach((clickEvent) => {
								clickEvent.userAgent = parseUserAgent(clickEvent.userAgent);
							});
						});
						setAnalyticsData(data.analytics);
						setTotalPages(data.count);
					})
					.catch((err) => {
						console.log("error: ", error);
						if (
							err.response &&
							err.response.data &&
							err.response.data.message
						) {
							setError(err.response.data.message);
						} else {
							setError(
								"An error occurred while fetching the analytics data. Please refresh the page."
							);
						}
					});
			} catch (error) {
				console.log(error);
				setError(
					"An error occurred while fetching the analytics data. Please refresh the page."
				);
			}
		};

		fetchAnalyticsData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<Container>
			<h2 className="text-left" style={{ textAlign: 'left' }}>URL Analytics</h2>

			{error && <Alert variant="danger">{error}</Alert>}

			{analyticsData.length === 0 ? (
				<Alert variant="info">
					Data is collated every 2 - 3 minutes. Please refresh the page. Got
					another long URL? <Link to={"/"}>Snip it!</Link>
				</Alert>
			) : (
				<>
					<ListGroup>
						{analyticsData.map((item) => (
							<ListGroup.Item key={item.id} style={{ textAlign: 'left' }}>
								<Row className="text-left">
									<Col>
										<strong>Original URL:</strong> {item.url.longUrl}
									</Col>
								</Row>
								<Row>
									<Col>
										<strong>Short URL:</strong> {item.url.shortUrl}
									</Col>
								</Row>
								<Row>
									<Col>
										<strong>Number of clicks:</strong> {item.clicks}
									</Col>
								</Row>

								{item.clicks > 0 && (
									<>
										{/* react-bootstrap table for referers and timestamp */}
										<table className="table table-striped">
											<thead>
												<tr>
													<th>Time Stamp</th>
													<th>Browser</th>
													<th>Engine</th>
													<th>Operating System</th>
												</tr>
											</thead>
											<tbody>
												{item.clickEvents.map((clickEvent) => (
													<tr key={clickEvent.id}>
														<td>{clickEvent.timestamp || "N/A"}</td>
														<td>{clickEvent.userAgent.browser || "N/A"}</td>
														<td>{clickEvent.userAgent.engine || "N/A"}</td>
														<td>{clickEvent.userAgent.os || "N/A"}</td>
													</tr>
												))}
											</tbody>
										</table>
									</>
								)}
							</ListGroup.Item>
						))}
					</ListGroup>

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
				</>
			)}
		</Container>
	);
}

export default AnalyticsPage;
