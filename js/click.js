import {user as e} from "/script.js?v=2.17";
import {createNotification as t} from "/js/notifications.js?v=2.17";
import {addStat as o} from "/js/achievements.js?v=2.17";
import s from "/js/select.js?v=2.17";
import {game as a} from "/js/game.js?v=2.17";
const n = s("#pages").q(".page.center-v[page=click]");
n.q(".clickbtn", "€");
n.q(".click-how2-text", "Press anywhere to earn money!");
const i = n.q(".click-how2-text").q("span", "0 €/s");
n.q(".click-how2-text", "TIP! Increase your average €/c by buying min and max clicker upgrades!");
const l = new Array(20).fill(1e3);
let r = 0;
let c;
function p(s) {
    if (s) {
        let a = (new Date).getTime();
        if (a - r > 1e3)
            r = a - 1e3;
        l.pop();
        l.unshift(a - r);
        r = a;
        let n = e.upgrades.maxClick || 4;
        let p = e.upgrades.minClick || 2;
        let f = 1;
        let d = l.reduce(((e,t)=>t + e)) / l.length;
        i.innerHTML = `${(1e3 / d * (((n - p) / 2 + p) / 100)).toFixed(2)} €/s`;
        if (d < 100)
            f = Math.max(0, (d - 50) / 50);
        if (d < 50 && !c) {
            c = true;
            t({
                message: "You are clicking to fast!"
            })
        }
        let g = Math.round((Math.random() * (n - p) + p) * f);
        let y = Math.round(Math.random() * 5 * f);
        o("earned_cash", g);
        o("earnings_from_clicks", g);
        o("earned_xp", y);
        o("xp_from_clicks", y);
        m(s.pageX || s.changedTouches?.[0]?.pageX, s.pageY || s.changedTouches?.[0]?.pageY, "%b€", "money", g);
        m(s.pageX || s.changedTouches?.[0]?.pageX, s.pageY || s.changedTouches?.[0]?.pageY, "%a xp", "xp", y);
        o("clicks")
    }
}
function m(t, n, i, l, r) {
    let c = document.body.q(".floating-text", `+ ${i.replace(/%a/g, r.toFixed(0)).replace(/%b/g, (r / 100).toFixed(2))}`);
    t = t - c.offsetWidth / 2;
    n = n - c.offsetHeight;
    c.style.left = t + "px";
    c.style.top = n + "px";
    setTimeout((()=>{
        c.style.left = t + Math.random() * 60 - 30 + "px";
        c.style.top = n - Math.random() * 100 - 40 + "px"
    }
    ), 50);
    setTimeout((()=>c.style.opacity = "0"), 400);
    setTimeout((()=>document.body.removeChild(c)), 500);
    setTimeout((()=>{
        if (l === "money") {
            s("#money").style.transition = 0 + "s";
            s("#money").style.fontSize = 48 + "px"
        } else if (l === "xp") {
            s("#level-bar-p").style.transition = 0 + "s";
            s("#level-bar-p").style.boxShadow = "0 3px #ffff inset"
        }
        setTimeout((()=>{
            if (l === "money") {
                e.money += r;
                s("#money").style.transition = .4 + "s";
                s("#money").style.fontSize = 24 + "px"
            } else if (l === "xp") {
                e.xp += r;
                o("earned_xp", r);
                s("#level-bar-p").style.transition = .4 + "s";
                s("#level-bar-p").style.boxShadow = "0 3px #fff0 inset"
            }
            a.emit("update")
        }
        ), 20)
    }
    ), 500)
}
let f = false;
n.addEventListener("touchstart", (e=>{
    f = true;
    p(e)
}
));
n.addEventListener("mousedown", (e=>{
    if (!f)
        p(e);
    f = false
}
));
