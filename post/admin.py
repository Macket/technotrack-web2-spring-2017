from django.contrib import admin

from core.admin import LikeAbleAdmin
from post.models import Post


@admin.register(Post)
class PostAdmin(LikeAbleAdmin):

    readonly_fields = 'likes_count', 'comments_count', 'edited_count',

