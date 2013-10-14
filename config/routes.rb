Cravings::Application.routes.draw do
  resources :orders
  
  root 'welcome#index'
end
