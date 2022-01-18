nft-market-frontend
==================
Step 1: Config!
---------------

Change NFT_CONTRACT_NAME and MARKET_CONTRACT_NAME in:

    config.js

Step 2: Storage deposit in MARKET CONTRACT!
---------------

One command:

    near call MARKET_CONTRACT_NAME storate_deposit --accountId ACCOUNT_ID --deposit 0.01

Step 3: Test!
---------------

One command:

    yarn start
