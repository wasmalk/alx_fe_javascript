// script.js

// Sample array of quote objects
const quotes = [
    { text: "The best way to predict the future is to create it.", category: "Inspirational" },
    { text: "Love all, trust a few, do wrong to none.", category: "Love" },
    { text: "The only true wisdom is in knowing you know nothing.", category: "Wisdom" },
];

// Function to display a random quote based on the selected category
function showRandomQuote() {
    const categorySelect = document.getElementById("categorySelect");
    const selectedCategory = categorySelect.value;

    const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex].text;
        document.getElementById("quoteDisplay").innerText = randomQuote;
    } else {
        document.getElementById("quoteDisplay").innerText = "No quotes available for this category.";
    }
}

// Function to add a new quote to the array and update the DOM
function addQuote() {
    const newQuoteInput = document.getElementById("newQuoteText");
    const newCategoryInput = document.getElementById("newQuoteCategory");
    
    const newQuoteText = newQuoteInput.value.trim();
    const newQuoteCategory = newCategoryInput.value.trim();

    if (newQuoteText && newQuoteCategory) {
        // Add new quote to the quotes array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Optionally display the newly added quote in the quote display area
        document.getElementById("quoteDisplay").innerText = `Added Quote: "${newQuoteText}" in ${newQuoteCategory}`;

        // Clear input fields after adding
        newQuoteInput.value = ""; 
        newCategoryInput.value = ""; 

        alert("Quote added!");
    } else {
        alert("Please enter a valid quote and category.");
    }
}

// Event listeners for buttons
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuote").addEventListener("click", addQuote);
