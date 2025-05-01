import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:lucia_landing_page/Constants/colors.dart';
import 'package:lucia_landing_page/Constants/styles.dart';
import 'package:lucia_landing_page/Providers/MainProvider.dart';
import 'package:lucia_landing_page/Responsive/ResponsiveLayout.dart';
import 'package:lucia_landing_page/Services/DatabaseServices.dart';
import 'package:lucia_landing_page/Widgets/OrangeButton.dart';
import 'package:lucia_landing_page/Widgets/TextFieldWidget.dart';
import 'package:provider/provider.dart';

import '../Constants/values.dart';
import '../Services/CommonServices.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _emailController = TextEditingController();

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    MainProvider mainProvider = Provider.of<MainProvider>(context);
    MainProvider mainProviderFalse =
        Provider.of<MainProvider>(context, listen: false);

    return Scaffold(
      backgroundColor: kBlack,
      body: SafeArea(
        child: Form(
          key: _formKey,
          child: ResponsiveLayout(
            ///Mobile
            mobileBody: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: ListView(
                children: [
                  const SizedBox(height: 64),

                  MobileBody(
                    controller: _emailController,
                    formKey: _formKey,
                  ),

                  const SizedBox(height: 36),

                  ///Features
                  const Wrap(
                    spacing: 16,
                    runSpacing: 16,
                    children: [
                      ///
                      SingleFeature(
                        index: 1,
                        featureText: "Financial freedom made easier.",
                      ),

                      ///
                      SingleFeature(
                        index: 2,
                        featureText: "Borrow Assets at 100% collateralization",
                      ),

                      ///
                      SingleFeature(
                        index: 3,
                        featureText: "Provide Liquidity and Earn Yield",
                      ),

                      ///
                      SingleFeature(
                        index: 4,
                        featureText:
                            "3.5% Cashback rewards for All transactions",
                      ),

                      ///
                      SingleFeature(
                        index: 5,
                        featureText: "Participate in Onchain Governance",
                      ),
                    ],
                  ),
                  const SizedBox(height: 64),
                ],
              ),
            ),

            ///Desktop (Adding the Landing image)
            desktopBody: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 64.0),
              child: ListView(
                children: [
                  const SizedBox(height: 64),

                  Row(
                    children: [
                      Expanded(
                          child: MobileBody(
                        controller: _emailController,
                        formKey: _formKey,
                      )),

                      ///Landing Image
                      Flexible(child: Image.asset(kLandingImage)),
                    ],
                  ),

                  const SizedBox(height: 36),

                  ///Features
                  const Wrap(
                    spacing: 16,
                    runSpacing: 16,
                    children: [
                      ///
                      SingleFeature(
                        index: 1,
                        featureText: "Financial freedom made easier.",
                      ),

                      ///
                      SingleFeature(
                        index: 2,
                        featureText: "Borrow Assets at 100% collateralization",
                      ),

                      ///
                      SingleFeature(
                        index: 3,
                        featureText: "Provide Liquidity and Earn Yield",
                      ),

                      ///
                      SingleFeature(
                        index: 4,
                        featureText:
                            "3.5% Cashback rewards for All transactions",
                      ),

                      ///
                      SingleFeature(
                        index: 5,
                        featureText: "Participate in Onchain Governance",
                      ),
                    ],
                  ),
                  const SizedBox(height: 64),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class MobileBody extends StatelessWidget {
  MobileBody({super.key, required this.controller, required this.formKey});

  final TextEditingController controller;
  final GlobalKey<FormState> formKey;
  final _commonServices = CommonServices();
  final _databaseServices = DatabaseServices();

  @override
  Widget build(BuildContext context) {
    MainProvider mainProvider = Provider.of<MainProvider>(context);
    MainProvider mainProviderFalse =
        Provider.of<MainProvider>(context, listen: false);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ///Lucia
        SizedBox(
          width: 150,
          height: 70,
          child: Image.asset(kLogo),
        ),

        const SizedBox(height: 32),

        ///Credit Liquidity Protocol
        Text(
          "Credit Liquidity Protocol",
          style: k45SemiBold,
        ),
        const SizedBox(height: 32),

        ///Access to lines of credit...
        Text(
          "Access to lines of credit without 100% collateralization - while increasing your credit reputation",
          style: k21Medium.copyWith(color: kWhite.withOpacity(0.7)),
        ),

        const SizedBox(height: 24),

        ///Email
        Text(
          "Enter your email",
          style: k18Medium,
        ),
        const SizedBox(height: 16),

        ///Email TextField
        Row(
          children: [
            Expanded(
              flex: 2,
              child: TextFieldWidget(
                controller: controller,
                hintText: "Email",
              ),
            ),
            Expanded(
              child: mainProvider.isLoading
                  ? const Center(
                      child: CircularProgressIndicator(
                          valueColor: AlwaysStoppedAnimation(kLightOrange)),
                    )
                  : const SizedBox(),
            ),
          ],
        ),

        const SizedBox(height: 16),

        ///Get Early Access Button
        Row(
          children: [
            Expanded(
              flex: 2,
              child: OrangeButton(
                text: "Get Early Access",
                function: () async {
                  ///If request is already running
                  if (mainProvider.isLoading) {
                    return;
                  }

                  ///Check if the TextFields are empty
                  bool isFilled = _commonServices.validateAndSave(formKey);
                  if (!isFilled) {
                    return;
                  }

                  ///Getting email
                  String email = controller.text.trim();

                  mainProviderFalse.changeIsLoading(true);

                  ///Adding  email to database
                  await _databaseServices.addEmailToWaitList(email);

                  mainProviderFalse.changeIsLoading(false);

                  Fluttertoast.showToast(
                    msg: "Successfully Registered",
                    toastLength: Toast.LENGTH_LONG,
                    gravity: ToastGravity.CENTER,
                    timeInSecForIosWeb: 3,
                    backgroundColor: kLightOrange,
                    textColor: kWhite,
                    fontSize: 16.0,
                  );
                  controller.clear();
                },
              ),
            ),
            const Expanded(
              child: SizedBox(),
            ),
          ],
        ),
      ],
    );
  }
}

class SingleFeature extends StatelessWidget {
  const SingleFeature(
      {super.key, required this.index, required this.featureText});

  final int index;
  final String featureText;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 250,
      constraints: const BoxConstraints(
        maxWidth: 200,
      ),
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        border: Border.all(width: 1, color: kGrey),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          ///Number
          Text(
            "0$index",
            style: k16Medium,
          ),

          ///Feature
          Text(featureText, style: k16Medium)
        ],
      ),
    );
  }
}
