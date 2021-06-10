function xhr(details) {
    var XHR = window.XMLHttpRequest;
    var req = new XHR(),
        timerTimeout = undefined,
        timedOut = false;

    details.method = details.method || 'GET';
    details.timeout = details.timeout || 10000;
    if(!details.url) {
        throw new 'missing url';
    }

    if(details.url.substring(0, 2) == '//') {
        details.url = window.location.protocol + details.url;
    }

    function callback(response, err) {
        if(typeof details.callback === 'function') {
            details.callback(response, err);
        }
    }

    if(details.useCookies) {
        req.withCredentials = true;
    }

    req.onreadystatechange = function() {
        if (timedOut) {
            callback(null, -1);
            return;
        }
        if (req.readyState === 4) {
            if ((req.status === 200 || req.status === 201) && req.responseText) {
                if (timerTimeout) {
                    clearTimeout(timerTimeout);
                }

                callback(req.responseText);
            }
            else {
                callback(null, req.status);
            }
        }
    };

    req.open(details.method, details.url);

    // set custom headers
    if(details.headers) {
        for(var name in details.headers) {
            req.setRequestHeader(name, details.headers[name]);
        }
    }

    timerTimeout = setTimeout(function() {
        timedOut = true;
        req.abort();
    }, details.timeout);

    var postData = null;
    if(details.data) {
        postData = JSON.stringify(details.data);
    }
    req.send(postData);
}

function openPopup(url) {
    const container = document.getElementById('popup-container');
    container.style.display = 'block';

    const content = document.getElementById('popup-content');
    content.innerHTML = `<iframe src="${url}"></iframe>`;
}

function closePopup() {
    const container = document.getElementById('popup-container');
    container.style.display = 'none';

    const content = document.getElementById('popup-content');
    content.innerHTML = '';
}

function init() {
    const elems = document.querySelectorAll('a.open-popup');
    elems.forEach(elem => {
        elem.addEventListener('click', event => {
            event.preventDefault();
            const url = elem.getAttribute('data-url');
            openPopup(url);
        }, false);
    });

    const popupClose = document.getElementById('popup-close');
    if(popupClose) {
        popupClose.addEventListener('click', () => {
            closePopup();
        }, false);
    }
}

init();