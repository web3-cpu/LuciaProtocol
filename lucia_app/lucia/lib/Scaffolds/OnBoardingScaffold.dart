import 'package:flutter/material.dart';
import 'package:lucia/Screens/AuthScreens/WalletOptions.dart';
import 'package:lucia/Screens/OnboardingScreens/Page1.dart';
import 'package:lucia/Screens/OnboardingScreens/Page2.dart';
import 'package:lucia/Screens/OnboardingScreens/Page4.dart';

import '../Constants/colors.dart';
import '../Constants/styles.dart';
import '../Screens/OnboardingScreens/Page3.dart';

class OnBoardingScaffold extends StatefulWidget {
  const OnBoardingScaffold({super.key});

  @override
  State<OnBoardingScaffold> createState() => _OnBoardingScaffoldState();
}

class _OnBoardingScaffoldState extends State<OnBoardingScaffold> {
  final _pageController = PageController(viewportFraction: 1);

  int imagesIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const SizedBox(height: 18),

            ///Pages
            Expanded(
              child: PageView(
                controller: _pageController,
                onPageChanged: (val) {
                  setState(() {
                    imagesIndex = val;
                  });
                },
                children: const [
                  Page1(),
                  Page2(),
                  Page3(),
                  Page4(),
                ],
              ),
            ),
            const SizedBox(height: 12),

            ///Dots and Next Button
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const SizedBox(width: 18),

                ///Bottom Lines
                Expanded(
                  child: SizedBox(
                    height: 5,
                    child: ListView.builder(
                      itemCount: 4,
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      scrollDirection: Axis.horizontal,
                      itemBuilder: (context, index) {
                        return AnimatedContainer(
                          margin: const EdgeInsets.only(right: 6),
                          width: index == imagesIndex ? 36 : 12,
                          height: 5,
                          duration: const Duration(milliseconds: 200),
                          decoration: BoxDecoration(
                            color: index == imagesIndex ? kDarkGreen : kGrey,
                            borderRadius: BorderRadius.circular(16),
                          ),
                        );
                      },
                    ),
                  ),
                ),

                ///Start Button
                TextButton(
                  onPressed: () {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const WalletOptions(),
                      ),
                    );
                  },
                  child: imagesIndex == 3
                      ? Text(
                          "Start",
                          style: k16Medium.copyWith(
                              color: kDarkGreen,
                              decoration: TextDecoration.underline),
                        )
                      : const SizedBox(),
                ),

                const SizedBox(width: 18),
              ],
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }
}
