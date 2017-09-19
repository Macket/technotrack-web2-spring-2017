# coding: utf-8
from __future__ import unicode_literals

from django.db import models

from core.models import ModelWithAuthor, ModelWithDates, LikeAble, WatchableModel
from post.models import Post


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
