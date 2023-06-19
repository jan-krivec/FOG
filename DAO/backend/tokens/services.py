from moralis import evm_api, auth
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("MORALIS_API_KEY")


def get_token_balance(address):
    params = {
        "address": address,
        "chain": "0x5",
        "token_addresses": ["0xCd8a4296C7829cC23E8C04426bAf45311f407d6C"],
    }

    result = evm_api.token.get_wallet_token_balances(
        api_key=api_key,
        params=params,
    )

    return result


def get_user_role(address):
    params = {
        "address": address,
        "chain": "0x5",
        "token_addresses": ["0xCd8a4296C7829cC23E8C04426bAf45311f407d6C"],
    }

    result = evm_api.token.getUserRole(
        api_key=api_key,
        params=params,
    )

    return result

def authenticate_challenge(chain, address):
    body = {
        "domain": "andraz.org",
        "chainId": chain,
        "address": address,
        "statement": "",
        "uri": "",
        "expirationTIme": "2024-02-28T00:00:00.000Z",
        "notBefore": "2021-02-28T00:00:00.000Z",
        "resources": ["https://docs.moralis.io"],
        "timeout": 30,
    }

    result = auth.challenge.request_challenge_evm(
        api_key=api_key,
        body=body,
    )

    return result


def verify_challenge(message, signature):
    body = {
        "message": message,
        "signature": signature,
    }

    result = auth.challenge.verify_challenge_evm(
        api_key=api_key,
        body=body,
    )

    return result



