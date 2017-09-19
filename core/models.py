# coding: utf-8
from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models
from enum import Enum


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


class EventType(Enum):
    Post = 1
    Comment = 2
    Like = 3
    Subscription = 4


class Event(ModelWithAuthor, ModelWithDates):

    title = models.CharField(max_length=255)
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    object = GenericForeignKey('content_type', 'object_id')
    type = EventType

    class Meta:
        verbose_name = u'Событие'
        verbose_name_plural = u'События'

    def __unicode__(self):

        return self.title


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


class Post(ModelWithAuthor, ModelWithDates, LikeAble, WatchableModel):

    title = models.CharField(max_length=255)
    text = models.TextField()
    title_was = None
    text_was = None
    edited_count = models.IntegerField(default=0)
    comments_count = models.IntegerField(default=0)

    def get_title_for_event(self):
        return "{} создал пост {}".format(self.author, self.title)

    class Meta:
        verbose_name = u'Пост'
        verbose_name_plural = u'Посты'

    def __unicode__(self):

        return self.title


class Comment(ModelWithAuthor, ModelWithDates, LikeAble, WatchableModel):

    post = models.ForeignKey(Post)
    text = models.TextField()
    text_was = None
    edited_count = models.IntegerField(default=0)

    def get_title_for_event(self):
        return "{} оставил комментарий {}".format(self.author, self.text)

    class Meta:
        verbose_name = u'Комментарий'
        verbose_name_plural = u'Комментарии'

    def __unicode__(self):

        if len(self.text) > 15:
            return self.text[:15] + '...'
        else:
            return self.text
