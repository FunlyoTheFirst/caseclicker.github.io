export default function(e) {
    if (e.startsWith("#")) return document.querySelector(e);
    else return document.querySelectorAll(e)
}