function getBodyElement() {
    const result = document.getElementsByTagName('body');
    return result.length > 0 ? result[0] : null;
}

const scrollState = {
    top: 0,
    left: 0,
};

function disableBodyScrolling() {
    const body = getBodyElement();
    if(body) {
        // Save scroll position.
        //
        // Changing body overflow to "hidden" will cause scrolling to the top,
        // thus we need to save current scroll position to restore it later.
        scrollState.top = window.pageYOffset || document.documentElement.scrollTop;
        scrollState.left = window.pageXOffset || document.documentElement.scrollLeft,

        body.style.height = '100%';
        body.style.overflow = 'hidden';
    }
}

function enableBodyScrolling() {
    const body = getBodyElement();
    if(body) {
        body.style.height = 'auto';
        body.style.overflow = 'auto';

        // restore scroll position
        window.scrollTo(scrollState.left, scrollState.top);
    }
}

function openPopup(url, skipNewState) {
    disableBodyScrolling();

    const container = document.getElementById('popup-container');
    container.style.display = 'block';

    const content = document.getElementById('popup-content');
    content.innerHTML = `<iframe src="${url}"></iframe>`;

    if(!skipNewState) {
        const state = {
            'type': 'popup',
            'url': url,
        };
        window.history.pushState(state, '', window.location.pathname + '#popup=' + url);
    }
}

function closePopupNoState() {
    const container = document.getElementById('popup-container');
    if(container && container.style.display != 'none') {
        enableBodyScrolling();

        container.style.display = 'none';

        const content = document.getElementById('popup-content');
        content.innerHTML = '';
    }
}

function closePopup() {
    if(history.state && history.state.type === 'popup') {
        history.back();
    }
    else {
        closePopupNoState();
    }
}

function receiveMessage(event) {
    if(event.data === 'close-popup') {
        closePopup();
    }
}

function initPopupInnerCloseButtons() {
    const elems = document.querySelectorAll('a.close-popup-inner');
    elems.forEach(elem => {
        elem.addEventListener('click', event => {
            event.preventDefault();
            top.postMessage('close-popup', '*');
        }, false);
    });
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

    window.onpopstate = function(event) {
        console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
        if(!event.state) {
            closePopup();
        }
        else if(event.state.type === 'popup' && event.state.url) {
            openPopup(event.state.url, true);
        }
    };

    window.addEventListener('message', receiveMessage, false);

    initPopupInnerCloseButtons();
}

init();