import { useState, useRef } from 'react';
import Canvas from './components/Canvas';
import CanvasTools from './components/CanvasTools';
import BrushColor from './components/brushParams/BrushColor';
import './App.css';

function App() {
    const [brushSize, setBrushSize] = useState(5);
    const [brushColor, setBrushColor] = useState('black');

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
                />
                <Canvas
                    ref={canvasRef}
                    brushSize={brushSize}
                    brushColor={brushColor}
                />
                <div className="brush-color-section">
                    <BrushColor
                        brushColor={brushColor}
                        onClick={setBrushColor}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
