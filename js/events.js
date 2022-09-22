export default class e {
    listeners = {};
    on(e, s) {
        return new t(e,s,this)
    }
    once(e, s) {
        let l = new t(e,(()=>{
            s();
            l.remove()
        }
        ),this);
        return l
    }
    emit(e, t) {
        if (this.listeners[e]) {
            this.listeners[e].forEach((e=>e.call(t)))
        }
    }
}
class t {
    constructor(e, t, s) {
        this.event = e;
        this.callback = t;
        this.controller = s;
        (s.listeners[e] ??= []).push(this)
    }
    remove() {
        this.controller.listeners[this.event].splice(this.controller.listeners[this.event].indexOf(this), 1)
    }
    call(e) {
        this.callback(e)
    }
}
