// script.js

// Array to hold quote objects
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "The purpose of our lives is to be happy.", category: "Motivation" },
    { text: "Get busy living or get busy dying.", category: "Life" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<blockquote>${quotes[randomIndex].text}</blockquote><cite>${quotes[randomIndex].category}</cite>`;
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;

    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);

        // Clear the input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        alert('Quote added successfully!');
    } else {
        alert('Please fill in both fields.');
    }
}

// Event listener for button click to show a new quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Event listener for the "Add Quote" button
document.getElementById('addQuoteButton').addEventListener('click', addQuote);

// Show an initial random quote
showRandomQuote();
