document.addEventListener("DOMContentLoaded", () => {
    // Personalized Greeting
    const greeting = document.getElementById("greeting");
    const hours = new Date().getHours();
    const name = "Rukhshi"; // Replace with user's name if needed

    if (hours < 12) {
        greeting.innerText = `Good Morning, ${name}!`;
    } else if (hours < 18) {
        greeting.innerText = `Good Afternoon, ${name}!`;
    } else {
        greeting.innerText = `Good Evening, ${name}!`;
    }

    // Fetch Quote of the Day
    const apiKey = 'Gg2t02T90cN/Dga/uvDQbg==InGB773MkMfAhvP6';
    const apiUrl = 'https://api.api-ninjas.com/v1/quotes?category=family';

    fetch(apiUrl, {
        method: 'GET',
        headers: { 'X-Api-Key': apiKey }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        const quote = data[0];
        document.getElementById("quote").innerText = `"${quote.quote}" — ${quote.author}`;
    })
    .catch(error => {
        console.error("Error fetching the quote:", error);
        document.getElementById("quote").innerHTML = `
            <p>Sorry, something went wrong while fetching the quote.</p>
            <button id="retry">Try Again</button>
        `;
        document.getElementById("retry").addEventListener("click", () => {
            location.reload(); // Simple reload to retry fetching the quote
        });
    });

    // Favorite Links
    const favoriteLinks = ["https://www.google.com", "https://www.github.com"];
    const linksList = document.getElementById("favorite-links");
    favoriteLinks.forEach(link => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
        linksList.appendChild(listItem);
    });

    // To-Do List
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const tasksList = document.getElementById("tasks");

    const renderTasks = () => {
        tasksList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerText = task;
            listItem.addEventListener("click", () => {
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            });
            tasksList.appendChild(listItem);
        });
    };
    
    renderTasks();

    document.getElementById("add-task").addEventListener("click", () => {
        const newTask = document.getElementById("new-task").value;
        if (newTask) {
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            document.getElementById("new-task").value = "";
            renderTasks();
        }
    });
});
