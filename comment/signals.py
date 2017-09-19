from django.db.models.signals import post_save, pre_save, post_init, post_delete

from comment.models import Comment
from event.models import make_event, EventType


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
