from django.core.mail import EmailMessage
from django.conf import settings
from templated_email import get_templated_mail, InlineImage


def send_mail(from_mail, recipient_list):

    if settings.DEBUG:
        recipient_list = [admin[0] for admin in settings.ADMINS]

    email = get_templated_mail(
        'base',
        {
            'image': InlineImage('kobe.jpg', open(settings.MEDIA_ROOT + 'Kobe.jpg', 'rb').read(), 'jpeg'),
            'host': 'https//yandex.ru'
        },
        from_mail,
        recipient_list,
    )
    email.send()

    # message = EmailMessage(subject, content, from_mail, recipient_list)
    # message.attach('text.txt', 'some content')
    # message.send()


def send_email(template, from_mail, recipient_list, context=None):

    if settings.DEBUG:
        recipient_list = [admin[0] for admin in settings.ADMINS]

    email = get_templated_mail(
        template,
        context,
        from_mail,
        recipient_list,
    )
    email.send()
