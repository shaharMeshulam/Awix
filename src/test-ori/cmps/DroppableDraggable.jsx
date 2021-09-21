import React, { useRef } from "react";
import { ItemTypes } from "../js/ItemTypes";
import { useDrag, useDrop } from "react-dnd";
import { DropZone } from "../cmps/DropZone";


export function DroppableDraggable({ id, children = [], type, accept, onDrop, path, component }) {
    const ref = useRef(null)
    const dropdrag = { id, children, type, accept, path, component }


    const [{ isDragging }, drag] = useDrag({
        type: type,
        item: { ...dropdrag },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    })

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: dropdrag.accept,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        }),
        hover(item, monitor) {
            if (!ref.current) return

            const dragPath = (item.path) ? item.path.split('-') : ['0', '0']
            const hoverPath = dropdrag.path.split('-');

            // console.log('dragPath', dragPath, 'hoverPath', hoverPath);

            const dragIdx = dragPath[dragPath.length - 1];
            const hoverIdx = hoverPath[hoverPath.length - 1];

            if (item.path === dropdrag.path) return
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIdx < hoverIdx && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIdx > hoverIdx && hoverClientY > hoverMiddleY) {
                return;
            }
            item.path = dropdrag.path;
        }
    })

    drop(drag(ref))

    return (
        <div
            style={{ border: (isDragging) ? '2px solid black' : '', backgroundColor: (isOver && canDrop) ? 'yellow' : 'white', padding: '20px', margin: '20px' }}
            ref={ref}
            className={dropdrag.type}
        >
            {component}
            {/* {`${dropdrag.type} id:${dropdrag.id}`} */}
            <DropZone
                currPath={`${dropdrag.path}-0`}
                onDrop={onDrop}
                isHorizontal={component === ItemTypes.SECTION}
            />
            {dropdrag.children.length && dropdrag.children.map((child, idx) => {
                if (child.component === ItemTypes.COLUMN) {
                    return <>
                        <DroppableDraggable component={child.component} path={`${dropdrag.path}-${idx}`} onDrop={onDrop} idx={idx} accept={ItemTypes.COLUMN} type={ItemTypes.COLUMN} key={child.id} id={child.id} children={child.children} />
                        <DropZone
                            currPath={`${dropdrag.path}-${idx + 1}`}
                            onDrop={onDrop}
                            isHorizontal
                        />
                    </>
                }
                else {
                    return <>
                        <DroppableDraggable component={child.component} path={`${dropdrag.path}-${idx}`} onDrop={onDrop} idx={idx} accept={ItemTypes.COMPONENT} type={ItemTypes.COMPONENT} key={child.id} id={child.id} children={child.children} />
                        <DropZone
                            currPath={`${dropdrag.path}-${idx + 1}`}
                            onDrop={onDrop}
                        />
                    </>
                }
            })}


        </div>
    )
}