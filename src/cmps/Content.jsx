import { memo } from 'react';
import { useDrag } from 'react-dnd';
const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
};
export const Content = memo(function Content({ component, type, isDropped }) {
    const [{ opacity }, drag] = useDrag(() => ({
        type,
        item: { component },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    }), [component, type]);
    return (<div ref={drag} role="Content" style={{ ...style, opacity }}>
        {isDropped ? <s>{component}</s> : component}
    </div>);
});
