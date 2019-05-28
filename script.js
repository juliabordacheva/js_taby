'use strict'

let links = document.getElementsByTagName('a');
let preloader = document.getElementById('preloader');
let content = document.getElementById('content');

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', preventDefault);
}

function tabLoader(event) {
  let url;
  if (event.type !== 'load') {
    event.preventDefault();
    if (event.target.classList.contains('active')) {
      return;
    }
    content.innerHTML = '';
    url = event.target.href;
    for (let link of links) {
      link.classList.remove('active');
    }
    event.target.classList.add('active');
  } else {
    url = links[0].href;
  }

  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load', onLoad);
  xhr.addEventListener('loadstart', onLoadStart);
  xhr.addEventListener('loadend', onLoadEnd);
  xhr.open('GET', url);
  xhr.send();

  function onLoad() {
    if (xhr.status !== 200) {
      console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
    } else {
      content.innerHTML = xhr.responseText;
    }
  }

  function onLoadStart() {
    preloader.classList.remove('hidden');
  }

  function onLoadEnd() {
    preloader.classList.add('hidden');
  }
}

window.addEventListener('load', tabLoader);

for (let link of links) {
  link.addEventListener('click', tabLoader);
}
