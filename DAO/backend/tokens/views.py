from django.shortcuts import render
import json
from .services import get_token_balance, authenticate_challenge, verify_challenge
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import ProposalSerializer
from .models import Proposal
from .models import Wallet
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
import random
from django.core import serializers

class ProposalViewSet(viewsets.ModelViewSet):
    serializer_class = ProposalSerializer

    def get_queryset(self):
        # Order by 'created_at' in descending order
        return Proposal.objects.all().order_by('-created_at')
    

@csrf_exempt 
def get_random_wallets(request):
    role = request.GET.get('role', None)
    number = request.GET.get('number', None)
    
    if role is not None and number is not None:
        number = int(number)
        wallets = list(Wallet.objects.filter(role=role))
        wallets = random.sample(wallets, min(len(wallets), number))
        
        data = serializers.serialize('json', wallets)
        
        return JsonResponse(data, safe=False)

    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt 
def get_role(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        wallet_id = data.get('wallet_id')

        if wallet_id is None:
            return JsonResponse({'message': 'wallet_id is a required field'}, status=400)

        try:
            wallet = Wallet.objects.get(wallet_id=wallet_id)
            return JsonResponse({'role': wallet.role}, status=200)
        except Wallet.DoesNotExist:
            return JsonResponse({'message': 'No wallet found with the provided ID'}, status=404)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=405)
    

@csrf_exempt 
def update_wallet(request):
    data = json.loads(request.body.decode('utf-8'))
    wallet_id = data.get('wallet_id')
    role = data.get('role')

    if wallet_id is None or role is None:
        return JsonResponse({'message': 'wallet_id and role are required fields'}, status=400)

    # Try to get the Wallet object
    wallet, created = Wallet.objects.update_or_create(wallet_id=wallet_id, defaults={'role': role})

    if created:
        return JsonResponse({'message': 'Wallet created'}, status=200)
    else:
        return JsonResponse({'message': 'Wallet updated'}, status=200)

# Create your views here.
def get_balance(requests):
    address = requests.GET.get("address")
    result = get_token_balance(address)
    result_json = json.dumps(result)
    return HttpResponse(result_json, content_type="application/json")

def request_challenge(requests):
    chain_id = requests.GET.get("chainId")
    address = requests.GET.get("address")
    request_result = authenticate_challenge(chain_id, address)
    request_json = json.dumps(request_result)
    return HttpResponse(request_json, content_type="application/json")


def verify_challenge(requests):
    message = requests.GET.get("message")
    signature = requests.GET.get("signature")
    verify_result = verify_challenge(message, signature)
    verify_json = json.dumps(verify_result)
    return HttpResponse(verify_json, content_type="application/json")

