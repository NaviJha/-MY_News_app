async function getNews() {
    const location = document.getElementById("locationInput").value;
    const apiKey = "a3e46fac84bf44d381c65b7842849c11";
    const url = `https://newsapi.org/v2/everything?q=${location}&apiKey=${apiKey}`;

    if (!location) {
        alert("Please enter a location!");
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("No news found");
        }

        const data = await response.json();
        let newsHTML = "";

        if (data.articles.length === 0) {
            newsHTML = "<p class='text-red-500 text-center'>No news found for this location!</p>";
        } else {
            data.articles.slice(0, 5).forEach(article => {
                newsHTML += `
                    <div class="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                        <img src="${article.urlToImage || 'https://via.placeholder.com/600x300'}" alt="News Image" class="w-full h-48 object-cover rounded-md">
                        <h3 class="text-lg font-bold mt-3">${article.title}</h3>
                        <p class="text-gray-600 mt-2">${article.description || "No description available."}</p>
                        <a href="${article.url}" target="_blank" class="text-blue-500 underline font-semibold mt-2 inline-block">Read more</a>
                    </div>
                `;
            });
        }

        document.getElementById("newsResult").innerHTML = newsHTML;
    } catch (error) {
        document.getElementById("newsResult").innerHTML = 
            "<p class='text-red-500 text-center'>Error fetching news!</p>";
    }
}
