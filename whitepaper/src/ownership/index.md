# 1. Add Attribution

To create an ad attribution product that can accurately identify a user across multiple devices or VPNs, we can build a machine learning architecture that utilizes a combination of deterministic and probabilistic models. The architecture can be broken down into the following steps:

Data Collection: We collect data on user behavior across multiple devices and platforms, as well as any information that can be used to uniquely identify a user such as IP addresses and device IDs.

Deterministic Matching: We use deterministic models to match users across devices and platforms using information such as email addresses, phone numbers, or login information. This allows us to accurately attribute actions to a specific user.

Probabilistic Matching: For cases where deterministic matching is not possible or insufficient, we use probabilistic models that analyze user behavior patterns and other data points to identify patterns that indicate the same user across multiple devices. This can include analyzing user behavior such as time of day, location, and the types of devices being used.

Cross-Device Graph: We build a cross-device graph that links different devices and platforms to the same user. This graph is constantly updated as new data is collected.

VPN Detection: We utilize machine learning models to detect when a user is using a VPN or other proxy service. This can be done by analyzing patterns in the user's IP address or network traffic.

Attribution Models: Finally, we use attribution models to assign credit for conversions to specific advertising channels, campaigns, or creatives. This can include last-click attribution, first-click attribution, or other models depending on the business needs.

Overall, this architecture allows us to accurately attribute user actions to specific advertising channels, campaigns, or creatives, even when users are using multiple devices or VPNs. By combining deterministic and probabilistic models, we can ensure that we are correctly identifying users and providing accurate attribution.
