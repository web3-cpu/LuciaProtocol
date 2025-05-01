import 'package:flutter/material.dart';
import 'package:lucia/Constants/colors.dart';
import 'package:lucia/Constants/styles.dart';
import 'package:lucia/Scaffolds/BackButtonScaffold.dart';
import 'package:lucia/Widgets/DropDownWidget.dart';
import 'package:lucia/Widgets/TextFieldWidget.dart';
import 'package:lucia/Widgets/whiteButton.dart';

class NewLoanBorrowing extends StatefulWidget {
  const NewLoanBorrowing({super.key});

  @override
  State<NewLoanBorrowing> createState() => _NewLoanBorrowingState();
}

class _NewLoanBorrowingState extends State<NewLoanBorrowing> {
  final _interestController = TextEditingController();
  final _liquidationRatioController = TextEditingController();

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
    _interestController.text = "5%";
    _liquidationRatioController.text = "4";
  }

  @override
  Widget build(BuildContext context) {
    return BackButtonScaffold(
      title: "Loan Terms",
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: ListView(
          children: [
            ///Borrowing Amount
            Text(
              "Borrowing Amount",
              style: k13Medium.copyWith(color: kBlack),
            ),

            const SizedBox(height: 8),

            const TextFieldWidget(
              hintText: "Borrowing Amount",
            ),

            const SizedBox(height: 24),

            ///Interest
            Text(
              "Interest",
              style: k13Medium.copyWith(color: kBlack),
            ),

            const SizedBox(height: 8),
            TextFieldWidget(
              hintText: "5%",
              isDisabled: true,
              controller: _interestController,
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

            ///Liquidation Ratio
            Text(
              "Liquidation Ratio",
              style: k13Medium.copyWith(color: kBlack),
            ),

            const SizedBox(height: 8),
            TextFieldWidget(
              hintText: "4",
              isDisabled: true,
              controller: _liquidationRatioController,
            ),
            const SizedBox(height: 24),

            ///Accept Terms Button
            WhiteButton(text: "Accept Terms", function: (){
              Navigator.pop(context);
            }),
          ],
        ),
      ),
    );
  }
}
