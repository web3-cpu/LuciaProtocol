import 'package:flutter/material.dart';
import 'package:lucia/Screens/UserTypeScreen.dart';
import 'package:reorderables/reorderables.dart';

import '../../../Constants/colors.dart';
import '../../../Constants/styles.dart';
import '../../../Scaffolds/BackButtonScaffold.dart';
import '../../../Widgets/OrangeButton.dart';

class OrderSeedPhrase extends StatefulWidget {
  const OrderSeedPhrase({super.key});

  @override
  State<OrderSeedPhrase> createState() => _OrderSeedPhraseState();
}

class _OrderSeedPhraseState extends State<OrderSeedPhrase> {
  @override
  Widget build(BuildContext context) {
    return BackButtonScaffold(
      title: "Rearrange Phrase",
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24.0),
        child: Column(
          children: [
            const SizedBox(height: 48),

            ///Tap the words...
            Center(
              child: Text(
                "Tap the words next to each other in the correct order",
                style: k15Medium.copyWith(color: kBlack),
                textAlign: TextAlign.center,
              ),
            ),

            const SizedBox(height: 36),

            ///Seed Phrase
            Container(
              padding: const EdgeInsets.symmetric(vertical: 54, horizontal: 16),
              decoration: BoxDecoration(
                border: Border.all(
                  width: 1,
                  color: kLightOrange,
                ),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Center(
                child: ReorderableWrap(
                  spacing: 16,
                  runSpacing: 12,
                  onReorder: (a, b) {
                    print(a);
                    print(b);
                    setState(() {});
                  },

                  children: const [
                    WordChip(text: "This"),
                    WordChip(text: "is"),
                    WordChip(text: "a"),
                    WordChip(text: "sample"),
                    WordChip(text: "seed"),
                    WordChip(text: "phase"),
                  ],
                  // child: Wrap(
                  //   spacing: 16,
                  //   runSpacing: 12,
                  //
                  // ),
                ),
              ),
            ),
            const SizedBox(height: 36),

            ///Next Button
            OrangeButton(
              text: "Next",
              function: () {
                Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const UserTypeScreen()),
                    (route) => false);
              },
            ),
          ],
        ),
      ),
    );
  }
}

class WordChip extends StatelessWidget {
  const WordChip({super.key, required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: kLightOrange, width: 1),
        color: kWhite,
      ),
      child: Text(
        text,
        style: k15SemiBold.copyWith(color: kDarkOrange),
      ),
    );
  }
}
