let o = (localStorage.session ? parseInt(localStorage.session, 36) + 1 : 0).toString(36);
localStorage.session = o;
setInterval((() => {
    if (localStorage.session !== o) {
        window.location.href = "esr"
    }
}), 1e3);