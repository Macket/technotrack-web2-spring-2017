# coding: utf-8
from __future__ import unicode_literals

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from enum import Enum

from core.models import ModelWithAuthor, ModelWithDates


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

    def __init__(self, title, author, object, type):
        ModelWithAuthor.__init__(self)
        ModelWithDates.__init__(self)
        self.title = title
        self.author = author
        self.object = object
        self.type = type

    class Meta:
        verbose_name = u'Событие'
        verbose_name_plural = u'События'

    def __unicode__(self):

        return self.title


def make_event(title, author, object, type):
    event = Event(title, author, object, type)
    event.save()
