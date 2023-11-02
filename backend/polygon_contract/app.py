from fastapi import FastAPI, HTTPException
from web3 import Web3

app = FastAPI()

# Connect to a Polygon node (replace 'https://polygon-rpc-url' with your Polygon RPC URL)
w3 = Web3(Web3.HTTPProvider('https://polygon-rpc-url'))

# Load the contract ABI (replace 'contract_abi' with your contract's ABI)
contract_abi = [...]

# Replace 'contract_hash' with your contract's address on Polygon
contract_hash = "0xYourContractAddressHere"

# Load the contract instance
contract = w3.eth.contract(address=contract_hash, abi=contract_abi)

@app.post("/location")
def create_location(name: str, x: int, y: int, tags: str, image: str):
    # Ensure that you have a wallet with enough MATIC tokens to cover gas costs
    sender_address = "0xYourSenderAddressHere"
    sender_private_key = "0xYourPrivateKeyHere"

    # Build the transaction
    nonce = w3.eth.getTransactionCount(sender_address)
    txn = contract.functions.post(name, x, y, tags, image).buildTransaction({
        'chainId': 137,  # Polygon Mainnet chain ID
        'gas': 2000000,  # Adjust gas limit as needed
        'gasPrice': w3.toWei('10', 'gwei'),  # Adjust gas price as needed
        'nonce': nonce,
    })

    # Sign the transaction
    signed_txn = w3.eth.account.signTransaction(txn, sender_private_key)

    # Send the transaction
    w3.eth.sendRawTransaction(signed_txn.rawTransaction)

    return {"message": "Location created on Polygon"}

@app.get("/location/{location_id}")
def get_location(location_id: int):
    try:
        location = contract.functions.detailOf(location_id).call()
        return {"location": {
            "name": location[0],
            "x": location[1],
            "y": location[2],
            "tags": location[3],
            "image": location[4]
        }}
    except Exception as e:
        raise HTTPException(status_code=404, detail="Location not found")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
