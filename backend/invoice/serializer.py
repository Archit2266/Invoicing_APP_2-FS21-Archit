from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import *


#class itemSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = Items
#        fields = "__all__"


#class InvoiceSerializer(serializers.ModelSerializer):
#    items = itemSerializer(many=True,read_only=True)

#    class Meta:
#        model = Invoices
#        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = '__all__'


    def create(self, validated_data):
        user = User.objects.create(
        username=validated_data["username"],
        email=validated_data["email"],
        ) 
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("USername or passsword does not match")
