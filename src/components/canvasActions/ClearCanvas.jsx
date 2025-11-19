const ClearCanvas = ({ onClick }) => {
    function handleClear() {
        onClick();
    }
    return (
        <button
            onClick={handleClear}
            className="clear-canvas-btn"
            title="Clear the canvas"
            aria-label="Clear canvas"
        >
            Clear
        </button>
    );
};

export default ClearCanvas;
