# coding: utf-8
from __future__ import unicode_literals

from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models

from core.models import ModelWithAuthor, ModelWithDates, LikeAble, WatchableModel


class Comment(ModelWithAuthor, ModelWithDates, LikeAble, WatchableModel):

    content_type = models.ForeignKey(ContentType, related_name='comments')
    object_id = models.PositiveIntegerField()
    object = GenericForeignKey('content_type', 'object_id')

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


class CommentAble(models.Model):

    comments = GenericRelation(Comment, object_id_field='object_id', content_type_field='content_type',
                               on_delete=models.CASCADE)
    comments_count = models.IntegerField(default=0)

    class Meta:
        abstract = True
