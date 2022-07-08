const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');



const ReplySchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: true,
            trim: true
        },
        writtenBy: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
          getters: true
        }
    }
);



const CommentSchema = new Schema(
    {
    writtenBy: {
        type: String,
        required: true,
        trim: true
    },
    commentBody: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    // use ReplySchema to validate data for a reply
    replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);



const Comment = model('Comment', CommentSchema);



// get total count of comments and replies on retrieval
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});



module.exports = Comment;