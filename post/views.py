from rest_framework import viewsets, permissions
from django.db.models import Q
import operator
from post.permissions import IsOwnerOrReadOnly
from post.models import Post, Book
from post.serializers import PostSerializer, BookSerializer


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        qs = super(PostViewSet, self).get_queryset()
        if self.request.query_params.get('author_id'):
            qs = qs.filter(author__id=self.request.query_params.get('author_id'))
            # if len(qs) != 0 and qs.all()[0].author not in self.request.user.subscriptions.all():
            #     qs = None
        else:
            qs = super(PostViewSet, self).get_queryset().filter(author=self.request.user)
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class SubscriptionsPostViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = permissions.IsAuthenticated,

    def get_queryset(self):
        qs = super(SubscriptionsPostViewSet, self).get_queryset()
        last_id = self.request.GET.get('last_id', 0)  # default = 0
        qs = qs.filter(author__subscribers=self.request.user.id) #.filter(id__lte=last_id)[:10]
        # temp = []
        # subs = self.request.user.subscriptions.all()
        # for post in qs:
        #     if post.author in subs:
        #         temp.append(post)
        # qs = temp
        return qs


class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def get_queryset(self):
        qs = super(BookViewSet, self).get_queryset()
        if self.request.query_params.get('author_id'):
            qs = qs.filter(author__id=self.request.query_params.get('author_id'))
            if len(qs) != 0 and qs.all()[0].author not in self.request.user.subscriptions.all():
                qs = None
        else:
            qs = super(BookViewSet, self).get_queryset().filter(author=self.request.user)
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
