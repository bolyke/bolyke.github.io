document.addEventListener('DOMContentLoaded', function () {

    // scroll to top
    if (document.querySelector('.totop')) {
        document.querySelector('.totop').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        })
        window.addEventListener('scroll', () => {
            let y = window.scrollY;
            if (y >= 800) {
                document.querySelector('.totop').className = "totop show"
            } else {
                document.querySelector('.totop').className = "totop"
            }
        });
    }
   

    //scroll to anchor 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                block: 'center',
                behavior: 'smooth'
            });
        });
    });

    if (document.querySelector('.notification-toggle')) {
        document.querySelector('.notification-toggle').addEventListener('click', (toggler) => {
            let notifParent = document.querySelector('.header-notification')
            notifParent.classList.toggle('active');
            document.addEventListener('click', (e) => {
                if (!e.target.classList.contains('notification') && notifParent.classList.contains('active') && e.target != toggler.target) {
                    notifParent.classList.remove('active');
                }
            })
        })
    }

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

    //header search 
    document.querySelector('.search-open').addEventListener('click', () => {
        document.querySelector('.header-search').classList.add('active');
    })
    document.querySelector('.search-close').addEventListener('click', () => {
        document.querySelector('.header-search').classList.remove('active');
    })

    if (document.querySelector('.review-slider')) {
        var reviewSlider = new Flickity( '.review-slider', {
            wrapAround: true,
            pageDots: false,
            watchCSS: true
        });
    }

    if (document.querySelector('.search')) {
        document.querySelectorAll('.search input').forEach((item) => {
            item.addEventListener('input', () => {
                item.parentNode.parentNode.querySelector('.search-result').classList.add('active');
            })
        })

        document.body.addEventListener('click', function (e) {
            if (document.querySelector('.search-result.active')) {
                document.querySelector('.search-result.active').classList.remove('active');
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
    
    //subscribe home 
    if (document.querySelector('.form-step-btn')) {
        document.querySelector('.form-step-btn').addEventListener('click', () => {
            document.querySelector('[data-form-step="1"]').classList.add('hide');
            document.querySelector('[data-form-step="2"]').classList.add('d-flex');
        })
    }

    //file field
    let fileInput  = document.querySelector(".file-field input"),  
        button = document.querySelector(".file-field label"),
        the_return = document.querySelector(".file-return");
        
    button.addEventListener("keydown", function( event ) {  
        if ( event.keyCode == 13 || event.keyCode == 32 ) {  
            fileInput.focus();  
        }  
    });
    button.addEventListener("click", function( event ) {
        fileInput.focus();
        return false;
    });  
    fileInput.addEventListener("change", function( event ) {  
        the_return.innerHTML = '<span class="file"><span class="file-name"><span class="ellipsis">' + this.value + '</span>.' + this.value.split('.').pop() + '</span><span class="file-remove"></span></span>';  
    });  

});

(function() {
    /* Opening modal window function */
    function openModal() {
        /* Get trigger element */
        var modalTrigger = document.getElementsByClassName('jsModalTrigger');
  
        /* Set onclick event handler for all trigger elements */
        for(var i = 0; i < modalTrigger.length; i++) {
            modalTrigger[i].onclick = function() {
              var target = this.getAttribute('href').substr(1);
              var modalWindow = document.getElementById(target);
  
              modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open'; 
            }
        }   
    }
  
    function closeModal(){
      /* Get close button */
      var closeButton = document.getElementsByClassName('jsModalClose');
      var closeOverlay = document.getElementsByClassName('jsOverlay');
  
      /* Set onclick event handler for close buttons */
        for(var i = 0; i < closeButton.length; i++) {
          closeButton[i].onclick = function() {
            var modalWindow = this.parentNode.parentNode;
  
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
          }
        }   
  
      /* Set onclick event handler for modal overlay */
        for(var i = 0; i < closeOverlay.length; i++) {
          closeOverlay[i].onclick = function() {
            var modalWindow = this.parentNode;
  
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
          }
        }  
  
    }
  
    /* Handling domready event IE9+ */
    function ready(fn) {
      if (document.readyState != 'loading'){
        fn();
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    }
  
    /* Triggering modal window function after dom ready */
    ready(openModal);
    ready(closeModal);
}());

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