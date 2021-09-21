import { useDrop } from "react-dnd";
import { ItemTypes } from "../js/ItemTypes";
import React, { useRef } from "react";

export function DropZone({ currPath, isLast, onDrop, isHorizontal }) {
    const ref = useRef(null)

    const [{ isOver, canDrop }, drop] = useDrop({
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        }),
        accept: Object.values(ItemTypes),
        drop: (item) => onDrop(item, currPath),
        canDrop: (item) => {
            if (!item.path) {
                return true
            }

            const dropZonePath = currPath.split('-')
            const itemPath = item.path.split('-')

            if (dropZonePath.length === 1) {
                return true
            }

            if (dropZonePath.length !== itemPath.length) {
                return false
            }
            return true
        }
    })

    drop(ref)
    const isActive = isOver || canDrop

    return (
        <div
            ref={ref}
            className={`dropzone ${(isLast) ? 'islast' : ''} ${(isActive) ? 'active' : ''} ${(isHorizontal) ? 'horizontal' : ''}`}
        >

        </div>
    )

}