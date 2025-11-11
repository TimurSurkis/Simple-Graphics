import BrushColor from './brushParams/BrushColor';
import BrushWidth from './brushParams/BrushWidth';
import ClearCanvas from './canvasActions/ClearCanvas';
import { colors } from '../data/color';

const CanvasTools = ({
    value,
    onChange,
    onClick,
    currentTool,
    shapeFillColor,
    shapeStrokeColor,
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
                    {currentTool === 'manualShape' && (
                        <div className="shape-parameters">
                            <div className="param-section brush-width-section">
                                <h4 className="no-margin">Stroke Width</h4>
                                <BrushWidth value={value} onChange={onChange} />
                            </div>
                            <div className="shape-colors">
                                <div className="param-section stroke-color-section">
                                    <h4 className="no-margin">Stroke Color</h4>
                                    <button
                                        className="color-button"
                                        style={{
                                            backgroundColor:
                                                'rgba(255, 255, 255, 0',
                                            border: `2px solid ${shapeStrokeColor}`,
                                        }}
                                    ></button>
                                </div>
                                <div className="param-section fill-color-section">
                                    <h4 className="no-margin">Fill Color</h4>
                                    <button
                                        className="color-button"
                                        style={{
                                            backgroundColor: shapeFillColor,
                                        }}
                                    ></button>
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
