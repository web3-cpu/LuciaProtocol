import 'package:flutter/material.dart';

import '../../../Constants/colors.dart';
import '../../../Constants/styles.dart';

class LoansTab extends StatelessWidget {
  const LoansTab({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: 3,
      itemBuilder: (context, index) {
        return ListTile(
          isThreeLine: true,

          ///Amount
          title: Text(
            "1000 USDT",
            style: k15SemiBold.copyWith(color: kBlack),
          ),

          ///Terms
          trailing: Text(
            "100 USDT / Month",
            style: k13Medium.copyWith(color: kBlack),
          ),

          ///Loan Details
          leading: Text(
            "Repay",
            style: k13Medium.copyWith(color: kBlack),
          ),

          ///Guarantee
          subtitle: Text(
            "Guarantee : Connected\n0x343......3345",
            style: k13Medium.copyWith(color: kBlack),
          ),
        );
      },
    );
  }
}
