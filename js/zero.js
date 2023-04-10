// check if there's local storage color option
let mainColors = localStorage.getItem("color-option")

if(mainColors !== null){

    document.documentElement.style.setProperty('--main-color',mainColors);

    // remove active class from all colors list item
     document.querySelectorAll(".colors-list li").forEach(element =>{
                element.classList.remove("active");

                  // add active class on element with data-color === local storage item
                  if (element.dataset.color === mainColors) {

                    // add active class
                    element.classList.add("active");
                      
                  }

    });  
}

// random background option
let backgroundOption = true;

// variabl to control the background interval
let backgroundInterval;

// check if there's local storage random background item

let backgroundLocalItem = localStorage.getItem("background-option");

// check if random background local storage is not empty

if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    // remove active class from all span
    document.querySelectorAll(".random-backgrounds span").forEach(element =>{
        element.classList.remove("active");
    });
    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
        
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }

     
}

// toggle spin class icon
document.querySelector(".toggle-settings .fa-gear").onclick = function(){
    // toggle class fa-spin for rotation on self
    this.classList.toggle("fa-spin");
    // toogle class open main settings box
    document.querySelector(".settings-box").classList.toggle("open");
};
// switch color
const colorsLi = document.querySelectorAll(".colors-list li")
// loop on all list items
colorsLi.forEach(li =>{
    // click on every list items

    li.addEventListener("click", (e)=>{
        // set color in root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);

        handleActive(e);
        // set color on local storage
        localStorage.setItem("color-option", e.target.dataset.color);
    });
});

// switch random background option

const randomBackEl= document.querySelectorAll(".random-backgrounds span")
// loop on all spans
randomBackEl.forEach(span =>{
    // click on every span

    span.addEventListener("click", (e)=>{
        
     handleActive(e);

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;

            randomizeImgs();
            localStorage.setItem("background-option", true);
            
        } else {
            backgroundOption = false;

            clearInterval(backgroundInterval);
            
            localStorage.setItem("background-option", false);
            
        }
    });
});
// select landing page element
let landingPage = document.querySelector(".landing-page");

// get array of imgs
let imgsArray = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"]

// function to randomiz imgs
function randomizeImgs(){

    if(backgroundOption === true){
        backgroundInterval = setInterval(()=>{

            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            landingPage.style.backgroundImage ='url("photo/' + imgsArray[randomNumber]+ '")';
        
        },1000);
    }

}
randomizeImgs();

// selsct skills selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function(){
    // skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;
    

    // skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // window height
    let windowHeight = this.innerHeight;

    // window .scrolltop
    let windowScrollTop = this.pageYOffset;


    if (windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight) ) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill =>{

            skill.style.width = skill.dataset.progress;
        });
        
    }
}
//  create popup with the image

let ourGallery = document.querySelectorAll('.gallery img');

ourGallery.forEach(img =>{
    img.addEventListener('click', (e) =>{

        // create overlay element
        let overlay = document.createElement("div");

        // add class to overlay
        overlay.className = 'popup-overlay';

        // append overlay to the body
        document.body.appendChild(overlay); 

        // create the popup box
        let popupBox = document.createElement("div");

        // add class to the popup Box
        popupBox.className = 'popup-box';

        if (img.alt !== null) {

            // create heading
            let imgHeading = document.createElement("h3");

            // create text for heading
            let imgText = document.createTextNode(img.alt);

            // append the text to the heading
            imgHeading.appendChild(imgText);

            // append the heading to the popup box
            popupBox.appendChild(imgHeading);
            
        }

        // create the image
        let popupImage = document.createElement("img");

        // set img source
        popupImage.src = img.src;

        // add image to popup box
        popupBox.appendChild(popupImage);

        // append the popup box to body
        document.body.appendChild(popupBox);

        // create the close span
        let closeButton = document.createElement("span");

        // create the close button text
        let closeButtonText =document.createTextNode("x");

        // append text to close button
        closeButton.appendChild(closeButtonText);

        // add class to close button
        closeButton.className = 'close-button'

        // add close button to the popup box
        popupBox.appendChild(closeButton);



    })
});

// close popup
document.addEventListener('click',function(e){

    if (e.target.className == 'close-button') {

        // remove the current popup
        e.target.parentNode.remove();

        // remove overlay
        document.querySelector(".popup-overlay").remove();
        
    }
})
// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements){
    elements.forEach(ele =>{
        ele.addEventListener("click", (e) =>{
            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// handle active state

function handleActive(ev) {

        // remove active class from all childrens
        ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
            element.classList.remove("active")
        });

        // add active class on self
        ev.target.classList.add("active");
  
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletsLocalItem = localStorage.getItem("bullets-option");

if (bulletsLocalItem !== null) {
    
    bulletsSpan.forEach(span =>{
        span.classList.remove("active");
    });

    if (bulletsLocalItem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");
        
    }else{
        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");
   

    }
    
}

bulletsSpan.forEach(span =>{

    span.addEventListener("click", (e) =>{

        if (span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets-option", 'block');
            
        } else{
            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets-option", 'none');
        }

        handleActive(e);
    })
});

// reset button

document.querySelector(".reset-options").onclick = function(){

    localStorage.clear();
    // localStorage.removeItem("bullets-options");
    // localStorage.removeItem("color-options");
    // localStorage.removeItem("background-options");

    // reload window
    window.location.reload();
}

// toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function(e){

    // stop propagation
    e.stopPropagation(); 

    this.classList.toggle("menu-active");

    tLinks.classList.toggle("open");


};

// click anywhere outside menu toggle button
document.addEventListener("click", (e) =>{

    if (e.target !== toggleBtn && e.target !== tLinks) {

        // check if menu is open
        if (tLinks.classList.contains("open")) {

            toggleBtn.classList.toggle("menu-active");

            tLinks.classList.toggle("open");
        
        }
        
    }
});

// stop propagation on menu
tLinks.onclick = function(e){
    e.stopPropagation();
}







