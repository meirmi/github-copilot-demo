from datetime import timedelta

from django.test import TestCase
from rest_framework.test import APIClient

from .models import Activity, Leaderboard, Team, User, Workout


class ApiRootTests(TestCase):
    def test_api_root_lists_endpoints(self):
        response = APIClient().get('/')
        self.assertEqual(response.status_code, 200)
        for key in ('users', 'teams', 'activities', 'leaderboard', 'workouts'):
            self.assertIn(key, response.data)


class ModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='thundergod', email='thundergod@mhigh.edu', password='pw')

    def test_user(self):
        self.assertEqual(str(self.user), 'thundergod')

    def test_team(self):
        team = Team.objects.create(name='Blue Team')
        self.assertEqual(str(team), 'Blue Team')

    def test_activity(self):
        activity = Activity.objects.create(user=self.user, activity_type='Running', duration=timedelta(hours=1))
        self.assertEqual(activity.activity_type, 'Running')

    def test_leaderboard(self):
        entry = Leaderboard.objects.create(user=self.user, score=100)
        self.assertEqual(entry.score, 100)

    def test_workout(self):
        workout = Workout.objects.create(name='Cycling Training', description='Road cycling')
        self.assertEqual(str(workout), 'Cycling Training')


class EndpointTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        User.objects.create(username='metalgeek', email='metalgeek@mhigh.edu', password='pw')

    def test_list_endpoints(self):
        for name in ('users', 'teams', 'activities', 'leaderboard', 'workouts'):
            response = self.client.get(f'/api/{name}/')
            self.assertEqual(response.status_code, 200, name)

    def test_user_password_not_exposed(self):
        response = self.client.get('/api/users/')
        self.assertNotIn('password', response.data[0])
