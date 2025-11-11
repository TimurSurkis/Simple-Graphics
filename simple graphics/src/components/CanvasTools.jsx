import ShapeColor from './brushParams/ShapeColor';
import BrushWidth from './brushParams/BrushWidth';
import ClearCanvas from './canvasActions/ClearCanvas';
import { colors } from '../data/color';

const CanvasTools = ({
    value,
    onChange,
    onClick,
    currentTool,
    shapeStrokeColor,
    shapeFillColor,
    setShapeStrokeColor,
    setShapeFillColor,
}) => {
    return (
        <div className="tools-section">
            <div className="tools-upper">
                <h3 className="tools-section-title no-margin">Settings</h3>
                <div className="brush-params">
                    {currentTool === 'pencil' && (
                        <div className="param-section">
                            <h4 className="no-margin">Brush Width</h4>
                            <BrushWidth value={value} onChange={onChange} />
                        </div>
                    )}
                    {currentTool === 'rectangle' && (
                        <div className="shape-parameters">
                            <div className="param-section brush-width-section">
                                <h4 className="no-margin">Stroke Width</h4>
                                <BrushWidth value={value} onChange={onChange} />
                            </div>
                            <div className="shape-colors">
                                <div className="param-section stroke-color-section">
                                    <h4 className="no-margin">Stroke Color</h4>
                                    <ShapeColor setShapeStrokeColor={setShapeStrokeColor} shapeStrokeColor={shapeStrokeColor} borderFill='border'/>
                                </div>
                                <div className="param-section fill-color-section">
                                    <h4 className="no-margin">Fill Color</h4>
                                    <ShapeColor setShapeFillColor={setShapeFillColor} shapeFillColor={shapeFillColor} borderFill='fill'/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="canvas-actions">
                <ClearCanvas onClick={onClick} />
            </div>
        </div>
    );
};

export default CanvasTools;
