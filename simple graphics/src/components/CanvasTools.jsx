import BrushColor from "./brushParams/BrushColor";
import BrushWidth from "./brushParams/BrushWidth";
import ClearCanvas from "./canvasActions/ClearCanvas";

const CanvasTools = ({ value, onChange, onClick }) => {
    return (
        <div className="tools-section">
            <div className="tools-upper">
                <h3 className="tools-section-title no-margin">
                    Brush Settings
                </h3>
                <div className="brush-params">
                    <div className="brush-width-section">
                        <h4 className="no-margin">Brush Width</h4>
                        <BrushWidth value={value} onChange={onChange} />
                    </div>
                </div>
            </div>
            <div className="canvas-actions">
                <ClearCanvas onClick={onClick} />
            </div>
        </div>
    );
};

export default CanvasTools;