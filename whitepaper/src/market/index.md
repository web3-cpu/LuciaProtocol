# Market


## Thesis

Despite the potential benefits of decentralized lending on the blockchain, the current system is fundamentally broken due to the requirement of collateralizing well over 100% of the borrowed amount. This excessive collateralization defeats the purpose of the loan and limits the potential for blockchain lending to achieve its full potential.

Decentralized lending on the blockchain has the potential to revolutionize the lending industry by providing greater transparency, lower costs, and increased access to credit for individuals and businesses. However, the current lending system on the blockchain requires borrowers to provide collateral well in excess of the borrowed amount, which limits the potential for blockchain lending to achieve its full potential.

The excessive collateralization requirement is due to the permissionless nature of cryptocurrency. The status quo suggests that overcollateralization is the only way to keep a lending protocol protected against sybil attacks.

 However, this requirement defeats the purpose of the loan, which is to provide borrowers with access to credit without requiring them to liquidate their assets. In addition, the collateralization requirement limits the potential for blockchain lending to support entrepreneurship and innovation by requiring borrowers to have significant capital reserves before they can access credit.

To address this fundamental problem, a new approach to decentralized lending on the blockchain is needed. This approach should be designed to minimize risk while also enabling borrowers to access credit without excessive collateralization requirements. Potential solutions may include the use of smart contracts, algorithmic risk management protocols, and other innovations to reduce risk and increase access to credit.



## Introduction to Ad Attribution

Ad attribution is the process of identifying which advertising channel, campaign, or creative is responsible for driving a particular conversion or user action. This helps advertisers to understand the effectiveness of their advertising spend and to optimize their campaigns for maximum impact. To track conversions and attribute them to the appropriate advertising channel, a tracking pixel or software development kit (SDK) is placed on the website or app. When a user clicks on the ad and lands on the website or app, the tracking pixel or SDK captures information about the user's device, location, and other relevant data points. When the user completes a desired action, such as making a purchase or installing the app, the tracking pixel or SDK sends this data back to the advertising platform, along with information about the ad that the user clicked on. There are several attribution models that can be used to assign credit for conversions, and the choice of model will depend on specific goals and business needs.

## Sybil Resistance

Similarity scores 

```python
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# Load data
df = pd.read_csv("transactions.csv")

# Convert categorical variables to numerical
df["merchant"] = pd.factorize(df["merchant"])[0]
df["card_number"] = pd.factorize(df["card_number"])[0]
df["transaction_type"] = pd.factorize(df["transaction_type"])[0]

# Calculate similarity scores between each record
features = ["merchant", "amount", "transaction_type"]
similarity_matrix = cosine_similarity(df[features])

# Find pairs of records with high similarity scores
threshold = 0.9
duplicates = set()
for i in range(len(similarity_matrix)):
    for j in range(i + 1, len(similarity_matrix)):
        if similarity_matrix[i][j] >= threshold:
            duplicates.add((i, j))

print(f"Found {len(duplicates)} potential duplicates.")

```

## Conclusion

In summary, the current system of lending on the blockchain is fundamentally broken due to the excessive collateralization requirements that limit access to credit and defeat the purpose of the loan. A new approach is needed to enable decentralized lending on the blockchain to achieve its full potential and support entrepreneurship, innovation, and economic growth.
