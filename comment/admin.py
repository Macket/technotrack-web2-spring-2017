from django.contrib import admin

from comment.models import Comment
from core.admin import LikeAbleAdmin


@admin.register(Comment)
class CommentAdmin(LikeAbleAdmin):

    readonly_fields = 'likes_count', 'edited_count',

