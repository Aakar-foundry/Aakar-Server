const { default: mongoose } = require("mongoose");

const RFQ_Schema = new mongoose.Schema({


    finished_WT: {
        type: Number,
        required: [true, "Please provide a Finished Machined weight in Kg"]
    },
    net_Raw_Casting: {
        type: Number,
        required: [true, "Please provide a Finished Machined weight in Kg"]
    },
    part_SurfaceArea: {
        type: Number,
        required: [true, "Please provide a Part Surface Area - in MM Square"]
    },
    die_Casting_Process: {
        type: String,
        required: [true, "Please provide a Die-Casting Process"]
    },
    no_Of_Impressions_Or_Cavities: {
        type: String,
        required: [true, "Please provide a No. of Impressions or Cavities"]
    },
    alternative_RawMaterial_Suggested_By_Aakar: {
        type: String,
        required: [true, "Please provide a Alternative Raw Material Suggested By Aakar"]
    },
    die_cost: {
        type: String,
        required: [true, "Please provide a Die cost (Rs Lakhs)"]
    },
    core_Box_Cost: {
        type: String,
        required: [true, "Please provide a Core Box Cost"]
    },
    expected_Die_Life: {
        type: String,
        required: [true, "Please provide a Expected Die Life (Shots)"]
    },
    die_Manufacturing_Period_In_Weeks: {
        type: String,
        required: [true, "Please provide a Die Manufacturing Period in Weeks"]
    },
    no_Of_Shots: {
        type: String,
        required: [true, "Please provide a No of shots/Hr"]
    },
    no_Of_Sand_Cores: {
        type: String,
        required: [true, "Please provide a No. of Sand Cores Required"]
    },
    total_Sand_Weight: {
        type: String,
        required: [true, "Please provide a Total Sand Weight (Kg)"]
    },
    machine_Type: {
        type: String,
        required: [true, "Please provide a Machine Type - CNC/VMC/HMC Please Specify"]
    },
    machining_Cost: {
        type: String,
        required: [true, "Please provide a Machining cost (Rs/Pc)"]
    },
    machining_Fixture_Cost: {
        type: String,
        required: [true, "Please provide a Machining Fixture cost (One time Inv)"]
    },
    inspection_Gauges_Cost: {
        type: String,
        required: [true, "Please provide a Inspection Gauges Cost"]
    },
    leak_Teasting_Fixture_Cost: {
        type: String,
        required: [true, "Please provide a Leak testing fixture cost"]
    },
    washing_Fixture_Cost: {
        type: String,
        required: [true, "Please provide a Leak Washing fixture cost"]
    },
    plastic_Protection_Cap_Costs: {
        type: String,
        required: [true, "Please provide a Leak Plastic Protection Cap Costs (Specify Quantity & Cost)"]
    },
    packaging_Cost: {
        type: String,
        required: [true, "Please provide a Leak Packaging Cost-(Corrugated/PP/Plastic/Exports Grade"]
    },
    first_Smaple_Date: {
        type: String,
        required: [true, "Please provide a Leak First Sample Date"]
    },
    PSW_PPAP_Date: {
        type: String,
        required: [true, "Please provide a PSW /PPAP Date"]
    },
    capital_Investment_For_Machines: {
        type: String,
        required: [true, "Please provide a Capital Investment for machines"]
    },
    part_Feasible: {
        type: String,
        required: [true, "Please provide a Part Feasible"]
    },
    feasible_With_Changes: {
        type: String,
        required: [true, "Please provide a Feasible with changes"]
    },
    part_Not_Feasible: {
        type: String,
        required: [true, "Please provide a Part Not Feasible"]
    },
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