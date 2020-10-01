const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let initialLoad = true;

let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'LhPVY9-SyrTXIUx0ftcRsB5hvo9Ln3XjUZsHdJ4MWpo';
let apiUrl = 'https://api.unsplash.com/photos/?client_id=' + apiKey + '&count=' + count;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded == totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready=',ready);
        initialLoad = false;
        count = 30;
        const apiUrl = 'https://api.unsplash.com/photos/?client_id=' + apiKey + '&count=' + count;
    }
}

// Helper Function to Set Attribute on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imageLoaded = 0;
    totalImages = photosArray.length;
    console.log('Total images', totalImages);
    // Run fuction for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Event Listener, check when each

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        // console.log(photosArray);
    } catch (error) {
        // catch error here
        console.log("Error Ocurred");
    }
}

// Check to see if scrolling near bottom of page, Load More Photos  
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.screenY >= document.body.offsetHeight - 1000 && ready) {
        ready = fasle;
        getPhotos();
    }
})

// On load
getPhotos()