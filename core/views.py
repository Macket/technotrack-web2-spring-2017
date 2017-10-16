from django.views.generic import TemplateView
from rest_framework import viewsets, views

from core.models import User, Like
from core.serializers import SelfUserSerializer, OtherUserSerializer, LikeSerializer


class SelfUserViewSet(viewsets.ModelViewSet):
    serializer_class = SelfUserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        qs = super(SelfUserViewSet, self).get_queryset().filter(id=self.request.user.id)
        return qs


class OtherUserViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = OtherUserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        qs = super(OtherUserViewSet, self).get_queryset()
        if self.request.query_params.get('id'):
            qs = qs.filter(id=self.request.query_params.get('id'))
        return qs


class SubscriptionsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = OtherUserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        qs = self.request.user.subscriptions
        return qs


class LikeViewSet(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    queryset = Like.objects.all()


class IndexView(TemplateView):

    template_name = "index.html"
