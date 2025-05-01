import 'package:flutter/material.dart';
import 'package:lucia/Constants/colors.dart';
import 'package:lucia/Constants/styles.dart';
import 'package:lucia/Widgets/OrangeButton.dart';
import 'package:lucia/Widgets/whiteButton.dart';

import '../../../Scaffolds/BackButtonScaffold.dart';
import 'OrderSeedPhrase.dart';

class CreateNewWallet extends StatelessWidget {
  const CreateNewWallet({super.key});

  @override
  Widget build(BuildContext context) {
    return BackButtonScaffold(
      title: "Create New Wallet",
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24.0),
        child: Column(
          children: [
            const SizedBox(height: 48),

            ///Store Seed Phrase...
            Center(
              child: Text(
                "Store seed phrase in a safe place",
                style: k15Medium.copyWith(color: kBlack),
                textAlign: TextAlign.center,
              ),
            ),

            const SizedBox(height: 36),

            ///Seed Phrase
            Container(
              padding: const EdgeInsets.symmetric(vertical: 72, horizontal: 16),
              decoration: BoxDecoration(
                border: Border.all(
                  width: 1,
                  color: kLightOrange,
                ),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Center(
                child: Text(
                  "This is a sample seed phrase",
                  style: k18Medium.copyWith(color: kBlack),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
            const SizedBox(height: 36),

            ///Copy the seed phrase...
            Center(
              child: Text(
                "Copy to Clipboard\nBackup encrypted in cloud\nDownload Master Key",
                style: k15Medium.copyWith(color: kBlack, height: 1.6),
                textAlign: TextAlign.start,
              ),
            ),
            const SizedBox(height: 36),

            ///Copy Phrase
            OrangeButton(text: "Copy Phrase", function: () {}),
            const SizedBox(height: 16),

            ///Next Button
            WhiteButton(
              text: "Next",
              function: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => OrderSeedPhrase(),
                  ),
                );
              },
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}
