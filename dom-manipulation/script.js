// Array to hold quote objects
let quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Innovation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "You only live once, but if you do it right, once is enough.", category: "Life" },
];

// Function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerText = `"${quote.text}" - ${quote.category}`;
}

// Add event listener to the button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;

    if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });
        document.getElementById("newQuoteText").value = '';
        document.getElementById("newQuoteCategory").value = '';
        alert("Quote added!");
    } else {
        alert("Please enter both quote and category.");
    }
}

// Function to export quotes as JSON
function exportQuotes() {
    const dataStr = JSON.stringify(quotes);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
}

// Add event listener for export button
document.getElementById("exportQuotes").addEventListener("click", exportQuotes);

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes(); // Save updated quotes to local storage
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to populate categories in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Extract unique categories
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const quoteDisplay = document.getElementById("quoteDisplay");
    
    const filteredQuotes = selectedCategory === "all" 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);
    
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const quote = filteredQuotes[randomIndex];
        quoteDisplay.innerText = `"${quote.text}" - ${quote.category}`;
    } else {
        quoteDisplay.innerText = "No quotes available for this category.";
    }
    
    // Save the last selected filter to local storage
    localStorage.setItem('lastSelectedCategory', selectedCategory);
}
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;

    if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });
        saveQuotes(); // Save to local storage
        
        // Update the category filter
        if (![...document.getElementById("categoryFilter").options].some(option => option.value === quoteCategory)) {
            const option = document.createElement("option");
            option.value = quoteCategory;
            option.textContent = quoteCategory;
            document.getElementById("categoryFilter").appendChild(option);
        }
        
        document.getElementById("newQuoteText").value = '';
        document.getElementById("newQuoteCategory").value = '';
        alert("Quote added!");
    } else {
        alert("Please enter both quote and category.");
    }
}
// Restore the last selected category filter
document.addEventListener("DOMContentLoaded", () => {
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
    if (lastSelectedCategory) {
        document.getElementById("categoryFilter").value = lastSelectedCategory;
        filterQuotes(); // Display quotes based on last selected category
    }
});

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API URL

// Function to fetch quotes from the mock server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.map(item => ({
            text: item.title, // Using title for simplicity
            category: 'Fetched' // Assigning a default category
        }));
    } catch (error) {
        console.error("Error fetching quotes:", error);
        return [];
    }
}

// Function to post quotes to the mock server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: quote.text, category: quote.category })
        });
        return response.json();
    } catch (error) {
        console.error("Error posting quote:", error);
        return null;
    }
}
// Function to sync quotes with the server
async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

    serverQuotes.forEach(serverQuote => {
        const exists = localQuotes.find(localQuote => localQuote.text === serverQuote.text);
        if (!exists) {
            localQuotes.push(serverQuote); // Add new quotes from server
        }
    });

    // Save updated quotes to local storage
    localStorage.setItem('quotes', JSON.stringify(localQuotes));
    quotes = localQuotes; // Update the quotes array

    // Notify users about the updates
    alert("Quotes have been updated from the server!");
}

// Set interval to sync quotes every 30 seconds
setInterval(syncQuotes, 30000); // Adjust the interval as needed
function checkForConflicts() {
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    const serverQuotes = await
     fetchQuotesFromServer();

    // Check for discrepancies
    serverQuotes.forEach(serverQuote => {
        const localQuote = localQuotes.find(q => q.text === serverQuote.text);
        if (localQuote && localQuote.category !== serverQuote.category) {
            // Notify user about the conflict
            if (confirm(`Conflict detected for "${localQuote.text}". Overwrite local data?`)) {
                // Overwrite local data with server data
                const index = localQuotes.indexOf(localQuote);
                localQuotes[index] = serverQuote; // Replace with server quote
            }
        }
    });

    // Save resolved quotes back to local storage
    localStorage.setItem('quotes', JSON.stringify(localQuotes));
}
