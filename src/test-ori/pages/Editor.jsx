import React, { useState, useRef } from "react";
import { useDrop } from 'react-dnd'
import { v4 as uuid } from 'uuid';
import { ItemTypes } from "../js/ItemTypes";
import { DroppableDraggable } from "../cmps/DroppableDraggable";
import { Draggable } from "../cmps/Draggable";

const draggables = [
    {
        id: 1,
        type: ItemTypes.SECTION,
        accept: ItemTypes.COLUMN
    },
    {
        id: 2,
        type: ItemTypes.COLUMN,
        accept: ItemTypes.COMPONENT
    },
    {
        id: 3,
        type: ItemTypes.COMPONENT
    }
]

export function Editor() {
    const ref = useRef(null)

    const onDrop = (item) => {
        item.id = (item.id) ? item.id : uuid();

        console.log('item from Editor', item);

        switch (item.type) {
            case (ItemTypes.SECTION):
                item.children = []
                setSite([...site, { ...item }])
                break;
            case (ItemTypes.COLUMN):
                item.children = []
                console.log(site);
                site[item.path].children.push(item)
                setSite(site)
                break
            default:
        }
    }

    const [site, setSite] = useState([])

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.SECTION,
        canDrop: (item) => {
            if (item.type === ItemTypes.SECTION) return true
            return false
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
        drop: (item) => onDrop(item)
    })

    drop(ref)
    return (
        <>
            <div className="draggables">

                {draggables.map(item => <Draggable key={`drag${item.id}`} type={item.type}></Draggable>)}
            </div>
            <div
                ref={ref}
                className="site"
                style={{ backgroundColor: (isOver && canDrop) ? 'yellow' : 'gray', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                {site.length && site.map((section, idx) => <DroppableDraggable
                    onDrop={onDrop}
                    path={`${idx}`}
                    accept={ItemTypes.COLUMN}
                    type={ItemTypes.SECTION}
                    key={section.id}
                    id={section.id}
                    children={section.children} />
                )}
            </div>
        </>
    )
}