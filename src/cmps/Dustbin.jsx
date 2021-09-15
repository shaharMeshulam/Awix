import React, { memo } from 'react';
import { useDrop } from 'react-dnd';
import { Section } from './Section';
const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};
export const Dustbin = memo(function Dustbin({ accept, childrens, onDrop, }) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const isActive = isOver && canDrop;
    const KeysToComponentMap = {
        section: Section
    };
    function renderer(config) {
        if (typeof KeysToComponentMap[config.component] !== "undefined") {
            return React.createElement(
                KeysToComponentMap[config.component],
                {
                    src: config.src
                },
                config.children &&
                (typeof config.children === "string"
                    ? config.children
                    : config.children.map(c => renderer(c)))
            );
        }
    }
    let backgroundColor = '#222';
    if (isActive) {
        backgroundColor = 'darkgreen';
    }
    else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }
    return (<div ref={drop} role="Dustbin" style={{ ...style, backgroundColor }}>
        {isActive
            ? 'Release to drop'
            : `This dustbin accepts: ${accept.join(', ')}`}
        {childrens.map(children => renderer(children))}
        {childrens && (<p>Dropped: {JSON.stringify(childrens)}</p>)}
    </div>);
});
