import React, { useState, useEffect } from "react";

export default function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [speed, setSpeed] = useState(0);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0, t: Date.now() });
  const [showArrow, setShowArrow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [lostCount, setLostCount] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);

  const cursors = [
    "url('https://cur.cursors-4u.net/food/foo-1/foo81.cur'), auto",
    "url('https://cur.cursors-4u.net/animals/ani-12/ani1139.cur'), auto",
    "url('https://cur.cursors-4u.net/sports/spo-6/spo526.cur'), auto",
    "url('https://cur.cursors-4u.net/nature/nat-10/nat964.cur'), auto"
  ];
  const [cursorStyle, setCursorStyle] = useState("auto");

  useEffect(() => {
    fetch("http://localhost:5000/lost")
      .then(res => res.json())
      .then(data => setLostCount(data.totalLost))
      .catch(err => console.error(err));
  }, []);

  const handleMouseMove = (e) => {
    const now = Date.now();
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    const dt = (now - lastPos.t) / 1000;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Update total distance traveled
    setTotalDistance(prev => prev + dist);

    setSpeed(Math.round(dist / dt));
    setLastPos({ x: e.clientX, y: e.clientY, t: now });
    setPos({ x: e.clientX, y: e.clientY });

    if (Math.random() < 0.005) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleLostFound = () => {
    setShowArrow(true);
    setTimeout(() => setShowArrow(false), 2000);

    fetch("http://localhost:5000/lost", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => setLostCount(data.totalLost))
      .catch(err => console.error(err));
  };

  const changeCursor = () => {
    const random = cursors[Math.floor(Math.random() * cursors.length)];
    setCursorStyle(random);
  };

  const getSpeedLabel = () => {
    if (speed < 100) return "🐌 Snail Mode";
    if (speed < 300) return "🚶 Casual Walk";
    if (speed < 800) return "🚗 Car Speed";
    return "🚀 Rocket Mode";
  };

  return (
    <div
      className="app"
      onMouseMove={handleMouseMove}
      onClick={changeCursor}
      style={{ cursor: cursorStyle }}
    >
      <h1>🎯 Mouse Locator 3000</h1>
      <p>Position: X: {pos.x}px | Y: {pos.y}px</p>
      <p>Speed: {speed}px/s — {getSpeedLabel()}</p>
      <p>Total Distance Traveled: {Math.round(totalDistance)} pixels 🏃‍♂️</p>

      <button onClick={handleLostFound} className="lost-btn">Lost & Found</button>
      <p>🖱 Total Mice Lost Globally: {lostCount}</p>

      <div
        className="radar"
        style={{ left: pos.x - 25, top: pos.y - 25 }}
      ></div>

      {showArrow && (
        <div
          className="arrow"
          style={{ left: pos.x, top: pos.y - 50 }}
        >
          ⬇️
        </div>
      )}

      {showError && (
        <div className="error-popup">
          <h2>⚠️ CRITICAL MOUSE ERROR</h2>
          <p>Mouse is trying to escape the monitor! Please hold it back.</p>
        </div>
      )}
    </div>
  );
}