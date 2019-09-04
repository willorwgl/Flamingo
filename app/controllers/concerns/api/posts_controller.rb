

class Api::PostsController < ApplicationController 

    def index
        if params[:type] == "wall" 
            @posts = Post.includes(
                comments: [author: [profile_photo_attachment: [:blob]]],
                 author: [profile_photo_attachment: [:blob]])
                 .where(wall_id: params[:user_id])
        elsif params[:type] = "newfeed" 
            ids = current_user.friends.pluck(:friend_id, :user_id) << current_user.id
            ids = ids.flatten.uniq
            @posts = Post.includes(
                comments: [author: [profile_photo_attachment: [:blob]]],
                author: [profile_photo_attachment: [:blob]]).where(author_id: ids)
        else
            @posts = Post.includes(authored_posts: [:author]).where(author_id: params[:user_id])
        end
        render :index
    end


    def create
        @post = current_user.authored_posts.new(post_params)
        if @post.save
            render :show
        else
            render json: {message: "Invalid post"}, status: 422
        end
    end

    def destroy
        post = current_user.authored_posts.find(params[:id])
        post.destroy
    end

    def update 
        @post = current_user.authored_posts.find(params[:id])
        if @post.update(post_params)
            render :show
        else
            render json: {message: "Invalid post"}, status: 422
        end
    end

    private 
    def post_params 
        params.require(:post).permit(:body, :wall_id, post_tags: [], photos: [])
    end
end