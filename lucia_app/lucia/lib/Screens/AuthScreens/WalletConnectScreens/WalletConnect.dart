import 'package:flutter/material.dart';
import 'package:lucia/Scaffolds/BackButtonScaffold.dart';
import 'package:lucia/Screens/AuthScreens/WalletConnectScreens/ConnectScreen.dart';

import '../../../Constants/colors.dart';
import '../../../Constants/styles.dart';

class WalletConnect extends StatelessWidget {
  const WalletConnect({super.key});

  @override
  Widget build(BuildContext context) {
    return BackButtonScaffold(
      title: "Wallet Connect",
      child: ListView(
        children: [
          const SizedBox(height: 24),

          ///Select your wallet.
          Center(
            child: Text(
              "Choose your preferred wallet",
              style: k15Medium.copyWith(color: kBlack),
              textAlign: TextAlign.center,
            ),
          ),

          const SizedBox(height: 36),

          ///Wallet List
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                maxCrossAxisExtent: 120,
                childAspectRatio: 1.2,
                crossAxisSpacing: 0,
                mainAxisSpacing: 0),
            itemCount: 16,
            itemBuilder: (BuildContext ctx, index) {
              return InkWell(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => ConnectScreen(),
                    ),
                  );
                },
                child: Column(
                  children: [
                    ///Image
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: kLightOrange,
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      "MetaMask",
                      style: k13Medium.copyWith(color: kBlack),
                    )
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
