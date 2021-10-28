

// Assign HTML section containing current dog card to mainSectionEl
const mainDivEl = document.querySelector(".main");


// Function to append one element to another
appendToElement = (element, parentElement) => parentElement.append(element);


// Function to create an element using strings from data.js
function createElement(element = "", className = "", innerText = "") {
    const tempEl = document.createElement(element);
    tempEl.classList.add(className);
    tempEl.innerHTML = innerText;
    return tempEl;
}

// Function to add attributes to an image
function addAttribute(element, tag, text) {
    element.setAttribute(tag, text);
}

// EventListener for list of dog names
document.querySelectorAll(".dogs-list__button").forEach(item => {
    item.addEventListener('click', function() {

        // Find dog name and search data.js for its relevant object
        dogName = this.innerHTML;
        var dogIndex = findDogIndex(dogName);

        //Create a new dog card using the dog's data.js index
        createCard(data[dogIndex]);
    });
});


function findDogIndex(dogName) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].name == dogName) {
            return i;
        }
    }
}

function createCard(dog) {

    mainDivEl.innerHTML = null;

    const mainSectionEl = createElement("section", "main__dog-section")
    appendToElement(mainSectionEl, mainDivEl)

    const header = createElement("h2", "dog-name", dog.name)
    appendToElement(header, mainSectionEl);

    const image = createElement("img", "dog-pic")
    addAttribute(image, "src", dog.image)
    addAttribute(image, "alt", "Image of " + dog.name)
    appendToElement(image, mainSectionEl);

    const description = createElement("div", "main__dog-section__desc")
    appendToElement(description, mainSectionEl);

    const bioHeader = createElement("h3", "bio-header", "Bio")
    appendToElement(bioHeader, description);

    const bioText = createElement("p", "bio-text", dog.bio)
    appendToElement(bioText, description)

    const buttonDiv = createButton(dog);
    appendToElement(buttonDiv, mainSectionEl);

    
}

function naughtyOrNice(dog) {
    return dog.isGoodDog;
}



function createButton(dog) {
    
    const tempDiv = createElement("div", "main__dog-section__btn")

    const behaviour = naughtyOrNice(dog) == true ? "no!" : "yes.";
    const behaviourText = createElement("p", "btn-description", "<em>Is naughty?</em> " + behaviour);
    appendToElement(behaviourText, tempDiv)

    const buttonStyle = naughtyOrNice(dog) == true ? "good-dog" : "bad-dog"
    const buttonText = naughtyOrNice(dog) == true ? "Good dog!" : "Bad dog."

    const button = createElement("button", buttonStyle, buttonText)
    button.addEventListener("click", function() {
        changeBehaviour(dog);
    });

    appendToElement(button, tempDiv)

    return tempDiv;
}

function changeBehaviour(dog) {
    dog.isGoodDog = dog.isGoodDog == true ? false : true;
    createCard(dog)
}