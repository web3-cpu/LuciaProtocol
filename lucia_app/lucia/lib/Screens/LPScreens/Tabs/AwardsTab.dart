import 'package:flutter/material.dart';

import '../../../Constants/colors.dart';
import '../../../Constants/styles.dart';

class AwardsTab extends StatelessWidget {
  const AwardsTab({super.key});

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
            "Rewards",
            style: k13Medium.copyWith(color: kBlack),
          ),

          ///APR and Market Price
          subtitle: Text(
            "APP : 5% \nMarket Price : \$1000",
            style: k13Medium.copyWith(color: kBlack),
          ),
        );
      },
    );
  }
}
