import { colors } from '../../data/color';

const BrushColor = ({ brushColor, onClick }) => {
    const handleColorChange = (color) => {
        onClick(color);
    };

    return (
        <div className="brush-color-grid">
            {colors.map((color, index) => {
                const isActive = brushColor === color;
                return (
                    <button
                        onClick={() => handleColorChange(color)}
                        key={index}
                        className={`color-button ${color} ${
                            isActive ? 'active' : ''
                        }`}
                        style={{ backgroundColor: color }}
                        title={`Select ${color} color`}
                        aria-label={`Select ${color} color`}
                    />
                );
            })}
        </div>
    );
};

export default BrushColor;
