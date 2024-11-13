// show menu
const nav = document.getElementById("nav"),
    headerMenu = document.getElementById("header-menu"),
    navClose = document.getElementById("nav_close");


// show menu
if (headerMenu) {
    headerMenu.addEventListener("click", () => {
        nav.classList.add("show-menu");
    });
}

// Menu hidden
if (navClose) {
    navClose.addEventListener("click", () => {
        nav.classList.remove("show-menu");
    });
}
// scroll page
window.addEventListener("scroll", function () {
    var header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


/* --------------- movies Container part -------------------- */

fetchData();

document.querySelector(`.search`).addEventListener(`keypress`, function (e) {
    if (e.key == `Enter`) {
        const index = e.target.value.trim();
        if (index) {
            fetchSearch(index);
        }
    }
});
async function fetchData() {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&#39`
        );
        if (!response.ok) {
            throw new Error(`Could not fetch resource`);
        }
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error(error);
    }
}

async function fetchSearch(index) {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${encodeURIComponent(
                index
            )}`
        );
        if (!response.ok) {
            throw new Error(`Could not fetch resource`);
        }
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error(error);
    }
}


function displayMovies(film) {
    const container = document.getElementById(`moviesContainer`);
    container.innerHTML = "";

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    for (let i = 0; i < film.length; i++) {
        const content = document.createElement(`div`);
        content.classList.add(`content`);

        const image = document.createElement(`img`);
        image.src = film[i].poster_path
            ? `https://image.tmdb.org/t/p/w1280${film[i].poster_path}`
            : `https://dummyimage.com/300x450/ddd/555.png&text=No+Image`; // default image

        image.classList.add(`poster`);
        content.appendChild(image);


        const bottomPart = document.createElement(`div`);
        bottomPart.classList.add(`bottomPart`);
        content.appendChild(bottomPart);

        const title = document.createElement(`p`);
        title.textContent = film[i].title;
        title.classList.add("title");
        bottomPart.appendChild(title);


        document.querySelectorAll('.title').forEach(title => {
            if (title.textContent.length > 10) {
                title.style.fontSize = '16px';
            }
            if (title.textContent.length > 20) {
                title.style.fontSize = '12px';
            }
        });

        const rate = document.createElement(`span`);
        rate.textContent = film[i].vote_average;
        rate.classList.add(`rate`);
        bottomPart.appendChild(rate);

        // Add heart icon for adding to favorites
        const heartIcon = document.createElement("span");
        heartIcon.classList.add("heart-icon", "ri-heart-line");
        heartIcon.dataset.movieId = film[i].id;

        if (favorites.includes(film[i].id)) {
            heartIcon.classList.add("ri-heart-fill");
            heartIcon.classList.remove("ri-heart-line");
        }

        heartIcon.addEventListener("click", function () {
            this.classList.toggle("ri-heart-fill");
            this.classList.toggle("ri-heart-line");

            const movieId = parseInt(this.dataset.movieId);
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            if (this.classList.contains("ri-heart-fill")) {
                favorites.push(movieId);
            } else {
                favorites = favorites.filter(id => id !== movieId);
            }

            localStorage.setItem('favorites', JSON.stringify(favorites));
        });

        bottomPart.appendChild(heartIcon);
        // const heartIcon = document.createElement("span");
        // heartIcon.classList.add("heart-icon", "ri-heart-line");
        // heartIcon.dataset.movieId = film[i].id;

        // Create "View Details" Button
        const viewDetailsBtn = document.createElement(`button`);
        viewDetailsBtn.textContent = "View Details";
        viewDetailsBtn.classList.add("viewDetails");
        viewDetailsBtn.addEventListener("click", () => {
            window.location.href = `detiels.html?movieId=${film[i].id}`;
        });
        bottomPart.appendChild(viewDetailsBtn);
        container.appendChild(content);
    }
}

