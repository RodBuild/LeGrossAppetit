// CODE FOR FIRST CAROUSEL
var slideIndex, slides, dots, captionText

// QUERYSELECTORALL()
function initGallery() {
    slideIndex = 0;
    slides = document.getElementsByClassName('showcase-image');
    slides[slideIndex].style.opacity = 1;

    captionText = document.querySelector('.showcasecaptionHolder .captionText');
    captionText.innerHTML = slides[slideIndex].querySelector('.showcase-image .showcasetext').innerHTML;

    dots = [];
    var dots_container = document.getElementById('showcase-dots-container');

    for (var i = 0; i < slides.length; i++) {
        // CREATE NEW ELEMENT <span><span>
        var dot = document.createElement('span');
        // GIVE NEW ELEMENT A CLASS NAME <span class='showcase-dot'><span>
        dot.classList.add('showcase-dot');
        //dot.setAttribute('onClick', 'moveShowcase(' + i + ')')
        // APPEND is like InnerHTML
        dots_container.append(dot)
        dots.push(dot)

    }
    dots[slideIndex].classList.add('active')

    //evenlisteners....
    const r = document.getElementById('show-r')
    if (r) {
        r.addEventListener('click', function () {
            plusShowcase(1)
        }, false)
    }
    const l = document.getElementById('show-l')
    if (l) {
        l.addEventListener('click', function () {
            plusShowcase(-1)
        }, false)
    }
    // NOT WORKING - DO NOT MAKE IT WORK!
    var d = document.querySelectorAll('.showcase-dot')
    var i = 0;
    console.log(slideIndex)
    d.forEach(dot =>
        dot.addEventListener('click', function () {
            console.log(i);
            i++;
            console.log('No way to know which index was clicked!')
            moveShowcase(slideIndex)
        }, false)
    )
}
initGallery()

function plusShowcase(n) {
    moveShowcase(slideIndex + n);
}

function moveShowcase(n) {
    var i, current, next
    var moveShowcaseAnimClass = {
        forCurrent: "",
        forNext: ""
    }
    var showcaseTextAnimClass;
    // clicks the right arrow
    if (n > slideIndex) {
        if (n >= slides.length) {
            n = 0
        }
        moveShowcaseAnimClass.forCurrent = "moveLeftCurrentShowcase";
        moveShowcaseAnimClass.forNext = "moveLeftNextShowcase";
        showcaseTextAnimClass = "showcaseTextTop";
    }
    // clicks the left arrow
    else if (n < slideIndex) {
        if (n < 0) {
            n = slides.length - 1
        }
        moveShowcaseAnimClass.forCurrent = "moveRightCurrentShowcase";
        moveShowcaseAnimClass.forNext = "moveRightNextShowcase";
        showcaseTextAnimClass = "showcaseTextBottom";
    }

    if (n != slideIndex) {
        next = slides[n];
        current = slides[slideIndex];
        for (i = 0; i < slides.length; i++) {
            slides[i].className = 'showcase-image';
            slides[i].style.opacity = 0;
            dots[i].classList.remove('active');
        }
        current.classList.add(moveShowcaseAnimClass.forCurrent);
        next.classList.add(moveShowcaseAnimClass.forNext);
        dots[n].classList.add('active')
        slideIndex = n;
    }
    captionText.style.display = 'none';
    captionText.className = 'captionText ' + showcaseTextAnimClass;
    captionText.innerHTML = slides[n].querySelector('.showcasetext').innerHTML;
    captionText.style.display = 'block';
    setTimeout(function() {
        captionText.className = 'captionText';
    }, 1500);
}

/* To MOVE carousel, on play/stop button */
var timer = null;
function setTimer() {
    timer = setInterval(function () {
        plusShowcase(1);
    }, 3000)
}

function playPauseSlides() {
    //var timer = null;
    const btn = document.getElementById('showcase-autoButton');
    btn.addEventListener('click', function() {
        if (timer == null) {
            setTimer();
            btn.style.backgroundPositionY='0px';
        }
        else {
            clearInterval(timer);
            timer = null;
            btn.style.backgroundPositionY='-33px';
        }
    })

}
playPauseSlides();

// Other sutff