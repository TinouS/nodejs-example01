
/**
 * Created by mac on 29/10/2016.
 */
/**
 * class Post for manage posts
 * @type {any}
 */

var post = require('./postShema');

class Post{

    /**
     * this function add a content in post collection
     * @param content : the content to add
     */
    static create(content){

        var newPost = new post({
            message: content,
            date: new Date()
        });

        newPost.save(function (err) {
            if (err) {
                throw err;
            }
        });
    }

    /**
     * this function get all post in post collection
     * @param cb callback function to get users
     */
    static getAllPosts(cb){
        post.find({},function(err,users){
            if(err) throw err;
            cb(users); // callback
        })
    }
}

// to make it accessible in app.

module.exports = Post