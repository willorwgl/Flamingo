class Api::UsersController < ApplicationController
  

    def show
      @user = User.with_attached_profile_photo.includes(:workplaces, :educations).find(params[:id])
    end


    def update
      @user = User.find(params[:id])

      if params["user"]["profile_photo"]
        @user.profile_photo.detach
      end
      if @user.update(user_params) 
        render :show
      else 
        render json: ["Invalid user"], status: 422
      end
    end

    def create
      @user = User.new(user_params)
      if @user.save
        login(@user)
        render :show
      else
        render json: ["Invalid user"], status: 401
      end
    end


    def search 
      if params[:type] == "lite" 
         @users = User.where("concat_ws(' ' , first_name, last_name) iLIKE ?", "%#{params[:query_string]}%").limit(7)
          render :search_lite
      else
          @users = User.with_attached_profile_photo.where("concat_ws(' ' , first_name, last_name) iLIKE ?", "%#{params[:query_string]}%")
          render :search
      end
    end


    private
    def user_params
      params.require(:user).permit(:first_name, :last_name, :password, :email, :gender, :pronoun, :dob, :bio, :profile_photo)
    end

end
