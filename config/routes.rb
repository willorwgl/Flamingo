Rails.application.routes.draw do
  
  root to: "static_pages#root"




  namespace :api, defaults: { format: :json} do
    resources :users, only: [:show, :create, :update] do
      resources :posts, only: [:index]
      resources :friendships, only: [:index]

        get '/users/search/:query_string', to: 'users#search'
    end


    resources :posts, only: [:create, :destroy, :update] do
      resources :comments, only: [:index]
    end

    resources :comments, only: [:update, :destroy, :create]
    resource :session, only: [:create, :destroy]

    resources :friendships, only: [:update, :create, :destroy]

  end
end
