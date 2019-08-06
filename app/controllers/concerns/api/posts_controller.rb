

class Api::PostsController < ApplicationController 

    def index
        if params[:type] == "wall" 
            @posts = User.includes(wall_posts: [:author, :comments]).find(params[:user_id]).wall_posts
        else 
            @posts = User.includes(:authored_posts, [:author] ).find(params[:user_id]).authored_posts
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
        post = current_user.posts.find(params[:id])
        post.destroy
    end

    def update 

    end

    private 
    def post_params 
        params.require(:post).permit(:body, :wall_id)
    end
end