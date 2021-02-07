from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Employee
from .serializers import EmployeeSerializer
from .serializers import DepartmentSerializer
from .models import Position
from .models import Department
from .serializers import PositionSerializer
from rest_framework.generics import get_object_or_404

import xlwt

from django.http import HttpResponse
class EmployeeView(APIView):
    def get (self, request):
        emploees = Employee.objects.all()
        serializer = EmployeeSerializer(emploees, many=True)
        return Response(serializer.data)
    def post(self, request):
        new_employee = request.data.get('new_employee')
        serializer = EmployeeSerializer(data = new_employee)
        serializer.is_valid()
        print(serializer.errors)
        if serializer.is_unique_paste(new_employee):
            if serializer.is_valid(raise_exception=True):
                employee_saved = serializer.save()
            return Response({"success":f"Employee {employee_saved} created successfuly"})
        else:
            return Response({"error":f"Employee must have unique first_name, last_name, patronymic and bdate"}, status=409)
    def put(self, request, pk):
        saved_employee = get_object_or_404(Employee.objects.all(), pk=pk)
        data = request.data.get('employee')
        serializer = EmployeeSerializer(instance=saved_employee, data=data, partial=True)
        serializer.is_valid()
        if serializer.is_unique_update(instance=saved_employee, data=data):
            if serializer.is_valid(raise_exception=True):
                employee_saved = serializer.save()
            return Response({
                "success": f"Employee '{employee_saved}' updated successfully"})
        else:
            return Response({"error":f"Employee must have unique first_name, last_name, patronymic and bdate"}, status=409)
    def delete(self, request, pk):
    # Get object with this pk
        employee = get_object_or_404(Employee.objects.all(), pk=pk)
        employee_text = str(employee)
        employee.delete()
        return Response({
        "message": f"Employee {employee_text} with id `{pk}` has been deleted."
        }, status=204)

def export_users_xls(request):
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="stuff.xls"'
    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet('Stuff')

    # Sheet header, first row
    row_num = 0

    font_style = xlwt.XFStyle()
    font_style.font.bold = True

    columns = ['Имя', 'Фамилия', 'Отчество', 'Почта','Дата рождения','Телефон','Должность', 'Отдел' ]

    for col_num in range(len(columns)):
        ws.write(row_num, col_num, columns[col_num], font_style)

    # Sheet body, remaining rows
    font_style = xlwt.XFStyle()

    rows = Employee.objects.all().values_list('first_name', 'last_name', 'patronymic', 'email','bdate','phone_number','position__name','department__name')
    for row in rows:
        row_num += 1
        for col_num in range(len(row)):
            ws.write(row_num, col_num, row[col_num], font_style)

    wb.save(response)
    return response

class PositionView(APIView):
    def get (self, request):
        positions = Position.objects.all()
        serializer = PositionSerializer(positions, many=True)
        return Response(serializer.data)
    def post(self, request):
        new_position = request.data.get('new_position')
        serializer = PositionSerializer(data = new_position)
        if serializer.is_unique_paste(new_position):
            if serializer.is_valid(raise_exception=True):
                position_saved = serializer.save()
            return Response({"success":f"Position {position_saved} created successfuly"})
        else:
            return Response({"error":f"Position must have unique name"}, status=409)
    def put(self, request, pk):
        saved_position = get_object_or_404(Position.objects.all(), pk=pk)
        data = request.data.get('position')
        serializer = PositionSerializer(instance=saved_position, data=data, partial=True)
        serializer.is_valid()
        if serializer.is_unique_update(instance=saved_position, data=data):
            if serializer.is_valid(raise_exception=True):
                #print (saved_employee)
                position_saved = serializer.save()
            return Response({
                "success": f"Position '{position_saved}' updated successfully"})
        else:
            return Response({"error":f"Position must have unique name"}, status=409)
    def delete(self, request, pk):
    # Get object with this pk
        position = get_object_or_404(Position.objects.all(), pk=pk)
        position_text = str(position)
        position.delete()
        return Response({
        "message": f"Position {position_text} with id `{pk}` has been deleted."
        }, status=204)

class DepartmentView(APIView):
    def get (self, request):
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)
    def post(self, request):
        new_department = request.data.get('new_department')
        serializer = DepartmentSerializer(data = new_department)
        if serializer.is_unique_paste(new_department):
            if serializer.is_valid(raise_exception=True):
                department_saved = serializer.save()
            return Response({"success":f"Department {department_saved} created successfuly"})
        else:
            return Response({"error":f"Department must have unique name"}, status=409)
    def put(self, request, pk):
        saved_department = get_object_or_404(Department.objects.all(), pk=pk)
        data = request.data.get('department')
        serializer = DepartmentSerializer(instance=saved_department, data=data, partial=True)
        serializer.is_valid()
        if serializer.is_unique_update(instance=saved_department, data=data):
            if serializer.is_valid(raise_exception=True):
                #print (saved_employee)
                department_saved = serializer.save()
            return Response({
                "success": f"Department '{department_saved}' updated successfully"})
        else:
            return Response({"error":f"Department must have unique name"}, status=409)
    def delete(self, request, pk):
    # Get object with this pk
        department = get_object_or_404(Department.objects.all(), pk=pk)
        department_text = str(department)
        department.delete()
        return Response({
        "message": f"Department {department_text} with id `{pk}` has been deleted."
        }, status=204)
# Create your views here.
