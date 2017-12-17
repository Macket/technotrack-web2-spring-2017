from django.contrib.contenttypes.models import ContentType

from rest_framework.test import APITestCase
from rest_framework import status

from core.models import User, Like
from post.models import Post


class LikeTests(APITestCase):

    def setUp(self):
        super(LikeTests, self).setUp()
        user = User.objects.create_user('test', 'test@test.test', '12345678OK')
        self.current_user = user
        self.client.force_login(user=user)
        self.post = Post(title='test', text='test', author=self.current_user)
        self.post.save()

    def test_create_like(self):
        url = '/api/v1/likes/'
        data = {
            'content_type': int(ContentType.objects.get_for_model(Post).id),
            'object_id': int(self.post.id),
            'author': int(self.current_user.id)
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        self.assertEquals(Like.objects.count(), 1)
        self.assertEquals(Like.objects.all().first().object_id, self.post.id)
        self.assertEquals(Like.objects.all().first().content_type.id, ContentType.objects.get_for_model(Post).id)
        self.assertEquals(Like.objects.all().first().author.id, self.current_user.id)
        self.assertEquals(Post.objects.get(pk=self.post.id).likes_count, 1)

    def test_delete_like(self):
        like = Like(
            content_type=ContentType.objects.get_for_model(Post),
            object_id=self.post.id,
            author=self.current_user
        )
        like.save()
        self.assertEquals(Like.objects.count(), 1)

        url = "/api/v1/likes/" + str(int(like.id)) + "/"
        data = {
            'id': like.id
        }
        response = self.client.delete(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEquals(self.post.likes_count, 0)
        self.assertEquals(Like.objects.count(), 0)
