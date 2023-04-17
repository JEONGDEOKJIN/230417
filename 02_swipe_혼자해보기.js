

// 🔷 해야할 것 
    // clone 해놓기 
    // 처음 보이는 화면이, clone 이 아니라, 처음 보이는 화면으로 이동하게 하기 
    // 클릭하면 -> list item 정도로만 이동하게 하기 
    // 1, 5 에 도착하면, 무한으로 느끼게 하기   


// 🔷 전역변수


let item_size = 200;
let item_right_margin = 30;

let item_wrap = document.querySelector('.item-wrap')
let list_item_all = document.querySelectorAll('.list-item')
let slideCount = list_item_all.length;


let prev_btn = document.querySelector('.btn-prev')
let next_btn = document.querySelector('.btn-next')

let currentIndex = 0;

function updateWrapperWidth() {
    // 지금 이 순간, 새롭게 주가된, li 들을 모두 가져와야 하기 때문에, 전역 변수를 사용하지 않음 ⭐⭐⭐ 
    let currentSlide = document.querySelectorAll('.item-wrap li')
    let newSlideCount = currentSlide.length;

    let updateWidthAfterClone = (item_size + item_right_margin) * newSlideCount - item_right_margin + 'px';
    
    item_wrap.style.width = updateWidthAfterClone;

}

// CloneNode() 사용
    // cloneNode 는 배열 자체는 복사를 못 하는거 같은데? 
    // 하나의 배열? 하나의 요소? 만 복사하는 건가? 이쪽에서 문법 개념이 잘 들어가면 좋겠는데
    // console.log(list_item_all.cloneNode())
    // console.log(list_item_all[0].cloneNode(true))  



    // 처음 위치를 clone 이 아니라, 보여야할 slide 로 이동하기 
    function setInitialPosition () {
        // item_wrap의 위치 = + 기존 list 개수 * (item_size + margin) 움직이기 
        let initalPositionXValue = (item_size + item_right_margin) * list_item_all.length
        item_wrap.style.transform = `translateX(-${initalPositionXValue}px)`;
        // console.log(initalPositionXValue)
    }
    


    // 기존 list item 을 복사하기
    function cloneItem() {
        for (i = 0; i < list_item_all.length; i++) {
            let clone_list_item = list_item_all[i].cloneNode(true)
            clone_list_item.classList.add('clone')
            clone_list_item.innerHTML = `클론 뒤 slide : ${i}`
            item_wrap.appendChild(clone_list_item);
        }

        for (i = list_item_all.length-1; i >= 0; i--) {
            let clone_list_item = list_item_all[i].cloneNode(true)
            clone_list_item.classList.add('clone')
            clone_list_item.innerHTML = `클론 앞 slide : ${i}`
            item_wrap.prepend(clone_list_item)
        }
        updateWrapperWidth();

    }
    cloneItem();
        // 이렇게 위에 함수를 '선언' 해도 작동?
        // 왜 그런거지? 

    setInitialPosition();

    // 클릭하면, 인덱스 1 
    // 인덱스 1 이면 > (width + margin) * 1
    // 인덱스 2면 > (width + margin) * 2


    prev_btn.addEventListener('click', function() {
        // ⭐⭐⭐애니메이션 넣기 ⭐⭐⭐ 
        item_wrap.classList.add('animated');
        moveSlide(currentIndex - 1)
    })

    next_btn.addEventListener('click', function() {
        // ⭐⭐⭐애니메이션 넣기 ⭐⭐⭐
        item_wrap.classList.add('animated')
        moveSlide(currentIndex + 1)
    })


function moveSlide (index) {
    item_wrap.style.left = -index * (item_size + item_right_margin)+ `px`;
    currentIndex = index;
    
    console.log(currentIndex, slideCount)

    if (-currentIndex == slideCount || currentIndex == slideCount){

        // ⭐⭐⭐ 음... 우선, 굳이, settimeout 까지 써야하는건가 음... ⭐⭐⭐ 
        item_wrap.classList.remove('animated')

        // 왼쪽으로 가게하는 걸, position 으로 했건, translsiton 으로 했건!
        item_wrap.style.left = '0px';

        // ⭐⭐⭐⭐⭐ 이게 중요 ⭐⭐⭐⭐⭐⭐ 
        currentIndex = 0;
        // item_wrap.classList.add('animated')
    }    
}

