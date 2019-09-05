class Api::CommentsController < ApplicationController



    def destroy
        @comment = current_user.comments.find(params[:id])
        @comment.destroy
    end

     def update 
        @comment = current_user.comments.find(params[:id])
        if @comment.update(comment_params)
            render :show
        else
            render json: {message: "Invalid comment"}, status: 422
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