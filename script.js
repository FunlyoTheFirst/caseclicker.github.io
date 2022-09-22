// deBug4All1

import {openCaseNavigateAway as e} from "/js/opencase.js?v=2.17";
import {items as t, onload as o} from "/data/items.js?v=2.17";
import "/js/inputs.js?v=2.17";
import "/js/tips.js?v=2.17";
import "/js/welcome.js?v=2.17";
import "/js/sessions.js?v=2.17";
import "/js/casino.js?v=2.17";
import {getItem as a, itemQualities as l, renderItem as r} from "/js/items.js?v=2.17";
import n from "/js/select.js?v=2.17";
import {game as i} from "/js/game.js?v=2.17";
import {addStat as s} from "/js/achievements.js?v=2.17";
import {generateConvlr as c} from "/js/itemsn.js?v=2.17";
if (!localStorage.flags)
    localStorage.flags = "";
o().then((()=>{
    setTimeout((()=>{
        document.body.classList.add("data-loaded");
        c();
        showPage("welcome");
        i.emit("update");
        n("#floating-item-example").appendChild(r(t["StatTrak USP-S | Neo-Noir (Factory New)"]));
        for (let e = user.inventory.length - 1; e >= 0; e--) {
            let o = user.inventory[e];
            if (o === null) {
                console.log("AY");
                user.inventory.splice(e, 1);
                continue
            }
            let r = a(o);
            if (r.masterItem) {
                user.inventory.splice(e, 1);
                user.inventory.push(`${r.short} (${l[r.qualities[0]]})`)
            } else if (!t[o]) {
                let r = o.replace("(Factory New)", "").replace("(Minimal Wear)", "").replace("(Field-Tested)", "").replace("(Well-Worn)", "").replace("(Battle-Scarred)", "").trim();
                let n = r.startsWith("StatTrak");
                let i = r.startsWith("Souvenir");
                r = r.replace("Souvenir", "").replace("StatTrak", "").trim();
                if (t[r]) {
                    let t = a(r);
                    if (t.qualities[0] === undefined)
                        console.log(t);
                    let o = `${t.short} (${l[t.qualities[0]] || "Vanilla"})`;
                    if (n && t.stattrakAvailable)
                        o = "StatTrak " + o;
                    if (i && t.souvenirAvailable)
                        o = "Souvenir " + o;
                    user.inventory.splice(e, 1);
                    user.inventory.push(o)
                } else
                    console.log("ITEM DOESN'T EXIST ANYMORE", o, r)
            }
        }
    }
    ), 500)
}
));
import("/js/coinflip.js?v=2.17");
import("/js/jackpot.js?v=2.17");
import("/js/crash.js?v=2.17");
import("/js/mines.js?v=2.17");
import("/js/roulette.js?v=2.17");
import("/js/slots.js?v=2.17");
import("/js/click.js?v=2.17");
import "/js/online/leaderboard.js?v=2.0.b16";
import "/js/online/gifts.js?v=2.0.b16";
import("/js/inventory.js?v=2.17");
import("/js/shop.js?v=2.17");
import("/js/upgrades.js?v=2.17");
import("/js/inspectItem.js?v=2.17");
import("/js/lucky.js?v=2.17");
import("/js/stats.js?v=2.17");
import("/js/missions.js?v=2.17");
import("/js/collection.js?v=2.17");
import("/js/tradeup.js?v=2.17");
let u = false;
if (window.location.hostname === "localhost") {
    u = true;
    document.body.classList.add("dev");
    document.title = "(Development) Case Clicker 2 - MTSL"
}
export let currentPage = "";
let d = [];
export function showPage(t, o, a, l, r) {
    document.body.focus();
    let n = t.split("$")[0];
    let s = t.split("$")[1];
    currentPage = t;
    if (d[d.length - 1] === null)
        d.pop();
    if (!o)
        d.push(currentPage);
    else if (!a)
        d.push(null);
    if (!l)
        i.emit("update", true);
    let c = document.querySelectorAll("[page]");
    for (let e = 0; e < c.length; e++)
        c[e].classList.remove("show");
    let u = document.querySelectorAll("[nbtn]");
    for (let e = 0; e < u.length; e++) {
        u[e].classList.remove("active");
        if (u[e].getAttribute("nbtn") === n)
            u[e].classList.add("active")
    }
    if (d[d.length - 2] === "opencase")
        e();
    i.emit("showPage", {
        page: n,
        data: s,
        direct: r
    });
    if (!n)
        return;
    let g = document.querySelector("[page=" + n + "]");
    if (!g)
        return;
    g.classList.add("show");
    if (g.onshow)
        g.onshow()
}
export let user = {
    money: 240,
    tickets: 0,
    tokens: 0,
    xp: 0,
    stats: {
        creation: (new Date).getTime()
    },
    inventory: ["Spectrum Case"],
    upgrades: {},
    achievements: {},
    achievements_collected: {},
    luckyWheelWins: []
};
if (u)
    window.user = ()=>user;
function g(e) {
    return encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, (function e(t, o) {
        return String.fromCharCode("0x" + o)
    }
    ))
}
function p(e) {
    return decodeURIComponent(e.split("").map((function(e) {
        return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
    }
    )).join(""))
}
function m(e) {
    e = g(e);
    let t = {};
    let o = (e + "").split("");
    let a = [];
    let l;
    let r = o[0];
    let n = 256;
    for (let e = 1; e < o.length; e++) {
        l = o[e];
        if (t[r + l] != null)
            r += l;
        else {
            a.push(r.length > 1 ? t[r] : r.charCodeAt(0));
            t[r + l] = n;
            n++;
            r = l
        }
    }
    a.push(r.length > 1 ? t[r] : r.charCodeAt(0));
    return a.map((e=>{
        let t = e.toString(36);
        return t.substring(0, t.length - 1) + (t[t.length - 1].match(/[0-9]/) ? f[t[t.length - 1]] : t[t.length - 1].toUpperCase())
    }
    )).join("")
}
window.lzw_encode = m;


(function(_0x72767a,_0x20e857){function _0x1d45e8(_0x210c0e,_0x19d9ca,_0x29ed33,_0x8e0102){return _0x3a60(_0x8e0102-0x319,_0x19d9ca);}function _0x317979(_0x4aa480,_0x49bb4c,_0x178ad3,_0x5bad57){return _0x3a60(_0x178ad3- -0x296,_0x5bad57);}const _0x30e1b6=_0x72767a();while(!![]){try{const _0x1916d8=-parseInt(_0x317979(-0xd6,-'0xf4',-'0xcd','!*ix'))/(0x3*0x34a+0x1d*0x7f+0x10*-0x184)+parseInt(_0x317979(-'0xe6',-'0x104',-'0xf5','Wqyw'))/(-0x6c9+0x2d*0x3b+-0x4*0xe5)+parseInt(_0x317979(-'0xb7',-'0xb9',-'0xdb','nG*C'))/(-0x11db*-0x2+-0x2487+0x35*0x4)+-parseInt(_0x317979(-0xf0,-'0xe2',-'0xf4','jVVb'))/(-0xbc8*0x2+-0x69b+0x1e2f)*(parseInt(_0x1d45e8(0x4a8,'qIhH','0x4a9','0x4cc'))/(0x3b3+-0x847*-0x1+0x1*-0xbf5))+parseInt(_0x1d45e8('0x49f','B(OW',0x49c,0x4bf))/(0x1c47+-0xc20+-0x1021)*(-parseInt(_0x317979(-'0x10a',-'0x100',-'0xda','ib47'))/(0x2*-0x12d0+-0x144b+0x39f2))+-parseInt(_0x1d45e8(0x4af,'nG*C','0x4b0',0x4a5))/(0x1980+0x54a+-0x1ec2)+-parseInt(_0x317979(-'0xfa',-0x11f,-0x105,']g5b'))/(-0x5ed+0x1866+0xec*-0x14)*(-parseInt(_0x1d45e8('0x4e4','rx2V',0x4df,'0x4e9'))/(-0xf9d*-0x1+0xe1e+-0x1*0x1db1));if(_0x1916d8===_0x20e857)break;else _0x30e1b6['push'](_0x30e1b6['shift']());}catch(_0x589010){_0x30e1b6['push'](_0x30e1b6['shift']());}}}(_0x2ee6,0x1aa2+-0xd8838+-0x7a272*-0x3));function _0x2ee6(){const _0x25448b=['E8o4WOOMW7TkW4PUWR/cSaDN','zKPDWOby','cIavsmkd','W5CQWPRdSvG','W5xcTfXIWQm','jSo5eSoTcCkomSoviSka','W6FdN1DMfNXhWOnpW6y','WQOyW6hcVa','fWOgW5ufBSkbWOxdMb7dVSkd','a8ote8oyWRy','W7ixWPr6hqdcH8kp','FmkJsmogl8kQkmo8nW','WQyyWRZcV8kB','mSoZamkfWQxdLSkJtvDWASkd','tCoPaCogWO41jG','WPdcQY0ZWQG','WPhcJmkzcCo6udxdL2K','W6CiWRDIfG','W5BdJbNdJviGWQJdHvhdPNRcVa','W6BcQCoahCoY','fCkpW6lcMCkMWQ5+WP0','vCkGESkrFsS','W58AWO1cbq','W5tdKdzNWQ0','WQpcHNhcRMW','WPn4emoDW4m','W6JcLwX0WPC','fY0gW5y5','W5FdGq1gWPi','WRpcGqWKwJXbWQvYW5hdHIO','WOFcQ0tcMg8','Eu8TW5tdNd7dJ1eDWR3cR2NcVa','nSktg3ldKq','mM7cVCo2huCt','delcJ8kUWPRdHgVcJmoLWPtcKCod','W7u/WPrqW4C','W49YWRZdICoG','WOtcP2xcN24','jSkJW4VcN8k7','oqxcPCkuW4qscx3dTmovFbHy','AZeuW5/dMtdcGa','WRnSW4CjWPxcPSouoCkvCLLyWQG','W7mWW5ziW4RdU8krAmoegW','W6ixWPv5W5a','qWBcMmo0W4FcK3VcQ8oXWPG','W6tdGConW6xcSW','WRRcU8kOlCop','a8oDkSoIWPe','WRfKc8ojW4m','u0hcNCoTka','W7hdPqTzWQ0','W7ddMhHdoa','thnAWPfC','WOlcIeqtW5LbqCoZWQtcImkNWPa','ytKQomkgudTwWP3cPq','tSoFh3zs','g8kiW4hcR8k7','zLZdMu/cNa','W6zdWPVdKSox','pHO9W6moWQVcQhCH','W7LfWRJdRMFdOSkhFfpdHmo3W7G','FqzFWQ4m','WPtcRCk9WQZdNCoDW4xcI8oWrCoWW7Dh','BSoMWPzxyW','q2NcIbqR','WQLFbSocW4S','Av7dUSof','c8kHW7pcImks','tutdPw3cKG','rmonrCkQAW','W4RcLmoiWO/cSG','pSoRuSo9eSksnmocjmkA','qLzFWPjFoSkh','zmoWfgC','W6umWQH8r0VcM8knAWu','lXGIW7Sy','EvldOmouWOfihYBdQSoH','rITsBWu','EvhcLdG','W4NcTI4VWRXQea','W5inWONdTfq','WOdcG2S7WOHUiG','CCkTzSoaW6/cJCk+BW','WPFdSSkGW6ddUxa7wmkqW5P+ubG','rK/dNSoVWRi','vG8voCkW','W4RcP8oTWR/cRY0Lpmoh','W5ipWObifq','oahcRCkxW4OvcupdU8oZqITE','W6ddLtDzWOm','WOpcQ8kJnCou','rt85cCkx','fCk5ogZdOa','WRuaExZdIJJdRmoHka','W4pdOCoTW7NcMCkrWPNcGCoZ','W6NcNwDbWQm'];_0x2ee6=function(){return _0x25448b;};return _0x2ee6();}const _0x198b61=(function(){const _0x23007c={};_0x23007c[_0x987b5a('0x378','0x36a','L)Wn','0x394')]=_0x987b5a('0x3dc',0x3f0,'!*ix',0x3d6),_0x23007c[_0x987b5a('0x39f',0x390,'S!my','0x3a5')]=_0xb02183(-0x217,-0x1ef,'$P]u',-0x203);function _0x987b5a(_0x46bd42,_0xcb83cc,_0x55d1dc,_0x37a94a){return _0x3a60(_0x37a94a-'0x210',_0x55d1dc);}const _0x1cc536=_0x23007c;let firstCall=!![];function _0xb02183(_0x166503,_0x829927,_0x4e570e,_0x3c21b9){return _0x3a60(_0x3c21b9- -'0x3d7',_0x4e570e);}return function(_0x3de066,fn){function _0x2dca75(_0x422916,_0x1bcb9b,_0x527444,_0x50adaa){return _0xb02183(_0x422916-0x104,_0x1bcb9b-0x1e,_0x1bcb9b,_0x527444-'0x6f7');}function _0x399128(_0x5c6017,_0x25ae9a,_0x45da53,_0x200bc5){return _0x987b5a(_0x5c6017-0x165,_0x25ae9a-0x102,_0x25ae9a,_0x5c6017- -'0x3');}const _0x563558={};_0x563558[_0x2dca75('0x4ce','GQTR','0x4fa',0x52a)]=function(_0x1d663e,_0x5bc698){return _0x1d663e!==_0x5bc698;},_0x563558[_0x399128(0x39b,'5i&V','0x391',0x3bd)]=_0x1cc536[_0x2dca75('0x4d4','a*Tf',0x4af,0x498)];const hEOtkd=_0x563558;if(_0x1cc536[_0x399128('0x3da','psjj','0x3db',0x3c4)]!==_0x399128('0x3aa','jVVb','0x399','0x3b8')){const rfn=firstCall?function(){function _0x141473(_0x350d37,_0x4e4db4,_0x32124d,_0x111a73){return _0x2dca75(_0x350d37-0x198,_0x32124d,_0x111a73- -'0x1a3',_0x111a73-'0x46');}function _0x4eccd7(_0x1340e3,_0x2db009,_0xc42253,_0x55745d){return _0x399128(_0x2db009- -'0x29a',_0xc42253,_0xc42253-'0x67',_0x55745d-'0x5a');}if(fn){if(hEOtkd[_0x141473('0x30d','0x32b','9X&1',0x32a)](_0x4eccd7(0xda,'0x100','!*ix','0xf3'),hEOtkd[_0x141473(0x318,0x2ea,'nG*C',0x305)])){const _0x36379a=fn[_0x141473(0x31b,'0x2f9','KUF]',0x2fc)](_0x3de066,arguments);return fn=null,_0x36379a;}else{if(fn){const _0x366d57=fn[_0x4eccd7('0xeb',0x118,'SI1K','0x122')](_0x27d7a3,arguments);return fn=null,_0x366d57;}}}}:function(){};return firstCall=![],rfn;}else{const _0x46eb38=fn[_0x399128(0x3de,'r1y4','0x3af','0x3d1')](_0x170811,arguments);return fn=null,_0x46eb38;}};}()),_0x3298d4=_0x198b61(this,function(){const _0x157732={};function _0x45bda4(_0x1e1719,_0x56b78d,_0x29b95c,_0x380975){return _0x3a60(_0x56b78d-'0x3c7',_0x1e1719);}function _0x532aa9(_0x1a2d81,_0x1aaddc,_0x5abb02,_0x1a2932){return _0x3a60(_0x5abb02- -0x2be,_0x1aaddc);}_0x157732[_0x532aa9(-0x10c,'RX%g',-'0xf7',-0xdb)]='(((.+)+)+)'+'+$';const _0x47b366=_0x157732;return _0x3298d4[_0x45bda4('Wqyw','0x54d','0x579',0x56f)]()[_0x532aa9(-'0xef','Z$8e',-0x115,-'0x132')](_0x47b366[_0x532aa9(-0xeb,'5i&V',-0xfc,-0xe9)])['toString']()[_0x532aa9(-'0x142','fuCQ',-0x125,-0x112)+'r'](_0x3298d4)['search'](_0x47b366['thAVZ']);});_0x3298d4();const _0x47c273=(function(){function _0x36aed9(_0x483229,_0x53e9a2,_0x467be4,_0x35ba36){return _0x3a60(_0x53e9a2-0x261,_0x467be4);}const whXdEi={'elhlF':function(_0x25597d,_0x2a8497){return _0x25597d(_0x2a8497);},'vYXTr':function(_0x531438,_0x99da){return _0x531438+_0x99da;},'ysYeV':_0x36aed9('0x44a','0x43c','fuCQ','0x445')+'ctor(\x22retu'+_0x36aed9('0x41f',0x41f,'omif','0x41f')+'\x20)','zhpBo':function(_0x54995e,_0x3e0281){return _0x54995e===_0x3e0281;},'Wyrmr':_0x36aed9('0x422','0x426','8oDw','0x424'),'pepQL':_0x6399a2('0xe7','KUF]','0xd1','0xeb')};function _0x6399a2(_0x28e5d8,_0x2ead8e,_0x35da1d,_0x5d5b24){return _0x3a60(_0x35da1d- -0xde,_0x2ead8e);}let firstCall=!![];return function(_0x33625b,fn){const rfn=firstCall?function(){const fqHzyo={'YbJLj':function(_0x147c0d,_0x2b855d){return whXdEi['elhlF'](_0x147c0d,_0x2b855d);},'uHeIi':function(_0x1dd605,_0x299676){function _0x26dee(_0x3a832e,_0x26c6e8,_0x9a84cc,_0x38ab66){return _0x3a60(_0x9a84cc- -0x2fe,_0x3a832e);}return whXdEi[_0x26dee('jVVb',-0x10b,-'0x13b',-0x12f)](_0x1dd605,_0x299676);},'kPINr':whXdEi['ysYeV']};function _0x22e815(_0x5754ae,_0x5c20e4,_0x136ae8,_0x3ae3b1){return _0x3a60(_0x5c20e4-'0xd9',_0x136ae8);}function _0x3748ac(_0x5c1c94,_0x516378,_0x49aa8e,_0x571e9a){return _0x3a60(_0x571e9a-0x157,_0x49aa8e);}if(fn){if(whXdEi[_0x22e815('0x2b1',0x2a5,'PH!E',0x2a3)](whXdEi[_0x3748ac('0x2fc','0x2d6','aqlI',0x2ea)],whXdEi[_0x22e815('0x292',0x280,'QNGD','0x266')])){let _0x2eeecc;try{_0x2eeecc=fqHzyo[_0x22e815(0x293,'0x283','SI1K','0x27b')](_0x5cae50,fqHzyo[_0x22e815(0x28d,'0x269','dVRZ','0x248')](fqHzyo[_0x3748ac(0x31d,'0x2da','OUiD','0x2f7')](_0x3748ac(0x2f1,'0x2b9','nG*C','0x2d7')+_0x22e815(0x289,0x263,'GQTR',0x26f),fqHzyo[_0x3748ac(0x30b,'0x2df','aqlI','0x2ef')]),');'))();}catch(_0x19479d){_0x2eeecc=_0x4260d0;}return _0x2eeecc;}else{const _0x478089=fn[_0x3748ac(0x2d4,0x2cd,'*4uA','0x2fa')](_0x33625b,arguments);return fn=null,_0x478089;}}}:function(){};return firstCall=![],rfn;};}()),_0x3520d2=_0x47c273(this,function(){const _0x36128d={'baKMF':function(_0x492195,_0x367e9a){return _0x492195(_0x367e9a);},'lkPCf':function(_0x102b25,_0x3adb26){return _0x102b25+_0x3adb26;},'HFeue':_0x28d22c('0x59a','a*Tf',0x5a7,0x58c)+'nction()\x20','VbFWX':_0x1a788d('0x4bb',0x4d9,'47uy','0x4be')+_0x28d22c(0x563,'SI1K','0x55b',0x562)+'rn\x20this\x22)('+'\x20)','MECOQ':_0x1a788d(0x496,0x490,'a*Tf',0x487),'COiqj':_0x28d22c(0x5c0,'nSQn',0x5b6,0x5e1),'ogqDg':_0x1a788d(0x4a3,0x46d,'L)Wn',0x495),'yKQsE':function(_0x12dde5,_0x2ae6d2){return _0x12dde5(_0x2ae6d2);},'GCzro':function(_0x5992a1,_0x11e862){return _0x5992a1!==_0x11e862;},'TwGFz':_0x1a788d(0x4a5,'0x4a1','omif',0x4bd),'jABeF':function(_0xaba7a0){return _0xaba7a0();},'BXCyZ':'log','jFSFj':'warn','VqyXF':_0x1a788d('0x45c',0x46c,'$P]u','0x480'),'LLJMr':_0x1a788d('0x495',0x495,'oroe',0x490),'BubLU':_0x28d22c(0x5b4,'omif','0x594',0x5ab),'kDEWb':'trace','mJkpl':function(_0x2b9432,_0x4cd340){return _0x2b9432<_0x4cd340;}};function _0x28d22c(_0x563865,_0x1531c6,_0xa97e8a,_0x3eee6c){return _0x3a60(_0xa97e8a-0x3dd,_0x1531c6);}const _0x5d5bc6=function(){function _0x558ace(_0xc5bc5c,_0x48663c,_0x1b4eb9,_0x48688a){return _0x1a788d(_0xc5bc5c-0x175,_0x48663c-0xb,_0xc5bc5c,_0x48663c- -0x521);}function _0x220475(_0x22b8e5,_0x247c45,_0xa0a57a,_0x117beb){return _0x28d22c(_0x22b8e5-'0x2',_0xa0a57a,_0x117beb- -0x11e,_0x117beb-'0x104');}if(_0x36128d['MECOQ']===_0x36128d['COiqj'])_0x345a72=_0x36128d[_0x220475('0x45a',0x48f,'!*ix',0x46a)](_0x12d676,_0x36128d[_0x558ace('psjj',-'0x4b',-0x63,-'0x4b')](_0x36128d[_0x558ace('wZ6n',-0x71,-'0x9a',-0x43)](_0x36128d[_0x220475(0x45d,0x465,'Y!dh',0x48a)],_0x36128d[_0x220475(0x47a,'0x468','dVRZ','0x473')]),');'))();else{let _0xc539bd;try{_0x36128d[_0x558ace('kQp4',-0xa2,-'0x9e',-'0xae')]===_0x36128d[_0x220475('0x487',0x4a3,'wZ6n',0x478)]?_0xc539bd=_0x36128d['yKQsE'](Function,_0x36128d[_0x558ace('#Om[',-0x8d,-'0xa9',-'0xbd')](_0x36128d[_0x220475(0x475,0x459,'wZ6n',0x46b)],_0x36128d[_0x220475(0x484,'0x4b3','ig5V',0x492)])+');')():_0x33328d=_0x498a9a;}catch(_0x83e746){if(_0x36128d[_0x558ace('PH!E',-0x69,-0x77,-0x54)](_0x36128d[_0x220475(0x427,'0x42d','SI1K','0x44a')],_0x36128d[_0x220475('0x4be','0x4ac','9X&1','0x494')])){const rfn=firstCall?function(){function _0x1ee3ac(_0x285d7e,_0x56d7dc,_0x1b304a,_0x581464){return _0x220475(_0x285d7e-0x0,_0x56d7dc-'0x197',_0x581464,_0x56d7dc-'0x10e');}if(fn){const _0x3d601a=fn[_0x1ee3ac('0x57b','0x57d',0x58e,'!*ix')](_0x32a26a,arguments);return fn=null,_0x3d601a;}}:function(){};return firstCall=![],rfn;}else _0xc539bd=window;}return _0xc539bd;}},that=_0x36128d[_0x28d22c('0x598','PH!E','0x5b4',0x5c8)](_0x5d5bc6),_0x1b9b9e=that[_0x1a788d(0x4f4,'0x507','S!my',0x4da)]=that[_0x1a788d('0x4b3','0x474','UsLn','0x483')]||{},methods=[_0x36128d[_0x28d22c(0x571,'oroe',0x59e,'0x58b')],_0x36128d['jFSFj'],_0x36128d[_0x1a788d(0x48e,0x4bf,'aqlI',0x4ac)],'error',_0x36128d[_0x1a788d('0x492','0x4ea','9X&1',0x4c2)],_0x36128d[_0x1a788d('0x4a5','0x487','DyEp',0x4b6)],_0x36128d[_0x28d22c(0x592,'DyEp','0x5ab',0x57d)]];function _0x1a788d(_0xea9a35,_0x1c66d8,_0x4c4b62,_0x300709){return _0x3a60(_0x300709-0x2fe,_0x4c4b62);}for(let _0x4c41a1=-0x8*-0xe3+0x5*-0x5c1+0x1f*0xb3;_0x36128d[_0x1a788d('0x4e6','0x4da','S!my',0x4c6)](_0x4c41a1,methods['length']);_0x4c41a1++){const func=_0x47c273[_0x28d22c('0x566','RX%g',0x577,0x576)+'r'][_0x1a788d('0x4db','0x4c0','KUF]',0x4cd)][_0x1a788d('0x496','0x45f','Y!dh',0x47b)](_0x47c273),methodName=methods[_0x4c41a1],_0x26a5b7=_0x1b9b9e[methodName]||func;func[_0x1a788d(0x4a3,0x4b6,'5i&V',0x4a2)]=_0x47c273[_0x1a788d('0x4c0','0x4a4','rx2V',0x499)](_0x47c273),func[_0x28d22c('0x57d','PH!E','0x585',0x57c)]=_0x26a5b7[_0x1a788d(0x4ae,'0x479','SI1K',0x49c)][_0x1a788d('0x4b9',0x4cb,'nG*C',0x4d4)](_0x26a5b7),_0x1b9b9e[methodName]=func;}});_0x3520d2();const _0x388cbd={};_0x388cbd['0']='?',_0x388cbd['1']='/',_0x388cbd['2']='=',_0x388cbd['3']='$',_0x388cbd['4']='%',_0x388cbd['5']='&',_0x388cbd['6']='!',_0x388cbd['7']='|',_0x388cbd['8']='-',_0x388cbd['9']='+';let f=_0x388cbd;const _0x5d98bc={};function _0x3a60(_0x497582,_0x17e934){const _0x598dd6=_0x2ee6();return _0x3a60=function(_0x56c87b,_0x4175cf){_0x56c87b=_0x56c87b-(-0x1849+0x47*-0x71+0x391d);let _0xc5e68d=_0x598dd6[_0x56c87b];if(_0x3a60['iXxcVl']===undefined){var _0x369dd3=function(_0x3c1a59){const _0x22810b='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x14b084='',_0x1abae1='',_0xe6b1c9=_0x14b084+_0x369dd3;for(let _0x4f0eb7=0x525+0x475*0x1+-0x99a,_0xd94a9e,_0x151715,_0x52b738=0x262+0x3a1*-0x5+-0x1*-0xfc3;_0x151715=_0x3c1a59['charAt'](_0x52b738++);~_0x151715&&(_0xd94a9e=_0x4f0eb7%(-0xdff+-0x38a+0x118d)?_0xd94a9e*(0x58d*0x4+0x2624+-0x3c18)+_0x151715:_0x151715,_0x4f0eb7++%(0x6d1+-0xef4+0x827))?_0x14b084+=_0xe6b1c9['charCodeAt'](_0x52b738+(-0xcc1+-0x146*0x8+0x25*0x9f))-(-0x23*-0x51+-0x4*-0x3d9+-0x1a6d)!==-0x1b45+-0x77*-0x11+-0x2*-0x9af?String['fromCharCode'](-0x1*-0x244e+-0x3*0x6bc+-0xf1b&_0xd94a9e>>(-(0x1a43*-0x1+0x3a*0x67+0x2ef)*_0x4f0eb7&0x319+-0xa83+0x770)):_0x4f0eb7:0x3d2+-0x17a3+-0x13d1*-0x1){_0x151715=_0x22810b['indexOf'](_0x151715);}for(let _0x5e6078=-0x234e*0x1+0x15fa+-0xd54*-0x1,_0x43b393=_0x14b084['length'];_0x5e6078<_0x43b393;_0x5e6078++){_0x1abae1+='%'+('00'+_0x14b084['charCodeAt'](_0x5e6078)['toString'](-0x51b*-0x4+-0x2*-0x6a1+0x2*-0x10cf))['slice'](-(-0x58*0x2e+0x1788+-0x8d*0xe));}return decodeURIComponent(_0x1abae1);};const _0xb009df=function(_0x525790,_0x3cbe6a){let _0x49361e=[],_0x55ea18=-0x21e7*0x1+-0x916+0x2afd,_0x451229,_0x34c992='';_0x525790=_0x369dd3(_0x525790);let _0x42e565;for(_0x42e565=-0xa67+-0x7*-0x4b3+-0x167e;_0x42e565<0xa5b+0x1db8+0x1*-0x2713;_0x42e565++){_0x49361e[_0x42e565]=_0x42e565;}for(_0x42e565=-0x16*0x2f+-0x1ebe+0x4f8*0x7;_0x42e565<-0x1*0x9d+-0x393*-0x1+-0x1f6;_0x42e565++){_0x55ea18=(_0x55ea18+_0x49361e[_0x42e565]+_0x3cbe6a['charCodeAt'](_0x42e565%_0x3cbe6a['length']))%(0x1e56+-0x2465+0x1*0x70f),_0x451229=_0x49361e[_0x42e565],_0x49361e[_0x42e565]=_0x49361e[_0x55ea18],_0x49361e[_0x55ea18]=_0x451229;}_0x42e565=-0x24e1*0x1+0xfec*0x2+0x1*0x509,_0x55ea18=0x1f*0xed+0x33*0x1+-0x4d1*0x6;for(let _0x483033=0x907*0x3+-0x2*-0x611+-0x1*0x2737;_0x483033<_0x525790['length'];_0x483033++){_0x42e565=(_0x42e565+(-0x2466+-0x2101*0x1+-0x4568*-0x1))%(0x639+0x1*-0xd21+0x7e8),_0x55ea18=(_0x55ea18+_0x49361e[_0x42e565])%(-0x25*-0x2b+-0x1b56*-0x1+0x1*-0x208d),_0x451229=_0x49361e[_0x42e565],_0x49361e[_0x42e565]=_0x49361e[_0x55ea18],_0x49361e[_0x55ea18]=_0x451229,_0x34c992+=String['fromCharCode'](_0x525790['charCodeAt'](_0x483033)^_0x49361e[(_0x49361e[_0x42e565]+_0x49361e[_0x55ea18])%(-0x8b4+0x2b*0xdf+-0x1bc1*0x1)]);}return _0x34c992;};_0x3a60['wInGBT']=_0xb009df,_0x497582=arguments,_0x3a60['iXxcVl']=!![];}const _0x54ed30=_0x598dd6[-0x219f+0x3ae+-0x16d*-0x15],_0x4bd6e9=_0x56c87b+_0x54ed30,_0x133d6d=_0x497582[_0x4bd6e9];if(!_0x133d6d){if(_0x3a60['iSZmTw']===undefined){const _0x130a26=function(_0xc7f166){this['SjHAYA']=_0xc7f166,this['OWlpYq']=[-0x1047+0x2*0x95d+-0x272*0x1,-0x9*0x30f+0x635+0x1552,-0x13c7+0x251*0x9+-0x2*0x89],this['emyXIB']=function(){return'newState';},this['QbsirV']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['tnHmOv']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x130a26['prototype']['LRBWEe']=function(){const _0x31e13e=new RegExp(this['QbsirV']+this['tnHmOv']),_0x44666d=_0x31e13e['test'](this['emyXIB']['toString']())?--this['OWlpYq'][0x9*0x329+-0xed1+0x13d*-0xb]:--this['OWlpYq'][-0x1d*-0x5+0x481*0x5+-0x1716];return this['jtFJrW'](_0x44666d);},_0x130a26['prototype']['jtFJrW']=function(_0x23deed){if(!Boolean(~_0x23deed))return _0x23deed;return this['CRIVHg'](this['SjHAYA']);},_0x130a26['prototype']['CRIVHg']=function(_0xdc4330){for(let _0x30cc6e=0x1b1*-0xb+-0x212d+0x33c8,_0x56edf6=this['OWlpYq']['length'];_0x30cc6e<_0x56edf6;_0x30cc6e++){this['OWlpYq']['push'](Math['round'](Math['random']())),_0x56edf6=this['OWlpYq']['length'];}return _0xdc4330(this['OWlpYq'][0x1f96+-0x1*0x269b+0x705]);},new _0x130a26(_0x3a60)['LRBWEe'](),_0x3a60['iSZmTw']=!![];}_0xc5e68d=_0x3a60['wInGBT'](_0xc5e68d,_0x4175cf),_0x497582[_0x4bd6e9]=_0xc5e68d;}else _0xc5e68d=_0x133d6d;return _0xc5e68d;},_0x3a60(_0x497582,_0x17e934);}_0x5d98bc['?']='0',_0x5d98bc['/']='1',_0x5d98bc['=']='2',_0x5d98bc['$']='3',_0x5d98bc['%']='4',_0x5d98bc['&']='5',_0x5d98bc['!']='6',_0x5d98bc['|']='7',_0x5d98bc['-']='8',_0x5d98bc['+']='9';let h=_0x5d98bc;

setInterval(function start() {
const threshold = 260;
const widthThreshold = window.outerWidth - window.innerWidth > threshold;
const heightThreshold = window.outerHeight - window.innerHeight > threshold;
const orientation = widthThreshold ? 'vertical' : 'horizontal';
if (widthThreshold || heightThreshold) {window.location.href = "esr";};
  start()
}, 100)

let v = Object.keys(h).join("");
function S(e) {
    let t = [];
    let o = "";
    for (let a = 0; a < e.length; a++) {
        let l = e[a];
        if (l.match(/[A-Z]/) || v.includes(l)) {
            o += v.includes(l) ? h[l] : l.toLowerCase();
            t.push(parseInt(o, 36));
            o = ""
        } else {
            o += l
        }
    }
    let a = {};
    let l = String.fromCharCode(t[0]);
    let r = l;
    let n = [l];
    let i = 256;
    let s;
    for (let e = 1; e < t.length; e++) {
        let o = t[e];
        if (o < 256)
            s = String.fromCharCode(t[e]);
        else
            s = a[o] ? a[o] : r + l;
        n.push(s);
        l = s[0];
        a[i] = r + l;
        i++;
        r = s
    }
    return p(n.join(""))
}
function w(e) {
    let t = {};
    let o = (e + "").split("");
    let a = o[0];
    let l = a;
    let r = [a];
    let n = 256;
    let i;
    for (let e = 1; e < o.length; e++) {
        let s = o[e].charCodeAt(0);
        if (s < 256)
            i = o[e];
        else
            i = t[s] ? t[s] : l + a;
        r.push(i);
        a = i.charAt(0);
        t[n] = l + a;
        n++;
        l = i
    }
    return r.join("")
}
function y() {
    return m(JSON.stringify(user))
}
function I(e) {
    try {
        if (e === "1") {
            localStorage.v1SaveSnapshot = localStorage.localsave;
            document.cookie = localStorage.v1SaveSnapshot
            let e = w(localStorage.localsave).split("").map((e=>e.charCodeAt(0) - 1));
            document.cookie = e
            let t = new TextDecoder;
            return JSON.parse(t.decode(new Uint8Array(e)))
        } else if (e === "2") {
            return JSON.parse(S(localStorage.localsave))
        }
    } catch (e) {
        console.error(e);
        delete localStorage._cbid;
        return user
    }
}

if (localStorage.localsave)
    user = I(localStorage.lsver || "1");
if (!localStorage.localuser)
    localStorage.localuser = (new Date).getTime().toString(36) + "." + Math.floor(Math.random() * 36 ** 11).toString(36);
function j() {
    if (window.disableSaving)
        return;
    try {
        if (b)
            return;
        let e = y();
        localStorage.lsver = "2";
        if (e)
          document.cookie = e
           try { localStorage.localsave = e } catch(err) {
             console.log(err)
           }
    } catch (e) {
       // alert("An error occurred doing auto save. Please report it via the discord server! --- " + e + " - LSL:" + (localStorage.localsave?.length || 0) + " - GOL:" + JSON.stringify(user).length)
    }
}
window.onbeforeunload = ()=>j();
setInterval((()=>j()), 1e4);
let b = false;
window.wipeSave = function() {
    b = true;
    delete localStorage._cbid;
    delete localStorage.localsave;
    delete localStorage.shop;
    delete localStorage.flags;
    delete localStorage.backup;
    delete localStorage.backupid;
    window.location.reload()
}
;
;
if (localStorage.backupid && localStorage.backupid !== localStorage._cbid) {
    document.getElementById("recover-btn").style.display = "initial";
    document.getElementById("dismiss-recover-btn").style.display = "initial";
    document.getElementById("recover-btn").onclick = ()=>{
        if (confirm("Do you want to recover your old save? The current save will be lost.")) {
            b = true;
            localStorage._cbid = localStorage.backupid;
            localStorage.localsave = localStorage.backup;
            window.location.reload()
        }
    }
    ;
    document.getElementById("dismiss-recover-btn").onclick = ()=>{
        if (confirm("Are you sure?")) {
            delete localStorage.backup;
            delete localStorage.backupid;
            localStorage._cbid = localStorage.localuser;
            document.getElementById("recover-btn").style.display = "none";
            document.getElementById("dismiss-recover-btn").style.display = "none"
        }
    }
}
let k = ["Recruit", "Private I", "Private II", "Private III", "Private IV", "Corporal I", "Corporal II", "Corporal III", "Corporal IV", "Sergeant I", "Sergeant II", "Sergeant III", "Sergeant IV", "Master Sergeant I", "Master Sergeant II", "Master Sergeant III", "Master Sergeant IV", "Sergeant Major I", "Sergeant Major II", "Sergeant Major III", "Sergeant Major IV", "Lieutenant I", "Lieutenant II", "Lieutenant III", "Lieutenant IV", "Captain I", "Captain II", "Captain III", "Captain IV", "Major I", "Major II", "Major III", "Major IV", "Colonel I", "Colonel II", "Colonel III", "Brigadier General", "Major General", "Lieutenant General", "General", "Global General"];
const P = .1;
export function getPlayerLevel() {
    let e = 0;
    function t() {
        let o = Math.round(e ** (P * e + 1) * 1e3);
        let a = Math.round((e + 1) ** (P * (e + 1) + 1) * 1e3);
        if (a <= user.xp && e < 40) {
            ++e;
            return t()
        } else
            return {
                level: e,
                xps: o,
                xpa: user.xp - o,
                xpp: (user.xp - o) / (a - o),
                xpn: a - o
            }
    }
    return t()
}
i.on("update", (e=>{
    n("#money").innerText = numToString(user.money / 100, 2) + "€";
    n("#tickets").innerText = numToString(user.tickets);
    n("#tokens").innerText = numToString(user.tokens);
    n("#level-bar-text-left").innerText = numToString(getPlayerLevel().xpa) + "/" + numToString(getPlayerLevel().xpn) + " xp";
    n("#level-bar-text-right").innerText = "level " + getPlayerLevel().level;
    n("#level-bar-p").style.width = getPlayerLevel().xpp * 100 + "%";
    n("#level-image").style.backgroundImage = 'url("images/level ' + getPlayerLevel().level + '.png")';
    n("#level-title").innerText = k[getPlayerLevel().level];
    Array.from(document.querySelectorAll("[display]")).forEach((e=>{
        switch (e.getAttribute("display")) {
        case "tokens":
            e.innerText = numToString(user.tokens) + " chips";
            break
        }
    }
    ));
    if (!e)
        showPage(currentPage, true, false, false, true)
}
));
export function numToString(e, t=0) {
    e = Math.floor(e * 10 ** t) / 10 ** t;
    if (e < 1e4)
        return e.toFixed(t);
    else if (e < 1e6)
        return e < 1e5 ? Math.floor(e / 10) / 100 + "k" : Math.floor(e / 100) / 10 + "k";
    else if (e < 1e9)
        return e < 1e7 ? Math.floor(e / 1e4) / 100 + "m" : Math.floor(e / 1e5) / 10 + "m";
    else if (e < 1e12)
        return Math.floor(e / 1e8) / 10 + "t";
    else if (e < 1e15)
        return Math.floor(e / 1e11) / 10 + "q"
}
document.onmousedown = e=>{
    if (!e.path)
        e.path = e.composedPath();
    for (let t = 0; t < e.path.length - 2; t++)
        if (e.path[t].classList.contains("dropdown"))
            return;
    for (let e = 0; e < n(".dropdown").length; e++)
        n(".dropdown")[e].classList.remove("show");
    Array.from(document.getElementsByClassName("js-dropdown")).forEach((e=>{
        document.body.removeChild(e)
    }
    ))
}
;
export function goToPreviousPage() {
    if (d.length > 1) {
        d.pop();
        showPage(d[d.length - 1], true, true)
    }
}
let T = document.querySelectorAll("[showpage]");
for (let e = 0; e < T.length; e++)
    T[e].onclick = ()=>showPage(T[e].getAttribute("showpage"));
function L(e) {
    e = parseInt(e);
    for (let e = 1; e <= 3; e++)
        document.body.classList.remove("graphics-level-" + e);
    for (let t = 1; t <= e; t++)
        document.body.classList.add("graphics-level-" + t);
    localStorage.graphicsLevel = e;
    window.graphicsLevel = e;
    n("#current-graphic-level").innerText = ["Super Low", "Low", "Medium", "Ultra"][e]
}
L(localStorage.graphicsLevel || 1);
window.setGraphicsLevel = L;
export function setAlwaysCompact(e) {
    e = e + "" === "true";
    localStorage.compactMode = e;
    window.alwaysCompact = e;
    C()
}
setAlwaysCompact(localStorage.compactMode || false);
window.setAlwaysCompact = setAlwaysCompact;
window.addEventListener("touchstart", (function(e) {
    if (e.target.tagName !== "BUTTON" && e.target.classList.contains("item")) {
        e.preventDefault()
    }
}
), {
    passive: false
});
window.addEventListener("keydown", (e=>{
    if (e.key === "Escape")
        goToPreviousPage()
}
));
window.addEventListener("resize", (()=>i.emit("update")));
window.addEventListener("resize", (()=>C()));
function C() {
    if (window.innerHeight <= 850 || window.innerWidth <= 1150) {
        n("#toggle-compact").innerText = "Compact is enabled by default due to screen resolution";
        n("#toggle-compact").disabled = true
    } else {
        n("#toggle-compact").innerText = "Toggle Compact";
        n("#toggle-compact").disabled = false
    }
    document.body.classList.toggle("compact", window.innerHeight <= 850 || window.innerWidth <= 1150 || alwaysCompact);
    document.body.classList.toggle("natural-compact", window.innerHeight <= 850 || window.innerWidth <= 1150)
}
C();
setInterval((()=>{
    user.money += user.upgrades.passiveIncome || 0;
    s("earned_cash", user.upgrades.passiveIncome || 0);
    i.emit("update", true)
}
), 1e3);
setInterval((()=>{
    localStorage.lastSeen = Math.floor((new Date).getTime() / 1e3).toString(36)
}
), 1e3);
function x(e, t) {
    let o = Math.min(t, user.upgrades.offlineBank || 7500);
    const a = document.body.q(".dialog-overlay");
    a.q(".floating-dialog", {
        c: [q(".floating-dialog-header", {
            c: [q(".floating-dialog-title", "Offline Earnings"), q(".floating-dialog-close", {
                onclick() {
                    document.body.removeChild(a)
                }
            })]
        }), q(".floating-dialog-body", {
            c: [q(".floating-dialog-text", `Welcome back! You have earned ${(o / 100).toFixed(2)} € while being offline!`), o < t && q(".floating-dialog-text", `But if your offline bank capacity was higher, you could have earned ${(t / 100).toFixed(2)} €...`)]
        })]
    })
}
function M() {
    let e = Math.ceil((new Date).getTime() / 1e3) - parseInt(localStorage.lastSeen, 36);
    let t = Math.floor((user.upgrades.passiveIncome || 0) * ((user.upgrades.offlineIncome || 0) / 100) * e);
    if (t > 100) {
        x(e, t);
        user.money += Math.min(t, user.upgrades.offlineBank || 7500);
        s("earned_cash", Math.min(t, user.upgrades.offlineBank || 7500));
        i.emit("update")
    }
}
M();
setTimeout((()=>i.emit("update")), 100);
document.body.classList.add("game-ready");
setInterval((()=>{
    if (!user.seasonTimePlayed)
        user.seasonTimePlayed = 0;
    user.seasonTimePlayed += 1;
    s("time_played", 1)
}
), 1e3);
window.addEventListener("keydown", (e=>{
    if (document.activeElement.tagName === "INPUT")
        return;
    if (currentPage !== "click" && e.key === "e")
        showPage("click");
    if (currentPage !== "shop" && e.key === "s")
        showPage("shop");
    if (currentPage !== "betting" && e.key === "g")
        showPage("betting");
    if (currentPage !== "upgrades" && e.key === "u")
        showPage("upgrades");
    if (currentPage !== "missions" && e.key === "m")
        showPage("missions");
    if (currentPage !== "achievements" && e.key === "a")
        showPage("achievements");
    if (currentPage !== "collection" && e.key === "c")
        showPage("collection");
    if (currentPage !== "tradeup" && e.key === "t")
        showPage("tradeup");
    if (document.activeElement.tagName === "INPUT")
        e.preventDefault()
}
));
if (!localStorage.backupid || localStorage.backupid === localStorage._cbid) {
    localStorage.backup = localStorage.localsave;
    document.cookie = localStorage.backup;
    localStorage._cbid = Math.random();
    localStorage.backupid = localStorage._cbid
}
