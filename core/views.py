from django.views.generic import TemplateView
from rest_framework import viewsets, generics
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


class IndexView(TemplateView):

    template_name = "index.html"
