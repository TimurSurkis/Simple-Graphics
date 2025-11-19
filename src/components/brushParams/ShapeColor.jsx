import { useState } from 'react';
import { colors } from '../../data/color';

const ShapeColor = ({
    borderFill,
    shapeStrokeColor,
    shapeFillColor,
    setShapeStrokeColor,
    setShapeFillColor,
}) => {
    const [borderColorsShown, setBorderColorsShown] = useState(false);
    const [fillColorsShown, setFillColorsShown] = useState(false);

    const handleStrokeColorChange = (color) => {
        setShapeStrokeColor(color);
        setBorderColorsShown(false);
    };

    const handleFillColorChange = (color) => {
        setShapeFillColor(color);
        setFillColorsShown(false);
    };

    const handleColorsVisibility = (variable, func) => {
        func(!variable ? true : false);
    };

    return (
        <>
            {borderFill === 'border' && (
                <div className="shape-color-select" onClick={(e) => {
                    
                }}>
                    <button
                        onClick={() => {
                            handleColorsVisibility(
                                borderColorsShown,
                                setBorderColorsShown
                            );
                            console.log(borderColorsShown);
                        }}
                        className="shape-color-button"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0',
                            border: `2px solid ${shapeStrokeColor !== null ? shapeStrokeColor : 'gray'}`,
                        }}
                    ></button>
                    <div
                        className={`shape-color-grid ${
                            !borderColorsShown ? 'hidden' : ''
                        }`}
                    >
                        {colors.map((color, index) => {
                            return (
                                <button
                                    onClick={() =>
                                        handleStrokeColorChange(color)
                                    }
                                    key={index}
                                    className="shape-color-button"
                                    style={{
                                        backgroundColor:
                                            'rgba(255, 255, 255, 0)',
                                        border: `2px solid ${color}`,
                                    }}
                                    title={`Select ${color} color`}
                                    aria-label={`Select ${color} color`}
                                />
                            );
                        })}
                        <button onClick={() => handleStrokeColorChange(null)} className="shape-color-button none-color-button">none</button>
                    </div>
                </div>
            )}
            {borderFill === 'fill' && (
                <div className="shape-color-select">
                    <button
                        onClick={() =>
                            handleColorsVisibility(
                                fillColorsShown,
                                setFillColorsShown
                            )
                        }
                        className="shape-color-button"
                        style={{
                            backgroundColor: `${shapeFillColor !== null ? shapeFillColor : 'gray'}`,
                        }}
                    ></button>
                    <div
                        className={`shape-color-grid ${
                            !fillColorsShown ? 'hidden' : ''
                        }`}
                    >
                        {colors.map((color, index) => {
                            return (
                                <button
                                    onClick={() => handleFillColorChange(color)}
                                    key={index}
                                    className="shape-color-button"
                                    style={{
                                        backgroundColor: color,
                                    }}
                                    title={`Select ${color} color`}
                                    aria-label={`Select ${color} color`}
                                />
                            );
                        })}
                        <button onClick={() => handleFillColorChange(null)} className="shape-color-button none-color-button">none</button>

                    </div>
                </div>
            )}
        </>
    );
};

export default ShapeColor;
