const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    displayCategories(data.data.news_category);
}

const displayCategories = categories => {
    const newsCategories = document.getElementById('categories-container');
    categories.forEach(category => {
        const categriesDiv = document.createElement('div');
        categriesDiv.classList.add('navbar-collapse');
        categriesDiv.innerHTML = `
        <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">${category.category_name}</a>
                        </li>
                    </ul>
        `
        newsCategories.appendChild(categriesDiv);
    })
}

const loadStories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`
    const res = await fetch(url);
    const data = await res.json();
    displayStories(data.data);
}

const displayStories = stories => {
    const storiesContainer = document.getElementById('news-container');
    stories.forEach(story => {
        const storiesDiv = document.createElement('div');
        storiesDiv.classList.add('card');
        storiesDiv.innerHTML = `
        <div class="row g-3" style="max-width: 1200px;">
        <div class="col-md-4 d-flex align-items-center">
            <img src="${story.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${story.title}</h5>
                <p class="card-text">${story.details}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex">
                    <div>
                        <img src="${story.author.img}" class="img-fluid rounded rounded-circle" alt="..." width="60">
                    </div>
                    <div class="p-0 m-0 g-0">
                        <p class="ps-3"><small>${story.author.name} <br>
                                ${story.author.published_date}</small></p>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-center">
                        <img src="images/eye.png" alt="" width="50"> 
                        <p class="ps-3">${story.total_view}</p>
                    </div>
                    <div>
                        <p>Rating: 
                        ${story.rating.number} </p>
                    </div>
                    <div>
                        <img src="images/arrow.jpg" alt="" width="60">
                    </div>
            </div>
        </div>
    </div>        `
        storiesContainer.appendChild(storiesDiv);
    })
}




loadStories()
loadCategories()