import { useState } from 'react';
import { ItemTypes } from '../ItemTypes';
import { Content } from './Content';

export function Menu() {
    const [contents] = useState([
        { component: 'section', type: ItemTypes.SECTION },
        { component: 'column', type: ItemTypes.COLUMN },
    ]);
    return (
        <ul>
            {contents.map(({ component, type }, index) => (<Content component={component} type={type} key={index} />))}
        </ul>
    )
}