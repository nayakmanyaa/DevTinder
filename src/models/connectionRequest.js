const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is not a valid gender types`,
        }
    }
}, { timestamps: true })

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }) // indexing in ascending order, -1 for descending

connectionRequestSchema.pre("save", function () {
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection request to yourself")
    }
})

const connectionRequestModel = new mongoose.model("connectionRequest", connectionRequestSchema);

module.exports = connectionRequestModel;