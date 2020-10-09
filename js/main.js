document.addEventListener('DOMContentLoaded', function () {

  var v = document.querySelector('.toggle-menu-mob');

  document.getElementById('burger').addEventListener('click', function () {
    console.log('sfafd');
    this.parentElement.classList.toggle('active');
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
    });
  });

  document.querySelectorAll('.review-expand-btn').forEach(function (elem) {
    elem.addEventListener('click', function () {
      this.parentElement.parentElement.classList.toggle('expand');
    });
  });

  document.querySelectorAll('.btn-modal-policy').forEach( function (elem) {
    elem.addEventListener('click', function() {
      document.getElementById('overlay').classList.add('is-visible');
      document.querySelector('.modal-policy').classList.add('is-visible');
      document.querySelector('body').classList.add('unscroll');
    });
  })

  document.querySelectorAll('.btn-modal-consent').forEach( function (elem) {
    elem.addEventListener('click', function() {
      document.getElementById('overlay').classList.add('is-visible');
      document.querySelector('.modal-consent').classList.add('is-visible');
      document.querySelector('body').classList.add('unscroll');
    });
  })
  
  document.querySelectorAll('.modal-close-btn, .overlay').forEach( function (elem) {
    elem.addEventListener('click', function() {
      document.getElementById('overlay').classList.remove('is-visible');
      document.querySelector('.modal.is-visible').classList.remove('is-visible');
      document.querySelector('body').classList.remove('unscroll');
    });
  });

  var casesSlider = tns({
    "container": '.customers-content',
    "items": 7,
    "rewind": true,
    "mouseDrag": true,
    "swipeAngle": false,
    "autoplay": true,
    "autoplayTimeout": 2000,
    "loop": true,
    "speed": 600,
    "responsive": {
      "1200": {
        "items": 7
      },
      "768": {
        "items": 5
      },
      "240": {
        "items": 3
      },
    },
  });

  var reviewSlider = tns({
    "container": '.review-slider',
    "controlsContainer": "#customize-controls",
    "items": 2,
    "slideBy": "page",
    "rewind": true,
    "mouseDrag": true,
    "swipeAngle": false,
    "gutter": 20,
    "speed": 600,
    "responsive": {
      "1200": {
        "items": 2
      },
      "860": {
        "items": 2,
      },
      "240": {
        "items": 1,
        "slideBy": 1
      }
    },
  });

  reviewSlider.events.on('transitionStart', function () {
    if (document.querySelector('.review-card-wrapper.expand')) {
      document.querySelector('.review-card-wrapper.expand').classList.remove('expand');
    }
  });


  /* mail */
  document.querySelectorAll('.btn-send').forEach(function (elem) {
    elem.addEventListener('click', function () {
      resetErrorState(); 
      var form = elem.parentElement;
      var format = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
        var name = form.querySelector('input[name=name]');
      var phone = form.querySelector('input[name=phone]');

      if (name.value != "" && phone.value != "" && phone.value.match(format)) {

        checkIfErrorMessage(name);
        checkIfErrorMessage(phone);

        var message =
          '<b>Тема: </b>Форма обратной связи Мультипринт<br>' +
          '<b>Имя: </b>' + name.value + '<br>' +
          '<b>Телефон: </b>' + phone.value + '<br>';
        sendMessage(message, 'Форма обратной связи Мультипринт');
        window.location.replace("http://bolyke.github.io/thanks.html");
        //window.open('http://stackoverflow.com', '_blank');

      } else {
        if (!phone.value.match(format)) {
          phone.classList.add('error');
          phone.parentElement.querySelector('.error-text').textContent = "Неправильный формат";
        }
        setErrorMessage(name);
        setErrorMessage(phone);
      }
    }); 
  });

  function resetErrorState() {
    var ea = document.querySelectorAll('.error');
    var eta = document.querySelectorAll('.error-text')
    ea.forEach(function (elem) {
      elem.classList.remove('error');
    });
    eta.forEach(function (elem) {
      elem.textContent = "";
    });
  }

  function sendMessage(message, subject) {

    var xhrForAdmin = new XMLHttpRequest();
    xhrForAdmin.open('POST', 'http://bolyke.github.io/send.php', true);
    xhrForAdmin.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhrForAdmin.send('&message=' + message + '&subject=' + subject);

  }

  function checkIfErrorMessage(elem) {
    if (elem.classList.contains('error')) {
      elem.classList.remove('error');
      elem.parentElement.querySelector('.error-text').textContent = "";
    }
  }

  function setErrorMessage(elem) {
    if (elem.value == "") {
      elem.classList.add('error');
      elem.parentElement.querySelector('.error-text').textContent = "Поле не может быть пустым";
    }
  }

});