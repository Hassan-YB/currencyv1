# Generated by Django 3.1.6 on 2021-10-17 19:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('databases', '0003_figures_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subcategory',
            name='figure',
        ),
    ]
