import React, { useState, useRef, useEffect } from "react";
import {
  Stage,
  Layer,
  Line,
  Rect,
  Circle,
  RegularPolygon,
  Transformer,
} from "react-konva";
import { FaUndo, FaTrashAlt } from "react-icons/fa";
import rectangleIcon from "../../assets/rectangle.svg";
import circleIcon from "../../assets/circle.svg";
import triangleIcon from "../../assets/triangle.svg";
import brushIcon from "../../assets/brush.svg";
import eraserIcon from "../../assets/eraser.svg";
import lineIcon from "../../assets/line.svg";
import compassIcon from "../../assets/compass.svg";
import protractorIcon from "../../assets/protractor.svg";
import "./DrawingApp.css"; // Import your CSS file for styles

const DrawingApp = () => {
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState([]);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const trRef = useRef(null);
  const [shapes, setShapes] = useState([]);

  const [circleModalOpen, setCircleModalOpen] = useState(false);
  const [circleRadius, setCircleRadius] = useState(0);

  const [rectangleModalOpen, setRectangleModalOpen] = useState(false);
  const [rectangleWidth, setRectangleWidth] = useState(0);
  const [rectangleHeight, setRectangleHeight] = useState(0);

  const [triangleModalOpen, setTriangleModalOpen] = useState(false);
  const [triangleType, setTriangleType] = useState("scalene");
  const [triangleSideA, setTriangleSideA] = useState(0);
  const [triangleSideB, setTriangleSideB] = useState(0);
  const [triangleSideC, setTriangleSideC] = useState(0);
  const [triangleError, setTriangleError] = useState("");

  const [lineModalOpenCm, setLineModalOpenCm] = useState(false);
  const [lineLengthCm, setLineLengthCm] = useState(0);

  // Protractor State and Ref
  const [protractorModalOpen, setProtractorModalOpen] = useState(false);
  const [protractorAngle, setProtractorAngle] = useState(0);
  const [protractorLength, setProtractorLength] = useState(100);
  const protractorLineRef = useRef(null);

  const [isLongPress, setIsLongPress] = useState(false);
  const [longPressTimestamp, setLongPressTimestamp] = useState(0);

  const [lastClickedLineId, setLastClickedLineId] = useState(null);
  const [lastClickedLineTimestamp, setLastClickedLineTimestamp] = useState(0);

  const lastClickedShapeIdRef = useRef(null);
  const lastClickedTimestampRef = useRef(0);

  const [lastClickedShapeId, setLastClickedShapeId] = useState(null);
const [lastClickedTimestamp, setLastClickedTimestamp] = useState(0);
const [drawingStartPoint, setDrawingStartPoint] = useState({ x: 0, y: 0 });


  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [selectedLineEndpoint, setSelectedLineEndpoint] = useState("left");
  const [selectingLineForProtractor, setSelectingLineForProtractor] = useState(false);


  const canvasRef = useRef(null);

  const handleMouseDown = (event) => {
    const stage = event.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const { x, y } = pointerPosition;

    if (tool === "line") {
      // Set the starting point for the Line tool
      setStartX(x);
      setStartY(y);
    }
    if (tool === "pencil" || tool === "eraser") {
      const stage = event.target.getStage();
      const position = stage.getPointerPosition();
      setIsDrawing(true);
      setLines([
        ...lines,
        { tool, color, strokeWidth, points: [position.x, position.y] },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    // Check if the user is currently drawing (mousedown event occurred previously)
    if (!isDrawing) {
      return;
    }

    // Get the current mouse position
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    // Calculate the new line points by concatenating the current points with the new point
    const newPoints = lines[lines.length - 1].points.concat([point.x, point.y]);

    // Create the new line shape with the 'tool' property set
    const newLine = {
      tool: tool, // Assuming 'tool' is the variable storing the selected drawing tool
      points: newPoints,
      color: color,
      strokeWidth: strokeWidth,
    };

    // Update the lines state with the new line shape
    setLines((prevLines) => [...prevLines.slice(0, -1), newLine]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setLastClickedShapeId(null);
    setLastClickedLineId(null);
    setLastClickedTimestamp(0);
    setLastClickedLineTimestamp(0);

    if (tool === "line") {
      // Clear the starting point when the user releases the mouse button
      setStartX(null);
      setStartY(null);
    }
    if (tool === "protractor") {
      // When using the protractor tool, add the shape to the list of lines when drawing is completed.
      setLines((prevLines) => [...prevLines, shapes[shapes.length - 1]]);
      setShapes([]); // Clear the shapes state to prepare for the next protractor drawing.
    }
  };

  const handleLineMouseDown = (e) => {
    if (selectingLineForProtractor) {
      const clickedLine = e.target;
      const lineIndex = clickedLine.index;
      setSelectedShapeId(lineIndex);
      setSelectingLineForProtractor(false); // Disable line selection after selecting a line for the Protractor tool
    } else {
      setIsDrawing(true);
      const point = e.target.getStage().getPointerPosition();
      setDrawingStartPoint(point);
    }
  };
  

  const handleLineMouseUp = () => {
    setIsLongPress(false);
    setLongPressTimestamp(0);
  };

  const handleLineModalSubmitCm = () => {
    setLineModalOpenCm(false);

    if (lineLengthCm <= 0) {
      alert("Please enter a valid length for the line (greater than 0).");
      return;
    }

    const updatedLines = [...lines];
    updatedLines.push({
      tool: "line",
      color,
      strokeWidth,
      points: [
        window.innerWidth / 2 - lineLengthCm / 2,
        window.innerHeight / 2,
        window.innerWidth / 2 + lineLengthCm / 2,
        window.innerHeight / 2,
      ],
    });
    setLines(updatedLines);
  };

  const handleLineModalCancelCm = () => {
    setLineModalOpenCm(false);
    setLineLengthCm(0);
  };

  const handleCircleModalSubmit = () => {
    setCircleModalOpen(false);

    // Validate circle radius
    if (circleRadius <= 0) {
      alert("Please enter a valid radius for the circle (greater than 0).");
      return;
    }

    const updatedLines = [...lines];
    updatedLines.push({
      tool: "circle",
      color,
      strokeWidth,
      radius: circleRadius,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    setLines(updatedLines);
  };

  const handleTriangleModalSubmit = () => {
    // Validate triangle sides
    const a = Number(triangleSideA);
    const b = Number(triangleSideB);
    const c = Number(triangleSideC);

    if (triangleType === "equilateral" && a <= 0) {
      setTriangleError(
        "Please enter a valid side length for the equilateral triangle (greater than 0)."
      );
      return;
    }

    if (triangleType === "isosceles" && (a <= 0 || b <= 0 || a !== b)) {
      setTriangleError(
        "Please enter valid side lengths for the isosceles triangle (greater than 0 and sideA should be equal to sideB)."
      );
      return;
    }

    if (triangleType === "scalene") {
      // Check if sides form a valid triangle
      if (a <= 0 || b <= 0 || c <= 0) {
        setTriangleError(
          "Please enter valid side lengths for the scalene triangle (greater than 0)."
        );
        return;
      }

      if (a + b <= c || a + c <= b || b + c <= a) {
        setTriangleError(
          "The given side lengths cannot form a valid scalene triangle. Please try again."
        );
        return;
      }
    }

    setTriangleError("");
    setTriangleModalOpen(false);

    const updatedLines = [...lines];
    let height = 0;

    if (triangleType === "equilateral") {
      height = (Math.sqrt(3) / 2) * triangleSideA;
      updatedLines.push({
        tool: "triangle",
        color,
        strokeWidth,
        sideA: triangleSideA,
        sideB: triangleSideA,
        sideC: triangleSideA,
        height,
        x: window.innerWidth / 2 - triangleSideA / 2,
        y: window.innerHeight / 2 + height / 3,
        type: triangleType,
      });
    } else if (triangleType === "isosceles") {
      height = Math.sqrt(
        triangleSideA * triangleSideA - (triangleSideB * triangleSideB) / 4
      );
      updatedLines.push({
        tool: "triangle",
        color,
        strokeWidth,
        sideA: triangleSideA,
        sideB: triangleSideB,
        sideC: triangleSideB,
        height,
        x: window.innerWidth / 2 - triangleSideA / 2,
        y: window.innerHeight / 2 + height / 3,
        type: triangleType,
      });
    } else {
      height = calculateScaleneHeight(
        triangleSideA,
        triangleSideB,
        triangleSideC
      );
      updatedLines.push({
        tool: "triangle",
        color,
        strokeWidth,
        sideA: triangleSideA,
        sideB: triangleSideB,
        sideC: triangleSideC,
        height,
        x: window.innerWidth / 2 - triangleSideA / 2,
        y: window.innerHeight / 2 + height / 3,
        type: triangleType,
      });
    }

    setLines(updatedLines);
  };

  const calculateScaleneHeight = (a, b, c) => {
    // Use Heron's formula to calculate the area of the triangle
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    // Use the formula: height = (2 * area) / base
    const height = (2 * area) / a;

    return height;
  };

  const handleRectangleModalSubmit = () => {
    setRectangleModalOpen(false);

    // Validate rectangle dimensions
    if (rectangleWidth <= 0 || rectangleHeight <= 0) {
      alert(
        "Please enter valid dimensions for the rectangle (width and height should be greater than 0)."
      );
      return;
    }

    const updatedLines = [...lines];
    updatedLines.push({
      tool: "rectangle",
      color,
      strokeWidth,
      width: rectangleWidth,
      height: rectangleHeight,
      x: window.innerWidth / 2 - rectangleWidth / 2,
      y: window.innerHeight / 2 - rectangleHeight / 2,
    });
    setLines(updatedLines);
  };

  const handleUndo = () => {
    if (lines.length > 0) {
      const updatedLines = [...lines];
      updatedLines.pop();
      setLines(updatedLines);
    }
  };

  const handleClearAll = () => {
    setLines([]);
  };

  const useDoubleClick = (callback, delay = 300) => {
    const timerRef = useRef(null);

    const handleClick = (event) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        callback(event, true); // Handle double click
      } else {
        timerRef.current = setTimeout(() => {
          callback(event, false); // Handle single click
          timerRef.current = null;
        }, delay);
      }
    };

    return handleClick;
  };

  const handleStageClick = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();

    if (clickedOnEmpty) {
      setSelectedShapeId(null);
    }
  };

  const handleShapeClick = (shapeId) => {
    const clickedShape = lines[shapeId];

    if (clickedShape.tool === "protractor") {
      // For protractor shapes, open the protractor modal
      setProtractorModalOpen(true);
      setSelectedShapeId(shapeId); // Also select the protractor
    } else {
      // For other shapes, toggle selection
      setSelectedShapeId((prevShapeId) =>
        prevShapeId === shapeId ? null : shapeId
      );
    }
  };

  const handleDoubleClick = (event, isDoubleClick) => {
    if (isDoubleClick) {
      // Handle double-click (e.g., delete logic)
      if (lastClickedShapeIdRef.current !== null) {
        // If the last clicked shape is not null, it means we have a valid double-click
        setLines((prevLines) =>
          prevLines.filter(
            (_, index) => index !== lastClickedShapeIdRef.current
          )
        );
      }
      // Reset the last clicked shape and timestamp references
      lastClickedShapeIdRef.current = null;
      lastClickedTimestampRef.current = 0;
    } else {
      // Handle single click
      // Get the current timestamp
      const currentTimestamp = Date.now();
      // Check if the same shape was clicked within the double click interval (e.g., 300 milliseconds)
      if (
        lastClickedShapeIdRef.current === event.target.index &&
        currentTimestamp - lastClickedTimestampRef.current <= 300
      ) {
        // If the same shape was clicked within the interval, treat it as a double-click
        handleDoubleClick(event, true);
      } else {
        // Otherwise, handle it as a single-click
        const shapeId = event.target.index;

        if (Object.prototype.hasOwnProperty.call(lines, 'shapeId')) {
          // Ensure that the shapeId is a valid index in the lines array
          const clickedShape = lines[shapeId];
          if (clickedShape.tool === "protractor") {
            // For protractor shapes, open the protractor modal
            setProtractorModalOpen(true);
            setSelectedShapeId(shapeId); // Also select the protractor
          } else {
            // For other shapes, toggle selection
            setSelectedShapeId((prevShapeId) =>
              prevShapeId === shapeId ? null : shapeId
            );
          }

          // Update the last clicked shape and timestamp references
          lastClickedShapeIdRef.current = shapeId;
          lastClickedTimestampRef.current = currentTimestamp;
        }
      }
    }
  };

  // Handle protractor modal submit
  const handleProtractorModalSubmit = () => {
    const selectedLine = lines[selectedShapeId];

    if (selectedLine && protractorAngle && protractorLength) {
      // Get the coordinates of the selected endpoint
      const startX = selectedLine.points[0];
      const startY = selectedLine.points[1];
      const endX = selectedLine.points[2];
      const endY = selectedLine.points[3];

      // Calculate the angle and length based on the selected endpoint
      const radians = (protractorAngle * Math.PI) / 180;
      const deltaX =
        selectedLineEndpoint === "left" ? startX - endX : endX - startX;
      const deltaY =
        selectedLineEndpoint === "left" ? startY - endY : endY - startY;

      // Calculate the new point coordinates
      const x = selectedLineEndpoint === "left" ? endX + protractorLength * Math.cos(radians) : startX + protractorLength * Math.cos(radians);
    const y = selectedLineEndpoint === "left" ? endY + protractorLength * Math.sin(radians) : startY + protractorLength * Math.sin(radians);

    // Draw a line from the selected endpoint to the new point
    const newLines = [
      ...lines,
      {
        tool: "line",
        points: [endX, endY, x, y],
        color: "blue",
        strokeWidth: 2,
      },
      { tool: "point", x, y, radius: 5, color: "red", strokeWidth: 0 },
    ];
    setLines(newLines);
    setSelectedShapeId(newLines.length - 1); // Select the newly drawn point
  }

  setProtractorModalOpen(false);
  setSelectedLineEndpoint("left");
};

  const handleShapeDoubleClick = () => {
    if (selectedShapeId !== null) {
      const clickTimeDiff = Date.now() - longPressTimestamp;
      if (clickTimeDiff < 500) {
        // Reset long-press timestamp after processing double-click
        setLongPressTimestamp(0);
      } else {
        // If it's a valid double-click, delete the shape
        const updatedLines = lines.filter(
          (_, index) => index !== selectedShapeId
        );
        setLines(updatedLines);
        setSelectedShapeId(null);
      }
    }
  };

  const handleShapeMouseUp = () => {
    setIsLongPress(false);
    setLongPressTimestamp(0);
  };

  const handleShapeMouseDown = () => {
    setIsLongPress(true);
    setLongPressTimestamp(Date.now());
  };

  const handleShapeChange = (selectedTool) => {
    // Close any open modals
    setCircleModalOpen(false);
    setTriangleModalOpen(false);
    setRectangleModalOpen(false);
    setLineModalOpenCm(false); 

    // Reset state related to each shape tool
    setCircleRadius(0);
    setTriangleSideA(0);
    setTriangleSideB(0);
    setTriangleSideC(0);
    setTriangleType("scalene");
    setRectangleWidth(0);
    setRectangleHeight(0);
    setLineLengthCm(0); // Reset the line length

    // Set the new drawing tool
    setTool(selectedTool);

    // Open the corresponding modal if applicable
    if (selectedTool === "circle") {
      setCircleModalOpen(true);
    } else if (selectedTool === "triangle") {
      setTriangleModalOpen(true);
    } else if (selectedTool === "rectangle") {
      setRectangleModalOpen(true);
    } else if (selectedTool === "line") {
      setLineModalOpenCm(true);
    } else if (selectedTool === "protractor") {
      setProtractorModalOpen(true);
    setSelectingLineForProtractor(true); 
    setSelectedShapeId(null)
    } else {
      setTool(selectedTool);
    }
  };

  const drawShapeOnCanvas = (ctx) => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    let height = 0;


    lines.forEach((line) => {
      if (line && line.tool) {
        switch (line.tool) {
          case "rectangle":
            ctx.beginPath();
            ctx.rect(line.x, line.y, line.width, line.height);
            ctx.stroke();
            break;

          case "circle":
            ctx.beginPath();
            ctx.arc(line.x, line.y, line.radius, 0, 2 * Math.PI);
            ctx.stroke();
            break;

          case "line":
            ctx.beginPath();
            ctx.rect(line.x, line.y, line.width, line.height);
            ctx.stroke();
            break;

          case "triangle":
            ctx.beginPath();
            ctx.moveTo(line.x, line.y);

            // Calculate the height for different triangle types
            if (line.type === "equilateral") {
              height = (Math.sqrt(3) / 2) * line.sideA;
            } else if (line.type === "isosceles") {
              height = Math.sqrt(
                line.sideA * line.sideA - (line.sideB * line.sideB) / 4
              );
            } else {
              // Scalene triangle height calculation using Heron's formula
              const s = (line.sideA + line.sideB + line.sideC) / 2;
              height =
                (2 *
                  Math.sqrt(
                    s * (s - line.sideA) * (s - line.sideB) * (s - line.sideC)
                  )) /
                line.sideA;
            }

            ctx.lineTo(line.x + line.sideA, line.y);
            ctx.lineTo(line.x + line.sideA / 2, line.y - height);
            ctx.closePath();
            ctx.stroke();
            break;

          case "protractor":
            if (line.points.length === 4) {
              const [x1, y1, x2, y2] = line.points;
              const angle = line.angle || protractorAngle;
              const length = line.length || protractorLength;
              const angleInRadians = Math.atan2(y2 - y1, x2 - x1);
              const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();

              const protractorRadius = 50; // You can adjust the size of the protractor here
              ctx.arc(x1, y1, protractorRadius, 0, angleInRadians, false);
              ctx.stroke();

              const angleInDegrees = (angleInRadians * 180) / Math.PI;
              ctx.font = "12px Arial";
              ctx.fillText(`${angleInDegrees.toFixed(2)}°`, x1 + 10, y1 - 10);

              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x1 + protractorRadius, y1);
              ctx.stroke();

              ctx.beginPath();
              ctx.moveTo(x2, y2);
              ctx.lineTo(x2 + protractorRadius, y2);
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(x2, y2, protractorRadius, 0, Math.PI * 2);
              ctx.stroke();
            }
            break;

          default:
            break;
        }
      }
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    const context = canvas.getContext("2d");

    drawShapeOnCanvas(context); // Use the updated drawShapesOnCanvas method here to draw all shapes

    return () => {
      // Cleanup
    };
  }, [lines, shapes]);

  return (
    <div className="drawing-app-container">
      <section className="tools-container">
        <h2 className="tools-title">Tools</h2>
        <div className="tools-list">
          <ul className="options">
            <li
              className={`options tool ${tool === "pencil" ? "active" : ""}`}
              onClick={() => handleShapeChange("pencil")}
            >
              <img src={brushIcon} alt="" />
              <span>Brush</span>
            </li>
            <li
              className={`options tool ${tool === "eraser" ? "active" : ""}`}
              onClick={() => handleShapeChange("eraser")}
            >
              <img src={eraserIcon} alt="" />
              <span>Eraser</span>
            </li>
            <li
              className={`options tool ${tool === "line" ? "active" : ""}`}
              onClick={() => handleShapeChange("line")}
            >
              <img src={lineIcon} alt="" />
              <span>Line</span>
            </li>
            <li
              className={`options tool ${tool === "circle" ? "active" : ""}`}
              onClick={() => handleShapeChange("circle")}
            >
              <img src={circleIcon} alt="" />
              <span>Circle</span>
            </li>
            <li
              className={`options tool ${tool === "triangle" ? "active" : ""}`}
              onClick={() => handleShapeChange("triangle")}
            >
              <img src={triangleIcon} alt="" />
              <span>Triangle</span>
            </li>
            <li
              className={`options tool ${tool === "rectangle" ? "active" : ""}`}
              onClick={() => handleShapeChange("rectangle")}
            >
              <img src={rectangleIcon} alt="" />
              <span>Rectangle</span>
            </li>
            <li
              className={`options tool ${tool === "compass" ? "active" : ""}`}
              onClick={() => handleShapeChange("compass")}
            >
              <img src={compassIcon} alt="" />
              <span>Compass</span>
            </li>
            <li
              className={`options tool ${
                tool === "protractor" ? "active" : ""
              }`}
              onClick={() => handleShapeChange("protractor")}
            >
              <img src={protractorIcon} alt="" />
              <span>Protractor</span>
            </li>
          </ul>
        </div>

        <div className="options">
          <label>Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <label>Size:</label>
          <input
            type="range"
            min={1}
            max={20}
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
          />
        </div>
        <div className="action-buttons">
          <button className="action-btn" onClick={handleUndo}>
            <FaUndo />
          </button>
          <button className="action-btn" onClick={handleClearAll}>
            <FaTrashAlt />
          </button>
        </div>
      </section>
      <div className="canvas-container">
        <Stage
          width={window.innerWidth * 0.8} // Canvas width set to 80% of the screen width
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onDblClick={handleShapeDoubleClick}
          onClick={handleDoubleClick}
        >
          <Layer>
            {lines.map((line, index) => {
              if (line?.tool === "circle") {
                return (
                  <Circle
                    key={index}
                    x={line.x}
                    y={line.y}
                    radius={line.radius}
                    stroke={line.color}
                    strokeWidth={line.strokeWidth}
                    draggable={selectedShapeId === index}
                    onClick={() => handleShapeClick(index)}
                    onTransformEnd={(e) => {
                      const node = e.target;
                      const scaleX = node.scaleX();
                      node.scaleX(1);
                      node.scaleY(1);

                      setLines((prevLines) =>
                        prevLines.map((l, i) => {
                          if (i === index) {
                            return {
                              ...l,
                              x: node.x(),
                              y: node.y(),
                              radius: Math.max(5, l.radius * scaleX),
                            };
                          }
                          return l;
                        })
                      );
                    }}
                  />
                );
              } else if (line?.tool === "triangle") {
                return (
                  <RegularPolygon
                    key={index}
                    x={line.x}
                    y={line.y}
                    sides={3}
                    radius={line.sideA / (2 * Math.sin(Math.PI / 3))}
                    stroke={line.color}
                    strokeWidth={line.strokeWidth}
                    draggable={selectedShapeId === index}
                    onClick={() => handleShapeClick(index)}
                    onTransformEnd={(e) => {
                      const node = e.target;
                      const scaleX = node.scaleX();
                      node.scaleX(1);
                      node.scaleY(1);

                      setLines((prevLines) =>
                        prevLines.map((l, i) => {
                          if (i === index) {
                            return {
                              ...l,
                              x: node.x(),
                              y: node.y(),
                              side: Math.max(5, l.side * scaleX),
                              height:
                                (Math.sqrt(3) / 2) *
                                Math.max(5, l.side * scaleX),
                            };
                          }
                          return l;
                        })
                      );
                    }}
                  />
                );
              } else if (line?.tool === "rectangle") {
                return (
                  <Rect
                    key={index}
                    x={line.x}
                    y={line.y}
                    width={line.width}
                    height={line.height}
                    stroke={line.color}
                    strokeWidth={line.strokeWidth}
                    draggable={selectedShapeId === index}
                    onClick={() => handleShapeClick(index)}
                    onTransformEnd={(e) => {
                      const node = e.target;
                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();
                      node.scaleX(1);
                      node.scaleY(1);

                      setLines((prevLines) =>
                        prevLines.map((l, i) => {
                          if (i === index) {
                            return {
                              ...l,
                              x: node.x(),
                              y: node.y(),
                              width: Math.max(5, l.width * scaleX),
                              height: Math.max(5, l.height * scaleY),
                            };
                          }
                          return l;
                        })
                      );
                    }}
                  />
                );
              } else if (line?.tool === "pencil" || line?.tool === "eraser") {
                return (
                  <Line
                    key={index}
                    points={line.points}
                    stroke={line.tool === "eraser" ? "white" : line.color}
                    strokeWidth={line.strokeWidth}
                    lineCap="round"
                    lineJoin="round"
                    tension={0.5}
                    draggable={selectedShapeId === index || isLongPress} // Allow dragging if selected or during long-press
                    onMouseDown={
                      line.tool === "line"
                        ? handleLineMouseDown
                        : handleShapeMouseDown
                    }
                    onMouseUp={
                      line.tool === "line"
                        ? handleLineMouseUp
                        : handleShapeMouseUp
                    }
                  />
                );
              } else if (line?.tool === "line") {
                return (
                  <Line
                    key={index}
                    points={line.points}
                    stroke={line.tool === "eraser" ? "white" : line.color}
                    strokeWidth={line.strokeWidth}
                    lineCap="round"
                    lineJoin="round"
                    tension={0.5}
                    draggable={selectedShapeId === index || isLongPress}
                    onMouseDown={handleLineMouseDown}
                    onMouseUp={handleLineMouseUp}
                  />
                );
              } else {
                return null;
              }
            })}
            {selectedShapeId !== null && (
              <Transformer
                ref={trRef}
                selectedShapeName={lines[selectedShapeId]?.tool}
                boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            )}
          </Layer>
        </Stage>
      </div>

      {circleModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Circle Radius</h2>
            <div className="input-group">
              <label>Radius (cm):</label>
              <input
                type="number"
                name="circleRadius"
                value={circleRadius}
                onChange={(e) => setCircleRadius(e.target.value)}
              />
            </div>
            <button className="modal-btn" onClick={handleCircleModalSubmit}>
              OK
            </button>
            <button
              className="modal-btn"
              onClick={() => setCircleModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {lineModalOpenCm && (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Line Length (cm)</h2>
            <div className="input-group">
              <label>Length:</label>
              <input
                type="number"
                value={lineLengthCm}
                onChange={(e) => setLineLengthCm(e.target.value)}
              />
            </div>
            <button className="modal-btn" onClick={handleLineModalSubmitCm}>
              OK
            </button>
            <button className="modal-btn" onClick={handleLineModalCancelCm}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {triangleModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Triangle Type</h2>
            <div className="input-group">
              <label>Select type:</label>
              <select
                name="triangleType"
                value={triangleType}
                onChange={(e) => {
                  setTriangleType(e.target.value);
                  setTriangleError(""); // Reset error message when changing type
                  setTriangleSideA(0); // Reset side A when changing type
                  setTriangleSideB(0); // Reset side B when changing type
                  setTriangleSideC(0); // Reset side C when changing type
                }}
              >
                <option value="scalene">Scalene</option>
                <option value="equilateral">Equilateral</option>
                <option value="isosceles">Isosceles</option>
              </select>
            </div>
            {triangleType === "equilateral" && (
              <div className="input-group">
                <label>Side Length (cm):</label>
                <input
                  type="number"
                  name="triangleSideA"
                  value={triangleSideA}
                  onChange={(e) => setTriangleSideA(e.target.value)}
                />
              </div>
            )}
            {triangleType === "isosceles" && (
              <>
                <div className="input-group">
                  <label>Equal Side (cm):</label>
                  <input
                    type="number"
                    name="triangleSideA"
                    value={triangleSideA}
                    onChange={(e) => setTriangleSideA(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Other Side (cm):</label>
                  <input
                    type="number"
                    name="triangleSideB"
                    value={triangleSideB}
                    onChange={(e) => setTriangleSideB(e.target.value)}
                  />
                </div>
              </>
            )}
            {triangleType === "scalene" && (
              <>
                <div className="input-group">
                  <label>Side A (cm):</label>
                  <input
                    type="number"
                    name="triangleSideA"
                    value={triangleSideA}
                    onChange={(e) => setTriangleSideA(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Side B (cm):</label>
                  <input
                    type="number"
                    name="triangleSideB"
                    value={triangleSideB}
                    onChange={(e) => setTriangleSideB(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Side C (cm):</label>
                  <input
                    type="number"
                    name="triangleSideC"
                    value={triangleSideC}
                    onChange={(e) => setTriangleSideC(e.target.value)}
                  />
                </div>
              </>
            )}
            {triangleError && (
              <div className="error-message">{triangleError}</div>
            )}
            <button className="modal-btn" onClick={handleTriangleModalSubmit}>
              OK
            </button>
            <button
              className="modal-btn"
              onClick={() => setTriangleModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {protractorModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Protractor Angle and Length</h2>
            <div className="input-group">
              <label>Angle (degrees):</label>
              <input
                type="number"
                value={protractorAngle}
                onChange={(e) => setProtractorAngle(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Length (pixels):</label>
              <input
                type="number"
                value={protractorLength}
                onChange={(e) => setProtractorLength(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Select Endpoint:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="left"
                    checked={selectedLineEndpoint === "left"}
                    onChange={() => setSelectedLineEndpoint("left")}
                  />
                  Left Endpoint
                </label>
                <label>
                  <input
                    type="radio"
                    value="right"
                    checked={selectedLineEndpoint === "right"}
                    onChange={() => setSelectedLineEndpoint("right")}
                  />
                  Right Endpoint
                </label>
              </div>
            </div>
            <button className="modal-btn" onClick={handleProtractorModalSubmit}>
              OK
            </button>
            <button
              className="modal-btn"
              onClick={() => {
                setProtractorModalOpen(false);
                setSelectedLineEndpoint("left"); // Reset the selected endpoint when closing the dialog box
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {rectangleModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Rectangle Dimensions</h2>
            <div className="input-group">
              <label>Width (cm):</label>
              <input
                type="number"
                name="rectangleWidth"
                value={rectangleWidth}
                onChange={(e) => setRectangleWidth(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Height (cm):</label>
              <input
                type="number"
                name="rectangleHeight"
                value={rectangleHeight}
                onChange={(e) => setRectangleHeight(e.target.value)}
              />
            </div>
            <button className="modal-btn" onClick={handleRectangleModalSubmit}>
              OK
            </button>
            <button
              className="modal-btn"
              onClick={() => setRectangleModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawingApp;
