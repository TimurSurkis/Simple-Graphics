import { LuPencil } from 'react-icons/lu';
import { LuPaintBucket } from 'react-icons/lu';
import { LuEraser } from 'react-icons/lu';
import ShapeSelect from './ShapeSelect';

const Tools = ({ currentTool, onClick, lastTool, setLastTool }) => {
    function setToolHandle(tool) {
        if (tool !== currentTool) {
            onClick(tool);
        }
    }

    return (
        <div className="tools-panel">
            <button
                className="tool-btn"
                onClick={() => setToolHandle('pencil')}
            >
                <LuPencil className="icon" />
            </button>
            <button
                className="tool-btn"
                onClick={() => setToolHandle('eraser')}
            >
                <LuEraser className="icon" />
            </button>
            <button className="tool-btn" onClick={() => setToolHandle('fill')}>
                <LuPaintBucket className="icon" />
            </button>
            <ShapeSelect
                currentTool={currentTool}
                setToolHandle={setToolHandle}
                lastTool={lastTool}
                setLastTool={setLastTool}
            />
        </div>
    );
};

export default Tools;
