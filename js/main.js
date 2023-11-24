document.addEventListener('DOMContentLoaded', function () {

    //scroll to anchor 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            });
            if (document.querySelector('body.unscroll') || document.querySelector('.header.nav-active')) {
                document.querySelector('.header').classList.toggle('nav-active');
                document.querySelector('body').classList.toggle('unscroll');
            }
        });
    });

    // menu toggle 
    document.querySelector('.nav-toggle').addEventListener('click', function () {
        document.querySelector('.header').classList.toggle('nav-active');
        document.querySelector('body').classList.toggle('unscroll');
    })

    // Accordion
    if (document.querySelector('.accordion')) {
        // (Optional) Active an item if it has the class "is-active"  
        // document.querySelector('.accordion-content .accordion-item.active');
    
        document.querySelectorAll('.accordion-content .accordion-item > .accordion-heading').forEach((item) => {
          item.addEventListener('click', function () {
            //event.preventDefault();
            let accordion = item.closest('.accordion');
            let content = item.parentNode.querySelector('.accordion-text');
            // Cancel the siblings
            if (item.parentNode.classList.contains('active')) {
              item.parentNode.classList.remove('active')
              content.style.maxHeight = 0;
            } else {
              if (!accordion.classList.contains('accordion-multiple') && document.querySelector('.accordion-content .accordion-item.active')) {
                document.querySelector('.accordion-content .accordion-item.active .accordion-text').style.maxHeight = 0;
                document.querySelector('.accordion-content .accordion-item.active').classList.remove('active');
              }
              // Toggle the item
              item.parentNode.classList.add('active');
              content.style.maxHeight = content.scrollHeight + "px";
            }
          });
        })
    } 

    // Game Show more button
    if (document.querySelector('.released-more')) {
        document.querySelector('.released-more').addEventListener('click', () => {
            document.querySelector('.released-content').classList.toggle('released-show-all');
        })
    }

});

(function () {
    /* Opening modal window function */
    function openModal() {
        /* Get trigger element */
        var modalTrigger = document.getElementsByClassName('jsModalTrigger');

        /* Set onclick event handler for all trigger elements */
        for (var i = 0; i < modalTrigger.length; i++) {
            modalTrigger[i].onclick = function () {
                var target = this.getAttribute('href').substr(1);
                var modalWindow = document.getElementById(target);

                modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open';
            }
        }
    }

    function closeModal() {
        /* Get close button */
        var closeButton = document.getElementsByClassName('jsModalClose');
        var closeOverlay = document.getElementsByClassName('jsOverlay');

        /* Set onclick event handler for close buttons */
        for (var i = 0; i < closeButton.length; i++) {
            closeButton[i].onclick = function () {
                var modalWindow = this.closest('.modal');

                modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');

                if (modalWindow.classList.contains('uverified-message')) {
                    window.history.pushState({}, document.title, "/" + removeParam('show_message', window.location.href));
                }

            }
        }

        /* Set onclick event handler for modal overlay */
        for (var i = 0; i < closeOverlay.length; i++) {
            closeOverlay[i].onclick = function () {
                var modalWindow = this.parentNode;

                modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');

                if (modalWindow.classList.contains('uverified-message')) {
                    window.history.pushState({}, document.title, "/" + removeParam('show_message', window.location.href));
                }
            }
        }

        function removeParam(key, sourceURL) {
            // var rtn = sourceURL.split("?")[0],
            let rtn = '',
                param,
                params_arr = [],
                queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
            if (queryString !== "") {
                params_arr = queryString.split("&");
                for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                    param = params_arr[i].split("=")[0];
                    if (param === key) {
                        params_arr.splice(i, 1);
                    }
                }
                if (params_arr.length) rtn = "?" + params_arr.join("&");
            }
            return rtn;
        }

    }

    /* Handling domready event IE9+ */
    function ready(fn) {
        if (document.readyState != 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    /* Triggering modal window function after dom ready */
    ready(openModal);
    ready(closeModal);
}());

// Show filtered elements
function faqAddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function faqRemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}


