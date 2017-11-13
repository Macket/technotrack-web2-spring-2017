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
    Book = 5


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


def make_event(title, author, object, type):
    event = Event()
    event.title = title
    event.author = author
    event.object = object
    event.type = type
    event.save()
    return event
