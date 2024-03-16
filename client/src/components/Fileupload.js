import React, { useState } from "react";
import './Sidebar.css';
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";

function FileUpload({account, provider, contract}) {
  const REACT_APP_GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL;
  const REACT_APP_PINATA_JWT_ACCESS_TOKEN = process.env.REACT_APP_PINATA_JWT_ACCESS_TOKEN;
  // const [selectedFile, setSelectedFile] = useState();
  const [cid, setCid] = useState();

  const changeHandler = async (event) => {
    const file = event.target.files[0];
    if (file) {
        await handleSubmission(file); // Pass the file directly to handleSubmission
    }
};

  const handleSubmission = async (file) => {
      try {
          const formData = new FormData();
          formData.append("file", file);
          const metadata = JSON.stringify({
              name: file.name, // Include the file name
              size: file.size, // Include the file size
              type: file.type, // Include the file type
          });
          formData.append("pinataMetadata", metadata);

          const options = JSON.stringify({
              cidVersion: 0,
          });
          formData.append("pinataOptions", options);

          const res = await fetch(
              "https://api.pinata.cloud/pinning/pinFileToIPFS",
              {
                  method: "POST",
                  headers: {
                      Authorization: `Bearer ${REACT_APP_PINATA_JWT_ACCESS_TOKEN}`,
                  },
                  body: formData,
              }
          );
          const resData = await res.json();
          const file_url = `${REACT_APP_GATEWAY_URL}/ipfs/${resData.IpfsHash}`;
          console.log("line before contract");
          const filename = file.name;
          const filesize = file.size;
          console.log(filename);
          console.log(filesize);
          await contract.uploadfile(file_url,filename,filesize);
          console.log("contract executed")
          setCid(resData.IpfsHash);
          console.log(resData);
      } catch (error) {
          console.log(error);
      }
  };

  return (
      <>
          <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={changeHandler}
          />
          <label htmlFor="fileInput" className="upload-button">
              <div className="bx bx-upload icon"></div>
              <span className="text nav-text">Upload</span>
          </label>
      </>
  );
}

export default FileUpload;
