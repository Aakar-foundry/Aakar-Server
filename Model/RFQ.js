
const RFQ_Schema = new mongoose.Schema({
    
    dateCreated: {
        type: Date,
        default: Date.now
    },
    status:{
        type:String,
        default: "Pending"
    },
    remark:{
        type:String,
        
    },
    rfqID:{
        type : String,
        required:[true, "Please provide an ID"]
    },
    part_Name:{
        type: String,
        required:[true, "Please provide part name"]
    },
    part_Number_Mach:{
        type: Number,
        required:[true, "Please provide part number mach"]
    },
    part_Number_Cast:{
        type: String,
        required:[true, "Please provide part number cast"]
    },
    project_Name:{
        type:String,
        required:[true, "please provide project name"]
    },
    enquiry_No:{
        type:Number,
        required:[true, "please provide enquiry number"]
    },
    quantity_Per_Annum:{
        type:Number,
        required:[true, "please provide Quantity"]
    },
    product_Life:{
        type:Number,
        required:[true, "please provide Quantity"]
    },
    process_Required:{
        type:string,
        required:[true, "please provide Quantity"]
    },
    aluminium_Aloy_Specifications:{
        type:Number,
        required:[true, "please provide Quantity"]
    },
    machined:{
        type:Boolean,
        required:[true, "Please select one option"]
    },
    specific_Product_QC:{
        type:String,
        required:[true, "please provide Quantity"]
    },
    shot_Blasting:{
        type:String,
        required:[true, "please provide Quantity"]
    },
    anodizing_Chromotising:{
        type:String,
        required:[true, "please choose valid option"]
    },
    powder_Coating:{
        type:String,
        required:[true, "please provide powder coating color"]
    },
    bought_out_Material_Details:{
        type:Number,
        required:[true, "please provide Quantity"]
    },
    leak_Testing:{
        type: Boolean,
        required:[true, "Please select leak testing option"]
    },
    pressure_Testing:{
        type:Boolean,
        required:[true, "Please select pressure testing option"]
    },
    impregnation:{
        type:Boolean,
        required:[true, "Please select impregnation option"]
    },
    heat_Treatment:{
        type:Boolean,
        required:[true, "Please select heat treatment option"]
    },
    packaging:{
        type:Boolean,
        required:[true, "Please select packaging option"]
    },
    delvery_Location:{
        type:String,
        required:[true, "Please select packaging option"]
    },
    ex_Works:{
        type:String,
        required:[true, "Please select ex works option"]
    },
    destination_Port:{
        type:String,
        required:[true, "Please select packaging option"]
    },
    quote_Currency:{
        type:Number,
        required:[true, "Please select packaging option"]
    },
})

const model = mongoose.model("RFQ", RFQ_Schema);

module.exports = model;