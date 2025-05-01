import 'package:flutter/material.dart';
import 'package:lucia/Constants/styles.dart';

import '../../Constants/colors.dart';

class Page2 extends StatelessWidget {
  const Page2({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ///Features
          Text("Features", style: k36SemiBoldSyne),

          const SizedBox(height: 36),

          ///Feature List
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "• Credit Score System",
                  style: k21Medium.copyWith(color: kBlack),
                ),
                Text(
                  "• Cheaper than credit cards",
                  style: k21Medium.copyWith(color: kBlack),
                ),
                Text(
                  "• Insurance for liquidity providers",
                  style: k21Medium.copyWith(color: kBlack),
                ),
                // Text(
                //   "• Earn Cashback Rewards",
                //   style: k21Medium.copyWith(color: kBlack),
                // ),
              ],
            ),
          ),
          const SizedBox(height: 36),
        ],
      ),
    );
  }
}
