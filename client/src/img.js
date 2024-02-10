import React, {useState,useEffect} from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import  {useNavigate}  from 'react-router-dom';
import css from "./App.css";
import axios from "axios";
import Compressor from 'compressorjs';
import imageCompression from 'browser-image-compression';
import Pdf from "./pdf.js";

function App() {
  
  
  const navigate= useNavigate();

  let[image,setImage]=useState(null);
  const [allImage, setAllImage] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  
  useEffect(() => {
    getImage();
  }, []);

  const submitImage=async(e)=>{
    //console.log("hi");
    /*fetch("http://localhost:5000/upload-image",{
      method:"POST",
      // crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        // Accept:"application/json",
        // "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify(
        {base64 : image},
      )
    }).then((res)=>res.json()).then((data)=>console.log(data))*/
    
    //console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
       // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        
        // try {
        //   const compressedFile = await imageCompression(imageFile, options);
        //   console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        //   console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        //   await uploadToServer(compressedFile); // write your own logic
        // } catch (error) {
        //   console.log(error);
        // }
        //const Compressedimage = ;
        // const MAX_IMAGE_SIZE=4000;
        // if (image.bitmap.length > MAX_IMAGE_SIZE) {
        //   image.quality(80); // some value of 'quality'
        // }
    e.preventDefault(); 
    const formData = new FormData();
    formData.append("image", image);
    const result = await axios.post(
      "http://localhost:5000/upload-image",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

  };

  function onInputChange(e){
    const options = {
      maxSizeMB: 4,
      maxWidthOrHeight: 300,
      useWebWorker: true
    }
    //let output;
    console.log(e.target.files[0]);
    let originalImage=e.target.files[0];
    originalImage=imageCompression(e.target.files[0], options);
    setImage(originalImage);
    //console.log("hjhh");
    // var reader=new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload=()=>{
      // console.log(reader.result);
      // setImage(reader.result);
    // }
    // reader.onerror=error=>{
      // console.log("Error: ",error);
    // }
  };

  async function handleImageUpload(event) {

    const imageFile = event.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
  
    const options = {
      maxSizeMB: 4,
      maxWidthOrHeight: 300,
      useWebWorker: true,
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
  
      setImage(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }
  
  }

  const getImage = async () => {
    const result = await axios.get("http://localhost:5000/get-image");
    console.log("image here");
    setAllImage(result.data.data);
  };

  return (
    
    <div>
      <div className='title'>Image Viewer</div>
      <button className="pddf"onClick={()=>navigate("/pdf")}>Pdf Viewer</button>
      <form className="box" onSubmit={submitImage}>
        <h4>Upload the image:</h4>
        <input type="file" accept="image/*" onChange={handleImageUpload}></input>
        <button type="submit">Submit</button>
        <br></br>
        <div className='img'>
        {
        allImage == null? "": allImage.map((data) => {
            return (
              <img
                src={require(`../../server/files/${data.image}`)}
                height={300}
                width={300}
              />
            );
          })
        }
        </div>
        
      </form>
      
    </div>
    /*
    <div className="auth-wrapper">
      <div className='title'>Image Viewer</div>
      <div className="auth-inner" style={{width:"auto"}}>
      Let's upload image
      <input accept='image/' type="file" onChange={onInputChange}/>
      {image=="" || image==null?"":<img width={100} height={100} src={image}/>}
      <button onClick={submitImage}>Upload</button>
      </div>
    </div>*/
  );
}

export default App;
