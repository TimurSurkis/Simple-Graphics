import { useState, useRef } from 'react';
import Canvas from './components/Canvas';
import CanvasTools from './components/CanvasTools';
import BrushColor from './components/brushParams/BrushColor';
import Tools from './components/Tools';
import './App.css';

function App() {
    const [brushSize, setBrushSize] = useState(5);
    const [brushColor, setBrushColor] = useState('#000000');
    const [tool, setTool] = useState('pencil');
    const [shapeFillColor, setShapeFillColor] = useState('#000000');
    const [shapeStrokeColor, setShapeStrokeColor] = useState('#ffffff');

    const canvasRef = useRef();

    const handleCanvasClear = () => {
        canvasRef.current?.clearCanvas();
    };

    return (
        <div className="app">
            <div className="canvas-and-settings">
                <CanvasTools
                    value={brushSize}
                    onChange={setBrushSize}
                    onClick={handleCanvasClear}
                    currentTool={tool}
                    shapeFillColor={shapeFillColor}
                    shapeStrokeColor={shapeStrokeColor}
                />
                <div className="canvas-and-color">
                    <div className="canvas-and-tools">
                        <Tools currentTool={tool} onClick={setTool} />
                        <Canvas
                            ref={canvasRef}
                            brushSize={brushSize}
                            brushColor={brushColor}
                            shapeStrokeColor={shapeStrokeColor}
                            shapeFillColor={shapeFillColor}
                            currentTool={tool}
                        />
                    </div>
                    <div className="brush-color-section">
                        <BrushColor
                            brushColor={brushColor}
                            onClick={setBrushColor}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
