import { useRef, useEffect, useImperativeHandle } from 'react';

const Canvas = ({ brushSize, brushColor, ref }) => {
    const canvasRef = useRef(null);

    useImperativeHandle(ref, () => ({
        clearCanvas: () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
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
        ctx.fillStyle = 'black';
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        let isDrawing = false;

        canvas.addEventListener('mousedown', (e) => {
            canvasCoords = canvas.getBoundingClientRect();
            isDrawing = true;
            lastX = e.clientX - canvasCoords.left;
            lastY = e.clientY - canvasCoords.top;
        });

        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
        });

        canvas.addEventListener('mousemove', (e) => {
            if (isDrawing) {
                const currentX = e.clientX - canvasCoords.left;
                const currentY = e.clientY - canvasCoords.top;

                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(currentX, currentY);
                ctx.stroke();

                lastX = currentX;
                lastY = currentY;
            }
        });
    }, [brushSize, brushColor]);

    return <canvas ref={canvasRef} width={1000} height={500}></canvas>;
};

export default Canvas;
