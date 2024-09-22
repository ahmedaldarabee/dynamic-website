let mainColor = localStorage.getItem("colorConfig");

if(mainColor !== null) {
    document.documentElement.style.setProperty("--main-color",mainColor);

    document.querySelectorAll(".options-box  li").forEach((ele) => {
        ele.classList.remove("active");

        if(ele.dataset.color === mainColor){
            ele.classList.add("active");
        }
    });
}

let bgChangeOption = false;
let stopInterval;

let resultBGChange = localStorage.getItem("backgroundConfig");

if(resultBGChange !== null) {
    if(resultBGChange == 'true'){
        bgChangeOption = true;
    }else {
        bgChangeOption = false;
    }

    document.querySelectorAll(".random-option span").forEach((spanEle) => {
        spanEle.classList.remove("active");
    });

    if(resultBGChange == 'true'){
        document.querySelector(".random-option span.yes").classList.add("active");
    }else{
        document.querySelector(".random-option span.no").classList.add("active");
    }
}


const bgOptions = document.querySelectorAll(".random-option span").forEach((item) => {
    item.addEventListener("click", function (event){
        handleActive(event);        
        if(event.target.dataset.background === 'yes'){
            BGChange();
            localStorage.setItem("backgroundConfig" , true);
        }else{
            bgChangeOption = false;
            localStorage.setItem("backgroundConfig" , false);
            clearInterval(stopInterval);
        }
    })
})

// change bg img
let arrImgs = ["land-1.png","land-2.jpg","land-3.jpg","land-4.jpg","land-5.jpg"];
function BGChange(){
    if(bgChangeOption){
        stopInterval = setInterval(() => {
                let randomIndex = Math.floor(Math.random() * arrImgs.length);
                document.querySelector(".landing-page").style.backgroundImage = "url('../imgs/" + arrImgs[randomIndex] + "')";
            }, 5000
        );
    }
}

document.querySelector(".setting-section .config-icon").onclick = function(){
    this.parentElement.classList.toggle("open");
};

const itemColorList = document.querySelectorAll(".options-box  li");
itemColorList.forEach((event) => {
    event.addEventListener("click",function (element) {
        document.documentElement.style.setProperty("--main-color",element.target.dataset.color);
        localStorage.setItem("colorConfig",element.target.dataset.color);

        handleActive(element);
    })
})

let skills = document.querySelector(".skills");

window.onscroll = function () {
    let offsetT = skills.offsetTop;
    let offsetH = skills.offsetHeight;
    
    let currentHeight = window.innerHeight;
    let lastHeight = window.pageYOffset;

    if (lastHeight >= offsetT + offsetH - currentHeight) {
        document.querySelectorAll(".box .skills-progress span").forEach((span) => {
            span.style.width = span.dataset.progress;
        })
    }
}

document.querySelectorAll(".gallery-boxes .box img").forEach((img) => {
    img.addEventListener("click",function(){
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        let imgContainer = document.createElement("div");
        imgContainer.className = "overlay-img";

        let img = document.createElement("img");
        img.src = this.src;
        
        imgContainer.appendChild(img);
        document.body.appendChild(imgContainer);

        let imageHeading = document.createElement("h3");
        let imageText = document.createTextNode(this.alt);
        
        imageHeading.appendChild(imageText);
        imgContainer.appendChild(imageHeading);

        let closeButton = document.createElement("p");
        let closeButtonText = document.createTextNode("X");
        
        closeButton.className = "close-button"
        closeButton.appendChild(closeButtonText);
        imgContainer.appendChild(closeButton);
    })
})

document.addEventListener("click",function(Event){
    if(Event.target.className === 'close-button'){
        Event.target.parentElement.remove();
        document.querySelector(".popup-overlay").remove();
    }
})

document.querySelectorAll(".nav-bullets .bullets").forEach((bullet) => {
    bullet.addEventListener("click",(Event) => {
        document.querySelector(Event.target.dataset.section).scrollIntoView({
            behavior : 'smooth'
        })
    })
})


let navBullets = document.querySelector(".nav-bullets");

let showBullets = localStorage.getItem("show_bullet");

if(showBullets !== null){
    document.querySelectorAll(".bullets-setting span").forEach((span)=>{
        span.classList.remove("active");
    })
    if(showBullets == 'block'){
        navBullets.style.display="block";
        document.querySelector(".bullets-setting span.yes").classList.add("active");
    }else{
        navBullets.style.display="none";
        document.querySelector(".bullets-setting span.no").classList.add("active");
    }

}

document.querySelectorAll(".bullets-setting span").forEach((span) => {
    span.addEventListener("click",function(Event){
        if(Event.target.dataset.bull == 'show'){
            navBullets.style.display="block";
            localStorage.setItem("show_bullet","block");
        }else{
            navBullets.style.display="none";
            localStorage.setItem("show_bullet","none");
        }
    })
})

function handleActive(Event) {
    Event.target.parentElement.querySelectorAll("ul .active").forEach((ele) => {
        ele.classList.remove("active");
    })
    Event.target.classList.add("active");
}

document.querySelector(".resetBtn").addEventListener("click",function(){
    localStorage.clear();
    window.location.reload();
})

document.querySelector(".fa-list").addEventListener("click",function(Event){
    Event.target.classList.toggle("open");
})

window.addEventListener("scroll",function(){
    let completedHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollTop = document.documentElement.scrollTop;
    document.querySelector(".progress-bar").style.width = `${(scrollTop / completedHeight) * 100 }%`;
})

$(window).on('load',function(){
    $('.loading span').fadeOut(2000,function(){
        $(this).parent().fadeOut(2000,function(){
            $(this).remove();
        })
    })
})