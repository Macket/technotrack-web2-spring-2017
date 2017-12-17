from rest_framework.test import APITestCase
from rest_framework import status

from core.models import User
from post.models import Post


class AuthPostTests(APITestCase):

    def setUp(self):
        super(AuthPostTests, self).setUp()
        user = User.objects.create_user('test', 'test@test.test', '12345678OK')
        self.current_user = user
        self.client.force_login(user=user)

    def test_create_post(self):
        url = '/api/v1/posts/'
        data = {
            'title': 'test_title',
            'text': 'test_text'
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        self.assertEquals(Post.objects.count(), 1)
        self.assertEquals(Post.objects.all().first().title, 'test_title')
        self.assertEquals(Post.objects.all().first().text, 'test_text')
        self.assertEquals(Post.objects.all().first().author.id, self.current_user.id)

    def test_get_post(self):
        post1 = Post(
            title='test_title1',
            text='test_text1',
            author=self.current_user
        )
        post2 = Post(
            title='test_title2',
            text='test_text2',
            author=self.current_user
        )
        post1.save()
        post2.save()
        self.assertEquals(Post.objects.count(), 2)

        url = "/api/v1/posts/"
        response = self.client.get(url)
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(len(response.data), 2)
        self.assertEquals(response.data[0].get('title'), 'test_title1')
        self.assertEquals(response.data[0].get('text'), 'test_text1')
        self.assertEquals(response.data[1].get('title'), 'test_title2')
        self.assertEquals(response.data[1].get('text'), 'test_text2')

    def test_delete_post(self):
        post = Post(
            title='test_title',
            text='test_text',
            author=self.current_user
        )
        post.save()
        self.assertEquals(Post.objects.count(), 1)

        url = "/api/v1/posts/" + str(int(post.id)) + "/"
        data = {
            'id': post.id
        }
        response = self.client.delete(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEquals(Post.objects.count(), 0)

    def test_edit_post(self):
        post = Post(
            title='test_title',
            text='test_text',
            author=self.current_user
        )
        post.save()
        self.assertEquals(Post.objects.count(), 1)

        url = "/api/v1/posts/" + str(int(post.id)) + "/"
        data = {
            'title': 'new_test_title',
            'text': 'new_test_text'
        }
        response = self.client.put(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(Post.objects.all().first().title, 'new_test_title')
        self.assertEquals(Post.objects.all().first().text, 'new_test_text')


class NoAuthPostTests(APITestCase):

    def setUp(self):
        super(NoAuthPostTests, self).setUp()
        user = User.objects.create_user('test', 'test@test.test', '12345678OK')
        self.test_user = user

    def test_create_post(self):
        url = '/api/v1/posts/'
        data = {
            'title': 'test_title',
            'text': 'test_text'
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_post(self):
        post1 = Post(
            title='test_title1',
            text='test_text1',
            author=self.test_user
        )
        post2 = Post(
            title='test_title2',
            text='test_text2',
            author=self.test_user
        )
        post1.save()
        post2.save()
        self.assertEquals(Post.objects.count(), 2)

        url = "/api/v1/posts/"
        response = self.client.get(url)
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEquals(Post.objects.count(), 2)

    def test_delete_post(self):
        post = Post(
            title='test_title',
            text='test_text',
            author=self.test_user
        )
        post.save()
        self.assertEquals(Post.objects.count(), 1)

        url = "/api/v1/posts/" + str(int(post.id)) + "/"
        data = {
            'id': post.id
        }
        response = self.client.delete(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEquals(Post.objects.count(), 1)

    def test_edit_post(self):
        post = Post(
            title='test_title',
            text='test_text',
            author=self.test_user
        )
        post.save()
        self.assertEquals(Post.objects.count(), 1)

        url = "/api/v1/posts/" + str(int(post.id)) + "/"
        data = {
            'title': 'new_test_title',
            'text': 'new_test_text'
        }
        response = self.client.put(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)
