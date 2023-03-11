
const RFQ_Schema = new mongoose.Schema({
    
    dateCreated: {
        type: Date,
        default: Date.now
    },
})

const model = mongoose.model("RFQ", RFQ_Schema);

module.exports = model;