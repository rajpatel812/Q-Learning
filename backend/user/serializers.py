from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from . import models


class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = models.User
        fields = ['email', 'name', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        password = attrs['password'],
        password2 = attrs['password2'],
        if password != password2:
            raise serializers.ValidationError("password and confirm password not match")
        return attrs

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        return models.User.objects.create_user(**validated_data)


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=200)

    class Meta:
        model = models.User
        fields = ['id', 'email', 'password']


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = "__all__"


class UserProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name', required=False)
    email = serializers.CharField(source='user.email', required=False)

    class Meta:
        model = models.Profile
        fields = "__all__"

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

            # Save the instance with updated fields
        instance.save()

        return instance
