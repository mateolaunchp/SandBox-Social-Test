'use strict';

let USER_STORE = [];

const blogURL = 'https://blog.sandboxcommerce.com/?rest_route=/wp/v2';

function fetchBlogs(){
  fetch(`${blogURL}/posts`, {
      method: 'GET'
  })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText)
    })
    .then(allBlogs => {
        console.log(allBlogs)
        displayBlog(allBlogs);
    })
    .catch(error =>
        {console.log(error)
        displayError()
    });
}

function getAuthors() {
  fetch(`${blogURL}/users`, {
      method: 'GET',
  })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText)
    })
    .then(allUsers => {
        console.log(allUsers);
        USER_STORE = allUsers;
    })
    .catch(error => {
        console.log(error)
    });
}

function defineAuthor(authorID) {
    if (USER_STORE.length < 1) {
        return 'Sandbox Commerce';
    }
    else {
        for(let i=0; i< USER_STORE.length; i++) {
            if (authorID === USER_STORE[i].id) {
                return USER_STORE[i].name;
            }
        }
    }
}


function displayBlog(allBlogs){
$('.blog-container').empty();
    let lengthCount = 5;
  for (let i=0; i< (lengthCount || allBlogs.length); i++) {
      while(allBlogs[i].status !== "publish") {
          lengthCount++;
          i++;
      }
      console.log(allBlogs[i].excerpt);
    $('.blog-container').append(
        `<a aria-label='${allBlogs[i].title.rendered}' href='${allBlogs[i].link}'>
            <div class="card-box">
                <img class="blog-img" src=${allBlogs[i].jetpack_featured_media_url ? allBlogs[i].jetpack_featured_media_url : "./images/image-alt.svg"} alt=${allBlogs[i].featured_image_alt_text ? allBlogs[i].featured_image_alt_text : ""} />
                <div class="blog-box">
                    <p class="blog-title">${allBlogs[i].title.rendered}</p>
                    <div class="blog-content">${allBlogs[i].excerpt.rendered}</div>
                    <p class="date">Posted on ${new Date(allBlogs[i].date).toLocaleString()} by <span class="author">${allBlogs[i].author ? defineAuthor(allBlogs[i].author) : 'Sandbox Commerce'}</span></p>
                </div>
            </div>
        </a>`
    )}
}

function displayError(){
    $('.blog-container').empty();
    $('.blog-container').append(
            `<p class="loading">Sorry! something went wrong in accessing the blog articles.
            Please select "Load More" to view all</p>`
        )
}

function postApplication(applyUser) {
  fetch('https://webbackend.sandboxcommerce.com/api/users/jobApplication', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(applyUser)
  })
  .then(response => response.json())
  .then(response => {

  })
  .catch((err) => {
      throw (err)});
}


fetchBlogs();
getAuthors();