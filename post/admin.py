from django.contrib import admin

from comment.admin import CommentAbleAdmin
from core.admin import LikeAbleAdmin
from post.models import Post, Book


@admin.register(Post)
class PostAdmin(CommentAbleAdmin, LikeAbleAdmin):

    readonly_fields = 'likes_count', 'comments_count', 'edited_count',
    inlines = CommentAbleAdmin.inlines + LikeAbleAdmin.inlines


@admin.register(Book)
class PostAdmin(CommentAbleAdmin, LikeAbleAdmin):
    readonly_fields = 'likes_count', 'comments_count',
    inlines = CommentAbleAdmin.inlines + LikeAbleAdmin.inlines