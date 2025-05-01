import 'package:flutter/material.dart';
import 'package:lucia/Constants/colors.dart';
import 'package:lucia/Constants/styles.dart';

import '../../Scaffolds/BackButtonScaffold.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BackButtonScaffold(
      title: "Account",
      child: ListView(
        children: [
          ///Wallet Number
          ListTile(
            ///Connected
            title: Text(
              "Connected",
              style: k13Medium.copyWith(color: kBlack),
            ),

            ///Wallet
            trailing: Text(
              "0x3556.....3443",
              style: k13Medium.copyWith(color: kBlack),
            ),
          ),

          ///Balance
          ListTile(
            ///Balance
            title: Text(
              "Balance",
              style: k13Medium.copyWith(color: kBlack),
            ),

            ///
            trailing: Text(
              "\$3000",
              style: k13Medium.copyWith(color: kBlack),
            ),
          ),

          ///Borrow Limit
          ListTile(
            ///Borrow Limit
            title: Text(
              "Borrow Limit",
              style: k13Medium.copyWith(color: kBlack),
            ),

            ///Wallet
            trailing: Text(
              "\$10000",
              style: k13Medium.copyWith(color: kBlack),
            ),
          ),

          ///Send to credit card
          ListTile(
            onTap: () {},
            trailing: Text(
              "Send to credit card",
              style: k13Medium.copyWith(color: kBlack),
            ),
          ),
        ],
      ),
    );
  }
}
