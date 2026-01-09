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
      ✅ Short URL:<br><br>
      <span class="short-link">${data.short_url}</span><br><br>
      <button onclick="openShortUrl('${data.short_url}')">
        Open Short URL
      </button>
    `;
  } catch (error) {
    result.innerHTML = "❌ Something went wrong";
  }
}

function openShortUrl(url) {
  window.open(url, "_blank");
}
