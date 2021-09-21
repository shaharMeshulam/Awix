import React, { useState, useRef } from "react";
import { v4 as uuid } from 'uuid';
import { ItemTypes } from "../js/ItemTypes";
import { DroppableDraggable } from "../cmps/DroppableDraggable";
import { Draggable } from "../cmps/Draggable";
import { DropZone } from "../cmps/DropZone";

const draggables = [
    {
        id: 1,
        type: ItemTypes.DRAGGABLE,
        component: ItemTypes.SECTION
    },
    {
        id: 2,
        type: ItemTypes.DRAGGABLE,
        component: ItemTypes.COLUMN
    },
    {
        id: 3,
        type: ItemTypes.DRAGGABLE,
        component: ItemTypes.COMPONENT
    }
]

export function Editor() {
    const ref = useRef(null)

    // const moveElement = (dragPath, hoverPath) => {
    //     if (dragPath.length === 1 && hoverPath.length === 1) {
    //         const newSite = [...site]
    //         const [dragSection] = newSite.splice(dragPath[0], 1)
    //         const [hoverSection] = newSite.splice(hoverPath[0], 1)
    //         newSite.splice(dragPath[0], 0, hoverSection)
    //         newSite.splice(hoverPath[0], 0, dragSection)
    //     }

    // }

    const onDrop = (item, path) => {
        item.id = (item.id) ? item.id : uuid();
        switch (item.type) {
            case (ItemTypes.DRAGGABLE):
                let newSite = [...site]
                path = path.split('-')
                switch (item.component) {
                    case (ItemTypes.SECTION):
                        item.children = []
                        newSite.splice(+path[0], 0, item)
                        newSite = newSite.map((sec, idx) => ({ ...sec, path: `${idx}` }))
                        setSite(newSite)
                        break;
                    case (ItemTypes.COLUMN):
                        item.children = []
                        newSite[+path[0]].children.splice(+path[0], 0, item)
                        newSite[+path[0]].children = newSite[+path[0]].children.map((col, idx) => ({ ...col, path: `${path[0]}-${idx}` }))
                        setSite(newSite)
                        break
                    default:
                        newSite[+path[0]].children[+path[1]].children.splice(+path[2], 0, item)
                        newSite[+path[0]].children[+path[1]].children = newSite[+path[0]].children[+path[1]].children.map((cmp, idx) => ({ ...cmp, path: `${path[0]}-${path[1]}-${idx}` }))
                        setSite(newSite)
                }
        }
    }

    const [site, setSite] = useState([])

    return (
        <>
            <div className="draggables">
                {draggables.map(item => <Draggable key={`drag${item.id}`} type={item.type} component={item.component}></Draggable>)}
            </div>
            <div
                className="site"
                style={{ backgroundColor: 'gray', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                {site.length && site.map((section, idx) => {
                    const currPath = `${idx}`
                    return <React.Fragment key={section.id} >
                        <DropZone
                            currPath={currPath}
                            onDrop={onDrop}
                        />
                        <DroppableDraggable
                            onDrop={onDrop}
                            path={section.path}
                            accept={ItemTypes.SECTION}
                            type={ItemTypes.SECTION}
                            component={section.component}
                            id={section.id}
                            children={section.children} />
                    </React.Fragment>
                })}
                <DropZone currPath={`${site.length}`} isLast onDrop={onDrop} />
            </div>
        </>
    )
}