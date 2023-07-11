# Generated by Django 3.2.6 on 2023-07-09 11:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0005_alter_userprofile_name'),
        ('user_auth', '0007_auto_20230709_0923'),
    ]

    operations = [
        migrations.AddField(
            model_name='tagrequest',
            name='requester',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tag_requests', to='user_profile.userprofile'),
        ),
    ]
