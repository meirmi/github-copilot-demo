from bson import ObjectId
from rest_framework import serializers

from .models import Activity, Leaderboard, Team, User, Workout


class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        try:
            return ObjectId(data)
        except Exception:
            raise serializers.ValidationError('Invalid ObjectId.')


class UserSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}


class TeamSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)

    class Meta:
        model = Team
        fields = '__all__'


class ActivitySerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)
    user = ObjectIdField()

    class Meta:
        model = Activity
        fields = '__all__'

    def create(self, validated_data):
        validated_data['user'] = User.objects.get(pk=validated_data['user'])
        return super().create(validated_data)


class LeaderboardSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)
    user = ObjectIdField()

    class Meta:
        model = Leaderboard
        fields = '__all__'

    def create(self, validated_data):
        validated_data['user'] = User.objects.get(pk=validated_data['user'])
        return super().create(validated_data)


class WorkoutSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)

    class Meta:
        model = Workout
        fields = '__all__'
