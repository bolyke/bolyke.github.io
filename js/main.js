document.addEventListener('DOMContentLoaded', function () {

  // Copy link
  const buttonCopy = document.querySelector('.btn-copy');

  buttonCopy.addEventListener('click', () => {
    // let text = buttonCopy.closest('.copy-group').querySelector('.field-copy').value;
    let text = "efwefwef";
    console.log(text);
    copyText(text);    
  });

  var snowflakes = new Snowflakes({
    color: '#f00',
    container: document.querySelector('.main-animation'),
    count: 30,
    minOpacity: 0.13,
    maxOpacity: 0.9,
    minSize: 35,
    maxSize: 65,
    rotation: true,
    speed: 1.5,
    wind: true,
    zIndex: 100,
  });

})

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}