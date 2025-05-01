import 'package:flutter/material.dart';
import 'package:lucia/Constants/colors.dart';
import 'package:lucia/Constants/styles.dart';
import 'package:lucia/Scaffolds/EmptyScaffold.dart';
import 'package:lucia/Screens/BorrowerScreens/MainBorrowingScreen.dart';
import 'package:lucia/Screens/LPScreens/MainLPScreen.dart';
import 'package:lucia/Widgets/whiteButton.dart';

class UserTypeScreen extends StatelessWidget {
  const UserTypeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return EmptyScaffold(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              "Please specify your main purpose for using Lucia",
              style: k15Medium.copyWith(
                color: kBlack,
              ),
              textAlign: TextAlign.center,
            ),

            const SizedBox(height: 36),

            ///Lender
            WhiteButton(
              text: "Providing Liquidity",
              function: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (context) => MainLPScreen(),
                  ),
                );
              },
            ),

            const SizedBox(height: 16),

            ///Borrower
            WhiteButton(
              text: "Borrowing Funds",
              function: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (context) => MainBorrowingScreen(),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
