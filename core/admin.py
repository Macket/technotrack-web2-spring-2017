# -*- coding: utf-8 -*-
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.contenttypes.admin import GenericStackedInline
from .models import User, Post, Comment, Like, Event


class UserAdmin(BaseUserAdmin):

    fieldsets = BaseUserAdmin.fieldsets + (
        (u'Дополнительно', {'fields': ('admin_avatar', 'avatar', 'subscriptions', 'objects_count')}),
    )
    readonly_fields = ('admin_avatar', 'objects_count')

    def admin_avatar(self, instance):
        return instance.avatar and u'<img src="{0}" width="100px" />'.format(
            instance.avatar.url
        )
    admin_avatar.allow_tags = True
    admin_avatar.short_description = u'Аватар'


admin.site.register(User, UserAdmin)


class LikesInline(GenericStackedInline):

    model = Like
    ct_field = 'content_type'
    ct_fk_field = 'object_id'


class LikeAbleAdmin(admin.ModelAdmin):

    inlines = LikesInline,


@admin.register(Post)
class PostAdmin(LikeAbleAdmin):

    readonly_fields = 'likes_count', 'comments_count', 'edited_count',


@admin.register(Comment)
class CommentAdmin(LikeAbleAdmin):

    readonly_fields = 'likes_count', 'edited_count',


@admin.register(Event)
class CommentAdmin(LikeAbleAdmin):

    pass
