from django.contrib import admin
from django.contrib.contenttypes.admin import GenericStackedInline

from comment.models import Comment
from core.admin import LikeAbleAdmin


@admin.register(Comment)
class CommentAdmin(LikeAbleAdmin):

    readonly_fields = 'likes_count', 'edited_count',


class CommentsInline(GenericStackedInline):

    model = Comment
    ct_field = 'content_type'
    ct_fk_field = 'object_id'
    readonly_fields = 'edited_count', 'likes_count',


class CommentAbleAdmin(admin.ModelAdmin):

    inlines = CommentsInline,
