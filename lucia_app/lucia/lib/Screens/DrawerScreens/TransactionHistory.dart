import 'package:flutter/material.dart';
import 'package:lucia/Constants/colors.dart';
import 'package:lucia/Constants/enums.dart';
import 'package:lucia/Constants/styles.dart';

import '../../Scaffolds/BackButtonScaffold.dart';

class TransactionHistory extends StatelessWidget {
  const TransactionHistory({super.key, required this.userType});

  final UserType userType;

  @override
  Widget build(BuildContext context) {
    return BackButtonScaffold(
      title: "Transaction History",
      child: ListView.builder(
          itemCount: 3,
          itemBuilder: (context, index) {
            return ListTile(
              isThreeLine: true,

              ///Type
              leading: Text(
                userType == UserType.borrower ? "Borrow" : "Lend",
                style: k13Medium.copyWith(color: kBlack),
              ),

              ///Amount
              title: Text(
                "600 USDT",
                style: k15SemiBold.copyWith(color: kBlack),
              ),

              ///Date
              trailing: Text(
                "23rd June",
                style: k13Medium.copyWith(color: kBlack),
              ),

              ///Status and Gas/Reward
              subtitle: Text(
                "Completed\n"
                "${userType == UserType.borrower ? 'Gas' : 'Reward'} : 0.03 USDT",
                style: k13Medium.copyWith(color: kBlack),
              ),
            );
          }),
    );
  }
}
