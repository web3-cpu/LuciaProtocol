import 'package:flutter/material.dart';
import 'package:lucia/Scaffolds/EmptyScaffold.dart';
import 'package:lucia/Screens/AuthScreens/NewWalletScreens/CreateNewWallet.dart';
import 'package:lucia/Screens/AuthScreens/WalletConnectScreens/WalletConnect.dart';

import '../../Constants/colors.dart';
import '../../Constants/styles.dart';
import '../../Widgets/whiteButton.dart';

class WalletOptions extends StatelessWidget {
  const WalletOptions({super.key});

  @override
  Widget build(BuildContext context) {
    return EmptyScaffold(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ///Create New Wallet
            WhiteButton(
              text: "Create New Wallet",
              function: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => CreateNewWallet(),
                  ),
                );
              },
            ),

            const SizedBox(height: 32),

            ///Wallet Connect
            WhiteButton(
                text: "Wallet Connect",
                function: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => WalletConnect(),
                    ),
                  );
                }),

            const SizedBox(height: 56),

            ///Through wallet connect...
            Text(
              "Through wallet connect you can connect to more than 150 wallets",
              style: k18Medium.copyWith(color: kBlack, height: 1.5),
              textAlign: TextAlign.center,
            )
          ],
        ),
      ),
    );
  }
}
