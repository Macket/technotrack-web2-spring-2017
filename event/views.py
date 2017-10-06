from rest_framework import viewsets, permissions

from event.models import Event
from event.serializers import EventSerializer


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    permission_classes = permissions.IsAuthenticated,

    def get_queryset(self):
        qs = super(EventViewSet, self).get_queryset()
        if self.request.query_params.get('author_id'):
            qs = qs.filter(author__id=self.request.query_params.get('author_id'))
            if len(qs) != 0 and qs.all()[0].author not in self.request.user.subscriptions.all():
                qs = None
        else:
            qs = super(EventViewSet, self).get_queryset().filter(author=self.request.user)
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
