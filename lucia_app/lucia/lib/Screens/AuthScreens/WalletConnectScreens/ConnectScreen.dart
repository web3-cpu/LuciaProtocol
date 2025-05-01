import 'package:flutter/material.dart';
import 'package:lucia/Constants/colors.dart';
import 'package:lucia/Constants/styles.dart';
import 'package:lucia/Scaffolds/BackButtonScaffold.dart';
import 'package:lucia/Widgets/OrangeButton.dart';
import 'package:lucia/Widgets/whiteButton.dart';

import '../../UserTypeScreen.dart';

class ConnectScreen extends StatelessWidget {
  const ConnectScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BackButtonScaffold(
      title: "MetaMask Wallet",
      child: Column(
        children: [
          ///Logo
          Expanded(
            child: Container(
              padding: const EdgeInsets.all(48),
              child: CircleAvatar(
                backgroundColor: kLightOrange,
                radius: 66,
              ),
            ),
          ),

          ///Dialog
          Expanded(
            child: Container(
              padding: const EdgeInsets.all(24),
              width: double.infinity,
              decoration: const BoxDecoration(
                color: kLightGrey,
                borderRadius: BorderRadius.vertical(
                  top: Radius.circular(32),
                ),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  ///Lucia wants to connect...
                  Text(
                    "Lucia wants to connect with your wallet",
                    style: k17SemiBold.copyWith(color: kBlack),
                    textAlign: TextAlign.center,
                  ),

                  ///Buttons
                  Row(
                    children: [
                      ///Cancel
                      Expanded(
                        child: OrangeButton(
                          text: "Cancel",
                          function: () => Navigator.pop(context),
                        ),
                      ),

                      const SizedBox(width: 24),

                      ///Connect
                      Expanded(
                        child: WhiteButton(
                          text: "Connect",
                          function: () {
                            Navigator.pushAndRemoveUntil(
                                context,
                                MaterialPageRoute(
                                    builder: (context) =>
                                        const UserTypeScreen()),
                                (route) => false);
                          },
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
