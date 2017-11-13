# -*- coding:utf-8 -*-
from celery import task
from celery.schedules import crontab

from templated_email import InlineImage

from application import settings
from core.helper import send_email
from core.models import User
from event.models import Event


@task(bind=True)
def send_email_task(self, template, from_mail, recipient_id, text):

    recipient_list = [{User.objects.get(id=recipient_id).email}, ]
    context = {
        'text': text,
        'image': InlineImage(
            'kobe.jpg', open(settings.MEDIA_ROOT + 'Kobe.jpg', 'rb').read(), 'jpeg'),
        'subject': 'New post'
    }
    try:
        send_email(template, from_mail, recipient_list, context)
    except Exception as exc:
        raise self.retry(exc=exc, countdown=3, max_retries=3)


@task.periodic_task(run_every=crontab(minute='30', hour='19'))
def send_email_dispatch():
    template = 'base'
    from_mail = 'a@a.a'
    text = 'Мы давно тебя не видели. Заходи почаще!'
    for user in User.objects.all():
        send_email_task.apply_async([template, from_mail, user.id, text])
