const $wrap = document.getElementsByClassName('card-wrap')[0];
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
    console.log(entries);
    // entries[0].target.classList.toggle('show',entries[0].isIntersecting);
    entries.forEach(entry => {
        entry.target.classList.toggle('show', entry.isIntersecting);
        // if(entry.isIntersecting){observer.unobserve(entry.target); }/* 한번 보이고 나면 다시 안 사라지게 */
    });
},{ 
    threshold : .5  /* 보이는 비율 */
    // rootMargin : "-100px" /* preloading image 할 때 유용 */
    // root : /* default는 body 근데 따로 설정할 수도 있음. */
});

// observer.observe(cards[0]);
cards.forEach(card => observer.observe(card));

/* LAZY LOADING (INFINITE LOADING) */
const lastCardObserver = new IntersectionObserver(entries =>{
    const lastCard = entries[0];
    if(!lastCard.isIntersecting){return;}
    load_new_cards();
    lastCardObserver.unobserve(lastCard.target); /* 무한 로딩이 아닌 경우 여기까지만 작성*/
    lastCardObserver.observe(document.querySelector('.card:last-child'));
},{ rootMargin : "100px"});

lastCardObserver.observe(document.querySelector('.card:last-child'));

function load_new_cards(){
    for(let i=0; i<10; i++){
        const $card = document.createElement('DIV');
        $card.classList.add('card');
        $card.textContent = "🚩New CARD";
        $wrap.appendChild($card);
        observer.observe($card);
    }//for
}//load_new_cards