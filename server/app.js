const express = require("express");
const app = express();
const cors=require("cors");
const mongoose=require("mongoose");
const ImageDetails = require('./imageDetails');
const PdfDetails = require('./pdfDetails');
app.use(cors());
app.use(express.json());

app.use("/files", express.static("files"));

mongoose.connect("mongodb://localhost:27017/image", {
    useNewUrlParser: true    
  })
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });
// require("./imageDetails");

// const Image=mongoose.model("ImageDetails");

app.get("/", async(req,res)=>{
  res.send({"Hi" : "From server"})
})

const multer  = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix+file.originalname);
  },
});

const upload = multer({ storage: storage })

app.post("/upload-image",upload.single("image"), async(req,res)=>{
    //console.log(req.body);
    //res.send("Uploaded");
    const imageName = req.file.filename;

  try {
    //console.log("hi");
    await ImageDetails.create({ image: imageName });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
    /*
    const {base64}=req.body
    try{
        console.log("Recieved");
        await ImageDetails.create({image:base64});
        res.send({Status:"ok"});
        res.end();
    }catch(error){
      console.log(error)
        res.send({Status:"error",data:error});
        res.end();
    }*/
});

app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await PdfDetails.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-files", async (req, res) => {
  try {
    PdfDetails.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});

app.get("/get-image", async (req, res) => {
  try {
    ImageDetails.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
});

app.listen(5000,console.log("server starts on 5000"));