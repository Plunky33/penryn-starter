import Loader from '../Bundle/Common/Loader.js'
import Transition from '../Bundle/Common/Transition.js'
import Over from '../Bundle/Common/Over.js'
import Resize from '../Bundle/Home/Resize.js'

/*

CLASS
─────

Class "_tb"     →    targetBlank W3C compatible (target blank)
Class "_tbs"    →    targetBlank W3C compatible except for safari (target blank safari)
Class "_ost"    →    Xhr website : open link in same tab without prevent default (open same tab)
Class "_pr"     →    Not xhr website : prevent default

METHODS ARGS
────────────

contructor      →    Listeners
preload         →    opts : outroM
intro           →    opts : outroArgs / xhr / outroM (enable)
outro           →    done

PARALYSE OUTRO METHOD
─────────────────────

intro (opts) {
    const outroM = opts.outroM
    outroM.off()
}

INTRO XHR TRANSITION
────────────────────

intro (opts) {
    const xhr = opts.xhr
    xhr.removeOld()
    xhr.insertNew()
}

*/

class HomeController {

    constructor (Listeners) {
        console.log('home constructor')

        Listeners.init({
            mouseenter: [
                {
                    el: '#h-link',
                    module: Over,
                    method: 'run'
                }
            ],
            ro: {
                throttle: {
                    delay: 200,
                    onlyAtEnd: true
                },
                module: Resize,
                method: 'calculate'
            }
        })
    }

    preload (opts) {
        Loader.run(opts)
    }

    intro (opts) {
        
        const xhr = opts.xhr
        xhr.removeOld()
        xhr.insertNew()
        Transition.intro(opts)
    }

    outro (opts) {
        opts.listeners.remove({
            destroy: true
        })

        Transition.outro(opts.done)
    }

}

export default HomeController
