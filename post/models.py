# coding: utf-8
from __future__ import unicode_literals

from django.db import models

from core.models import ModelWithAuthor, ModelWithDates, LikeAble, WatchableModel


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
