# coding: utf-8
from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models


class User(AbstractUser):

    avatar = models.ImageField(upload_to='avatars', blank=True, null=True)
    objects_count = models.IntegerField(default=0)
    subscriptions = models.ManyToManyField("self", default=None)

    class Meta:
        verbose_name = u'Пользователь'
        verbose_name_plural = u'Пользователи'


class ModelWithDates(models.Model):

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ModelWithAuthor(models.Model):

    author = models.ForeignKey(User)

    class Meta:
        abstract = True


class WatchableModel(models.Model):

    def get_title_for_event(self):
        raise NotImplementedError

    class Meta:
        abstract = True


class Like(ModelWithDates, ModelWithAuthor, WatchableModel):

    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    object = GenericForeignKey('content_type', 'object_id')

    def get_title_for_event(self):
        return "{} поставил лайк {}".format(self.author, self.object)


class LikeAble(models.Model):

    likes = GenericRelation(Like, object_id_field='object_id', content_type_field='content_type')
    likes_count = models.IntegerField(default=0)

    class Meta:
        abstract = True
