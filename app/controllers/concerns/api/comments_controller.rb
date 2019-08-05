class Api::CommentsController < ApplicationController


    def index
        @comments = Comment.where(post_id: params[:post_id])
        render :index
    end

    def destroy
        @comment = current_user.comments.find(params[:comment_id])
        @comment.destroy
    end

    def update
        @comment = current_user.comments.find(params[:comment_id])
        if @comment.update(params[:comment][:body])
            render :show
        else
            render json: ["Invalid Comment"], status: 422
        end
    end

    def create 
        @comment = current_user.comments.new(comment_params)   
  
        if @comment.save 
            render :show
        else
            render message: "Invalid Comment", status: 422
        end
    end

    private
    def comment_params
        params.require(:comment).permit(:body, :post_id, :parent_comment_id)
    end


end