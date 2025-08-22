let myWatchlist = []
const apiKey = 'bf165cc7'
const searchForm = document.getElementById('search-form')
const mySearch = document.getElementById('my-search')
const movieContainer = document.getElementById('movies')
const watchlistContainer = document.getElementById('watchlist')
const moviesFromLocalStorage = JSON.parse( localStorage.getItem("myWatchlist") )

if (moviesFromLocalStorage) {
    myWatchlist = moviesFromLocalStorage
    renderWatchlist(myWatchlist)
}

document.addEventListener('click', function(e) {
    if (e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)
    }
})

if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault()
        handleSearchClick()
    })
}

function handleAddClick(movieId) {
    if (!myWatchlist.includes(movieId)) {
        console.log(movieId)
        myWatchlist.push(movieId)
        localStorage.setItem("myWatchlist", JSON.stringify(myWatchlist))
    }
}

// TODO: handle remove click

function renderWatchlist(watchlist) {
    if (watchlistContainer) {
        watchlistContainer.innerHTML = ""
        for (let movieId of watchlist) {
            fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`)
                    .then(res => res.json())
                    .then(data => {
                        watchlistContainer.innerHTML += getMovieHtml(data)
                    })
        }
    }
}

function handleSearchClick() {
    // TODO: add page number
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${mySearch.value}&type=movie`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === 'True') {
                movieContainer.innerHTML = ""
                for (let movie of data.Search) {
                    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
                        .then(res => res.json())
                        .then(data => {
                            // TODO: replace with image unavailable
                            if (data.Poster !== 'N/A') {
                                movieContainer.innerHTML += getMovieHtml(data)
                            }
                        })
                }
            }
            else {
                mySearch.placeholder = "Searching something with no data"
                movieContainer.innerHTML = `
                    <!-- TODO: set width on placeholder text -->
                    <div class="placeholder">
                        <p class="placeholder-text">Unable to find what you’re looking for. Please try another search.</p>
                    </div>
                `
            }
        })
    
}

function getMovieHtml(movie) {
    return `
        <div class="movie">
            <img src="${movie.Poster}" class="movie-img">
            <div>
                <div class="movie-header">
                    <h3>${movie.Title}</h3>
                    <h4 class="movie-rating">
                        <i class="fa-solid fa-star"></i> ${movie.imdbRating}
                    </h4>
                </div>
                <div class="movie-info">
                    <h4>${movie.Runtime}</h4>
                    <h4>${movie.Genre}</h4>
                    <span class="watchlist-btn" id="watchlist-btn"
                        data-add=${movie.imdbID}>
                        <i class="fa-solid fa-circle-plus"
                        data-add=${movie.imdbID}></i>
                        Watchlist <!-- TODO: switch to remove if already added to watchlist -->
                    </span>
                </div>
                <p class="movie-plot">${movie.Plot}</p> <!-- TODO: add read more button -->
            </div>
        </div>`
}