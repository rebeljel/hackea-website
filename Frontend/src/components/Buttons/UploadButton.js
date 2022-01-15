import React from "react";

function UploadButton() {
  return (
    <div className="m-3">
      <label>Wähle eine Datei: </label>
      <input className="d-none" type="file" />
      <button className="btn text-dark btn-reg rounded-pill m-2">Hochladen</button>
    </div>
  );
}

export default UploadButton;