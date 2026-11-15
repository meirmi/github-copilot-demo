from datetime import timedelta

from bson import ObjectId
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand
from pymongo import MongoClient

from octofit_tracker.models import Activity, Leaderboard, Team, User, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data for users, teams, activity, leaderboard, and workouts'

    def handle(self, *args, **kwargs):
        db_settings = settings.DATABASES['default']
        client = MongoClient(db_settings['HOST'], db_settings['PORT'])
        db = client[db_settings['NAME']]

        # delete_many keeps the collections' indexes, unlike drop()
        for collection in ('users', 'teams', 'activity', 'leaderboard', 'workouts'):
            db[collection].delete_many({})

        users = [
            User(_id=ObjectId(), username='thundergod', email='thundergod@mhigh.edu', password=make_password('thundergodpassword')),
            User(_id=ObjectId(), username='metalgeek', email='metalgeek@mhigh.edu', password=make_password('metalgeekpassword')),
            User(_id=ObjectId(), username='zerocool', email='zerocool@mhigh.edu', password=make_password('zerocoolpassword')),
            User(_id=ObjectId(), username='crashoverride', email='crashoverride@mhigh.edu', password=make_password('crashoverridepassword')),
            User(_id=ObjectId(), username='sleeptoken', email='sleeptoken@mhigh.edu', password=make_password('sleeptokenpassword')),
        ]
        for user in users:
            user.save(force_insert=True)

        teams = [
            Team(_id=ObjectId(), name='Blue Team', members=[str(u._id) for u in users[:2]]),
            Team(_id=ObjectId(), name='Gold Team', members=[str(u._id) for u in users[2:]]),
        ]
        for team in teams:
            team.save(force_insert=True)

        activities = [
            Activity(_id=ObjectId(), user=users[0], activity_type='Cycling', duration=timedelta(hours=1)),
            Activity(_id=ObjectId(), user=users[1], activity_type='Crossfit', duration=timedelta(hours=2)),
            Activity(_id=ObjectId(), user=users[2], activity_type='Running', duration=timedelta(hours=1, minutes=30)),
            Activity(_id=ObjectId(), user=users[3], activity_type='Strength', duration=timedelta(minutes=30)),
            Activity(_id=ObjectId(), user=users[4], activity_type='Swimming', duration=timedelta(hours=1, minutes=15)),
        ]
        for activity in activities:
            activity.save(force_insert=True)

        leaderboard_entries = [
            Leaderboard(_id=ObjectId(), user=users[0], score=100),
            Leaderboard(_id=ObjectId(), user=users[1], score=90),
            Leaderboard(_id=ObjectId(), user=users[2], score=95),
            Leaderboard(_id=ObjectId(), user=users[3], score=85),
            Leaderboard(_id=ObjectId(), user=users[4], score=80),
        ]
        for entry in leaderboard_entries:
            entry.save(force_insert=True)

        workouts = [
            Workout(_id=ObjectId(), name='Cycling Training', description='Training for a road cycling event'),
            Workout(_id=ObjectId(), name='Crossfit', description='Training for a crossfit competition'),
            Workout(_id=ObjectId(), name='Running Training', description='Training for a marathon'),
            Workout(_id=ObjectId(), name='Strength Training', description='Training for strength'),
            Workout(_id=ObjectId(), name='Swimming Training', description='Training for a swimming competition'),
        ]
        for workout in workouts:
            workout.save(force_insert=True)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data.'))
