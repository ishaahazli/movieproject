/// INDEX.HTML
    // Function to fetch movie data from OMDB API
    // Function to fetch movie data from OMDB API
function fetchMovieData(imdbID) {
    fetch(`https://www.omdbapi.com/?apikey=c1aecf62&i=${imdbID}`)
        .then(response => response.json())
        .then(data => {
            const movieGrid = document.getElementById('movieGrid');
            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = data.Poster;
            img.alt = data.Title;

            const h3 = document.createElement('h3');
            h3.textContent = data.Title;

            const starRating = generateStarRating(data.imdbRating); // Generate star rating based on movie rating

            const detailsButtonContainer = document.createElement('div');
            detailsButtonContainer.classList.add('details-button-container');

            const favoritesButton = document.createElement('button');
            favoritesButton.textContent = 'Add to Favorites'; // Text for the favorites button
            favoritesButton.classList.add('favorites-button');
            favoritesButton.addEventListener('click', function() {
                addToFavorites(data);
            });

            const detailsButton = document.createElement('button');
            detailsButton.textContent = 'More Details';
            detailsButton.classList.add('details-button');
            detailsButton.addEventListener('click', function() {
                showMovieDetails(data);
            });

            detailsButtonContainer.appendChild(starRating); // Append the star rating before the details button
            detailsButtonContainer.appendChild(favoritesButton); // Add favorites button
            detailsButtonContainer.appendChild(detailsButton);

            card.appendChild(img);
            card.appendChild(h3);
            card.appendChild(detailsButtonContainer);
            movieGrid.appendChild(card);
        })
        .catch(error => console.error('Error fetching movie data:', error));
}

// Function to generate star rating
function generateStarRating(rating) {
    const roundedRating = Math.round(rating / 2); // Convert IMDB rating to 5-star scale
    const starRatingContainer = document.createElement('div');
    starRatingContainer.classList.add('star-rating');
    for (let i = 0; i < roundedRating; i++) {
        const star = document.createElement('span');
        star.textContent = '★'; // Star symbol
        starRatingContainer.appendChild(star);
    }
    return starRatingContainer;
}

// Function to search for a movie
function searchMovie() {
    const searchTerm = document.getElementById('searchInput').value;
    const encodedSearchTerm = encodeURIComponent(searchTerm); // Encode search term
    fetch(`https://www.omdbapi.com/?apikey=c1aecf62&s=${encodedSearchTerm}`)
        .then(response => response.json())
        .then(data => {
            // Clear previous search results
            const movieGrid = document.getElementById('movieGrid');
            movieGrid.innerHTML = '';

            // Display search results
            if (data.Search) {
                data.Search.forEach(movie => {
                    fetchMovieData(movie.imdbID);
                });
            } else {
                console.log('No movies found.');
            }
        })
        .catch(error => console.error('Error searching for movies:', error));
}

function showMovieDetails(data) {
    const queryString = `title=${encodeURIComponent(data.Title)}&plot=${encodeURIComponent(data.Plot)}&actors=${encodeURIComponent(data.Actors)}&director=${encodeURIComponent(data.Director)}&awards=${encodeURIComponent(data.Awards)}&year=${encodeURIComponent(data.Year)}&writer=${encodeURIComponent(data.Writer)}&genre=${encodeURIComponent(data.Genre)}`;
    window.location.href = `details.html?${queryString}`;
}

// Function to display a popup message
function displayPopup(message) {
    alert(message); // You can customize this to display a styled popup
}

// Function to add a movie to favorites
function addToFavorites(data) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(data);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayPopup('Successfully added to favorites!');
}

// Function to fetch and display a specific movie by IMDb ID
function displayMovie(imdbID) {
    fetchMovieData(imdbID);
}

// Call the function to display movies
displayMovie('tt1517268');
displayMovie('tt13274038');
displayMovie('tt17513352');
displayMovie('tt7097896');
displayMovie('tt2166834');
displayMovie('tt4154664');
displayMovie('tt4996328');
displayMovie('tt0417299');
displayMovie('tt2640044');
displayMovie('tt28325746');

// Function to toggle the navigation menu on small screens
function openNav() {
    document.getElementById("mySidenav").style.display = "block";
}

function closeNav() {
    document.getElementById("mySidenav").style.display = "none";
}


/// TOPMOVIE.HTML




/// DETAILS.HTML

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Function to populate movie details from URL parameters
function populateMovieDetails() {
    var title = getParameterByName('title');
    var plot = getParameterByName('plot');
    var actors = getParameterByName('actors');
    var director = getParameterByName('director');
    var awards = getParameterByName('awards');
    var year = getParameterByName('year');
    var writer = getParameterByName('writer');
    var genre = getParameterByName('genre');

    document.getElementById('title').textContent = title;
    document.getElementById('plot').textContent = plot;
    document.getElementById('actors').textContent = actors;
    document.getElementById('director').textContent = director;
    document.getElementById('awards').textContent = awards;
    document.getElementById('year').textContent = year;
    document.getElementById('writer').textContent = writer;
    document.getElementById('genre').textContent = genre;
}

// Function to go back to the previous page
function goBack() {
    window.history.back();
}

// Call the function to populate movie details when the page loads
window.onload = populateMovieDetails;


/// CRUD.JS

