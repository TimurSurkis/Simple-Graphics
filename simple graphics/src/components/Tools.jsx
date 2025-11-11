import { LuPencil } from 'react-icons/lu';
import { LuPaintBucket } from 'react-icons/lu';
import { LuSquare } from "react-icons/lu";
import { LuCircle } from "react-icons/lu";

const Tools = ({ currentTool, onClick }) => {
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
            <button className="tool-btn" onClick={() => setToolHandle('fill')}>
                <LuPaintBucket className="icon" />
            </button>
            <button className="tool-btn" onClick={() => setToolHandle('rectangle')}>
                <LuSquare className="icon" />
            </button>
        </div>
    );
};

export default Tools;
