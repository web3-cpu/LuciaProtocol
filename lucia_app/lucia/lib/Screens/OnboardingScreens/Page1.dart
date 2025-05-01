import 'package:flutter/material.dart';
import 'package:lucia/Constants/colors.dart';
import 'package:lucia/Constants/styles.dart';

class Page1 extends StatelessWidget {
  const Page1({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          ///Title
          Text(
            "Credit Liquidity Protocol",
            style: k36SemiBoldSyne,
          ),

          ///Access to ...
          Text(
              "Access to lines of credit without 100% collateralization - while increasing your credit reputation.",
              style: k18Medium.copyWith(color: kBlack))
        ],
      ),
    );
  }
}
