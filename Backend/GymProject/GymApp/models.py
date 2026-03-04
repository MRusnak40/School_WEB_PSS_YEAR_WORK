from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User


class Type(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Duration(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Goal(models.Model):
    name = models.CharField(max_length=100)
    type = models.ForeignKey(Type, on_delete=models.CASCADE)
    duration = models.ForeignKey(Duration, on_delete=models.CASCADE)
    is_finished = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Flame(models.Model):
    count = models.IntegerField(default=0)
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # OneToOne, ne FK + unique
    def __str__(self):
        return f"{self.count} {self.user}"
