import { useState, useEffect } from "react";
import { ListGroup, Alert, Pagination } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../config";
import { getCookie } from "../helpers";

function AnalyticsPage() {
	const [analyticsData, setAnalyticsData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

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
						setAnalyticsData(data.analytics);
						setTotalPages(data.count);
					})
					.catch((error) => {
						console.log("error: ", error);
					});
			} catch (error) {
				console.log(error);
			}
		};

		fetchAnalyticsData();
	}, [currentPage]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div>
			<h2>URL Analytics</h2>

			{analyticsData.length === 0 ? (
				<Alert variant="info">
					Data is collated every 2 - 3 minutes. If you have not{" "}
					<Link to={"/"}>shortened a URL</Link>, please do so now.
				</Alert>
			) : (
				<>
					<ListGroup>
						{analyticsData.map((item) => (
							<ListGroup.Item key={item.id}>
								<div>Original URL: {item.url.longUrl}</div>
								<div>Short URL: {item.url.shortUrl}</div>
								<div>Number of clicks: {item.clicks}</div>

								{item.clicks > 0 && (
									<>
										<h5>Click Events:</h5>
										{/* react-bootstrap table for referers and timestamp */}
										<table className="table table-striped">
											<thead>
												<tr>
													<th>Timestamp</th>
                          <th>IP Address</th>
													<th>User Agent</th>
												</tr>
											</thead>
											<tbody>
												{item.clickEvents.map((clickEvent) => (
													<tr key={clickEvent.id}>
														<td>{clickEvent.timestamp || "N/A"}</td>
                            <td>{clickEvent.ipAddress || "N/A"}</td>
														<td>{clickEvent.userAgent || "N/A"}</td>
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
		</div>
	);
}

export default AnalyticsPage;
