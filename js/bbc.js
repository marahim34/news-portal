// Loading all stories
const loadStories = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${"0" + category_id}`
    const res = await fetch(url);
    const data = await res.json();
    displayStories(data.data);
}

// displaying stories
const displayStories = (stories) => {
    const storiesContainer = document.getElementById('news-container');
    storiesContainer.innerText = '';
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
                        <p class="card-text">${story.details.slice(0, 300)}.....</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex">
                            <div>
                                <img src="${story.author.img}" class="img-fluid rounded rounded-circle" alt="..." width="60">
                            </div>
                            <div class="p-0 m-0 g-0">
                                <p class="ps-3"><small>${story.author.name ? story.author.name : 'No author name found'} <br>
                                        ${story.author.published_date ? story.author.published_date : 'No publication date found'}</small></p>
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
                            <button onclick="loadStoryDetails('${story._id}')" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#NewsModal">Read More...</button>
                        </div>
                    </div>
                </div>
            </div>
            `
        storiesContainer.appendChild(storiesDiv);
    })
}

// loading categories
const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    displayCategories(data.data.news_category);
}

// displaying categories
const displayCategories = categories => {
    const newsCategories = document.getElementById('categories-container');
    categories.forEach(category => {
        const categriesDiv = document.createElement('div');
        categriesDiv.classList.add('navbar-collapse');
        categriesDiv.innerHTML = `
        <ul class="navbar-nav">
                        <li class="nav-item">
                            <a id="category-text" onclick="loadCategoryWiseStoryDetails(${category.category_id})" class="nav-link active" aria-current="page" href="#">${category.category_name}</a>
                        </li>
                    </ul>
        `
        newsCategories.appendChild(categriesDiv);
        const categoryText = document.getElementById('category-text')
        const categoryDisplay = categoryText.innerText;
        return categoryDisplay;
    })
}

// loading categorywise details
const loadCategoryWiseStoryDetails = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${"0" + category_id}`
    // console.log(url);
    loadStories(category_id)
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryWiseStoryDetails(data.data))
}

// displaying categorywise details
const displayCategoryWiseStoryDetails = async (storyCategories) => {
    const storiesContainer = document.getElementById('categorywiseStories');
    storiesContainer.innerText = '';
    for (const storyCategory of storyCategories) {
        const storieCategoriesDiv = document.createElement('div');
        storieCategoriesDiv.classList.add('card');
        storieCategoriesDiv.innerHTML = `
            <div class="row g-3" style="max-width: 1200px;">
                <div class="col-md-4 d-flex align-items-center">
                    <img src="${storyCategory.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${storyCategory.title}</h5>
                        <p class="card-text">${storyCategory.details.slice(0, 300)}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex">
                            <div>
                                <img src="${storyCategory.author.img}" class="img-fluid rounded rounded-circle" alt="..." width="60">
                            </div>
                            <div class="p-0 m-0 g-0">
                                <p class="ps-3"><small>${storyCategory.author ? storyCategory.author.name : 'No author name found'} <br>
                                        ${storyCategory.author.published_date}</small></p>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-center">
                            <img src="images/eye.png" alt="" width="50">
                            <p class="ps-3">${storyCategory.total_view}</p>
                        </div>
                        <div>
                            <p>Rating:
                                ${storyCategory.rating.number} </p>
                                
                        </div>
                        <div>
                            <button onclick="loadStoryDetails('${storyCategory._id}')" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#NewsModal">Read More...</button>
                        </div>
                    </div>
                </div>
            </div>
            `
        storiesContainer.appendChild(storieCategoriesDiv);
    }
}

// loading story details
const loadStoryDetails = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayStoryDetails(data.data);
}

// displaying stories in modals
const displayStoryDetails = story => {
    const modalTitle = document.getElementById('NewsModalLabel');
    modalTitle.innerText = story[0].title;
    const storyDetails = document.getElementById('story-details');
    storyDetails.innerHTML = `
    <p>${story[0].author.name ? story[0].author.name : 'No author name found'} <br>
    ${story[0].author.published_date ? story[0].author.published_date : 'No publication date author name found'} </p>
    <img src="${story[0].thumbnail_url}" class="img-fluid rounded-start"} img>
    <p>Total View: ${story[0].total_view} <br> Rating: ${story[0].rating.number} </p>

    <p>News Details: <br> ${story[0].details ? story[0].details : 'Photo news'}</p>
    `
}

loadCategories()