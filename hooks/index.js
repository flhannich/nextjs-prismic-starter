import { useState, useEffect, useRef } from 'react';

export const useComponentVisible = (initial) => {
    const [isComponentVisible, setIsComponentVisible] = useState(initial);
    const ref = useRef(null);

    const handleClickOutside = (event) => {

        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible };
}


export const useTransitionEnd = ref => {
    
     // const { tranitionIsFinished } = useTransitionEnd(holderRef);

    const [tranitionIsFinished, setTranitionIsFinished] = useState(false);


    let transitionEnd;
    let transitionStart;

    useEffect(() => {
        transitionEnd = whichTransitionEndEvent();
        transitionStart = whichTransitionStartEvent();
    }, [])

    useEffect(() => {        
        const el = ref.current;
        el.addEventListener(transitionEnd, invokeState, false);
        el.addEventListener(transitionStart, revokeState, false);
        return () => {
            el.removeEventListener(transitionEnd, invokeState, false);
            el.removeEventListener(transitionStart, revokeState, false);
        }
    }, [ref, transitionEnd, transitionStart]);


    const whichTransitionEndEvent = () => {
        var t;
        var el =  document.createElement('fakeelement');
        var transitions = {
          'transition':'transitionend',
          'OTransition':'oTransitionEnd',
          'MozTransition':'transitionend',
          'WebkitTransition':'webkitTransitionEnd'
        }
    
        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    }

    const whichTransitionStartEvent = () => {
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
          'transition':'transitionstart',
          'OTransition':'oTransitionStart',
          'MozTransition':'transitionstart',
          'WebkitTransition':'webkitTransitionStart'
        }
    
        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    }
    
    const invokeState = () => {
        setTranitionIsFinished(true)
    }

    const revokeState = () => {
        setTranitionIsFinished(false)
    }

    return { tranitionIsFinished };

}