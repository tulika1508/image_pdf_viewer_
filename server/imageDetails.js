const mongoose=require("mongoose");

const ImageDetailsSchema=new mongoose.Schema(
    {
        image:String
    },
    {
        collection:"ImageDetails",
    }
);
const ImageDetails = mongoose.model("ImageDetails",ImageDetailsSchema);
// mongoose.model("ImageDetails",ImageDetailsSchema);
module.exports = ImageDetails;