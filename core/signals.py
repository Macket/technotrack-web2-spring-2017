# coding: utf-8
from django.db.models.signals import post_save, post_init, pre_save, post_delete, m2m_changed
from django.dispatch import receiver

from application import settings
from event.models import make_event, EventType
from .models import ModelWithAuthor, Like, User
from rest_framework.authtoken.models import Token


# Подсчет авторских объектов


def model_with_author_post_save(instance, created=False, *args, **kwargs):

    if created:
        instance.author.objects_count += 1
        instance.author.save()


def model_with_author_post_delete(instance, *args, **kwargs):

    if instance.author.objects_count > 0:
        instance.author.objects_count -= 1
        instance.author.save()


for model in ModelWithAuthor.__subclasses__():
    post_save.connect(model_with_author_post_save, model)
    post_delete.connect(model_with_author_post_delete, model)


# Лукосы


def like_post_save(instance, *args, **kwargs):

    make_event(instance.get_title_for_event(), instance.author, instance, EventType.Like)
    instance.object.likes_count += 1
    instance.object.save()


def like_post_delete(instance, *args, **kwargs):

    if instance.object is not None and instance.object.likes_count > 0:
        instance.object.likes_count -= 1
        instance.object.save()


post_save.connect(like_post_save, Like)
post_delete.connect(like_post_delete, Like)


# Подписки


def subscription(instance, **kwargs):

    if kwargs['action'] == 'post_add':
        pk_set = kwargs.pop('pk_set', None)
        for pk in pk_set:
            title = "{} подписался на {}".format(instance, User.objects.get(pk=pk))
            make_event(title, instance, User.objects.get(pk=pk), EventType.Subscription)


m2m_changed.connect(subscription, sender=User.subscriptions.through)

# Токены


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
