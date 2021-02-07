from django.db import models
from django.core.validators import RegexValidator

class Position(models.Model):
  name = models.CharField(max_length=255)
  def __str__(self):
    return self.name

class Department(models.Model):
  name = models.CharField(max_length=255)
  def __str__(self):
    return self.name


class Employee(models.Model):
  first_name = models.CharField(max_length=255)
  last_name = models.CharField(max_length=255)
  patronymic = models.CharField(max_length=255, blank=True, null=True)
  email = models.EmailField()
  bdate = models.DateField(blank=True, null=True)
  phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
  phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True) # validators should be a list
  position = models.ForeignKey(Position, on_delete=models.SET_NULL, blank=True, null=True)
  department = models.ForeignKey(Department, on_delete=models.SET_NULL, blank=True, null=True)
  class Meta:
    unique_together = ['first_name', 'last_name', 'patronymic', 'bdate']

  def __str__(self):
    return f"{self.first_name} {self.last_name} ({self.position})"
  



# Create your models here.

