function setCookie(name, value, days) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieValue = encodeURIComponent(value) + '; expires=' + expirationDate.toUTCString() + '; path=/';
  document.cookie = name + '=' + cookieValue;
}

function getCookie(name) {
  const cookieName = name + '=';
  const cookieArray = document.cookie.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return decodeURIComponent(cookie.substring(cookieName.length));
    }
  }

  return null;
}

function showCookieModal() {
  const cookieModal = document.querySelector('.cookie');
  cookieModal.style.display = 'block';
}

function hideCookieModal() {
  const cookieModal = document.querySelector('.cookie');
  cookieModal.style = '';
  setCookie('cookieClosed', 'true', 30);
}

window.addEventListener('load', function() {
  const isCookieClosed = getCookie('cookieClosed');
  if (isCookieClosed) {
    document?.querySelector('.cookie').remove()
  }
});

const closeButton = document.querySelector('.cookie__modal-close');
closeButton.addEventListener('click', hideCookieModal);