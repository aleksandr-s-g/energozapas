from django.urls import path
from .views import EmployeeView
from .views import PositionView
from .views import DepartmentView
from .views import export_users_xls
urlpatterns = [
    path('stuff/', EmployeeView.as_view()),
    path('stuff/<int:pk>', EmployeeView.as_view()),
    path('stuff/position/', PositionView.as_view()),
    path('stuff/position/<int:pk>', PositionView.as_view()),
    path('stuff/department/', DepartmentView.as_view()),
    path('stuff/department/<int:pk>', DepartmentView.as_view()),
    path('stuff/export/', export_users_xls, name='export_users_xls'),
]