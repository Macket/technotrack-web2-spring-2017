from rest_framework import serializers

from comment.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    # object = serializers.HyperlinkedRelatedField(many=False, view_name='oblect-detail', read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
