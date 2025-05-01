import 'package:flutter/material.dart';
import 'package:lucia/Constants/colors.dart';
import 'package:lucia/Constants/styles.dart';

class CreditTab extends StatelessWidget {
  const CreditTab({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        ///Credit Score
        ListTile(
          ///Credit Score
          title: Text(
            "Credit Score",
            style: k15SemiBold.copyWith(color: kBlack),
          ),

          ///100%
          trailing: Text(
            "100% Credit Worthiness",
            style: k13Medium.copyWith(color: kBlack),
          ),
        ),

        ///Add wallets
        ListTile(
          ///Add wallets
          title: Text(
            "Add wallets",
            style: k15SemiBold.copyWith(color: kBlack),
          ),

          ///Completed
          subtitle: Text(
            "Completed",
            style: k13Medium.copyWith(color: kBlack),
          ),

          ///Tick
          trailing: Icon(
            Icons.check,
            color: kLightGreen,
          ),
        ),

        ///KYC/KYB
        ListTile(
          ///KYC/KYB
          title: Text(
            "KYC/KYB",
            style: k15SemiBold.copyWith(color: kBlack),
          ),

          ///Completed
          subtitle: Text(
            "Completed",
            style: k13Medium.copyWith(color: kBlack),
          ),

          ///Tick
          trailing: Icon(
            Icons.check,
            color: kLightGreen,
          ),
        ),

        ///Proof of Funds
        ListTile(
          ///Proof of Funds
          title: Text(
            "Proof of Funds",
            style: k15SemiBold.copyWith(color: kBlack),
          ),

          ///Completed
          subtitle: Text(
            "Completed",
            style: k13Medium.copyWith(color: kBlack),
          ),

          ///Tick
          trailing: Icon(
            Icons.check,
            color: kLightGreen,
          ),
        ),
      ],
    );
  }
}
