import React, { useState } from "react";
import "./FileUpload.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:9000/upload", {
        method: "POST",
        body: formData,
      });
      console.log(formData);
      if (response.ok) {
        console.log("File uploaded successfully.");
        alert("File uploaded successfully.");
      } else {
        console.error("Error uploading file.");
        alert("Error uploading file. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="file-upload-container">
      <label htmlFor="file" className="custom-file-input">
        <input type="file" id="file" onChange={handleFileChange} />
        Select File
      </label>
      {file && (
        <div className="selected-file-container">
          <p className="selected-file">Selected file: {file.name}</p>
          <button className="upload-button" onClick={uploadFile}>
            Upload File
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
