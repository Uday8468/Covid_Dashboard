import React, { useRef, useEffect, useState } from "react";
import image from "./download.png"
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
 
let shapes = [];
let imageUrl = "";
 
const Canvas = () => {
  
  let isDrawing = false;
  let isMoving = false;
  let currentShape = null;
 
  const imageRef = useRef();
  const canvasRef = useRef(null);
  const cropperRef = useRef(null);
  const blurCanvasRef = useRef(null);
 
  const [cropStatus, setCropStatus] = useState(false);
  const [drawingMode, setDrawingMode] = useState(false);
  const [blurSize, setBlurSize] = useState(50);
  const [CroppedImage, setCroppedImage] = useState(null);
 
  
 
  function handleAddShapeMouseDown(e) {
    const mouseX = e.clientX - canvasRef?.current.getBoundingClientRect().left;
    const mouseY = e.clientY - canvasRef?.current.getBoundingClientRect().top;
 
    if (!isMoving) {
      if (drawingMode === "rectangle") {
        currentShape = {
          type: "rectangle",
          startX: mouseX,
          startY: mouseY,
          width: 0,
          height: 0,
          lineWidth: 4,
        };
      } else if (drawingMode === "circle") {
        currentShape = {
          type: "circle",
          centerX: mouseX,
          centerY: mouseY,
          radius: 0,
          lineWidth: 4,
        };
      } else if (drawingMode === "arrow") {
        currentShape = {
          type: "arrow",
          startX: mouseX,
          startY: mouseY,
          endX: mouseX + 50,
          endY: mouseY + 50,
          lineWidth: 4,
        };
      } else if (drawingMode === "blur") {
        currentShape = {
          type: "blur",
          startX: mouseX,
          startY: mouseY,
          size: blurSize,
        };
        isMoving = true;
      }
 
      shapes.push(currentShape)
      isDrawing = true;
 
      canvasRef?.current.addEventListener("mousemove", handleMouseMove);
      canvasRef?.current.addEventListener("mouseup", handleMouseUp);
    }
  }
 
 
  useEffect(() => {
    if (!cropStatus) {
      let img = new Image();
      img.src = imageUrl;
      img.onload = function () {
        canvasRef?.current
          ?.getContext("2d")
          .drawImage(
            img,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
      };
    }
  }, [cropStatus]);
 
  function handleMouseMove(e) {
    if (isDrawing && currentShape) {
      const mouseX =
        e.clientX - canvasRef?.current.getBoundingClientRect().left;
      const mouseY = e.clientY - canvasRef?.current.getBoundingClientRect().top;
 
      if (isMoving) {
        currentShape.startX = mouseX;
        currentShape.startY = mouseY;
        drawShapes();
      } else {
        if (drawingMode === "rectangle") {
          currentShape.width = mouseX - currentShape.startX;
          currentShape.height = mouseY - currentShape.startY;
        } else if (drawingMode === "circle") {
          currentShape.radius = Math.sqrt(
            Math.pow(mouseX - currentShape.centerX, 2) +
              Math.pow(mouseY - currentShape.centerY, 2)
          );
        } else if (drawingMode === "arrow") {
          currentShape.endX = mouseX;
          currentShape.endY = mouseY;
        }
 
        drawShapes();
      }
    }
  }
 
  function handleMouseUp() {
    isDrawing = false;
    isMoving = false;
    currentShape = null;
    setDrawingMode(false);
    imageUrl = canvasRef.current.toDataURL();
    canvasRef?.current.removeEventListener("mousemove", handleMouseMove);
    canvasRef?.current.removeEventListener("mouseup", handleMouseUp);
  }
 
  function drawBlur(ctx, blur) {
    ctx.globalCompositeOperation = "destination-over";
 
    ctx.beginPath();
    ctx.arc(blur.startX, blur.startY, blur.size, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fill();
    ctx.closePath();
 
    ctx.globalCompositeOperation = "source-over";
  }
 
  function drawShapes() {
    const mainCtx = canvasRef?.current?.getContext("2d");
    const blurCtx = blurCanvasRef?.current?.getContext("2d");
 
    mainCtx?.clearRect(
      0,
      0,
      canvasRef?.current.width,
      canvasRef?.current.height
    );
    blurCtx?.clearRect(
      0,
      0,
      blurCanvasRef?.current.width,
      blurCanvasRef?.current.height
    );
 
    shapes.forEach((shape) => {
      if (shape.type === "rectangle") {
        drawRect(mainCtx, shape);
      } else if (shape.type === "circle") {
        drawCircle(mainCtx, shape);
      } else if (shape.type === "arrow") {
        drawArrow(mainCtx, shape);
      } else if (shape.type === "blur") {
        drawBlur(blurCtx, shape);
      }
    });
  }
 
  function drawRect(ctx, rect) {
    ctx.beginPath();
    ctx.rect(rect.startX, rect.startY, rect.width, rect.height);
    ctx.lineWidth = rect.lineWidth;
    ctx.stroke();
    ctx.closePath();
  }
 
  function drawCircle(ctx, circle) {
    ctx.beginPath();
    ctx.arc(circle.centerX, circle.centerY, circle.radius, 0, 2 * Math.PI);
    ctx.lineWidth = circle.lineWidth;
    ctx.stroke();
    ctx.closePath();
  }
 
  function drawArrow(ctx, arrow) {
    const headLength = 21;
    const headWidth = 7;
 
    const angle = Math.atan2(
      arrow.startY - arrow.endY,
      arrow.startX - arrow.endX
    );
    const arrowX = arrow.startX - headLength * Math.cos(angle);
    const arrowY = arrow.startY - headLength * Math.sin(angle);
 
    ctx.beginPath();
    ctx.moveTo(arrow.endX, arrow.endY);
    ctx.lineTo(arrow.startX, arrow.startY);
 
    ctx.lineTo(
      arrowX + headWidth * Math.cos(angle - Math.PI / 2),
      arrowY + headWidth * Math.sin(angle - Math.PI / 2)
    );
    ctx.lineTo(arrow.startX, arrow.startY);
    ctx.lineTo(
      arrowX + headWidth * Math.cos(angle + Math.PI / 2),
      arrowY + headWidth * Math.sin(angle + Math.PI / 2)
    );
    ctx.lineWidth = arrow.lineWidth;
    ctx.stroke();
    ctx.closePath();
  }
 
  const handleMouseClick = (event) => {
    const mouseX =
      event.clientX - canvasRef.current.getBoundingClientRect().left;
    const mouseY =
      event.clientY - canvasRef.current.getBoundingClientRect().top;
 
    const clickedShape = shapes.find(
      (shape) =>
        mouseX >= shape.startX &&
        mouseX <= shape.startX + shape.width &&
        mouseY >= shape.startY &&
        mouseY <= shape.startY + shape.height
    );
 
    if (clickedShape) {
      isMoving = true;
      currentShape = clickedShape;
      shapes = shapes.filter((shape) => shape !== clickedShape);
      shapes.push(clickedShape);
      drawShapes();
    }
  };
 
  useEffect(() => {
    if (drawingMode) {
      canvasRef.current.addEventListener("mousedown", handleAddShapeMouseDown);
      canvasRef.current.addEventListener("mousemove", handleMouseMove);
      canvasRef.current.addEventListener("mouseup", handleMouseUp);
    } else {
      canvasRef.current.addEventListener("mousedown", handleMouseClick);
    }
 
    return () => {
      canvasRef.current.removeEventListener(
        "mousedown",
        handleAddShapeMouseDown
      );
      canvasRef.current.removeEventListener("mousemove", handleMouseMove);
      canvasRef.current.removeEventListener("mouseup", handleMouseUp);
    };
  }, [drawingMode]);
 
 
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      let cropedImage = cropper.getCroppedCanvas().toDataURL();
      setCroppedImage(cropedImage);
    }
  };
 
  const handleClear = () => {
    shapes = [];
    setCropStatus(false);
    imageUrl=""
    setCroppedImage(""
    );
    drawShapes();
  }
 
  const handleDownload = () => {
    if (CroppedImage) {
      const link = document.createElement("a");
      link.href = CroppedImage;
      link.download = "cropped_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
 
  return (
    <>
      <div
        style={{
          position: "relative",
          height: "600px",
          width: "800px",
        }}
      >
        {cropStatus ? (
          <Cropper
            ref={cropperRef}
            src={image}
            style={{ height: "600px", width: "800px", zIndex: "999" }}
            aspectRatio={1}
            viewMode={0}
            guides={true}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkCrossOrigin={false}
            checkOrientation={false}
            zoomOnWheel={true}
            cropBoxMovable={true}
            cropBoxResizable={true}
            toggleDragModeOnDblclick={true}
            crop={onCrop}
          />
        ) : (
          <img
            src={image}
            ref={imageRef}
            alt="example"
            style={{ width: "800px", height: "600px" }}
          />
        )}
        {!cropStatus && (
          <canvas
            ref={canvasRef}
            id="canvas"
            width="800"
            height="600"
            style={{ position: "absolute", top: 0, left: 0 }}
          ></canvas>
        )}
 
        {!cropStatus && (
          <canvas
            ref={blurCanvasRef}
            id="blurCanvas"
            width="800"
            height="600"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
            }}
          ></canvas>
        )}
 
        <div>
          <button
            onClick={() => {
              setCropStatus(false);
              setDrawingMode("arrow");
            }}
          >
            Add Arrow
          </button>
          <button onClick={() => setDrawingMode("rectangle")}>
            Add Rectangle
          </button>
          <button onClick={() => setDrawingMode("circle")}>Add Circle</button>
          <button
            onClick={() => {
              setDrawingMode("blur");
            }}
          >
            Blur
          </button>
          <input
            type="range"
            min="1"
            max="100"
            value={blurSize}
            onChange={(e) => setBlurSize(parseInt(e.target.value))}
          />
 
          <button
            onClick={() => {
              // console.log(canvasRef.current.toDataURL())
              setCropStatus(!cropStatus);
            }}
          >
            {cropStatus ? "Uncrop Image" : "Crop Image"}
          </button>
 
          <button onClick={handleDownload}>Download Cropped Image</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        
        {CroppedImage && cropStatus && (
          <img
            src={CroppedImage}
            alt="preview"
            style={{ position: "relative", width: "600px", height: "400px" }}
          />
        )}
      </div>
    </>
  );
};
 
export default Canvas;