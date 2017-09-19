from django.db.models.signals import post_init, pre_save, post_save

from event.models import make_event, EventType
from post.models import Post


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
