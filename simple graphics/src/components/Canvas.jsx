import { useRef, useEffect, useImperativeHandle } from 'react';

const Canvas = ({
    brushSize,
    brushColor,
    shapeStrokeColor,
    shapeFillColor,
    currentTool,
    ref,
}) => {
    const canvasRef = useRef(null);
    const baseCanvasRef = useRef(null);

    useImperativeHandle(ref, () => ({
        clearCanvas: () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            baseCanvasRef.current = null;
        },
    }));

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let canvasCoords;
        let lastX;
        let lastY;
        ctx.fillStyle = brushColor;
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        let isDrawing = false;

        function fill(canvas, startX, startY, fillColor) {
            const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            );
            const pixels = imageData.data;

            const startPos = (startY * canvas.width + startX) * 4;
            const targetColor = [
                pixels[startPos],
                pixels[startPos + 1],
                pixels[startPos + 2],
                pixels[startPos + 3],
            ];

            const fillRGB = hexToRgb(fillColor);
            const replacementColor = [fillRGB.r, fillRGB.g, fillRGB.b, 255];

            if (colorsMatch(targetColor, replacementColor)) {
                return;
            }

            const queue = [startX, startY];
            const visited = new Set();

            while (queue.length > 0) {
                const y = queue.pop();
                const x = queue.pop();

                if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height)
                    continue;

                const key = y * canvas.width + x;
                if (visited.has(key)) continue;

                const pos = key * 4;
                const currentColor = [
                    pixels[pos],
                    pixels[pos + 1],
                    pixels[pos + 2],
                    pixels[pos + 3],
                ];

                if (!colorsMatch(currentColor, targetColor)) continue;

                pixels[pos] = replacementColor[0];
                pixels[pos + 1] = replacementColor[1];
                pixels[pos + 2] = replacementColor[2];
                pixels[pos + 3] = replacementColor[3];

                visited.add(key);

                queue.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
            }
            ctx.putImageData(imageData, 0, 0);
        }
        function colorsMatch(a, b, tolerance = 50) {
            return (
                Math.abs(a[0] - b[0]) <= tolerance &&
                Math.abs(a[1] - b[1]) <= tolerance &&
                Math.abs(a[2] - b[2]) <= tolerance &&
                Math.abs(a[3] - b[3]) <= tolerance
            );
        }

        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
                hex
            );
            return result
                ? {
                      r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16),
                  }
                : null;
        }

        let currentX;
        let currentY;
        let firstX;
        let firstY;

        const rectData = {
            x: null,
            y: null,
            width: null,
            height: null,
            fillColor: shapeFillColor,
            strokeColor: shapeStrokeColor,
            lineWidth: brushSize,
        };
        let lineData = [];
        let currentPath = [];

        function saveBaseState() {
            baseCanvasRef.current = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            );
        }

        function restoreBaseState() {
            if (baseCanvasRef.current) {
                ctx.putImageData(baseCanvasRef.current, 0, 0);
            }
        }

        const mouseDownHandler = (e) => {
            canvasCoords = canvas.getBoundingClientRect();
            isDrawing = true;

            firstX = e.clientX - canvasCoords.left;
            firstY = e.clientY - canvasCoords.top;
            lastX = Math.round(e.clientX - canvasCoords.left);
            lastY = Math.round(e.clientY - canvasCoords.top);

            if (currentTool === 'rectangle' || currentTool === 'pencil') {
                saveBaseState();
            }

            if (currentTool === 'pencil') {
                currentPath = [[firstX, firstY]];
                ctx.beginPath();
                ctx.arc(firstX, firstY, brushSize / 2, 0, Math.PI * 2);
                ctx.fill();
            }

            if (currentTool === 'fill') {
                fill(canvas, lastX, lastY, brushColor);
            }

            if (currentTool === 'rectangle') {
                rectData.x = firstX;
                rectData.y = firstY;
            }
        };
        const mouseUpHandler = () => {
            if (currentTool === 'rectangle' || currentTool === 'pencil') {
                isDrawing = false;
            }
        };
        const mouseMoveHandler = (e) => {
            if (isDrawing && currentTool !== 'fill') {
                currentX = e.clientX - canvasCoords.left;
                currentY = e.clientY - canvasCoords.top;

                if (currentTool === 'pencil') {
                    currentPath.push([currentX, currentY]);

                    restoreBaseState();

                    ctx.strokeStyle = brushColor;
                    ctx.lineWidth = brushSize;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';

                    ctx.beginPath();
                    ctx.moveTo(currentPath[0][0], currentPath[0][1]);
                    for (let i = 1; i < currentPath.length; i++) {
                        ctx.lineTo(currentPath[i][0], currentPath[i][1]);
                    }
                    ctx.stroke();
                }

                if (currentTool === 'rectangle') {
                    rectData.width = Math.round(currentX - firstX);
                    rectData.height = Math.round(currentY - firstY);

                    restoreBaseState();

                    if (shapeFillColor !== null) {
                        rectData.fillColor = shapeFillColor;
                        ctx.fillStyle = rectData.fillColor;
                        ctx.fillRect(
                            rectData.x,
                            rectData.y,
                            rectData.width,
                            rectData.height
                        );
                    }
                    if (shapeStrokeColor !== null) {
                        rectData.strokeColor = shapeStrokeColor;
                        ctx.strokeStyle = rectData.strokeColor;
                        ctx.lineWidth = brushSize;
                        ctx.strokeRect(
                            rectData.x,
                            rectData.y,
                            rectData.width,
                            rectData.height
                        );
                    }
                }

                lastX = currentX;
                lastY = currentY;
            }
        };

        canvas.addEventListener('mousedown', mouseDownHandler);
        canvas.addEventListener('mouseup', mouseUpHandler);
        canvas.addEventListener('mousemove', mouseMoveHandler);

        return () => {
            canvas.removeEventListener('mousedown', mouseDownHandler);
            canvas.removeEventListener('mouseup', mouseUpHandler);
            canvas.removeEventListener('mousemove', mouseMoveHandler);
            console.log('Destroy');
        };
    }, [brushSize, brushColor, shapeStrokeColor, shapeFillColor, currentTool]);

    return <canvas ref={canvasRef} width={1000} height={500}></canvas>;
};

export default Canvas;
