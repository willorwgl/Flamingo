


class Api::LikesController < ApplicationController

    def create
        @like = current_user.likes.new(like_params)
        if @like.save
            render :show
        else
            render json: @like.errors.full_messages, status: 422
        end
    end

    def update
        @like = Like.find(params[:id])
        if @like.update(like_params) 
            render :show
        else
            render json: ["Like not found"], status: 404
        end
    end

    def destroy
        @like = Like.find(params[:id])
        @like.destroy
    end

    private
    def like_params 
        params.require(:like).permit(:type, :likeable_type, :likeable_id, :like_type)
    end



end