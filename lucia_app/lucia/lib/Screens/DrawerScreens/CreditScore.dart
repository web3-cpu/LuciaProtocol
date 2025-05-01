import 'package:flutter/material.dart';
import 'package:lucia/Constants/colors.dart';
import 'package:lucia/Constants/styles.dart';

import '../../Scaffolds/BackButtonScaffold.dart';

class CreditScore extends StatelessWidget {
  const CreditScore({super.key});

  @override
  Widget build(BuildContext context) {
    return BackButtonScaffold(
      title: "Credit Score",
      child: ListView(
        children: [
          ///Credit Score
          ListTile(
            leading: Text(
              "Credit Score:",
              style: k13Medium.copyWith(color: kBlack),
            ),
            title: Text(
              "100% Credit Worthiness",
              style: k15SemiBold.copyWith(color: kBlack),
            ),
          ),
        ],
      ),
    );
  }
}
