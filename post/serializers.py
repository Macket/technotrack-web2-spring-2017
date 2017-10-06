from rest_framework import serializers
from post.models import Post, Book


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    edited_count = serializers.ReadOnlyField()
    books = serializers.HyperlinkedRelatedField(many=True, view_name='book-detail', read_only=True)
    likes = serializers.StringRelatedField(many=True)
    comments = serializers.StringRelatedField(many=True)

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
