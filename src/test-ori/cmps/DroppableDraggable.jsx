import React, { useState, useRef } from "react";
import { ItemTypes } from "../js/ItemTypes";
import { useDrag, useDrop } from "react-dnd";
import { v4 as uuid } from 'uuid';
import { Draggable } from "./Draggable";


export function DroppableDraggable({ id, children = [], type, accept, onDrop, path }) {
    const ref = useRef(null)
    const [dropdrag, setDropDrag] = useState({ id, children, type, accept, path })

    const handleDrop = (item) => {
        item.id = uuid()
        setDropDrag({ ...dropdrag, children: [...dropdrag.children, item] })
        onDrop({ ...item, path: dropdrag.path })
    }

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
        drop: (item) => handleDrop(item)
    })

    drop(drag(ref))

    return (
        <div
            style={{ border: (isDragging) ? '2px solid black' : '', backgroundColor: (isOver && canDrop) ? 'yellow' : 'white', padding: '20px', margin: '20px' }}
            ref={ref}
            className={dropdrag.type}
        >
            {dropdrag.type}
            {dropdrag.children.length && dropdrag.children.map((child, idx) => {
                switch (child.type) {
                    case (ItemTypes.COLUMN):
                        return <DroppableDraggable path={dropdrag.path + `-${idx}`} onDrop={onDrop} idx={idx} accept={ItemTypes.COMPONENT} type={ItemTypes.COLUMN} key={child.id} id={child.id} children={child.children} />
                    default:
                        return <Draggable path={dropdrag.path + `-${idx}`} onDrop={onDrop} type={ItemTypes.COMPONENT} key={child.id} id={child.id} />
                }
            })}
        </div>
    )
}