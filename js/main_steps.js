var statisticCookies = localStorage.getItem('statisticCookies') || true;
var marketingCookies = localStorage.getItem('marketingCookies') || true;

document.addEventListener('DOMContentLoaded', function () {

    updateCookies();

    if (document.querySelector('.accordion')) {
        // Set accordion selection 
        filterSelection('all');
        // Add active class to the current control button (highlight it)
        var btnContainer = document.querySelector('.accordion-categories');
        var btns = btnContainer.querySelectorAll('.accordion-category');
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = document.querySelector('.accordion-category.active');
                current.className = current.className.replace(' active', '');
                this.className += ' active';
            });
        }

        
        // (Optional) Active an item if it has the class "is-active"  
        document.querySelector('.accordion-content .accordion-item.active');

        document.querySelectorAll('.accordion-content .accordion-item > span').forEach((item) => {
            item.addEventListener('click', function () {
                //event.preventDefault();
                // Cancel the siblings
                if (item.parentNode.classList.contains('active')) {
                    item.parentNode.classList.remove('active')
                } else {
                    if (document.querySelector('.accordion-content .accordion-item.active')) {
                    document.querySelector('.accordion-content .accordion-item.active').classList.remove('active');
                    }
                    // Toggle the item
                    item.parentNode.classList.add('active');
                }
            });
        })

        document.querySelector('.accordion-search-clear').addEventListener('click', () => {
            document.querySelector('.accordion-search-field').value = '';
            searchFunction();
        })
    }

    // Google Events
    if (statisticCookies) {

        document.querySelectorAll('.sign-out').forEach(item => {
            item.addEventListener('click', () => {
                dataLayer.push({ 'event': 'userSignout' });
            })
        })
        document.querySelectorAll('.header .btn-mission').forEach(item => {
            item.addEventListener('click', () => {
                dataLayer.push({ 'event': 'HeaderStartMission' });
            })
        })
        if (document.querySelector('body').classList.contains('guide-page')) {
            dataLayer.push({ 'event': 'guideVisit' });

            document.querySelector('.skills-btn').addEventListener('click', () => {
                dataLayer.push({ 'event': 'guideStartMission' });
            })
            document.querySelector('.newsletter a').addEventListener('click', () => {
                dataLayer.push({ 'event': 'guideAskDiscord' });
            })
            window.addEventListener('scroll', guideScrollBottom, false);

            function guideScrollBottom() {
                if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 1000)) {
                    dataLayer.push({ 'event': 'guideRead' });
                    window.removeEventListener('scroll', guideScrollBottom, false);
                }
            }
        }

        if (document.querySelector('body').classList.contains('welcome-page')) {
            document.querySelector('.welcome-item__btn.btn-mission').addEventListener('click', () => {
                dataLayer.push({ 'event': 'mainBetaMission' });
            })
        }

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

function updateCookies() {
    if (!localStorage.getItem('statisticCookies') || !localStorage.getItem('marketingCookies')) {
        let elem = document.createElement('div');
        elem.classList.add('cookies-container');
        elem.innerHTML = `<div class="cookies-container">
                <div class="cookies-inner">
                    <div class="cookies-text">
                        We want to make your experience better. You can allow the use of all or only certain cookies, or opt out
                        of all. Read more about cookies and your privacy: <a href="">Privacy Notice</a>.
                    </div>
                    <div class="cookies-buttons">
                        <button class="btn-default btn-accept-cookies" type="button">ACCEPT ALL COOKIES</button>
                        <a href="#cookiesModal" class="btn-default jsModalTrigger">Customise cookies</a>
                        <button class="btn-default btn-reject-cookies" type="button">Reject all cookies</button>
                    </div>
                </div>
            </div>

            <div id="cookiesModal" class="modal">
                <div class="modal__overlay jsOverlay"></div>
                <div class="modal__container">
                    <div class="d-flex flex-column align-start">
                        <div class="modal-title">
                            Customise cookies
                        </div>
                        <div class="modal-content">
                            <div class="cookies-item">
                                <div class="cookies-text">
                                    We use <b>Statistics cookies</b> that help us to collect information on how you use our Website. The cookies collect information in a way that does not directly identify anyone.

                                </div>
                                <div class="cookies-check">
                                    <label class="switch" for="statistic-cookies">
                                        <input type="checkbox" id="statistic-cookies" name="statistic-cookies" />
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="cookies-item">
                                <div class="cookies-text">
                                    We use <b>Marketing cookies</b> that help display relevant ads for individual users, thereby more valuable for
                                    publishers and third-party advertisers.
                                </div>
                                <div class="cookies-check">
                                    <label class="switch" for="marketing-cookies">
                                        <input type="checkbox" id="marketing-cookies" name="marketing-cookies" />
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button class="jsModalTrigger btn-primary btn-customize-cookies">Save and close</button>
                    </div>
                </div>
            </div>`;


        document.querySelector('body').prepend(elem);

        document.querySelector('.btn-accept-cookies').addEventListener('click', () => {
            setCookies(true, true)
        });
        document.querySelector('.btn-reject-cookies').addEventListener('click', () => {
            setCookies(false, false)
        });
        document.querySelector('.btn-customize-cookies').addEventListener('click', () => {
            setCookies(document.querySelector('#statistic-cookies').checked, document.querySelector('#marketing-cookies').checked)
        });

    }
}

function setCookies(statistic, marketing) {
    localStorage.setItem('statisticCookies', statistic);
    localStorage.setItem('marketingCookies', marketing);
    location.reload()
}

// accordion 
function searchFunction() {
    var input, filter, list, s, p, i, txtValue;
    input = document.querySelector('.accordion-search-field');
    filter = input.value.toUpperCase();
    list = document.querySelector('.accordion-content');
    list.querySelectorAll('.accordion-item').forEach((item) => {
        // Loop through all list items, and hide those who don't match the search query
        p = item.getElementsByTagName("p")[0];
        s = item.getElementsByTagName("span")[0];
        txtValue = (s.textContent || s.innerText) + " " + (p.textContent || p.innerText);
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    })
    // hide category name
    list.querySelectorAll('.accordion-content-category').forEach(item => {
        let count = item.querySelectorAll('.accordion-item').length;
        item.querySelectorAll('.accordion-item').forEach((acItem) => {
            if (acItem.style.display === 'none') {
                count--;
            }
        })
        if (count == 0) {
            item.style.display = 'none';
        } else {
            item.style.display = '';
        }
    })
}

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName('accordion-content-category');
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        faqRemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) faqAddClass(x[i], "show");
    }
}

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


