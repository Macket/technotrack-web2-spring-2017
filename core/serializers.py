from rest_framework import serializers

from core.models import User, Like


class OtherUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'last_login', 'username', 'first_name', 'last_name', 'avatar')


class SelfUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = '__all__'


class SubscribesSerializer(serializers.ModelSerializer):

    class Meta:
        model = User.subscriptions.through
        fields = '__all__'
