import json
from django.views.generic import TemplateView
from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework import status

from core.models import User, Like
from core.serializers import SelfUserSerializer, OtherUserSerializer, LikeSerializer, SubscribesSerializer


class SelfUserView(generics.RetrieveUpdateDestroyAPIView):
    model = User
    serializer_class = SelfUserSerializer

    def get_object(self):
        return self.request.user


class AllUsersViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = OtherUserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        return super(AllUsersViewSet, self).get_queryset()


class SubscriptionsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = OtherUserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        qs = self.request.user.subscriptions
        return qs


class LikeViewSet(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    queryset = Like.objects.all()


class SubscribesViewSet(viewsets.ModelViewSet):
    serializer_class = SubscribesSerializer
    queryset = User.subscriptions.through.objects.all()

    def create(self, request, *args, **kwargs):
        sub_object = self.queryset.filter(
                to_user=request.data.get('to_user'), from_user=request.data.get('from_user'))
        if sub_object.exists():
            sub_object[0].delete()
            return Response(request.data, status=status.HTTP_200_OK, headers=self.get_success_headers(request.data))
        else:
            return super(SubscribesViewSet, self).create(request, *args, **kwargs)


class IndexView(TemplateView):

    template_name = "index.html"
