from rest_framework import serializers
from .models import Proposal

class ProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposal
        fields = ['proposalId', 'address','value', 'role', 'created_at', 'updated_at']
