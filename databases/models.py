from django.db import models
from django.db.models.query_utils import subclasses

#Database entry
# class Figures_db(models.Model):
#     pic = models.ImageField(upload_to="media")
#     title = models.CharField(max_length=50,blank=True,null=True)
#     original_title = models.CharField(max_length=50,blank=True,null=True)
#     pages = models.IntegerField(blank=True,null=True)
#     paper_size = models.CharField(max_length=50,blank=True,null=True)
#     tracks = models.CharField(max_length=50,blank=True,null=True)
#     discs = models.CharField(max_length=50,blank=True,null=True)
#     runtime = models.IntegerField(blank=True,null=True)
#     description = models.CharField(max_length=1000,blank=True,null=True)
#     region_free = models.BooleanField(default=False,null=True)
#     version = models.CharField(max_length=50,blank=True,null=True)
#     original_version = models.CharField(max_length=50,blank=True,null=True)
#     numbering = models.CharField(max_length=50,blank=True,null=True)
#     scale = models.IntegerField(blank=True,null=True)
#     no_of_parts = models.IntegerField(blank=True,null=True)
#     cancelled = models.BooleanField(default=False)
#     rating = models.CharField(max_length=1000,blank=True,null=True)
#     nsfw = models.BooleanField(default=False)
#     episodes = models.IntegerField(blank=True,null=True)
#     dimensions = models.CharField(max_length=100,blank=True,null=True)
#     weight = models.CharField(max_length=100,blank=True,null=True)
#     created_at = models.DateTimeField(auto_now_add=True,null=True)

#     def __str__(self):
#         if self.title:
#             return self.title
#         else:
#             return f"id = {self.id}"

#     class Meta:
#         verbose_name = 'Figure'
#         verbose_name_plural = 'Figures'

