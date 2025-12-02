from django.core.management.base import BaseCommand
from django.conf import settings
from djongo import models
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient(host='localhost', port=27017)
        db = client['octofit_db']

        # Drop collections if they exist
        for col in ['users', 'teams', 'activities', 'leaderboard', 'workouts']:
            db[col].drop()

        # Users (superheroes)
        users = [
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': 'Marvel'},
            {'name': 'Captain America', 'email': 'cap@marvel.com', 'team': 'Marvel'},
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team': 'Marvel'},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': 'DC'},
            {'name': 'Superman', 'email': 'superman@dc.com', 'team': 'DC'},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team': 'DC'},
        ]
        db.users.insert_many(users)
        db.users.create_index([('email', 1)], unique=True)

        # Teams
        teams = [
            {'name': 'Marvel', 'members': ['Iron Man', 'Captain America', 'Spider-Man']},
            {'name': 'DC', 'members': ['Batman', 'Superman', 'Wonder Woman']},
        ]
        db.teams.insert_many(teams)

        # Activities
        activities = [
            {'user': 'Iron Man', 'activity': 'Running', 'duration': 30},
            {'user': 'Batman', 'activity': 'Cycling', 'duration': 45},
            {'user': 'Wonder Woman', 'activity': 'Swimming', 'duration': 60},
        ]
        db.activities.insert_many(activities)

        # Leaderboard
        leaderboard = [
            {'team': 'Marvel', 'points': 250},
            {'team': 'DC', 'points': 300},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Workouts
        workouts = [
            {'user': 'Spider-Man', 'workout': 'Push-ups', 'reps': 100},
            {'user': 'Superman', 'workout': 'Squats', 'reps': 150},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with superhero test data.'))
