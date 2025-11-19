import { LuSquare } from 'react-icons/lu';
import { LuCircle } from 'react-icons/lu';
import { LuTriangle } from 'react-icons/lu';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';

const ShapeSelect = ({ currentTool, setToolHandle, lastTool, setLastTool }) => {
    const [shapesListHidden, setShapesListHidden] = useState(true);

    function toggleShapesList() {
        setShapesListHidden((prev) => !prev);
    }

    return (
        <div className="shapes">
            <button
                className="tool-btn shape-select-btn"
                onClick={() => {
                    toggleShapesList();
                    setToolHandle(lastTool);
                }}
            >
                {lastTool === 'ellipse' ? (
                    <LuCircle className="icon" />
                ) : lastTool === 'triangle' ? (
                    <LuTriangle className="icon" />
                ) : (
                    <LuSquare className="icon" />
                )}
                <IoIosArrowDown className="list-arrow" />
            </button>
            <div className={`shapes-list ${shapesListHidden ? 'hidden' : ''}`}>
                <button
                    className="tool-btn"
                    onClick={() => {
                        setToolHandle('rectangle');
                        setLastTool('rectangle');
                        toggleShapesList();
                    }}
                >
                    <LuSquare className="icon" />
                </button>
                <button
                    className="tool-btn"
                    onClick={() => {
                        setToolHandle('ellipse');
                        setLastTool('ellipse');
                        toggleShapesList();
                    }}
                >
                    <LuCircle className="icon" />
                </button>
                <button
                    className="tool-btn"
                    onClick={() => {
                        setToolHandle('triangle');
                        setLastTool('triangle');
                        toggleShapesList();
                    }}
                >
                    <LuTriangle className="icon" />
                </button>
            </div>
        </div>
    );
};

export default ShapeSelect;
