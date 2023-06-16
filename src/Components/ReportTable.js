import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import './ReportTable.css';
// import download from 'downloadjs';

const ReportTable = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const storageRef = firebase.storage().ref();
      const filesRef = storageRef.child('uploads');

      const fileList = await filesRef.listAll();

      const filesData = [];

      for (const fileRef of fileList.items) {
        const fileMetadata = await fileRef.getMetadata();
        filesData.push({
          name: fileMetadata.name,
          url: await fileRef.getDownloadURL(),
          ref: fileRef,
        });
      }

      setFiles(filesData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

 

  return (
    <div className='table-parent-container'>

<h1>All Uploaded Files</h1>
    <div className="table-container">
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{file.name}</td>
                <td>
                  <button>
                <a
  className="btn" style={{textDecoration:"none", color:"white"}}
  href="https://drive.google.com/uc?export=download&id=1ElThAvXLf-6SWYES4wwdXRKMPquGCYU5"
  download="YourCV.pdf"
>
  Download 
</a>
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default ReportTable;
