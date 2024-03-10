let createThumbnail = (length, link = '', videoTitle = "thumbnail") => {
    let div = document.createElement('div');
    let img = document.createElement('img');
    let span = document.createElement('time');

    // Setting img attributes
    img.src = (link === '') ? `https://source.unsplash.com/random/300x190?sig=${Math.random()}` : link;
    img.alt = videoTitle;
    img.width = 200;

    // Setting time attributes
    span.innerText = length;

    // giving tags thier classes
    div.classList.add("thumbnail");
    span.classList.add("length");

    // appending and returning the created element
    div.append(img);
    div.append(span);

    return div;
};

// https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
// 'Brian ustas' accepted answer
// specific rounding
let roundNum = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
};

// Views will be converted in some of these and will maximum convert to Quadrillion number
let conversions = ['Q', 'T', 'B', 'M', 'K']

let convertViews = (views = 0) => {
    // Views will never be negative
    if (views < 0) { views = 0; }

    // Starting from Quadrillion
    let convertBy = conversions.length;

    for (const word of conversions) {
        let currentConversion = 10 ** (3 * convertBy);
        // Check if the number is in quadrillion, trillion or others and then breaks the loop
        if (views / currentConversion >= 1) {
            views = roundNum(views / currentConversion) + word;
            break;
        }
        convertBy -= 1;
    }

    return views + ' views';
};

// Capitalize the word
let capitalize = (word) => word[0].toUpperCase() + word.slice(1,);

let createVideoTitleAndStuff = (title, cName, views, monthsOld) => {
    let videoMeta = document.createElement('div'), titleDiv = document.createElement('span'), groupDiv = document.createElement('div');

    // Title and videoMeta classes
    videoMeta.classList.add('videoMeta');
    titleDiv.classList.add('title');

    // setting the text and appending
    titleDiv.innerText = capitalize(title);
    videoMeta.append(titleDiv);

    // Channel name element
    let span = document.createElement('span')
    span.innerText = cName;
    span.className = 'channelName meta';
    groupDiv.append(span);

    // views element
    span = document.createElement('span')
    span.innerText = convertViews(views);
    span.className = 'views meta';
    groupDiv.append(span);

    // months old element
    span = document.createElement('span')
    span.innerText = monthsOld + ' months old';
    span.className = 'monthsOld meta';
    groupDiv.append(span);

    // Appending all these and returning the element
    videoMeta.append(groupDiv);

    return videoMeta;
}

let createCard = (title, channelName, views, monthsOld, lengthOfVideo, thumbnail = '') => {
    // getting the container in which the created element will be appended
    let container = document.querySelector('.container');
    // Card element
    let card = document.createElement('div');
    card.classList.add('card')

    // creating thumbnail and title and stuff and appending to card
    card.append(createThumbnail(lengthOfVideo, thumbnail, title))
    card.append(createVideoTitleAndStuff(title, channelName, views, monthsOld))

    container.append(card);
}

// Lets initialize
// 4 cards
createCard('Sigma Web Developement', 'CodeWithHarry', 4560, 3, '32:21', 'https://i.ytimg.com/vi/KB7GzBv5p4Q/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDVLIUfmrskNAha1yNa-7ygsEeNEA');

createCard('How to ??', 'CreationProgress', 15000000, 15, '22:11');

createCard('Getting your Mobile phone a cover', 'PhoneSpecialist', 15, 1, '12:00');

createCard('Javascript in python?? IS IT POSSIBLE | HOW?', 'JS Enthusiast', 881114560, 3, '4:53');