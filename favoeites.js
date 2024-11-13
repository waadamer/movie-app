
// Show menu
const nav = document.getElementById("nav"),
    headerMenu = document.getElementById("header-menu"),
    navClose = document.getElementById("nav_close");

if (headerMenu) {
    headerMenu.addEventListener("click", () => {
        nav.classList.add("show-menu");
    });
}

if (navClose) {
    navClose.addEventListener("click", () => {
        nav.classList.remove("show-menu");
    });
}

window.addEventListener("scroll", function () {
    var header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const favoriteList = document.getElementById('moviesContainer');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoriteList.innerHTML = '<p>No favorite movies added yet.</p>';
        return;
    }

    favorites.forEach(async (movieId) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
            );
            if (!response.ok) {
                throw new Error(`Could not fetch resource`);
            }
            const movie = await response.json();
            const content = document.createElement('div');
            content.classList.add('content');

            const image = document.createElement('img');
            image.src = `https://image.tmdb.org/t/p/w1280${movie.poster_path}`;
            image.classList.add('poster');
            content.appendChild(image);

            const bottomPart = document.createElement('div');
            bottomPart.classList.add('bottomPart');
            content.appendChild(bottomPart);

            const title = document.createElement('p');
            title.textContent = movie.title;
            title.classList.add('title');
            bottomPart.appendChild(title);

            const rate = document.createElement('span');
            rate.textContent = movie.vote_average;
            rate.classList.add('rate');
            bottomPart.appendChild(rate);




            // Add heart icon for adding to favorites
            const heartIcon = document.createElement('span');
            heartIcon.classList.add('heart-icon', 'ri-heart-fill');
            heartIcon.dataset.movieId = movie.id;
            heartIcon.addEventListener('click', function () {
                this.classList.toggle('ri-heart-fill');
                this.classList.toggle('ri-heart-line');

                const movieId = parseInt(this.dataset.movieId);
                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                if (this.classList.contains('ri-heart-fill')) {
                    favorites.push(movieId);
                } else {
                    favorites = favorites.filter(id => id !== movieId);
                }

                localStorage.setItem('favorites', JSON.stringify(favorites));
                content.remove();
            });


            const viewDetailsBtn = document.createElement(`button`);
            viewDetailsBtn.textContent = "View Details";
            viewDetailsBtn.classList.add("viewDetails");
            viewDetailsBtn.addEventListener("click", () => {
                window.location.href = `details.html?movieId=${film[i].id}`;
            });
            bottomPart.appendChild(heartIcon);
            bottomPart.appendChild(viewDetailsBtn);

            favoriteList.appendChild(content);
        } catch (error) {
            console.error(error);
        }
    });
});


