from __future__ import unicode_literals

from django.apps import AppConfig


class PostConfig(AppConfig):
    name = 'post'

    def ready(self):
        import signals