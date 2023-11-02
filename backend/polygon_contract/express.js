const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Route to mint USDC
app.post('/mint-usdc', async (req, res) => {
  try {
    // Parse request data, including amount to mint
    const { amount } = req.body;

    // Use the Circle Mint client to mint USDC
    const mintResult = await circleMintClient.mintUSDC(amount);

    // Handle the result and send a response
    res.json({ success: true, mintResult });
  } catch (error) {
    console.error('Error minting USDC:', error);
    res.status(500).json({ success: false, error: 'Error minting USDC' });
  }
});

// Route to redeem USDC
app.post('/redeem-usdc', async (req, res) => {
  try {
    // Parse request data, including amount to redeem
    const { amount } = req.body;

    // Use the Circle Mint client to redeem USDC
    const redeemResult = await circleMintClient.redeemUSDC(amount);

    // Handle the result and send a response
    res.json({ success: true, redeemResult });
  } catch (error) {
    console.error('Error redeeming USDC:', error);
    res.status(500).json({ success: false, error: 'Error redeeming USDC' });
  }
});


// Start the Express.js server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
