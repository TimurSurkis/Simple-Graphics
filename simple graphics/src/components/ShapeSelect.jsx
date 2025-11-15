import { LuSquare } from 'react-icons/lu';
import { LuCircle } from 'react-icons/lu';
import { LuTriangle } from 'react-icons/lu';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';

const ShapeSelect = ({ currentTool, setToolHandle }) => {
    const [shapesListHidden, setShapesListHidden] = useState(true);

    function toggleShapesList() {
        setShapesListHidden(shapesListHidden ? false : true);
    }

    return (
        <div className="shapes">
            <button
                className="tool-btn shape-select-btn"
                onClick={() => {
                    toggleShapesList();
                    setToolHandle('rectangle');
                }}
            >
                {currentTool !== 'rectangle' &&
                    currentTool !== 'ellipse' &&
                    currentTool !== 'triangle' && <LuSquare className="icon" />}
                {currentTool === 'rectangle' && (
                    <LuSquare className="icon no-margin" />
                )}
                {currentTool === 'ellipse' && <LuCircle className="icon" />}
                {currentTool === 'triangle' && <LuTriangle className="icon" />}
                <IoIosArrowDown className="list-arrow" />
            </button>
            <div className={`shapes-list ${shapesListHidden ? 'hidden' : ''}`}>
                <button
                    className="tool-btn"
                    onClick={() => {
                        setToolHandle('rectangle');
                        toggleShapesList();
                    }}
                >
                    <LuSquare className="icon" />
                </button>
                <button
                    className="tool-btn"
                    onClick={() => {
                        setToolHandle('ellipse');
                        toggleShapesList();
                    }}
                >
                    <LuCircle className="icon" />
                </button>
                <button
                    className="tool-btn"
                    onClick={() => {
                        setToolHandle('triangle');
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
