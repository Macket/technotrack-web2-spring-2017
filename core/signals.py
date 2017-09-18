# coding: utf-8
from django.db.models.signals import post_save, post_init, pre_save, post_delete
from .models import Comment, Post, ModelWithAuthor, LikeAble, Like, Event, EventType


# События


def make_event(title, author, object, type):
    event = Event()
    event.title = title
    event.author = author
    event.object = object
    event.type = type
    event.save()


# Комментарии


def comment_post_init(instance, *args, **kwargs):

    instance.text_was = instance.text


def comment_pre_save(instance, created=False, *args, **kwargs):

    if not created and instance.text != instance.text_was:
        instance.text_was = instance.text
        instance.edited_count += 1


def comment_post_save(instance, created=False, *args, **kwargs):

    if created:
        make_event(instance.get_title_for_event(), instance.author, instance, EventType.Comment)
        instance.post.comments_count += 1
        instance.post.save()


def comment_post_delete(instance, *args, **kwargs):

    if instance.post.comments_count > 0:
        instance.post.comments_count -= 1
        instance.post.save()

post_save.connect(comment_post_save, Comment)
pre_save.connect(comment_pre_save, Comment)
post_init.connect(comment_post_init, Comment)
post_delete.connect(comment_post_delete, Comment)


# Посты


def post_post_init(instance, *args, **kwargs):

    instance.text_was = instance.text
    instance.title_was = instance.title


def post_pre_save(instance, created=False, *args, **kwargs):

    if not created and (instance.text != instance.text_was or instance.title_was != instance.title):
        instance.text_was = instance.text
        instance.title_was = instance.title
        instance.edited_count += 1


def post_post_save(instance, created=False, *args, **kwargs):

    if created:
        make_event(instance.get_title_for_event(), instance.author, instance, EventType.Post)


post_init.connect(post_post_init, Post)
pre_save.connect(post_pre_save, Post)
post_save.connect(post_post_save, Post)

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

    if instance.object.likes_count > 0:
        instance.object.likes_count -= 1
        instance.object.save()


post_save.connect(like_post_save, Like)
post_delete.connect(like_post_delete, Like)