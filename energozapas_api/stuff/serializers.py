from rest_framework import serializers
from .models import Employee
from .models import Position
from .models import Department
class EmployeeSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    patronymic = serializers.CharField(max_length=255, required=False, allow_blank=True)
    email = serializers.EmailField()
    bdate = serializers.DateField(required=False)
    phone_number = serializers.CharField(max_length=255)
    position_id = serializers.IntegerField(required=False, allow_null=True)
    position_name = serializers.CharField(source='position.name', read_only=True)
    department_id = serializers.IntegerField(required=False, allow_null=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    def create(self, validated_data):   
        return Employee.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name',instance.last_name)
        instance.patronymic = validated_data.get('patronymic',instance.patronymic)
        instance.email = validated_data.get('email',instance.email)
        instance.bdate = validated_data.get('bdate',instance.bdate)
        instance.phone_number = validated_data.get('phone_number',instance.phone_number)
        instance.position_id = validated_data.get('position_id',instance.position_id)
        instance.department_id = validated_data.get('department_id',instance.department_id)
        instance.save()
        return instance
    def is_unique_paste(self, validated_data):
        same_employees = []
        if validated_data.get('bdate')!="":
            same_employees = Employee.objects.all().filter(first_name = validated_data.get('first_name'), 
                                                        last_name = validated_data.get('last_name'),
                                                        patronymic = validated_data.get('patronymic'), 
                                                        bdate = validated_data.get('bdate'))
        else:                                                            
            same_employees = Employee.objects.all().filter(first_name = validated_data.get('first_name'), 
                                                        last_name = validated_data.get('last_name'),
                                                        patronymic = validated_data.get('patronymic'))
        if len(same_employees) == 0:
            return True
        else:
            return False
    def is_unique_update(self, instance, data):
        new_first_name = data.get('first_name', instance.first_name)
        new_last_name = data.get('last_name',instance.last_name)
        new_patronymic = data.get('patronymic',instance.patronymic)
        new_bdate = data.get('bdate',instance.bdate)
        same_employees = Employee.objects.all().filter( first_name = new_first_name, 
                                                        last_name = new_last_name,
                                                        patronymic = new_patronymic, 
                                                        bdate = new_bdate)
        if len(same_employees) <= 1:
            return True
        else:
            print (same_employees)
            return False

class PositionSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    def create(self, validated_data):   
        return Position.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
    def is_unique_paste(self, validated_data):
        same_positions = Position.objects.all().filter(name = validated_data.get('name'))
        if len(same_positions) == 0:
            return True
        else:
            return False
    def is_unique_update(self, instance, data):
        new_name = data.get('name',instance.name)
        same_positions = Position.objects.all().filter(name = new_name)
        if len(same_positions) == 0:
            return True
        else:
            return False

class DepartmentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    def create(self, validated_data):   
        return Department.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
    def is_unique_paste(self, validated_data):
        same_departments = Department.objects.all().filter(name = validated_data.get('name'))
        if len(same_departments) == 0:
            return True
        else:
            return False
    def is_unique_update(self, instance, data):
        new_name = data.get('name',instance.name)
        same_department = Department.objects.all().filter(name = new_name)
        if len(same_department) == 0:
            return True
        else:
            return False
