const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { ElvClient } = require("@eluvio/elv-client-js");

const app = express();
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

// Initialize the ElvClient
let client;
async function initializeElvClient() {
    client = await ElvClient.FromConfigurationUrl({
        configUrl: "https://demov3.net955210.contentfabric.io/config"
    });
    const privateKey = "0x433299265d95754b301a967623cf3189b1b4a3c1"; 
    const wallet = client.GenerateWallet();
    const signer = wallet.AddAccount({ privateKey });
    await client.SetSigner({ signer });
}
initializeElvClient();

// POST route to handle story submission
app.post('/submit-story', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    try {
        let tokenId = await createAndTokenizeStory(req.file, req.body);
        res.json({ success: true, tokenId: tokenId });
    } catch (error) {
        console.error("Error in tokenizing story:", error);
        res.status(500).send("Error in processing your story.");
    }
});

async function createAndTokenizeStory(imageFile, metadata) {
    if (!client) {
        throw new Error("ElvClient not initialized");
    }

    // Create a content object
    let libraryId = "ilibYourLibraryIdHere"; 
    let objectData = await client.CreateContentObject({
        libraryId,
        options: {
            type: "hq__2Wuci8wepZr9RksFxmfuXSZipH4Tqa1YAVZWQmo6ykvcoWUbN2oTgz9kZgbWXkDLKoi3PrnSm3" 
        }
    });
    let objectId = objectData.id;

    let writeToken = (await client.EditContentObject({ libraryId, objectId })).write_token;

    let fileInfo = {
        path: imageFile.originalname,
        type: "file",
        size: imageFile.size,
        data: fs.readFileSync(imageFile.path)
    };

    await client.UploadFiles({
        libraryId,
        objectId,
        writeToken,
        fileInfo: [fileInfo]
    });

    // Finalize the content object
    let response = await client.FinalizeContentObject({
        libraryId,
        objectId,
        writeToken,
        commitMessage: "Added file to new object"
    });

    let tokenId = await client.CreateNFToken({
        libraryId,
        objectId,
        metadata: { title: metadata.title, description: metadata.description },
        fungible: false
    });

    return tokenId.tokenId;
}

/// login with Eluvio Media Wallet
const { ethers } = require("ethers");

app.post('/login-with-wallet', async (req, res) => {
    const walletAddress = req.body.walletAddress;
    const signature = req.body.signature;
    const originalMessage = req.body.originalMessage;  // The message that was signed in the frontend

    try {
        const recoveredAddress = ethers.utils.verifyMessage(originalMessage, signature);

        if (recoveredAddress.toLowerCase() === walletAddress.toLowerCase()) {
            res.json({ success: true, message: `Logged in with wallet: ${walletAddress}` });
        } else {
            res.status(401).json({ success: false, message: "Authentication failed. Signature mismatch." });
        }
    } catch (error) {
        console.error("Error in signature verification:", error);
        res.status(500).send("Server error in processing the wallet login.");
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
