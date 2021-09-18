export function ColumnSectionEdit({ style, onUpdate }) {
    const onChange = ({ target }) => {
        const { name, value } = target;
        const newStyle = { ...style };
        newStyle[name] = value;
        onUpdate(newStyle);
    }
    const { padding } = style;
    return (
        <div>
            <label htmlFor="padding">Padding:</label>
            <input type="range" name="padding" id="padding" value={padding} min="10" max="100" onChange={onChange}/>
        </div>
    )
}