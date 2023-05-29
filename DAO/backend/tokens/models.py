from django.db import models
from django.utils import timezone

class Proposal(models.Model):
    proposalId = models.CharField(max_length=255, unique=True)
    address = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Wallet(models.Model):
    wallet_id = models.CharField(max_length=255, unique=True)
    role = models.CharField(max_length=255)
    date_created = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.wallet_id