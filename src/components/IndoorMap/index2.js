// IndoorMap.js
import React, { useState } from "react";

const IndoorMap = () => {
  // State to store the dimensions of the room (length and width)
  const [roomDimensions, setRoomDimensions] = useState({
    length: 100,
    width: 60,
  });

  // State to store the positions of the gateways
  const [gatewayPositions, setGatewayPositions] = useState([
    { x: 0, y: 0 }, // Gateway 1 position (initially top-left corner)
    { x: roomDimensions.length, y: roomDimensions.width }, // Gateway 2 position (initially bottom-right corner)
  ]);

  // State to store the positions of the prisoners (initialized with random positions)
  const [prisonerPositions, setPrisonerPositions] = useState([
    { id: 1, x: 30, y: 40 },
    { id: 2, x: 70, y: 20 },
    { id: 3, x: 50, y: 50 },
  ]);

  // Function to handle gateway position change
  const handleGatewayPositionChange = (gatewayIndex, newX, newY) => {
    setGatewayPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      newPositions[gatewayIndex] = { x: newX, y: newY };
      return newPositions;
    });
  };

  return (
    <div>
      {/* Render the indoor map here */}
      <div
        style={{
          position: "relative",
          width: roomDimensions.length,
          height: roomDimensions.width,
          border: "1px solid black",
        }}
      >
        {/* Render the gateways */}
        {gatewayPositions.map((position, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: position.x,
              top: position.y,
              width: 10,
              height: 10,
              backgroundColor: "red",
            }}
          />
        ))}

        {/* Render the prisoners */}
        {prisonerPositions.map((prisoner) => (
          <div
            key={prisoner.id}
            style={{
              position: "absolute",
              left: prisoner.x,
              top: prisoner.y,
              width: 10,
              height: 10,
              backgroundColor: "blue",
              borderRadius: "50%",
            }}
          />
        ))}
      </div>

      {/* Provide input fields to update gateway positions */}
      <div>
        <label>Gateway 1 X:</label>
        <input
          type="number"
          value={gatewayPositions[0].x}
          onChange={(e) =>
            handleGatewayPositionChange(
              0,
              parseInt(e.target.value),
              gatewayPositions[0].y
            )
          }
        />
        <label>Gateway 1 Y:</label>
        <input
          type="number"
          value={gatewayPositions[0].y}
          onChange={(e) =>
            handleGatewayPositionChange(
              0,
              gatewayPositions[0].x,
              parseInt(e.target.value)
            )
          }
        />
        <br />
        <label>Gateway 2 X:</label>
        <input
          type="number"
          value={gatewayPositions[1].x}
          onChange={(e) =>
            handleGatewayPositionChange(
              1,
              parseInt(e.target.value),
              gatewayPositions[1].y
            )
          }
        />
        <label>Gateway 2 Y:</label>
        <input
          type="number"
          value={gatewayPositions[1].y}
          onChange={(e) =>
            handleGatewayPositionChange(
              1,
              gatewayPositions[1].x,
              parseInt(e.target.value)
            )
          }
        />
      </div>
    </div>
  );
};

export default IndoorMap;
