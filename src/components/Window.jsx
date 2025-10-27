import '../styles/desktop.css'
import { useState, useRef } from "react";

export default function Window({ title, children, onClose, x, y, width = 400, height = 300 }) {
  const windowRef = useRef(null);
  const [pos, setPos] = useState({ x: x, y: y });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseDown(e) {
    setDragging(true);
    setOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  }

  function handleMouseMove(e) {
    if (dragging) {
      setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  }

  function handleMouseUp() {
    setDragging(false);
  }



  return (
    <div
      class="window"
      ref={windowRef}
      style={{ top: pos.y, left: pos.x, zIndex: 10, userSelect: "none" , width: width + 'px', height: height + 'px'}}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
      onMouseDown={handleMouseDown}
      class="window-header"
      >
        <span>{title}</span>
        <button
          onClick={onClose}
          class="close-button"
        >
          ✕
        </button>
      </div>

      <div class="window-content">
        {children}
      </div>
    </div>
  );
}
