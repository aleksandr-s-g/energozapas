# Generated by Django 3.1.6 on 2021-02-07 04:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stuff', '0002_auto_20210205_1458'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='employee',
            unique_together={('first_name', 'last_name', 'patronymic', 'bdate')},
        ),
    ]
