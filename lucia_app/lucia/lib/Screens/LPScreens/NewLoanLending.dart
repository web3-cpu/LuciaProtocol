import 'package:flutter/material.dart';
import 'package:lucia/Scaffolds/BackButtonScaffold.dart';

import '../../Constants/colors.dart';
import '../../Constants/styles.dart';
import '../../Widgets/DropDownWidget.dart';
import '../../Widgets/TextFieldWidget.dart';
import '../../Widgets/whiteButton.dart';

class NewLoanLending extends StatefulWidget {
  const NewLoanLending({super.key});

  @override
  State<NewLoanLending> createState() => _NewLoanLendingState();
}

class _NewLoanLendingState extends State<NewLoanLending> {
  final _aprController = TextEditingController();
  final _rewardController = TextEditingController();

  String? _selectedDuration;
  String? _selectedExpirationDays;
  final durationValues = ["1 Month", "6 Months", "1 Year", "5 Years"];

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _init();
  }

  _init() {
    _aprController.text = "5%";
    _rewardController.text = "\$20";
  }

  @override
  Widget build(BuildContext context) {
    return BackButtonScaffold(
      title: "Loan Terms",
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: ListView(
          children: [
            ///Lending Amount
            Text(
              "Lending Amount",
              style: k13Medium.copyWith(color: kBlack),
            ),

            const SizedBox(height: 8),

            const TextFieldWidget(
              hintText: "Lending Amount",
            ),

            const SizedBox(height: 24),

            ///APR
            Text(
              "APR",
              style: k13Medium.copyWith(color: kBlack),
            ),

            const SizedBox(height: 8),
            TextFieldWidget(
              hintText: "5%",
              isDisabled: true,
              controller: _aprController,
            ),

            const SizedBox(height: 24),

            ///Duration Days
            Text(
              "Duration Days",
              style: k13Medium.copyWith(color: kBlack),
            ),

            const SizedBox(height: 8),
            DropDownWidget(
              hintText: "Select",
              values: durationValues,
              onChanged: (val) {
                setState(() {
                  _selectedDuration = val;
                });
              },
              selectedValue: _selectedDuration,
            ),
            const SizedBox(height: 24),

            ///Expiration Days
            Text(
              "Expiration Days",
              style: k13Medium.copyWith(color: kBlack),
            ),

            const SizedBox(height: 8),
            DropDownWidget(
              hintText: "Select",
              values: durationValues,
              onChanged: (val) {
                setState(() {
                  _selectedExpirationDays = val;
                });
              },
              selectedValue: _selectedExpirationDays,
            ),
            const SizedBox(height: 24),

            ///Estimated Rewards
            Text(
              "Estimated Rewards",
              style: k13Medium.copyWith(color: kBlack),
            ),

            const SizedBox(height: 8),
            TextFieldWidget(
              hintText: "4",
              isDisabled: true,
              controller: _rewardController,
            ),
            const SizedBox(height: 24),

            ///Accept Terms Button
            WhiteButton(
              text: "Accept Terms",
              function: () {
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }
}
