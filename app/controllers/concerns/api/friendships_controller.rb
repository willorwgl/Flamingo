class Api::FriendshipsController < ApplicationController


    def index 
        @user_id = params[:user_id]
        @friendships = Friendship.includes(friend: [profile_photo_attachment: [:blob]],
             user: [profile_photo_attachment: [:blob]])
             .where("user_id = ? or friend_id = ?", @user_id, @user_id)

    end

    def create 
       @friendship = Friendship.new(user_id: current_user.id, friend_id: params[:friend][:id], status: "pending")     
        if @friendship.save
            render :show
        else
            render json: ["Invalid request"], status: 422
        end
    end

    def update 
        @friendship = current_user.friendships.find(params[:id])
        if @friendship.update(status: "accepted")   
            render :show
        else
            render json: ["Invalid request"], status: 422
        end
    end

    def destroy
        current_user.friendships.find(params[:id]).destroy
    end



end