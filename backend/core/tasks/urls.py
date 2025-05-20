from django.urls import path, include
from .views import RegisterView, UserProfileView, TaskListCreateView, TaskDetailView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('me/', UserProfileView.as_view()),
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskDetailView.as_view()),
]
