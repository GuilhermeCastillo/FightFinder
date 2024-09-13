# users/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from athletes.models import Athlete

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class AthleteSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Athlete
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        athlete = Athlete.objects.create(user=user, **validated_data)
        return athlete
