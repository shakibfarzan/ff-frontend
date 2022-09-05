import React from 'react';
import { animated, useTransition } from "@react-spring/web";
import { ArrowBack, ArrowForward } from '../assets/Icons';

const ArrowButton = (
    { disabled, position, onClick}: 
    { disabled: boolean; position: 'left' | 'right'; onClick: () => void; }
): React.ReactElement => {
    const transitions = useTransition(!disabled, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
      });
    
      return transitions(
        (props, item) =>
          item && (
            <animated.div
              style={{
                ...props,
                zIndex: 100
              }}
            >
                <button className={`absolute ${position === 'left' ? 'left-4' : 'right-0'}`} onClick={(e) => {
                    e.preventDefault();
                    onClick();
                }}>
                {position === 'left' ? <ArrowBack />: <ArrowForward />}
                </button>
            </animated.div>
          )
      );
}

export default ArrowButton;