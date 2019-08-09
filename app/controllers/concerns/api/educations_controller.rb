

class Api::EducationsController < ApplicationController 

    def create
        @education = current_user.educations.new(education_params)
         if @education.save 
            render :show
        else
            render ["Invalid education"], status: 422
        end
    end

    def index

    end

    def destroy
        current_user.educations.find(params[:id]).destroy
    end

    def update 
        @education = current_user.educations.find(params[:id])
        if @education.update(education_params)
            render :show
        else
            render ["Invalid education"], status: 422
        end
    end

    private 
    def education_params
        params.require(:education).permit(:school, :description)
    end
end