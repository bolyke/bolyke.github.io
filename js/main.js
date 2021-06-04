document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('.menu-toggle').addEventListener('click', function () {
        document.querySelector('.header-nav').classList.toggle('active');
        document.querySelector('body').classList.toggle('unscroll');
        resetMobMenu();
    })

    if (window.innerWidth < 768 && document.querySelector('.menu-collapse-2.active')) {
        document.querySelector('.menu-collapse-2.active').classList.remove('active')    
    }

    document.querySelectorAll('.menu-collapse').forEach( item => {
        item.addEventListener('click', function () {
            if (window.innerWidth < 768) {
                if (document.querySelector('.menu-collapse.active')) {
                    document.querySelector('.menu-collapse.active').classList.remove('active');
                }
                item.classList.add('active');
                document.querySelector('.menu-heading').innerText = item.querySelector('a').innerText;
                document.querySelector('.menu-back').style.display = "block";
            }
        });
    }, true)

    document.querySelectorAll('.menu-collapse-2').forEach( item => {
        item.addEventListener('click', function () {
            if (document.querySelector('.menu-collapse-2.active')) {
                document.querySelector('.menu-collapse-2.active').classList.remove('active');
            }
            item.classList.add('active');
        });
        item.addEventListener('mouseover', function () {
            if (window.innerWidth > 768) {
                if (document.querySelector('.menu-collapse-2.active')) {
                    document.querySelector('.menu-collapse-2.active').classList.remove('active');
                }
                item.classList.add('active');
            }
        });
    }, true)

    document.querySelectorAll('.menu-collapse-3').forEach( item => {
        item.addEventListener('click', function () {
            if (window.innerWidth < 768) {

                if (document.querySelector('.menu-collapse-3.active')) {
                    document.querySelector('.menu-collapse-3.active').classList.remove('active');
                }
                item.classList.add('active');
            }
        });
    }, true)

    document.querySelector('.menu-back').addEventListener('click', function () {
        if (document.querySelector('.menu-collapse-2.active')) {
            document.querySelector('.menu-collapse-2.active').classList.remove('active');
        } else if (document.querySelector('.menu-collapse.active')) {
            document.querySelector('.menu-collapse.active').classList.remove('active');
            document.querySelector('.menu-back').style.display = "none";
        } 
       
    })

    if (document.querySelector('.review-slider')) {
        var reviewSlider = new Flickity( '.review-slider', {
            wrapAround: true,
            pageDots: false,
            watchCSS: true
        });
    }

    if (document.querySelector('.search')) {
        document.querySelector('.search input').addEventListener('input', function () {
            document.querySelector('.search-result').classList.add('active');
        })

        document.body.addEventListener('click', function (e) {
            if (document.querySelector('.search-result.active')) {
                document.querySelector('.search-result').classList.remove('active');
            }
        }, true);
    }

    //sticky company info
    if (document.querySelector('.company-sticky')) {
        document.addEventListener('scroll', function () {
            var infoBlock = document.querySelector('.company-info');
            var sticky = infoBlock.offsetTop + infoBlock.offsetHeight - 73;
            if (window.pageYOffset > sticky) {
                document.querySelector('.company-sticky').classList.add("sticky");
              } else {
                document.querySelector('.company-sticky').classList.remove("sticky");
              }
        });
       
    } 
    

});

function resetMobMenu () {
    if (document.querySelector('.menu-collapse.active')) {
        document.querySelector('.menu-collapse.active').classList.remove('active');
    }
    if (document.querySelector('.menu-collapse-2.active')) {
        document.querySelector('.menu-collapse-2.active').classList.remove('active');
    }
    if (document.querySelector('.menu-collapse-3.active')) {
        document.querySelector('.menu-collapse-3.active').classList.remove('active');
    }
    document.querySelector('.menu-heading').innerText = "Menu";
    document.querySelector('.menu-back').style.display = "none";
}