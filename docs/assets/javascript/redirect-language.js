// Always redirect to "ru" language until translation is finished

function redirectToLanguageIfNeeded() {
    // /er78njxf/library/intro/ -> /er78njxf/ru/library/intro/
    const parts = location.pathname.split('/');
    if(parts[2] !== 'ru') {
        parts.splice(2, 0, 'ru');
        location.href = parts.join('/');
    }
}

redirectToLanguageIfNeeded();