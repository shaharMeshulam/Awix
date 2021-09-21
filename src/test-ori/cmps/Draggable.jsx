import React, { useState, useRef } from "react";
import { useDrag } from "react-dnd";


export function Draggable({ id, type, path, component }) {
    const ref = useRef(null)
    const [draggable,] = useState({ id, type, path,component })

    const [{ isDragging }, drag] = useDrag({
        type: type,
        item: {
            ...draggable
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    })

    drag(ref)

    return (
        <div
            style={{ backgroud: (isDragging) ? 'green' : 'red', width: '150px', height: '50px', opacity: (isDragging) ? '0.4' : '1', }}
            ref={ref}
            className="draggable"
        >
            {draggable.component}
        </div>
    )
}