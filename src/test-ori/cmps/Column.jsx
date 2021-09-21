import React, { useState, useRef } from "react";
import { ItemTypes } from "../js/ItemTypes";
import { useDrag } from "react-dnd";
import { v4 as uuid } from 'uuid';


export function Column() {
    const ref = useRef(null)
    const [column, setColumn] = useState({})
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.COLUMN,
        item: {
            id: uuid()
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    })

    drag(ref)

    return (
        <div
            style={{ backgroud: isDragging ? 'green' : 'red', width: '150px' }}
            ref={ref}
            className="section"
        >
            col
        </div>
    )
}