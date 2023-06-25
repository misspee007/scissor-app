function getCookie(name) {
	const cookies = document.cookie.split("; ");
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].split("=");
		if (cookie[0] === name) {
			return cookie[1];
		}
	}
	return "";
}

function checkTokenExpiration() {
  const accessToken = getCookie("access_token");
  const expirationTime = localStorage.getItem("access_token_expiration");

  if (accessToken && expirationTime) {
    const currentTime = new Date().getTime();
    const expirationTimestamp = parseInt(expirationTime, 10);

    if (currentTime > expirationTimestamp) {
      // Access token has expired. Prompt the user to log in again
      alert("Your session has expired. Please log in again.");
      // redirect to login page
      history.push("/login");
    }
  }
}

export { getCookie, checkTokenExpiration };
