import React from "react";
import CopyImg from "assets/images/copy.svg";
import "styles/room-code.scss";

type RoomCodeProps = {
  code: string;
};

export const RoomCode = ({ code }: RoomCodeProps) => {
  const copyRoomCodeClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <button className="room-code" onClick={copyRoomCodeClipboard}>
      <div>
        <img src={CopyImg} alt="Copy room code" />
      </div>
      <span>Sala {code}</span>
    </button>
  );
};
