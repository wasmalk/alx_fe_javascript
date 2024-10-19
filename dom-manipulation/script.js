const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API endpoint
const FETCH_INTERVAL = 10000; // Fetch new data every 10 seconds

let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Life" },
    { text: "You only live once, but if you do it right, once is enough.", category: "Inspiration" },
];

document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    const lastFilter = localStorage.getItem('lastSelectedCategory') || 'all';
    document.getElementById('categoryFilter').value = lastFilter;
    filterQuotes(); // Apply the last filter on page load
    startFetchingQuotes(); // Start periodic fetching
});

function startFetchingQuotes() {
    setInterval(fetchNewQuotes, FETCH_INTERVAL);
}

async function fetchNewQuotes() {
    try {
        const response = await fetch(API_URL);
        const newQuotes = await response.json();
        
        // Simulate merging new quotes with existing ones
        newQuotes.forEach(quote => {
            const existingQuote = quotes.find(q => q.text === quote.title);
            if (!existingQuote) {
                quotes.push({ text: quote.title, category: "Fetched" });
            }
        });

        saveQuotes();
        notifyUser("New quotes fetched from server!");
        filterQuotes(); // Update displayed quotes
    } catch (error) {
        console.error("Failed to fetch new quotes:", error);
    }
}

// Notify the user about updates
function notifyUser(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '10px';
    notification.style.right = '10px';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '10px';
    notification.style.zIndex = 1000;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// The rest of your existing functions (populateCategories, showRandomQuote, addQuote, etc.) remain unchanged

