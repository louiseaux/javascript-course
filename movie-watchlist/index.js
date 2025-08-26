let myWatchlist = []
const apiKey = 'bf165cc7'
const searchForm = document.getElementById('search-form')
const mySearch = document.getElementById('my-search')
const movieContainer = document.getElementById('movies')
const watchlistContainer = document.getElementById('watchlist')
const moviesFromLocalStorage = JSON.parse( localStorage.getItem("myWatchlist") )

if (moviesFromLocalStorage) {
    myWatchlist = moviesFromLocalStorage
    if (watchlistContainer) {
        renderWatchlist(myWatchlist)
    }
}

document.addEventListener('click', function(e) {
    if (e.target.dataset.watchlist) {
        handleWatchlistClick(e.target)
    }
})

if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault()
        handleSearchClick()
    })
}

function handleWatchlistClick(targetMovie) {
    const movieId = targetMovie.dataset.watchlist
    if (myWatchlist.includes(movieId)) {
        myWatchlist = myWatchlist.filter(movie => movie !== movieId)
        localStorage.setItem("myWatchlist", JSON.stringify(myWatchlist))
        if (watchlistContainer) {
            renderWatchlist(myWatchlist)
        } else {
            targetMovie.previousElementSibling.classList.remove('fa-circle-minus')
            targetMovie.previousElementSibling.classList.add('fa-circle-plus')
            targetMovie.textContent = 'Watchlist'
        }
    }
    else {
        myWatchlist.push(movieId)
        localStorage.setItem("myWatchlist", JSON.stringify(myWatchlist))
        targetMovie.previousElementSibling.classList.remove('fa-circle-plus')
        targetMovie.previousElementSibling.classList.add('fa-circle-minus')
        targetMovie.textContent = 'Remove'
    }
}

function renderWatchlist(watchlist) {
    if (watchlist.length !== 0) {
        let watchlistHtml = ''
        for (let movieId of watchlist) {
            fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`)
                    .then(res => res.json())
                    .then(data => {
                        watchlistHtml += getMovieHtml(data)
                        watchlistContainer.innerHTML = watchlistHtml
                    })
        }
    }
    else {
        watchlistContainer.innerHTML = `
            <div class="placeholder">
                <p class="placeholder-text">Your watchlist is looking a little empty...</p>
                <a href="index.html">
                    <i class="fa-solid fa-circle-plus"></i>
                    Let's add some movies!
                </a>
            </div>
        `
    }
}

function handleSearchClick() {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${mySearch.value}&type=movie`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === 'True') {
                let movieHtml = ''
                for (let movie of data.Search) {
                    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
                        .then(res => res.json())
                        .then(data => {
                            movieHtml += getMovieHtml(data)
                            movieContainer.innerHTML = movieHtml
                        })
                }
            }
            else {
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
    const poster = movie.Poster === 'N/A' ? 'images/image-unavailable.jpg' : movie.Poster // TODO: fix movie poster not found
    const icon = myWatchlist.includes(movie.imdbID) ? 'fa-circle-minus' : 'fa-circle-plus'
    const watchlistOrRemove = myWatchlist.includes(movie.imdbID) ? 'Remove' : 'Watchlist'
    const readMore = movie.Plot.endsWith('...') ? '<button class="movie-btn">Read more</button>' : ''

    return `
        <div class="movie">
            <img src="${poster}" class="movie-img">
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
                    <span>
                        <i class="fa-solid ${icon}"></i>
                        <button class="watchlist-btn" data-watchlist=${movie.imdbID}>
                            ${watchlistOrRemove}
                        </button>
                    </span>
                </div>
                <p class="movie-plot">
                    ${movie.Plot}
                    ${readMore}
                </p>
            </div>
        </div>
    `
}