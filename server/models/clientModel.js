import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    birthdate: {
        type: Date
    },
    age: {
        type: Number
    },
    membershipStatus: {
        type: String,
        enum: ["active", "inactive"]
    },
    waiver: {
        type: Boolean
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },

    clientSessionCounter: {
        type: Number,
        default: 0,
    },

    clientExpiresIn: {
        type: Date,
    },
    
    sessions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Attendance'
    }],
    
    documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClientDocument'
    }]

},{timestamps: true}
);

export default mongoose.model('Client', ClientSchema)