# Generated by Django 3.1.6 on 2021-10-25 22:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('databases', '0006_auto_20211024_1833'),
    ]

    operations = [
        migrations.RenameField(
            model_name='figures_db',
            old_name='dimesnions',
            new_name='dimensions',
        ),
    ]
