// global variables
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

// show loader
const showLoader = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// hide loader
const hideLoader = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
const showQuote = () => {
    const quote = apiQuotes[0]
    // check if the author is empty
    if (!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author
    }
    // check quote lenght to determine the style
    if (quote.content.length > 100) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // hide loader show quote
    hideLoader()
    quoteText.textContent = quote.content
}

// Get Quotes from the API, the response will be 20 quotes

async function getQuotes() {
    showLoader()
    const apiUrl = `https://api.quotable.io/quotes/random`
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        apiQuotes = data
        showQuote()
        } catch (err) {
        // handle error here
        console.log(err)
    }
}
// twitter Quote

const twitterQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', twitterQuote);

// on load
getQuotes()


