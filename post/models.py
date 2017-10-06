# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from core.models import ModelWithAuthor, ModelWithDates, LikeAble, WatchableModel
from comment.models import CommentAble


class Post(ModelWithAuthor, ModelWithDates, LikeAble, WatchableModel, CommentAble):

    title = models.CharField(max_length=255)
    text = models.TextField()
    title_was = None
    text_was = None
    edited_count = models.IntegerField(default=0)

    def get_title_for_event(self):
        return "{} создал пост {}".format(self.author, self.title)

    class Meta:
        verbose_name = u'Пост'
        verbose_name_plural = u'Посты'

    def __unicode__(self):

        return self.title


class Book(ModelWithAuthor, ModelWithDates, LikeAble, CommentAble, WatchableModel):

    book = models.FileField(upload_to='books')
    post = models.ForeignKey(Post, related_name='books')

    def get_title_for_event(self):
        return "{} загрузил книгу {}".format(self.author, self)

    class Meta:
        verbose_name = u'Книга'
        verbose_name_plural = u'Книги'