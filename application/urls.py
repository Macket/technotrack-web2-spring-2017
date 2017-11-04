"""application URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from rest_framework import routers
from post import views as post_views
from core import views as core_views
from event import views as event_views
from comment import views as comment_views
from rest_framework.authtoken import views
from core.views import IndexView
from django.views.decorators.csrf import ensure_csrf_cookie


router = routers.DefaultRouter()
router.register(r'posts', post_views.PostViewSet)
router.register(r'news', post_views.SubscriptionsPostViewSet)
router.register(r'books', post_views.BookViewSet)
router.register(r'users', core_views.AllUsersViewSet)
router.register(r'subscriptions', core_views.SubscriptionsViewSet)
router.register(r'events', event_views.EventViewSet)
router.register(r'likes', core_views.LikeViewSet)
router.register(r'comments', comment_views.CommentViewSet)
router.register(r'subscribes', core_views.SubscribesViewSet)


urlpatterns = [
    url(r'api/v1/', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^api-token-auth/', views.obtain_auth_token),
    url(r'^social/', include('social_django.urls', namespace='social')),
    url(r'^index/', ensure_csrf_cookie(IndexView.as_view())),
    url(r'api/v1/profile', core_views.SelfUserView.as_view()),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]
    from django.conf.urls.static import static

    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

