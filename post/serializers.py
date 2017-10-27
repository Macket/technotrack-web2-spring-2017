from rest_framework import serializers

from core.serializers import OtherUserSerializer
from post.models import Post, Book


class PostSerializer(serializers.ModelSerializer):
    author = OtherUserSerializer(many=False, read_only=True)
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    edited_count = serializers.ReadOnlyField()
    books = serializers.HyperlinkedRelatedField(many=True, view_name='book-detail', read_only=True)
    likes = serializers.StringRelatedField(many=True, default=[])
    comments = serializers.StringRelatedField(many=True, default=[])

    class Meta:
        model = Post
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    post = PostSerializer(many=False, read_only=True)

    class Meta:
        model = Book
        fields = '__all__'
