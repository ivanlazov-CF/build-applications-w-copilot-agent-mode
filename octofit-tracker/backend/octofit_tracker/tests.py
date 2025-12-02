from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(username='testuser', email='test@example.com')
        self.assertEqual(user.username, 'testuser')

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(team.name, 'Test Team')

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        user = User.objects.create(username='testuser', email='test@example.com')
        activity = Activity.objects.create(user=user, activity_type='Running', duration=30, calories_burned=300)
        self.assertEqual(activity.activity_type, 'Running')

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name='Cardio', description='Cardio workout', suggested_for='All')
        self.assertEqual(workout.name, 'Cardio')

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        team = Team.objects.create(name='Test Team')
        leaderboard = Leaderboard.objects.create(team=team, total_calories=1000, total_duration=120)
        self.assertEqual(leaderboard.total_calories, 1000)
