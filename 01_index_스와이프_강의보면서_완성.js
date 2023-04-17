let slides = document.querySelector('.slides');
let slide = document.querySelectorAll('.slides li');

let currentIndex = 0;   // 몇 번째 까지를 보는지 

// 슬라이드의 개수 
let slideCount = slide.length;

let slideWidth = 200; 
let slideMargin = 30; 

let prevBtn = document.querySelector('.prev');
let nextBtn = document.querySelector('.next');


// 복사본 만들기 
makeClone();

function makeClone() {
    for (let i = 0; i < slideCount; i++) {
        // 복사하기 ⭐⭐⭐ 
        let cloneSlide = slide[i].cloneNode(true);
        cloneSlide.classList.add('clone');

        // 기존 배열 ⭐'뒤'⭐ 에 붙이기 
            // a.appendChild(b)
            // a 에 b 를 뒤에 추가하기 
        slides.appendChild(cloneSlide)
    }

    // ⭐⭐⭐ 이 반복문을 생각을 못 했어 ⭐⭐⭐ 
    for (let i = slideCount -1; i>=0; i--) {
        // 복사하기 
        let cloneSlide = slide[i].cloneNode(true);
        cloneSlide.classList.add('clone');

        // ⭐ 앞 ⭐ 에 붙이기 
            // prepend 
        slides.prepend(cloneSlide)

    }

    // 클론된 li 를 반영해서 ul + margin 반영해서 width 잡기 
    updateWidth();

    // ul 중 어떤 li 를 보여줄 지, 초기위치를 설정
    setInitialPos();

    // 이동할 때, transition 만들어놓은거 1초 후에 적용하기 
        // 이렇게 하면, 근데, 1초 후에, 적용되는게 보이는거 아냐? 
        // 아, 그러니까 1) setInitialPos 로 다 배치 한 다음 2) class 명을 추가하면, 이미 이동한거니까 보일일이 없음 
        // 3) 그리고 이후부터는, slides 에 animated 가 붙었으니까, 그 다음 움직이는 것들은 보임 ⭐⭐⭐⭐⭐  
    setTimeout(function() {
        slides.classList.add('animated');
    }, 100);
    
}


// 전체 슬라이드 개수 구하고 > width, margin 값 넣어주기
function updateWidth() {
    let currentSlide = document.querySelectorAll('.slides li')
    let newSlideCount = currentSlide.length;

    let newWidth = (slideWidth + slideMargin)*newSlideCount - slideMargin + 'px'

    slides.style.width = newWidth;
}


// ul 을 이동시켜서, 어떤것을 처음으로 보여줄지 결정하기 
function setInitialPos() { 
    // 슬라이드 너비 를 주고, 그걸 마이너스로 주기 
    let initialTranslateValue = -(slideWidth + slideMargin) * slideCount;

    // 그 값으로 ul 을 이동시키기 
    slides.style.transform = `translateX(${initialTranslateValue}px)`;
}


nextBtn.addEventListener('click', function() {
    moveSlide(currentIndex + 1);
    
})
prevBtn.addEventListener('click', function() {
    moveSlide(currentIndex -1);

})


function moveSlide(index) {
    slides.style.left = -index * (slideWidth + slideMargin) + `px`;
    currentIndex = index;

    console.log(currentIndex, slideCount)

    // ⭐⭐⭐⭐⭐ 아, 여기가 내가 부족
    if(currentIndex == slideCount || currentIndex == - slideCount) {

        // 여기에도 5초 뒤에 실행을 주는 이유는❓❓❓❓❓ 😥😥😥
            // 이걸 안 해도 작동하는거 아냐? 
        setTimeout(function() {
            // 아, 이렇게 animated 를 없애면 > 안 보이는 구나 
            slides.classList.remove('animated');
            slides.style.left = '0px'
            currentIndex = 0;
        }, 500)
        // 여기에서 settimeout 안 걸어도 작동하는 것 같기는 한데, 우선 패스
            // slides.classList.remove('animated');
            // slides.style.left = '0px'
            // currentIndex = 0;

        // 다시 animated 켜기 
        setTimeout (function() {
            slides.classList.add('animated');
        }, 600)
    }
}

// prevBtn = document.querySelector('.prev');
// nextBtn = document.querySelector('.next');



