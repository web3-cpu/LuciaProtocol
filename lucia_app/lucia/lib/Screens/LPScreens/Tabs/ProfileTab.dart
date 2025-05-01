import 'package:flutter/material.dart';

import '../../../Constants/colors.dart';
import '../../../Constants/styles.dart';

class ProfileTab extends StatelessWidget {
  const ProfileTab({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        ///Polygon ID
        ListTile(
          ///Polygon ID
          title: Text(
            "Polygon ID",
            style: k15SemiBold.copyWith(color: kBlack),
          ),

          ///Zero Knowledge Proof
          trailing: Text(
            "Zero Knowledge Proof",
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
