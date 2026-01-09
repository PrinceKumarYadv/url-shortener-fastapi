async function shortenUrl() {
  const longUrl = document.getElementById("longUrl").value;
  const result = document.getElementById("result");

  if (!longUrl) {
    result.innerHTML = "❌ Please enter a URL";
    return;
  }

  result.innerHTML = "⏳ Shortening...";

  try {
    const response = await fetch(
      "https://url-shortener-fastapi-1.onrender.com/shorten",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ long_url: longUrl })
      }
    );

    const data = await response.json();

    result.innerHTML = `
      ✅ Short URL:<br>
      <a href="${data.short_url}" target="_blank">
        ${data.short_url}
      </a>
    `;
  } catch (error) {
    result.innerHTML = "❌ Something went wrong";
  }
}
