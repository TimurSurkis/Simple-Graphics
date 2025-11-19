const BrushWidth = ({ value, onChange }) => {
    function handleChange(e) {
        let newValue = Math.round(e.target.value);
        if (newValue < 1) {
            newValue = 1;
        }
        if (newValue > 100) {
            newValue = 100;
        }

        onChange(newValue);
    }

    return (
        <div className="brush-width-controls">
            <div className="brush-size-display">
                <div
                    className="brush-size-preview"
                    style={{
                        width: `${Math.min(value, 20)}px`,
                        height: `${Math.min(value, 20)}px`,
                    }}
                />
            </div>
            <input
                value={value}
                onChange={handleChange}
                type="number"
                min="1"
                max="100"
                className="brush-size-field"
                placeholder="Size"
            />
        </div>
    );
};

export default BrushWidth;
